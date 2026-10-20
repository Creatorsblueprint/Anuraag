import React, { useEffect } from 'react';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Ebook from './Ebook/Ebook';
import Interlude from './Interlude/Interlude';
import Story from './Story/Story';
import Diagnostics from './Diagnostics/Diagnostics';
import Roles from './Roles/Roles';
import Falcons from './Falcons/Falcons';
import Recognition from './Recognition/Recognition';
import Videos from './Videos/Videos';
import FAQ from './FAQ/FAQ';
import Contact from './Contact/Contact';
import StickyBook from './StickyBook/StickyBook';
import Footer from './Footer/Footer';
import './App.css';

export default function App() {
  useEffect(() => {
    // 1. Check if redirected from 404.html via /?p=... or direct pathname
    const urlParams = new URLSearchParams(window.location.search);
    let targetPath = urlParams.get('p') || window.location.pathname;

    if (targetPath) {
      // Normalize path (e.g. "/ebook/" -> "ebook")
      const cleanPath = targetPath.replace(/^\/+|\/+$/g, '').toLowerCase();

      // Route aliases mapping to section element IDs
      const routeMap = {
        'book': 'book',
        'ebook': 'book',
        'you-will-not-fly': 'book',
        'the-living-charter': 'book',
        'story': 'story',
        'the-man': 'story',
        'the-story': 'story',
        'lectern': 'story',
        'academic': 'story',
        'expertise': 'expertise',
        'the-work': 'expertise',
        'work': 'expertise',
        'pillars': 'expertise',
        'six-verbs': 'expertise',
        'diagnostics': 'expertise',
        'falcons': 'falcons',
        'falcons-of-majlis': 'falcons',
        'videos': 'videos',
        'media': 'videos',
        'recognition': 'recognition',
        'honors': 'recognition',
        'affiliations': 'recognition',
        'faq': 'faq',
        'purchase': 'purchase',
        'contact': 'purchase',
        'order': 'purchase',
        'overview': 'overview',
        'home': 'overview'
      };

      const sectionId = routeMap[cleanPath];

      if (sectionId) {
        // Clean URL in browser address bar without reload
        window.history.replaceState(null, '', `/${cleanPath}`);

        // Scroll to the targeted section factoring in sticky header height
        setTimeout(() => {
          const targetEl = document.getElementById(sectionId);
          if (targetEl) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 80;
            const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerHeight;

            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
          }
        }, 150);
      }
    }
  }, []);

  return (
    <div className="appWrapper">
      <Nav />
      <main>
        <Home />
        <Ebook />
        <Interlude />
        <Story />
        <Diagnostics />
        <Roles />
        <Falcons />
        <Recognition />
        <Videos />
        <FAQ />
        <Contact />
      </main>
      <StickyBook />
      <Footer />
    </div>
  );
}
