"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { Center } from "@chakra-ui/react";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <Center justifyContent="center">
      <h1>
        Profile of <strong>{session?.user?.username}</strong>
      </h1>
    </Center>
  );
}
