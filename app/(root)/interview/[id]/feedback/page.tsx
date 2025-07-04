"use client";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/action/auth.action";
import { redirect } from "next/navigation";


const page = async() => {
    const user = await getCurrentUser()
    if(!user) redirect('/signin')
  return (
    <>
      <h3>InterView generation</h3>
      <Agent username={user.username} userId={user.id} type='interview' />
      
    </>
  );
};

export default page;
