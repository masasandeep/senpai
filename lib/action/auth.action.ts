"use server";
import User from "@/app/models/userModels";
import axios from "axios";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SESSION_DURATION = 60 * 60 * 24;
export async function setCookie(userId: string) {
  const cookieStore = await cookies();
  const token = await jwt.sign(
    {
      userId: userId,
    },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "1d",
    }
  );
  cookieStore.set("token", token, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}
export async function signUp({ email, password, username }: AuthProps) {
  try {
    const res = await axios.post(`${process.env.BASE_URL}/api/users/signup`, {
      email,
      username,
      password,
    });
    const responseData = res.data;
    if (responseData?.error) {
      throw new Error(responseData.error);
    }
    return {
      success: true,
      userId: responseData.userId,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.response?.data?.error || err?.message,
    };
  }
}
export async function login({ email, password }: AuthProps) {
  try {
    const res = await axios.post(`${process.env.BASE_URL}/api/users/login`, {
      email,
      password,
    });
    const responseData = res.data;
    if (responseData?.error) {
      throw new Error(responseData.error);
    }
    await setCookie(responseData.userId);
    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.response?.data?.error || err?.message,
    };
  }
}
export async function logOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return {
      success: true,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
}
export async function getCurrentUser(): Promise<AllUser | null> {
  const cookie = await cookies();
  const token = await cookie.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = (await jwt.verify(token, process.env.JWT_SECRET_KEY!)) as {
      userId: string;
    };
    const user = await User.findById(decoded.userId);
    if (!user) return null;
    return { id: user._id.toString(), username: user.username };
  } catch (err) {
    console.log(err);
    return null;
  }
}
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
