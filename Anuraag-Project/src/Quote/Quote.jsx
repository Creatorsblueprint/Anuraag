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
            ”
          </motion.div>

          <motion.blockquote className={styles.quoteText} variants={fadeInUp}>
            &ldquo;A Verdict is not a Destiny. A Title is a Noun. What you can do is a Verb.&rdquo;
          </motion.blockquote>

          <motion.div className={styles.attribution} variants={fadeInUp}>
            <span className={styles.authorName}>
              DR. ANURAAG GUGLAANI
            </span>
            <span className={styles.authorRole}>
              THE DEFINING AXIOM OF &lsquo;YOU WILL NOT FLY&rsquo; · FOUNDATION OF THE 6-VERB OPERATING SYSTEM
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
