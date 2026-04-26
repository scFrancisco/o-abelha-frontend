"use client";

import { useState, useEffect } from "react";
import styles from "./InscricaoModal.module.css";

type Props = {
  eventoId: number;
  eventoTitulo: string;
  preco: number;
  capacidade: number | null;
};

type Estado = "idle" | "loading" | "pendente" | "confirmado" | "erro";

export default function InscricaoModal({ eventoId, eventoTitulo, preco, capacidade }: Props) {
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [numPessoas, setNumPessoas] = useState(1);
  const [estado, setEstado] = useState<Estado>("idle");
  const [erro, setErro] = useState("");
  const [lugaresDisponiveis, setLugaresDisponiveis] = useState<number | null>(null);
  const [referencia, setReferencia] = useState("");
  const [codigoConfirmacao, setCodigoConfirmacao] = useState("");
  const [valorTotal, setValorTotal] = useState(0);
  const [expiraEm, setExpiraEm] = useState<Date | null>(null);
  const [tempoRestante, setTempoRestante] = useState("");

  const gratuito = preco === 0;
  const esgotado = lugaresDisponiveis !== null && lugaresDisponiveis <= 0;

  useEffect(() => {
    fetch(`/api/inscricoes/lugares?eventoId=${eventoId}`)
      .then((r) => r.json())
      .then((d) => setLugaresDisponiveis(d.disponiveis))
      .catch(() => setLugaresDisponiveis(null));
  }, [eventoId]);

  useEffect(() => {
    setValorTotal(preco * numPessoas);
  }, [preco, numPessoas]);

  // Fechar com ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Bloquear scroll quando modal aberto
  useEffect(() => {
    if (aberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [aberto]);

  // Timer countdown
  useEffect(() => {
    if (!expiraEm) return;
    const interval = setInterval(() => {
      const diff = expiraEm.getTime() - Date.now();
      if (diff <= 0) {
        setTempoRestante("00:00");
        clearInterval(interval);
        return;
      }
      const min = Math.floor(diff / 60000);
      const sec = Math.floor((diff % 60000) / 1000);
      setTempoRestante(`${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [expiraEm]);

  const fechar = () => {
    if (estado === "loading") return;
    setAberto(false);
  };

  const resetar = () => {
    setNome("");
    setEmail("");
    setTelefone("");
    setNumPessoas(1);
    setEstado("idle");
    setErro("");
    setReferencia("");
    setCodigoConfirmacao("");
    setExpiraEm(null);
    setTempoRestante("");
  };

  const handleSubmit = async () => {
    if (!nome.trim() || !email.trim() || !telefone.trim()) {
      setErro("Preenche o nome, email e telemóvel.");
      return;
    }
    setErro("");
    setEstado("loading");

    try {
      const res = await fetch(`/api/inscricoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventoId, nome, email, telefone, numPessoas }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErro(data.erro || "Erro ao processar inscrição.");
        setEstado("erro");
        return;
      }

      if (data.estado === "CONFIRMADO") {
        setCodigoConfirmacao(data.codigoConfirmacao);
        setEstado("confirmado");
      } else {
        setReferencia(data.referenciaPagamento);
        setValorTotal(data.valorTotal);
        setExpiraEm(new Date(data.expiraEm));
        setEstado("pendente");
      }
    } catch {
      setErro("Erro de ligação. Tenta novamente.");
      setEstado("erro");
    }
  };

  return (
    <>
      {/* BOTÃO DE ABERTURA */}
      <button
        className={styles.openBtn}
        onClick={() => setAberto(true)}
        disabled={esgotado}
      >
        {esgotado
          ? "Esgotado"
          : gratuito
          ? "Inscrever gratuitamente"
          : `Inscrever — ${preco.toFixed(2)}€ / pessoa`}
      </button>

      {lugaresDisponiveis !== null && capacidade !== null && !esgotado && (
        <p className={styles.lugaresHint}>
          {lugaresDisponiveis} lugar{lugaresDisponiveis !== 1 ? "es" : ""} disponível{lugaresDisponiveis !== 1 ? "is" : ""}
        </p>
      )}

      {/* BACKDROP + MODAL */}
      {aberto && (
        <div className={styles.backdrop} onClick={fechar}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Formulário de inscrição"
          >
            {/* HEADER */}
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.modalTag}>Inscrição</span>
                <h2>{eventoTitulo}</h2>
              </div>
              <button
                className={styles.closeBtn}
                onClick={fechar}
                aria-label="Fechar"
                disabled={estado === "loading"}
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className={styles.modalBody}>

              {/* ESTADO: CONFIRMADO */}
              {estado === "confirmado" && (
                <div className={styles.confirmado}>
                  <div className={styles.confirmadoIcon}>✓</div>
                  <h3>Inscrição Confirmada!</h3>
                  <p>Verifica o teu email para mais detalhes.</p>
                  <div className={styles.codigoBox}>
                    <span className={styles.codigoLabel}>Código de entrada</span>
                    <span className={styles.codigo}>{codigoConfirmacao}</span>
                  </div>
                  <p className={styles.codigoNote}>Apresenta este código na entrada do evento.</p>
                  <button className={styles.doneBtn} onClick={() => { fechar(); resetar(); }}>
                    Fechar
                  </button>
                </div>
              )}

              {/* ESTADO: PENDENTE */}
              {estado === "pendente" && (
                <div className={styles.pendente}>
                  <h3>Reserva Pendente</h3>
                  <p>Efectua o pagamento para garantir o teu lugar.</p>

                  <div className={styles.pagamentoInfo}>
                    <div className={styles.pagamentoRow}>
                      <span>Referência</span>
                      <strong className={styles.referencia}>{referencia}</strong>
                    </div>
                    <div className={styles.pagamentoRow}>
                      <span>Valor</span>
                      <strong>{valorTotal.toFixed(2)}€</strong>
                    </div>
                    <div className={styles.pagamentoRow}>
                      <span>Método</span>
                      <strong>MBWay / Multibanco</strong>
                    </div>
                  </div>

                  <div className={styles.timerBox}>
                    <span className={styles.timerLabel}>⏱ Tempo restante</span>
                    <span className={styles.timer}>{tempoRestante}</span>
                  </div>

                  <p className={styles.aviso}>
                    ⚠️ O teu lugar está reservado por 30 minutos. Após esse prazo será libertado automaticamente.
                  </p>

                  <button className={styles.doneBtn} onClick={() => { fechar(); resetar(); }}>
                    Fechar
                  </button>
                </div>
              )}

              {/* ESTADO: FORMULÁRIO */}
              {(estado === "idle" || estado === "loading" || estado === "erro") && (
                <>
                  <div className={styles.fields}>
                    <div className={styles.field}>
                      <label>Nome completo</label>
                      <input
                        type="text"
                        placeholder="O teu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        disabled={estado === "loading"}
                      />
                    </div>

                    <div className={styles.field}>
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="teu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={estado === "loading"}
                      />
                    </div>

                    <div className={styles.field}>
                      <label>Telemóvel (para MBWay)</label>
                      <input
                        type="tel"
                        placeholder="+351 9XX XXX XXX"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        disabled={estado === "loading"}
                      />
                      <span className={styles.fieldHint}>
                        Usado para confirmar o pagamento via MBWay
                      </span>
                    </div>

                    <div className={styles.field}>
                      <label>Número de pessoas</label>
                      <div className={styles.counter}>
                        <button
                          onClick={() => setNumPessoas((n) => Math.max(1, n - 1))}
                          disabled={numPessoas <= 1 || estado === "loading"}
                        >−</button>
                        <span>{numPessoas}</span>
                        <button
                          onClick={() =>
                            setNumPessoas((n) =>
                              lugaresDisponiveis !== null
                                ? Math.min(lugaresDisponiveis, n + 1)
                                : n + 1
                            )
                          }
                          disabled={
                            estado === "loading" ||
                            (lugaresDisponiveis !== null && numPessoas >= lugaresDisponiveis)
                          }
                        >+</button>
                      </div>
                    </div>
                  </div>

                  {!gratuito && (
                    <div className={styles.totalBox}>
                      <span>Total</span>
                      <strong>{valorTotal.toFixed(2)}€</strong>
                    </div>
                  )}

                  {gratuito && (
                    <div className={styles.gratuitoTag}>Evento gratuito</div>
                  )}

                  {erro && <p className={styles.erro}>{erro}</p>}

                  <button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={estado === "loading"}
                  >
                    {estado === "loading"
                      ? "A processar..."
                      : gratuito
                      ? "Confirmar inscrição"
                      : `Reservar e pagar ${valorTotal.toFixed(2)}€`}
                  </button>

                  <p className={styles.note}>
                    Receberás um email de confirmação após a inscrição.
                  </p>
                </>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
