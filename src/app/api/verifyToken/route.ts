import { cookies } from "next/headers";
import client from "@/lib/ApolloClient";
import { LOGIN_ACCOUNT } from "@/graphql/mutations/account";

export async function GET(){
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return Response.json({ success: false });

  const { data } = await client.mutate<{ loginAccountWeb: { success: boolean } }>({
    mutation: LOGIN_ACCOUNT,
    context: {
      headers: {
        Authorization: token,
      }
    }
  })

  const success = data?.loginAccountWeb.success;

  if (!success) {
    return Response.json({ success: false });
  }

  return Response.json({ success: true });
}