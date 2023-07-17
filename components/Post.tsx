"use client";

import { PostType } from "@/types/types";
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Input,
  Spacer
} from "@chakra-ui/react";
import CommentsList from "./CommentsList";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Post({
  post,
  sequenceNumber,
  deletePost,
  deletingPost,
  editingPost,
  editPost,
  setEditingPost
}: {
  post: PostType;
  deletePost: (id: number) => void;
  deletingPost: boolean;
  sequenceNumber: number;
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
  const [postText, setPostText] = useState(post.text);
  const { data: session } = useSession();

  const createdDate = new Date(post.created_at)
    .toLocaleDateString()
    .split("/")
    .join(".");

  const createdTime = new Date(post.created_at).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Flex
      gap="2"
      direction="column"
      border="3px solid black"
      borderRadius="10px"
      width="100%"
      mb={3}
    >
      <Flex p="2">
        {editingPost ? (
          <Input
            type="text"
            id="newNoteMessage"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            size="xs"
          />
        ) : (
          <Heading size="md">
            {sequenceNumber}. {post.text}
          </Heading>
        )}
      </Flex>
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        p={2}
      >
        <Heading size="sm">
          Created by: {post.username || "Some user"} on {createdDate} in{" "}
          {createdTime}
        </Heading>
        <Spacer />
        {!!session?.user && session.user.id === post.user_id && (
          <ButtonGroup>
            <Button
              size="xs"
              colorScheme="teal"
              isDisabled={deletingPost}
              onClick={
                editingPost
                  ? () => {
                      editPost({ postId: post.id, postText: postText });
                    }
                  : () => deletePost(post.id)
              }
            >
              {editingPost ? "Save changes" : "Delete post"}
            </Button>
            <Button
              colorScheme="teal"
              size="xs"
              onClick={() => {
                setEditingPost(!editingPost);
              }}
            >
              {editingPost ? "Discard changes" : "Edit post"}
            </Button>
          </ButtonGroup>
        )}
      </Flex>

      <Flex direction="column">
        <CommentsList postId={post.id} />
      </Flex>
    </Flex>
  );
}
