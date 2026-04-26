import Image from "next/image";
import styles from "./page.module.css";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.overlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Colmeias · Leiria</p>
          <h1>
            CRC<br />
            <span>O Abelha</span>
          </h1>
          <p className={styles.heroSub}>Mais do que um clube — uma família.</p>
          <div className={styles.heroCtas}>
            <a href="/eventos" className={styles.ctaPrimary}>Ver Eventos</a>
            <a href="#sobre" className={styles.ctaGhost}>Conhece-nos</a>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>scroll</span>
          <div className={styles.scrollDot} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.stats}>
        <div className={styles.statsInner}>
          <ScrollReveal delay={0}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>+50</span>
              <span className={styles.statLabel}>Anos de História</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>+400</span>
              <span className={styles.statLabel}>Sócios Ativos</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>+30</span>
              <span className={styles.statLabel}>Eventos por Ano</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1</span>
              <span className={styles.statLabel}>Comunidade Unida</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className={styles.about} id="sobre">
        <div className={styles.aboutInner}>
          <ScrollReveal>
            <div className={styles.aboutText}>
              <span className={styles.eyebrow}>Sobre o Clube</span>
              <h2>O Coração<br />de Colmeias</h2>
              <p>
                Fundados na comunidade de Colmeias, somos um clube que acredita no poder da
                união, do desporto e da cultura. Há décadas que construímos memórias,
                celebramos conquistas e acolhemos toda a gente que queira fazer parte de
                algo maior.
              </p>
              <p>
                O CRC O Abelha é um espaço de partilha, crescimento e pertença —
                aberto a todos, de todas as idades.
              </p>
              <a href="/contactos" className={styles.btnOutline}>Faz Parte da Família →</a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className={styles.aboutImage}>
              <Image
                src="/colmeias.jpg"
                alt="CRC O Abelha — Colmeias"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section className={styles.activitiesSection}>
        <div className={styles.sectionInner}>
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrowLight}>O Que Fazemos</span>
              <h2>Atividades &amp; Comunidade</h2>
            </div>
          </ScrollReveal>
          <div className={styles.activitiesGrid}>
            <ScrollReveal delay={0}>
              <div className={styles.activityCard}>
                <div className={styles.cardImage}>
                  <Image src="/atividades/eventos.jpg" alt="Eventos" fill className="object-cover" />
                </div>
                <div className={styles.cardContent}>
                  <h3>Eventos Culturais</h3>
                  <p>Da música ao teatro, promovemos a cultura viva de Colmeias.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className={styles.activityCard}>
                <div className={styles.cardImage}>
                  <Image src="/atividades/convívio.jpg" alt="Convívio" fill className="object-cover" />
                </div>
                <div className={styles.cardContent}>
                  <h3>Convívio Associativo</h3>
                  <p>Um espaço aberto onde toda a gente é bem-vinda, sempre.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <div className={styles.activityCard}>
                <div className={styles.cardImage}>
                  <Image src="/atividades/historia.jpg" alt="História" fill className="object-cover" />
                </div>
                <div className={styles.cardContent}>
                  <h3>Raízes &amp; História</h3>
                  <p>Uma ligação duradoura que começou há mais de meio século.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section className={styles.newsSection}>
        <div className={styles.sectionInner}>
          <ScrollReveal>
            <div className={styles.sectionHeaderFlex}>
              <div>
                <span className={styles.eyebrow}>Blog</span>
                <h2>Últimas Notícias</h2>
              </div>
              <a href="/noticias" className={styles.seeAll}>Ver todas as notícias →</a>
            </div>
          </ScrollReveal>
          <div className={styles.newsGrid}>
            <ScrollReveal delay={0}>
              <article className={styles.newsCard}>
                <span>15 Abr 2024</span>
                <h3>Vitória no Campeonato Regional</h3>
                <p>Grande triunfo da nossa equipa sénior frente ao adversário mais difícil da época.</p>
                <a href="/noticias">LER MAIS →</a>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <article className={styles.newsCard}>
                <span>07 Abr 2024</span>
                <h3>Torneio de Páscoa com Recorde</h3>
                <p>Mais de 200 participantes marcaram presença no nosso torneio anual de Páscoa.</p>
                <a href="/noticias">LER MAIS →</a>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <article className={styles.newsCard}>
                <span>25 Mar 2024</span>
                <h3>Novas Instalações Inauguradas</h3>
                <p>Inaugurámos os novos balneários modernizados com a presença de toda a comunidade.</p>
                <a href="/noticias">LER MAIS →</a>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── SPONSORS ── */}
      <section className={styles.sponsorsSection}>
        <div className={styles.sectionInner}>
          <ScrollReveal>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrowLight}>Parceiros</span>
              <h2>Os Nossos Patrocinadores</h2>
              <p className={styles.sectionSubtitle}>
                Empresas e instituições que acreditam no CRC O Abelha e
                apoiam a nossa missão na comunidade de Colmeias.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className={styles.sponsorsGrid}>
              <div className={styles.sponsorItem}>
                <Image src="/s1.webp" alt="Patrocinador" width={160} height={80} className={styles.sponsorLogo} />
              </div>
              <div className={styles.sponsorItem}>
                <Image src="/s2.jpeg" alt="Patrocinador" width={160} height={80} className={styles.sponsorLogo} />
              </div>
              <div className={styles.sponsorItem}>
                <Image src="/s3.png" alt="Patrocinador" width={160} height={80} className={styles.sponsorLogo} />
              </div>
              <div className={styles.sponsorItem}>
                <Image src="/s4.png" alt="Patrocinador" width={160} height={80} className={styles.sponsorLogo} />
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <div className={styles.sponsorCta}>
              <p>A tua empresa pode fazer parte desta família.</p>
              <a href="/contactos" className={styles.btnAccent}>Torna-te Parceiro</a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className={styles.joinSection}>
        <div className={styles.joinInner}>
          <ScrollReveal>
            <span className={styles.eyebrowLight}>Junta-te a Nós</span>
            <h2>Pronto para fazer parte?</h2>
            <p>Aberto a todos, de todas as idades. Vem conhecer o teu novo clube.</p>
            <a href="/contactos" className={styles.ctaPrimary}>Contacta-nos Hoje</a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
