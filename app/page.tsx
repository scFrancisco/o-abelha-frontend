import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1>CRC O ABELHA</h1>
          <p>Clube Recreativo e Cultural de Colmeias</p>
          <a href="/eventos">Ver Eventos</a>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutText}>
            <h2>Sobre o Clube</h2>
            <p>
              O CRC O Abelha é um clube com forte ligação à comunidade de
              Colmeias, promovendo o desporto, a formação e os valores
              humanos desde a sua fundação.
            </p>
          </div>
          <div className={styles.aboutImage}>
            <Image
              src="/colmeias.jpg"
              alt="CRC O Abelha"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. ACTIVITIES SECTION */}
      <section className={styles.darkSection}>
        <div className={styles.activitiesInner}>
          <h2 className={styles.sectionTitle}>Atividades & Comunidade</h2>
          <div className={styles.activitiesGrid}>
            <div className={styles.activityCard}>
              <div className={styles.cardImage}>
                <Image src="/atividades/eventos.jpg" alt="Eventos" fill className="object-cover" />
              </div>
              <h3>Eventos Culturais</h3>
              <p>Iniciativas e encontros da comunidade</p>
            </div>

            <div className={styles.activityCard}>
              <div className={styles.cardImage}>
                <Image src="/atividades/convívio.jpg" alt="Convívio" fill className="object-cover" />
              </div>
              <h3>Convívio Associativo</h3>
              <p>Um espaço aberto a todos</p>
            </div>

            <div className={styles.activityCard}>
              <div className={styles.cardImage}>
                <Image src="/atividades/historia.jpg" alt="História" fill className="object-cover" />
              </div>
              <h3>História do Clube</h3>
              <p>Uma ligação duradoura a Colmeias</p>
            </div>
          </div>
        </div>

        {/* 4. NEWS SECTION */}
        <div className={styles.activitiesInner}>
          <h2 className={styles.sectionTitle}>Últimas Notícias</h2>
          <div className={styles.newsGrid}>
            <article className={styles.newsCard}>
              <span>15 Abr 2023</span>
              <h3>Vitória no Campeonato</h3>
              <p>Grande triunfo da nossa equipa sénior frente ao adversário.</p>
              <a href="#">LER MAIS →</a>
            </article>

            <article className={styles.newsCard}>
              <span>07 Abr 2023</span>
              <h3>Torneio de Páscoa</h3>
              <p>Momentos de alegria e competição no nosso torneio de Páscoa.</p>
              <a href="#">LER MAIS →</a>
            </article>

            <article className={styles.newsCard}>
              <span>25 Mar 2023</span>
              <h3>Novas Instalações</h3>
              <p>Inaugurámos os novos balneários do clube com a presença de todos.</p>
              <a href="#">LER MAIS →</a>
            </article>
          </div>

          <h2 className={`${styles.sectionTitle} ${styles.sponsorsTitle}`}>Patrocinadores</h2>
          <div className={styles.sponsorsContainer}>
            <div className={styles.sponsorsRow}>
              <Image src="/sponsors/s1.png" alt="S1" width={140} height={70} />
              <Image src="/sponsors/s2.png" alt="S2" width={140} height={70} />
              <Image src="/sponsors/s3.png" alt="S3" width={140} height={70} />
              <Image src="/sponsors/s4.png" alt="S4" width={140} height={70} />
              {/* Duplicate for infinite loop */}
              <Image src="/sponsors/s1.png" alt="S1" width={140} height={70} />
              <Image src="/sponsors/s2.png" alt="S2" width={140} height={70} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}