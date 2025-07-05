import { isAuthenticated } from "@/lib/action/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const RootLayout = async({ children }: { children: ReactNode }) => {
    const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/signin");

  return (
   

  
    <div className="flex mx-auto max-w-7xl flex-col gap-12 my-12 px-2 max-sm:px-4 max-sm:my-8">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center text-2xl gap-2">
<Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />          <p className="font-semibold">SenpAI</p>
        </Link>
        <Image src="profile.svg" className="rounded-full flex items-center text-2xl gap-2" width={38} height={32} alt="profile"/>
      </nav>
       
      {children}
      
    </div>
      
  );
};

export default RootLayout;
