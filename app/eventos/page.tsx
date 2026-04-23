import Image from "next/image";
import styles from "./page.module.css";
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
      {/* HERO */}
      <section className={styles.eventsHero}>
        <div className={styles.heroInner}>
          <h1>Eventos</h1>
          <p>Descobre os próximos eventos do CRC O Abelha</p>
        </div>
      </section>

      {/* EVENTS LIST */}
      <section className={styles.eventsSection}>
        <div className={styles.eventsInner}>

          {eventos.length === 0 ? (
            <p className={styles.empty}>Não há eventos disponíveis de momento.</p>
          ) : (
            <div className={styles.eventsGrid}>
              {eventos.map((evento) => {
                const formattedDate = new Date(evento.dataEvento).toLocaleDateString("pt-PT", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <article key={evento.id} className={styles.eventCard}>
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
                    </div>
                    <div className={styles.eventContent}>
                      <span className={styles.eventDate}>{formattedDate}</span>
                      {evento.local && (
                        <span className={styles.eventLocal}>📍 {evento.local}</span>
                      )}
                      <h2>{evento.titulo}</h2>
                      <p>{evento.descricao}</p>
                      <a href={`/eventos/${evento.id}`}>Ver evento →</a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
}