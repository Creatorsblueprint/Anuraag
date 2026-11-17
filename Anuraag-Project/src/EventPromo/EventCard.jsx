import Link from '../router/Link';
import { trackCtaClick } from '../utils/analytics';
import { EVENT_PROMO, isEventPromoActive } from './eventPromo';
import styles from './EventPromo.module.css';

/**
 * EventCard — a section with the event poster, the details and a
 * "Register for free" button. Used on the Home and Book pages.
 * Hides itself once the event is over.
 *
 * Props:
 *   location - where the card is ("home" or "book"), for analytics
 */
export default function EventCard({ location }) {
  if (!isEventPromoActive()) return null;

  return (
    <section className={styles.cardSection} aria-labelledby={`event-card-${location}`}>
      <div className={styles.card}>
        <img
          className={styles.cardPoster}
          src={EVENT_PROMO.poster}
          alt={`Event poster: ${EVENT_PROMO.title}, ${EVENT_PROMO.dateLabel}`}
          loading="lazy"
        />
        <div className={styles.cardBody}>
          <p className={styles.eyebrow}>{EVENT_PROMO.eyebrow.toUpperCase()}</p>
          <h2 className={styles.cardTitle} id={`event-card-${location}`}>{EVENT_PROMO.title}</h2>
          <p className={styles.cardText}>
            Join readers from around the world for the launch of <em>You Will Not Fly</em>, hosted by
            Dr. Anuraag Guglaani, and help set a world record by representing your nationality.
          </p>

          {/* Date, time and place in three small columns */}
          <dl className={styles.details}>
            <div>
              <dt>Date</dt>
              <dd>{EVENT_PROMO.dateLabel}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{EVENT_PROMO.timeLabel}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{EVENT_PROMO.formatLabel}</dd>
            </div>
          </dl>

          <Link
            to={EVENT_PROMO.link}
            className={styles.button}
            onClick={() => trackCtaClick('Event card', `${location}_event_card`, EVENT_PROMO.link)}
          >
            {EVENT_PROMO.buttonLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
