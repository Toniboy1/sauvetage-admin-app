// hooks/useAuth.js
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = (redirectUrl = "/auth/signin") => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push(redirectUrl); // Redirect if not authenticated
  }, [session, status, router, redirectUrl]);

  return { session, status };
};

export const testAuth = () => {
    const {data: session, status } = useSession();
    return { session, status };
    };

