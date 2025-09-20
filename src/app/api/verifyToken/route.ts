import { cookies } from "next/headers";
import client from "@/lib/ApolloClient";
import { LOGIN_ACCOUNT } from "@/graphql/mutations/account";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return NextResponse.json({ success: false });

  const { data } = await client.mutate<{ loginAccountWeb: { success: boolean } }>({
    mutation: LOGIN_ACCOUNT,
    context: {
      headers: {
        Authorization: token,
      }
    },
    fetchPolicy: "no-cache"
  })

  const success = data?.loginAccountWeb.success;

  if (!success) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}