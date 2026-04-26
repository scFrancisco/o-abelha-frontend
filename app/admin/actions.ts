"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "admin_session";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD não está definido no .env.local");
  }

  if (password !== adminPassword) {
    redirect("/admin?erro=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, adminPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin");
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;
  return !!adminPassword && session === adminPassword;
}

export async function updateInscricaoStatus(id: number, status: "aceite" | "rejeitado") {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || session !== adminPassword) {
    throw new Error("Não autorizado");
  }

  const res = await fetch(`${API_URL}/api/inscricoes/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar status");
  }
}

export async function getTodasInscricoes() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || session !== adminPassword) {
    throw new Error("Não autorizado");
  }

  const res = await fetch(`${API_URL}/api/inscricoes`, {
    cache: "no-store",
  });

  if (!res.ok) return [];
  return res.json();
}
