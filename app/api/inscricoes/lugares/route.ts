import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Proxy for checking available spots
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventoId = searchParams.get("eventoId");

  if (!eventoId) {
    return NextResponse.json({ disponiveis: null });
  }

  try {
    const res = await fetch(`${API_URL}/api/inscricoes/evento/${eventoId}/lugares`, {
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ disponiveis: null });
  }
}
