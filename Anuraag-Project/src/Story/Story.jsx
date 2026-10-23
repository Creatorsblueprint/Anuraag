import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Story.module.css';

export default function Story() {
  const [activeChapter, setActiveChapter] = useState('foundation');
  const [isPaused, setIsPaused] = useState(false);

  const chapters = [
    {
      id: 'foundation',
      num: '1',
      tabLabel: 'The foundation',
      chapterNum: 'CHAPTER 01',
      title: 'Discipline & resilience',
      lead: 'National Defence Academy graduate and armed forces officer training for an aspiring fighter jet pilot.',
      detailEyebrow: 'A formative chapter',
      detailText:
        'An early ambition to fly became the beginning of a different journey. The book traces the reinvention that followed being grounded at twenty.'
    },
    {
      id: 'practice',
      num: '2',
      tabLabel: 'The practice',
      chapterNum: 'CHAPTER 02',
      title: 'Business & transformation',
      lead: 'Three decades working across industries, markets and family enterprises.',
      detailEyebrow: 'Experience across borders',
      detailText:
        'Operating, investing in and transforming businesses across 26 industries and 35 countries, with exposure spanning the Middle East, Africa, South Asia and North America.'
    },
    {
      id: 'generation',
      num: '3',
      tabLabel: 'The next generation',
      chapterNum: 'CHAPTER 03',
      title: 'Mentorship & possibility',
      lead: 'Startup investment, teaching and leadership development that turn experience into opportunity.',
      detailEyebrow: 'Passing perspective forward',
      detailText:
        'Co-founder of two technology startups, active investor and MSME mentor, adjunct professor at the American University of Ras Al Khaimah and a Falcon on Falcons of Majlis.'
    }
  ];

  const currentChapter = chapters.find((c) => c.id === activeChapter) || chapters[0];

  // Auto-switch between the 3 journey chapters every 3.5 seconds so it looks dynamic while presenting
  useEffect(() => {
    if (isPaused) {
      // Auto-resume presentation after 7 seconds of inactivity
      const resumeTimeout = setTimeout(() => {
        setIsPaused(false);
      }, 7000);
      return () => clearTimeout(resumeTimeout);
    }

    const interval = setInterval(() => {
      setActiveChapter((prev) => {
        const currentIndex = chapters.findIndex((c) => c.id === prev);
        const nextIndex = (currentIndex + 1) % chapters.length;
        return chapters[nextIndex].id;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, chapters.length]);

  return (
    <section className={`${styles.storySection} ${styles.section} ${styles.wrap}`} id="story">
      {/* Section Top */}
      <div className={styles.sectionTop}>
        <p className={styles.eyebrow}>02 — THE MAN BEHIND THE PERSPECTIVE</p>
        <a className={styles.textLink} href="#purchase">
          <span>Download profile</span>
          <span className={styles.arrowIcon}>↗</span>
        </a>
      </div>

      {/* Story Grid */}
      <motion.div
        className={styles.storyGrid}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Side: Photo with Yellow Striped Tie from Client Assets */}
        <motion.div className={styles.storyImage} variants={fadeInUp}>
          <img
            src="/client_images/dr_anuraag_yellow_tie.jpg"
            alt="Dr. Guglaani photographed in a blue suit and yellow striped tie"
            loading="lazy"
          />
          <div className={styles.imageCaption}>
            <span>LEADER. INVESTOR. MENTOR.</span>
            <b>A practitioner<br />before an author.</b>
          </div>
        </motion.div>

        {/* Right Side: Copy & Credentials */}
        <motion.div className={styles.storyCopy} variants={fadeInUp}>
          <h2>
            Experience is<br />
            only the beginning.<br />
            <span className={styles.muted}>Perspective is<br />what you pass on.</span>
          </h2>

          <p className={styles.lead}>
            Known as <span className={styles.goldText}>The Family Business Doctor</span>, Dr. Anuraag
            Guglaani advises at the intersection of business transformation, governance, and generational legacy.
          </p>

          <p>
            Based in Dubai, he has operated, invested in, and transformed enterprises across 26 industries
            and 35 countries—spanning the Middle East, Africa, South Asia, and North America.
          </p>

          <p>
            As Group CEO of ADAM Global and multi-family office chair, his doctoral research produced the
            <strong> A2G Framework (AI to Automation to Governance)</strong>: empowering enterprises to adopt intelligent systems while protecting the human judgment that holds them together.
          </p>

          {/* Credentials Box */}
          <div className={styles.credentials}>
            <span>ACADEMIC &amp; PROFESSIONAL QUALIFICATIONS</span>
            <p>
              Ph.D · B.Eng · DIM · MBA · FCIML<br />
              EMBA · CISM · CGEIT · CDPSE
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Journey Chapters Interactive Tabs with auto-rotation & pause on hover */}
      <div
        className={styles.journey}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={styles.journeyHeading}>
          <div>
            <p className={styles.eyebrow}>A LIFE THAT KEEPS EVOLVING</p>
            <h3>Three chapters. <span>One continuous journey.</span></h3>
          </div>
          <p className={styles.journeySubtitle}>Select a chapter to explore the experience behind the perspective.</p>
        </div>

        <div className={styles.journeySteps} role="tablist">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              role="tab"
              aria-selected={activeChapter === ch.id}
              onClick={() => {
                setActiveChapter(ch.id);
                setIsPaused(true);
              }}
              className={`${styles.stepBtn} ${activeChapter === ch.id ? styles.stepBtnActive : ''}`}
            >
              <span className={styles.stepCircle}>{ch.num}</span>
              <span className={styles.stepLabel}>{ch.tabLabel}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeChapter}
            className={styles.journeyPanel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <span className={styles.journeyWatermark}>{currentChapter.num}</span>

            <div className={styles.chapterMain}>
              <span className={styles.chapterEyebrow}>{currentChapter.chapterNum}</span>
              <h3>{currentChapter.title}</h3>
              <p>{currentChapter.lead}</p>
            </div>

            <div className={styles.chapterDetail}>
              <span className={styles.chapterEyebrow}>{currentChapter.detailEyebrow}</span>
              <p>{currentChapter.detailText}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
