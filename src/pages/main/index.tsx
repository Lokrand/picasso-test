/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { Button, List, Typography } from "antd";
import VirtualList from "rc-virtual-list";
import { postsApi } from "../../shared/api/posts/posts";
import { IPost } from "../../shared/api/posts/posts";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const ContainerHeight = 400;

export const MainPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IPost[] | undefined>([]);
  const [getPosts, getPostsResult] = postsApi.useLazyFetchPostsQuery({});
  const [page, setPage] = useState(1);
  const [handleScroll, setHandleScroll] = useState(false);
  const [isAppendData, setIsAppendData] = useState(false);

  const appendData = () => {
    setHandleScroll(true);
    if (getPostsResult) {
      if (data?.length == 20) {
        setData((prevState) => {
          const splicedData = prevState?.slice(10, 20);

          return splicedData?.concat(getPostsResult?.data);
        });
      } else {
        setData(data?.filter((el) => el).concat(getPostsResult?.data));
      }
    }
  };

  const prependData = () => {
    setHandleScroll(true);
    if (getPostsResult) {
      setData((prevState) => {
        const splicesData = prevState?.slice(0, 10);

        return getPostsResult?.data?.concat(splicesData);
      });
    }
  };

  useEffect(() => {
    getPosts({ page: 1 });
    // setPage(page + 1);
    // appendData();
  }, []);

  useEffect(() => {
    if (isAppendData) {
      appendData();
    } else {
      prependData();
    }
  }, [getPostsResult, page]);

  console.log(getPostsResult);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) >= 872 &&
      page >= 1
    ) {
      setIsAppendData(false);
      setPage(page - 1);
      setHandleScroll(true);
      getPosts({ page });
      // prependData();
    } else if (
      Math.abs(
        e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          ContainerHeight
      ) <= 1 &&
      // т.к. с бека не приходит количество всех элементов, то ограничиваю сам на 10 страниц
      // чтобы исключить "пустые" запросы на бек
      page <= 10
    ) {
      setIsAppendData(true);
      setPage(page + 1);
      setHandleScroll(true);
      getPosts({ page });
      // appendData();
    }
  };

  return (
    <List>
      <VirtualList
        data={data?.filter((el) => el)}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
        onScroll={onScroll}
        ref={(element) => {
          if (element && handleScroll && data?.length > 10) {
            console.log(element.getScrollInfo());
            element.scrollTo(400);
            setHandleScroll(false);
          }
        }}
      >
        {(el: IPost | undefined) => (
          <List.Item key={el?.id}>
            <List.Item.Meta
              title={<Text>{`${el?.id}. ${el?.title}`}</Text>}
              description={el?.body}
            />
            <Button onClick={() => navigate(`/posts/${el.id}`)}>
              Просмотр
            </Button>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
