import React, { useEffect } from 'react';
import styles from './PaymentSuccessModal.module.css';

export default function PaymentSuccessModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconCircle}>
          <span>✓</span>
        </div>

        <div className={styles.eyebrow}>PAYMENT SUCCESSFUL</div>
        <h2 className={styles.title} id="success-modal-title">
          Thank you for your order
        </h2>

        <div className={styles.bookPill}>
          <img
            src="/client_images/book_cover_front.jpg"
            alt="You Will Not Fly"
            className={styles.pillThumb}
          />
          <div className={styles.pillText}>
            <strong>You Will Not Fly</strong>
            <span>Digital E-Book &amp; Interactive PDF Edition</span>
          </div>
        </div>

        <p className={styles.desc}>
          Your transaction has been securely processed. Your digital copy, interactive PDF, and receipt have been dispatched to your email address.
        </p>

        <button type="button" className={styles.actionBtn} onClick={onClose}>
          Continue to Website ↗
        </button>

        <p className={styles.note}>
          If you don't see the email within a few minutes, please check your spam folder or reach out directly to support.
        </p>
      </div>
    </div>
  );
}
