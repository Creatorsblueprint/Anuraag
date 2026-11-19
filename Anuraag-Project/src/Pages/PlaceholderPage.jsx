import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import Link from '../router/Link';
import LeadForm from './LeadForm';
import PageHeader from './PageHeader';
import styles from './PlaceholderPage.module.css';

/**
 * PlaceholderPage — a simple page with a label, heading, short text and one
 * button. Used for pages whose full content has not been built yet, so the
 * menu links already lead somewhere real.
 *
 * Props:
 *   content - one entry from pageContent.js:
 *             { eyebrow, title, text, hero, form, comingSoon, cta }
 *             hero - optional photo beside the heading: { src, alt }
 */
export default function PlaceholderPage({ content }) {
  const { eyebrow, title, text, hero, form, comingSoon, cta } = content;

  // The form, the "coming soon" note and the button, kept together in one
  // piece ("<>...</>" groups them without adding an extra box to the page).
  const extras = (
    <>
      {/* Optional form (Contact and Insights pages). "form" holds the
          settings for LeadForm; {...form} passes each one on as a prop. */}
      {form && (
        <div className={styles.formSlot}>
          <LeadForm {...form} />
        </div>
      )}

      {/* Optional note about something that is still to come
          (e.g. online booking on the Contact page). */}
      {comingSoon && <p className={styles.comingSoon}>{comingSoon}</p>}

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
    </>
  );

  return (
    <section className={styles.page}>
      {/* A page with a photo gets a wider column, so text and photo fit side by side */}
      <motion.div
        className={`${styles.wrap} ${hero ? styles.wrapWide : ''}`}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        {/* Label, heading, text and (optional) photo: see PageHeader.jsx.
            On a page with a photo, the form and buttons go inside the header,
            beside the photo, so the visitor does not have to scroll past the
            photo to reach the form. Without a photo they follow underneath. */}
        {hero ? (
          <PageHeader eyebrow={eyebrow} title={title} text={text} hero={hero}>
            {extras}
          </PageHeader>
        ) : (
          <>
            <PageHeader eyebrow={eyebrow} title={title} text={text} />
            {extras}
          </>
        )}
      </motion.div>
    </section>
  );
}
