/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "../axiosInstance";

export async function usersApi() {
  try {
    const res = await axiosInstance.get("user/all-users");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
export async function userUpdateApi() {
  try {
    const res = await axiosInstance.post("user/all-users");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
