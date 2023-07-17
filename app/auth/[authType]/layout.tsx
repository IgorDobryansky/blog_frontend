'use client'

import { ReactNode, Suspense } from "react";
import Loading from "./loading";

export default function layout({
  children
}: {
  children: ReactNode | ReactNode[];
}) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
