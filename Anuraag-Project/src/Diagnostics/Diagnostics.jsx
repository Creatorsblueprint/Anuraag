import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Diagnostics.module.css';

export default function Diagnostics() {
  const [activeTab, setActiveTab] = useState('governance');
  const [isPaused, setIsPaused] = useState(false);

  const pillars = [
    {
      id: 'governance',
      num: '01',
      tabLabel: 'Family Governance',
      shortTitle: 'Family Enterprise & Governance',
      headline: 'Continuity, succession & multi-generational legacy.',
      desc: 'Guiding founder-led and family-owned enterprises through strategic inflection points, family constitutions, inter-generational succession, and boardroom governance structures.',
      bullets: [
        'Family Constitution & Charter Formulation',
        'Next-Gen Leadership & Succession Planning',
        'Strategic Boardroom Advisory & Dispute Resolution',
        'Continuity of Culture, Capital & Enterprise Values'
      ],
      tag: 'CORE DISCIPLINE',
      quote: '“A business without succession is merely a job with more stakeholders.”'
    },
    {
      id: 'transformation',
      num: '02',
      tabLabel: 'Intelligent AI (A2G)',
      shortTitle: 'Intelligent Transformation (A2G)',
      headline: 'AI to Automation to Governance framework.',
      desc: 'Developed through doctoral research, the A2G Framework helps established businesses adopt intelligent systems, automated workflows, and risk controls without eroding human judgment.',
      bullets: [
        'A2G Enterprise Architecture & Adoption Strategy',
        'Workflow Automation & Cognitive Intelligence',
        'Enterprise Risk, Compliance & Ethics Protocols',
        'Operational Resilience for Cross-Border Scaling'
      ],
      tag: 'DOCTORAL FRAMEWORK',
      quote: '“Automation executes decisions. Only human judgment can bear responsibility for them.”'
    },
    {
      id: 'investment',
      num: '03',
      tabLabel: 'Investment & Venture',
      shortTitle: 'Global Investment & Entrepreneurship',
      headline: 'Multi-family office stewardship & venture mentorship.',
      desc: 'Directing strategic family capital, co-founding breakthrough technology startups, and mentoring MSMEs across the Middle East, Africa, South Asia, and North America.',
      bullets: [
        'Multi-Family Office (MFO) Strategy & Direct Investments',
        'Venture Ecosystem Catalyst & Startup Co-Founding',
        'Cross-Border Market Expansion Across 35 Countries',
        'Active Mentorship for Scaling MSME Founders'
      ],
      tag: 'VENTURE & CAPITAL',
      quote: '“Sustainable capital doesn’t chase speed; it backs conviction and operational grit.”'
    }
  ];

  // Auto-switch between the 3 pillars every 5 seconds
  useEffect(() => {
    if (isPaused) {
      const resumeTimeout = setTimeout(() => {
        setIsPaused(false);
      }, 8000);
      return () => clearTimeout(resumeTimeout);
    }

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = pillars.findIndex((p) => p.id === prev);
        const nextIndex = (currentIndex + 1) % pillars.length;
        return pillars[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, pillars.length]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsPaused(true);
  };

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section className={`${styles.expertiseSection} ${styles.section}`} id="expertise">
      {/* Anchor alias for #pillars and #work */}
      <div id="pillars" style={{ position: 'absolute', top: 0 }} />
      <div id="work" style={{ position: 'absolute', top: 0 }} />

      <div className={styles.wrap}>
        <p className={styles.eyebrow}>03 · WHERE PERSPECTIVE BECOMES PRACTICE</p>

        <div className={styles.splitHeading}>
          <h2>
            Build the business.<br />
            <span className={styles.muted}>Protect the legacy.</span>
          </h2>
          <p>
            From the boardroom to the next generation of founders, a connected approach to
            enterprise, intelligent systems, and enduring family wealth.
          </p>
        </div>

        {/* Pillar Navigation Tabs */}
        <div className={styles.pillarTabs} role="tablist" aria-label="Expertise Pillars">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              role="tab"
              aria-selected={activeTab === pillar.id}
              className={`${styles.pillarTabBtn} ${activeTab === pillar.id ? styles.pillarTabBtnActive : ''}`}
              onClick={() => handleTabClick(pillar.id)}
            >
              <span className={styles.tabNum}>{pillar.num}</span>
              <span className={styles.tabTitle}>{pillar.tabLabel}</span>
              {activeTab === pillar.id && <span className={styles.activeDot} />}
            </button>
          ))}
        </div>

        {/* Interactive Experience Layout: Visual Canvas + Dynamic Detail Card */}
        <div className={styles.expertiseExperience}>
          {/* Left Canvas: Orbit & Theoretical Anchor */}
          <aside className={styles.expertiseVisual}>
            <div className={styles.networkBackdrop} aria-hidden="true" />
            <div className={styles.networkScan} aria-hidden="true" />
            <div className={styles.architectureShade} />

            <div className={styles.visualTop}>
              <span>THE CONNECTED ENTERPRISE</span>
              <span className={styles.goldPill}>{currentPillar.tag}</span>
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
              <span className={styles.visualIndex}>{currentPillar.num} / 03</span>
              <h3 className={styles.activeTitle}>{currentPillar.shortTitle}</h3>
              <div className={styles.visualSteps} aria-hidden="true">
                {pillars.map((p) => (
                  <i
                    key={p.id}
                    className={p.id === activeTab ? styles.stepActive : ''}
                    onClick={() => handleTabClick(p.id)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Right Main Detail Showcase */}
          <div className={styles.pillarDetailCard}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.28 }}
                className={styles.detailPane}
              >
                <div className={styles.paneHeader}>
                  <div className={styles.pillarBadgeGroup}>
                    <span className={styles.pillarNumBadge}>PILLAR {currentPillar.num}</span>
                    <span className={styles.tagBadge}>{currentPillar.tag}</span>
                  </div>
                  <h3 className={styles.paneHeadline}>{currentPillar.headline}</h3>
                  <p className={styles.paneDesc}>{currentPillar.desc}</p>
                </div>

                <div className={styles.frameworkPoints}>
                  <h4 className={styles.pointsLabel}>KEY MANDATES &amp; EXECUTION:</h4>
                  <ul className={styles.pointsList}>
                    {currentPillar.bullets.map((b, i) => (
                      <li key={i}>
                        <span className={styles.pointCheck}>✦</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.quoteBox}>
                  <p>{currentPillar.quote}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
