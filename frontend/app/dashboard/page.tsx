"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { GcToken } from "../login/actions";

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState<GcToken | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("gc_auth");
    if (!raw) {
      router.replace("/login");
      return;
    }
    const parsed: GcToken = JSON.parse(raw);
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem("gc_auth");
      router.replace("/login");
      return;
    }
    setToken(parsed);
  }, [router]);

  if (!token) return null;

  return (
    <div className="parchment-bg min-h-screen flex flex-col items-center justify-center gap-6">
      <p
        className="text-[#2a1200] text-2xl italic font-serif tracking-widest"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Bienvenue, {token.pseudo}
      </p>
      <p className="text-[#6b3a1f] text-sm font-serif italic">
        Token : <span className="font-mono">{token.value}</span>
      </p>
      <button
        onClick={() => {
          localStorage.removeItem("gc_auth");
          router.push("/");
        }}
        className="mt-4 bg-[#52280a] text-[#f2e4c0] rounded-md px-6 py-2 text-sm italic font-serif tracking-wider cursor-pointer hover:bg-[#3d1e06] transition-colors border-none"
      >
        se déconnecter
      </button>
    </div>
  );
}
