import Link from "next/link";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex mx-auto max-w-7xl flex-col gap-12 my-12 px-2 max-sm:px-4 max-sm:my-8">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center text-2xl gap-2">
          <img src="logo.svg" alt="logo image" />
          <p className="font-semibold">SenpAI</p>
        </Link>
        <img src="profile.svg" className="h-9 w-9 rounded-full" />
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
