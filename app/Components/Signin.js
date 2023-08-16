"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Ripples from "react-ripples";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/navigation";
import {MdErrorOutline} from "react-icons/md"

export default  function SigninForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name  || !email || !password) {
      setError("All fields are required");
      return;
    }
    try {

      const resUserExists = await fetch("api/userExist", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({email}),
      });

      const {user } = await resUserExists.json();
      if (user) {
        setError("User already exists.")
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/")
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error durig registration:", error);
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
        className=" relative bg-[rgba(0,0,0,0.9)] w-[95%] shadow-2xl sm:w-[70%] rounded-md py-10 lg:w-[40%] px-4 md:w-[60%] flex flex-col gap-4 justify-center mx-auto"
      >
        <h1 className="font-semibold text-white text-2xl lg:text-3xl">Sign in</h1>
        <input
          type={"text"}
          placeholder={"First name"}
          onChange={(e) => setName(e.target.value)}
          className=" py-3 px-1 outline-none  bg-[rgb(86,77,77)]  text-white w-[100%]   font-medium text-md"
        />
        <input
          type={"email"}
          placeholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
          className=" py-3 px-1  outline-none  bg-[rgb(86,77,77)]  w-[100%]  text-white focus:ring-[1px] ring-white font-medium text-md"
        />
        <span className=" relative">
          <input
            type={type ? "text" : "password"}
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
            Sign in
          </button>
        </Ripples>
        {error && (
          <div className=" absolute duration-300 z-[99] top-[0] lg:left-[15%] h-[300px]  w-[90%] lg:w-[70%] flex items-center flex-col   bg-white text-red-600 py-6 px-4 rounded-md">
            <span className=" animate-bounce text-red-600 text-7xl text-center pt-3">
              <MdErrorOutline />
            </span>
            <h1 className="text-xl font-normal"> {error}!</h1>
          </div>
        )}
        <h1 className="text-white text-md font-medium text-right">
          {" "}
        Already have an account?{" "}
          <Link
            prefetch={false}
            href="/"
            className="font-semibold text-blue-700 pl-2 underline"
          >
            Log in
          </Link>
        </h1>
      </form>
      {error && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] top-0 bottom-0 w-full"></div>
      )}
    </div>
  );
}