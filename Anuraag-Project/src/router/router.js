import { useEffect, useState } from 'react';

// A very small "router": it decides which page to show from the address bar,
// and lets us move between pages without reloading the whole website.
// (We do not use a library such as react-router: the site only needs this much.)

// Name of the event we fire ourselves whenever navigate() changes the address.
const NAVIGATE_EVENT = 'app:navigate';

// Reads the address bar and returns:
//   path - the page part, cleaned up:  "/Media-Kit/" -> "media-kit", "/" -> ""
//   hash - the section part, if any:   "/book#purchase" -> "purchase"
function readLocation() {
  return {
    path: window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase(),
    hash: window.location.hash.replace('#', '')
  };
}

// The live site is hosted as static files, so opening e.g. /speaking directly
// has no real file behind it. public/404.html catches that and sends the
// visitor to "/?p=/speaking". This puts the original address back.
// Call it once, before the app is drawn (see main.jsx).
export function restoreRedirectedPath() {
  const original = new URLSearchParams(window.location.search).get('p');
  // Only accept an address on our own site ("/something", never "//other-site").
  if (original && original.startsWith('/') && !original.startsWith('//')) {
    window.history.replaceState(null, '', original);
  }
}

// Goes to another page of the site without a reload.
// Example: navigate('/speaking') or navigate('/book#purchase').
export function navigate(to) {
  window.history.pushState(null, '', to);
  window.dispatchEvent(new Event(NAVIGATE_EVENT)); // tells useRoute() to re-read the address
}

// Hook: gives a component the current route and re-draws it when the route changes.
// Returns { path, hash, visit }. "visit" goes up by one on every navigation,
// even when the address stays the same (e.g. clicking "Get the Book" twice),
// so code that scrolls to a section can run again.
export function useRoute() {
  const [route, setRoute] = useState(() => ({ ...readLocation(), visit: 0 }));

  useEffect(() => {
    const update = () => setRoute((prev) => ({ ...readLocation(), visit: prev.visit + 1 }));

    window.addEventListener('popstate', update); // browser Back / Forward buttons
    window.addEventListener(NAVIGATE_EVENT, update); // our own navigate()
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAVIGATE_EVENT, update);
    };
  }, []);

  return route;
}
