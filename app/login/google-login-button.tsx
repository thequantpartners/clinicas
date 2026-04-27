"use client";

import { useState } from "react";
import { signInWithRedirect } from "firebase/auth";
import {
  getFirebaseAuth,
  getGoogleProvider,
  hasFirebaseConfig,
} from "@/lib/firebase";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.6 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.1 3.3v2.7h3.4c2-1.8 3.4-4.5 3.4-8Z"
      />
      <path
        fill="#34A853"
        d="M12 23c3 0 5.5-1 7.3-2.8l-3.4-2.7c-.9.6-2.1 1-3.8 1-2.9 0-5.4-2-6.2-4.7H2.3v2.8A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.8 13.8a6.6 6.6 0 0 1 0-3.6V7.4H2.3a11 11 0 0 0 0 9.2l3.5-2.8Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.5c1.6 0 3.1.6 4.2 1.7l3.1-3.1A10.5 10.5 0 0 0 12 1 11 11 0 0 0 2.3 7.4l3.5 2.8C6.6 7.5 9.1 5.5 12 5.5Z"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const configured = hasFirebaseConfig();

  async function handleLogin() {
    if (!configured) {
      return;
    }

    setLoading(true);
    await signInWithRedirect(getFirebaseAuth(), getGoogleProvider());
  }

  return (
    <button
      type="button"
      onClick={handleLogin}
      disabled={loading || !configured}
      className="flex min-h-[62px] w-full items-center justify-center gap-3 rounded-[22px] bg-[#ff9f0a] px-5 text-[18px] font-extrabold text-white shadow-[0_16px_35px_rgba(255,159,10,0.30)] ring-2 ring-white transition active:scale-[0.99] disabled:opacity-70 focus:outline-none focus:ring-4 focus:ring-[#ff9f0a]/30"
    >
      <GoogleIcon />
      {loading ? "Abriendo Google..." : "Inicia con Google"}
      <ArrowIcon />
    </button>
  );
}
