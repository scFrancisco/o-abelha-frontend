import styles from "./page.module.css";

export default function ContactosPage() {
  return (
    <>
      {/* HERO */}
      <section className={styles.contactsHero}>
        <div className={styles.heroInner}>
          <h1>Contactos</h1>
          <p>Entra em contacto com o CRC O Abelha</p>
        </div>
      </section>

      {/* CONTACTS */}
      <section className={styles.contactsSection}>
        <div className={styles.contactsInner}>

          {/* INFO */}
          <div className={styles.contactInfo}>
            <h2>Fala Connosco</h2>
            <p>
              Tens alguma questão, sugestão ou queres colaborar com o clube?
              Estamos disponíveis para falar contigo.
            </p>

            <ul className={styles.contactList}>
              <li>
                <span>Morada</span>
                Colmeias, Leiria
              </li>
              <li>
                <span>Email</span>
                geral@crcabelha.pt
              </li>
              <li>
                <span>Telefone</span>
                +351 912 345 678
              </li>
            </ul>
          </div>

          {/* FORM */}
          <form className={styles.contactForm}>
            <div className={styles.field}>
              <label>Nome</label>
              <input type="text" placeholder="O teu nome" />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input type="email" placeholder="O teu email" />
            </div>

            <div className={styles.field}>
              <label>Mensagem</label>
              <textarea placeholder="Escreve a tua mensagem"></textarea>
            </div>

            <button type="submit">Enviar Mensagem</button>
          </form>

        </div>

        {/* MAP */}
        <div className={styles.map}>
          <iframe
            src="https://www.google.com/maps?q=Colmeias%20Leiria&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
}
