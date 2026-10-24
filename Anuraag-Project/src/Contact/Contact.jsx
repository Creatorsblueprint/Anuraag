import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import EbookModal from '../Ebook/EbookModal';
import DigitalCheckoutModal from './DigitalCheckoutModal';
import styles from './Contact.module.css';

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Check if testing locally on localhost or development server
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      Boolean(import.meta.env?.DEV));

  const retailers = [
    {
      id: 'digital-edition',
      platform: 'Digital Edition',
      tag: isLocalhost ? 'INSTANT ACCESS' : 'COMING SOON',
      edition: 'Digital E-Book & PDF',
      format: 'Interactive Digital Format',
      desc: isLocalhost
        ? 'Immediate digital access to the complete book, framework diagrams, and personal reflection guides across all devices.'
        : 'Online purchase details are coming soon. The purchase section will provide the retailer link when it becomes available.',
      features: ['Instant Digital Delivery', 'High-Res PDF & E-Book Format', 'Mobile, Tablet & Desktop'],
      url: '#',
      ctaText: isLocalhost ? 'Access Digital Edition' : 'Coming Soon',
      badgeType: 'digital',
      isDigital: true,
      isDisabled: !isLocalhost
    },
    {
      id: 'notion-press-hardcover',
      platform: 'Notion Press',
      tag: 'DIRECT PUBLISHER',
      edition: 'Collector’s Hardcover',
      format: 'Hardcover Edition',
      desc: 'Official direct publisher copy. Premium case laminate hardcover printed and dispatched directly from Notion Press.',
      features: ['Official Publisher Direct', "Collector's Hardcover", 'Ships Pan-India & Globally'],
      url: 'https://notionpress.com/in/read/you-will-not-fly-hardcover/hardcover',
      ctaText: 'Order on Notion Press',
      badgeType: 'notion',
      isDigital: false
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
      badgeType: 'amazon',
      isDigital: false
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
      badgeType: 'amazon',
      isDigital: false
    },
    {
      id: 'amazon-uk',
      platform: 'Amazon UK',
      tag: 'INTERNATIONAL',
      edition: 'Collector’s Hardcover',
      format: 'UK & International Delivery',
      desc: 'Now officially available across the United Kingdom and Europe with direct Amazon dispatch and verified customer delivery.',
      features: ['Amazon UK Dispatch', 'Official International Listing', 'Hardcover Edition'],
      url: 'https://www.amazon.co.uk/dp/B0HNX3XY1K/',
      ctaText: 'Order on Amazon UK',
      badgeType: 'amazon',
      isDigital: false
    },
    {
      id: 'flipkart-edition',
      platform: 'Flipkart',
      tag: 'PAN-INDIA',
      edition: 'Official Edition',
      format: 'Paperback & Hardcover',
      desc: 'Order directly via Flipkart across India with verified merchant guarantee, secure checkout, and doorstep delivery.',
      features: ['Flipkart Verified', 'Fast Doorstep Delivery', 'Pan-India Availability'],
      url: 'https://www.flipkart.com/you-not-fly/p/itm828ed247457a7?pid=9798907632547',
      ctaText: 'Order on Flipkart',
      badgeType: 'flipkart',
      isDigital: false
    }
  ];

  return (
    <section className={`${styles.contactSection} ${styles.purchaseSection} ${styles.section}`} id="purchase">
      {/* Anchor alias for #contact and #order */}
      <div id="contact" style={{ position: 'absolute', top: 0 }} />
      <div id="order" style={{ position: 'absolute', top: 0 }} />

      <div className={styles.wrap}>
        {/* Section Header */}
        <motion.div
          className={styles.sectionHeader}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className={styles.eyebrow}>07 · YOUR NEXT CHAPTER</p>
          <h2 className={styles.heading}>
            Choose your edition <span className={styles.goldText}>&amp; retailer.</span>
          </h2>
          <p className={styles.subtitle}>
            Collector’s Hardcover and Field Paperback available now across verified global retailers. Digital edition coming soon.
          </p>
        </motion.div>

        <p className={styles.mobileSwipeHint}>Swipe editions horizontally &rarr;</p>

        {/* Edition Cards Grid / Horizontal Carousel */}
        <motion.div
          className={styles.retailerGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {retailers.map((item) => (
            <motion.div key={item.id} className={styles.retailerCard} variants={fadeInUp}>
              <div className={styles.cardTop}>
                <div className={styles.platformBadge}>
                  {item.badgeType === 'digital' ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                  ) : item.badgeType === 'amazon' ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M15.93 17.09c-2.77 2.05-6.8 3.16-10.3 3.16-4.9 0-9.3-1.87-12.63-5-.26-.25-.03-.59.28-.4 3.6 2.1 8 3.36 12.56 3.36 3.1 0 6.55-.7 9.69-2.18.47-.23.86.32.4.67zM16.92 15.6c-.35-.45-2.34-.21-3.23-.1-.27.03-.31-.2-.07-.37 1.54-1.12 4.07-.8 4.38-.4.32.42-.08 2.97-1.53 4.22-.22.19-.44.09-.34-.16.32-.82.97-2.94.79-3.19z" />
                    </svg>
                  ) : item.badgeType === 'flipkart' ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
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

              <h3 className={styles.editionName}>{item.edition}</h3>
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

              {item.isDigital ? (
                <button
                  type="button"
                  onClick={() => {
                    if (!item.isDisabled) {
                      setIsCheckoutOpen(true);
                    }
                  }}
                  disabled={item.isDisabled}
                  aria-disabled={item.isDisabled}
                  className={`${styles.orderButton} ${item.isDisabled ? styles.disabledButton : ''}`}
                >
                  <span>{item.ctaText}</span>
                  <span className={styles.orderArrow}>{item.isDisabled ? '🔒' : '📖'}</span>
                </button>
              ) : (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.orderButton}
                >
                  <span>{item.ctaText}</span>
                  <span className={styles.orderArrow}>↗</span>
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Personal Sign-off */}
        <motion.div
          className={styles.purchaseFooterNote}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className={styles.contactSignature}>
            <img
              src="/client_images/dr_anuraag_portrait.png"
              loading="lazy"
              alt="Dr. Anuraag Guglaani portrait"
              width="54"
              height="54"
            />
            <div className={styles.signatureText}>
              <small>DR. ANURAAG GUGLAANI · THE FAMILY BUSINESS DOCTOR</small>
              <strong>For everything you choose to build next.</strong>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Digital Sample / PDF Reader Modal */}
      <EbookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Digital Stripe Checkout Modal */}
      <DigitalCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </section>
  );
}
