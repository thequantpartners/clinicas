"use client";

import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { getFirebaseAuth, hasFirebaseConfig } from "@/lib/firebase";

type AuthGateProps = {
  children: (user: User) => ReactNode;
};

export function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!hasFirebaseConfig()) {
      setChecking(false);
      return;
    }

    return onAuthStateChanged(getFirebaseAuth(), (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
        return;
      }

      setUser(currentUser);
      setChecking(false);
    });
  }, [router]);

  if (!hasFirebaseConfig()) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#eef8ff] px-6 text-center text-[#101112]">
        <p className="max-w-[280px] text-sm font-bold text-[#075985]">
          Configura Firebase en `.env.local` para iniciar sesión.
        </p>
      </main>
    );
  }

  if (checking || !user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#eef8ff] text-[#101112]">
        <p className="text-sm font-bold text-[#075985]">Validando acceso...</p>
      </main>
    );
  }

  return children(user);
}
