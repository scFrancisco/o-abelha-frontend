import styles from "./page.module.css";
import ScrollReveal from "@/components/ScrollReveal";
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
      {/* ── HERO ── */}
      <section className={styles.newsHero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>CRC O Abelha</span>
          <h1>Notícias</h1>
          <p>Fica a par de tudo o que acontece no clube e na comunidade de Colmeias.</p>
          <div className={styles.heroAccent} />
        </div>
      </section>

      {/* ── NEWS LIST ── */}
      <section className={styles.newsSection}>
        <div className={styles.newsInner}>

          {noticias.length > 0 ? (
            <div className={styles.newsGrid}>
              {noticias.map((n, index) => (
                <ScrollReveal key={n.id} delay={index * 80}>
                  <article className={styles.newsCard}>
                    <div className={styles.cardHeader}>
                      <span className={styles.date}>
                        {new Date(n.createdAt).toLocaleDateString("pt-PT", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className={styles.category}>Notícia</span>
                    </div>
                    <h2>{n.titulo}</h2>
                    <p>{n.descripcion}</p>
                    <a href={`/noticias/${n.id}`} className={styles.readMore}>
                      <span>Ler mais</span>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                        <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </a>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📰</span>
                <h3>Em breve novas notícias</h3>
                <p>Ainda não há notícias publicadas. Volta em breve para ficares a par de tudo.</p>
              </div>
            </ScrollReveal>
          )}

        </div>
      </section>
    </>
  );
}
