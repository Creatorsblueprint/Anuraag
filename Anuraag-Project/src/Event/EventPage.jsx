import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';
import { trackPageView } from '../utils/analytics';
import { useTheme } from '../utils/ThemeContext';
import { COUNTRIES } from './countries';
import CountrySelect from './CountrySelect';
import styles from './EventPage.module.css';
import { strikeNot } from '../utils/strikeNot';
// Same end time as the banner, cards and pop-up (22 Nov 2026, 6 PM Dubai time).
import { isEventPromoActive } from '../EventPromo/eventPromo';

// Event details shown on the page. Kept in one place so they are easy to update.
// These come from the official event poster.
// (The confirmation email has its own copy of these details in the backend: server.js.)
const EVENT = {
  eyebrow: 'World Record Attempt',
  title: 'Most Nationalities Participating in a',
  // Official record title, so "Digital" stays until the client confirms the
  // record name also changes to "Virtual" (also in EventPromo/eventPromo.js,
  // vite-plugin-event-page.js and EVENT.name in the backend's server.js).
  titleHighlight: 'Digital Book Launch', // shown in gold at the end of the title
  host: 'Dr. Anuraag Guglaani',
  bookTitle: 'You Will Not Fly: Grounded at Twenty, Airborne Ever Since',
  dateLabel: '22 November 2026',
  timeLabel: '3:00 PM GST',
  formatLabel: 'Online via Zoom'
};

// What the thank-you card shows after the event (from 22 November, 6 PM
// Dubai time). Fill these in when they are known, then publish the site:
//   recordResult  - one or two sentences about the world record result,
//                   e.g. 'We set a new world record with 87 nationalities.'
//   recordingLink - the full "https://..." link to the recording
// While a value is empty, the card says it will be shared soon instead.
const AFTER_EVENT = {
  recordResult: '',
  recordingLink: ''
};

// Only a normal "https://" link is used for the recording button.
const RECORDING_LINK = /^https:\/\/\S+$/.test(AFTER_EVENT.recordingLink) ? AFTER_EVENT.recordingLink : '';

// The form starts empty. One object holds every field so we can add fields easily.
const EMPTY_FORM = { name: '', email: '', nationality: '' };

// Same email pattern the existing checkout form uses (DigitalCheckoutModal.jsx).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Works out the full address of the backend registration endpoint.
// Same rule as DigitalCheckoutModal.jsx: use VITE_BACKEND_URL when it is set
// (.env.production), otherwise the local backend while developing.
function getRegisterUrl() {
  const isLocal =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const defaultBackend = isLocal
    ? 'http://localhost:8080'
    : 'https://anuraagbackend-648711352735.me-west1.run.app';
  const baseUrl = (import.meta.env.VITE_BACKEND_URL || defaultBackend).replace(/\/$/, '');
  return `${baseUrl}/api/events/register`;
}

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

  if (field === 'nationality') {
    // Required: the world record counts nationalities, so every registrant needs one.
    // It must be one of the dropdown options (COUNTRIES).
    if (!trimmed) return 'Please select your nationality.';
    if (!COUNTRIES.includes(trimmed)) return 'Please choose a nationality from the list.';
  }

  return '';
}

/**
 * EventPage — standalone registration page shown at /event.
 * App.jsx renders this INSTEAD of the long single-scroll home page.
 * The form is validated here first, then sent to the backend
 * (POST /api/events/register), which validates again and saves it.
 */
export default function EventPage() {
  const { isDark } = useTheme();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // true while waiting for the backend
  const [serverError, setServerError] = useState(''); // message shown when the backend says no
  const [isRegistered, setIsRegistered] = useState(false); // true once the backend saved it

  // After the event the page stops asking people to register and thanks
  // everyone who joined instead. No change to the site is needed on the day.
  const isEventOver = !isEventPromoActive();

  // Report the page view once, the same way the rest of the site does.
  useEffect(() => {
    trackPageView('/event', 'Dr. Anuraag Guglaani — Event Registration');

    // Update document title and OpenGraph / Twitter meta tags dynamically
    const originalTitle = document.title;
    document.title = 'Virtual Book Launch & World Record Attempt | Dr. Anuraag Guglaani';

    const metaUpdates = [
      { selector: 'meta[property="og:title"]', attr: 'content', val: 'Virtual Book Launch & World Record Attempt | Dr. Anuraag Guglaani' },
      { selector: 'meta[property="og:url"]', attr: 'content', val: 'https://dranuraagguglaani.com/event' },
      { selector: 'meta[property="og:description"]', attr: 'content', val: 'Join the official World Record Attempt for Most Nationalities in a Digital Book Launch on 22 Nov 2026 at 3:00 PM GST.' },
      { selector: 'meta[property="og:image"]', attr: 'content', val: 'https://dranuraagguglaani.com/event_og_image.jpg' },
      { selector: 'meta[name="twitter:title"]', attr: 'content', val: 'Virtual Book Launch & World Record Attempt | Dr. Anuraag Guglaani' },
      { selector: 'meta[name="twitter:url"]', attr: 'content', val: 'https://dranuraagguglaani.com/event' },
      { selector: 'meta[name="twitter:description"]', attr: 'content', val: 'Join the official World Record Attempt for Most Nationalities in a Digital Book Launch on 22 Nov 2026 at 3:00 PM GST.' },
      { selector: 'meta[name="twitter:image"]', attr: 'content', val: 'https://dranuraagguglaani.com/event_og_image.jpg' },
      { selector: 'link[rel="canonical"]', attr: 'href', val: 'https://dranuraagguglaani.com/event' },
    ];

    const prevValues = metaUpdates.map(({ selector, attr }) => {
      const el = document.querySelector(selector);
      return { el, attr, prev: el ? el.getAttribute(attr) : null };
    });

    metaUpdates.forEach(({ selector, attr, val }) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, val);
    });

    return () => {
      document.title = originalTitle;
      prevValues.forEach(({ el, attr, prev }) => {
        if (el && prev !== null) el.setAttribute(attr, prev);
      });
    };
  }, []);

  // Stores a new value for one field. If that field already shows an error,
  // re-check it so the message clears once the value is fixed.
  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (serverError) setServerError('');
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Runs on every keystroke in the plain text boxes (name and email).
  const handleChange = (e) => updateField(e.target.name, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser from reloading the page

    // Validate every field and keep only the ones that have an error.
    const nextErrors = {};
    Object.keys(form).forEach((field) => {
      const message = validateField(field, form[field]);
      if (message) nextErrors[field] = message;
    });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // The form is valid, so send it to the backend.
    setIsSubmitting(true); // disables the form and shows the spinner
    setServerError('');

    try {
      const res = await fetch(getRegisterUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          nationality: form.nationality.trim()
        })
      });

      // The backend always answers with JSON; fall back to {} if it could not be read.
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        // Saved: swap the form for the success message.
        setIsRegistered(true);
        return;
      }

      // 400 = the backend rejected some fields. It sends one message per field
      // in data.errors, which we show under the matching inputs.
      if (data.errors && typeof data.errors === 'object') {
        setErrors(data.errors);
      }
      // Any other problem (e.g. 409 = email already registered) has a message in data.error.
      setServerError(data.error || 'Something went wrong. Please try again shortly.');
    } catch (err) {
      // fetch itself failed: no internet, or the backend is not reachable.
      console.error('Event registration request failed:', err);
      setServerError('Unable to reach the registration server. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false); // runs after success and failure alike
    }
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
            <p className={styles.eyebrow}>
              {EVENT.eyebrow.toUpperCase()} · {EVENT.dateLabel.toUpperCase()}
            </p>
            <h1 className={styles.heading}>
              {EVENT.title} <span className={styles.goldText}>{EVENT.titleHighlight}</span>
            </h1>
            {isEventOver ? (
              <p className={styles.subtitle}>
                {EVENT.host}, The Family Business Doctor, hosted the virtual launch of{' '}
                <em>{strikeNot(EVENT.bookTitle)}</em>, with participants joining on Zoom.
              </p>
            ) : (
              <p className={styles.subtitle}>
                Join {EVENT.host}, The Family Business Doctor, for the virtual launch of{' '}
                <em>{strikeNot(EVENT.bookTitle)}</em>. Register below to take part and represent your nationality.
              </p>
            )}
          </div>

          {/* Key facts about the event: date, time and where it takes place */}
          <dl className={styles.detailsRow}>
            <div className={styles.detailItem}>
              <dt>Date</dt>
              <dd>{EVENT.dateLabel}</dd>
            </div>
            <div className={styles.detailItem}>
              <dt>Time</dt>
              <dd>{EVENT.timeLabel}</dd>
            </div>
            <div className={styles.detailItem}>
              <dt>Where</dt>
              <dd>{EVENT.formatLabel}</dd>
            </div>
          </dl>

          {/* Registration form card. noValidate turns off the browser's own
              popups so our styled error messages are shown instead.
              Once the backend has saved the registration, a success card
              is shown in place of the form. */}
          {isEventOver ? (
            // After the event: a thank-you card instead of the form (it reuses
            // the success card's look). The record result and recording come
            // from AFTER_EVENT at the top of this file.
            <div className={`${styles.card} ${styles.successCard}`}>
              <span className={styles.successIcon} aria-hidden="true">✓</span>
              <h2 className={styles.successTitle}>Thank you for joining.</h2>
              <p className={styles.successText}>
                The launch took place on {EVENT.dateLabel}.
              </p>
              {AFTER_EVENT.recordResult ? (
                <p className={styles.successText}>
                  <strong>{AFTER_EVENT.recordResult}</strong>
                </p>
              ) : null}
              {/* Until both are known, say what is still to come */}
              {!AFTER_EVENT.recordResult || !RECORDING_LINK ? (
                <p className={styles.successText}>
                  {!AFTER_EVENT.recordResult && !RECORDING_LINK
                    ? 'The result of the world record attempt and the recording of the launch will be shared here soon.'
                    : !RECORDING_LINK
                      ? 'The recording of the launch will be shared here soon.'
                      : 'The result of the world record attempt will be shared here soon.'}
                </p>
              ) : null}
              {RECORDING_LINK ? (
                <a href={RECORDING_LINK} target="_blank" rel="noopener noreferrer" className={styles.submitBtn}>
                  <span>Watch the recording</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
              <a href="/book" className={styles.submitBtn}>
                <span>Get the book</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          ) : isRegistered ? (
            <div className={`${styles.card} ${styles.successCard}`} role="status">
              <span className={styles.successIcon} aria-hidden="true">✓</span>
              <h2 className={styles.successTitle}>You are registered.</h2>
              <p className={styles.successText}>
                Thank you, {form.name.trim()}. Your seat for {EVENT.dateLabel} is reserved under{' '}
                <strong>{form.email.trim()}</strong>, representing <strong>{form.nationality}</strong>.
              </p>
              {/* The confirmation email already contains the Zoom link (added by
                  the backend), so say so rather than "will be sent later". */}
              <p className={styles.successText}>
                A confirmation email with your Zoom joining link is on its way to this
                address. We will also send you a reminder shortly before the event.
              </p>
              <a href="/" className={styles.submitBtn}>
                <span>Back to main site</span>
              </a>
            </div>
          ) : (
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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

            {/* Nationality: a searchable dropdown (see CountrySelect.jsx). Choosing
                from a fixed list means everyone from the same country is recorded
                with exactly the same spelling (needed for the record count). */}
            <div className={styles.formGroup}>
              <label htmlFor="event-nationality" className={styles.label}>Nationality</label>
              <CountrySelect
                id="event-nationality"
                value={form.nationality}
                onChange={(value) => updateField('nationality', value)}
                options={COUNTRIES}
                disabled={isSubmitting}
                hasError={Boolean(errors.nationality)}
                describedBy={errors.nationality ? 'event-nationality-error' : undefined}
              />
              {errors.nationality && (
                <p className={styles.errorText} id="event-nationality-error" role="alert">
                  <span aria-hidden="true">⚠</span> {errors.nationality}
                </p>
              )}
            </div>

            {/* Message from the backend, e.g. "email already registered" or a connection problem */}
            {serverError && (
              <div className={styles.serverAlert} role="alert">
                {serverError}
              </div>
            )}

            {/* Disabled while sending so the form cannot be submitted twice */}
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Register</span>
                  <span aria-hidden="true">↗</span>
                </>
              )}
            </button>

            <p className={styles.formNote}>
              Your Zoom joining link will be emailed to you as soon as you register.
            </p>
          </form>
          )}
        </motion.div>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Dr. Anuraag Guglaani
      </footer>
    </div>
  );
}
