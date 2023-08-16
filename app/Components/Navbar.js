"use client"
import Logo from "./Logo";
import Themeswitch from "./Themeswitch";
import Ripples from "react-ripples"
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center h-[70px] w-full top-0 left-0 px-3  lg:px-20 xl:px-24 sm:px-2">
      <Logo />
    <div className="flex items-center gap-4">
    <Themeswitch />
     <Ripples>
     <button
      onClick={() => signOut()}
        type="button"
        className=" bg-red-600 rounded-md px-5 py-1 h-[40px]  text-white"
      >
        Sign out
      </button>
     </Ripples>
    </div>
    </header>
  );
}
