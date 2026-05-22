import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {

  const token = req.cookies.get("token")?.value;

  // pas connecté
  if (!token) {
    return NextResponse.redirect(new URL("/accueil", req.url));
  }

  // vérification JWT
  const payload = await verifyToken(token);

  // token invalide
  if (!payload) {
    return NextResponse.redirect(new URL("/accueil", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/accueil-perso/:path*"],
};