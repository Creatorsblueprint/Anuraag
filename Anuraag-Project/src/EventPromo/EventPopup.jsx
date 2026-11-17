import { useEffect, useState } from 'react';
import Link from '../router/Link';
import { trackCtaClick } from '../utils/analytics';
import { EVENT_PROMO, isEventPromoActive } from './eventPromo';
import styles from './EventPromo.module.css';

// The pop-up appears this long after the page opens, so it does not get in
// the way of the first look at the site.
const POPUP_DELAY_MS = 5000;

// Once a visitor closes the pop-up we remember it in their browser, so it is
// shown only once. (Some browsers block this storage, e.g. private windows;
// then the pop-up may show again on a later visit, which is harmless.)
const SEEN_KEY = 'eventPopupSeen-2026-11-22';

function hasSeenPopup() {
  try {
    return window.localStorage.getItem(SEEN_KEY) === 'yes';
  } catch {
    return false;
  }
}

function rememberPopupSeen() {
  try {
    window.localStorage.setItem(SEEN_KEY, 'yes');
  } catch {
    // Storage blocked: nothing to do.
  }
}

/**
 * EventPopup — a one-time pop-up with the event poster and a
 * "Register for free" button. Closes with the ✕, the Esc key, a click
 * outside it, or "Maybe later". Does not appear once the event is over.
 */
export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Open after a short wait, unless already seen or the event is over.
  useEffect(() => {
    if (!isEventPromoActive() || hasSeenPopup()) return;
    const timer = setTimeout(() => setIsOpen(true), POPUP_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // While open: Esc closes it, and the page behind does not scroll.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        rememberPopupSeen();
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function close() {
    rememberPopupSeen();
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay} onClick={close}>
      {/* stopPropagation: a click inside the box must not close it */}
      <div
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.popupClose} onClick={close} aria-label="Close">
          ✕
        </button>
        <img className={styles.popupPoster} src={EVENT_PROMO.poster} alt="" />
        <div className={styles.popupBody}>
          <p className={styles.eyebrow}>{EVENT_PROMO.eyebrow.toUpperCase()}</p>
          <h2 className={styles.popupTitle} id="event-popup-title">{EVENT_PROMO.title}</h2>
          <p className={styles.popupText}>
            {EVENT_PROMO.dateLabel} · {EVENT_PROMO.timeLabel} · {EVENT_PROMO.formatLabel}
          </p>
          <Link
            to={EVENT_PROMO.link}
            className={styles.button}
            onClick={() => {
              trackCtaClick('Event popup', 'event_popup', EVENT_PROMO.link);
              close();
            }}
          >
            {EVENT_PROMO.buttonLabel} <span aria-hidden="true">→</span>
          </Link>
          <button type="button" className={styles.popupLater} onClick={close}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
