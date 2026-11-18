import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import Link from '../router/Link';
import { PAGE_CONTENT } from '../Pages/pageContent';
import { trackCtaClick } from '../utils/analytics';
import styles from './HomeHub.module.css';

// The homepage "hub": a short preview of each inner page, with a
// "See more" link to the full page (the client asked for the homepage to
// work as a hub, November 2026).
//
// The previews take their text straight from pageContent.js, so when a page
// is updated there, its preview here updates by itself. Nothing is typed twice.

// How many entries each preview shows.
const PREVIEW_COUNT = 3;
const AWARD_COUNT = 4;

// The page previews with lists, in the order of the top menu.
// (Insights is added separately below, as it has no list yet.)
//   page    - the key in pageContent.js (and the page address)
//   heading - the title of the preview box
//   section - which list on that page to take the entries from (by heading)
const PREVIEWS = [
  { page: 'speaking', heading: 'Speaking', section: 'Recent and upcoming' },
  { page: 'board-advisory', heading: 'Board & Advisory', section: 'Current board roles' },
  { page: 'academic', heading: 'Academic', section: 'Teaching and governance' }
];

// Returns the first few entries of one list on a page, or [] if not found.
function previewItems(page, sectionHeading) {
  const section = PAGE_CONTENT[page]?.sections?.find((s) => s.heading === sectionHeading);
  return section?.items ? section.items.slice(0, PREVIEW_COUNT) : [];
}

// The award photos come from the Media Kit gallery (the first few there).
function awardPhotos() {
  const gallery = PAGE_CONTENT['media-kit']?.sections?.find((s) => s.images);
  return gallery ? gallery.images.slice(0, AWARD_COUNT) : [];
}

// The "See more" link used at the bottom of every preview.
function SeeMore({ to, label }) {
  return (
    <Link to={to} className={styles.seeMore} onClick={() => trackCtaClick('See more', `home_hub_${label}`, to)}>
      See more <span aria-hidden="true">→</span>
    </Link>
  );
}

/**
 * HomeHub — previews of Awards, Speaking, Board & Advisory, Academic and
 * Insights on the homepage, each leading to its full page.
 */
export default function HomeHub() {
  const awards = awardPhotos();

  return (
    <section className={styles.hub} id="explore" aria-labelledby="home-hub-title">
      <motion.div
        className={styles.wrap}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <header className={styles.header}>
          <p className={styles.eyebrow}>EXPLORE</p>
          <h2 className={styles.title} id="home-hub-title">Work, roles and recognition</h2>
        </header>

        {/* Awards: a row of photos, linking to the full gallery in the Media Kit */}
        {awards.length > 0 && (
          <div className={styles.awards}>
            <div className={styles.blockHead}>
              <h3 className={styles.blockTitle}>Awards and recognition</h3>
              <SeeMore to="/media-kit" label="awards" />
            </div>
            <ul className={styles.awardList}>
              {awards.map((award) => (
                <li className={styles.award} key={award.src}>
                  <img className={styles.awardImage} src={award.src} alt={award.title} loading="lazy" />
                  <span className={styles.awardTitle}>{award.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Speaking, Board & Advisory, Academic and Insights side by side */}
        <div className={styles.grid}>
          {PREVIEWS.map(({ page, heading, section }) => (
            <article className={styles.panel} key={page}>
              <h3 className={styles.blockTitle}>{heading}</h3>
              <ul className={styles.itemList}>
                {previewItems(page, section).map((item) => (
                  <li className={styles.item} key={`${item.title} ${item.meta || ''}`}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    {item.meta && <span className={styles.itemMeta}>{item.meta}</span>}
                  </li>
                ))}
              </ul>
              <SeeMore to={`/${page}`} label={page} />
            </article>
          ))}

          {/* Insights has no articles yet, so it shows its short introduction */}
          <article className={styles.panel}>
            <h3 className={styles.blockTitle}>Insights</h3>
            <p className={styles.panelText}>{PAGE_CONTENT.insights.text}</p>
            <SeeMore to="/insights" label="insights" />
          </article>
        </div>
      </motion.div>
    </section>
  );
}
