import { useEffect, useState } from 'react';
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
import PaymentSuccessModal from './Modals/PaymentSuccessModal';
import PaymentCancelModal from './Modals/PaymentCancelModal';
import EventPage from './Event/EventPage';
import PlaceholderPage from './Pages/PlaceholderPage';
import { PAGE_CONTENT } from './Pages/pageContent';
import { useRoute } from './router/router';
import { PAGES, HOME_SECTIONS } from './router/routes';
import { trackPageView } from './utils/analytics';
import './App.css';

// Returns the sections that make up one page.
// "page" is one of the names listed in router/routes.js (PAGES).
function renderPage(page) {
  // About: the existing story, roles and recognition sections.
  if (page === 'about') {
    return (
      <>
        <Story />
        <Roles />
        <Recognition />
      </>
    );
  }

  // Book: the existing book, questions and purchase sections.
  if (page === 'book') {
    return (
      <>
        <Ebook />
        <FAQ />
        <Contact />
      </>
    );
  }

  // Pages that do not have their full content yet (Speaking, Insights...).
  if (PAGE_CONTENT[page]) {
    return <PlaceholderPage content={PAGE_CONTENT[page]} />;
  }

  // Home: the full long page, unchanged for now.
  return (
    <>
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
    </>
  );
}

export default function App() {
  // The current address: path = which page, hash = which section (if any).
  const { path, hash, visit } = useRoute();

  // Which page to draw. An address we do not know shows the home page.
  const currentPage = PAGES[path] || PAGES[''];
  const page = currentPage.page;

  // Stripe sends the buyer back with "?payment=success" or "?payment=cancel"
  // in the address. Each popup starts open when its word is there.
  // (The function inside useState runs only once, when the app first loads.)
  const [isSuccessOpen, setIsSuccessOpen] = useState(
    () => new URLSearchParams(window.location.search).get('payment') === 'success'
  );
  const [isCancelOpen, setIsCancelOpen] = useState(
    () => new URLSearchParams(window.location.search).get('payment') === 'cancel'
  );

  // Runs every time the visitor arrives at an address (first load and every navigation).
  useEffect(() => {
    document.title = currentPage.title; // text in the browser tab

    // Report page changes to analytics. Not on the first load (visit 0): the
    // analytics tag already counts that one. The event page reports its own view.
    if (visit > 0 && page !== 'event') {
      trackPageView(`/${path}`, currentPage.title);
    }

    // Where to scroll: a section named in the address ("/book#purchase"),
    // or an older short address such as /falcons (see HOME_SECTIONS).
    const sectionId = hash || HOME_SECTIONS[path];

    if (!sectionId) {
      window.scrollTo(0, 0); // a new page starts at the top
      return;
    }

    // Wait a moment so the page is drawn, then scroll to the section,
    // leaving room for the sticky header at the top.
    const timer = setTimeout(() => {
      const targetEl = document.getElementById(sectionId);
      if (targetEl) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: Math.max(0, elementPosition - headerHeight),
          behavior: 'smooth'
        });
      }
    }, 150);

    return () => clearTimeout(timer); // cancel if the visitor moves on before it fires
  }, [path, hash, visit, page, currentPage.title]);

  // The event registration page stands on its own, with its own simple header.
  // (This return must stay below the hooks above: hooks have to run on every render.)
  if (page === 'event') {
    return <EventPage />;
  }

  const handleClosePaymentModal = () => {
    setIsSuccessOpen(false);
    setIsCancelOpen(false);
    // Clean up query param without refreshing page
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState(null, '', cleanUrl || '/');
  };

  // The floating "Get the book" bar only makes sense where the book is sold.
  const showStickyBook = page === 'home' || page === 'book';

  return (
    <div className="appWrapper" id="top">
      <Nav currentPath={path} />
      {/* key={page} makes React build the page fresh when the page changes,
          so entrance animations play again and old page state is not kept. */}
      <main key={page}>{renderPage(page)}</main>
      {/* Its own key (different from <main>'s) so it also starts fresh per page */}
      {showStickyBook && <StickyBook key={`sticky-${page}`} />}
      <Footer />

      {/* Payment Feedback Modals */}
      <PaymentSuccessModal isOpen={isSuccessOpen} onClose={handleClosePaymentModal} />
      <PaymentCancelModal isOpen={isCancelOpen} onClose={handleClosePaymentModal} />
    </div>
  );
}
