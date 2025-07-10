import { isAuthenticated } from "@/lib/action/auth.action";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

import Navbar from "@/components/Navbar";
const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/signin");

  return (
    <div className="flex mx-auto max-w-7xl flex-col gap-12 my-12 px-2 max-sm:px-4 max-sm:my-8">
      <Navbar />

      {children}
    </div>
  );
};

export default RootLayout;
