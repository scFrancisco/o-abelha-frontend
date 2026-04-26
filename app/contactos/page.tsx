import styles from "./page.module.css";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactosPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.contactsHero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>CRC O Abelha</span>
          <h1>Contactos</h1>
          <p>Estamos aqui para te ouvir. Fala connosco, visita-nos ou envia uma mensagem.</p>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section className={styles.contactsSection}>
        <div className={styles.contactsInner}>

          {/* INFO */}
          <ScrollReveal>
            <div className={styles.contactInfo}>
              <span className={styles.eyebrowDark}>Fala Connosco</span>
              <h2>Estamos Disponíveis</h2>
              <p>
                Tens alguma questão, sugestão ou queres colaborar com o clube?
                A porta do CRC O Abelha está sempre aberta para a comunidade.
              </p>

              <ul className={styles.contactList}>
                <li>
                  <div className={styles.contactIcon}>📍</div>
                  <div>
                    <span>Morada</span>
                    Colmeias, Leiria, Portugal
                  </div>
                </li>
                <li>
                  <div className={styles.contactIcon}>✉️</div>
                  <div>
                    <span>Email</span>
                    <a href="mailto:geral@crcabelha.pt">geral@crcabelha.pt</a>
                  </div>
                </li>
                <li>
                  <div className={styles.contactIcon}>📞</div>
                  <div>
                    <span>Telefone</span>
                    <a href="tel:+351912345678">+351 912 345 678</a>
                  </div>
                </li>
              </ul>

              <div className={styles.socialLinks}>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                  Facebook
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>
                  Instagram
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* FORM */}
          <ScrollReveal delay={120}>
            <form className={styles.contactForm}>
              <h3>Enviar Mensagem</h3>
              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label>Nome</label>
                  <input type="text" placeholder="O teu nome completo" />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input type="email" placeholder="o.teu@email.pt" />
                </div>
              </div>
              <div className={styles.field}>
                <label>Assunto</label>
                <input type="text" placeholder="Sobre o que queres falar?" />
              </div>
              <div className={styles.field}>
                <label>Mensagem</label>
                <textarea placeholder="Escreve a tua mensagem aqui..." />
              </div>
              <button type="submit">
                Enviar Mensagem →
              </button>
            </form>
          </ScrollReveal>

        </div>

        {/* MAP */}
        <ScrollReveal>
          <div className={styles.mapWrap}>
            <iframe
              src="https://www.google.com/maps?q=Colmeias%20Leiria&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              title="Localização CRC O Abelha"
            />
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
