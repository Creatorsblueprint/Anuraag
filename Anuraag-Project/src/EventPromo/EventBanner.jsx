import Link from '../router/Link';
import { trackCtaClick } from '../utils/analytics';
import { EVENT_PROMO, isEventPromoActive } from './eventPromo';
import styles from './EventPromo.module.css';

/**
 * EventBanner — a thin gold strip above the header on every page, linking
 * to the event registration page. Hides itself once the event is over.
 */
export default function EventBanner() {
  if (!isEventPromoActive()) return null;

  return (
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
  );
}
