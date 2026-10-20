import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Diagnostics.module.css';

export default function Diagnostics() {
  const systemPillars = [
    {
      verb: 'DECIDE',
      number: '01',
      title: 'Decision Rights',
      principle: 'Decisions belong closest to the problem.',
      description: 'Moving critical operational calls out of bottleneck founder desks to the operators who bear the consequences.'
    },
    {
      verb: 'SEE',
      number: '02',
      title: 'Cash Visibility',
      principle: 'A cash crisis is usually a governance crisis.',
      description: 'Engineering non-negotiable leading indicators and radical liquidity clarity before capital turns into crisis.'
    },
    {
      verb: 'BUILD',
      number: '03',
      title: 'System Capability',
      principle: 'Founders cannot scale by being the answer to every question.',
      description: 'Instituting resilient operational muscles so organizational execution never rests on a single charismatic individual.'
    },
    {
      verb: 'ANTICIPATE',
      number: '04',
      title: 'Foresight & Signals',
      principle: 'Lagging indicators tell you who died. Leading indicators keep you alive.',
      description: 'Designing asymmetric market scanning and early warning triggers across multigenerational industry disruption.'
    },
    {
      verb: 'ALIGN',
      number: '05',
      title: 'Family Trust & Living Room',
      principle: 'Agreement before structure. People before charts.',
      description: 'Harmonizing deep human friction, succession identities, and equity before codifying sterile legal charters.'
    },
    {
      verb: 'ENDURE',
      number: '06',
      title: 'Generational Stewardship',
      principle: 'Build something strong enough to run after you leave the room.',
      description: 'The ultimate legacy test: establishing fiduciary governance where sovereign capital compounds beyond generation three.'
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
          <span className={styles.arsenalTag}>THE MIDNIGHT LIST · 6 FOUNDATIONAL VERBS</span>
          <h2 className={styles.mainTitle}>The Tested Operating System</h2>
          <p className={styles.subtitle}>
            Born the night an NDA flight career closed. Tested across 26 industries, 35 countries,
            boardrooms, and family dining tables.
          </p>
        </motion.div>

        {/* 6 Verbs System Grid */}
        <motion.div
          className={styles.cardsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {systemPillars.map((item) => (
            <motion.div key={item.number} className={styles.card} variants={fadeInUp}>
              <div className={styles.cardHeader}>
                <span className={styles.verbBadge}>{item.verb}</span>
                <span className={styles.cardNumber}>{item.number}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardPrinciple}>&ldquo;{item.principle}&rdquo;</p>
              <p className={styles.cardText}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
