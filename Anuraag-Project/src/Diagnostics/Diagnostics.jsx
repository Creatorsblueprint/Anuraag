import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Diagnostics.module.css';

export default function Diagnostics() {
  const diagnosticsData = [
    {
      number: '01',
      title: 'Charter Audit',
      description: 'Evaluating legal, psychological, and fiduciary fault lines in existing family constitutions.'
    },
    {
      number: '02',
      title: 'Majlis Mediation',
      description: 'Private, confidential conclaves navigating high-stakes generational transfer and asset carve-outs.'
    },
    {
      number: '03',
      title: 'Board Reformation',
      description: 'Transitioning informal family dinner conversations into high-discipline fiduciary boards of directors.'
    },
    {
      number: '04',
      title: 'Venture Syndication',
      description: 'Aligning legacy capital with breakthrough frontier technology and televised venture pipelines.'
    }
  ];

  return (
    <section id="pillars" className={styles.diagnosticsSection}>
      <div className={styles.container}>
        {/* Header Block */}
        <motion.div
          className={styles.headerBlock}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <span className={styles.arsenalTag}>STRATEGIC ARSENAL</span>
          <h2 className={styles.mainTitle}>The Doctor's Diagnostics</h2>
          <p className={styles.subtitle}>
            Proprietary governance frameworks engineered over three decades of in-situ resolution.
          </p>
        </motion.div>

        {/* 4 Cards */}
        <motion.div
          className={styles.cardsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {diagnosticsData.map((item) => (
            <motion.div key={item.number} className={styles.card} variants={fadeInUp}>
              <span className={styles.cardNumber}>{item.number}</span>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
