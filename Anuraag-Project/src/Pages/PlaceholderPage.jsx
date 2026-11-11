import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import Link from '../router/Link';
import styles from './PlaceholderPage.module.css';

/**
 * PlaceholderPage — a simple page with a label, heading, short text and one
 * button. Used for pages whose full content has not been built yet, so the
 * menu links already lead somewhere real.
 *
 * Props:
 *   content - one entry from pageContent.js: { eyebrow, title, text, cta }
 */
export default function PlaceholderPage({ content }) {
  const { eyebrow, title, text, cta } = content;

  return (
    <section className={styles.page}>
      <motion.div className={styles.wrap} variants={fadeInUp} initial="hidden" animate="visible">
        <p className={styles.eyebrow}>{eyebrow.toUpperCase()}</p>
        <h1 className={styles.heading}>{title}</h1>
        <p className={styles.text}>{text}</p>

        {/* A link to another website opens in a new tab; a link to one of our
            own pages uses <Link> so the site does not reload. */}
        {cta && cta.external && (
          <a href={cta.to} target="_blank" rel="noopener noreferrer" className={styles.button}>
            <span>{cta.label}</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
        {cta && !cta.external && (
          <Link to={cta.to} className={styles.button}>
            <span>{cta.label}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        )}
      </motion.div>
    </section>
  );
}
