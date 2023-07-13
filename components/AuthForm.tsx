"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  Center
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

export default function AuthForm({ type }: { type: string }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const userName = useRef("");
  const password = useRef("");
  const submit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/"
    });
  };
  return (
    <FormControl>
      <FormLabel>User name</FormLabel>
      <Input
        type="text"
        id="username"
        onChange={(e) => (userName.current = e.target.value)}
      />

      <FormLabel>Password</FormLabel>
      <InputGroup size="md">
        <Input
          type={show ? "text" : "password"}
          id="password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleClick}
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        mt={4}
        colorScheme="teal"
        type="submit"
        onClick={submit}
      >
        Submit
      </Button>
    </FormControl>
  );
}
