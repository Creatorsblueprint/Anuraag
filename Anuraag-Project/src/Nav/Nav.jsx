import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Nav.module.css';

export default function Nav() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: 'The Book', href: '#book', id: 'book' },
    { label: 'The Man', href: '#story', id: 'story' },
    { label: 'The Work', href: '#expertise', id: 'expertise' },
    { label: 'The Falcon', href: '#falcons', id: 'falcons' },
    // { label: 'Videos', href: '#videos', id: 'videos' },
    { label: 'Recognition', href: '#recognition', id: 'recognition' }
  ];

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 140;
      const sections = ['overview', 'book', 'story', 'expertise', 'falcons', 'videos', 'recognition', 'faq', 'purchase'];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              const currentPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
              const targetPath = sectionId === 'overview' ? '/' : `/${sectionId}`;
              const expectedPath = sectionId === 'overview' ? '' : sectionId;

              if (currentPath !== expectedPath && !window.location.search.includes('p=')) {
                window.history.replaceState(null, '', targetPath);
              }
            }, 80);

            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const sectionId = href.replace('#', '');
    const newPath = sectionId === 'overview' ? '/' : `/${sectionId}`;
    window.history.pushState(null, '', newPath);
    setActiveSection(sectionId);

    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        const header = document.querySelector(`.${styles.header}`);
        const headerHeight = header ? header.offsetHeight : 80;
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerInner}>
        <a href="#overview" onClick={(e) => handleNavClick(e, '#overview')} className={styles.brand} aria-label="Dr. Anuraag Guglaani home">
          <span className={styles.monogram}>
            AG<span>·</span>
          </span>
          <span className={styles.brandName}>
            DR. ANURAAG<br />GUGLAANI
          </span>
        </a>

        <nav aria-label="Main Navigation" className={styles.desktopNav}>
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.desktopAction}>
          <a
            href="#purchase"
            onClick={(e) => handleNavClick(e, '#purchase')}
            className={styles.navContact}
          >
            <span>Get the Book</span>
            <span className={styles.arrowIcon}>↗</span>
          </a>
        </div>

        {/* Retained 3-line hamburger menu with animated open/close state */}
        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={styles.hamburgerLine}
            style={{
              transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}
          />
          <span
            className={styles.hamburgerLine}
            style={{ opacity: mobileMenuOpen ? 0 : 1 }}
          />
          <span
            className={styles.hamburgerLine}
            style={{
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.mobileLinksList}>
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`${styles.mobileLink} ${activeSection === link.id ? styles.mobileActive : ''}`}
                >
                  <span>{link.label}</span>
                  <span className={styles.mobileArrow}>&rarr;</span>
                </a>
              ))}
              <a
                href="#purchase"
                onClick={(e) => handleNavClick(e, '#purchase')}
                className={styles.mobileCtaBtn}
              >
                <span>Get the Book</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
