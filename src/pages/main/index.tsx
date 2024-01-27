/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Button, Divider, List, Skeleton, Typography } from "antd";
import { postsApi } from "../../services/rtk-query/posts/posts";
import { IPost } from "../../services/rtk-query/posts/posts";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const MainPage = () => {
  const navigate = useNavigate();
  const [getPosts, getPostsResult] = postsApi.useLazyFetchPostsQuery({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IPost[]>([]);

  const loadMoreData = () => {
    // if (loading) {
    //   return;
    // }
    // setLoading(true);
    getPosts({ page });
    setPage(page + 1);
    // setLoading(false);
  };

  useEffect(() => {
    if (getPostsResult.data) {
      console.log(getPostsResult.data);
      const slicedData = data.slice(0, 10 * page);
      setData([...slicedData, ...getPostsResult.data]);
    }
  }, [getPostsResult]);

  // console.log("data", data);

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 100}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>Это всё, больше постов нет.</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(el) => (
            <List.Item key={el.id}>
              <List.Item.Meta
                title={<Text>{`${el.id}. ${el.title}`}</Text>}
                description={el.body}
              />
              <Button onClick={() => navigate(`/posts/${el.id}`)}>
                Просмотр
              </Button>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
