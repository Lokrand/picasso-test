import { api } from "..";
import { IUser, IFetchUser } from "./users.d";

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchUser: build.query<IUser, IFetchUser>({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
      providesTags: ["Users"],
    }),
  }),
});
