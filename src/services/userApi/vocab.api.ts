/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/utils/axiosInstance";

export async function completeVocabApi(id: string) {
  try {
    const res = await axiosInstance.post("vocab/vocab-complete/" + id);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
