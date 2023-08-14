import Logo from "./Logo";
import Themeswitch from "./Themeswitch";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center h-[70px] w-full top-0 left-0  lg:px-20 xl:px-24 sm:px-2">
      <Logo />
      <Themeswitch />
      <button
        type="button"
        className=" bg-red-500 rounded-md px-5 py-1 h-[40px]  text-white"
      >
        Sign out
      </button>
    </header>
  );
}
