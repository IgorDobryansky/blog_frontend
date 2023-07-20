"use client";

import PostList from "@/components/PostsList";

import { Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      direction="column"
      width="100%"
      alignItems="center"
      p="3"
    >
      <PostList />
    </Flex>
  );
}
