import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerFast } from '../animations';
import styles from './Affiliations.module.css';

export default function Affiliations() {
  return (
    <section className={styles.affiliationsSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionLabel}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          SELECTED AFFILIATIONS & MEDIA COMMENTARY
        </motion.div>

        <motion.div
          className={styles.logoTrack}
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={styles.logoItem}>
            <span className={styles.brandBloomberg}>Bloomberg</span>
          </div>

          <div className={styles.logoItem}>
            <span className={styles.brandForbes}>
              Forbes<span>ME</span>
            </span>
          </div>

          <div className={styles.logoItem}>
            <span className={styles.brandArabian}>Arabian Business</span>
          </div>

          <div className={styles.logoItem}>
            <span className={styles.brandAurak}>AURAK</span>
          </div>

          <div className={styles.logoItem}>
            <span className={styles.brandWazirHoldings}>Wazir Holdings</span>
          </div>

          <div className={styles.logoItem}>
            <span className={styles.brandWazirAdvisors}>Wazir Advisors</span>
          </div>

          <div className={styles.logoItem}>
            <span className={styles.brandAdam}>ADAM Global</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
