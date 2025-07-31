"use client";

import { logOut } from "@/lib/action/auth.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <Link href="/" className="flex items-center text-2xl gap-2">
        <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />{" "}
        <p className="font-semibold">SenpAI</p>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            src='/luffycover.jpg'
            className="rounded-full flex items-center"
            width={50}
            height={60}
            alt="profile"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={async () => await logOut()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
