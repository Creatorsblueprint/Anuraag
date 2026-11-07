import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import { trackBookPurchaseClick, trackModalOpen } from '../utils/analytics';
import EbookModal from '../Ebook/EbookModal';
import DigitalCheckoutModal from './DigitalCheckoutModal';
import styles from './Contact.module.css';

// Regional Amazon listings catalog
const AMAZON_REGIONS = [
  {
    id: 'ae',
    name: 'UAE',
    flag: '🇦🇪',
    tag: 'UAE STORE',
    paperbackUrl: 'https://www.amazon.ae/dp/B0HNX3XY1K',
    hardcoverUrl: 'https://www.amazon.ae/dp/B0HNWYYM74/'
  },
  {
    id: 'sa',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    tag: 'KSA STORE',
    paperbackUrl: 'https://www.amazon.sa/-/en/dp/B0HNX3XY1K/',
    hardcoverUrl: 'https://www.amazon.sa/-/en/dp/B0HNWYYM74/'
  },
  {
    id: 'in',
    name: 'India',
    flag: '🇮🇳',
    tag: 'AMAZON PRIME',
    paperbackUrl: 'https://www.amazon.in/dp/B0HNX3XY1K/',
    hardcoverUrl: 'https://www.amazon.in/dp/B0HNWYYM74/'
  },
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    tag: 'USA STORE',
    paperbackUrl: 'https://www.amazon.com/You-Will-Not-Fly-Grounded/dp/B0HNX3XY1K/',
    hardcoverUrl: 'https://www.amazon.com/You-Will-Not-Fly-Grounded/dp/B0HNWYYM74/'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    tag: 'UK STORE',
    paperbackUrl: 'https://www.amazon.co.uk/dp/B0HNX3XY1K/',
    hardcoverUrl: 'https://www.amazon.co.uk/dp/B0HNWYYM74/'
  },
  {
    id: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    tag: 'CANADA STORE',
    paperbackUrl: 'https://www.amazon.ca/You-Will-Not-Fly-Grounded/dp/B0HNX3XY1K/',
    hardcoverUrl: 'https://www.amazon.ca/You-Will-Not-Fly-Grounded/dp/B0HNWYYM74/'
  },
  {
    id: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    tag: 'AUSTRALIA STORE',
    paperbackUrl: 'https://www.amazon.com.au/You-Will-Not-Fly-Grounded/dp/B0HNX3XY1K/',
    hardcoverUrl: 'https://www.amazon.com.au/You-Will-Not-Fly-Grounded/dp/B0HNWYYM74/'
  }
];

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Amazon Hub interactive states
  const [selectedRegionId, setSelectedRegionId] = useState('ae');
  const [selectedFormat, setSelectedFormat] = useState('paperback'); // 'paperback' | 'hardcover'

  const currentRegion =
    AMAZON_REGIONS.find((r) => r.id === selectedRegionId) || AMAZON_REGIONS[0];
  const currentAmazonUrl =
    selectedFormat === 'hardcover' ? currentRegion.hardcoverUrl : currentRegion.paperbackUrl;
  const currentFormatTitle =
    selectedFormat === 'hardcover' ? 'Collector’s Hardcover' : 'Reader’s Paperback';

  // Check if testing locally on localhost or development server
  const isLocalhost =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      Boolean(import.meta.env?.DEV));

  const standardRetailers = [
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
      id: 'flipkart-edition',
      platform: 'Flipkart',
      tag: 'PAN-INDIA',
      edition: 'Reader’s Paperback',
      format: 'Paperback Edition',
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
            Collector’s Hardcover and Field Paperback available worldwide across verified global retailers. Choose your preferred regional store below.
          </p>
        </motion.div>

        <p className={styles.mobileSwipeHint}>Swipe editions horizontally &rarr;</p>

        {/* Edition Cards Grid */}
        <motion.div
          className={styles.retailerGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* 1. Amazon Global Multi-Region Selector Hub Card */}
          <motion.div className={`${styles.retailerCard} ${styles.amazonHubCard}`} variants={fadeInUp}>
            <div className={styles.cardTop}>
              <div className={styles.platformBadge}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M15.93 17.09c-2.77 2.05-6.8 3.16-10.3 3.16-4.9 0-9.3-1.87-12.63-5-.26-.25-.03-.59.28-.4 3.6 2.1 8 3.36 12.56 3.36 3.1 0 6.55-.7 9.69-2.18.47-.23.86.32.4.67zM16.92 15.6c-.35-.45-2.34-.21-3.23-.1-.27.03-.31-.2-.07-.37 1.54-1.12 4.07-.8 4.38-.4.32.42-.08 2.97-1.53 4.22-.22.19-.44.09-.34-.16.32-.82.97-2.94.79-3.19z" />
                </svg>
                <span>Amazon Global</span>
              </div>
              <span className={styles.editionTag}>{currentRegion.tag}</span>
            </div>

            <h3 className={styles.editionName}>Amazon Regional Stores</h3>
            <p className={styles.formatLabel}>7 Regional Marketplaces · Direct Dispatch</p>
            <p className={styles.cardDesc}>
              Select your country to order directly from your regional Amazon store with Prime delivery, doorstep tracking, and local currency checkout.
            </p>

            {/* Region Selector Pills */}
            <div className={styles.selectorBlock}>
              <label className={styles.selectorLabel}>Select Your Region:</label>
              <div className={styles.regionPills}>
                {AMAZON_REGIONS.map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    onClick={() => setSelectedRegionId(region.id)}
                    className={`${styles.regionPill} ${selectedRegionId === region.id ? styles.regionPillActive : ''}`}
                    title={`Amazon ${region.name}`}
                  >
                    <span className={styles.flagIcon}>{region.flag}</span>
                    <span>{region.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Format Toggle (Paperback vs Hardcover) */}
            <div className={styles.selectorBlock}>
              <label className={styles.selectorLabel}>Choose Format:</label>
              <div className={styles.formatToggleGroup}>
                <button
                  type="button"
                  onClick={() => setSelectedFormat('paperback')}
                  className={`${styles.formatToggleBtn} ${selectedFormat === 'paperback' ? styles.formatToggleBtnActive : ''}`}
                >
                  <span className={styles.formatRadio}>{selectedFormat === 'paperback' ? '●' : '○'}</span>
                  <span>Paperback Edition</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFormat('hardcover')}
                  className={`${styles.formatToggleBtn} ${selectedFormat === 'hardcover' ? styles.formatToggleBtnActive : ''}`}
                >
                  <span className={styles.formatRadio}>{selectedFormat === 'hardcover' ? '●' : '○'}</span>
                  <span>Hardcover Edition</span>
                </button>
              </div>
            </div>

            <ul className={styles.featuresList}>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Official listing on Amazon {currentRegion.name}</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>{selectedFormat === 'hardcover' ? 'Premium cloth-bound hardcover' : 'Portable reader’s field manual format'}</span>
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span>
                <span>Prime eligibility &amp; local buyer protection</span>
              </li>
            </ul>

            <a
              href={currentAmazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.orderButton}
              onClick={() => {
                trackBookPurchaseClick({
                  retailer: `Amazon ${currentRegion.name}`,
                  edition: currentFormatTitle,
                  format: selectedFormat === 'hardcover' ? 'Hardcover Edition' : 'Paperback Edition',
                  url: currentAmazonUrl
                });
              }}
            >
              <span>Order on Amazon {currentRegion.name}</span>
              <span className={styles.orderArrow}>↗</span>
            </a>
          </motion.div>

          {/* Standard Retailers (Digital Edition, Notion Press, Flipkart) */}
          {standardRetailers.map((item) => (
            <motion.div key={item.id} className={styles.retailerCard} variants={fadeInUp}>
              <div className={styles.cardTop}>
                <div className={styles.platformBadge}>
                  {item.badgeType === 'digital' ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="4" y="2" width="16" height="20" rx="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
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
                      trackModalOpen('digital_checkout');
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
                  onClick={() => {
                    trackBookPurchaseClick({
                      retailer: item.platform,
                      edition: item.edition,
                      format: item.format,
                      url: item.url
                    });
                  }}
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
