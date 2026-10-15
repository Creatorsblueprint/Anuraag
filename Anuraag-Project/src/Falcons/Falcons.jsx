import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Falcons.module.css';

export default function Falcons() {
  return (
    <section id="falcons" className={styles.falconsSection}>
      <div className={styles.container}>
        {/* Main Content: Left text & narrative, Right image */}
        <motion.div
          className={styles.mainGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column: All Text & Editorial Narrative */}
          <motion.div className={styles.leftCol} variants={fadeInUp}>
            <span className={styles.stageTag}>UAE TELEVISED VENTURE SHOWCASE</span>
            <h2 className={styles.mainTitle}>Falcons of Majlis</h2>

            <p className={styles.leadText}>
              Commanding the investor panel on UAE’s landmark business broadcast alongside global icon
              Suniel Shetty and leading GCC dignitaries—championing high-growth enterprise, frontier
              technology, and sovereign market integration.
            </p>

            <blockquote className={styles.quoteAxiom}>
              "We don't merely invest checks; we engineer sovereign distribution and generational endurance."
            </blockquote>

            <p className={styles.bodyText}>
              Evaluating founders with disciplined balance sheets, defensible unit economics, and scalable
              operational architecture primed for multi-region Middle East expansion.
            </p>
          </motion.div>

          {/* Right Column: Full-Height Clean Visual Showcase */}
          <motion.div className={styles.rightCol} variants={fadeInUp}>
            <div className={styles.imageCard}>
              <img
                src="/Images/image_3.jpg"
                alt="Dr. Anuraag Guglaani — Television Investor, Falcons of Majlis"
                className={styles.showcaseImg}
              />
              <div className={styles.imageCaption}>
                <span className={styles.captionTag}>Television Investor · UAE</span>
                <span className={styles.captionTitle}>Falcons of Majlis</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Minimal Metrics Row Below */}
        <motion.div
          className={styles.statsRow}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
