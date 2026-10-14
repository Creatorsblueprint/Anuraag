import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Lectern.module.css';

export default function Lectern() {
  return (
    <section id="lectern" className={styles.lecternSection}>
      <div className={styles.container}>
        {/* Header Block */}
        <motion.div
          className={styles.headerBlock}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className={styles.dimensionTag}>THE ACADEMIC &amp; AUTHOR DIMENSION</span>
          <h2 className={styles.mainTitle}>Intellectual Architecture &amp; The Lectern</h2>
          <p className={styles.subtitle}>
            Bridging sovereign boardroom realities with world-class academic governance pedagogy.
          </p>
        </motion.div>

        {/* Two Cards */}
        <motion.div
          className={styles.cardsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Card 1: AURAK Faculty */}
          <motion.div className={styles.card} variants={fadeInUp}>
            <div>
              <div className={styles.cardTopRow}>
                <span className={styles.badgePill}>AURAK FACULTY</span>
                <span className={styles.cardMeta}>American University of Ras Al Khaimah</span>
              </div>

              <h3 className={styles.cardTitle}>
                Adjunct Professor of Strategy &amp; Enterprise Governance
              </h3>

              <p className={styles.cardDesc}>
                Leading masterclasses and executive development for sovereign leaders, sovereign wealth
                fund analysts, and next-generation family principals. Lectures focus on asymmetric risk,
                conglomerate diversification, and multi-century family business longevity.
              </p>
            </div>

            <div className={styles.cardFooter}>
              <span className={styles.statusIndicator}>SPRING 2025 EXECUTIVE COHORT ACTIVE</span>
            </div>
          </motion.div>

          {/* Card 2: Research in Sovereign Continuity */}
          <motion.div className={styles.card} variants={fadeInUp}>
            <div>
              <div className={styles.cardTopRow}>
                <span className={styles.badgeCategory}>FOUNDATIONAL THESIS</span>
                <span className={styles.badgePill}>Academic Pedagogy</span>
              </div>

              <h3 className={styles.cardTitle}>
                Research in Sovereign Continuity
              </h3>

              <p className={styles.cardDesc}>
                Through rigorous empirical analysis across GCC and South Asian conglomerates, Dr. Guglaani
                examines institutional entropy—identifying why succession plans collapse under emotional
                friction and how enforceable governance structures insulate dynasty capital.
              </p>
            </div>

            <div className={styles.cardFooter}>
              <a href="#ebook" className={styles.exploreLink}>
                <span>EXPLORE MONOGRAPH CHAPTERS</span>
                <span>&rarr;</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
