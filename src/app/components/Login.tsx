"use client";
import { signIn } from "next-auth/react";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";

function Login() {
  return (
    <div className="bg-[#3362a8] h-screen flex flex-col items-center justify-center text-center">
      <CubeTransparentIcon className="w-screen text-white max-w-[300px]" />
      <button onClick={() => signIn("google")} className="text-white font-bold text-3xl animate-pulse">
        Sign in to use PolyglotPal
      </button>
    </div>
  );
}

export default Login;
