// Photographs shown by PhotoGallery.jsx.
// The pictures are in public/gallery (cropped, shrunk copies of the photos
// supplied by the client, November 2026).
//   id      - lets a link jump to the section, e.g. /about#company
//   eyebrow - small gold label above the heading
//   heading - the section heading
//   text    - one sentence under the heading (optional)
//   columns - photographs per row on wide screens
//   photos  - each one: { src, title, meta }  (meta is optional)
//   video   - optional video, shown as a card under the photos that plays
//             it in a pop-up: { src, title, text, meta }

// Book page: the book at recent events.
// Names and event details confirmed by the client (17 November 2026).
// Falcons of Majlis was filmed for the show, so those photos carry no date.
export const BOOK_ON_STAGE = {
  id: 'on-stage',
  eyebrow: 'On Stage',
  heading: 'The book on stage',
  text: 'From its first launch at Falcons of Majlis to the Vibrant Goa Global Business Summit.',
  columns: 4,
  photos: [
    { src: '/gallery/book-launch-falcons-1.jpg', title: 'With Chitrangada Singh', meta: 'Falcons of Majlis · First book launch' },
    { src: '/gallery/book-launch-falcons-2.jpg', title: 'With Suniel Shetty', meta: 'Falcons of Majlis · First book launch' },
    { src: '/gallery/vibrant-goa-book.jpg', title: 'With Dr. Pramod Sawant, Chief Minister of Goa', meta: 'Vibrant Goa Global Business Summit · October 2026' },
    { src: '/gallery/vibrant-goa-trophy.jpg', title: 'Honoured on stage', meta: 'Vibrant Goa Global Business Summit · October 2026' }
  ],
  // Short video Dr. Guglaani posted on LinkedIn (November 2026), saved into
  // public/videos so it plays on this page instead of sending visitors away.
  video: {
    src: '/videos/suniel-shetty-on-the-book.mp4',
    title: 'Suniel Shetty on You Will Not Fly',
    text: 'Actor and entrepreneur Suniel Shetty talks about the book in Dubai.',
    meta: '30-second video'
  }
};

// About page: Dr. Guglaani with leaders in government, business and public
// life. Names and titles are the ones supplied with the photographs.
export const IN_GOOD_COMPANY = {
  id: 'company',
  eyebrow: 'In Good Company',
  heading: 'With leaders across the world',
  text: 'Meetings with leaders in government, business and public life.',
  columns: 5,
  photos: [
    {
      src: '/gallery/crown-prince-of-fujairah.jpg',
      title: 'H.H. Sheikh Mohammed bin Hamad bin Mohammed Al Sharqi',
      meta: 'Crown Prince of Fujairah'
    },
    {
      src: '/gallery/minister-of-foreign-trade.jpg',
      title: 'H.E. Thani bin Ahmed Al Zeyoudi',
      meta: 'UAE Minister of Foreign Trade'
    },
    {
      src: '/gallery/ministry-of-economy.jpg',
      title: 'H.E. Abdulla Ahmed Al Saleh',
      meta: 'Undersecretary, UAE Ministry of Economy'
    },
    {
      src: '/gallery/hamriyah-free-zone.jpg',
      title: 'H.E. Saud Salim Al Mazrouei',
      meta: 'Director, Hamriyah Free Zone Authority and Sharjah Airport International Free Zone'
    },
    {
      src: '/gallery/bosnia-foreign-minister.jpg',
      title: 'Elmedin Konaković',
      meta: 'Minister of Foreign Affairs of Bosnia and Herzegovina'
    },
    {
      src: '/gallery/shashi-tharoor.jpg',
      title: 'Dr. Shashi Tharoor',
      meta: 'Member of Parliament (Lok Sabha), former UN Under-Secretary-General'
    },
    {
      src: '/gallery/surinder-nath.jpg',
      title: 'Lt. Gen. Surinder Nath, PVSM, AVSM (Retd.)',
      meta: 'Former Vice Chief of the Army Staff, former Chairman, UPSC'
    },
    {
      src: '/gallery/romona-murad.jpg',
      title: 'H.H. Princess Dato’ Seri (Dr.) Romona Murad',
      meta: 'Founder and President, Romona International'
    },
    {
      src: '/gallery/salman-lutfi.jpg',
      title: 'Salman Lutfi',
      meta: 'Founder, Lutfi & Co Advocates and Legal Consultants'
    },
    {
      src: '/gallery/bse-institute.jpg',
      title: 'Ambarsh Datta',
      meta: 'MD and CEO, BSE Institute Ltd'
    }
  ]
};
