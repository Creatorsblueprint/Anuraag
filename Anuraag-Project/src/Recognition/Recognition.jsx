import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Recognition.module.css';

export default function Recognition() {
  const [activeRegion, setActiveRegion] = useState('me');
  const [dossierOpen, setDossierOpen] = useState(false);

  const awards = [
    {
      mark: '✧',
      country: 'UNITED STATES',
      title: (
        <>
          President’s Lifetime<br />Achievement Award
        </>
      ),
      desc: 'Alongside the President’s Volunteer Service Medal and a citation from President Joe Biden and the White House.'
    },
    {
      mark: '✧',
      country: 'UNITED ARAB EMIRATES',
      title: 'UAE Super 100',
      desc: 'Recognition of leadership, enterprise and contribution.'
    },
    {
      mark: '✧',
      country: 'AFRICA & GLOBAL IMPACT',
      title: (
        <>
          Top 100 Change Maker<br />& Global Humanitarian Award
        </>
      ),
      desc: 'Humanitarian recognition under the patronage of H.E. Ndileka Mandela for women and youth empowerment and entrepreneur development.'
    }
  ];

  return (
    <section className={`${styles.recognitionSection} ${styles.section} ${styles.wrap}`} id="recognition">
      {/* Section Top */}
      <div className={styles.sectionTop}>
        <p className={styles.eyebrow}>05 · RECOGNITION &amp; CONTRIBUTION</p>
        <span className={styles.smallNote}>BUSINESS. LEADERSHIP. HUMANITY.</span>
      </div>

      <h2 className={styles.mainTitle}>
        Impact that travels<br />
        <span className={styles.muted}>beyond the boardroom.</span>
      </h2>

      {/* Recognition Layout */}
      <motion.div
        className={styles.recognitionLayout}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Left Side: Photo from India Global Forum */}
        <motion.figure className={styles.recognitionPhoto} variants={fadeInUp}>
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
          <div className={styles.recognitionOrbit} aria-hidden="true" />
        </motion.figure>

        {/* Right Side: 3 Awards Grid */}
        <motion.div className={styles.awardsGrid} variants={fadeInUp}>
          {awards.map((award, i) => (
            <article key={i} className={styles.award}>
              <span className={styles.awardMark}>{award.mark}</span>
              <small>{award.country}</small>
              <h3>{award.title}</h3>
              <p>{award.desc}</p>
            </article>
          ))}
        </motion.div>
      </motion.div>

      {/* Expandable Professional Profile Dossier */}
      <details
        className={styles.dossier}
        open={dossierOpen}
        onToggle={(e) => setDossierOpen(e.currentTarget.open)}
      >
        <summary className={styles.dossierSummary}>
          <span>Explore the full recognition &amp; professional profile</span>
          <span className={styles.toggleIcon}>{dossierOpen ? '−' : '+'}</span>
        </summary>

        <div className={styles.dossierContent}>
          <h3>Further recognitions</h3>
          <p>
            Global Icon · International Excellence Award · Tableau d’Honneur · Billionaires Club Excellence
            in Family Office Investments · Real Estate Transformation Leader · Excellence in Entrepreneurship.
          </p>
          <p>
            Honoured by the Institute of Chartered Accountants for Intelligent Automation in Finance,
            and the Institute of Internal Auditors for Technology Governance.
          </p>

          <h3>Operating exposure</h3>
          <p>
            Trading · Manufacturing · Exports · Distribution · Projects · HoReCa · B2B · Ecommerce · Retail · Services.
          </p>

          <h3>International footprint &amp; sector experience</h3>
          <p>The following markets and sectors are listed in the supplied professional profile.</p>

          <div className={styles.regionTabs} role="tablist" aria-label="Regional experience">
            <button
              type="button"
              role="tab"
              aria-selected={activeRegion === 'me'}
              className={`${styles.regionTab} ${activeRegion === 'me' ? styles.regionTabActive : ''}`}
              onClick={() => setActiveRegion('me')}
            >
              Middle East
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeRegion === 'af'}
              className={`${styles.regionTab} ${activeRegion === 'af' ? styles.regionTabActive : ''}`}
              onClick={() => setActiveRegion('af')}
            >
              Africa
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeRegion === 'gl'}
              className={`${styles.regionTab} ${activeRegion === 'gl' ? styles.regionTabActive : ''}`}
              onClick={() => setActiveRegion('gl')}
            >
              Further markets
            </button>
          </div>

          {activeRegion === 'me' && (
            <div className={styles.regionPanel} role="tabpanel">
              <h4>UAE · Saudi Arabia · Qatar · Oman · Bahrain · Lebanon · Jordan</h4>
              <p>
                Consumer goods, HVAC, industrial tools, building materials, construction, automotive, home
                appliances, furniture, restaurants, FMCG, education, ventilation, manufacturing, woodworking,
                facilities management, enterprise solutions, intelligent automation, technology governance,
                MEP contracting, auditing, accounting, transaction advisory, consulting, sporting goods,
                consumer electronics, telecom, food &amp; beverage, licensing, real estate, food processing,
                textile, garments, logistics, agritech, fintech, proptech and crowdfunding.
              </p>
            </div>
          )}

          {activeRegion === 'af' && (
            <div className={styles.regionPanel} role="tabpanel">
              <h4>Ethiopia · Angola · Zambia · South Sudan · Djibouti · Congo · Benin · Zanzibar · Tanzania · Zimbabwe</h4>
              <p>
                Luxury residential towers, shopping malls, pharmaceuticals, hypermarket chains, FMCG distribution,
                five-star hotels and resorts, residential real estate, hotel construction, shopping streets,
                warehousing, logistics, commodity trading, industrial parks, cotton processing and blue economy projects.
              </p>
              <p style={{ marginTop: '10px' }}>
                Manufacturing exposure includes fruit juices, chips, carbonated drinks, washing powder, soap,
                liquid detergents, diapers, vinegar and water.
              </p>
            </div>
          )}

          {activeRegion === 'gl' && (
            <div className={styles.regionPanel} role="tabpanel">
              <h4>
                South Africa · Kenya · Mauritius · Nigeria · Tanzania · Bangladesh · Sri Lanka · India · Nepal · Bhutan · Myanmar · North Cyprus · Thailand · Côte d’Ivoire · Cameroon · Guinea-Conakry · North America
              </h4>
              <p>
                Manufacturing, retail, fashion, technology, agriculture, farming, dairy, cold storage, textile,
                mining and consulting.
              </p>
            </div>
          )}
        </div>
      </details>
    </section>
  );
}
