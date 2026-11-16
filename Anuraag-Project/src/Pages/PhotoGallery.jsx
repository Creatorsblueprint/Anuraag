import styles from './PhotoGallery.module.css';

/**
 * PhotoGallery — a section of photographs, each with a name and a detail
 * line underneath. Used on the Book page ("The book on stage") and on the
 * About page ("In good company"). The list of photographs for each gallery
 * lives in photoGalleries.js.
 *
 * Props:
 *   gallery - one entry from photoGalleries.js:
 *     { id, eyebrow, heading, text, columns, photos }
 *     columns - how many photographs per row on wide screens (2, 3 or 4)
 *     photos  - list of { src, title, meta }  (meta is optional)
 */
export default function PhotoGallery({ gallery }) {
  const { id, eyebrow, heading, text, columns = 3, photos } = gallery;

  return (
    <section className={styles.section} id={id}>
      <div className={styles.wrap}>
        {/* Top of the section: small gold label, heading and one sentence */}
        <header className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow.toUpperCase()}</p>
          <h2 className={styles.heading}>{heading}</h2>
          {text && <p className={styles.text}>{text}</p>}
        </header>

        {/* "--columns" hands the number of columns to the CSS file.
            loading="lazy" makes the browser fetch a photograph only when the
            visitor scrolls near it, so the page opens quickly. */}
        <ul className={styles.grid} style={{ '--columns': columns }}>
          {photos.map((photo) => (
            <li className={styles.card} key={photo.src}>
              <figure className={styles.figure}>
                <img
                  className={styles.photo}
                  src={photo.src}
                  alt={`${photo.title}${photo.meta ? `, ${photo.meta}` : ''}`}
                  loading="lazy"
                />
                <figcaption className={styles.caption}>
                  <span className={styles.captionTitle}>{photo.title}</span>
                  {photo.meta && <span className={styles.captionMeta}>{photo.meta}</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
