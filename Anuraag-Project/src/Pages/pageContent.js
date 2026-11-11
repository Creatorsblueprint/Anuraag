// Text for the pages that do not have their full content yet.
// Each one is drawn by PlaceholderPage.jsx. When a page gets its real content
// (later phases), it gets its own component and its entry here is removed.
//   eyebrow - small gold label above the heading
//   title   - the page heading
//   text    - one or two sentences under the heading
//   cta     - the button: its label and where it goes (leave out for no button)
export const PAGE_CONTENT = {
  speaking: {
    eyebrow: 'Speaking',
    title: 'Keynotes and conference talks',
    text: 'For conference producers and event organisers. Topics, formats and past talks are being added to this page.',
    cta: { label: 'Start a Conversation', to: '/contact' }
  },
  'board-advisory': {
    eyebrow: 'Board & Advisory',
    title: 'Board and advisory work',
    text: 'For family business chairs, founders and investors. Details of board and advisory engagements are being added to this page.',
    cta: { label: 'Start a Conversation', to: '/contact' }
  },
  academic: {
    eyebrow: 'Academic',
    title: 'Academic leadership and teaching',
    text: 'For university leaders and academic boards. Teaching, research and academic roles are being added to this page.',
    cta: { label: 'Start a Conversation', to: '/contact' }
  },
  insights: {
    eyebrow: 'Insights',
    title: 'Articles and ideas',
    text: 'Articles on family business, leadership and governance are being added to this page.',
    cta: { label: 'Get the Book', to: '/book' }
  },
  'media-kit': {
    eyebrow: 'Media Kit',
    title: 'Media and speaker kit',
    text: 'Biography, photographs and speaker details for organisers and journalists are being added to this page.',
    cta: { label: 'Start a Conversation', to: '/contact' }
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Start a conversation',
    text: 'The inquiry form is being added to this page. Until then, the quickest way to reach Dr. Anuraag Guglaani is on LinkedIn.',
    cta: { label: 'Message on LinkedIn', to: 'https://www.linkedin.com/in/anuraagguglaani', external: true }
  }
};
