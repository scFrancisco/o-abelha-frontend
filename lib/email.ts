/**
 * Email via Resend REST API — sem npm extra.
 *
 * Setup (gratuito, 3 000 emails/mês):
 *  1. Cria conta em https://resend.com
 *  2. Adiciona ao .env.local:
 *       RESEND_API_KEY=re_xxxxxxxx
 *       EMAIL_FROM=CRC O Abelha <noreply@crcabelha.pt>
 *       ADMIN_EMAIL=teu@email.pt
 *  3. Verifica o teu domínio em Resend → Domains (ou usa onboarding@resend.dev só para testes).
 */

interface EmailInscricao {
  nome: string;
  email: string;
  eventoTitulo: string;
  eventoData: string;
  eventoLocal: string;
  referencia: string;
  valor: number;
  metodoPagamento: string;
  telefone: string;
}

export async function sendEmailInscricaoPendente(data: EmailInscricao) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return; // silently skip if not configured

  const from = process.env.EMAIL_FROM || "CRC O Abelha <onboarding@resend.dev>";
  const adminEmail = process.env.ADMIN_EMAIL;

  const dataFormatada = data.eventoData
    ? new Date(data.eventoData).toLocaleDateString("pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const html = `
<!DOCTYPE html>
<html lang="pt">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0D0D14;padding:32px 40px;">
            <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#F5A623;">CRC O Abelha</p>
            <h1 style="margin:8px 0 0;font-size:22px;font-weight:900;color:#fff;letter-spacing:-0.02em;">Inscrição Recebida</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 20px;font-size:16px;color:#374151;">Olá <strong>${data.nome}</strong>,</p>
            <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#374151;">
              A tua inscrição para <strong>${data.eventoTitulo}</strong> foi recebida com sucesso.
              O pagamento está pendente de confirmação.
            </p>

            <!-- Info box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAF7;border:1px solid #E5E7EB;border-radius:8px;margin-bottom:28px;">
              ${data.eventoData ? `
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                  <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;">Data do Evento</p>
                  <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#0D0D14;">${dataFormatada}</p>
                </td>
              </tr>` : ""}
              ${data.eventoLocal ? `
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                  <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;">Local</p>
                  <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#0D0D14;">${data.eventoLocal}</p>
                </td>
              </tr>` : ""}
              ${data.referencia ? `
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                  <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;">Referência de Pagamento</p>
                  <p style="margin:4px 0 0;font-size:22px;font-weight:900;letter-spacing:0.1em;color:#D4881A;">${data.referencia}</p>
                </td>
              </tr>` : ""}
              ${data.valor > 0 ? `
              <tr>
                <td style="padding:14px 20px;border-bottom:1px solid #E5E7EB;">
                  <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;">Valor Total</p>
                  <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#0D0D14;">${data.valor.toFixed(2)}€</p>
                </td>
              </tr>` : ""}
              <tr>
                <td style="padding:14px 20px;">
                  <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#9CA3AF;">Método de Pagamento</p>
                  <p style="margin:4px 0 0;font-size:15px;font-weight:600;color:#0D0D14;">${data.metodoPagamento} — ${data.telefone}</p>
                </td>
              </tr>
            </table>

            <div style="background:#FEF3DC;border-radius:8px;padding:16px 20px;margin-bottom:28px;">
              <p style="margin:0;font-size:14px;color:#D4881A;line-height:1.6;">
                ⏳ <strong>Aguarda a confirmação do pagamento.</strong><br />
                Assim que o pagamento for verificado, receberás uma notificação de confirmação.
              </p>
            </div>

            <p style="margin:0;font-size:14px;color:#9CA3AF;line-height:1.6;">
              Se tiveres alguma questão, contacta-nos em
              <a href="mailto:geral@crcabelha.pt" style="color:#D4881A;">geral@crcabelha.pt</a>
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#F9F9F6;padding:20px 40px;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center;">
              CRC O Abelha · Colmeias, Leiria · Portugal
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // Send to user
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [data.email],
      subject: `Inscrição pendente — ${data.eventoTitulo}`,
      html,
    }),
  });

  // Also notify admin if configured
  if (adminEmail) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [adminEmail],
        subject: `Nova inscrição — ${data.eventoTitulo} (${data.nome})`,
        html: `<p>Nova inscrição de <strong>${data.nome}</strong> (${data.email}) para <strong>${data.eventoTitulo}</strong>.<br/>Telemóvel: <strong>${data.telefone}</strong><br/>Método: ${data.metodoPagamento}</p>`,
      }),
    });
  }
}
