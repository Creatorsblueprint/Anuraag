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
  event: { page: 'event', title: 'Event Registration | Dr. Anuraag Guglaani' }
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
// They still open the home page and scroll to the matching section.
// The key is the address, the value is the id of the section to scroll to.
// (Addresses that are now real pages, like /about and /book, are in PAGES above.)
export const HOME_SECTIONS = {
  ebook: 'book',
  'you-will-not-fly': 'book',
  'the-living-charter': 'book',
  story: 'story',
  'about-me': 'story',
  'about-us': 'story',
  'the-man': 'story',
  'the-story': 'story',
  lectern: 'story',
  expertise: 'expertise',
  'the-work': 'expertise',
  work: 'expertise',
  pillars: 'expertise',
  'six-verbs': 'expertise',
  diagnostics: 'expertise',
  practice: 'expertise',
  'the-practice': 'expertise',
  leadership: 'roles',
  roles: 'roles',
  falcons: 'falcons',
  'falcons-of-majlis': 'falcons',
  videos: 'videos',
  media: 'videos',
  recognition: 'recognition',
  honors: 'recognition',
  affiliations: 'recognition',
  faq: 'faq',
  purchase: 'purchase',
  order: 'purchase',
  top: 'top',
  overview: 'overview',
  home: 'overview'
};
