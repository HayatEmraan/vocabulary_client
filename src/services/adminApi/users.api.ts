/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/utils/axiosInstance";

export async function userStatsApi() {
  try {
    const res = await axiosInstance.get("user/stats");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}

export async function usersApi() {
  try {
    const res = await axiosInstance.get("user/all-users");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
export async function userUpdateApi(payload: any) {
  try {
    const { id, ...rest } = payload;
    const res = await axiosInstance.patch("user/update-user/" + id, rest);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
