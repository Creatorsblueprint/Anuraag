import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
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

  const retailers = [
    {
      id: 'notion-press-hardcover',
      platform: 'Notion Press Store',
      tag: 'DIRECT PUBLISHER',
      edition: 'Collector’s Hardcover',
      format: 'Hardcover Edition',
      desc: 'Official direct publisher copy. Premium case laminate hardcover printed and dispatched directly from Notion Press.',
      features: ['Official Publisher Direct', "Collector's Hardcover", 'Ships Pan-India & Globally'],
      url: 'https://notionpress.com/in/read/you-will-not-fly-hardcover/hardcover',
      ctaText: 'Order on Notion Press',
      badgeType: 'notion'
    },
    {
      id: 'amazon-hardcover',
      platform: 'Amazon India',
      tag: 'AMAZON PRIME',
      edition: 'Premium Hardcover',
      format: 'Hardcover Edition',
      desc: 'Premium cloth-bound hardcover edition with fast doorstep delivery via Amazon Prime and customer protection.',
      features: ['Amazon Prime Delivery', 'Premium Hardcover Binding', 'Verified Guarantee'],
      url: 'https://www.amazon.in/dp/B0HNX3XY1K/',
      ctaText: 'Order on Amazon',
      badgeType: 'amazon'
    },
    {
      id: 'amazon-paperback',
      platform: 'Amazon India',
      tag: 'FIELD MANUAL',
      edition: 'Reader’s Paperback',
      format: 'Paperback Edition',
      desc: 'The complete operating system in an accessible, lightweight field manual format for daily reading and notes.',
      features: ['Lightweight & Portable', 'Fast Prime Delivery', 'Complete Operating System'],
      url: 'https://www.amazon.in/dp/B0HNWYYM74/',
      ctaText: 'Order on Amazon',
      badgeType: 'amazon'
    }
  ];

  return (
    <section className={`${styles.contactSection} ${styles.purchaseSection} ${styles.section}`} id="purchase">
      {/* Anchor alias for #contact and #order */}
      <div id="contact" style={{ position: 'absolute', top: 0 }} />
      <div id="order" style={{ position: 'absolute', top: 0 }} />

      <div className={styles.wrap}>
        {/* Top Split: Author Narrative & Book Specs */}
        <motion.div
          className={styles.purchaseTopGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Left Column: Author Narrative & Signature */}
          <motion.div className={styles.purchaseLeft} variants={fadeInUp}>
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

          {/* Right Column: Book Overview Card */}
          <motion.div className={styles.purchaseCard} variants={fadeInUp}>
            <span className={styles.purchaseOverline}>THE NEW BOOK</span>
            <h3>You Will Not Fly</h3>
            <p className={styles.purchaseSubtitle}>
              One operating system.<br />
              Four connected dimensions.
            </p>
            <p className={styles.purchaseAvailability}>
              Official editions available now across direct publisher and verified retailers.
            </p>

            <div className={styles.quickSpecs}>
              <div className={styles.specItem}>
                <small>AUTHOR</small>
                <strong>Dr. Anuraag Guglaani</strong>
              </div>
              <div className={styles.specItem}>
                <small>PUBLISHER</small>
                <strong>Notion Press</strong>
              </div>
              <div className={styles.specItem}>
                <small>EDITIONS</small>
                <strong>Hardcover &amp; Paperback</strong>
              </div>
            </div>

            <a
              className={styles.textLink}
              href="#book"
              onClick={(e) => handleScrollTo(e, '#book')}
            >
              <span>Explore 3D cover &amp; chapters</span>
              <span className={styles.arrowUp}>↑</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Where to Buy Physical Copies - Horizontal Showcase */}
        <motion.div
          className={styles.retailerSection}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className={styles.retailerHeader}>
            <div>
              <span className={styles.retailerEyebrow}>WHERE TO BUY PHYSICAL COPIES</span>
              <h3 className={styles.retailerTitle}>Choose your edition &amp; retailer.</h3>
            </div>
            <p className={styles.retailerSubtitle}>
              Available in Collector’s Hardcover and Field Paperback with verified shipping across India and worldwide.
            </p>
          </div>

          <p className={styles.mobileSwipeHint}>Swipe editions horizontally &rarr;</p>

          <div className={styles.retailerGrid}>
            {retailers.map((item) => (
              <div key={item.id} className={styles.retailerCard}>
                <div className={styles.cardTop}>
                  <div className={styles.platformBadge}>
                    {item.badgeType === 'amazon' ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M15.93 17.09c-2.77 2.05-6.8 3.16-10.3 3.16-4.9 0-9.3-1.87-12.63-5-.26-.25-.03-.59.28-.4 3.6 2.1 8 3.36 12.56 3.36 3.1 0 6.55-.7 9.69-2.18.47-.23.86.32.4.67zM16.92 15.6c-.35-.45-2.34-.21-3.23-.1-.27.03-.31-.2-.07-.37 1.54-1.12 4.07-.8 4.38-.4.32.42-.08 2.97-1.53 4.22-.22.19-.44.09-.34-.16.32-.82.97-2.94.79-3.19z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                      </svg>
                    )}
                    <span>{item.platform}</span>
                  </div>
                  <span className={styles.editionTag}>{item.tag}</span>
                </div>

                <h4 className={styles.editionName}>{item.edition}</h4>
                <p className={styles.formatLabel}>{item.format}</p>
                <p className={styles.cardDesc}>{item.desc}</p>

                <ul className={styles.featuresList}>
                  {item.features.map((f, i) => (
                    <li key={i}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.orderButton}
                >
                  <span>{item.ctaText}</span>
                  <span className={styles.orderArrow}>↗</span>
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
