"use client";
import Navbar from "../Components/Navbar";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut(); // Make sure to await the signOut function call
  };

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
          {/* Watch anywhere. Cancel anytime. */}
          Name: {session?.user?.name}
        </p>
        <p className="text-xl pt-3 px-5  font-medium">
          {/* Enjoy our intresting tv shows in a place convienent to you.. */}
          Email: {session?.user?.email}
        </p>

        <div>
          {session ? (
            <button
              className=" bg-red-600 rounded px-5 py-1 h-[40px]  text-white"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

//mongodb+srv://codehubby:yzUTZU9shoKrSTdR@cluster0.qgqzrq4.mongodb.net/
