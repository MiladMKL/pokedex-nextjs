import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="h-18 p-2 flex items-center justify-between bg-poke-red">
      <Link href="/">
        <img src="pokeball.png" alt="" width={50} />
      </Link>
      <Link href="/">
        <img src="/pokemon_logo.png" alt="logo" width={180} />
      </Link>
      <Link href="/">
        <img src="/github-mark.png" alt="logo" width={50} />
      </Link>
    </div>
  );
};

export default Navbar;
