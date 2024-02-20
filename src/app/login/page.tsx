"use client";

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage(){
  const { data, status } = useSession();
  const router = useRouter();
  console.log(data, status);
  useEffect(() => {
    if (status === "authenticated") {
      router.push('/');
    }
  }, [status, router]); // Include 'router' in the dependency array

  if(status === "loading"){
    return <div>Loading...</div>
  }

  return(
    <div className="h-[100vh] w-3/4 mx-auto">
      <h1 className="text-center mt-20 font-bold text-2xl">Login</h1>
      <div className="flex justify-center items-center my-8">
        <div className="rounded-xl px-16 py-24 bg-gradient-to-b from-transparent to-slate-700 backdrop-blur-lg text-center">
          <button className="font-semibold text-xl bg-orange-500 px-4 py-2 text-white rounded-lg hover:bg-orange-700" onClick={() => signIn("google")}>Login with Google</button>
        </div>
      </div>
    </div>
  )
}
