"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Spacer
} from "@chakra-ui/react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NextLink from "next/link";

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
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Log Out
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup gap="2">
            <Button
              colorScheme="teal"
              onClick={() => router.push("/")}
            >
              Sign Up
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

      {/* <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/dashboard">Dashboard</Link>
      {session?.user ? (
        <Link
          href="#"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </Link>
      ) : (
        <Link
          href="#"
          onClick={() => signIn()}
        >
          Log in
        </Link>
      )} */}
    </Flex>
  );
}
