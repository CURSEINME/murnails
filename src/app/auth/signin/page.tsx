"use client";

import Button from "@/app/components/UI/Button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { data: session } = useSession();
  const handleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) return redirect("/");
  }, [session]);
  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center ">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md  text-center  text-xl w-full">
        <Button onClick={handleSignIn} variant="primary">
          Войти с помощью Google
        </Button>
      </div>
    </div>
  );
}
