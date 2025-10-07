import React from "react";
import Header from "./components/header";
import LoginForm from "./components/loginform";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <Header/>
      <LoginForm />
    </>
  );
}
