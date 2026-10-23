import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInScale, staggerContainer } from '../animations';
import styles from './Home.module.css';

export default function Home() {
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const sectionId = targetId.replace('#', '');
    const newPath = sectionId === 'overview' ? '/' : `/${sectionId}`;
    window.history.pushState(null, '', newPath);

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
    <div id="overview">
      <section className={styles.hero}>
        {/* Dubai Skyline Backdrop Image from Client Assets */}
        <img
          className={styles.heroBackdrop}
          src="/client_images/dubai_skyline.jpg"
          alt="Dubai skyline photographed at sunrise by Piotr Chrobot"
          loading="eager"
        />

        {/* Subtle Dark Luxury Architectural & Guilloche Texture Layer (~20% opacity) */}
        <img
          className={styles.heroTexture}
          src="/client_images/hero_texture_backdrop.jpg"
          alt=""
          aria-hidden="true"
        />

        <div className={styles.heroWash} aria-hidden="true" />
        <div className={styles.heroOrbit} aria-hidden="true" />
        <span className={styles.heroCoordinate} aria-hidden="true">
          PERSPECTIVE / PURPOSE / POSSIBILITY
        </span>

        {/* Hero Main Content Area: Left Copy + Right Portrait + Floating Book Card */}
        <div className={styles.heroMain}>
          {/* Hero Left Copy */}
          <motion.div
            className={styles.heroCopy}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p className={styles.eyebrow} variants={fadeInUp}>
              THE FAMILY BUSINESS DOCTOR
            </motion.p>

            <motion.h1 variants={fadeInUp}>
              Perspective that<br />
              <span className={styles.thin}>builds legacies.</span>
            </motion.h1>

            <motion.p className={styles.heroIntro} variants={fadeInUp}>
              Dr. Anuraag Guglaani{' '}
              <span className={styles.heroRole}>LEADER · INVESTOR · AUTHOR</span>
            </motion.p>

            <motion.p className={styles.heroDescription} variants={fadeInUp}>
              Three decades of business transformation.<br />
              A lifetime of looking beyond what comes next.
            </motion.p>

            <motion.div className={styles.heroActions} variants={fadeInUp}>
              <a
                className={`${styles.button} ${styles.gold}`}
                href="#book"
                onClick={(e) => handleScrollTo(e, '#book')}
              >
                <span>Discover the book</span>
                <span className={styles.btnArrow}>↗</span>
              </a>

              <a
                className={styles.textLink}
                href="#story"
                onClick={(e) => handleScrollTo(e, '#story')}
              >
                <span>Meet the author</span>
                <span className={styles.btnArrowDown}>↓</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Hero Photo Wrap with Client's Blue Suit Photo */}
          <motion.div
            className={styles.heroPhotoWrap}
            variants={fadeInScale}
            initial="hidden"
            animate="visible"
          >
            <img
              className={styles.heroPhoto}
              src="/client_images/dr_anuraag_hero_suit.png"
              alt="Dr. Anuraag Guglaani in his blue checked suit"
              fetchPriority="high"
            />
            <div className={styles.portraitShade} />
            <span className={styles.portraitLabel}>DUBAI BASED. GLOBALLY ENGAGED.</span>
          </motion.div>

          {/* Floating Book Announcement Card */}
          <motion.a
            className={styles.heroBookCard}
            href="#book"
            onClick={(e) => handleScrollTo(e, '#book')}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.tinyCover}>
              <img src="/client_images/book_cover_front.jpg" alt="You Will Not Fly book cover thumbnail" />
            </span>
            <span className={styles.cardContent}>
              <small>THE NEW BOOK</small>
              <strong>You Will Not Fly</strong>
              <em>Grounded at Twenty. Airborne Ever Since.</em>
            </span>
            <span className={styles.cardArrow}>↗</span>
          </motion.a>
        </div>

        {/* 4 Stat Proof Counters: Integrated Directly at Hero Base for Above-The-Fold Visibility */}
        <section className={`${styles.metrics} ${styles.wrap}`} id="perspective" aria-label="Experience at a glance">
          <div className={styles.metricConviction}>
            <span className={styles.convictionLabel}>THE FAMILY BUSINESS DOCTOR</span>
            <strong className={styles.convictionTitle}>A wider perspective.<br />A lasting impact.</strong>
            <p className={styles.convictionSub}>Business. Career. Family. Legacy.</p>
          </div>

          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>EXPERIENCE</span>
            <strong className={styles.metricValue}>
              30<span>+</span>
            </strong>
            <p className={styles.metricDesc}>Years of reinvention</p>
          </div>

          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>BREADTH</span>
            <strong className={styles.metricValue}>26</strong>
            <p className={styles.metricDesc}>Industries explored</p>
          </div>

          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>GLOBAL REACH</span>
            <strong className={styles.metricValue}>35</strong>
            <p className={styles.metricDesc}>Countries of experience</p>
          </div>
        </section>
      </section>
    </div>
  );
}
