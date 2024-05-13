"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useAuth = (redirectUrl = "/auth/signin") => {
  const [status, setStatus] = useState("unauthenticated"); // State to track authentication status
  const router = useRouter();

  useEffect(() => {
    const localStatus = localStorage.getItem("status") || "unauthenticated";
    setStatus(localStatus);
    if (localStatus !== "authenticated") {
      router.push(redirectUrl);
    }
  }, [router, redirectUrl]);
  return { status };
};


export const testAuth = () => {
  const [status, setStatus] = useState("unauthenticated");

  useEffect(() => {
    const localStatus = localStorage.getItem("status") || "unauthenticated";
    setStatus(localStatus); 
  }, []); 
  return { status };
};
