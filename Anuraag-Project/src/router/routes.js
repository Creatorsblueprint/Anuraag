// Every page of the website, in one place.
// The key is the address ("" is the home page, "speaking" is /speaking).
//   page  - which page App.jsx should draw
//   title - text shown in the browser tab
export const PAGES = {
  '': { page: 'home', title: 'Dr. Anuraag Guglaani | The Family Business Doctor™' },
  about: { page: 'about', title: 'About | Dr. Anuraag Guglaani' },
  speaking: { page: 'speaking', title: 'Speaking | Dr. Anuraag Guglaani' },
  'board-advisory': { page: 'board-advisory', title: 'Board & Advisory | Dr. Anuraag Guglaani' },
  academic: { page: 'academic', title: 'Academic | Dr. Anuraag Guglaani' },
  book: { page: 'book', title: 'The Book | Dr. Anuraag Guglaani' },
  insights: { page: 'insights', title: 'Insights | Dr. Anuraag Guglaani' },
  'media-kit': { page: 'media-kit', title: 'Media Kit | Dr. Anuraag Guglaani' },
  contact: { page: 'contact', title: 'Contact | Dr. Anuraag Guglaani' },
  // Same title as the event page sets for itself (EventPage.jsx) and as the
  // shared-link preview uses (vite-plugin-event-page.js). Keep the three in step.
  event: { page: 'event', title: 'Virtual Book Launch & World Record Attempt | Dr. Anuraag Guglaani' }
};

// Links in the top menu, in the order the client asked for.
export const MENU_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Speaking', to: '/speaking' },
  { label: 'Board & Advisory', to: '/board-advisory' },
  { label: 'Academic', to: '/academic' },
  { label: 'Book', to: '/book' },
  { label: 'Insights', to: '/insights' },
  { label: 'Media Kit', to: '/media-kit' },
  { label: 'Contact', to: '/contact' }
];

// Older short addresses that are already shared or indexed (e.g. /falcons).
// Each one is sent on to the page and section where that content lives now
// (the homepage was shortened in November 2026, so most sections moved to
// the inner pages). The key is the old address, the value the new one.
// (Addresses that are real pages, like /about and /book, are in PAGES above.)
export const OLD_ADDRESSES = {
  ebook: '/book',
  'you-will-not-fly': '/book',
  'the-living-charter': '/book',
  faq: '/book#faq',
  purchase: '/book#purchase',
  order: '/book#purchase',
  story: '/about#story',
  'about-me': '/about#story',
  'about-us': '/about#story',
  'the-man': '/about#story',
  'the-story': '/about#story',
  lectern: '/about#story',
  expertise: '/about#expertise',
  'the-work': '/about#expertise',
  work: '/about#expertise',
  pillars: '/about#expertise',
  'six-verbs': '/about#expertise',
  diagnostics: '/about#expertise',
  practice: '/about#expertise',
  'the-practice': '/about#expertise',
  leadership: '/about#roles',
  roles: '/about#roles',
  recognition: '/about#recognition',
  honors: '/about#recognition',
  affiliations: '/about#recognition',
  falcons: '/media-kit#falcons',
  'falcons-of-majlis': '/media-kit#falcons',
  videos: '/media-kit#videos',
  media: '/media-kit#videos',
  top: '/',
  overview: '/',
  home: '/'
};
