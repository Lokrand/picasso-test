import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { postsApi } from "../../services/rtk-query/posts/posts";
import { usersApi } from "../../services/rtk-query/users/users";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Result, Row, Spin, Typography } from "antd";

const { Text, Title } = Typography;

export const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [authorName, setAuthorName] = useState<string>("");

  const { data: postData, isLoading: isPostsLoading } =
    postsApi.useFetchOnePostQuery({ id });
  const [fetchPostAuthor, fetchAuthorResult] = usersApi.useLazyFetchUserQuery();

  useEffect(() => {
    if (postData?.userId) {
      fetchPostAuthor({ id: postData?.userId });
    }
  }, [postData]);

  useEffect(() => {
    setAuthorName(fetchAuthorResult?.data?.name);
  }, [fetchAuthorResult]);

  console.log(authorName);

  return (
    <>
      {isPostsLoading ? (
        <Row justify="center" align="middle">
          <Spin />
        </Row>
      ) : postData ? (
        <>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/")}>
            Назад
          </Button>
          <Flex vertical>
            <Title level={3}>{postData?.title}</Title>
            <Text type="secondary">{`Автор: ${fetchAuthorResult?.data?.name}`}</Text>
            <Divider style={{ margin: "12px 0" }} />
            <Text>{postData?.body}</Text>
          </Flex>
        </>
      ) : (
        <Result
          status="404"
          title="Пост не найден"
          subTitle="Извините, возникли неполадки с сервером"
          extra={
            <Button type="primary" onClick={() => navigate("/")}>
              Перейти на главную
            </Button>
          }
        />
      )}
    </>
  );
};
