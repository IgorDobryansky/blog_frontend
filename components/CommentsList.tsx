"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  useToast
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { useAxiosAuth } from "@/hooks";
import Comment from "./Comment";

import { CommentType } from "@/types/types";

export default function CommentsList({ postId }: { postId: number }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const api = useAxiosAuth();
  const { data: session } = useSession();

  const newCommentTextRef = useRef<HTMLInputElement>(null!);

  // const createComment = async () => {
  //   setCreatingComment(true);
  //   setError("");
  //   try {
  //     const res = await api.post(`/posts/${postId}/comments`, {
  //       text: newCommentTextRef?.current?.value,
  //       post_id: postId,
  //       user_id: session?.user.id,
  //       username: session?.user.username
  //     });
  //     if (res.statusText === "Created") {
  //       newCommentTextRef.current.value = "";
  //       return setCreatingComment(false);
  //     }
  //   } catch (error: any) {
  //     setError(error.response.data.text);
  //   } finally {
  //     setCreatingComment(false);
  //   }
  // };

  const getComments = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await api.get(`/posts/${postId}/comments`);
      return res.data;
    },
    refetchOnWindowFocus: false
  });

  const { data: comments } = getComments;

  const createComment = useMutation({
    mutationFn: () =>
      api.post(`/posts/${postId}/comments`, {
        text: newCommentTextRef?.current?.value,
        post_id: postId,
        user_id: session?.user.id,
        username: session?.user.username
      }),
    onSuccess: (mutationRes) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      newCommentTextRef.current.value = "";
      toast({
        title: `Comment.`,
        description: "Your comment has been " + mutationRes.data.status,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  });

  return (
    !!session?.user && (
      <Flex
        direction="column"
        width="40%"
        alignContent="center"
        p="3"
      >
        <Heading size="xs">New comment</Heading>
        <FormControl>
          <Input
            type="text"
            id="newNoteMessage"
            ref={newCommentTextRef}
            size="xs"
          />
          <Flex
            justify={"flex-end"}
            p="2"
          >
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              size="xs"
              onClick={() => createComment.mutate()}
            >
              Add comment
            </Button>
          </Flex>
        </FormControl>
        {!!comments &&
          comments.map((comment: CommentType) => (
            <Comment
              key={comment.id}
              comment={comment}
              postId={postId}
            />
          ))}
      </Flex>
    )
  );
}
