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
        <motion.div
          className={styles.mainGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column: Book Mockup */}
          <motion.div className={styles.bookCol} variants={fadeInUp}>
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
                <span className={styles.bookRelease}>Digital · Global Release</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: All Text, Info & Purchase */}
          <motion.div className={styles.detailsCol} variants={fadeInUp}>
            <span className={styles.tagPill}>EBOOK</span>
            <h2 className={styles.mainTitle}>The Living Charter</h2>
            <p className={styles.subtitle}>
              Why 70% of Family Conglomerates Fail by Generation Three, and the Blueprint for
              Enterprise Immortality.
            </p>

            <p className={styles.overviewText}>
              Synthesizing twenty-five years of confidential majlis mediation and boardroom stewardship
              across 35 countries, this landmark treatise reveals why conventional legal structures
              crumble under human friction—and outlines the definitive operational operating system
              for generational survival.
            </p>

            {/* Seamless, unboxed purchase area */}
            <div className={styles.purchaseArea}>
              <div className={styles.priceRow}>
                <div className={styles.priceTag}>
                  <span className={styles.dollarSymbol}>$</span>
                  <span>120</span>
                </div>
                {/* <span className={styles.editionLabel}>Hardcover &amp; Digital Monograph</span> */}
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
