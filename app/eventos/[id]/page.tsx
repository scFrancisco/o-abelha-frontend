import styles from "./page.module.css";
import { getEventoById } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import ShareButtons from "./ShareButtons";
import InscricaoModal from "./InscricaoModal";

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

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EventoPage({ params }: Props) {
  const { id } = await params;

  let evento: Evento;

  try {
    evento = await getEventoById(id);
  } catch {
    notFound();
  }

  const formattedDate = new Date(evento.dataEvento).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className={styles.article}>
      {/* HERO */}
      <section className={styles.eventHero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroInner}>
          <div className={styles.breadcrumb}>
            <a href="/eventos">Eventos</a>
            <span>/</span>
            <span>Detalhe</span>
          </div>

          <div className={styles.metaInfo}>
            <span className={styles.category}>Evento</span>
            <time className={styles.date} dateTime={evento.dataEvento}>
              {formattedDate}
            </time>
            {evento.local && (
              <span className={styles.local}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {evento.local}
              </span>
            )}
          </div>

          <h1>{evento.titulo}</h1>

          <p className={styles.lead}>{evento.descricao}</p>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      {evento.imagemCapa && (
        <section className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              <Image
                src={evento.imagemCapa?.replace("/public", "") || ""}
                alt={evento.titulo}
                fill
                className={styles.featuredImage}
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className={styles.eventContent}>
        <div className={styles.contentInner}>
          <div className={styles.body}>
            <div dangerouslySetInnerHTML={{ __html: evento.corpoEvento }} />
          </div>

          <div className={styles.divider}></div>

          {/* FOOTER */}
          <div className={styles.articleFooter}>
            <a href="/eventos" className={styles.backButton}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M13 3L6 10L13 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
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
        </div>
      </section>
    </article>
  );
}