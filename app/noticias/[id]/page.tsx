import styles from "./page.module.css";
import { getNoticiaById } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import ShareButtons from "./SharedButtons";

type Noticia = {
  id: number;
  titulo: string;
  descripcion: string;
  corpoNoticia: string;
  createdAt: string;
  imagemCapa?: string | null;
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoticiaPage({ params }: Props) {
  const { id } = await params;

  let noticia: Noticia;

  try {
    noticia = await getNoticiaById(id);
  } catch {
    notFound();
  }

  const formattedDate = new Date(noticia.createdAt).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <article className={styles.article}>
      {/* HERO */}
      <section className={styles.newsHero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroInner}>
          <div className={styles.breadcrumb}>
            <a href="/noticias">Notícias</a>
            <span>/</span>
            <span>Artigo</span>
          </div>

          <div className={styles.metaInfo}>
            <span className={styles.category}>Notícia</span>
            <time className={styles.date} dateTime={noticia.createdAt}>
              {formattedDate}
            </time>
          </div>

          <h1>{noticia.titulo}</h1>

          <p className={styles.lead}>{noticia.descripcion}</p>
        </div>
      </section>

      {/* FEATURED IMAGE */}
      {noticia.imagemCapa && (
        <section className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageContainer}>
              {/* TEMPORARIO */}
              <Image
                src={noticia.imagemCapa?.replace('/public', '') || ''}
                alt={noticia.titulo}
                fill
                className={styles.featuredImage}
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className={styles.newsContent}>
        <div className={styles.contentInner}>
          <div className={styles.body}>
            {/* Se o corpo da notícia vier em HTML */}
            <div dangerouslySetInnerHTML={{ __html: noticia.corpoNoticia }} />

            {/* OU se for texto simples, usa isto em vez: */}
            {/* {noticia.corpoNoticia} */}
          </div>

          <div className={styles.divider}></div>

          {/* FOOTER WITH BACK BUTTON */}
          <div className={styles.articleFooter}>
            <a href="/noticias" className={styles.backButton}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M13 3L6 10L13 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Voltar às notícias</span>
            </a>

            <ShareButtons titulo={noticia.titulo} />
          </div>
        </div>
      </section>
    </article>
  );
}