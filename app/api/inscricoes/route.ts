import { NextRequest, NextResponse } from "next/server";
import { sendEmailInscricaoPendente } from "@/lib/email";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { eventoId, nome, email, telefone, numPessoas } = body;

  if (!eventoId || !nome || !email || !telefone) {
    return NextResponse.json({ erro: "Campos obrigatórios em falta." }, { status: 400 });
  }

  // Forward to backend
  const backendRes = await fetch(`${API_URL}/api/inscricoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventoId, nome, email, telefone, numPessoas }),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, { status: backendRes.status });
  }

  // Send confirmation email (fire-and-forget — don't block the response)
  sendEmailInscricaoPendente({
    nome,
    email,
    eventoTitulo: data.eventoTitulo ?? "Evento",
    eventoData: data.eventoData ?? "",
    eventoLocal: data.eventoLocal ?? "",
    referencia: data.referenciaPagamento ?? "",
    valor: data.valorTotal ?? 0,
    metodoPagamento: "MBWay",
    telefone,
  }).catch(() => {
    // Email failure never blocks the registration
  });

  return NextResponse.json(data);
}
