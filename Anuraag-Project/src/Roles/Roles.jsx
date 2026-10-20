import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Roles.module.css';

export default function Roles() {
  return (
    <section className={`${styles.rolesSection} ${styles.section} ${styles.wrap}`} id="roles">
      <div className={styles.rolesBackdrop} aria-hidden="true" />
      <p className={styles.eyebrow}>04 — LEADERSHIP &amp; AFFILIATIONS</p>

      <motion.div
        className={styles.rolesGrid}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Left Side: Heading & Portrait in Evening Attire from Client Assets */}
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

        {/* Right Side: Exact 6 Roles from Client Reference */}
        <motion.div className={styles.rolesList} variants={fadeInUp}>
          <div className={styles.roleCard}>
            <span className={styles.roleCategory}>GROUP CEO &amp; BOARD MEMBER</span>
            <h3>ADAM Global &amp; ADAM Global Network</h3>
            <p>Leadership and board responsibilities across ADAM Global and ADAM Global Network.</p>
          </div>

          <div className={`${styles.roleCard} ${styles.academicRoles}`}>
            <span className={styles.roleCategory}>AMERICAN UNIVERSITY OF RAS AL KHAIMAH</span>
            <h3>Teaching the next generation.</h3>
            <ul>
              <li>Adjunct Professor of Service Marketing</li>
              <li>Adjunct Professor of Data Analytics</li>
              <li>Adjunct Professor of Entrepreneurship</li>
              <li>Adjunct Professor of International Business for MBA</li>
              <li>Chair of the KITE Advisory Board</li>
              <li>Member of the Business Advisory Council</li>
            </ul>
          </div>

          <div className={styles.roleCard}>
            <span className={styles.roleCategory}>CHAIRPERSON</span>
            <h3>Wazir Holdings Multi Family Office</h3>
          </div>

          <div className={styles.roleCard}>
            <span className={styles.roleCategory}>BOARD MEMBER</span>
            <h3>Wazir Advisors UAE</h3>
            <p>Strategy, transformation, technology, alliances &amp; risk consulting</p>
          </div>

          <div className={styles.roleCard}>
            <span className={styles.roleCategory}>BOARD &amp; ADVISORY ROLES</span>
            <h3>Family enterprise. Global leadership.</h3>
            <p>
              Multiple large family business groups in the MEASA region · Pan African Leadership
              and Entrepreneurship Development Corporation · World Youth Forum · IBI Union · Business
              Advisory Council
            </p>
          </div>

          <div className={styles.roleCard}>
            <span className={styles.roleCategory}>INNOVATION &amp; EDUCATION</span>
            <h3>Investing in what comes next.</h3>
            <p>
              Co-founder of two tech startups · Active investor and MSME mentor · Chair of the KITE
              Advisory Board and member of the Business Advisory Council at the American University
              of Ras Al Khaimah
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
