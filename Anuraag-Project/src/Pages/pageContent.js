// Text for the pages that do not have their full content yet.
// Each one is drawn by PlaceholderPage.jsx. When a page gets its real content
// (later phases), it gets its own component and its entry here is removed.
//   eyebrow - small gold label above the heading
//   title   - the page heading
//   text    - one or two sentences under the heading
//   form    - settings for a form under the text (see LeadForm.jsx); optional
//   comingSoon - a short note in a dashed box about something still to come; optional
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
    text: 'Articles on family business, leadership and governance are being added to this page. Leave your email to get a monthly update when new ones are published.',
    form: {
      source: 'updates',
      consentLabel: 'I agree to receive email updates from Dr. Anuraag Guglaani. I can unsubscribe at any time.',
      consentRequired: true,
      buttonLabel: 'Subscribe',
      successTitle: 'You are subscribed.',
      successText: 'Thank you. New articles and updates will be sent to your email.'
    },
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
    text: 'For speaking, board, advisory and academic inquiries, send a message below and the team will reply by email.',
    form: {
      source: 'contact',
      showName: true,
      showMessage: true,
      consentLabel: 'Also send me occasional updates from Dr. Anuraag Guglaani. (Optional)',
      buttonLabel: 'Send Message',
      successTitle: 'Message sent.',
      successText: 'Thank you. The team will reply to you by email.'
    },
    comingSoon: 'Online booking for consultations is being added to this page.',
    cta: { label: 'Message on LinkedIn', to: 'https://www.linkedin.com/in/anuraagguglaani', external: true }
  }
};
