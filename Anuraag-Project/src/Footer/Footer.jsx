import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        {/* Top Row: Brand & Quick Navigation */}
        <div className={styles.footerTop}>
          <a href="#overview" className={styles.brand} aria-label="Dr. Anuraag Guglaani home">
            <span className={styles.monogram}>
              AG<span>·</span>
            </span>
            <span className={styles.brandName}>
              DR. ANURAAG<br />GUGLAANI
            </span>
          </a>

          <div className={styles.footerTagline}>
            <span>AUTHOR · INVESTOR · PROFESSOR</span>
            <p className={styles.brandMotto}>The Family Business Doctor™</p>
          </div>

          <div className={styles.socialRow}>
            <a
              href="http://www.linkedin.com/in/anuraagguglaani"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
            >
              <span>LinkedIn ↗</span>
            </a>
            <a
              href="https://www.instagram.com/anuraagguglaani/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <span>Instagram ↗</span>
            </a>
            <a
              href="https://www.threads.com/@anuraagguglaani"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Threads"
            >
              <span>Threads ↗</span>
            </a>
            <a
              href="https://falconsofmajlis.com/falcons/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Falcons of Majlis"
            >
              <span>Falcons ↗</span>
            </a>
          </div>

          <a href="#top" onClick={handleScrollToTop} className={styles.backToTop}>
            <span>Back to top</span>
            <span className={styles.arrowUp}>↑</span>
          </a>
        </div>

        {/* Developer Tag on a Dedicated Centered Line Above Copyright */}
        <div className={styles.creditLine}>
          <span className={styles.developerCredit}>
            Developed By{' '}
            <a
              href="https://www.creatorsblueprint.io/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              Creators Blueprint
            </a>
          </span>
        </div>

        {/* Bottom Sub-footer */}
        <div className={styles.footerBottom}>
          <span>© {currentYear} Dr. Anuraag Guglaani. All rights reserved.</span>
          <span>BASED IN DUBAI. SHAPED BY THE WORLD.</span>
        </div>
      </div>
    </footer>
  );
}
