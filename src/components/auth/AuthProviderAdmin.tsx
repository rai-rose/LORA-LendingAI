"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from "next/navigation";

// This is an AuthProvider for Admin Pages
function AuthProviderAdmin({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      const isAuth = await fetch("/api/verifyToken");
      const response = await isAuth.json();

      if (!response.success) {
        router.push("/signin");
      } else {
        setShowChildren(true);
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

export default AuthProviderAdmin;