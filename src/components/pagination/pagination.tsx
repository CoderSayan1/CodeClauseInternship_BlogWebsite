"use client";

import { useRouter } from "next/navigation";

// @ts-ignore
export default function Pagination({ page, hasPrev, hasNext }) {
  const router = useRouter();
  return (
    <div className="flex justify-around w-2/3 mb-10">
      <button
        className="bg-red-700 text-white px-4 py-2 border-none disabled:bg-[#b06d6d] disabled:cursor-not-allowed"
        onClick={() => router.push(`?page=${page - 1}`)}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button
        className="bg-red-700 text-white px-4 py-2 border-none disabled:bg-[#b06d6d] disabled:cursor-not-allowed"
        onClick={() => router.push(`?page=${page + 1}`)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}
