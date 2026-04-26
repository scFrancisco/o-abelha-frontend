'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/noticias', label: 'Notícias' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/contactos', label: 'Contactos' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <div className={styles.brand}>
            <Image
              src="/abelha.png"
              alt="Logo do CRC O Abelha"
              width={40}
              height={40}
            />
            <span className={styles.name}>CRC O ABELHA</span>
          </div>
        </Link>

        <button
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? styles.active : ''}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
