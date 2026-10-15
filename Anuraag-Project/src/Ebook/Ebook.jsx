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
          {/* Left Column: Realistic 3D Book Cover */}
          <motion.div className={styles.bookCol} variants={fadeInUp}>
            <div className={styles.bookWrapper}>
              <div className={styles.bookSpineGlow} />
              <img
                src="/book_cover.jpg"
                alt="You Will Not Fly - Dr. Anuraag Guglaani"
                className={styles.bookImage}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: All Text, Info & Purchase */}
          <motion.div className={styles.detailsCol} variants={fadeInUp}>
            <span className={styles.tagPill}>FEATURED BOOK</span>
            <h2 className={styles.mainTitle}>You Will Not Fly</h2>
            <p className={styles.tagline}>Grounded at Twenty. Airborne Ever Since.</p>
            <p className={styles.subtitle}>
              One Operating System for Business, Career, Family and Legacy
            </p>

            <blockquote className={styles.quoteBlock}>
              &ldquo;A Verdict is not a Destiny. A Title is a Noun. What you can do is a Verb.&rdquo;
            </blockquote>

            <p className={styles.overviewText}>
              At twenty, after clearing one of the toughest selection processes and spending years training
              at the prestigious National Defence Academy (NDA) as an aspiring fighter jet pilot, Anuraag was
              grounded by a verdict he could not appeal. He hadn&rsquo;t failed or quit. The sky he&rsquo;d staked
              everything on simply closed.
            </p>

            <p className={styles.descriptionText}>
              What followed was not a comeback story—it was a reinvention. Across three decades from factory floors
              to boardrooms in 35 countries, known today as <em>The Family Business Doctor</em>, Dr. Guglaani shares
              the tested operating system built along the way: cash, decisions, talent, foresight, and governance,
              shaped as much at his own kitchen table as in any boardroom.
            </p>

            {/* Seamless, unboxed purchase area */}
            <div className={styles.purchaseArea}>
              <div className={styles.priceRow}>
                <div className={styles.priceTag}>
                  <span className={styles.dollarSymbol}>$</span>
                  <span>120</span>
                </div>
                <span className={styles.editionLabel}>Hardcover &amp; Digital Monograph</span>
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
