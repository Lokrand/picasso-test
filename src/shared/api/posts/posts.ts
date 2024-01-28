import { api } from "..";
import { IPost, IFetchPostsParams, IFetchOnePost } from "./posts";

export const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchPosts: build.query<IPost[], IFetchPostsParams>({
      query: ({ page }) => ({
        url: `/posts?_page=${page}`,
      }),
      providesTags: ["Posts"],
    }),
    fetchOnePost: build.query<IPost, IFetchOnePost>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
      }),
      providesTags: ["Posts"],
    }),
  }),
});
