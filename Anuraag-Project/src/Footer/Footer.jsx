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
            <div className={styles.statusIndicator}>
              <span className={styles.statusDot} />
              <span>ACADEMIC PEDAGOGY &amp; THOUGHT LEADERSHIP</span>
            </div>
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
                  The Three Pillars
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
                  Academic Appointments
                </a>
              </li>
              <li>
                <a
                  href="#ebook"
                  onClick={(e) => handleScrollTo(e, '#ebook')}
                  className={styles.navLink}
                >
                  The Living Charter Monograph
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: The Living Charter CTA */}
          <div className={styles.ctaCol}>
            <h4 className={styles.colHeader}>THE LIVING CHARTER</h4>
            <p className={styles.ctaText}>
              Dr. Anuraag Guglaani's forthcoming monograph on enterprise immortality and generational
              dynasty governance.
            </p>
            <a
              href="#ebook"
              onClick={(e) => handleScrollTo(e, '#ebook')}
              className={styles.preorderBtn}
            >
              <span>PRE-ORDER EBOOK</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            &copy; 2025 Dr. Anuraag Guglaani. All rights reserved.
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
