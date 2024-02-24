"use client";

import { useRouter } from "next/navigation";

// @ts-ignore
export default function Pagination({ page, hasPrev, hasNext }) {
  const router = useRouter();
  return (
    <div className="flex justify-around w-2/3 mb-10">
      <button
        className="bg-red-700 text-white md:px-4 px-3 md:py-2 py-1 rounded-lg border-none disabled:bg-[#b06d6d] disabled:cursor-not-allowed"
        onClick={() => router.push(`?page=${page - 1}`)}
        disabled={!hasPrev}
      >
        Prev
      </button>
      <button
        className="bg-red-700 text-white md:px-4 px-3 md:py-2 py-1 rounded-lg border-none disabled:bg-[#b06d6d] disabled:cursor-not-allowed"
        onClick={() => router.push(`?page=${page + 1}`)}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}
