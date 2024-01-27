import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { postsApi } from "../../services/rtk-query/posts/posts";
import { usersApi } from "../../services/rtk-query/users/users";

export const PostPage = () => {
  const { id } = useParams();
  const [authorName, setAuthorName] = useState<string>("");

  const { data: postData } = postsApi.useFetchOnePostQuery({ id });
  const [fetchPostAuthor, result] = usersApi.useLazyFetchUserQuery();

  useEffect(() => {
    if (postData?.userId) {
      fetchPostAuthor({ id: postData?.userId });
    }
  }, [postData]);

  useEffect(() => {
    setAuthorName(result?.data?.name);
  }, [result]);

  console.log(authorName);

  return <div>Post</div>;
};
