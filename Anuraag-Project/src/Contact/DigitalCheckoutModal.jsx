import React, { useState, useEffect } from 'react';
import styles from './DigitalCheckoutModal.module.css';
import { trackDigitalCheckoutBegin } from '../utils/analytics';

export default function DigitalCheckoutModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Handle ESC key press and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Reset errors when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmailError('');
      setServerError('');
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Validate email format
  const validateEmail = (value) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Email address is required to receive your digital edition.';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(trimmed)) {
      return 'Please enter a valid email address (e.g. name@example.com).';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (emailError) {
      setEmailError(validateEmail(val));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setIsLoading(true);
    setServerError('');
    trackDigitalCheckoutBegin({
      userEmail: email.trim(),
      currency: 'AED',
      value: 15,
    });

    try {
      // Determine base URL dynamically (supports both localhost and production deployment)
      const baseUrl = `${window.location.origin}${window.location.pathname}`.replace(/\/$/, '');

      // Stripe requires a public, accessible image URL
      const isLocal =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

      const bookImage = isLocal
        ? 'https://creatorsblueprint.github.io/Anuraag/client_images/book_cover_front.jpg'
        : `${baseUrl}/client_images/book_cover_front.jpg`;

      // Construct Stripe payload
      const payload = {
        email: email.trim(),
        image: bookImage,
        successUrl: `${baseUrl}/?payment=success`,
        cancelUrl: `${baseUrl}/?payment=cancel`,
      };

      // Determine backend endpoint
      const defaultBackend = isLocal
        ? 'http://localhost:8080'
        : 'https://anuraagbackend-648711352735.me-west1.run.app';

      const baseBackendUrl = (import.meta.env.VITE_BACKEND_URL || defaultBackend).replace(/\/$/, '');
      const backendUrl = baseBackendUrl.endsWith('/api/create-checkout-session')
        ? baseBackendUrl
        : `${baseBackendUrl}/api/create-checkout-session`;

      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      const data = await res.json();
      console.log('Stripe checkout session response:', data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned from the checkout server.');
      }
    } catch (err) {
      console.error('Failed to initiate checkout session:', err);
      setServerError(
        err.message || 'Unable to connect to the checkout server. Please verify your connection or try again shortly.'
      );
      setIsLoading(false);
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close checkout modal"
        >
          ✕
        </button>

        <div className={styles.modalHeader}>
          <div className={styles.modalEyebrow}>DIGITAL ACCESS · INSTANT DELIVERY</div>
          <h2 className={styles.modalTitle} id="checkout-modal-title">
            Access Digital Edition
          </h2>
        </div>

        <div className={styles.modalBody}>
          {/* Product Preview Card */}
          <div className={styles.productRow}>
            <img
              src="/client_images/book_cover_front.jpg"
              alt="You Will Not Fly digital cover"
              className={styles.bookThumb}
            />
            <div className={styles.productDetails}>
              <h3 className={styles.productTitle}>You Will Not Fly</h3>
              <p className={styles.productDesc}>
                Complete Digital Edition &amp; High-Resolution Interactive PDF.
              </p>
              <div className={styles.productMeta}>
                <span className={styles.formatBadge}>DIGITAL PDF &amp; EPUB</span>
                <span className={styles.priceTag}>AED 15</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handlePurchase} className={styles.formGroup} noValidate>
            <label htmlFor="checkout-email" className={styles.label}>
              <span>Delivery Email Address</span>
              <span className={styles.labelHint}>Where to send your copy</span>
            </label>

            <div className={styles.inputWrapper}>
              <span className={styles.mailIcon} aria-hidden="true">✉</span>
              <input
                id="checkout-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={handleInputChange}
                className={`${styles.emailInput} ${emailError ? styles.inputError : ''}`}
                autoComplete="email"
                disabled={isLoading}
                required
              />
            </div>

            {emailError && (
              <p className={styles.errorText} role="alert">
                <span>⚠</span> {emailError}
              </p>
            )}

            {serverError && (
              <div className={styles.serverAlert} role="alert">
                <strong>Checkout Notice:</strong> {serverError}
              </div>
            )}

            <ul className={styles.benefitsList}>
              <li>
                <span className={styles.checkIcon}>✓</span> Instant digital delivery right after payment
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span> Readable across Phone, Tablet, Laptop &amp; E-Reader
              </li>
              <li>
                <span className={styles.checkIcon}>✓</span> High-res diagrams, charts &amp; self-reflection worksheets
              </li>
            </ul>

            <button
              type="submit"
              className={styles.checkoutBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  <span>Connecting to Stripe...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Stripe Checkout</span>
                  <span>↗</span>
                </>
              )}
            </button>

            <div className={styles.guaranteeNote}>
              <span className={styles.lockIcon} aria-hidden="true">🔒</span>
              <span>Encrypted 256-bit SSL transaction processed directly by Stripe</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
