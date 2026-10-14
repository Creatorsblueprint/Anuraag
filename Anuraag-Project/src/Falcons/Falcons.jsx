import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn, staggerContainer } from '../animations';
import styles from './Falcons.module.css';

export default function Falcons() {
  return (
    <section id="falcons" className={styles.falconsSection}>
      <div className={styles.container}>
        {/* Left Column */}
        <motion.div
          className={styles.leftCol}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span className={styles.stageTag} variants={fadeInUp}>
            UAE'S TELEVISED BUSINESS STAGE
          </motion.span>

          <motion.h2 className={styles.mainTitle} variants={fadeInUp}>
            Falcons of Majlis
          </motion.h2>

          <motion.p className={styles.quoteSubtitle} variants={fadeInUp}>
            "We don't merely invest checks; we engineer sovereign distribution and generational endurance."
          </motion.p>

          <motion.p className={styles.description} variants={fadeInUp}>
            As a key institutional Falcon on UAE's premier television series, Dr. Anuraag Guglaani
            commands the investor panel alongside global icon Suniel Shetty and prominent GCC royal
            family dignitaries. The series spotlights high-velocity tech, industrial manufacturing,
            and AI enterprises seeking rapid GCC sovereign adoption.
          </motion.p>

          {/* Two Screening / Syndication Cards */}
          <motion.div className={styles.cardsGrid} variants={fadeInUp}>
            <div className={styles.featureCard}>
              <div className={styles.cardCategory}>FALCON SCREENING FILTER</div>
              <h3 className={styles.cardTitle}>Unit Economics &amp; Moat</h3>
              <p className={styles.cardText}>
                Founders with defensive balance sheets and tangible GCC operational viability.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.cardCategory}>SOVEREIGN SYNDICATION</div>
              <h3 className={styles.cardTitle}>Institutional Scale</h3>
              <p className={styles.cardText}>
                Connecting breakout ventures directly into GCC royal family networks and sovereign funds.
              </p>
            </div>
          </motion.div>

          {/* Status and Submission link */}
          {/* <motion.div className={styles.statusRow} variants={fadeIn}>
            <span className={styles.pulseDot} />
            <span className={styles.statusText}>SEASON BROADCAST STREAMING ACROSS MENA</span>
          </motion.div>

          <motion.a href="#contact" className={styles.submitLink} variants={fadeIn}>
            SUBMIT VENTURE FOR FALCON SCREENING &rarr;
          </motion.a> */}
        </motion.div>

        {/* Right Column: Series Dossier */}
        <motion.div
          className={styles.rightCol}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={styles.dossierCard}>
            <div className={styles.dossierHeader}>
              <div className={styles.dossierSubtitle}>OFFICIAL SERIES DOSSIER</div>
              <h3 className={styles.dossierTitle}>Dr. Anuraag Guglaani &amp; Co-Falcons</h3>
            </div>

            <div className={styles.dossierList}>
              {/* Item 1 */}
              <div className={styles.dossierItem}>
                <div className={styles.itemIconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                    <line x1="8" x2="16" y1="21" y2="21" />
                    <line x1="12" x2="12" y1="17" y2="21" />
                  </svg>
                </div>
                <div className={styles.itemContent}>
                  <h4 className={styles.itemHeading}>The Co-Falcon Majlis</h4>
                  <p className={styles.itemText}>
                    Collaborative term sheet deployment with Suniel Shetty and Middle East industrial heads,
                    transforming regional consumer tech.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className={styles.dossierItem}>
                <div className={styles.itemIconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className={styles.itemContent}>
                  <h4 className={styles.itemHeading}>The "Doctor's" Crucible</h4>
                  <p className={styles.itemText}>
                    Unforgiving scrutiny on cap-table cleanliness, board composition, and sustainable enterprise
                    governance before a single dirham is deployed.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className={styles.dossierItem}>
                <div className={styles.itemIconWrapper}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="18" r="3" />
                    <path d="M8.59 15.51 10.42 12" />
                    <path d="m13.58 12 1.83 3.51" />
                  </svg>
                </div>
                <div className={styles.itemContent}>
                  <h4 className={styles.itemHeading}>Post-Show Accelerator</h4>
                  <p className={styles.itemText}>
                    Portfolio founders enter Wazir Holdings' institutional advisory corridors, securing
                    fast-track ADGM and DIFC capitalization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Under-card Stats */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>AED 75M+</span>
              <span className={styles.statLabel}>SYNDICATE POWER</span>
            </div>

            <div className={styles.statItem}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>FOUNDERS VETTED</span>
            </div>

            <div className={styles.statItem}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>GCC INTEGRATION</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
