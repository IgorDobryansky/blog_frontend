"use client";

import { useAxiosAuth } from "@/hooks";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import { CommentType } from "@/types/types";

export default function CommentsList({ postId }: { postId: number }) {
  const { data: session } = useSession();
  const newCommentTextRef = useRef<HTMLInputElement>(null!);

  const [comments, setComments] = useState([]);
  const [creatingComment, setCreatingComment] = useState(false);
  const [error, setError] = useState("");
  const axios = useAxiosAuth();

  const createComment = async () => {
    setCreatingComment(true);
    setError("");
    try {
      const res = await axios.post(`/posts/${postId}/comments`, {
        text: newCommentTextRef?.current?.value,
        post_id: postId,
        user_id: session?.user.id,
        username: session?.user.username
      });
      if (res.statusText === "Created") {
        newCommentTextRef.current.value = "";
        return setCreatingComment(false);
      }
    } catch (error: any) {
      setError(error.response.data.text);
    } finally {
      setCreatingComment(false);
    }
  };

  const getComments = useCallback(async () => {
    const res = await axios.get(`/posts/${postId}/comments`);
    setComments(res.data);
  }, [axios, postId]);

  useEffect(() => {
    getComments();
  }, [creatingComment, getComments]);

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
              onClick={createComment}
            >
              Add comment
            </Button>
          </Flex>
        </FormControl>
        {!!comments.length &&
          comments.map((comment: CommentType) => (
            <Comment
              key={comment.id}
              comment={comment}
            />
          ))}
      </Flex>
    )
  );
}
