import { useRef, useState } from 'react';
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
 *     videos  - optional list of videos, each a card under the photos that
 *               plays it in a pop-up: { src, ... } for a file in /public,
 *               or { youtube, vertical, ... } for a YouTube video
 */

/**
 * VideoCard — a card with a play button. Clicking it opens the video in a
 * pop-up player on this page, so the visitor never leaves the site.
 * The pop-up is the browser's own <dialog> element: showModal() dims the
 * page behind it, and the Esc key closes it without any extra code.
 */
function VideoCard({ video }) {
  // useRef gives us a handle on the <dialog> and <video> elements, so the
  // buttons can open and close the pop-up and start or stop the video.
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  // For a YouTube video: true while the pop-up is open. The YouTube player
  // is only put on the page while this is true, so nothing is loaded from
  // YouTube until the visitor presses play, and closing removes the player,
  // which stops the video.
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    dialogRef.current.showModal();
    setIsOpen(true);
    videoRef.current?.play().catch(() => {}); // some browsers block autoplay; the controls still work
  }

  function close() {
    dialogRef.current.close();
  }

  // Runs however the pop-up is closed (button, Esc or a click outside).
  function handleClose() {
    setIsOpen(false);
    videoRef.current?.pause();
  }

  return (
    <>
      <button type="button" className={styles.video} onClick={open}>
        {/* Gold round play button (drawn with a small triangle) */}
        <span className={styles.play} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
        </span>
        <span className={styles.videoCopy}>
          {/* strikeNot crosses out "Not" in the book title */}
          <span className={styles.videoTitle}>{strikeNot(video.title)}</span>
          <span className={styles.videoText}>{video.text}</span>
          <span className={styles.captionMeta}>{video.meta}</span>
        </span>
        <span className={styles.videoAction}>Play ▶</span>
      </button>

      {/* The pop-up. "onClose" runs however it is closed (button, Esc or a
          click outside), and pauses the video so it does not keep playing.
          A click on the dark area outside the video lands on the <dialog>
          itself, so "event.target === event.currentTarget" means "outside". */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={video.title}
        onClose={handleClose}
        onClick={(event) => event.target === event.currentTarget && close()}
      >
        <div className={styles.dialogInner}>
          <button type="button" className={styles.close} onClick={close} aria-label="Close video">
            ✕
          </button>
          {video.youtube ? (
            // YouTube's player. youtube-nocookie.com is YouTube's privacy
            // mode (no tracking cookies until the visitor plays the video);
            // rel=0 keeps the suggested videos at the end to this channel.
            isOpen && (
              <iframe
                className={`${styles.youtube} ${video.vertical ? styles.youtubeVertical : ''}`}
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtube)}?autoplay=1&rel=0`}
                title={video.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            )
          ) : (
            // preload="metadata" fetches only the first frame and length until
            // the visitor presses play; playsInline stops iPhones from forcing
            // full screen.
            <video
              ref={videoRef}
              className={styles.player}
              src={video.src}
              controls
              playsInline
              preload="metadata"
            />
          )}
        </div>
      </dialog>
    </>
  );
}
export default function PhotoGallery({ gallery }) {
  const { id, eyebrow, heading, text, columns = 3, photos, videos = [] } = gallery;

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

        {/* Optional video cards, each playing its video in a pop-up */}
        {videos.map((video) => (
          <VideoCard video={video} key={video.youtube || video.src} />
        ))}
      </div>
    </section>
  );
}
