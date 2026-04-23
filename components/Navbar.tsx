'use client' // Add this at the very top!

import { useState } from 'react' // Add this import
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false) // Add this state

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href={"/"} className={styles.logo}>
        <div className={styles.brand}>
          <Image
            src="/abelha.png"
            alt="Logo do CRC O Abelha"
            width={45}
            height={45}
          />
          <span className={styles.name}>CRC O ABELHA</span>
        </div>
        </Link>

        {/* Add this mobile menu button */}
        <button 
          className={styles.menuToggle} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Update this div - add the conditional class */}
        <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
          <Link href="/" className={styles.active}>Início</Link>
          <Link href="/noticias">Notícias</Link>
          <Link href="/eventos">Eventos</Link>
          <Link href="/contactos">Contactos</Link>
        </div>

      </div>
    </nav>
  )
}