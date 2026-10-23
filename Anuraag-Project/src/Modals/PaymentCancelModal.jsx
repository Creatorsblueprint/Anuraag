import React, { useEffect } from 'react';
import styles from './PaymentCancelModal.module.css';

export default function PaymentCancelModal({ isOpen, onClose }) {
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

  const handleRetry = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('purchase');
      if (el) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(0, elementPosition - headerHeight),
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-modal-title"
    >
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconCircle}>
          <span>✕</span>
        </div>

        <div className={styles.eyebrow}>CHECKOUT CANCELLED</div>
        <h2 className={styles.title} id="cancel-modal-title">
          Your order was not completed
        </h2>

        <p className={styles.desc}>
          No payment was processed and no charges were made to your account. If you experienced an issue or would like to choose another edition, you can restart checkout at any time.
        </p>

        <div className={styles.actionsRow}>
          <button type="button" className={styles.retryBtn} onClick={handleRetry}>
            Choose an Edition ↗
          </button>
          <button type="button" className={styles.dismissBtn} onClick={onClose}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
