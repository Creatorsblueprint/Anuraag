import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInScale, staggerContainer } from '../animations';
import styles from './Home.module.css';

export default function Home() {
  const [imgError, setImgError] = useState(false);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="overview" className={styles.heroSection}>
      <div className={styles.container}>
        {/* Left Column Content */}
        <motion.div
          className={styles.leftCol}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badges */}
          <motion.div className={styles.badgeRow} variants={fadeInUp}>
            <span className={styles.badgeLight}>THE FAMILY BUSINESS DOCTOR™</span>
            <span className={styles.badgeDark}>FALCON · UAE MEDIA BROADCAST</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 className={styles.heroTitle} variants={fadeInUp}>
            Architect of Multi-<br />
            Generational Enterprise &<br />
            Sovereign Scale.
          </motion.h1>

          {/* Subparagraph */}
          <motion.p className={styles.heroSubtitle} variants={fadeInUp}>
            Dr. Anuraag Guglaani — Group CEO, Chair of Wazir Holdings, and Investor on UAE’s premier
            televised venture showcase <em>Falcons of Majlis</em>. Fusing institutional governance with
            multi-century dynasty preservation across the Middle East, India, and global sovereign hubs.
          </motion.p>

          {/* CTAs */}
          <motion.div className={styles.actionRow} variants={fadeInUp}>
            <a
              href="#ebook"
              onClick={(e) => handleScrollTo(e, '#ebook')}
              className={styles.primaryBtn}
            >
              <span>GET EBOOK</span>
              <span className={styles.btnIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                  <path d="M6 6h10" />
                  <path d="M6 10h10" />
                </svg>
              </span>
            </a>

            <a
              href="#falcons"
              onClick={(e) => handleScrollTo(e, '#falcons')}
              className={styles.secondaryBtn}
            >
              <span className={styles.btnIcon}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span>WATCH FALCONS OF MAJLIS</span>
            </a>
          </motion.div>

          {/* Metrics Bar */}
          <motion.div className={styles.metricsGrid} variants={fadeInUp}>
            <div className={styles.metricItem}>
              <span className={styles.metricValue}>35</span>
              <span className={styles.metricLabel}>COUNTRIES ADVISED</span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricValue}>26</span>
              <span className={styles.metricLabel}>INDUSTRIES NAVIGATED</span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricValue}>$4.2B+</span>
              <span className={styles.metricLabel}>CAPITAL GOVERNED</span>
            </div>

            <div className={styles.metricItem}>
              <span className={styles.metricValue}>AURAK</span>
              <span className={styles.metricLabel}>ADJUNCT PROFESSOR</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column Portrait Frame */}
        <motion.div
          className={styles.rightCol}
          variants={fadeInScale}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.portraitFrame}>
            <div className={styles.imageWrapper}>
              {!imgError ? (
                <img
                  src="/home.png"
                  alt="Dr. Anuraag Guglaani — Fiduciary Sovereign Counsel"
                  className={styles.portraitImg}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className={styles.portraitPlaceholder}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              )}

              {/* Gradient Overlay with Name and Role */}
              <div className={styles.portraitOverlay}>
                <span className={styles.overlayName}>Dr. Anuraag Guglaani</span>
                <span className={styles.overlayRole}>FIDUCIARY SOVEREIGN COUNSEL</span>
              </div>
            </div>

            {/* Inset Footer below photo */}
            <div className={styles.frameFooter}>
              <div className={styles.officeInfo}>
                <span className={styles.dot} />
                <span>Wazir Holdings Executive Office</span>
              </div>
              <span className={styles.frameDate}>DXB · 2025</span>
            </div>

            {/* Overlapping Floating Television Investor Badge */}
            <div className={styles.floatingBadge}>
              <div className={styles.badgeIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="M12 22v-4" />
                  <path d="m19.07 19.07-2.83-2.83" />
                  <path d="M22 12h-4" />
                  <path d="m19.07 4.93-2.83 2.83" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div className={styles.badgeContent}>
                <span className={styles.badgeTag}>TELEVISION INVESTOR</span>
                <span className={styles.badgeTitle}>Falcons of Majlis (UAE Broadcast)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
