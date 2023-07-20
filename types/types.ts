export type PostType = {
  username: string | null;
  id: number;
  user_id: number | null;
  text: string;
  created_at: string;
  comments: CommentType[];
};

export type CommentType = {
  username: string | null;
  id: number;
  user_id: number | null;
  text: string;
  created_at: string;
};

export type LikeType = {
  username: string;
  user_id: number;
  post_id?: number;
  comment_id?: number;
  vote: string
};
