/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "../axiosInstance";

export async function vocabStatsApi() {
  try {
    const res = await axiosInstance.get("vocab/stats");
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}


export async function createVocabApi(payload: any) {
  try {
    const res = await axiosInstance.post("vocab/create-vocab", payload);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
export async function updateVocabApi(payload: any, id: string) {
  try {
    const res = await axiosInstance.post("vocab/update-vocab/" + id, payload);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
