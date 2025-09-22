"use server";

import { cookies } from "next/headers";

const saveToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30 // 1 Month expiry
  });
}

export { saveToken };