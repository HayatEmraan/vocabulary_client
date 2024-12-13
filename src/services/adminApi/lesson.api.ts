/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/utils/axiosInstance";

export async function lessonStatsApi() {
  try {
    const res = await axiosInstance.get("lesson/stats");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}

export async function createLessonApi(payload: any) {
  try {
    const res = await axiosInstance.post("lesson/create-lesson", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
export async function updateLessonApi(payload: any, id: string) {
  try {
    const res = await axiosInstance.post("lesson/update-lesson/" + id, payload);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
