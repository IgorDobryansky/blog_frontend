import AuthForm from "@/components/AuthForm";
import { ReactNode } from "react";

type Props = {
  params: {
    authType: string;
  };
  children: ReactNode | ReactNode[];
};

export default function layout({ children, params: { authType } }: Props) {
  return (
    <>
      <AuthForm type={authType} />
      {children}
    </>
  );
}
