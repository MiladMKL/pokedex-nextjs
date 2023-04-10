import Link from "next/link";
import React from "react";
import { FaGithubAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="min-h-8 pt-8 px-4 pb-1 flex items-center justify-between bg-zinc-200">
      <p></p>
      <Link href="/">
        <img src="/pokemon_logo.png" alt="logo" width={200} />
      </Link>
      <a href="https://github.com/MiladMKL/pokedex-nextjs">
        <FaGithubAlt size={40} />
      </a>
    </div>
  );
};

export default Navbar;
