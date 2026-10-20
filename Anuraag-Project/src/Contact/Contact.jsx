import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import styles from './Contact.module.css';

export default function Contact() {
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
    <section className={`${styles.contactSection} ${styles.purchaseSection} ${styles.section}`} id="purchase">
      {/* Anchor alias for #contact and #order */}
      <div id="contact" style={{ position: 'absolute', top: 0 }} />
      <div id="order" style={{ position: 'absolute', top: 0 }} />

      <div className={`${styles.wrap} ${styles.purchaseGrid}`}>
        {/* Left Column: Author Narrative & Signature */}
        <motion.div
          className={styles.purchaseLeft}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className={styles.eyebrow}>07 — YOUR NEXT CHAPTER</p>

          <h2 className={styles.heading}>
            For everything<br />
            you choose to<br />
            <span className={styles.goldText}>build next.</span>
          </h2>

          <p className={styles.lead}>You Will Not Fly</p>
          <p className={styles.sublead}>Grounded at Twenty. Airborne Ever Since.</p>
          <p className={styles.description}>
            A personal story of reinvention. An operating system for business, career, family and legacy.
          </p>

          <div className={styles.contactSignature}>
            <img
              src="/client_images/dr_anuraag_portrait.png"
              loading="lazy"
              alt="Dr. Anuraag Guglaani portrait"
              width="80"
              height="80"
            />
            <span>
              DR. ANURAAG GUGLAANI<br />
              <b>The Family Business Doctor</b>
            </span>
          </div>
        </motion.div>

        {/* Right Column: Exact Purchase Card from Client Reference */}
        <motion.div
          className={styles.purchaseCard}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <span className={styles.purchaseOverline}>THE NEW BOOK</span>
          <h3>You Will Not Fly</h3>
          <p className={styles.purchaseSubtitle}>
            One operating system.<br />
            Four connected dimensions.
          </p>
          <p className={styles.purchaseAvailability}>
            Online purchase details coming soon.
          </p>

          <button
            type="button"
            className={styles.purchaseRetailer}
            disabled
            aria-disabled="true"
          >
            <span>Purchase link coming soon</span>
            <span>↗</span>
          </button>

          <p className={styles.purchaseNote}>Publisher: Notion Press</p>

          <a
            className={styles.textLink}
            href="#book"
            onClick={(e) => handleScrollTo(e, '#book')}
          >
            <span>Explore the book</span>
            <span className={styles.arrowUp}>↑</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
