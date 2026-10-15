import React, { useEffect } from 'react';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import Affiliations from './Affiliations/Affiliations';
import Falcons from './Falcons/Falcons';
import Quote from './Quote/Quote';
import Lectern from './Lectern/Lectern';
import Diagnostics from './Diagnostics/Diagnostics';
import Ebook from './Ebook/Ebook';
import Footer from './Footer/Footer';
import './App.css';

export default function App() {
  useEffect(() => {
    // 1. Check if redirected from 404.html via /?p=...
    const urlParams = new URLSearchParams(window.location.search);
    let targetPath = urlParams.get('p') || window.location.pathname;

    if (targetPath) {
      // Normalize path (e.g. "/ebook/" -> "ebook")
      const cleanPath = targetPath.replace(/^\/+|\/+$/g, '').toLowerCase();

      // Route aliases mapping to section element IDs
      const routeMap = {
        'ebook': 'ebook',
        'the-living-charter': 'ebook',
        'book': 'ebook',
        'pillars': 'pillars',
        'diagnostics': 'pillars',
        'falcons': 'falcons',
        'falcons-of-majlis': 'falcons',
        'lectern': 'lectern',
        'academic': 'lectern',
        'overview': 'overview',
        'home': 'overview',
        'contact': 'contact'
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
            const headerHeight = header ? header.offsetHeight : 70;
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
        <Affiliations />
        <Diagnostics />
        <Falcons />
        <Quote />
        <Lectern />
        <Ebook />
      </main>
      <Footer />
    </div>
  );
}
