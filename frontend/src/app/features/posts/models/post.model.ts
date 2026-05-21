export interface Post {
  _id: string;
  title: string;
  body: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  title: string;
  body: string;
  author: string;
}

export interface UpdatePostPayload {
  title?: string;
  body?: string;
  author?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
