// 1. Adiciona o import no topo de eventos/[id]/page.tsx
import InscricaoModal from "./InscricaoModal";

// 2. Atualiza o type Evento com os novos campos:
type Evento = {
  id: number;
  titulo: string;
  descricao: string;
  corpoEvento: string;
  dataEvento: string;
  local?: string | null;
  imagemCapa?: string | null;
  capacidade?: number | null;
  preco?: number | null;
  inscricoesAtivas?: boolean;
};

// 3. No articleFooter (junto ao botão "Voltar aos eventos"),
//    adiciona o modal APENAS se inscricoesAtivas for true:

<div className={styles.articleFooter}>
  <a href="/eventos" className={styles.backButton}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M13 3L6 10L13 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
    <span>Voltar aos eventos</span>
  </a>

  {evento.inscricoesAtivas && (
    <InscricaoModal
      eventoId={evento.id}
      eventoTitulo={evento.titulo}
      preco={evento.preco ?? 0}
      capacidade={evento.capacidade ?? null}
    />
  )}

  <ShareButtons titulo={evento.titulo} />
</div>
