"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
  Heading,
  Center,
  Flex
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

export default function AuthForm({ type }: { type: string }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const userName = useRef("");
  const password = useRef("");

  const submit = async () => {
    await signIn("credentials", {
      username: userName.current,
      password: password.current,
      authType: type === "registration" ? "registration" : "login" ,
      redirect: true,
      callbackUrl: "/dashboard"
    });
  };

  return (
    <Flex justifyContent="center">
      <Flex
        direction="column"
        width="30%"
        alignItems="center"
      >
        <Heading>{type === "registration" ? "Registration" : "Log in"}</Heading>
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
          <Center>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              onClick={submit}
            >
              Submit
            </Button>
          </Center>
        </FormControl>
      </Flex>
    </Flex>
  );
}
