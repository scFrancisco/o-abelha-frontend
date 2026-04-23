'use client';

import styles from "./page.module.css";

type ShareButtonsProps = {
  titulo: string;
};

export default function ShareButtons({ titulo }: ShareButtonsProps) {
  const handleFacebookShare = () => {
    const url = window.location.href;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const handleTwitterShare = () => {
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(titulo)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  return (
    <div className={styles.shareSection}>
      <span>Partilhar:</span>
      <div className={styles.shareButtons}>
        <button onClick={handleFacebookShare} title="Partilhar no Facebook">
          Facebook
        </button>
        <button onClick={handleTwitterShare} title="Partilhar no Twitter">
          Twitter
        </button>
      </div>
    </div>
  );
}