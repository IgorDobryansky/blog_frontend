"use client";

import PostList from "@/components/PostsList";
import { useAxiosAuth } from "@/hooks";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState();
  const [creatingPost, setCreatingPost] = useState(false);
  const [deletingPost, setDeletingPost] = useState(false);
  const [editingPost, setEditingPost] = useState(false);
  const [error, setError] = useState("");
  const axios = useAxiosAuth();

  const newPostTextRef = useRef<HTMLInputElement>(null!);
  const { data: session } = useSession();

  const createNote = async () => {
    setCreatingPost(true);
    setError("");
    try {
      const res = await axios.post("/posts", {
        text: newPostTextRef?.current?.value,
        user_id: session?.user.id,
        username: session?.user.username
      });
      if (res.statusText === "Created") {
        newPostTextRef.current.value = "";
        return setCreatingPost(false);
      }
    } catch (error: any) {
      setError(error.response?.data.text);
    } finally {
      setCreatingPost(false);
    }
  };

  const deletePost = async (id: number) => {
    setDeletingPost(true);
    const res = await axios.delete(`/posts/${id}`);
    if (res) {
      setDeletingPost(false);
    }
  };

  const editPost = async ({
    postId,
    postText
  }: {
    postId: number;
    postText: string;
  }) => {
    const res = await axios.patch(`/posts/${postId}`, {
      text: postText,
      post_id: postId,
      user_id: session?.user.id,
      username: session?.user.username
    });
    if (res) {
      setEditingPost(false);
    }
  };

  const getposts = useCallback(async () => {
    const res = await axios.get("/posts");

    setPosts(res.data);
  }, [axios]);

  useEffect(() => {
    getposts();
  }, [creatingPost, deletingPost, editingPost, getposts]);

  return (
    <Flex
      direction="column"
      width="100%"
      alignItems="center"
      p="3"
    >
      {!!session?.user && (
        <Flex
          direction="column"
          alignItems="center"
          width="70%"
        >
          <Heading>New post</Heading>
          <FormControl>
            <Input
              type="text"
              id="newNoteMessage"
              placeholder="Enter post text"
              ref={newPostTextRef}
            />
            <FormHelperText>{error}</FormHelperText>
            <Flex
              justify={"flex-end"}
              p="2"
            >
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isDisabled={creatingPost}
                onClick={createNote}
              >
                Create post
              </Button>
            </Flex>
          </FormControl>
        </Flex>
      )}
      <PostList
        posts={posts}
        deletePost={deletePost}
        deletingPost={deletingPost}
        editingPost={editingPost}
        editPost={editPost}
        setEditingPost={setEditingPost}
      />
    </Flex>
  );
}
