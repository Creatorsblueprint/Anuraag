import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Recognition.module.css';

export default function Recognition() {
  const [activeTab, setActiveTab] = useState('honors');
  const [activeRegion, setActiveRegion] = useState('me');
  const [isPaused, setIsPaused] = useState(false);

  const mainTabs = [
    { id: 'honors', label: 'Major Honors', count: '01' },
    { id: 'further', label: 'Institutional Citations', count: '02' },
    { id: 'footprint', label: 'Global Footprint (35+ Countries)', count: '03' }
  ];

  const primaryAwards = [
    {
      country: 'UNITED STATES',
      title: 'President’s Lifetime Achievement Award',
      body: 'Alongside the President’s Volunteer Service Medal and an official citation from President Joe Biden and the White House.',
      icon: '🏛'
    },
    {
      country: 'UNITED ARAB EMIRATES',
      title: 'UAE Super 100',
      body: 'Recognized among the top 100 leaders and transformational entrepreneurs shaping economic vitality across the Emirates.',
      icon: '✦'
    },
    {
      country: 'AFRICA & GLOBAL IMPACT',
      title: 'Top 100 Change Maker & Global Humanitarian Award',
      body: 'Humanitarian recognition under the patronage of H.E. Ndileka Mandela for women and youth empowerment and entrepreneurial development.',
      icon: '🌍'
    }
  ];

  const institutionalHonors = [
    {
      badge: 'FINANCIAL AUTOMATION',
      organization: 'Institute of Chartered Accountants',
      title: 'Intelligent Automation in Finance Award',
      desc: 'Honoured for pioneer frameworks connecting enterprise accounting systems to robotic process automation and AI governance.'
    },
    {
      badge: 'RISK & OVERSIGHT',
      organization: 'Institute of Internal Auditors',
      title: 'Technology Governance Citation',
      desc: 'Recognized for establishing ethical protocols, risk controls, and automated compliance frameworks in family offices.'
    },
    {
      badge: 'FAMILY ENTERPRISE',
      organization: 'Billionaires Club Global',
      title: 'Excellence in Family Office Investments',
      desc: 'Awarded for multi-generational wealth preservation strategies and sovereign cross-border deal structuring.'
    },
    {
      badge: 'TRANSFORMATION',
      organization: 'International Excellence Council',
      title: 'Global Icon & Real Estate Transformation Leader',
      desc: 'Citing large-scale industrial turnaround and commercial real estate advisory across the MEASA region.'
    }
  ];

  const regionalData = {
    me: {
      name: 'Middle East & GCC',
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Bahrain', 'Lebanon', 'Jordan'],
      sectors: [
        'Enterprise AI & Automation',
        'Family Business Governance',
        'Construction & MEP Contracting',
        'FMCG & Logistics',
        'Higher Education & MBA Curricula',
        'Transaction Advisory & MFO'
      ]
    },
    af: {
      name: 'Africa & Indian Ocean',
      countries: ['Ethiopia', 'Angola', 'Zambia', 'South Sudan', 'Djibouti', 'Congo', 'Benin', 'Zanzibar', 'Tanzania', 'Zimbabwe'],
      sectors: [
        'Industrial Parks & Infrastructure',
        'Hypermarket & FMCG Manufacturing',
        'Luxury Hospitality & Real Estate',
        'Commodity Trading & Blue Economy',
        'Pharmaceuticals Distribution',
        'Youth Leadership & Women Empowerment'
      ]
    },
    gl: {
      name: 'International & North America',
      countries: ['United States', 'Canada', 'United Kingdom', 'India', 'South Africa', 'Kenya', 'Mauritius', 'Nigeria', 'Sri Lanka', 'Nepal'],
      sectors: [
        'Venture Ecosystem & Angel Investment',
        'Tech Startup Co-Founding',
        'Cross-Border Mergers & Alliances',
        'Global Advisory Councils & Forums',
        'Author & Keynote Speaking'
      ]
    }
  };

  // Auto-switch main tabs every 5 seconds
  useEffect(() => {
    if (isPaused) {
      const resumeTimeout = setTimeout(() => {
        setIsPaused(false);
      }, 8000);
      return () => clearTimeout(resumeTimeout);
    }

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = mainTabs.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % mainTabs.length;
        return mainTabs[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, mainTabs.length]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsPaused(true);
  };

  return (
    <section className={`${styles.recognitionSection} ${styles.section} ${styles.wrap}`} id="recognition">
      {/* Section Top */}
      <div className={styles.sectionTop}>
        <p className={styles.eyebrow}>05 · RECOGNITION &amp; CONTRIBUTION</p>
        <span className={styles.smallNote}>BUSINESS. LEADERSHIP. HUMANITY.</span>
      </div>

      <div className={styles.headerBlock}>
        <h2 className={styles.mainTitle}>
          Impact that travels<br />
          <span className={styles.muted}>beyond the boardroom.</span>
        </h2>
        <p className={styles.headerLead}>
          From White House commendations to grassroots youth mentorship across 35 countries,
          transformational leadership is measured by long-term societal contribution.
        </p>
      </div>

      {/* Main Tabs Navigation */}
      <div className={styles.tabNav} role="tablist" aria-label="Recognition categories">
        {mainTabs.map((tab) => (
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

      {/* Recognition Content Area */}
      <div className={styles.contentContainer}>
        <AnimatePresence mode="wait">
          {/* TAB 1: Major Honors */}
          {activeTab === 'honors' && (
            <motion.div
              key="honors"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.26 }}
              className={styles.recognitionLayout}
            >
              {/* Left Side: Photo from India Global Forum */}
              <figure className={styles.recognitionPhoto}>
                <img
                  src="/client_images/india_global_forum.jpg"
                  alt="Dr. Guglaani at the India Global Forum"
                  loading="lazy"
                  width="665"
                  height="1087"
                />
                <figcaption className={styles.figcaption}>
                  <span>A GLOBAL PERSPECTIVE</span>
                  <b>Recognition follows<br />contribution.</b>
                </figcaption>
              </figure>

              {/* Right Side: 3 Awards Grid */}
              <div className={styles.awardsGrid}>
                {primaryAwards.map((award, i) => (
                  <article key={i} className={styles.award}>
                    <span className={styles.awardMark}>{award.icon}</span>
                    <small>{award.country}</small>
                    <h3>{award.title}</h3>
                    <p>{award.body}</p>
                  </article>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: Institutional Honors */}
          {activeTab === 'further' && (
            <motion.div
              key="further"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.26 }}
              className={styles.furtherGrid}
            >
              {institutionalHonors.map((item, idx) => (
                <article key={idx} className={styles.furtherCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.badgeLabel}>{item.badge}</span>
                    <span className={styles.orgLabel}>{item.organization}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </motion.div>
          )}

          {/* TAB 3: Global Footprint & Operating Reach */}
          {activeTab === 'footprint' && (
            <motion.div
              key="footprint"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.26 }}
              className={styles.footprintCard}
            >
              <div className={styles.footprintHeader}>
                <div>
                  <span className={styles.footprintEyebrow}>CROSS-BORDER FOOTPRINT</span>
                  <h3 className={styles.footprintTitle}>35 Countries · 26 Industries</h3>
                </div>
                {/* Sub-region Pills */}
                <div className={styles.regionSelector}>
                  {Object.keys(regionalData).map((key) => (
                    <button
                      key={key}
                      type="button"
                      className={`${styles.regionSubPill} ${activeRegion === key ? styles.regionSubPillActive : ''}`}
                      onClick={() => {
                        setActiveRegion(key);
                        setIsPaused(true);
                      }}
                    >
                      {regionalData[key].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Region Display */}
              <div className={styles.regionDisplay}>
                <div className={styles.countrySection}>
                  <h4 className={styles.groupHeading}>OPERATING &amp; ADVISORY MARKETS:</h4>
                  <div className={styles.tagWrap}>
                    {regionalData[activeRegion].countries.map((c, i) => (
                      <span key={i} className={styles.countryTag}>
                        <span className={styles.dot}>•</span>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.sectorSection}>
                  <h4 className={styles.groupHeading}>SECTORS &amp; TRANSFORMATION PRACTICE:</h4>
                  <div className={styles.tagWrap}>
                    {regionalData[activeRegion].sectors.map((s, i) => (
                      <span key={i} className={styles.sectorTag}>
                        <span className={styles.check}>✓</span>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
