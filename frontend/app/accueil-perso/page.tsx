"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
<<<<<<< HEAD
import type { GcToken } from "../accueil/actions";
import { getUserFromToken } from "@/lib/auth";
=======
import type { GcToken, UserLoggedIn } from "../accueil/actions";
>>>>>>> 2b9249ef22705e5e81b1681dc55ff6f6451128c5

type Product = {
  id: number;
  referenceProduit: string;
  libelle: string;
  description: string;
  prixDuJour: number;
  quantiteEnStock: number;
  estDuJour: boolean;
  image: string;
  categorieId: number;
};

export default function AccueilPerso() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [produit, setProduit] = useState<Product | null>(null);
  const [quantite, setQuantite] = useState(1);
  const [commande, setCommande] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // const token_str = localStorage.getItem("token");
    // setToken(token_str);
    const userData = getUserFromToken();
    setUser(userData);
    // if (!raw) {
    //   router.replace("/accueil");
    //   return;
    // }
    // const parsed: GcToken = JSON.parse(raw);
    // if (Date.now() > parsed.expiresAt) {
    //   localStorage.removeItem("gc_auth");
    //   router.replace("/accueil");
    //   return;
    // }
    // setToken(parsed);
  }, [router]);

  useEffect(() => {
    // if (!token) return;
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
    //   .then((r) => r.json())
    //   .then((data) => {
    //     const list: Product[] = data.data ?? [];
    //     setProduit(list.find((p) => p.estDuJour) ?? list[0] ?? null);
    //   })
    //   .catch(() => {});
    setProduit({
      id: 1,
      referenceProduit: "REF-001",
      libelle: "Vêtement elfique hiver",
      description: "Un vêtement chaud et élégant pour la saison hiver.",
      prixDuJour: 28.99,
      quantiteEnStock: 10,
      estDuJour: true,
      image: "",
      categorieId: 1,
    });
  }, [user]);

  // if (!token) return null;

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
      <div className="relative z-10 w-full max-w-2xl px-16 py-12 flex flex-col">
        {/* Logo + Bienvenue */}
        <div className="flex flex-col items-center mb-10">
          <Image
            src="/logo-gondor.png"
            alt="Gondor Chic"
            width={340}
            height={120}
            className="drop-shadow-sm"
            priority
          />
          <p
            className="mt-4 text-[#5a3300] text-xl tracking-wide"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
<<<<<<< HEAD
            Bienvenue,{" "}
            <span className="font-bold">{user.sub}</span>
            {/* <span className="font-bold">{"Nicolas"}</span> */}
=======
            Bienvenue,{`${user?.prenom || user?.pseudo}`} !{" "}
            <span className="font-bold">{token.pseudo}</span>
>>>>>>> 2b9249ef22705e5e81b1681dc55ff6f6451128c5
          </p>
        </div>

        {/* Produit du jour */}
        {produit ? (
          <div className="flex gap-8 items-start">
            {/* Infos */}
            <div className="flex-1 min-w-0">
              <h1
                className="text-3xl font-bold text-[#2a1200] mb-3"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {produit.libelle}
              </h1>
              <span className="inline-block bg-[#6b3a1f] text-[#f2e4c0] text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-[0.15em] mb-5">
                Produit du jour
              </span>
              <p className="text-3xl font-bold text-[#2a1200] mb-1">
                Gondariar {produit.prixDuJour.toFixed(2)}
              </p>
              <p className="text-sm text-[#5a3300] italic mb-7">
                En stock : {produit.quantiteEnStock} pièce(s)
              </p>

              {/* Quantité + Acheter */}
              <div className="flex items-center gap-4">
                <div className="flex items-stretch border border-[#5a3300]">
                  <button
                    onClick={() => setQuantite((q) => Math.max(1, q - 1))}
                    className="bg-[#a8805a] text-[#f2e4c0] w-9 h-10 text-lg font-bold hover:bg-[#6b3a1f] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-11 flex items-center justify-center text-[#2a1200] font-bold text-base bg-[#f5e8c0]">
                    {quantite}
                  </span>
                  <button
                    onClick={() =>
                      setQuantite((q) =>
                        Math.min(produit.quantiteEnStock, q + 1)
                      )
                    }
                    className="bg-[#a8805a] text-[#f2e4c0] w-9 h-10 text-lg font-bold hover:bg-[#6b3a1f] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => setCommande(true)}
                  className="bg-[#2a1200] text-[#f2e4c0] px-10 py-2.5 text-xl rounded-sm hover:bg-[#52280a] transition-colors cursor-pointer"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  Acheter
                </button>
              </div>

              {commande && (
                <p className="mt-3 text-sm text-[#52280a] italic">
                  Commande passée — {quantite} article(s) !
                </p>
              )}
            </div>

            {/* Image produit */}
            <div className="flex-shrink-0 w-52 h-60 border-2 border-[#2a1200] bg-white overflow-hidden flex items-center justify-center">
              {produit.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={produit.image}
                  alt={produit.libelle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#a8805a] text-sm italic text-center px-4">
                  Aucune image
                </span>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-[#6b3a1f] italic text-sm">
            Chargement du produit du jour…
          </p>
        )}

        {/* Déconnexion */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => {
              localStorage.removeItem("gc_auth");
              router.push("/accueil");
            }}
            className="text-xs text-[#6b3a1f] italic underline hover:text-[#2a1200] transition-colors cursor-pointer"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}
