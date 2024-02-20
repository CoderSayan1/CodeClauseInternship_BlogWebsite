"use client";

import Link from "next/link";
import logo from "../../../public/images/logo1.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Authenticated from "@/components/authenticated/authLinks";
import { navLinks } from "@/utils/navLinks";


export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className="bg-gradient-to-b from-transparent to-slate-300 w-3/4 mx-auto rounded-br-2xl rounded-bl-2xl top-0 start-0 z-20 sticky backdrop-blur-lg dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={logo}
            className="h-10 w-10 rounded-full"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            SDBlog
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Authenticated />
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-semibold text-lg border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li >
              {navLinks.map((link) =>{
                return(
                  <Link href={link.href} key={link.name} className={`px-4 hover:text-blue-700 ${pathName === link.href ? 'text-blue-700' : 'text-black'}`}>
                    {link.name}
                  </Link>
                )
              })}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
