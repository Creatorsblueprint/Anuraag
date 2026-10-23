import React, { useState, useEffect } from 'react';
import styles from './StickyBook.module.css';

export default function StickyBook() {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [isInCtaZone, setIsInCtaZone] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > 650);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hide sticky floating bar when visitor is in #book or #purchase to avoid CTA overlap
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.some((entry) => entry.isIntersecting);
        setIsInCtaZone(intersecting);
      },
      {
        root: null,
        rootMargin: '40px 0px 40px 0px',
        threshold: 0.05
      }
    );

    const targets = [
      document.getElementById('book'),
      document.getElementById('purchase')
    ].filter(Boolean);

    targets.forEach((target) => observer.observe(target));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const visible = scrolledPastHero && !isInCtaZone;

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
