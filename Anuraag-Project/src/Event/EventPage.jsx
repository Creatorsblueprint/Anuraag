import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import { trackPageView } from '../utils/analytics';
import { useTheme } from '../utils/ThemeContext';
import styles from './EventPage.module.css';

// Event details shown on the page. Kept in one place so they are easy to update.
const EVENT_DATE_LABEL = '22 November 2026';

// The form starts empty. One object holds every field so we can add fields easily.
const EMPTY_FORM = { name: '', email: '', phone: '' };

// Same email pattern the existing checkout form uses (DigitalCheckoutModal.jsx).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Checks one field and returns an error message, or '' when the value is fine.
function validateField(field, value) {
  const trimmed = value.trim();

  if (field === 'name') {
    if (!trimmed) return 'Please enter your full name.';
    if (trimmed.length < 2) return 'Name must be at least 2 characters.';
    if (trimmed.length > 100) return 'Name must be 100 characters or fewer.';
  }

  if (field === 'email') {
    if (!trimmed) return 'Email address is required.';
    if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address (e.g. name@example.com).';
  }

  if (field === 'phone') {
    // Phone is optional: only validate it when something was typed.
    // Allows digits, spaces, dashes, brackets and a leading "+", with 7-15 digits in total.
    const digitCount = trimmed.replace(/\D/g, '').length;
    if (trimmed && (!/^\+?[\d\s\-()]+$/.test(trimmed) || digitCount < 7 || digitCount > 15)) {
      return 'Please enter a valid phone number (e.g. +971 50 123 4567).';
    }
  }

  return '';
}

/**
 * EventPage — standalone registration page shown at /event.
 * App.jsx renders this INSTEAD of the long single-scroll home page.
 * Section 1 scope: page shell + form UI + client-side validation only.
 * Sending the registration to the backend is added in a later section.
 */
export default function EventPage() {
  const { isDark } = useTheme();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isValidated, setIsValidated] = useState(false);

  // Report the page view once, the same way the rest of the site does.
  useEffect(() => {
    trackPageView('/event', 'Dr. Anuraag Guglaani — Event Registration');
  }, []);

  // Runs on every keystroke: store the new value, and if that field
  // already shows an error, re-check it so the message clears once fixed.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsValidated(false);
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop the browser from reloading the page

    // Validate every field and keep only the ones that have an error.
    const nextErrors = {};
    Object.keys(form).forEach((field) => {
      const message = validateField(field, form[field]);
      if (message) nextErrors[field] = message;
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // TODO (next section): POST the trimmed form values to the backend here.
    // For now we only confirm that the details passed validation.
    setIsValidated(true);
  };

  return (
    <div className={styles.page}>
      {/* Simple header: the main Nav scrolls to home-page sections that do not
          exist here, so this page has its own logo link back to the main site. */}
      <header className={styles.header}>
        <a href="/" className={styles.brand} aria-label="Dr. Anuraag Guglaani home">
          <img
            src={isDark ? '/logos/name_logo_white.png' : '/logos/name_logo.PNG'}
            alt="Dr. Anuraag Guglaani"
            className={styles.brandLogo}
          />
        </a>
        <a href="/" className={styles.backLink}>
          <span aria-hidden="true">&larr;</span> Back to main site
        </a>
      </header>

      <main className={styles.main}>
        <motion.div className={styles.wrap} variants={fadeInUp} initial="hidden" animate="visible">
          {/* Page heading, styled like the section headers on the home page */}
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>EVENT · {EVENT_DATE_LABEL.toUpperCase()}</p>
            <h1 className={styles.heading}>
              Reserve <span className={styles.goldText}>your seat.</span>
            </h1>
            <p className={styles.subtitle}>
              Fill in your details below to register for the event on {EVENT_DATE_LABEL}.
            </p>
          </div>

          {/* Registration form card. noValidate turns off the browser's own
              popups so our styled error messages are shown instead. */}
          <form className={styles.card} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="event-name" className={styles.label}>Full Name</label>
              <input
                id="event-name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                autoComplete="name"
                maxLength={100}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'event-name-error' : undefined}
                required
              />
              {errors.name && (
                <p className={styles.errorText} id="event-name-error" role="alert">
                  <span aria-hidden="true">⚠</span> {errors.name}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="event-email" className={styles.label}>Email Address</label>
              <input
                id="event-email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                autoComplete="email"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'event-email-error' : undefined}
                required
              />
              {errors.email && (
                <p className={styles.errorText} id="event-email-error" role="alert">
                  <span aria-hidden="true">⚠</span> {errors.email}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="event-phone" className={styles.label}>
                <span>Phone Number</span>
                <span className={styles.labelHint}>Optional</span>
              </label>
              <input
                id="event-phone"
                name="phone"
                type="tel"
                placeholder="+971 50 123 4567"
                value={form.phone}
                onChange={handleChange}
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                autoComplete="tel"
                maxLength={25}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'event-phone-error' : undefined}
              />
              {errors.phone && (
                <p className={styles.errorText} id="event-phone-error" role="alert">
                  <span aria-hidden="true">⚠</span> {errors.phone}
                </p>
              )}
            </div>

            <button type="submit" className={styles.submitBtn}>
              <span>Register</span>
              <span aria-hidden="true">↗</span>
            </button>

            {/* Temporary notice until the backend is connected in the next section */}
            {isValidated && (
              <div className={styles.notice} role="status">
                Your details look good. Online registration is not connected yet, so nothing has been submitted.
              </div>
            )}
          </form>
        </motion.div>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Dr. Anuraag Guglaani
      </footer>
    </div>
  );
}
