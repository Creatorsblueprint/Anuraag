import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Ebook.module.css';

export default function Ebook() {
  const [activeTheme, setActiveTheme] = useState('business');

  const themes = [
    {
      id: 'business',
      num: '01',
      label: 'Business',
      title: 'Decisions that shape the enterprise.',
      desc: 'Cash, decisions, talent, foresight and governance. The book brings together perspectives developed across factories, family businesses, boardrooms and investment rooms.'
    },
    {
      id: 'career',
      num: '02',
      label: 'Career',
      title: 'A closed door. A different direction.',
      desc: 'Grounded at twenty after training as an aspiring fighter jet pilot, Anuraag had to decide what came next. His journey offers a personal perspective on reinvention when a long-held plan changes.'
    },
    {
      id: 'family',
      num: '03',
      label: 'Family',
      title: 'The people behind the enterprise.',
      desc: 'The story and the operating system were shaped as much at his own kitchen table as in any boardroom. Family, judgment and continuity are central to the perspective he shares.'
    },
    {
      id: 'legacy',
      num: '04',
      label: 'Legacy',
      title: 'Build with the next generation in mind.',
      desc: 'Across business leadership, mentorship and teaching, the book asks what remains when titles, plans and certainty are stripped away—and what you choose to build next.'
    }
  ];

  const currentTheme = themes.find((t) => t.id === activeTheme) || themes[0];

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
    <section className={`${styles.bookSection} ${styles.section}`} id="book">
      {/* Anchor alias for #ebook backward compatibility */}
      <div id="ebook" style={{ position: 'absolute', top: 0 }} />

      <div className={styles.wrap}>
        {/* Section Top Eyebrow */}
        <div className={styles.sectionTop}>
          <p className={styles.eyebrow}>01 — THE FEATURED BOOK</p>
          <span className={styles.smallNote}>A MEMOIR. A FIELD MANUAL. A NEW PERSPECTIVE.</span>
        </div>

        {/* Book Layout: 3D Object Left, Copy Right */}
        <motion.div
          className={styles.bookLayout}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Premium Book Showcase Stage with subtle depth & micro-interaction */}
          <motion.div
            className={styles.bookStage}
            variants={fadeInUp}
          >
            <div className={styles.bookHalo} />

            <div className={styles.bookShowcaseWrapper}>
              <motion.div
                className={styles.bookShowcase}
                whileHover={{
                  y: -10,
                  rotateZ: 0,
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(199, 169, 103, 0.25)'
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <img
                  src="/client_images/book_cover_front.jpg"
                  alt="Front cover of You Will Not Fly by Dr. Anuraag Guglaani"
                  className={styles.bookCoverImage}
                  draggable="false"
                />
                <div className={styles.bookSheen} />
                <div className={styles.bookSpineEdge} />
              </motion.div>
            </div>

            <span className={styles.stageCaption}>
              {/* THE NEW WORK · GROUNDED AT TWENTY. AIRBORNE EVER SINCE. */}
            </span>
          </motion.div>

          {/* Book Copy Right */}
          <motion.div className={styles.bookCopy} variants={fadeInUp}>
            <div className={styles.launchTag}>
              A STORY OF REINVENTION. A NEW PERSPECTIVE.
            </div>

            <h2>
              You Will<br />
              <span className={styles.strike}>Not</span> <span className={styles.goldText}>Fly.</span>
            </h2>

            <p className={styles.bookSubtitle}>
              {/* Grounded at Twenty.<br />
              Airborne Ever Since. */}
              Grounded at Twenty. Airborne Ever Since.
            </p>

            <p className={styles.lead}>
              One operating system for business, career, family and legacy.
            </p>

            <p>
              At twenty, after clearing one of the toughest selection processes and training at the National
              Defence Academy as an aspiring fighter jet pilot, Anuraag was grounded by a verdict he could not appeal.
            </p>

            <p>
              What followed was a life of reinvention. Across factories, family businesses, boardrooms, classrooms
              and startup investment rooms, he spent three decades discovering what remains when titles, plans and
              certainty are stripped away.
            </p>

            <p>
              Part business memoir, part field manual, this is the story of that journey—and the operating system
              built along the way: cash, decisions, talent, foresight and governance.
            </p>

            <a
              className={`${styles.button} ${styles.gold}`}
              href="#purchase"
              onClick={(e) => handleScrollTo(e, '#purchase')}
            >
              <span>Get the book</span>
              <span className={styles.btnArrow}>↗</span>
            </a>

            <span className={styles.bookPublisher}>Published by Notion Press</span>
          </motion.div>
        </motion.div>

        {/* 4 Connected Dimensions / Themes Explorer */}
        <div className={styles.themesExplorer}>
          <div className={styles.themesHeading}>
            <span>ONE OPERATING SYSTEM. FOUR CONNECTED DIMENSIONS.</span>
          </div>

          <div className={styles.bookThemes} role="tablist">
            {themes.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTheme === t.id}
                onClick={() => setActiveTheme(t.id)}
                className={`${styles.themeTabBtn} ${activeTheme === t.id ? styles.themeTabActive : ''}`}
              >
                <span className={styles.tabNum}>{t.num}</span>
                <span className={styles.tabName}>{t.label}</span>
                <b className={styles.tabArrow}>↗</b>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTheme}
              className={styles.themePanel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <span className={styles.themeWord}>{currentTheme.label}</span>
              <div className={styles.themePanelIndex}>
                {currentTheme.num}<span>/ 04</span>
              </div>
              <div className={styles.themePanelContent}>
                <h3>{currentTheme.title}</h3>
                <p>{currentTheme.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Defining Axiom Quote */}
        <blockquote className={styles.bookQuote}>
          “A Verdict is not a Destiny.<br />
          A Title is a Noun. <span>What you can do is a Verb.</span>”
          <cite>FROM YOU WILL NOT FLY</cite>
        </blockquote>
      </div>
    </section>
  );
}
