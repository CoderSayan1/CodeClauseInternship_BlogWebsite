"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/utils/navLinks";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";


export default function Authenticated() {
  const {status} = useSession();
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  const handleSignOutClick: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    signOut(); // Assuming signOut is defined somewhere
  };
  return (
    <>
      {status === "unauthenticated" ? (
        <Link
          href="/login"
          className=" text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer md:block hidden"
        >
          Login
        </Link>
      ) : (
        <div className="md:block hidden">
          <Link
            href="/write"
            className="mr-8 hover:text-blue-700 font-semibold text-lg"
          >
            Write
          </Link>
          <span className=" text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer" onClick={handleSignOutClick}>
            Logout
          </span>
        </div>
      )}
      {/* mobile screen */}
      <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-sticky"
        aria-expanded="false"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-[70px] right-0 h-[calc(100vh - 70px)] w-full bg-orange-300 flex flex-col items-center justify-center gap-8 py-10 rounded-br-xl rounded-bl-xl">
          {navLinks.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.name}
                className={`px-4 hover:text-blue-700 font-semibold text-xl ${
                  pathName === link.href ? "text-blue-700" : "text-black"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {status === "unauthenticated" ? (
            <Link
              href="/login"
              className=" text-black hover:text-blue-500 text-xl  cursor-pointer font-semibold"
            >
              Login
            </Link>
          ) : (
            <div className="font-semibold text-xl flex flex-col gap-10">
              <Link
                href="/write"
                className="hover:text-blue-700 "
              >
                Write
              </Link>
              <span className="text-black hover:text-blue-500 cursor-pointer">
                Logout
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}


