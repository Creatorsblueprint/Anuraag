import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Nav.module.css';

export default function Nav() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview', id: 'overview' },
    { label: 'Pillars', href: '#pillars', id: 'pillars' },
    { label: 'Falcons of Majlis', href: '#falcons', id: 'falcons' },
    { label: 'EBOOK', href: '#ebook', id: 'ebook' },
    { label: 'Lectern', href: '#lectern', id: 'lectern' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      const sections = ['overview', 'falcons', 'lectern', 'pillars', 'ebook'];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#overview" onClick={(e) => handleNavClick(e, '#overview')} className={styles.brand}>
          <span className={styles.brandName}>Dr. Anuraag Guglaani</span>
          <span className={styles.brandSubtitle}>AUTHOR · INVESTOR · PROFESSOR</span>
        </a>

        <nav aria-label="Main Navigation">
          <ul className={styles.navMenu}>
            {navLinks.map((link) => (
              <li key={link.id} className={styles.navItem}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.desktopContactWrapper}>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={styles.contactBtn}
          >
            CONTACT
          </a>
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={styles.hamburgerLine}
            style={{
              transform: mobileMenuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none'
            }}
          />
          <span
            className={styles.hamburgerLine}
            style={{ opacity: mobileMenuOpen ? 0 : 1 }}
          />
          <span
            className={styles.hamburgerLine}
            style={{
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none'
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
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={styles.mobileLink}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={styles.mobileContactBtn}
            >
              CONTACT
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
