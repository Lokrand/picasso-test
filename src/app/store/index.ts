/* eslint-disable @typescript-eslint/ban-ts-comment */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { postsApi } from "../../shared/api/posts/posts";
import { usersApi } from "../../shared/api/users/users";
import { AppDispatch, RootState } from "./types";

export const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  //@ts-expect-error
  [usersApi.reducerPath]: usersApi.reducer,
});

export default function setupStore() {
  return configureStore({
    reducer: rootReducer,
    //@ts-expect-error
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware, usersApi.middleware),
  });
}

export const store = setupStore();

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
