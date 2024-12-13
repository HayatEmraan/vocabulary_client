/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/utils/axiosInstance";

export async function getAllLessonApi() {
  try {
    const res = await axiosInstance.get("lesson/all-lessons");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
export async function getSingleLessonApi(id: string) {
  try {
    const res = await axiosInstance.get("lesson/single-lesson/" + id);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
