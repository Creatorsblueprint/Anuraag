import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import styles from './Ebook.module.css';

export default function Ebook() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('verdict');

  const excerpts = [
    {
      id: 'verdict',
      tabLabel: '01 · The Verdict',
      title: 'Four Words That Changed Everything',
      subtitle: 'The loss of a defining identity becomes the birth of a lifelong operating system.',
      quote: '“The sky he had staked everything on simply closed. Faced with the loss of his first ambition, he was forced to confront the question: What can you actually do?”',
      content:
        'At twenty, after clearing one of the most competitive selection processes in India and spending years training at the prestigious National Defence Academy (NDA) to become a fighter jet pilot, Dr. Guglaani walked out with the identity he had built his life around abruptly erased. What followed was not a comeback story—it was a 30-year reinvention. A verdict is not a destiny.'
    },
    {
      id: 'verbs',
      tabLabel: '02 · The Six Verbs',
      title: 'The Midnight List Over Titles & Nouns',
      subtitle: 'Why who you are is answered by verbs, never by designations.',
      quote: '“The answer began with a midnight list of six verbs. Those verbs became more important than any title, qualification or designation.”',
      content:
        'From factory floors to sales, from family businesses to multi-billion boardrooms, Guglaani discovers that problems businesses present are rarely the problems they actually have. A cash crisis is often a governance crisis. A succession dilemma is an identity struggle. A growth obstacle is a capability bottleneck. Six verbs replace the fragility of titles.'
    },
    {
      id: 'system',
      tabLabel: '03 · Living Room to Boardroom',
      title: 'Agreement Before Structure',
      subtitle: 'Why legal frameworks crumble when human trust is fractured.',
      quote: '“Families need agreement before they need structure. The boardroom and the living room are solving the exact same problem.”',
      content:
        'Working with multi-generational family enterprises across the GCC, South Asia, Africa, and North America, Guglaani reveals why 70% of family dynasties implode by generation three. Governance cannot simply be imposed through legal boilerplate. When money, power, and succession collide, emotional alignment must precede fiduciary architecture.'
    },
    {
      id: 'playbook',
      tabLabel: '04 · The Playbook',
      title: 'Tools For Generational Endurance',
      subtitle: 'Building a system strong enough to run after you leave the room.',
      quote: '“The greatest legacy is building something strong enough to continue after you leave the room.”',
      content:
        'The book concludes with a practical, field-tested Playbook: frameworks for cash visibility, decision rights delegation, succession readiness audits, leading indicators, and family councils. Designed for founders, successors, and the invisible operators running family enterprises without formal titles.'
    }
  ];

  const currentExcerpt = excerpts.find((e) => e.id === activeTab) || excerpts[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <section id="ebook" className={styles.ebookSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.mainGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left Column: Realistic 3D Book Cover */}
          <motion.div className={styles.bookCol} variants={fadeInUp}>
            <div className={styles.bookWrapper}>
              <div className={styles.bookSpineGlow} />
              <img
                src="/book_cover.jpg"
                alt="You Will Not Fly - Dr. Anuraag Guglaani"
                className={styles.bookImage}
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: All Text, Info & Purchase */}
          <motion.div className={styles.detailsCol} variants={fadeInUp}>
            {/* <span className={styles.tagPill}>FEATURED BOOK &amp; OPERATING SYSTEM</span> */}
            <span className={styles.tagPill}>FEATURED EBOOK</span>
            <h2 className={styles.mainTitle}>You Will Not Fly</h2>
            <p className={styles.tagline}>Grounded at Twenty. Airborne Ever Since.</p>
            <p className={styles.subtitle}>
              One Operating System for Business, Career, Family and Legacy
            </p>

            {/* <blockquote className={styles.quoteBlock}>
              &ldquo;A Verdict is not a Destiny. A Title is a Noun. What you can do is a Verb.&rdquo;
            </blockquote> */}

            <p className={styles.overviewText}>
              At twenty, after clearing one of the toughest selection processes and spending years training
              at the prestigious National Defence Academy (NDA) as an aspiring fighter jet pilot, Anuraag was
              grounded by a verdict he could not appeal. He hadn&rsquo;t failed or quit. The sky he&rsquo;d staked
              everything on simply closed.
            </p>

            <p className={styles.descriptionText}>
              What followed was not a comeback story—it was a reinvention. Across three decades from factory floors
              to boardrooms in 35 countries, known today as <em>The Family Business Doctor</em>, Dr. Guglaani shares
              the tested operating system built along the way: cash, decisions, talent, foresight, and governance,
              shaped as much at his own kitchen table as in any boardroom.
            </p>

            {/* Seamless, unboxed purchase area */}
            <div className={styles.purchaseArea}>
              <div className={styles.priceRow}>
                <div className={styles.priceTag}>
                  <span className={styles.dollarSymbol}>$</span>
                  <span>120</span>
                </div>
                {/* <span className={styles.editionLabel}>Hardcover &amp; Digital Monograph</span> */}
              </div>

              <form onSubmit={handleSubmit} className={styles.purchaseForm}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.emailInput}
                />
                <button type="submit" className={styles.buyBtn}>
                  {submitted ? 'ORDER SENT' : 'BUY NOW'}
                </button>
              </form>

              <span className={styles.noteText}>
                *Sent directly to your email after checkout with instant digital download
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Interactive "Look Inside" Chapter Excerpts Showcase */}
        <motion.div
          className={styles.excerptsShowcase}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className={styles.excerptsHeader}>
            <span className={styles.excerptsTag}>LOOK INSIDE THE BOOK</span>
            <h3 className={styles.excerptsTitle}>The Architecture of Reinvention</h3>
            <p className={styles.excerptsSubtitle}>
              Explore the core turning points, midnight realizations, and field-tested frameworks.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={styles.tabNav}>
            {excerpts.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabBtnActive : ''}`}
              >
                {tab.tabLabel}
              </button>
            ))}
          </div>

          {/* Active Excerpt Card */}
          <div className={styles.excerptCard}>
            <div className={styles.excerptContentCol}>
              <span className={styles.excerptStep}>{currentExcerpt.tabLabel}</span>
              <h4 className={styles.excerptHeading}>{currentExcerpt.title}</h4>
              <p className={styles.excerptSubhead}>{currentExcerpt.subtitle}</p>
              <blockquote className={styles.excerptPullQuote}>{currentExcerpt.quote}</blockquote>
              <p className={styles.excerptParagraph}>{currentExcerpt.content}</p>
            </div>
            <div className={styles.excerptActionCol}>
              <div className={styles.authorTagBox}>
                <span className={styles.authorTagLabel}>BY DR. ANURAAG GUGLAANI</span>
                <span className={styles.authorTagRole}>The Family Business Doctor</span>
              </div>
              <p className={styles.excerptActionNote}>
                Gain immediate access to the full operating manual, workbook, and generational governance tools.
              </p>
              <button
                onClick={() => {
                  const input = document.querySelector(`.${styles.emailInput}`);
                  if (input) input.focus();
                }}
                className={styles.excerptBuyLink}
              >
                <span>ORDER COMPLETE EDITION</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
