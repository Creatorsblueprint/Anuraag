import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Falcons.module.css';

export default function Falcons() {
  return (
    <section className={`${styles.falconFeature} ${styles.section}`} id="falcons">
      <div className={styles.wrap}>
        {/* Section Top */}
        <div className={styles.sectionTop}>
          <p className={styles.eyebrow}>THE FALCON PERSPECTIVE</p>
          <a
            className={styles.textLink}
            href="https://falconsofmajlis.com/falcons/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Meet the Falcons</span>
            <span className={styles.arrowIcon}>↗</span>
          </a>
        </div>

        {/* Falcon Feature Grid */}
        <motion.div
          className={styles.falconFeatureGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Left Portrait: Speaking into Mic */}
          <motion.figure className={styles.falconFeaturePortrait} variants={fadeInUp}>
            <img
              src="/client_images/falcons_speaking_mic.jpg"
              width="1920"
              height="1280"
              loading="lazy"
              alt="Dr. Anuraag Guglaani speaking with a microphone at Falcons of Majlis"
            />
            <figcaption>
              <span>A FALCON ON</span>
              <strong>Falcons of Majlis</strong>
              <small>DR. ANURAAG GUGLAANI</small>
            </figcaption>
          </motion.figure>

          {/* Right Copy */}
          <motion.div className={styles.falconFeatureCopy} variants={fadeInUp}>
            <span className={styles.falconKicker}>
              INVESTOR · MENTOR · BUSINESS LEADER
            </span>

            <h2>
              Bold founders.<br />
              Real decisions.<br />
              <span className={styles.goldText}>Lasting businesses.</span>
            </h2>

            <p className={styles.lead}>
              Dr. Anuraag Guglaani brings his business, investment and governance experience to Falcons of Majlis as a Falcon.
            </p>

            <p className={styles.bodyText}>
              The UAE startup funding show by NKN Media connects founders with investors, family offices and strategic capital.
              His official Falcon profile highlights expertise in technology, transformation, strategy and international business,
              alongside active investment and mentorship of MSMEs.
            </p>

            <div className={styles.falconPerspectives}>
              <div>
                <b>Capital with perspective</b>
                <p>Investment experience informed by operating businesses across markets.</p>
              </div>
              <div>
                <b>Growth with judgment</b>
                <p>Transformation, governance and a long-term view of enterprise.</p>
              </div>
            </div>

            <a
              className={styles.goldButton}
              href="https://falconsofmajlis.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Explore Falcons of Majlis</span>
              <span className={styles.btnArrow}>↗</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Event Photos Row */}
        <motion.div
          className={styles.falconsEventGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.figure className={styles.eventWide} variants={fadeInUp}>
            <img
              src="/client_images/falcons_stage_panel.jpg"
              width="1920"
              height="1280"
              loading="lazy"
              alt="Dr. Guglaani seated with fellow participants on the Falcons of Majlis stage"
            />
            <figcaption>
              <span>ON THE MAJLIS STAGE</span>
              <b>Experience meets entrepreneurial ambition.</b>
            </figcaption>
          </motion.figure>

          <motion.figure className={styles.eventCandid} variants={fadeInUp}>
            <img
              src="/client_images/falcons_launch_event.jpg"
              width="1920"
              height="1280"
              loading="lazy"
              alt="Dr. Guglaani at the Falcons of Majlis launch event"
            />
            <figcaption>
              <span>BEHIND THE CONVERSATIONS</span>
              <b>People. Possibility. Perspective.</b>
            </figcaption>
          </motion.figure>
        </motion.div>

        <p className={styles.falconSource}>
          Discover his profile on the{' '}
          <a href="https://falconsofmajlis.com/falcons/" target="_blank" rel="noopener noreferrer">
            official Falcons of Majlis website ↗
          </a>
        </p>
      </div>
    </section>
  );
}
