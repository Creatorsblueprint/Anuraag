import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import Link from '../router/Link';
import { strikeNot } from '../utils/strikeNot';
import styles from './ContentPage.module.css';

// The book title is always shown with "Not" crossed out (see strikeNot.jsx).
// Only text that contains the title is changed, so the word "not" in an
// ordinary sentence is left alone.
function withBookTitle(text) {
  return text.includes('You Will Not Fly') ? strikeNot(text) : text;
}

/**
 * ContentPage — a page made of a heading, an introduction and one or more
 * lists (for example "Current roles" with one card per role).
 * Used by Speaking, Board & Advisory, Academic and Media Kit. The text for
 * each page lives in pageContent.js, so changing wording never needs a
 * change in this file.
 *
 * Props:
 *   content - one entry from pageContent.js:
 *     { eyebrow, title, text, sections, cta }
 *     sections - list of { heading, items }
 *     items    - list of { title, meta, text }  (meta and text are optional)
 */
export default function ContentPage({ content }) {
  const { eyebrow, title, text, sections, cta } = content;

  return (
    <section className={styles.page}>
      <motion.div className={styles.wrap} variants={fadeInUp} initial="hidden" animate="visible">
        {/* Top of the page: small gold label, heading and introduction */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow.toUpperCase()}</p>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.intro}>{withBookTitle(text)}</p>
        </header>

        {/* One block per section. "map" repeats the block for every entry in
            the list; "key" lets React tell the repeated pieces apart. */}
        {sections.map((section) => (
          <div className={styles.section} key={section.heading}>
            <h2 className={styles.sectionHeading}>{section.heading}</h2>
            <ul className={styles.list}>
              {/* The key joins title and meta, because several roles share
                  the title "Board Member". */}
              {section.items.map((item) => (
                <li className={styles.item} key={`${item.title} ${item.meta || ''}`}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  {item.meta && <p className={styles.itemMeta}>{item.meta}</p>}
                  {item.text && <p className={styles.itemText}>{withBookTitle(item.text)}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Button at the bottom, leading to another page of the site */}
        {cta && (
          <div className={styles.ctaRow}>
            <Link to={cta.to} className={styles.button}>
              <span>{cta.label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </motion.div>
    </section>
  );
}
