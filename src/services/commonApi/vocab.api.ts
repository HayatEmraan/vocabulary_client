/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/utils/axiosInstance";

export async function getAllVocabApi() {
  try {
    const res = await axiosInstance.get("vocab/all-vocab");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
export async function getSingleVocabApi(id: string) {
  try {
    const res = await axiosInstance.get("vocab/single-vocab/" + id);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
