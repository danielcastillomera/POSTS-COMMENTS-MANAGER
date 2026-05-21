export interface Comment {
  _id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
  createdAt: string;
}

export interface CreateCommentPayload {
  postId: string;
  name: string;
  email: string;
  body: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
