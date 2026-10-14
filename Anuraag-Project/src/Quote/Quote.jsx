import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Quote.module.css';

export default function Quote() {
  return (
    <section className={styles.quoteSection}>
      <div className={styles.container}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className={styles.quoteMark} variants={fadeInUp}>
            99
          </motion.div>

          <motion.blockquote className={styles.quoteText} variants={fadeInUp}>
            "When our family conglomerate faced a paralyzing succession impasse across four
            jurisdictions, Dr. Guglaani walked into our Majlis not as an abstract theorist,
            but as a sovereign surgeon. Within ninety days, twenty years of unspoken discord
            was converted into an unshakeable institutional charter."
          </motion.blockquote>

          <motion.div className={styles.attribution} variants={fadeInUp}>
            <span className={styles.authorName}>
              H.E. CONFIDENTIAL ENTERPRISE PATRIARCH
            </span>
            <span className={styles.authorRole}>
              MULTI-BILLION GCC CONGLOMERATE PRINCIPAL · ABU DHABI
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
