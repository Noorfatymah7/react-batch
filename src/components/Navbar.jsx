import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
    const pathname = usePathname()
  const navlinks = [
    { name: "Home", herf: "/" },
    { name: "Upload", herf: "/upload" },
    { name: "Blogs", herf: "/blogs" },
  ];
  return (
    <nav className="flex justify-between z-50 shadow-md shadow-slate-300 items-center py-4 px-6 sticky top-0  backdrop-blur-md">
        <Link href={"/"}>
            <Image width={50} height={50} src={"/logo.png"}/>
        </Link>
          <ul className="flex gap-3">
        {navlinks.map((v, i) => (
          <li>
            <Link className={`tracking-wide uppercase py-2 px-2 rounded-md ${pathname == v.herf && "bg-orange-400 text-white"}`} href={v.herf}>{v.name}</Link>
          </li>
        ))}
      </ul>
      <button className="bg-orange-400/75 py-2 px-3 rounded-md text-white">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
