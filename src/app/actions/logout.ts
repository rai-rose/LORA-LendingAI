"use server";

import { cookies } from "next/headers";

const Logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};

export { Logout };