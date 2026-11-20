import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import Link from '../router/Link';
import { PAGE_CONTENT } from '../Pages/pageContent';
import { trackCtaClick } from '../utils/analytics';
import { strikeNot } from '../utils/strikeNot';
import styles from './HomeSections.module.css';

// The short sections of the homepage (client meeting, 19 November 2026:
// the homepage was too long; it should focus on who Dr. Anuraag is, his
// achievements and testimonials, with the "Explore" box split into separate
// sections, each with its own photo).
//
// The full content lives on the inner pages (About, Speaking, Book...).
// Where possible the text here is taken from pageContent.js, so updating a
// page there also updates its preview here. Nothing is typed twice.

// Shared fade-in settings for every section below.
const reveal = {
  variants: fadeInUp,
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.15 }
};

// Small gold label + big heading at the top of a section.
function SectionHeading({ eyebrow, title, id, center = false }) {
  return (
    <header className={`${styles.heading} ${center ? styles.center : ''}`}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title} id={id}>{title}</h2>
    </header>
  );
}

// A link to another page that also records the click in analytics.
//   where - a short name for analytics, e.g. "home_intro"
function PageLink({ to, where, className, children }) {
  return (
    <Link to={to} className={className} onClick={() => trackCtaClick(String(children), where, to)}>
      {children}
    </Link>
  );
}

/* ---------- 1. Who he is ---------- */

export function HomeIntro() {
  return (
    <section className={styles.section} id="intro" aria-labelledby="home-intro-title">
      <motion.div className={`${styles.wrap} ${styles.split}`} {...reveal}>
        <img
          className={styles.introPhoto}
          src="/client_images/dr_anuraag_yellow_tie.jpg"
          alt="Portrait of Dr. Anuraag Guglaani"
          loading="lazy"
        />
        <div className={styles.splitText}>
          <SectionHeading eyebrow="WHO HE IS" title="Grounded at twenty. Building ever since." id="home-intro-title" />
          {/* Facts taken from the Story section on the About page */}
          <p className={styles.text}>
            A National Defence Academy graduate, Dr. Anuraag Guglaani trained to fly fighter jets until he was
            grounded at twenty. He rebuilt his path in business and has since operated, invested in and
            transformed companies across 26 industries and 35 countries.
          </p>
          <p className={styles.text}>
            Today he guides family businesses, serves on boards, mentors founders as a Falcon on Falcons of
            Majlis and teaches as an adjunct professor at the American University of Ras Al Khaimah.
          </p>
          <PageLink to="/about" where="home_intro" className={styles.arrowLink}>
            Read his story →
          </PageLink>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- 2. Achievements (award photos) ---------- */

// How many award photos to show; the rest are on the Media Kit page.
const AWARD_COUNT = 4;

// The first few photos of the Media Kit's "Awards and recognition" gallery.
function awardPhotos() {
  const gallery = PAGE_CONTENT['media-kit']?.sections?.find((s) => s.heading === 'Awards and recognition');
  return gallery?.images ? gallery.images.slice(0, AWARD_COUNT) : [];
}

export function Achievements() {
  const awards = awardPhotos();
  if (awards.length === 0) return null;

  return (
    <section className={`${styles.section} ${styles.tinted}`} id="achievements" aria-labelledby="home-awards-title">
      <motion.div className={styles.wrap} {...reveal}>
        <div className={styles.headRow}>
          <SectionHeading eyebrow="ACHIEVEMENTS" title="Awards and recognition" id="home-awards-title" />
          <PageLink to="/media-kit" where="home_achievements" className={styles.arrowLink}>
            See all →
          </PageLink>
        </div>
        <ul className={styles.awardList}>
          {awards.map((award) => (
            <li className={styles.award} key={award.src}>
              <img className={styles.awardImage} src={award.src} alt={award.title} loading="lazy" />
              <span className={styles.awardTitle}>{award.title}</span>
              {award.meta && <span className={styles.awardMeta}>{award.meta}</span>}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

/* ---------- 3. Testimonials ---------- */

// The quotes from the Speaking page's "What people say" list. When the
// client sends more testimonials, add them there and they appear here too.
function testimonials() {
  const list = PAGE_CONTENT.speaking?.sections?.find((s) => s.quotes);
  return list ? list.quotes : [];
}

export function Testimonials() {
  const quotes = testimonials();
  if (quotes.length === 0) return null; // nothing to show yet: hide the section

  return (
    <section className={styles.section} id="testimonials" aria-labelledby="home-quotes-title">
      <motion.div className={styles.wrap} {...reveal}>
        <SectionHeading eyebrow="WHAT PEOPLE SAY" title="In their words" id="home-quotes-title" center />
        <div className={styles.quoteGrid}>
          {quotes.map((quote) => (
            <figure className={styles.quote} key={quote.name}>
              <blockquote className={styles.quoteText}>“{quote.text}”</blockquote>
              <figcaption className={styles.quoteBy}>
                <strong>{quote.name}</strong>
                {quote.role && <span>{quote.role}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- 4. The book (short teaser; the full section is on /book) ---------- */

export function BookTeaser() {
  return (
    // id="book": the floating "Get the book" bar hides while this is on screen
    <section className={`${styles.section} ${styles.tinted}`} id="book" aria-labelledby="home-book-title">
      <motion.div className={`${styles.wrap} ${styles.split}`} {...reveal}>
        <img
          className={styles.bookCover}
          src="/client_images/book_cover_front.jpg"
          alt="Front cover of You Will Not Fly by Dr. Anuraag Guglaani"
          loading="lazy"
        />
        <div className={styles.splitText}>
          <SectionHeading eyebrow="THE NEW BOOK" title={strikeNot('You Will Not Fly')} id="home-book-title" />
          <p className={styles.bookSubtitle}>Grounded at Twenty. Airborne Ever Since.</p>
          <p className={styles.text}>
            Part business memoir, part field manual: the five disciplines of cash, decisions, talent, foresight
            and governance that build resilient organisations and lasting legacies.
          </p>
          <div className={styles.actions}>
            <PageLink to="/book" where="home_book" className={`${styles.button} ${styles.gold}`}>
              Discover the book
            </PageLink>
            <PageLink to="/book#purchase" where="home_book" className={styles.arrowLink}>
              Get the book →
            </PageLink>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- 5. Explore: Speaking, Board & Advisory, Academic ---------- */

// How many entries each block lists.
const PREVIEW_COUNT = 3;

// One block per inner page, each with its own photo (the photo at the top
// of that page).
//   page    - the key in pageContent.js (and the page address)
//   heading - the block's title
//   section - which list on that page to take the entries from (by heading)
const EXPLORE_BLOCKS = [
  { page: 'speaking', heading: 'Speaking', section: 'Recent and upcoming' },
  { page: 'board-advisory', heading: 'Board & Advisory', section: 'Current board roles' },
  { page: 'academic', heading: 'Academic', section: 'Teaching and governance' }
];

// The first few entries of one list on a page, or [] if not found.
function previewItems(page, sectionHeading) {
  const section = PAGE_CONTENT[page]?.sections?.find((s) => s.heading === sectionHeading);
  return section?.items ? section.items.slice(0, PREVIEW_COUNT) : [];
}

export function ExploreBlocks() {
  return (
    <section className={styles.section} id="explore" aria-label="Speaking, board and academic work">
      <div className={styles.wrap}>
        {EXPLORE_BLOCKS.map(({ page, heading, section }, index) => {
          const hero = PAGE_CONTENT[page]?.hero;
          return (
            // Every second block has its photo on the right, so they alternate
            <motion.article
              className={`${styles.split} ${styles.exploreBlock} ${index % 2 ? styles.reverse : ''}`}
              key={page}
              {...reveal}
            >
              {hero && <img className={styles.explorePhoto} src={hero.src} alt={hero.alt} loading="lazy" />}
              <div className={styles.splitText}>
                <SectionHeading eyebrow={`0${index + 1}`} title={heading} />
                <ul className={styles.itemList}>
                  {previewItems(page, section).map((item) => (
                    <li className={styles.item} key={`${item.title} ${item.meta || ''}`}>
                      <span className={styles.itemTitle}>{item.title}</span>
                      {item.meta && <span className={styles.itemMeta}>{item.meta}</span>}
                    </li>
                  ))}
                </ul>
                <PageLink to={`/${page}`} where={`home_explore_${page}`} className={styles.arrowLink}>
                  See more →
                </PageLink>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- 6. Get in touch ---------- */

export function ContactStrip() {
  return (
    <section className={`${styles.section} ${styles.tinted}`} id="get-in-touch" aria-labelledby="home-contact-title">
      <motion.div className={`${styles.wrap} ${styles.contact}`} {...reveal}>
        <SectionHeading eyebrow="GET IN TOUCH" title="Let's talk" id="home-contact-title" center />
        <p className={styles.text}>For speaking invitations, board and advisory roles, media and academic enquiries.</p>
        <div className={`${styles.actions} ${styles.centerActions}`}>
          <PageLink to="/contact" where="home_contact" className={`${styles.button} ${styles.gold}`}>
            Contact
          </PageLink>
          <PageLink to="/speaking#invite" where="home_contact" className={styles.arrowLink}>
            Invite him to speak →
          </PageLink>
        </div>
      </motion.div>
    </section>
  );
}
