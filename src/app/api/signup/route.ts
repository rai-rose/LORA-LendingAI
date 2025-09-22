import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CREATE_ACCOUNT } from "@/graphql/mutations/account";
import client from "@/lib/ApolloClient";

export async function POST(request: NextRequest) {
  try {
    const signupData = await request.json();
  
    const { data } = await client.mutate<{createAccountWeb: { success: boolean, message: string, token: string }}>({
      mutation: CREATE_ACCOUNT,
      variables: {
        data: {...signupData, role: "ADMIN"}
      },
      fetchPolicy: "no-cache"
    })
  
    const { success, message, token } = data?.createAccountWeb ?? {};
  
    if (!success) {
      return NextResponse.json({ success: false, message }, { status: 400 });
    }
  
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token ?? "",
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 // 1 Hour expiry
    });
  
    return NextResponse.json({ success: true , message });

  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
  }
}