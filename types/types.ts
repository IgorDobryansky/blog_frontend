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

