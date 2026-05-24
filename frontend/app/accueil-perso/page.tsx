"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { GcToken } from "../accueil/actions";
import { getUserFromToken } from "@/lib/auth";
import { error } from "console";

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

type ClientProfile = {
  prenom: string;
  nom: string;
};

export default function AccueilPerso() {
  const router = useRouter();
  const [user, setUser] = useState<{ sub: string } | null>(null);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [quantite, setQuantite] = useState(1);
  const [commande, setCommande] = useState(false);


  async function fetchProducts() {
    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Erreur API : ${res.status}`);
      }

      return await res.json();

    } catch (error) {
      console.error("Erreur fetchProducts :", error);
      return null;
    }
  }


  useEffect(() => {
    const userData = getUserFromToken();
    if (!userData) {
      router.replace("/accueil");
      return;
    }
    setUser(userData as { sub: string });
    const token = localStorage.getItem("token");
    fetch("http://localhost:8080/api/clients/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setProfile({ prenom: data.data.prenom, nom: data.data.nom }))
      .catch(() => {});

    fetchProducts().then((data) => {
      if (data) {
        setProducts(data.data);
      }
    });
  }, [router]);

  const todayProduct = products.filter((product) => product.estDuJour === true)[0];

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
            Bienvenue,{" "}
            <span className="font-bold">{profile ? `${profile.prenom} ${profile.nom}` : user?.sub}</span>
            {/* <span className="font-bold">{"Nicolas"}</span> */}
          </p>
        </div>

        {/* Produit du jour */}
        {todayProduct ? (
          <div className="flex gap-8 items-start">
            {/* Infos */}
            <div className="flex-1 min-w-0">
              <h1
                className="text-3xl font-bold text-[#2a1200] mb-3"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                {todayProduct.libelle}
              </h1>
              <span className="inline-block bg-[#6b3a1f] text-[#f2e4c0] text-[10px] px-2.5 py-1 rounded-sm uppercase tracking-[0.15em] mb-5">
                Produit du jour
              </span>
              <p className="text-3xl font-bold text-[#2a1200] mb-1">
                Gondariar {todayProduct.prixDuJour.toFixed(2)}
              </p>
              <p className="text-sm text-[#5a3300] italic mb-7">
                En stock : {todayProduct.quantiteEnStock} pièce(s)
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
                        Math.min(todayProduct.quantiteEnStock, q + 1)
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
              {todayProduct.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={todayProduct.image}
                  alt={todayProduct.libelle}
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
              localStorage.removeItem("token");
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
