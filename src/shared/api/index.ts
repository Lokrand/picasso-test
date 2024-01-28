import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

export const api = createApi({
  baseQuery,
  keepUnusedDataFor: 0.0001,
  tagTypes: ["Posts", "Users"],
  endpoints: () => ({}),
});
