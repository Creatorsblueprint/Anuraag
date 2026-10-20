import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Story.module.css';

export default function Story() {
  const [activeChapter, setActiveChapter] = useState('foundation');

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
            Guglaani works where business transformation, investment, governance and family legacy meet.
          </p>

          <p>
            Based in Dubai, he has operated, invested in and transformed businesses across 26 industries
            and 35 countries, with exposure spanning the Middle East, Africa, South Asia and North America.
          </p>

          <p>
            As Group CEO and Board Member of ADAM Global and ADAM Global Network, and a multi-family
            office chairperson, he helps build profitable, scalable, sustainable and investable businesses.
            His work combines strategic growth, leadership development and cross-border expansion with the
            human judgment that holds an enterprise together.
          </p>

          <p>
            His doctoral research produced the <strong>A2G Framework — AI to Automation to Governance</strong>:
            an approach to bringing intelligent systems into family businesses while retaining human judgment.
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

      {/* Journey Chapters Interactive Tabs */}
      <div className={styles.journey}>
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
              onClick={() => setActiveChapter(ch.id)}
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
