"use server";
import axios from "axios";
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
      userId: responseData.userId
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
    return {
      success: true,
      userId: responseData.userId
    };
  } catch (err: any) {
    return {
      success: false,
      error:  err?.response?.data?.error || err?.message
    };
  }
}
export async function logOut() {
  try {
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
