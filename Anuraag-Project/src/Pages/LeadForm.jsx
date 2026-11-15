import { useState } from 'react';
import styles from './LeadForm.module.css';

// Same email pattern the other forms on the site use.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Works out the full address of the backend endpoint that saves leads.
// Same rule as EventPage.jsx: use VITE_BACKEND_URL when it is set
// (.env.production), otherwise the local backend while developing.
function getLeadsUrl() {
  const isLocal =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const defaultBackend = isLocal
    ? 'http://localhost:8080'
    : 'https://anuraagbackend-648711352735.me-west1.run.app';
  const baseUrl = (import.meta.env.VITE_BACKEND_URL || defaultBackend).replace(/\/$/, '');
  return `${baseUrl}/api/leads`;
}

/**
 * LeadForm — one form used in three places on the site. A "lead" is a visitor
 * who leaves their details. The form sends them to the backend
 * (POST /api/leads), which checks them again and saves them.
 *
 * Props:
 *   source          - which form this is: 'contact', 'preview' or 'updates'.
 *                     Saved with the lead so we know where it came from.
 *   showName        - show the Full Name box (required when shown)
 *   showMessage     - show the Message box (required when shown)
 *   consentLabel    - text next to the tick box
 *   consentRequired - true when the box must be ticked to send the form
 *   buttonLabel     - text on the button
 *   successTitle    - heading shown after the form was sent
 *   successText     - sentence shown under that heading
 */
export default function LeadForm({
  source,
  showName = false,
  showMessage = false,
  consentLabel,
  consentRequired = false,
  buttonLabel,
  successTitle,
  successText
}) {
  // "website" is the spam trap: a hidden box real visitors never see or fill in.
  const [form, setForm] = useState({ name: '', email: '', message: '', consent: false, website: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // true while waiting for the backend
  const [serverError, setServerError] = useState(''); // message shown when the backend says no
  const [isSent, setIsSent] = useState(false); // true once the backend saved it

  // Checks the whole form. Returns one message per field that has a problem.
  const validate = () => {
    const found = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (showName) {
      if (!name) found.name = 'Please enter your full name.';
      else if (name.length < 2) found.name = 'Name must be at least 2 characters.';
    }

    if (!email) found.email = 'Email address is required.';
    else if (!EMAIL_REGEX.test(email)) found.email = 'Please enter a valid email address (e.g. name@example.com).';

    if (showMessage && !message) found.message = 'Please enter your message.';

    if (consentRequired && !form.consent) found.consent = 'Please tick the box to continue.';

    return found;
  };

  // Runs on every change in any box. A tick box gives true/false, the others give text.
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear the old messages for this field; it is checked again on submit.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the browser from reloading the page

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsSubmitting(true); // disables the form and shows the spinner
    setServerError('');

    try {
      const res = await fetch(getLeadsUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          consent: form.consent,
          website: form.website
        })
      });

      // The backend always answers with JSON; fall back to {} if it could not be read.
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setIsSent(true); // swap the form for the thank-you message
        return;
      }

      // 400 = the backend rejected some fields; show its messages under the boxes.
      if (data.errors && typeof data.errors === 'object') setErrors(data.errors);
      setServerError(data.error || 'Something went wrong. Please try again shortly.');
    } catch (err) {
      // fetch itself failed: no internet, or the backend is not reachable.
      console.error('Lead form request failed:', err);
      setServerError('Unable to reach the server. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false); // runs after success and failure alike
    }
  };

  // After sending, the form is replaced by a short thank-you card.
  if (isSent) {
    return (
      <div className={`${styles.card} ${styles.successCard}`} role="status">
        <span className={styles.successIcon} aria-hidden="true">✓</span>
        <h2 className={styles.successTitle}>{successTitle}</h2>
        <p className={styles.successText}>{successText}</p>
      </div>
    );
  }

  // Each box needs its own id. The source is part of it so two forms on one
  // page could never clash.
  const id = (field) => `lead-${source}-${field}`;

  // noValidate turns off the browser's own popups so our styled messages show instead.
  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      {showName && (
        <div className={styles.formGroup}>
          <label htmlFor={id('name')} className={styles.label}>Full Name</label>
          <input
            id={id('name')}
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
          />
          {errors.name && <p className={styles.errorText} role="alert">{errors.name}</p>}
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor={id('email')} className={styles.label}>Email Address</label>
        <input
          id={id('email')}
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
        />
        {errors.email && <p className={styles.errorText} role="alert">{errors.email}</p>}
      </div>

      {showMessage && (
        <div className={styles.formGroup}>
          <label htmlFor={id('message')} className={styles.label}>Message</label>
          <textarea
            id={id('message')}
            name="message"
            rows={5}
            placeholder="How can Dr. Guglaani help?"
            value={form.message}
            onChange={handleChange}
            className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
            disabled={isSubmitting}
            maxLength={2000}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && <p className={styles.errorText} role="alert">{errors.message}</p>}
        </div>
      )}

      {/* Spam trap. Hidden from people and screen readers, and skipped by the
          Tab key; automatic spam programs fill it in and the backend then
          ignores the form. */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        className={styles.trap}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Consent tick box. Never ticked for the visitor: they must choose it. */}
      <div className={styles.formGroup}>
        <label className={styles.consent}>
          <input
            type="checkbox"
            name="consent"
            checked={form.consent}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <span>{consentLabel}</span>
        </label>
        {errors.consent && <p className={styles.errorText} role="alert">{errors.consent}</p>}
      </div>

      {/* Message from the backend, e.g. a connection problem */}
      {serverError && <div className={styles.serverAlert} role="alert">{serverError}</div>}

      {/* Disabled while sending so the form cannot be submitted twice */}
      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>{buttonLabel}</span>
            <span aria-hidden="true">↗</span>
          </>
        )}
      </button>
    </form>
  );
}
