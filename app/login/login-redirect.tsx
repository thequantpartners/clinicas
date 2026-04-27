"use client";

import { useEffect } from "react";
import { getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getFirebaseAuth, hasFirebaseConfig } from "@/lib/firebase";

export function LoginRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (!hasFirebaseConfig()) {
      return;
    }

    const auth = getFirebaseAuth();

    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          router.replace("/diagnostico");
        }
      })
      .catch(() => {});

    return onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/diagnostico");
      }
    });
  }, [router]);

  return null;
}
