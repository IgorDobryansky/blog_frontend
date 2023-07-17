"use client";

import { Box, Button, ButtonGroup, Flex, Spacer } from "@chakra-ui/react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Flex
      maxW="100%"
      bg="green.400"
    >
      <Box p="2">
        <Button onClick={() => router.push("/")}>Blog</Button>
      </Box>
      <Spacer />
      <Box p="2">
        <Button
          colorScheme="teal"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </Button>
      </Box>
      <Box p="2">
        {session?.user ? (
          <ButtonGroup gap="2">
            <Button
              colorScheme="teal"
              onClick={() => router.push("/profile")}
            >
              Profile
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => signOut()}
            >
              Log Out
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup gap="2">
            <Button
              colorScheme="teal"
              onClick={() => router.push("/auth/registration")}
            >
              Registration
            </Button>

            <Button
              colorScheme="teal"
              onClick={() => signIn()}
            >
              Log in
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Flex>
  );
}
