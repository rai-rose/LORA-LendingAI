import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/ApolloClient";
import {  LOGIN_ACCOUNT } from "@/graphql/mutations/account";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const { email, password, isKeepLoggedIn } = await request.json();

    const { data } = await client.mutate<{ loginAccountWeb:{ success: boolean, message: string, token: string }}>({
      mutation: LOGIN_ACCOUNT,
      variables: {
        email,
        password,
      },
      fetchPolicy: "no-cache"
    })

    const { success, message, token } = data?.loginAccountWeb ?? {};

    if (!success) {
      return NextResponse.json({ success: false, message }, { status: 400 });
    }

    const cookieStore = await cookies();
    
    if (!isKeepLoggedIn) {
      cookieStore.set({
        name: "token",
        value: token ?? "",
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    } else {
      cookieStore.set({
        name: "token",
        value: token ?? "",
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30 // 30 Days expiry
      });
    }

    return NextResponse.json({ success, message }, { status: 200 });

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    } else {
      return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
  }
};