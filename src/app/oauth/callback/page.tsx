"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveToken } from "@/app/actions/oauthSaveToken";

export default function Callback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
      const onLoad = async () => {
        const token = params.get("token");

        if (!token) {
          router.push("/signin");
          return;
        }
  
        await saveToken(token.toString());
        router.push("/");
      }

      onLoad();
  }, [router, params]);

  return <div>Loading...</div>
}