export interface IPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface IFetchPostsParams {
  page?: number;
}

export interface IFetchOnePost {
  id?: number;
}
