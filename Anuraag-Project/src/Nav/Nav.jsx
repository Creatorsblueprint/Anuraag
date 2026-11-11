import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackNavClick, trackCtaClick } from '../utils/analytics';
import { useTheme } from '../utils/ThemeContext';
import Link from '../router/Link';
import { MENU_LINKS } from '../router/routes';
import styles from './Nav.module.css';

// The two buttons in the header.
// "Start a Conversation" is the main one; "Get the Book" opens the Book page
// and scrolls to its purchase section.
const PRIMARY_CTA = { label: 'Start a Conversation', to: '/contact' };
const SECONDARY_CTA = { label: 'Get the Book', to: '/book#purchase' };

/**
 * Nav — the sticky header shown on every page (except the event page).
 *
 * Props:
 *   currentPath - the current page address without slashes, e.g. "speaking"
 *                 ("" on the home page). Used to highlight the active link.
 */
export default function Nav({ currentPath }) {
  const { toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Adds a stronger border and shadow to the header once the page is scrolled.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // True when a menu link points at the page being shown ("/about" vs "about").
  const isActive = (to) => to === `/${currentPath}`;

  // Runs when a menu link is clicked: close the phone menu and report the click.
  // (Moving to the page itself is done by <Link>.)
  const handleLinkClick = (link, location) => {
    setMobileMenuOpen(false);
    trackNavClick(link.label, link.to, location);
  };

  // Same for the two buttons, reported to analytics as button ("CTA") clicks.
  const handleCtaClick = (cta, location) => {
    setMobileMenuOpen(false);
    trackCtaClick(cta.label, location, cta.to);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerInner}>
        <Link
          to="/"
          onClick={() => handleLinkClick({ label: 'Home Logo', to: '/' }, 'brand_logo')}
          className={styles.brand}
          aria-label="Dr. Anuraag Guglaani home"
        >
          <img
            src={isDark ? '/logos/name_logo_white.png' : '/logos/name_logo.PNG'}
            alt="Dr. Anuraag Guglaani"
            className={styles.brandLogo}
          />
        </Link>

        {/* Menu links for wide screens */}
        <nav aria-label="Main Navigation" className={styles.desktopNav}>
          {MENU_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleLinkClick(link, 'desktop_nav')}
              className={`${styles.navLink} ${isActive(link.to) ? styles.active : ''}`}
              aria-current={isActive(link.to) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.desktopAction}>
          {/* Light / Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.themeToggleBtn}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <span className={styles.themeIcon} aria-hidden="true">{isDark ? '☀️' : '🌙'}</span>
          </button>

          {/* Secondary button: quieter outline style */}
          <Link
            to={SECONDARY_CTA.to}
            onClick={() => handleCtaClick(SECONDARY_CTA, 'header_desktop')}
            className={styles.navContact}
          >
            <span>{SECONDARY_CTA.label}</span>
          </Link>

          {/* Primary button: solid gold so it stands out most */}
          <Link
            to={PRIMARY_CTA.to}
            onClick={() => handleCtaClick(PRIMARY_CTA, 'header_desktop')}
            className={styles.navPrimary}
          >
            <span>{PRIMARY_CTA.label}</span>
            <span className={styles.arrowIcon}>↗</span>
          </Link>
        </div>

        {/* Retained 3-line hamburger menu with animated open/close state */}
        <div className={styles.mobileRightActions}>
          <button
            type="button"
            onClick={toggleTheme}
            className={styles.mobileThemeToggleBtn}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <span>{isDark ? '☀️' : '🌙'}</span>
          </button>

          <button
            className={`${styles.mobileToggle} ${mobileMenuOpen ? styles.toggleOpen : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </div>
      </div>

      {/* Full-screen menu for phones and tablets */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className={styles.mobileLinksList}>
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => handleLinkClick(link, 'mobile_menu')}
                  className={`${styles.mobileLink} ${isActive(link.to) ? styles.mobileActive : ''}`}
                  aria-current={isActive(link.to) ? 'page' : undefined}
                >
                  <span>{link.label}</span>
                  <span className={styles.mobileArrow}>&rarr;</span>
                </Link>
              ))}
            </div>

            <div className={styles.mobileMenuBottom}>
              <Link
                to={PRIMARY_CTA.to}
                onClick={() => handleCtaClick(PRIMARY_CTA, 'mobile_menu')}
                className={styles.mobileCtaBtn}
              >
                <span>{PRIMARY_CTA.label}</span>
                <span className={styles.arrowIcon}>↗</span>
              </Link>

              <Link
                to={SECONDARY_CTA.to}
                onClick={() => handleCtaClick(SECONDARY_CTA, 'mobile_menu')}
                className={styles.mobileSecondaryBtn}
              >
                <span>{SECONDARY_CTA.label}</span>
              </Link>

              <div className={styles.mobileMeta}>
                <span>DR. ANURAAG GUGLAANI</span>
                <p>The Family Business Doctor · Dubai, UAE</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
