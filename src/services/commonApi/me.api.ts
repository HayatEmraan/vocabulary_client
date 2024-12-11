/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "../axiosInstance";

export async function meApi() {
  try {
    const res = await axiosInstance.get("user/me");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
