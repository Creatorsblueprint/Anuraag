import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import EbookModal from './EbookModal';
import styles from './Ebook.module.css';

export default function Ebook() {
  const [activeTheme, setActiveTheme] = useState('business');
  const [isPaused, setIsPaused] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      desc: 'Across business leadership, mentorship and teaching, the book asks what remains when titles, plans and certainty are stripped away, and what you choose to build next.'
    }
  ];

  const currentTheme = themes.find((t) => t.id === activeTheme) || themes[0];

  // Auto-switch between the 4 dimensions with 7s dwell time and pause control
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTheme((prev) => {
        const currentIndex = themes.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % themes.length;
        return themes[nextIndex].id;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [isPaused, themes.length]);

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
          <p className={styles.eyebrow}>01 · THE FEATURED BOOK</p>
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
          {/* Interactive 3D Book Showcase Stage with Front/Back Flip */}
          <motion.div
            className={styles.bookStage}
            variants={fadeInUp}
          >
            <div className={styles.bookHalo} />

            <div className={styles.bookStageWrapper}>
              <div
                className={`${styles.book3DCard} ${isFlipped ? styles.cardFlipped : ''}`}
                onClick={() => setIsFlipped(!isFlipped)}
                role="button"
                tabIndex="0"
                aria-label={isFlipped ? 'Flip to front cover' : 'Flip to back cover'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsFlipped(!isFlipped);
                  }
                }}
              >
                {/* Front Cover Face */}
                <div className={styles.bookFaceFront}>
                  <img
                    src="/client_images/book_cover_front.jpg"
                    alt="Front cover of You Will Not Fly by Dr. Anuraag Guglaani"
                    className={styles.bookCoverImage}
                    draggable="false"
                  />
                  <div className={styles.bookSheen} />
                  <div className={styles.bookSpineEdge} />
                </div>

                {/* Back Cover Face */}
                <div className={styles.bookFaceBack}>
                  <img
                    src="/client_images/book_back_cover.jpg"
                    alt="Back cover of You Will Not Fly by Dr. Anuraag Guglaani"
                    className={styles.bookCoverImage}
                    draggable="false"
                  />
                  <div className={styles.bookSheen} />
                  <div className={styles.bookSpineEdge} />
                </div>
              </div>

              {/* Interactive 3D Flip Toggle Controls */}
              <div className={styles.bookControls}>
                <button
                  type="button"
                  className={styles.flipBtn}
                  onClick={() => setIsFlipped(!isFlipped)}
                  aria-pressed={isFlipped}
                >
                  <span className={styles.flipIcon}>⟲</span>
                  <span>{isFlipped ? 'View Front Cover' : 'View Back Cover'}</span>
                </button>
                <span className={styles.clickHint}>Click book to flip 360°</span>
              </div>
            </div>
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
              Grounded at Twenty. Airborne Ever Since.
            </p>

            <p className={styles.lead}>
              One operating system for business, career, family, and legacy.
            </p>

            {/* Condensed, Punchy Description for Fast Readers */}
            <p className={styles.bookDescriptionText}>
              Grounded at twenty from becoming a fighter pilot, Anuraag turned an unappealable verdict into
              three decades of enterprise reinvention across 26 industries. Part candid business memoir and
              part field manual, this book unpacks the five battle-tested disciplines: cash, decisions, talent,
              foresight, and governance that build resilient organizations and enduring legacies.
            </p>

            {/* Clear Reader's Benefits Section: What Will I Gain? */}
            <div className={styles.readerBenefits}>
              <span className={styles.benefitsTitle}>WHAT YOU WILL GAIN FROM THIS BOOK</span>
              <ul className={styles.benefitsList}>
                <li>
                  <span className={styles.bulletStar}>✦</span>
                  <div>
                    <strong>Make clearer business decisions</strong> under high stakes and uncertainty.
                  </div>
                </li>
                <li>
                  <span className={styles.bulletStar}>✦</span>
                  <div>
                    <strong>Navigate change and rebuild</strong> after unexpected setbacks and closed runways.
                  </div>
                </li>
                <li>
                  <span className={styles.bulletStar}>✦</span>
                  <div>
                    <strong>Build a business and legacy</strong> that can scale, endure, and continue without you.
                  </div>
                </li>
              </ul>
            </div>

            {/* High-Contrast Action CTAs */}
            <div className={styles.bookActions}>
              <a
                className={`${styles.button} ${styles.gold}`}
                href="#purchase"
                onClick={(e) => handleScrollTo(e, '#purchase')}
              >
                <span>Get the book</span>
                <span className={styles.btnArrow}>↗</span>
              </a>

              <button
                type="button"
                className={styles.sampleButton}
                onClick={() => setIsModalOpen(true)}
              >
                <span>Read a sample</span>
                <span className={styles.sampleIcon}>📖</span>
              </button>
            </div>

            <span className={styles.bookPublisher}>Published by Notion Press · Available in Hardcover &amp; Paperback</span>
          </motion.div>
        </motion.div>

        {/* 4 Connected Dimensions Explorer with user-controlled Pause/Play & hover pause */}
        <div
          className={styles.themesExplorer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.themesHeaderRow}>
            <div className={styles.themesHeading}>
              <span>ONE OPERATING SYSTEM. FOUR CONNECTED DIMENSIONS.</span>
            </div>

            {/* Visible Pause / Resume Control */}
            {/* <button
              type="button"
              className={`${styles.pauseControlBtn} ${isPaused ? styles.isPausedState : ''}`}
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume dimension auto-rotation' : 'Pause dimension auto-rotation'}
            >
              <span className={styles.pauseIcon}>{isPaused ? '▶' : '⏸'}</span>
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
              {!isPaused && <span className={styles.pulseDot} />}
            </button> */}
          </div>

          <div className={styles.bookThemes} role="tablist">
            {themes.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTheme === t.id}
                onClick={() => {
                  setActiveTheme(t.id);
                  setIsPaused(true);
                }}
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

      {/* Book Preview Modal */}
      <EbookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
