import { Flex } from "@chakra-ui/react";
import Post from "./Post";
import { PostType } from "@/types/types";
export default function PostList({
  posts,
  deletePost,
  deletingPost,
  editingPost,
  editPost,
  setEditingPost
}: {
  posts: PostType[] | undefined;
  deletePost: (id: number) => Promise<void>;
  deletingPost: boolean;
  editingPost: boolean;
  editPost: ({
    postId,
    postText
  }: {
    postId: number;
    postText: string;
  }) => void;
  setEditingPost: any;
}) {
  return (
    <Flex
      direction="column"
      width="70%"
    >
      {!!posts &&
        posts.map((post, index) => (
          <Post
            sequenceNumber={index + 1}
            post={post}
            key={post.id}
            deletePost={deletePost}
            deletingPost={deletingPost}
            editingPost={editingPost}
            editPost={editPost}
            setEditingPost={setEditingPost}
          />
        ))}
    </Flex>
  );
}
