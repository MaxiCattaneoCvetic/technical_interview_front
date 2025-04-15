// components/withAuth.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: React.ComponentType) {
  return function WithAuth(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); 
      }
    }, []);

    return <Component {...props} />;
  };
}