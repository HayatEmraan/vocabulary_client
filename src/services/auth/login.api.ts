/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { bgc } from "@/config";
import axios from "axios";
import { cookies } from "next/headers";

export async function loginApi(payload: any) {
  try {
    const cookieStore = await cookies();

    const res = await axios.post(bgc + "user/login", payload, {
      withCredentials: true,
    });

    const obj = {
      httpOnly: true,
      // secure: false,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    };

    cookieStore.set("token", res.data?.data?.token, {
      ...obj,
      sameSite: "lax",
    });
    cookieStore.set("iv", res.data?.data?.iv, {
      ...obj,
      sameSite: "lax",
    });

    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
