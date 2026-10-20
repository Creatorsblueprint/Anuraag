import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'Who is You Will Not Fly written for?',
      answer: (
        <p>
          Entrepreneurs, business leaders, family enterprise owners and anyone who has been told they cannot—and must
          decide what happens next. It blends a personal story of reinvention with practical perspectives on business,
          career, family and legacy.
        </p>
      )
    },
    {
      question: 'Where can I buy the book?',
      answer: (
        <>
          <p>Online purchase details are coming soon. The purchase section will provide the retailer link when it becomes available.</p>
          <a href="#purchase" className={styles.textLink}>
            View purchase details ↗
          </a>
        </>
      )
    },
    {
      question: 'Can I view the back cover?',
      answer: (
        <p>
          Yes. Click and hold the book, then drag left or right to rotate it through 360 degrees. On a phone, swipe the
          book horizontally. The Back button also turns it to the original back cover.
        </p>
      )
    },
    {
      question: 'What is the A2G Framework?',
      answer: (
        <p>
          AI to Automation to Governance is the framework developed through his doctoral research. It focuses on
          bringing intelligent systems into family businesses without displacing the human judgment that holds them together.
        </p>
      )
    },
    {
      question: 'Where can I find the complete professional profile?',
      answer: (
        <>
          <p>The downloadable profile includes qualifications, board roles, recognition and regional operating exposure.</p>
          <a href="#story" className={styles.textLink}>
            Open professional profile ↗
          </a>
        </>
      )
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
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
    <section className={`${styles.faqSection} ${styles.section} ${styles.wrap}`} id="faq">
      {/* Left Column */}
      <motion.div
        className={styles.faqSidebar}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <p className={styles.eyebrow}>06 — A FEW THINGS TO KNOW</p>
        <h2>
          Before the<br />
          <span className={styles.muted}>conversation.</span>
        </h2>

        {/* Mini Book Card Link */}
        <a
          className={styles.faqBookVisual}
          href="#book"
          onClick={(e) => handleScrollTo(e, '#book')}
        >
          <span className={styles.faqCover}>
            <img
              src="/client_images/book_cover_thumb.png"
              alt="You Will Not Fly book cover thumbnail"
              loading="lazy"
            />
          </span>
          <span className={styles.cardInfo}>
            <small>A NEW CHAPTER</small>
            <strong>You Will Not Fly</strong>
            <em>Grounded at Twenty. Airborne Ever Since.</em>
            <b>Discover the book ↗</b>
          </span>
        </a>
      </motion.div>

      {/* Right Column: Exact 5 FAQ Accordions */}
      <motion.div
        className={styles.faqList}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <motion.div
              key={faq.question}
              className={`${styles.faqItem} ${isOpen ? styles.itemOpen : ''}`}
              variants={fadeInUp}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className={styles.faqHeader}
                aria-expanded={isOpen}
              >
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.toggleIcon}>{isOpen ? '−' : '+'}</span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className={styles.faqBody}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={styles.answerContent}>{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
