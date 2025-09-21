"use client";

import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

// This is an AuthProvider for Signin/Signup Pages
function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const onLoad = async () => {
      const isAuth = await fetch("/api/verifyToken");
      const response = await isAuth.json();

      if (response.success) {
        router.push("/");
      } 
    }

    onLoad();
  }, [router]);

  return (
    <>
      { children }
    </>
  );
}

export default AuthProvider;