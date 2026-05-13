"use server";

export type GcToken = {
  value: string;
  pseudo: string;
  expiresAt: number;
};

export type LoginState =
  | { token: GcToken }
  | { error: string }
  | Record<string, never>;

export async function login(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const pseudo = (formData.get("pseudo") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (!pseudo || !password) {
    return { error: "Veuillez remplir tous les champs." };
  }

  const validUser = process.env.AUTH_USER ?? "admin";
  const validPass = process.env.AUTH_PASS ?? "gondor";

  if (pseudo !== validUser || password !== validPass) {
    return { error: "Pseudo ou mot de passe incorrect." };
  }

  const token: GcToken = {
    value: `gc_${crypto.randomUUID().replace(/-/g, "")}`,
    pseudo,
    expiresAt: Date.now() + 8 * 60 * 60 * 1000,
  };

  // TODO: remplacer par le vrai appel API
  // const res = await fetch(`${process.env.API_URL}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ pseudo, password }),
  // });
  // if (!res.ok) return { error: "Pseudo ou mot de passe incorrect." };
  // const data = await res.json();
  // token.value = data.token;

  return { token };
}
