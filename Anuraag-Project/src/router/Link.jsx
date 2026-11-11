import { navigate } from './router';

/**
 * Link — a normal <a> link to another page of this site, but without a full
 * page reload. Use it like:  <Link to="/speaking">Speaking</Link>
 *
 * Props:
 *   to       - where to go, e.g. "/about" or "/book#purchase"
 *   onClick  - optional extra work to do on click (e.g. analytics)
 *   ...rest  - anything else (className, aria-label...) is passed to the <a>
 */
export default function Link({ to, onClick, children, ...rest }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);

    // Leave the click to the browser when the visitor wants a new tab or window
    // (middle click, or Ctrl / Cmd / Shift / Alt + click).
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault(); // stop the full page reload
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
