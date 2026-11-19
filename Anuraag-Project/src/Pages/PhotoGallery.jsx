import { strikeNot } from '../utils/strikeNot';
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
 *     video   - optional { href, title, text, meta }: a card under the
 *               photos linking to a video on another website
 */
export default function PhotoGallery({ gallery }) {
  const { id, eyebrow, heading, text, columns = 3, photos, video } = gallery;

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

        {/* Optional video card. The whole card is one link that opens the
            video in a new tab; rel="noopener noreferrer" stops the other
            site from controlling this page. strikeNot crosses out "Not" in
            the book title. */}
        {video && (
          <a className={styles.video} href={video.href} target="_blank" rel="noopener noreferrer">
            {/* Gold round play button (drawn with a small triangle) */}
            <span className={styles.play} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </span>
            <span className={styles.videoCopy}>
              <span className={styles.videoTitle}>{strikeNot(video.title)}</span>
              <span className={styles.videoText}>{video.text}</span>
              <span className={styles.captionMeta}>{video.meta}</span>
            </span>
            <span className={styles.videoAction}>Watch ↗</span>
          </a>
        )}
      </div>
    </section>
  );
}
