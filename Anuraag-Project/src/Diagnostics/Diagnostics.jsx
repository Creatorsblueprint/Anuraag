import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Diagnostics.module.css';

export default function Diagnostics() {
  const [activeIndex, setActiveIndex] = useState(0);

  const expertiseItems = [
    {
      num: '01',
      title: 'Family business & governance',
      displayTitle: (
        <>
          Family business<br />& governance
        </>
      ),
      description:
        'Business transformation, succession-minded leadership, strategic decisions and the continuity of family enterprise.'
    },
    {
      num: '02',
      title: 'Investment & entrepreneurship',
      displayTitle: (
        <>
          Investment &<br />entrepreneurship
        </>
      ),
      description:
        'Multi-family office leadership, startup investment, MSME mentorship and long-term business value creation.'
    },
    {
      num: '03',
      title: 'Intelligent transformation',
      displayTitle: (
        <>
          Intelligent<br />transformation
        </>
      ),
      description:
        'AI, automation, technology governance, risk and enterprise solutions, informed by the A2G Framework.'
    },
    {
      num: '04',
      title: 'Markets & expansion',
      displayTitle: (
        <>
          Markets &<br />expansion
        </>
      ),
      description:
        'International operations, strategic alliances and growth across the Middle East, Africa, South Asia and North America.'
    },
    {
      num: '05',
      title: 'Leadership & learning',
      displayTitle: (
        <>
          Leadership &<br />learning
        </>
      ),
      description:
        'Adjunct teaching in Service Marketing, Data Analytics, Entrepreneurship and International Business for MBA at the American University of Ras Al Khaimah.'
    },
    {
      num: '06',
      title: 'Humanitarian impact',
      displayTitle: (
        <>
          Humanitarian<br />impact
        </>
      ),
      description:
        'Women and youth empowerment, entrepreneurial development and initiatives that connect leadership to social contribution.'
    }
  ];

  const currentItem = expertiseItems[activeIndex];

  return (
    <section className={`${styles.expertiseSection} ${styles.section}`} id="expertise">
      {/* Anchor alias for #pillars and #work */}
      <div id="pillars" style={{ position: 'absolute', top: 0 }} />
      <div id="work" style={{ position: 'absolute', top: 0 }} />

      <div className={styles.wrap}>
        <p className={styles.eyebrow}>03 — WHERE PERSPECTIVE BECOMES PRACTICE</p>

        <div className={styles.splitHeading}>
          <h2>
            Build the business.<br />
            <span className={styles.muted}>Protect the legacy.</span>
          </h2>
          <p>
            From the boardroom to the next generation of founders, a connected approach to
            enterprise, investment and people.
          </p>
        </div>

        <div className={styles.expertiseExperience}>
          {/* Left Sticky/Dynamic Visual Canvas */}
          <aside className={styles.expertiseVisual}>
            <div className={styles.networkBackdrop} aria-hidden="true" />
            <div className={styles.networkScan} aria-hidden="true" />
            <div className={styles.architectureShade} />

            <div className={styles.visualTop}>
              <span>THE CONNECTED ENTERPRISE</span>
              <span>01 — 06</span>
            </div>

            <div className={styles.orbitSystem} aria-hidden="true">
              <span className={`${styles.orbit} ${styles.o1}`} />
              <span className={`${styles.orbit} ${styles.o2}`} />
              <span className={`${styles.orbit} ${styles.o3}`} />
              <div className={styles.orbitCore}>
                HUMAN<br />
                <b>JUDGMENT</b>
              </div>
              <span className={`${styles.satellite} ${styles.s1}`}>GOVERNANCE</span>
              <span className={`${styles.satellite} ${styles.s2}`}>INTELLIGENCE</span>
              <span className={`${styles.satellite} ${styles.s3}`}>LEGACY</span>
              <span className={styles.orbitalDot} />
              <span className={styles.orbitTrace} />
            </div>

            <div className={styles.visualBottom}>
              <span className={styles.visualIndex}>{currentItem.num} / 06</span>
              <h3 className={styles.activeTitle}>{currentItem.displayTitle}</h3>
              <div className={styles.visualSteps} aria-hidden="true">
                {expertiseItems.map((_, i) => (
                  <i
                    key={i}
                    className={i === activeIndex ? styles.stepActive : ''}
                    onClick={() => setActiveIndex(i)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Right 6 Pillars Grid */}
          <motion.div
            className={styles.expertiseGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {expertiseItems.map((item, index) => (
              <motion.article
                key={item.num}
                className={`${styles.expertiseItem} ${
                  activeIndex === index ? styles.expertiseItemActive : ''
                }`}
                variants={fadeInUp}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span>{item.num}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
