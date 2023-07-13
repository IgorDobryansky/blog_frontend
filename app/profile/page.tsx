"use client";

import React from "react";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Profile of {session?.user?.username}</h1>
    </div>
  );
}
