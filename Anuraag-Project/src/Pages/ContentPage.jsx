import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import Link from '../router/Link';
import { strikeNot } from '../utils/strikeNot';
import LeadForm from './LeadForm';
import PageHeader from './PageHeader';
import Icon from './Icon';
import styles from './ContentPage.module.css';

// The book title is always shown with "Not" crossed out (see strikeNot.jsx).
// Only text that contains the title is changed, so the word "not" in an
// ordinary sentence is left alone.
function withBookTitle(text) {
  return text.includes('You Will Not Fly') ? strikeNot(text) : text;
}

// A form with its own section heading and a short sentence above it.
// The heading, text and id are used here; every other setting is passed
// on to LeadForm ("...formSettings" collects them).
function FormSection({ form }) {
  const { id, heading, text, ...formSettings } = form;
  return (
    <div className={styles.section} id={id}>
      <h2 className={styles.sectionHeading}>{heading}</h2>
      {text && <p className={styles.formIntro}>{text}</p>}
      <LeadForm {...formSettings} />
    </div>
  );
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
 *     { eyebrow, title, text, hero, sections, form, cta }
 *     hero     - optional photo beside the heading: { src, alt }
 *     sections - list of { heading, icon, items }, { heading, images, photos }
 *                or { heading, quotes }
 *     icon     - optional small picture on every card of a section (see Icon.jsx)
 *     items    - list of { title, meta, text }  (meta and text are optional)
 *     images   - list of { src, title, meta }   (a picture gallery; meta is optional)
 *     photos   - true for event photos and posters: taller boxes on a plain background
 *     quotes   - list of { text, name, role }   (testimonials; role is optional)
 *     form     - optional form under the sections:
 *                { id, heading, text, ...settings for LeadForm }
 */
export default function ContentPage({ content }) {
  const { eyebrow, title, text, hero, sections, form, cta } = content;

  return (
    <section className={styles.page}>
      <motion.div className={styles.wrap} variants={fadeInUp} initial="hidden" animate="visible">
        {/* Top of the page: small gold label, heading, introduction and,
            when the page has one, a photo beside them */}
        <PageHeader eyebrow={eyebrow} title={title} text={withBookTitle(text)} hero={hero} />

        {/* One block per section. "map" repeats the block for every entry in
            the list; "key" lets React tell the repeated pieces apart. */}
        {sections.map((section) => (
          <div className={styles.section} key={section.heading}>
            <h2 className={styles.sectionHeading}>{section.heading}</h2>

            {/* A section with "images" is a picture gallery: one framed
                picture per entry, with its name and details underneath.
                loading="lazy" makes the browser fetch a picture only when
                the visitor scrolls near it, so the page opens quickly. */}
            {section.images && (
              <ul className={`${styles.gallery} ${section.photos ? styles.galleryPhotos : ''}`}>
                {section.images.map((image) => (
                  <li className={styles.galleryItem} key={image.src}>
                    <figure className={styles.figure}>
                      <img
                        className={styles.galleryImage}
                        src={image.src}
                        alt={`${image.title}${image.meta ? `, ${image.meta}` : ''}`}
                        loading="lazy"
                      />
                      <figcaption className={styles.caption}>
                        <span className={styles.captionTitle}>{withBookTitle(image.title)}</span>
                        {image.meta && <span className={styles.captionMeta}>{image.meta}</span>}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            )}

            {/* A section with "items" is a list of text cards. */}
            {section.items && (
            <ul className={styles.list}>
              {/* The key joins title and meta, because several roles share
                  the title "Board Member". */}
              {section.items.map((item) => (
                <li className={`${styles.item} ${section.icon ? styles.itemWithIcon : ''}`} key={`${item.title} ${item.meta || ''}`}>
                  {/* Small gold icon on the left, the same for the whole section */}
                  {section.icon && (
                    <span className={styles.itemIcon}>
                      <Icon name={section.icon} />
                    </span>
                  )}
                  <div>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    {item.meta && <p className={styles.itemMeta}>{item.meta}</p>}
                    {item.text && <p className={styles.itemText}>{withBookTitle(item.text)}</p>}
                  </div>
                </li>
              ))}
            </ul>
            )}

            {/* A section with "quotes" shows testimonials: the words in a
                <blockquote>, the person's name and role underneath. */}
            {section.quotes && (
              <ul className={styles.quotes}>
                {section.quotes.map((quote) => (
                  <li className={styles.quote} key={quote.name}>
                    <figure className={styles.figure}>
                      <blockquote className={styles.quoteText}>“{quote.text}”</blockquote>
                      <figcaption className={styles.quoteBy}>
                        <span className={styles.captionTitle}>{quote.name}</span>
                        {quote.role && <span className={styles.captionMeta}>{quote.role}</span>}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Optional form (Speaking page: "Invite Dr. Anuraag to speak").
            Its id lets other pages link straight to it, e.g. /speaking#invite.
            The heading and text are taken out; the rest is passed to LeadForm. */}
        {form && <FormSection form={form} />}

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
