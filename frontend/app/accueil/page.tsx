"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "./actions";
import Image from "next/image";

const BROWN = "#3d1e00";

const inputBase =
  "w-full rounded-md px-[20px] py-[14px] " +
  "bg-[rgba(255,248,228,0.28)] backdrop-blur-sm " +
  "text-[#3d1e00] text-[15px] italic font-serif " +
  "placeholder:text-[#a8805a] placeholder:italic " +
  "shadow-[inset_0_1px_4px_rgba(100,60,10,0.12)] " +
  "focus:outline-none focus:bg-[rgba(255,248,228,0.42)] " +
  "transition-colors";

const inputClass = (hasError: boolean) =>
  inputBase +
  (hasError
    ? " border border-red-700 focus:border-red-800 focus:shadow-[inset_0_1px_4px_rgba(180,0,0,0.15),0_0_0_2px_rgba(200,0,0,0.12)]"
    : " border border-[#b89a72] focus:border-[#8b6040] focus:shadow-[inset_0_1px_4px_rgba(100,60,10,0.14),0_0_0_2px_rgba(180,130,80,0.18)]");

// function TitleDivider() {
//   return (
//     <svg viewBox="0 0 340 26" fill="none" aria-hidden="true" className="w-72">
//       <line x1="0" y1="13" x2="110" y2="13" stroke={BROWN} strokeWidth="1" />
//       <path d="M 110,13 C 115,7 122,4 129,8 C 136,12 136,16 129,19 C 122,22 116,18 118,13" stroke={BROWN} strokeWidth="1.3" />
//       <line x1="134" y1="13" x2="158" y2="13" stroke={BROWN} strokeWidth="1" />
//       <circle cx="170" cy="13" r="5.5" stroke={BROWN} strokeWidth="1.3" />
//       <circle cx="170" cy="13" r="2" fill={BROWN} />
//       <line x1="182" y1="13" x2="206" y2="13" stroke={BROWN} strokeWidth="1" />
//       <path d="M 230,13 C 225,7 218,4 211,8 C 204,12 204,16 211,19 C 218,22 224,18 222,13" stroke={BROWN} strokeWidth="1.3" />
//       <line x1="230" y1="13" x2="340" y2="13" stroke={BROWN} strokeWidth="1" />
//     </svg>
//   );
// }

export default function LoginPage() {
  const router = useRouter();

  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo, mdp: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Pseudo ou mot de passe incorrect");
        return;
      }

      console.log(data);
      if (data.data.token) {
        localStorage.setItem("token", JSON.stringify(data.data.token));
        router.push("/accueil-perso");
      } else {
        setError("Token manquant dans la réponse");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur serveur");
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 flex flex-col items-center">

        <Image
          src="/logo-gondor.png"
          alt="Gondor Chic"
          width={660}
          height={240}
          className="drop-shadow-sm"
          priority
        />

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-3"
          style={{ width: "clamp(500px, 38vw, 360px)" }}
        >
          <input
            type="text"
            name="pseudo"
            placeholder="pseudo"
            autoComplete="username"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className={inputClass(!!error)}
          />

          <input
            type="password"
            name="password"
            placeholder="mot de passe"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass(!!error)}
          />

          {error && (
            <p className="text-center text-[13px] italic font-serif text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#52280a] text-[#f2e4c0] rounded-md py-[13px] text-[14px] italic font-serif tracking-[0.12em] cursor-pointer transition-colors hover:bg-[#3d1e06] disabled:opacity-60"
          >
            {pending ? "connexion…" : "s'identifier"}
          </button>
        </form>
      </div>
    </div>
  );
}
