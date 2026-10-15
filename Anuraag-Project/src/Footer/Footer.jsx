import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainGrid}>
          {/* Column 1: Brand & Bio */}
          <div className={styles.brandCol}>
            <h3 className={styles.brandTitle}>Dr. Anuraag Guglaani</h3>
            <p className={styles.brandQuote}>
              "Where sovereign governance meets generational stewardship."
            </p>
            <p className={styles.brandBio}>
              Author of The Living Charter, Group CEO &amp; Chair of Wazir Holdings, Falcon on UAE's
              landmark business broadcast 'Falcons of Majlis'. Distinguished visiting professor of strategy
              and enterprise governance at AURAK.
            </p>
            {/* <div className={styles.statusIndicator}>
              <span className={styles.statusDot} />
              <span>ACADEMIC PEDAGOGY &amp; THOUGHT LEADERSHIP</span>
            </div> */}
          </div>

          {/* Column 2: Navigation Links */}
          <div className={styles.navCol}>
            <h4 className={styles.colHeader}>NAVIGATION</h4>
            <ul className={styles.navList}>
              <li>
                <a
                  href="#overview"
                  onClick={(e) => handleScrollTo(e, '#overview')}
                  className={styles.navLink}
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#pillars"
                  onClick={(e) => handleScrollTo(e, '#pillars')}
                  className={styles.navLink}
                >
                  Pillars
                </a>
              </li>
              <li>
                <a
                  href="#falcons"
                  onClick={(e) => handleScrollTo(e, '#falcons')}
                  className={styles.navLink}
                >
                  Falcons of Majlis
                </a>
              </li>
              <li>
                <a
                  href="#lectern"
                  onClick={(e) => handleScrollTo(e, '#lectern')}
                  className={styles.navLink}
                >
                  Lectern
                </a>
              </li>
              <li>
                <a
                  href="#ebook"
                  onClick={(e) => handleScrollTo(e, '#ebook')}
                  className={styles.navLink}
                >
                  Ebook
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Links */}
          <div className={styles.socialCol}>
            <h4 className={styles.colHeader}>CONNECT</h4>
            <div className={styles.socialList}>
              <a
                href="http://www.linkedin.com/in/anuraagguglaani"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span className={styles.socialIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </span>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://www.instagram.com/anuraagguglaani/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span className={styles.socialIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </span>
                <span>Instagram</span>
              </a>

              <a
                href="https://www.threads.com/@anuraagguglaani"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <span className={styles.socialIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001 2c-5.523 0-10 4.477-10 10s4.477 10 10 10c2.81 0 5.34-1.16 7.15-3.03l-1.42-1.42A7.95 7.95 0 0 1 12.001 20c-4.411 0-8-3.589-8-8s3.589-8 8-8c4.07 0 7.42 3.038 7.92 7h-2.02c-.46-2.83-2.92-5-5.9-5-3.309 0-6 2.691-6 6s2.691 6 6 6c1.88 0 3.55-.87 4.65-2.23l1.54 1.28A7.98 7.98 0 0 1 12.001 22c-5.523 0-10-4.477-10-10s4.477-10 10-10zm2.25 10.75c0 1.24-1.01 2.25-2.25 2.25s-2.25-1.01-2.25-2.25 1.01-2.25 2.25-2.25 2.25 1.01 2.25 2.25z" />
                  </svg>
                </span>
                <span>Threads</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className={styles.bottomBar}>
          <div className={styles.copyrightGroup}>
            <span className={styles.copyright}>
              &copy; 2026 Dr. Anuraag Guglaani. All rights reserved.
            </span>
            {/* <span className={styles.creditDivider}>·</span>
            <span className={styles.developerCredit}>
              Developed By <span className={styles.creditName}>Creators Blueprint</span>
            </span> */}
          </div>

          <div className={styles.legalLinks}>
            <span className={styles.legalLink}>Wazir Holdings Executive Office</span>
            <span className={styles.legalLink}>AURAK Academic Affiliation</span>
            <span className={styles.legalLink}>DIFC &amp; ADGM Regulatory Compliance</span>
            <span className={styles.legalLink}>Sovereign Fiduciary Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
