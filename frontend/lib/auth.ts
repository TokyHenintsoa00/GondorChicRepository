import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function isTokenExpired(token: string) {
  try {
    const decoded: any = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}