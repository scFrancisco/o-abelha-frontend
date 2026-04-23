import styles from "./page.module.css";
import { getNoticias } from "@/lib/api";

type Noticia = {
  id: number;
  titulo: string;
  descripcion: string;
  corpoNoticia: string;
  createdAt: string;
};

export default async function NoticiasPage() {
  const noticias: Noticia[] = await getNoticias();

  return (
    <>
      {/* HERO */}
      <section className={styles.newsHero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1>Notícias</h1>
            <p>Fica a par de tudo o que acontece no CRC O Abelha</p>
            <div className={styles.heroAccent}></div>
          </div>
        </div>
      </section>

      {/* NEWS LIST */}
      <section className={styles.newsSection}>
        <div className={styles.newsInner}>
          {noticias.length > 0 ? (
            <div className={styles.newsGrid}>
              {noticias.map((n, index) => (
                <article 
                  key={n.id} 
                  className={styles.newsCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.cardHeader}>
                    <span className={styles.date}>
                      {new Date(n.createdAt).toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                    <div className={styles.category}>Notícia</div>
                  </div>

                  <h2>{n.titulo}</h2>
                  <p>{n.descripcion}</p>

                  <a href={`/noticias/${n.id}`} className={styles.readMore}>
                    <span>Ler mais</span>
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none"
                    >
                      <path 
                        d="M7 3L14 10L7 17" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Ainda não há notícias disponíveis.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}