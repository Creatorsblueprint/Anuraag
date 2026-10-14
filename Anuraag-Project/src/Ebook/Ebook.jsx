import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Ebook.module.css';

export default function Ebook() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section id="ebook" className={styles.ebookSection}>
      <div className={styles.container}>
        {/* Header Block */}
        <motion.div
          className={styles.headerBlock}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className={styles.tagPill}>EBOOK</span>
          <h2 className={styles.mainTitle}>The Living Charter</h2>
          <p className={styles.subtitle}>
            Why 70% of Family Conglomerates Fail by Generation Three, and the Blueprint for
            Enterprise Immortality.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Column: Book Mockup */}
          <motion.div
            className={styles.bookCol}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className={styles.bookCard}>
              <div className={styles.bookInnerBorder} />

              <div className={styles.bookTop}>
                <span className={styles.bookEdition}>MONOGRAPH EDITION</span>
                <h3 className={styles.bookMainTitle}>
                  THE LIVING<br />CHARTER
                </h3>
                <p className={styles.bookSubtitle}>
                  The Architecture of Enterprise Immortality
                </p>
              </div>

              <div className={styles.bookBottom}>
                <span className={styles.bookAuthor}>DR. ANURAAG GUGLAANI</span>
                <span className={styles.bookRelease}>Hardcover · Global Release</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Treatise Details & Purchase */}
          <motion.div
            className={styles.detailsCol}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p className={styles.overviewText} variants={fadeInUp}>
              Synthesizing twenty-five years of confidential majlis mediation and boardroom stewardship
              across 35 countries, this landmark treatise reveals why conventional legal structures
              crumble under human friction—and outlines the definitive operational operating system
              for generational survival.
            </motion.p>

            <motion.div className={styles.partsList} variants={fadeInUp}>
              <div className={styles.partItem}>
                <div className={styles.partIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                </div>
                <p className={styles.partText}>
                  <span className={styles.partStrong}>Part I: The Psychology of Sibling Friction:</span> How
                  emotional fault lines dissolve multi-billion dollar balance sheets.
                </p>
              </div>

              <div className={styles.partItem}>
                <div className={styles.partIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                </div>
                <p className={styles.partText}>
                  <span className={styles.partStrong}>Part II: The Living Charter:</span> Designing
                  enforceable family constitutions that evolve without litigation.
                </p>
              </div>

              <div className={styles.partItem}>
                <div className={styles.partIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                </div>
                <p className={styles.partText}>
                  <span className={styles.partStrong}>Part III: Sovereign Wealth Integration:</span> Transitioning
                  private family holdings into institutional sovereign scale.
                </p>
              </div>
            </motion.div>

            {/* Purchase Box */}
            <motion.div className={styles.purchaseBox} variants={fadeInUp}>
              <div className={styles.priceTag}>
                <span className={styles.dollarSymbol}>$</span>
                <span>120</span>
              </div>

              <form onSubmit={handleSubmit} className={styles.purchaseForm}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.buyBtn}>
                  {submitted ? 'ORDER SENT' : 'BUY NOW'}
                </button>
              </form>

              <span className={styles.noteText}>
                *Sent directly to your email after checkout
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
