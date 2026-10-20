import React, { useState, useEffect } from 'react';
import styles from './StickyBook.module.css';

export default function StickyBook() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 750);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={`${styles.stickyBook} ${visible ? styles.visible : ''}`}
      aria-label="Book quick action"
    >
      <div className={styles.bookInfoGroup}>
        <div className={styles.bookTitles}>
          <small>THE NEW BOOK</small>
          <strong>You Will Not Fly</strong>
        </div>
      </div>

      <a
        href="#purchase"
        onClick={(e) => handleScrollTo(e, '#purchase')}
        className={styles.actionBtn}
      >
        <span>Get the book</span>
        <span className={styles.btnArrow}>↗</span>
      </a>
    </div>
  );
}
