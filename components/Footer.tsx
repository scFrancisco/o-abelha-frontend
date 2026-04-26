import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logoWrap}>
            <Image src="/abelha.png" alt="CRC O Abelha" width={36} height={36} />
            <span className={styles.logoName}>CRC O Abelha</span>
          </Link>
          <p className={styles.tagline}>
            Clube Recreativo e Cultural de Colmeias — unindo a nossa comunidade há décadas.
          </p>
          <div className={styles.social}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Navegação</h4>
          <nav className={styles.navLinks}>
            <Link href="/">Início</Link>
            <Link href="/noticias">Notícias</Link>
            <Link href="/eventos">Eventos</Link>
            <Link href="/contactos">Contactos</Link>
          </nav>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contacto</h4>
          <div className={styles.contactInfo}>
            <p>Colmeias, Leiria<br />Portugal</p>
            <a href="mailto:geral@crcabelha.pt">geral@crcabelha.pt</a>
            <a href="tel:+351912345678">+351 912 345 678</a>
          </div>
        </div>

      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} CRC O Abelha. Todos os direitos reservados.</p>
        <p className={styles.bottomRight}>Colmeias, Leiria · Portugal</p>
      </div>
    </footer>
  )
}
