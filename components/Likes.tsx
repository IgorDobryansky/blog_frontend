"use client";

import { useEffect, useState } from "react";
import { Flex, Heading, Icon, Spacer, useToast } from "@chakra-ui/react";
import { BiDislike, BiSolidLike, BiLike, BiSolidDislike } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { useAxiosAuth } from "@/hooks";
import { LikeType } from "@/types/types";

export default function Likes({
  postId,
  commentId
}: {
  postId?: number;
  commentId?: number;
}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const api = useAxiosAuth();

  const [likes, setLikes] = useState([] as LikeType[]);
  const [dislikes, setDislikes] = useState([] as LikeType[]);
  const [isLikeActive, setIsLikeActive] = useState(false);
  const [isDislikeActive, setIsDislikeActive] = useState(false);

  const getLikes = useQuery({
    queryKey: ["likes", !!commentId ? { postId, commentId } : { postId }],
    queryFn: async () => {
      const res = await api.get<LikeType[]>(
        !!commentId
          ? `/posts/${postId}/comments/${commentId}/comment_likes`
          : `/posts/${postId}/post_likes`
      );
      return res.data;
    },
    refetchOnWindowFocus: false
  });

  const { data: votes } = getLikes;

  const toggleLike = useMutation({
    mutationFn: () =>
      api.post(
        !!commentId
          ? `/posts/${postId}/comments/${commentId}/comment_likes`
          : `/posts/${postId}/post_likes`,
        {
          [!!commentId ? "comment_id" : "post_id"]: !!commentId
            ? commentId
            : postId,
          vote: "like",
          user_id: session?.user.id,
          username: session?.user.username
        }
      ),
    onSuccess: async (mutationRes) => {
      queryClient.invalidateQueries({
        queryKey: ["likes", !!commentId ? { postId, commentId } : { postId }]
      });
      toast({
        title: `Changing ${!!commentId ? "comment" : "post"} vote.`,
        description: "Your like has been " + mutationRes.data.status,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  });

  const toggleDislike = useMutation({
    mutationFn: () =>
      api.post(
        !!commentId
          ? `/posts/${postId}/comments/${commentId}/comment_likes`
          : `/posts/${postId}/post_likes`,
        {
          [!!commentId ? "comment_id" : "post_id"]: !!commentId
            ? commentId
            : postId,
          vote: "dislike",
          user_id: session?.user.id,
          username: session?.user.username
        }
      ),
    onSuccess: async (mutationRes) => {
      queryClient.invalidateQueries({
        queryKey: ["likes", !!commentId ? { postId, commentId } : { postId }]
      });
      toast({
        title: `Changing ${!!commentId ? "comment" : "post"} vote.`,
        description: "Your dislike has been " + mutationRes.data.status,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  });

  useEffect(() => {
    if (votes) {
      const filteredLikes = votes?.filter(({ vote }) => vote === "like");
      const filteredDislikes = votes?.filter(({ vote }) => vote === "dislike");

      setLikes(filteredLikes);
      setDislikes(filteredDislikes);

      const isLiked = filteredLikes.some(
        (vote) => vote.user_id === session?.user.id && vote.vote === "like"
      );

      const isDisliked = filteredDislikes.some(
        (vote) => vote.user_id === session?.user.id && vote.vote === "dislike"
      );

      isLiked ? setIsLikeActive(true) : setIsLikeActive(false);
      isDisliked ? setIsDislikeActive(true) : setIsDislikeActive(false);
    }
  }, [votes, session?.user.id]);

  return (
    <Flex direction="column">
      <Flex>
        <Icon
          style={{ cursor: "pointer" }}
          as={isLikeActive ? BiSolidLike : BiLike}
          onClick={() => toggleLike.mutate()}
        />
        <Heading
          size="xs"
          style={{ whiteSpace: "nowrap" }}
        >
          {likes?.length + " likes"}
        </Heading>
      </Flex>
      <Flex>
        <Icon
          style={{ cursor: "pointer" }}
          as={isDislikeActive ? BiSolidDislike : BiDislike}
          onClick={() => toggleDislike.mutate()}
          // onClick={() => setIsDislikeActive(!isDislikeActive)}
        />
        <Heading
          size="xs"
          style={{ whiteSpace: "nowrap" }}
        >
          {dislikes?.length + " dislikes"}
        </Heading>
      </Flex>
    </Flex>
  );
}
