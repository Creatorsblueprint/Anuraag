// Text for the simple pages of the site.
// A page with "sections" is drawn by ContentPage.jsx; the others (still
// waiting for their full content) are drawn by PlaceholderPage.jsx.
// The Speaking, Board & Advisory, Academic and Media Kit text comes from
// Dr. Guglaani's public LinkedIn profile (November 2026).
//   eyebrow - small gold label above the heading
//   title   - the page heading
//   text    - one or two sentences under the heading
//   sections - lists of cards under the text. A page that has this is drawn by
//              ContentPage.jsx instead. Each section: { heading, items }, and each
//              item: { title, meta, text } (meta and text are optional).
//              A section can instead have "images" (a picture gallery):
//              { heading, images }, each image: { src, title, meta }
//   form    - settings for a form under the text (see LeadForm.jsx); optional
//   comingSoon - a short note in a dashed box about something still to come; optional
//   cta     - the button: its label and where it goes (leave out for no button)
export const PAGE_CONTENT = {
  speaking: {
    eyebrow: 'Speaking',
    title: 'Keynotes, panels and juries',
    text: 'Dr. Guglaani speaks on family business, transformation and turnaround, entrepreneurship and investment, and the link between universities and industry, drawing on work across 26 industries and 35 countries.',
    sections: [
      {
        heading: 'Recent and upcoming',
        items: [
          {
            title: 'QS Higher Ed Summit: Middle East 2026',
            meta: 'Speaker · Abu Dhabi · 22–24 November 2026',
            text: 'How to move beyond collaboration and build university–industry partnerships that drive growth.'
          },
          {
            title: 'SME Governance Summit 2026',
            meta: 'BSE, Mumbai · 26 August 2026',
            text: 'Hosted by MentorMyBoard, on governance for small and mid-sized enterprises.'
          },
          {
            title: 'RISE 2026',
            meta: 'Speaker · Panaji, Goa · 19 June 2026',
            text: 'The inaugural COGGE Leadership Forum, an initiative of the Vibrant Goa Foundation.'
          },
          {
            title: 'IEEE ICERAI 2026',
            meta: 'Paper · American University of Ras Al Khaimah · 1–3 April 2026',
            text: 'A framework for deploying explainable AI and intelligent automation in family businesses and mid-sized enterprises.'
          },
          {
            title: 'Education Investment MENA 2026',
            meta: 'Panellist · GESS Dubai',
            text: 'Panel: “How Can Education Ecosystems Help Build the Workforce of Tomorrow?”'
          },
          {
            title: 'StartUp Spotlight',
            meta: 'Jury member · Education Investment MENA 2026',
            text: 'Judged six education startups from six countries pitching to investors.'
          },
          {
            title: 'Falcons of Majlis',
            meta: 'Falcon (investor) · United Arab Emirates',
            text: 'An investor on the UAE’s televised startup funding show.'
          }
        ]
      },
      {
        heading: 'Topics',
        items: [
          {
            title: 'Family business',
            text: 'Governance, succession and generational change in family-owned groups.'
          },
          {
            title: 'Transformation and turnaround',
            text: 'Making businesses profitable, scalable, sustainable and investable.'
          },
          {
            title: 'Entrepreneurship and investment',
            text: 'What founders need to show, and what investors should look for.'
          },
          {
            title: 'Education and industry',
            text: 'Connecting universities, business and government to build future talent.'
          }
        ]
      }
    ],
    // "Invite Dr. Anuraag to speak" form (the client asked for these boxes).
    // Sent to the backend as a "speaking" lead and passed on to Zoho.
    form: {
      id: 'invite',
      heading: 'Invite Dr. Anuraag to speak',
      text: 'Tell us about your event and the team will get back to you by email.',
      source: 'speaking',
      showName: true,
      showSpeaking: true,
      showMessage: true,
      messageRequired: false,
      messageLabel: 'Anything else (optional)',
      messagePlaceholder: 'Topic, session length, panel or keynote…',
      consentLabel: 'Also send me occasional updates from Dr. Anuraag Guglaani. (Optional)',
      buttonLabel: 'Send Invitation',
      successTitle: 'Invitation sent.',
      successText: 'Thank you. The team will reply to you by email.'
    }
  },
  'board-advisory': {
    eyebrow: 'Board & Advisory',
    title: 'Board and advisory roles',
    text: 'Dr. Guglaani serves on the boards of family business groups and institutions across the Middle East, Africa, Asia and North America, and mentors the next generation of directors and founders.',
    sections: [
      {
        heading: 'Current board roles',
        items: [
          {
            title: 'Chairperson of the Board',
            meta: 'Wazir Holdings · 2022 – present',
            text: 'A multi-family office formed by eight large family business groups.'
          },
          {
            title: 'Board Member',
            meta: 'Wazir Advisors UAE · 2022 – present',
            text: 'A strategy and business transformation firm covering the Middle East, South Asia and Africa.'
          },
          {
            title: 'Board Member',
            meta: 'Asmara Holdings · 2022 – present',
            text: 'A family-owned multinational group based in Dubai, with business units in more than 20 countries.'
          },
          {
            title: 'Board Member',
            meta: 'ADAM Global · 2026 – present',
            text: 'Including ADAM Global Network and ADAM Global Auditing & Accounting.'
          },
          {
            title: 'Board Member',
            meta: 'International Business and Investment Union · 2025 – present'
          },
          {
            title: 'Board Member',
            meta: 'Pan African Leadership and Entrepreneurship Development Centre · 2023 – present',
            text: 'A non-governmental organisation working to increase trade and investment in Africa.'
          }
        ]
      },
      {
        heading: 'Mentoring',
        items: [
          {
            title: 'Board and Directorship Mentor',
            meta: 'MentorMyBoard · 2025 – present',
            text: 'Training and mentoring aspiring directors for board-level positions.'
          },
          {
            title: 'Mentor',
            meta: 'Startup World Cup · 2025 – present',
            text: 'A global startup pitch competition with regional events in more than 60 countries.'
          }
        ]
      },
      {
        heading: 'Executive career',
        items: [
          { title: 'Chief Executive Officer', meta: 'Easa Saleh Al Gurg Group · Dubai · 2011 – 2016' },
          { title: 'Senior Partner', meta: 'Global audit, tax and consulting firms · 2017 – 2022' },
          { title: 'Group Chief Operating Officer', meta: 'Nehmeh · Doha · 2016 – 2017' },
          { title: 'Director', meta: 'Abdul Latif Jameel · Saudi Arabia · 2009 – 2011' },
          { title: 'Group General Manager, GCC Operations', meta: 'Jumbo Electronics · UAE · 2005 – 2009' },
          { title: 'Group General Manager', meta: 'OTE Group · Muscat · 2001 – 2005' }
        ]
      }
    ],
    cta: { label: 'Start a Conversation', to: '/contact' }
  },
  academic: {
    eyebrow: 'Academic',
    title: 'Academic leadership and teaching',
    text: 'Dr. Guglaani teaches future business leaders and entrepreneurs, and helps universities connect their strategy and curriculum to what industry needs.',
    sections: [
      {
        heading: 'Teaching and governance',
        items: [
          {
            title: 'Adjunct Professor',
            meta: 'American University of Ras Al Khaimah · 2026 – present',
            text: 'Entrepreneurship, International Business (MBA), Service Marketing and Data Analytics.'
          },
          {
            title: 'Chair, KITE Advisory Board',
            meta: 'American University of Ras Al Khaimah · 2025 – present'
          },
          {
            title: 'Member, Business Advisory Council',
            meta: 'American University of Ras Al Khaimah · 2025 – present'
          },
          {
            title: 'Programme Review Committee, Management',
            meta: 'Symbiosis International University Dubai · 2025 – present'
          },
          {
            title: 'Vice Chair, PADIA',
            meta: 'Dubai International Academy · 2021 – present'
          }
        ]
      },
      {
        heading: 'Education',
        items: [
          {
            title: 'Doctorate, Information Management Systems',
            meta: 'American Heritage University',
            text: 'Intelligent automation and technology governance.'
          },
          {
            title: 'Master of Business Administration',
            meta: 'Symbiosis Institute of Management Studies',
            text: 'Specialisation in Finance and Marketing.'
          },
          {
            title: 'Executive programmes',
            meta: 'IMD · INSEAD · New York University · IIM Ahmedabad',
            text: 'Organisational leadership, wealth management and investment leadership.'
          },
          {
            title: 'Fellowship, Management and Leadership',
            meta: 'Chartered Management Institute'
          },
          {
            title: 'Air Force officer training',
            meta: 'National Defence Academy, Khadakvasla',
            text: 'Trained as a fighter pilot and military officer. The story behind the book.'
          },
          {
            title: 'Certified Information Security Manager (CISM)',
            meta: 'ISACA, USA'
          }
        ]
      }
    ],
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
    text: 'Dr. Anuraag Guglaani, The Family Business Doctor, is a transformation and turnaround expert, Group CEO, chairperson and investor-operator who has worked across 26 industries and 35 countries. He is an adjunct professor, a Falcon on Falcons of Majlis and the author of You Will Not Fly.',
    sections: [
      {
        heading: 'At a glance',
        items: [
          { title: '26 industries, 35 countries', text: 'Operating, investing in and transforming businesses.' },
          { title: 'The Family Business Doctor', text: 'Board member and advisor to family business groups.' },
          { title: 'Author', text: 'You Will Not Fly: Grounded at Twenty, Airborne Ever Since.' },
          { title: 'Based in Dubai', text: 'Working across the Middle East, Africa, Asia and North America.' }
        ]
      },
      {
        heading: 'Honours',
        items: [
          { title: 'US President’s Lifetime Achievement Award', meta: 'The White House, Washington DC' },
          { title: 'President’s Volunteer Service Medal 2023', meta: 'AmeriCorps and the Office of the President, USA' },
          { title: 'UAE International Excellence Award 2023', meta: 'Dubai' },
          {
            title: 'Transformational Leader, Lead Like Mandela Award 2023',
            meta: 'World Youth Forum, under the patronage of H.E. Ndileka Mandela'
          },
          { title: 'Global Humanitarian Award 2023', meta: 'Global International Alliance, USA' },
          {
            title: 'Top 100 Change Maker 2020, 2021 and 2022',
            meta: 'Pan African Leadership and Entrepreneurship Development Centre'
          },
          {
            title: 'The Legacy Circle 2025',
            meta: 'Global Visionary in Business Transformation and Governance · Dubai'
          },
          {
            title: 'International Excellence Award',
            meta: 'IBI Union · Driving SME turnarounds and transformations across continents'
          },
          { title: 'Realtek Awards 2025', meta: 'Excellence in Professional Services · Dubai' },
          { title: 'Indywood Business Excellence Award 2025', meta: 'Indywood Billionaires Club · Dubai' },
          { title: 'Global Icon of the Year 2022', meta: 'Pan African Youth Leadership Foundation' },
          { title: 'The Super 100', meta: 'GrayMatter in association with Gulf News' }
        ]
      },
      {
        // Picture gallery. The pictures are in public/awards (shrunk copies
        // of the photos supplied by the client, November 2026).
        heading: 'Awards and recognition',
        images: [
          // Phone photos of the framed originals (no digital copies exist):
          // only cropped, straightened and lightly brightened. The wording on
          // the documents is exactly as printed.
          {
            src: '/awards/presidents-lifetime-achievement-2023.jpg',
            title: "President's Lifetime Achievement Award",
            meta: 'AmeriCorps and the Office of the US President · 2023'
          },
          {
            src: '/awards/white-house-letter-2023.jpg',
            title: 'Letter from the White House',
            meta: "With the President's Lifetime Achievement Award · 2023"
          },
          { src: '/awards/uae-excellence-plate.jpg', title: 'International Excellence Awards U.A.E', meta: 'Honouring plate' },
          { src: '/awards/super-100-profile.jpg', title: 'The Super 100 profile', meta: 'GrayMatter · Revolutionising family businesses' },
          { src: '/awards/legacy-circle-2025.jpg', title: 'The Legacy Circle', meta: 'Global Leadership Summit 2025' },
          { src: '/awards/ibi-union-excellence.jpg', title: 'International Excellence Award', meta: 'IBI Union' },
          { src: '/awards/realtek-awards-2025.jpg', title: 'Excellence in Professional Services', meta: 'Realtek Awards 2025' },
          { src: '/awards/global-icon-2022.jpg', title: 'Global Icon of the Year', meta: 'Global Leaders Summit 2022' },
          { src: '/awards/indywood-excellence-2025.jpg', title: 'Indywood Business Excellence Award', meta: 'Dubai 2025' },
          { src: '/awards/uae-excellence-2023.jpg', title: 'International Excellence Award', meta: 'UAE 2023' },
          { src: '/awards/paledec-changemakers.jpg', title: '100 Pan African Changemakers', meta: 'PALEDEC Certificate of Honor' },
          { src: '/awards/paledec-recognition-2022.jpg', title: 'Special Recognition Award', meta: 'Pan African Summit, Zanzibar 2022' },
          { src: '/awards/lead-like-mandela-2023.jpg', title: 'Lead Like Mandela Forum', meta: 'Guest speaker · 2023' },
          { src: '/awards/fgdi-gulf-summit-2023.jpg', title: 'Outstanding Entrepreneur', meta: 'FGDI Gulf Summit & Awards 2023' },
          { src: '/awards/gulf-news-super-100.jpg', title: 'The Super 100', meta: 'Gulf News · 30 May 2024' },
          { src: '/awards/sme-governance-summit-2026.jpg', title: 'SME Governance Summit', meta: 'BSE, Mumbai · 2026' }
        ]
      }
    ],
    cta: { label: 'Media and Speaking Requests', to: '/contact' }
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
