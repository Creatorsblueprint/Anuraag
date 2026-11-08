import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Roles.module.css';

export default function Roles() {
  const [activeTab, setActiveTab] = useState('corporate');
  const [isPaused, setIsPaused] = useState(false);

  const tabs = [
    {
      id: 'corporate',
      label: 'Executive & MFO',
      count: '01'
    },
    {
      id: 'academic',
      label: 'Academia & Research',
      count: '02'
    },
    {
      id: 'advisory',
      label: 'Boards & Governance',
      count: '03'
    }
  ];

  // Auto-switch tabs every 4.5 seconds so leadership credentials rotate smoothly
  useEffect(() => {
    if (isPaused) {
      const resumeTimeout = setTimeout(() => {
        setIsPaused(false);
      }, 8000);
      return () => clearTimeout(resumeTimeout);
    }

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, tabs.length]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsPaused(true);
  };

  return (
    <section className={`${styles.rolesSection} ${styles.section} ${styles.wrap}`} id="roles">
      <div className={styles.rolesBackdrop} aria-hidden="true" />
      <p className={styles.eyebrow}>04 · LEADERSHIP &amp; AFFILIATIONS</p>

      <motion.div
        className={styles.rolesGrid}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Left Side: Heading & Portrait in Evening Attire */}
        <motion.div className={styles.rolesPortrait} variants={fadeInUp}>
          <h2>
            A seat at the table.<br />
            <span className={styles.muted}>A responsibility<br />beyond it.</span>
          </h2>

          <figure className={styles.figure}>
            <img
              src="/client_images/dr_anuraag_evening.jpg"
              alt="Dr. Guglaani in formal evening attire"
              loading="lazy"
              width="669"
              height="990"
            />
            <figcaption className={styles.figcaption}>
              <span>ENTERPRISE. STEWARDSHIP. CONTINUITY.</span>
              <b>The longer view.</b>
            </figcaption>
          </figure>
        </motion.div>

        {/* Right Side: Tabbed Leadership Container */}
        <motion.div className={styles.rolesContainer} variants={fadeInUp}>
          {/* Tabs Navigation Bar */}
          <div className={styles.tabNav} role="tablist" aria-label="Leadership categories">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <span className={styles.tabCount}>{tab.count}</span>
                <span className={styles.tabText}>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className={styles.tabContentArea}>
            <AnimatePresence mode="wait">
              {activeTab === 'corporate' && (
                <motion.div
                  key="corporate"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className={styles.tabPane}
                >
                  <div className={styles.roleCard}>
                    <span className={styles.roleCategory}>GROUP CEO &amp; BOARD MEMBER</span>
                    <h3>ADAM Global &amp; ADAM Global Network</h3>
                    <p>Executive leadership and global board governance across ADAM Global and its international network spanning multi-disciplinary professional practices.</p>
                  </div>

                  <div className={styles.roleCard}>
                    <span className={styles.roleCategory}>CHAIRPERSON</span>
                    <h3>Wazir Holdings Multi Family Office</h3>
                    <p>Guiding long-term capital preservation, generational family wealth stewardship, cross-border investments, and legacy planning.</p>
                  </div>

                  <div className={styles.roleCard}>
                    <span className={styles.roleCategory}>BOARD MEMBER</span>
                    <h3>Wazir Advisors UAE</h3>
                    <p>Advising on corporate strategy, enterprise turnaround, intelligent automation, cross-border alliances, and risk management.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'academic' && (
                <motion.div
                  key="academic"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className={styles.tabPane}
                >
                  <div className={styles.roleCard}>
                    <span className={styles.roleCategory}>AMERICAN UNIVERSITY OF RAS AL KHAIMAH (AURAK)</span>
                    <h3>Teaching the Next Generation</h3>
                    <p>Bridging executive boardroom realities with rigorous academic theory across graduate and MBA curricula.</p>
                    
                    <div className={styles.academicGrid}>
                      <div className={styles.academicPill}>
                        <span className={styles.pillIcon}>✦</span>
                        <span>Adjunct Professor of Service Marketing</span>
                      </div>
                      <div className={styles.academicPill}>
                        <span className={styles.pillIcon}>✦</span>
                        <span>Adjunct Professor of Data Analytics</span>
                      </div>
                      <div className={styles.academicPill}>
                        <span className={styles.pillIcon}>✦</span>
                        <span>Adjunct Professor of Entrepreneurship</span>
                      </div>
                      <div className={styles.academicPill}>
                        <span className={styles.pillIcon}>✦</span>
                        <span>Adjunct Professor of International Business (MBA)</span>
                      </div>
                      <div className={styles.academicPill}>
                        <span className={styles.pillIcon}>✦</span>
                        <span>Chair of the KITE Advisory Board</span>
                      </div>
                      <div className={styles.academicPill}>
                        <span className={styles.pillIcon}>✦</span>
                        <span>Member of the Business Advisory Council</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'advisory' && (
                <motion.div
                  key="advisory"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className={styles.tabPane}
                >
                  <div className={styles.roleCard}>
                    <span className={styles.roleCategory}>FAMILY ENTERPRISE &amp; GOVERNANCE</span>
                    <h3>Senior Board &amp; Advisory Mandates</h3>
                    <p>
                      Trusted advisor to multiple prominent family conglomerates across the MEASA region,
                      providing strategic direction for inter-generational transitions, family constitutions,
                      and corporate governance structures.
                    </p>
                  </div>

                  <div className={styles.roleCard}>
                    <span className={styles.roleCategory}>GLOBAL BODIES &amp; YOUTH EMPOWERMENT</span>
                    <h3>Civic &amp; Entrepreneurial Alliances</h3>
                    <p>
                      Active roles with the Pan African Leadership and Entrepreneurship Development Corporation,
                      World Youth Forum, and IBI Union, championing economic development and young founders.
                    </p>
                  </div>

                  <div className={styles.roleCard}>
                    <span className={styles.roleCategory}>VENTURE ECOSYSTEM</span>
                    <h3>Investing in What Comes Next</h3>
                    <p>
                      Co-founder of two technology startups, active angel investor, and dedicated mentor to high-potential MSMEs navigating scale.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
