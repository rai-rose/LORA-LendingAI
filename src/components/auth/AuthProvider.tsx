"use client";

import React from 'react';
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from 'react';

// This is an AuthProvider
function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      const isAuth = await fetch("/api/verifyToken");
      const response = await isAuth.json();

      if (response.success) {
        setShowChildren(true);
        
        if (pathname === "/signin" || pathname === "/signup") { 
          setShowChildren(false);
          router.push("/");
        }
      }

      if (!response.success) {
        setShowChildren(false);
        router.push("/signin");

        if (pathname === "/signin" || pathname === "/signup") {
          setShowChildren(true);
        }
      }
    }

    onLoad();
  }, [router, pathname]);

  return (
    <>
    {showChildren && children}
    </>
  );
}

export default AuthProvider;