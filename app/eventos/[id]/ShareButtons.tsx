"use client";

import styles from "./page.module.css";

type Props = {
  titulo: string;
};

export default function ShareButtons({ titulo }: Props) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleShareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank"
    );
  };

  return (
    <div className={styles.shareSection}>
      <span>Partilhar</span>
      <div className={styles.shareButtons}>
        <button onClick={handleShareFacebook}>Facebook</button>
        <button onClick={handleCopyLink}>Copiar link</button>
      </div>
    </div>
  );
}
