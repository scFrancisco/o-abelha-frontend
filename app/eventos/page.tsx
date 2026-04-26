import Image from "next/image";
import styles from "./page.module.css";
import ScrollReveal from "@/components/ScrollReveal";
import { getEventos } from "@/lib/api";

type Evento = {
  id: number;
  titulo: string;
  descricao: string;
  dataEvento: string;
  local?: string | null;
  imagemCapa?: string | null;
};

export default async function EventosPage() {
  let eventos: Evento[] = [];

  try {
    eventos = await getEventos();
  } catch {
    eventos = [];
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.eventsHero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>CRC O Abelha</span>
          <h1>Eventos</h1>
          <p>Descobre tudo o que se passa em Colmeias. Inscreve-te e faz parte.</p>
        </div>
      </section>

      {/* ── EVENTS LIST ── */}
      <section className={styles.eventsSection}>
        <div className={styles.eventsInner}>

          {eventos.length === 0 ? (
            <ScrollReveal>
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📅</span>
                <h3>Em breve novos eventos</h3>
                <p>Ainda não há eventos disponíveis. Volta em breve ou subscreve as nossas notícias.</p>
                <a href="/noticias" className={styles.btnPrimary}>Ver Notícias</a>
              </div>
            </ScrollReveal>
          ) : (
            <div className={styles.eventsGrid}>
              {eventos.map((evento, index) => {
                const formattedDate = new Date(evento.dataEvento).toLocaleDateString("pt-PT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                const day = new Date(evento.dataEvento).getDate();
                const month = new Date(evento.dataEvento).toLocaleDateString("pt-PT", { month: "short" }).toUpperCase();

                return (
                  <ScrollReveal key={evento.id} delay={index * 80}>
                    <article className={styles.eventCard}>
                      <div className={styles.eventImage}>
                        {evento.imagemCapa ? (
                          <Image
                            src={evento.imagemCapa.replace("/public", "")}
                            alt={evento.titulo}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className={styles.imagePlaceholder} />
                        )}
                        <div className={styles.dateBadge}>
                          <span className={styles.badgeDay}>{day}</span>
                          <span className={styles.badgeMonth}>{month}</span>
                        </div>
                      </div>
                      <div className={styles.eventContent}>
                        <div className={styles.eventMeta}>
                          <span className={styles.eventDate}>{formattedDate}</span>
                          {evento.local && (
                            <span className={styles.eventLocal}>📍 {evento.local}</span>
                          )}
                        </div>
                        <h2>{evento.titulo}</h2>
                        <p>{evento.descricao}</p>
                        <a href={`/eventos/${evento.id}`} className={styles.eventCta}>
                          Ver detalhes e inscrever →
                        </a>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
}
