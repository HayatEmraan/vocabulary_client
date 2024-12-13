/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/utils/axiosInstance";

export async function getLessonStatsApi() {
  try {
    const res = await axiosInstance.get("user/lesson-stats");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
