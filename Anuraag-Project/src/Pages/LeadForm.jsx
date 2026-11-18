import { useState } from 'react';
import styles from './LeadForm.module.css';

// Same email pattern the other forms on the site use.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Choices in the speaking form's drop-down lists. The backend accepts only
// these exact words (server.js, SPEAKING_FORMATS and SPEAKING_AUDIENCES),
// so keep the two lists in step.
const SPEAKING_FORMATS = ['In person', 'Virtual', 'Hybrid'];
const SPEAKING_AUDIENCES = ['Under 100', '100 to 500', '500 to 1,000', 'Over 1,000'];

// The speaking form's extra text boxes: field name, label, placeholder and
// the longest text allowed (same limits as the backend).
const SPEAKING_TEXT_FIELDS = [
  { name: 'organisation', label: 'Organisation', placeholder: 'Company, university or association', maxLength: 150, autoComplete: 'organization' },
  { name: 'event', label: 'Event', placeholder: 'Event or conference name', maxLength: 150 },
  { name: 'city', label: 'City', placeholder: 'e.g. Dubai, UAE', maxLength: 100 }
];

// Starting (empty) values of every box. The speaking boxes are always kept,
// even on the other forms, where they stay empty and are not sent.
const EMPTY_FORM = {
  name: '',
  email: '',
  message: '',
  consent: false,
  website: '', // the spam trap: a hidden box real visitors never see or fill in
  organisation: '',
  event: '',
  date: '',
  city: '',
  format: '',
  audience: ''
};

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
 * LeadForm — one form used in several places on the site. A "lead" is a visitor
 * who leaves their details. The form sends them to the backend
 * (POST /api/leads), which checks them again and saves them.
 *
 * Props:
 *   source          - which form this is: 'contact', 'preview', 'updates' or
 *                     'speaking'. Saved with the lead so we know where it came from.
 *   showName        - show the Full Name box (required when shown)
 *   showMessage     - show the Message box
 *   messageRequired - true when the Message box must be filled in (default true)
 *   messageLabel    - label above the Message box (default "Message")
 *   messagePlaceholder - grey hint text inside the Message box
 *   showSpeaking    - show the speaking invitation boxes: organisation, event,
 *                     date, city, format and audience size
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
  messageRequired = true,
  messageLabel = 'Message',
  messagePlaceholder = 'How can Dr. Guglaani help?',
  showSpeaking = false,
  consentLabel,
  consentRequired = false,
  buttonLabel,
  successTitle,
  successText
}) {
  const [form, setForm] = useState(EMPTY_FORM);
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

    if (showMessage && messageRequired && !message) found.message = 'Please enter your message.';

    // Speaking form: everything except the date (which may not be fixed yet)
    // must be filled in.
    if (showSpeaking) {
      if (!form.organisation.trim()) found.organisation = 'Please enter your organisation.';
      if (!form.event.trim()) found.event = 'Please enter the event name.';
      if (!form.city.trim()) found.city = 'Please enter the city.';
      if (!form.format) found.format = 'Please choose a format.';
      if (!form.audience) found.audience = 'Please choose an audience size.';
    }

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
          website: form.website,
          // Only the speaking form sends the event details.
          ...(showSpeaking && {
            details: {
              organisation: form.organisation.trim(),
              event: form.event.trim(),
              date: form.date, // "YYYY-MM-DD" from the date box, or empty
              city: form.city.trim(),
              format: form.format,
              audience: form.audience
            }
          })
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
    // The speaking form has more boxes, so it gets a wider card.
    <form className={`${styles.card} ${showSpeaking ? styles.wide : ''}`} onSubmit={handleSubmit} noValidate>
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

      {/* Speaking form only: the event details */}
      {showSpeaking && (
        <>
          {/* Organisation, event and city: plain text boxes, one per entry
              in SPEAKING_TEXT_FIELDS (top of this file) */}
          {SPEAKING_TEXT_FIELDS.map((field) => (
            <div className={styles.formGroup} key={field.name}>
              <label htmlFor={id(field.name)} className={styles.label}>{field.label}</label>
              <input
                id={id(field.name)}
                name={field.name}
                type="text"
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                className={`${styles.input} ${errors[field.name] ? styles.inputError : ''}`}
                autoComplete={field.autoComplete || 'off'}
                disabled={isSubmitting}
                maxLength={field.maxLength}
                aria-invalid={Boolean(errors[field.name])}
              />
              {errors[field.name] && <p className={styles.errorText} role="alert">{errors[field.name]}</p>}
            </div>
          ))}

          {/* Date (optional), format and audience size, side by side on wide screens */}
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor={id('date')} className={styles.label}>Event date (optional)</label>
              <input
                id={id('date')}
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.date)}
              />
              {errors.date && <p className={styles.errorText} role="alert">{errors.date}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={id('format')} className={styles.label}>Format</label>
              <select
                id={id('format')}
                name="format"
                value={form.format}
                onChange={handleChange}
                className={`${styles.input} ${errors.format ? styles.inputError : ''}`}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.format)}
              >
                <option value="">Choose…</option>
                {SPEAKING_FORMATS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.format && <p className={styles.errorText} role="alert">{errors.format}</p>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor={id('audience')} className={styles.label}>Audience size</label>
              <select
                id={id('audience')}
                name="audience"
                value={form.audience}
                onChange={handleChange}
                className={`${styles.input} ${errors.audience ? styles.inputError : ''}`}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.audience)}
              >
                <option value="">Choose…</option>
                {SPEAKING_AUDIENCES.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.audience && <p className={styles.errorText} role="alert">{errors.audience}</p>}
            </div>
          </div>
        </>
      )}

      {showMessage && (
        <div className={styles.formGroup}>
          <label htmlFor={id('message')} className={styles.label}>{messageLabel}</label>
          <textarea
            id={id('message')}
            name="message"
            rows={5}
            placeholder={messagePlaceholder}
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
