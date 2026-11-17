// Shared details for the book launch promotion: the banner at the top of
// every page, the card on the Home and Book pages, and the pop-up.
// (The event page itself has its own copy in Event/EventPage.jsx.)

export const EVENT_PROMO = {
  link: '/event',
  eyebrow: 'Official World Record Attempt',
  title: 'Most Nationalities Participating in a Digital Book Launch',
  shortTitle: 'World Record Book Launch',
  dateLabel: '22 November 2026',
  shortDate: '22 Nov',
  timeLabel: '3:00 PM GST',
  formatLabel: 'Online via Zoom',
  poster: '/client_images/event_poster_small.jpg', // a smaller copy of event_poster.jpg
  buttonLabel: 'Register for free'
};

// When the promotion stops showing: 22 November 2026, 6:00 PM Dubai time
// (the event starts at 3:00 PM, so this leaves time for latecomers).
// "+04:00" is Dubai's time zone, so it is right for visitors anywhere.
const PROMO_ENDS_AT = new Date('2026-11-22T18:00:00+04:00');

// True until the event is over. Every promotion checks this, so they all
// disappear by themselves afterwards: no change to the site is needed.
export function isEventPromoActive() {
  return Date.now() < PROMO_ENDS_AT.getTime();
}
