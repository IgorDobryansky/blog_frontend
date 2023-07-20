"use client";

import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Input,
  Spacer,
  useToast
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";

import { useAxiosAuth } from "@/hooks";
import CommentsList from "./CommentsList";

import { PostType } from "@/types/types";
import Likes from "./Likes";

export default function Post({
  post,
  sequenceNumber
}: {
  post: PostType;
  sequenceNumber: number;
}) {
  const toast = useToast();
  const [editingPost, setEditingPost] = useState(false);
  const api = useAxiosAuth();

  const queryClient = useQueryClient();

  const { data: session } = useSession();

  const editPostTextRef = useRef<HTMLInputElement>(null!);

  const editPost = useMutation({
    mutationFn: () =>
      api.patch(`/posts/${post.id}`, {
        text: editPostTextRef.current.value,
        user_id: session?.user.id,
        username: session?.user.username
      }),
    onSuccess: (mutationRes) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setEditingPost(false);
      editPostTextRef.current.value = "";
      toast({
        title: `Post.`,
        description: "Your post has been " + mutationRes.data.status,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  });

  const deletePost = useMutation({
    mutationFn: () => api.delete(`/posts/${post.id}`),
    onSuccess: async (mutationRes) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: `Post.`,
        description: "Your post has been " + mutationRes.data.status,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  });

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
            ref={editPostTextRef}
            size="xs"
            defaultValue={post.text}
          />
        ) : (
          <Flex
            width="100%"
            alignItems="center"
          >
            <Heading size="md">
              {sequenceNumber}. Post id: {post.id}. {post.text}
            </Heading>
            <Spacer />
            <Likes postId={post.id} />
          </Flex>
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
              isDisabled={editPost.isLoading}
              onClick={
                editingPost
                  ? () => editPost.mutate()
                  : () => deletePost.mutate()
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
