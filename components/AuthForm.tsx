"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import Link from "next/link";
import FormField from "./FormField";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const authFormSchema = (type: string) => {
  return z.object({
    username: type === "sign-up" ? z.string().min(2) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
};

const AuthForm = ({ type }: { type: string }) => {
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter()
  const isSignIn = type === "sign-in";
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try{
        if(type==='sign-in'){
            toast.success('Sign in successfull')
            router.push('/')
        } else{
            toast.success('Account Created Successfully')
            router.push('/signin')
        }
    }catch(err){
        toast.error('Error occured'+err)
    }
  };
  return (
    <div className="border border-white px-20 py-5 w-[500px] rounded-2xl">
      <div className="flex items-center flex-col gap-6 mb-2">
        <div className="flex space-x-2 text-xl items-center">
          <img src="/logo.svg" alt="logo" className="w-10 h-10" />
          <h1 className="font-semibold">SenpAI</h1>
        </div>
        <h1 className="text-3xl font-semibold italic text-center">
          Practice Interviews with SenpAI
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {!isSignIn && <FormField name="username" placeholder="Enter username" label="username" control={form.control}/>}
          <FormField name="email" placeholder="Enter email" label="email" control={form.control} type="email"/>
          <FormField name="password" placeholder="Enter password" label="password" control={form.control} type="password"/>
          <Button type="submit" className="mt-2 mb-2 rounded-2xl p-6">
            {isSignIn ? "sign in" : "Create an account"}
          </Button>
          <p>
            {!isSignIn? 'Have an account already ?':'Dont have an account?'}-<Link className="font-bold cursor-pointer" href={!isSignIn? '/signin':'/signup'}>{!isSignIn?'Sign in': 'Sign up'}</Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
