"use client";

import useAxiosAuth from "@/hooks";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

// import { useSession } from "next-auth/react";

export default function Home({ children }: { children: string }) {
  // const { data: session, status } = useSession({
  //   required: false
  // });
  const [notes, setNotes] = useState()
  const axios = useAxiosAuth()

  const getNotes = async ()=>{
    const res = await axios.get("/notes")
    console.log(res);
    setNotes(res.data)
  }
  // getNotes()

  return <>
  <Button onClick={getNotes}>Get notes</Button>{notes && JSON.stringify(notes)}</>;
}
