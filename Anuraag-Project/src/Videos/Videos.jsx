import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Videos.module.css';

export default function Videos() {
  const reels = [
    {
      num: '01',
      url: 'https://www.instagram.com/reel/DZHXcCSCe60/',
      image: '/client_images/reel_business_resilience.jpg',
      alt: 'Business resilience — supplied Instagram reel cover',
      label: 'INSTAGRAM REEL · 01'
    },
    {
      num: '02',
      url: 'https://www.instagram.com/reel/DcNe5DWzmvU/',
      image: '/client_images/reel_indian_brands_uae.jpg',
      alt: 'Why Indian brands fail in UAE — supplied Instagram reel cover',
      label: 'INSTAGRAM REEL · 02'
    },
    {
      num: '03',
      url: 'https://www.instagram.com/reel/DbIsXnLIvOG/',
      image: '/client_images/reel_falcons_majlis.png',
      alt: 'Falcons of Majlis — supplied Instagram reel cover',
      label: 'INSTAGRAM REEL · 03'
    },
    {
      num: '04',
      url: 'https://www.instagram.com/reel/DaFyCBUIHRy/',
      image: '/client_images/reel_falcons_interview.png',
      alt: 'Falcons of Majlis interview — supplied Instagram reel cover',
      label: 'INSTAGRAM REEL · 04'
    },
    {
      num: '05',
      url: 'https://www.instagram.com/reel/DaDMzVylFRn/',
      image: '/client_images/reel_vibrant_goa.png',
      alt: 'Vibrant Goa — supplied Instagram reel cover',
      label: 'INSTAGRAM REEL · 05'
    }
  ];

  return (
    <section className={`${styles.mediaSection} ${styles.section}`} id="videos">
      <div className={styles.wrap}>
        {/* Section Top */}
        <div className={styles.sectionTop}>
          <p className={styles.eyebrow}>IN FOCUS — VIDEO CONVERSATIONS</p>
          <span className={styles.smallNote}>WATCH DIRECTLY ON INSTAGRAM</span>
        </div>

        {/* Media Heading */}
        <div className={styles.mediaHeading}>
          <h2>
            A perspective<br />
            <span className={styles.muted}>worth sharing.</span>
          </h2>
          <p>
            Explore five video moments from Dr. Anuraag Guglaani.<br />
            Select a reel to watch it on Instagram.
          </p>
        </div>

        {/* Reel Grid matching client 5 cards layout */}
        <motion.div
          className={styles.reelGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {reels.map((reel) => (
            <motion.a
              key={reel.num}
              className={styles.reelCard}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch Instagram reel ${reel.num} in a new tab`}
              variants={fadeInUp}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className={styles.reelCover}>
                <img src={reel.image} alt={reel.alt} loading="lazy" />
                <span className={styles.reelInstagram}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" width="12" height="12" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>{' '}
                  INSTAGRAM
                </span>
                <span className={styles.reelPlay} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="m9 5 11 7-11 7Z" />
                  </svg>
                </span>
                <span className={styles.reelNumber}>{reel.num}</span>
                <span className={styles.reelCoverLabel}>WATCH THE CONVERSATION</span>
              </div>

              <div className={styles.reelCaption}>
                <span>
                  <small>{reel.label}</small>
                  <b>Watch on Instagram</b>
                </span>
                <span className={styles.captionArrow} aria-hidden="true">↗</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Media Bottom Note */}
        <div className={styles.mediaBottom}>
          <span>FIVE MOMENTS. ONE GLOBAL PERSPECTIVE.</span>
          <span>↗ Opens on Instagram</span>
        </div>
      </div>
    </section>
  );
}
