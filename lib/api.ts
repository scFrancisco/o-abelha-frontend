const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getContactos() {
  const res = await fetch(`${API_URL}/api/contactos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar contactos");
  }

  return res.json();
}

export async function createContacto(data: {
  name: string;
  email: string;
  message: string;
}) {
  const res = await fetch(`${API_URL}/api/contactos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao enviar contacto");
  }

  return res.json();
}

export async function getNoticias() {
  const res = await fetch(`${API_URL}/api/noticias`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getNoticiaById(id: string) {
  const res = await fetch(`${API_URL}/api/noticias/${id}`, {
    cache: "no-store",
  });

  console.log("STATUS:", res.status);
  console.log("OK:", res.ok);

  const text = await res.text();
  console.log("BODY:", text);

  if (!res.ok) {
    throw new Error("Notícia não encontrada");
  }

  return JSON.parse(text);
}

export async function getEventos() {
  const res = await fetch(`${API_URL}/api/eventos`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar eventos");
  }

  return res.json();
}

export async function getEventoById(id: string) {
  const res = await fetch(`${API_URL}/api/eventos/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Evento não encontrado");
  }

  const text = await res.text();

  return JSON.parse(text);
}

export async function createEvento(data: {
  titulo: string;
  descricao: string;
  corpoEvento: string;
  dataEvento: string;
  local?: string;
  imagemCapa?: string;
}) {
  const res = await fetch(`${API_URL}/api/eventos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar evento");
  }

  return res.json();
}