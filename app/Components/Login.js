"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Ripples from "react-ripples";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { MdErrorOutline } from "react-icons/md";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError("Unauthorised Login!");
        return;
      }
      router.replace("home");
    } catch (error) {
      console.log(" failed to go to home page", error);
    }
  };

  useEffect(() => {
    const Time = setTimeout(() => {
      setError(false);
    }, 1000);
    return () => clearTimeout(Time);
  }, [error]);

  return (
    <div className="main h-[100%] w-[100%]  flex items-center  justify-center">
      <form
        onSubmit={handleSubmit}
        className=" relative bg-[rgba(0,0,0,0.9)] w-[95%] shadow-2xl sm:w-[80%] rounded-md py-10 lg:w-[40%] px-4 md:w-[50%] flex flex-col gap-4 justify-center mx-auto"
      >
        <h1 className="font-semibold text-white text-2xl lg:text-3xl">
          Log in
        </h1>
        <input
          type={"email"}
          placeholder={"Email"}
          autoComplete={"off"}
          onChange={(e) => setEmail(e.target.value)}
          className=" py-3 px-1  outline-none  bg-[rgb(86,77,77)]  w-[100%]  text-white focus:border-[1px] border-red-500  font-medium text-md"
        />
        <span className=" relative">
          <input
            type={type ? "text" : "password"}
            autoComplete={"off"}
            placeholder={"password"}
            onChange={(e) => setPassword(e.target.value)}
            className=" py-3 px-2 border-slate-400 outline-none bg-[rgb(86,77,77)] shadow-lg  w-[100%]  text-white font-medium text-sm"
          />
          <span
            onClick={() => setType(!type)}
            className=" absolute text-white right-3 text-xl top-3"
          >
            {type ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </span>
        </span>
        <Ripples className="my-3 ">
          <button
            type="submit"
            className="w-[100%] bg-red-600 cursor-default md:cursor-pointer text-white  text-center font-medium  py-3 px-4 "
          >
            Log in
          </button>
        </Ripples>
        {error && (
          <div className={`absolute  duration-300 z-[999] top-[0] lg:left-[15%] h-[300px] w-[90%] lg:w-[70%] flex items-center flex-col   bg-white text-red-600 py-6 px-4 rounded-md`}>
            <span className="text-red-600 text-7xl text-center pt-3">
              <MdErrorOutline />
            </span>
            <h1 className="text-xl font-medium"> {error}!</h1>
          </div>
        )}
        <h1 className="text-white text-md font-medium text-right">
          {" "}
          Dont have an account?{" "}
          <Link
            prefetch={false}
            href="/signin"
            className="font-semibold text-blue-700 pl-2 underline"
          >
            Sign in
          </Link>
        </h1>
      </form>
      {error && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] top-0 bottom-0 w-full"></div>
      )}
    </div>
  );
}
