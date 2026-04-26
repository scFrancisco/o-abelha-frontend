"use client";
import { useState, useTransition } from "react";
import { updateInscricaoStatus, logoutAdmin } from "./actions";
import styles from "./page.module.css";

type Inscricao = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  numPessoas: number;
  valorTotal: number;
  metodoPagamento: string;
  estado: "PENDENTE" | "ACEITE" | "REJEITADO" | string;
  createdAt: string;
  evento?: { titulo: string; dataEvento: string };
  referenciaPagamento?: string;
};

type Filter = "TODOS" | "PENDENTE" | "ACEITE" | "REJEITADO";

export default function AdminDashboard({ inscricoes: initial }: { inscricoes: Inscricao[] }) {
  const [inscricoes, setInscricoes] = useState(initial);
  const [filter, setFilter] = useState<Filter>("TODOS");
  const [copied, setCopied] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const pendentes = inscricoes.filter((i) => i.estado === "PENDENTE").length;
  const aceites = inscricoes.filter((i) => i.estado === "ACEITE").length;
  const rejeitados = inscricoes.filter((i) => i.estado === "REJEITADO").length;

  const filtered = inscricoes.filter((i) =>
    filter === "TODOS" ? true : i.estado === filter
  );

  const handleStatus = (id: number, status: "aceite" | "rejeitado") => {
    startTransition(async () => {
      await updateInscricaoStatus(id, status);
      setInscricoes((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, estado: status.toUpperCase() } : i
        )
      );
    });
  };

  const copyPhone = (phone: string, id: number) => {
    navigator.clipboard.writeText(phone);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.adminHeader}>
        <div className={styles.adminHeaderInner}>
          <div>
            <p className={styles.adminEyebrow}>CRC O Abelha</p>
            <h1 className={styles.adminTitle}>Painel de Administração</h1>
          </div>
          <form action={logoutAdmin}>
            <button type="submit" className={styles.logoutBtn}>Terminar sessão</button>
          </form>
        </div>
      </header>

      <div className={styles.adminBody}>
        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNum}>{pendentes}</span>
            <span className={styles.statLbl}>Pendentes</span>
          </div>
          <div className={`${styles.statCard} ${styles.statGreen}`}>
            <span className={styles.statNum}>{aceites}</span>
            <span className={styles.statLbl}>Aceites</span>
          </div>
          <div className={`${styles.statCard} ${styles.statRed}`}>
            <span className={styles.statNum}>{rejeitados}</span>
            <span className={styles.statLbl}>Rejeitados</span>
          </div>
          <div className={`${styles.statCard} ${styles.statTotal}`}>
            <span className={styles.statNum}>{inscricoes.length}</span>
            <span className={styles.statLbl}>Total</span>
          </div>
        </div>

        {/* MBWay hint */}
        <div className={styles.mbwayHint}>
          <strong>Como verificar MBWay:</strong> copia o número de telemóvel abaixo,
          verifica no teu telemóvel se recebeste o pagamento correspondente e clica
          em <em>Aceitar</em> ou <em>Rejeitar</em>.
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          {(["TODOS", "PENDENTE", "ACEITE", "REJEITADO"] as Filter[]).map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "TODOS" ? "Todos" : f.charAt(0) + f.slice(1).toLowerCase()}
              {f === "PENDENTE" && pendentes > 0 && (
                <span className={styles.badge}>{pendentes}</span>
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className={styles.emptyAdmin}>
            <p>Sem inscrições{filter !== "TODOS" ? ` com estado ${filter.toLowerCase()}` : ""}.</p>
          </div>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telemóvel</th>
                  <th>Email</th>
                  <th>Evento</th>
                  <th>Nº</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Estado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((insc) => (
                  <tr key={insc.id} className={insc.estado === "PENDENTE" ? styles.rowPendente : ""}>
                    <td>
                      <strong>{insc.nome}</strong>
                      {insc.referenciaPagamento && (
                        <span className={styles.ref}>Ref: {insc.referenciaPagamento}</span>
                      )}
                    </td>
                    <td>
                      <div className={styles.phoneCell}>
                        <span className={styles.phoneNum}>{insc.telefone}</span>
                        <button
                          className={styles.copyBtn}
                          onClick={() => copyPhone(insc.telefone, insc.id)}
                          title="Copiar número"
                        >
                          {copied === insc.id ? "✓" : "⎘"}
                        </button>
                      </div>
                    </td>
                    <td className={styles.emailCell}>{insc.email}</td>
                    <td>
                      {insc.evento?.titulo ?? "—"}
                      {insc.evento?.dataEvento && (
                        <span className={styles.eventDate}>
                          {new Date(insc.evento.dataEvento).toLocaleDateString("pt-PT", {
                            day: "2-digit",
                            month: "short",
                          })}
                        </span>
                      )}
                    </td>
                    <td className={styles.centered}>{insc.numPessoas ?? 1}</td>
                    <td className={styles.centered}>
                      {insc.valorTotal > 0 ? `${insc.valorTotal.toFixed(2)}€` : "Grátis"}
                    </td>
                    <td>
                      {new Date(insc.createdAt).toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles["status" + insc.estado]}`}>
                        {insc.estado === "PENDENTE" ? "Pendente" :
                         insc.estado === "ACEITE" ? "Aceite" : "Rejeitado"}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        {insc.estado !== "ACEITE" && (
                          <button
                            className={styles.acceptBtn}
                            onClick={() => handleStatus(insc.id, "aceite")}
                            disabled={isPending}
                            title="Aceitar pagamento"
                          >
                            ✓ Aceitar
                          </button>
                        )}
                        {insc.estado !== "REJEITADO" && (
                          <button
                            className={styles.rejectBtn}
                            onClick={() => handleStatus(insc.id, "rejeitado")}
                            disabled={isPending}
                            title="Rejeitar"
                          >
                            ✗ Rejeitar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
