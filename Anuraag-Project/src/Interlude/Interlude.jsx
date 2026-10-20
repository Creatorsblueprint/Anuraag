import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import styles from './Interlude.module.css';

export default function Interlude() {
  return (
    <section className={styles.flightInterlude} aria-label="A story of reinvention">
      <img
        className={styles.sceneImage}
        src="/client_images/jet_climbing_contrails.jpg"
        alt="A jet climbing through the sky with twin contrails"
        loading="lazy"
      />
      <div className={styles.sceneOverlay} />

      <div className={`${styles.wrap} ${styles.flightCopy}`}>
        <motion.p
          className={styles.eyebrow}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          A VERDICT IS NOT A DESTINY.
        </motion.p>

        <motion.p
          className={styles.flightTitle}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Some journeys begin<br />
          where the <span>runway ends.</span>
        </motion.p>

        <motion.div
          className={styles.flightFooter}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span>GROUNDED AT TWENTY.</span>
          <div className={styles.flightLine}>
            <span />
          </div>
          <span>AIRBORNE EVER SINCE.</span>
        </motion.div>
      </div>
    </section>
  );
}
