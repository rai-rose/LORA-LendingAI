"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

// This is an AuthProvider
function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      const isAuth = await fetch("/api/verifyToken");
      const response = await isAuth.json();

      if (!response.success) {
        router.push("/signin");
      } else {
        setIsAuthenticated(true);
      }
    }

    onLoad();
  }, [router])

  return (
    <>
    {isAuthenticated && children}
    </>
  );
}

export default AuthProvider;