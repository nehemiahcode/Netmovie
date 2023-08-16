"use client";
import Logo, { Logo2 } from "./Logo";
import Themeswitch from "./Themeswitch";
import Ripples from "react-ripples";
import { signOut } from "next-auth/react";
import { CiMenuKebab } from "react-icons/ci";
import { RiMenu4Fill } from "react-icons/ri";
import {FaCancel} from "react-icons/fa"
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const menuRef = useRef();
  const IconRef = useRef();
  const IconRef2 = useRef();
  const { data: session } = useSession();

  useEffect(() => {
    const handleSearching = (event) => {
      if (
        IconRef.current &&
        !IconRef.current.contains(event.target) &&

        IconRef2.current &&
        !IconRef2.current.contains(event.target) &&

        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };

    window.addEventListener("click", handleSearching);
    return () => {
      window.removeEventListener("click", handleSearching);
    };
  }, []);

  return (
    <header className="flex justify-between items-center h-[70px] w-full top-0 left-0 px-3  lg:px-20 xl:px-24 sm:px-2">
      <Logo />
      <div className="flex items-center gap-4">
      

      <div className=" relative">
      <div
          ref={IconRef}
          onClick={() => setDropdown(!dropdown)}
          className=" ring-1 hover:bg-slate-800 hidden lg:flex ring-slate-200 items-center gap-3 cursor-pointer px-3 py-1 w-auto rounded-full"
        >
          <h1 className="text-white font-semibold text-md">
            {session?.user?.name}
          </h1>
          <span
            className={` ${
              dropdown ? " rotate-180 duration-300" : " duration-300"
            } text-white text-2xl`}
          >
            <MdOutlineArrowDropDown />
          </span>

         
        </div>

        <span ref={IconRef2} onClick={() => setDropdown(!dropdown)} className=" text-2xl flex lg:hidden"><RiMenu4Fill/></span>
        {dropdown && (
            <div
              ref={menuRef}
              className=" absolute top-10 w-[300px] right-6 bg-slate-900 rounded-md px-4 py-3 h-[auto]"
            >
            <Logo2/>

            <h1 className="text-white text-md font-semibold pt-2 text-center">{session?.user?.name}</h1>
            <h1 className="text-sm  font-medium  text-center py-1 text-white">{session?.user.email}</h1>

            <div  className="flex items-center flex-col gap-3 py-4">
            <Themeswitch />

            <Ripples>
          <button
            onClick={() => signOut()}
            type="button"
            className=" bg-red-600  rounded-md px-5 py-1 h-[40px]  text-white"
          >
            Sign out
          </button>
        </Ripples>
            </div>
            </div>
          )}
      </div>
      </div>
    </header>
  );
}
