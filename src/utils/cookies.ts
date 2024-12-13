"use server";

import { cookies } from "next/headers";

export async function getCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const iv = cookieStore.get("iv")?.value;
  return { token, iv };
}

export async function removeCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("iv");
}
