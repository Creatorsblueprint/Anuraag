import styles from './PageHeader.module.css';

/**
 * PageHeader — the top of an inner page: small gold label, heading and
 * introduction, with a photograph beside them when the page has one.
 * Without a photo the text is simply centred (as before).
 * Used by ContentPage.jsx and PlaceholderPage.jsx.
 *
 * Props:
 *   eyebrow - small gold label above the heading
 *   title   - the page heading
 *   text    - introduction (text or already-formatted content)
 *   hero    - optional photo: { src, alt }
 *   children - optional extra content (e.g. a form) shown under the
 *              introduction, so it sits beside the photo instead of below it
 */
export default function PageHeader({ eyebrow, title, text, hero, children }) {
  // "withExtra" lines the photo up with the top of the text, because a form
  // makes the text column much taller than the photo.
  const classes = [styles.header, hero ? styles.withHero : '', children ? styles.withExtra : ''];

  return (
    <header className={classes.join(' ')}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow.toUpperCase()}</p>
        <h1 className={styles.heading}>{title}</h1>
        <p className={styles.intro}>{text}</p>
        {children && <div className={styles.extra}>{children}</div>}
      </div>

      {/* The photo loads straight away (no loading="lazy"): it is at the top
          of the page, so the visitor sees it immediately. */}
      {hero && (
        <div className={styles.photoFrame}>
          <img className={styles.photo} src={hero.src} alt={hero.alt} width="720" height="900" />
        </div>
      )}
    </header>
  );
}
