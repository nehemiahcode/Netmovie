"use client";
import Navbar from "../Components/Navbar";
import { useEffect } from "react";


export default function Home() {

  //this code fires anytime you are on this page to make you be at the top always.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="main text-white relative h-[500px] border-b-8 border-y-gray-700 w-[full]">
      <div className="div absolute top-0 bottom-0  w-full text-center">
        <Navbar />
        <h1 className="font-extrabold pt-16 text-2xl px-5 lg:px-24    lg:text-5xl text-white">
          Unlimited movies, TV shows, and <br className="hidden lg:flex" /> more
        </h1>
        <p className="text-lg px-5 pt-5 font-medium">
          Download anywhere. Cancel anytime.
        </p>
        <p className="text-xl pt-3 px-5  font-medium">
          Enjoy our intresting tv shows in a place convienent to you..
        </p>
      </div>
    </div>
  );
}

//mongodb+srv://codehubby:yzUTZU9shoKrSTdR@cluster0.qgqzrq4.mongodb.net/
