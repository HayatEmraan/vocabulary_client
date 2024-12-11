/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { bgc } from "@/config";
import axios from "axios";

export async function registerApi(payload: any) {
  try {
    const res = await axios.post(bgc + "user/create-user", payload);
    return res.data;
  } catch (error: any) {
    return error?.response?.data;
  }
}
