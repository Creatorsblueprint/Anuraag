import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import styles from './Contact.module.css';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (val) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(val).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      if (validateEmail(e.target.value)) {
        setEmailError('');
      }
    }
  };

  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setIsSubmitted(true);
  };

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

        {/* Right Column: Purchase Card */}
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

          <form className={styles.orderForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
              <label htmlFor="purchase-email" className={styles.inputLabel}>
                Your Email Address
              </label>
              <input
                id="purchase-email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                className={`${styles.emailInput} ${emailError ? styles.inputError : ''}`}
                autoComplete="email"
              />
              {emailError && (
                <span className={styles.errorText} role="alert">
                  {emailError}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.buyNowBtn}
              disabled
              aria-disabled="true"
              title="Online checkout will be available shortly"
            >
              <span>Buy Now</span>
              <span className={styles.btnArrow}>↗</span>
            </button>

            <span className={styles.disabledNote}>
              Online checkout will be available shortly.
            </span>
          </form>

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
