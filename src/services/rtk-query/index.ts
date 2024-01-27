import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://jsonplaceholder.typicode.com",
});

export const api = createApi({
  baseQuery,
  keepUnusedDataFor: 0.0001,
  tagTypes: ["Posts", "Users"],
  endpoints: () => ({}),
});
