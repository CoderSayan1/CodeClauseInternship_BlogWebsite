"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

const fetcher = async (url: string | URL | Request) =>{
  const res = await fetch(url);
  const data = await res.json();

  if(!res.ok){
    const error = new Error(data.message);
    throw error;
  }
  return data;
}
//@ts-ignore
export default function Comments({ postSlug }) {
  const {status} = useSession();
  const { data, mutate, error } = useSWR(`http://localhost:3000/api/comment?postSlug=${postSlug}`, fetcher);
  const [desc, setDesc] = useState("");
  const handleSubmit = async() => {
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({desc, postSlug})
    })
    mutate();
  }

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="h-full">
      <h1 className="mb-6 font-semibold text-lg">Comments</h1>
      {status === "authenticated" ? (
        <div className="flex items-center justify-between gap-8">
          <textarea placeholder="Write a comment here" className="p-2 w-full text-sm md:text-xl" onChange={(e) => setDesc(e.target.value)}/>
          <button className="bg-green-700 hover:bg-green-900 text-white rounded-lg px-4 py-2 font-semibold outline-none border-none" onClick={handleSubmit}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div>
        {data.map((item: any) => (
          <div key={item._id}  >
            <div className="mt-10 flex gap-2">
              {item?.user?.image && <Image
                src={item.user.image}
                alt=""
                height={50}
                width={50}
                className="rounded-full"
              />}
              <div className="flex flex-col">
                <span className="text-lg capitalize">{item.user.name}</span>
                <span className="text-sm">{item.createdAt.substring(0, 10)}</span>
              </div>
            </div>
            <p className="my-4 text-wrap">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
