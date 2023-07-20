import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  useToast
} from "@chakra-ui/react";
import Post from "./Post";
import { PostType } from "@/types/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "@/hooks";
import { useSession } from "next-auth/react";
import { useRef } from "react";

export default function PostList() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: session } = useSession();
  const api = useAxiosAuth();

  const newPostTextRef = useRef<HTMLInputElement>(null!);

  const getPosts = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await api.get("/posts");
      return res.data;
    },
    refetchOnWindowFocus: false
  });

  const { data: posts } = getPosts;

  const createPost = useMutation({
    mutationFn: () =>
      api.post("/posts", {
        text: newPostTextRef?.current?.value,
        user_id: session?.user.id,
        username: session?.user.username
      }),
    onSuccess: (mutationRes) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      newPostTextRef.current.value = "";
      toast({
        title: `Creating post.`,
        description: "Your post has been " + mutationRes.data.status,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
    },
    onError: (error: { response: { data: string[] } }) => {
      toast({
        title: `Creating post.`,
        description: error.response.data,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  });

  return (
    <Flex
      direction="column"
      width="70%"
      alignItems="center"
    >
      {!!session?.user && (
        <Flex
          direction="column"
          width="70%"
        >
          <Heading>New post</Heading>
          <FormControl>
            <Input
              type="text"
              id="newPostMessage"
              placeholder="Enter post text"
              ref={newPostTextRef}
            />
            <FormHelperText>{}</FormHelperText>
            <Flex
              justify={"flex-end"}
              p="2"
            >
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isDisabled={createPost.isLoading}
                onClick={() => createPost.mutate()}
              >
                Create post
              </Button>
            </Flex>
          </FormControl>
        </Flex>
      )}
      {!!posts &&
        posts.map((post: PostType, index: number) => (
          <Post
            sequenceNumber={index + 1}
            post={post}
            key={post.id}
          />
        ))}
    </Flex>
  );
}
