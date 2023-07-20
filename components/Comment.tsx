import { CommentType } from "@/types/types";
import Likes from "./Likes";
import { Flex, Spacer } from "@chakra-ui/react";

export default function Comment({
  comment,
  postId
}: {
  comment: CommentType;
  postId: number;
}) {
  return (
    <Flex
      borderBottom="1px solid black"
      // borderRadius="10px"
      mb={3}
      alignItems="center"
      p="3px"
    >
      <div>{comment.text}</div>
      <Spacer />
      <Likes
        postId={postId}
        commentId={comment.id}
      />
    </Flex>
  );
}
