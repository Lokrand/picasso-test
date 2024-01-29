import React, { useCallback, useEffect, useState } from "react";
import { Button, List, Typography, message } from "antd";
import VirtualList from "rc-virtual-list";
import { postsApi } from "../../shared/api/posts/posts";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../shared/api/posts/posts.d";

const { Text } = Typography;

const ContainerHeight = 400;

const MainPage = () => {
  const navigate = useNavigate();
  const [getPosts, postsResult] = postsApi.useLazyFetchPostsQuery({});
  const [page, setPage] = useState(1);
  const [data, setData] = useState<IPost[]>([]);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    if (postsResult?.data) {
      setAllDataLoaded(postsResult?.data.length === 0);
      setData(data?.concat(postsResult?.data));
      if (postsResult?.data.length === 0) {
        message.error(`К сожалению, всё просмотрено!`);
      } else {
        message.success(`${postsResult?.data.length} постов загружено!`);
      }
      setPage((page) => page + 1);
    }
  }, [postsResult?.data]);

  useEffect(() => {
    getPosts({ page });
  }, []);

  const onScroll = useCallback(
    (e: React.UIEvent<HTMLElement, UIEvent>) => {
      if (
        Math.abs(
          e.currentTarget.scrollHeight -
            e.currentTarget.scrollTop -
            ContainerHeight
        ) <= 1 &&
        !allDataLoaded
      ) {
        getPosts({ page });
      }
    },
    [allDataLoaded, getPosts, page]
  );

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
        onScroll={onScroll}
      >
        {(el: IPost) => (
          <List.Item key={el?.id}>
            <List.Item.Meta
              title={<Text>{`${el?.id}. ${el?.title}`}</Text>}
              description={el?.body}
            />
            <Button onClick={() => navigate(`/posts/${el?.id}`)}>
              Просмотр
            </Button>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default MainPage;
