import { useState } from 'react';
import Link from '../router/Link';
import { trackCtaClick } from '../utils/analytics';
import { EVENT_PROMO, isEventPromoActive } from './eventPromo';
import styles from './EventPromo.module.css';

// When a visitor closes the banner we remember it in their browser, so it
// stays closed on every page and on later visits. (If the browser blocks
// this storage, e.g. some private windows, the banner simply comes back on
// the next visit, which is harmless.)
const CLOSED_KEY = 'eventBannerClosed-2026-11-22';

function hasClosedBanner() {
  try {
    return window.localStorage.getItem(CLOSED_KEY) === 'yes';
  } catch {
    return false;
  }
}

function rememberBannerClosed() {
  try {
    window.localStorage.setItem(CLOSED_KEY, 'yes');
  } catch {
    // Storage blocked: nothing to do.
  }
}

/**
 * EventBanner — a thin gold strip above the header on every page, linking
 * to the event registration page, with a ✕ to close it.
 * Hides itself once the event is over or once the visitor closes it.
 */
export default function EventBanner() {
  // Starts hidden if the visitor closed it before (checked once, on load).
  const [isClosed, setIsClosed] = useState(hasClosedBanner);

  if (!isEventPromoActive() || isClosed) return null;

  function close() {
    rememberBannerClosed();
    setIsClosed(true);
  }

  return (
    // The strip is a box holding two things side by side: the link (most of
    // the strip) and the close button on the right. The button is kept
    // outside the link so clicking ✕ does not also open the event page.
    <div className={styles.bannerWrap}>
      <Link
        to={EVENT_PROMO.link}
        className={styles.banner}
        onClick={() => trackCtaClick('Event banner', 'top_banner', EVENT_PROMO.link)}
      >
        {/* The longer wording is hidden on phones (see .bannerLong in the CSS) */}
        <span className={styles.bannerText}>
          <strong>{EVENT_PROMO.shortTitle}</strong>
          <span className={styles.bannerLong}> · {EVENT_PROMO.dateLabel}, {EVENT_PROMO.timeLabel} · {EVENT_PROMO.formatLabel}</span>
          <span className={styles.bannerShort}> · {EVENT_PROMO.shortDate}, {EVENT_PROMO.timeLabel}</span>
        </span>
        <span className={styles.bannerAction}>
          {EVENT_PROMO.buttonLabel} <span aria-hidden="true">→</span>
        </span>
      </Link>
      <button type="button" className={styles.bannerClose} onClick={close} aria-label="Close the event banner">
        ✕
      </button>
    </div>
  );
}
