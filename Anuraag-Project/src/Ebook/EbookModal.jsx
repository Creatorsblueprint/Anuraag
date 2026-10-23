import React, { useEffect } from 'react';
import styles from './EbookModal.module.css';

// =========================================================================
// GCP BUCKET PDF PREVIEW URL
// When the sample PDF is uploaded to your GCP bucket, simply paste the URL here:
// Example: 'https://storage.googleapis.com/anuraag-book-assets/you-will-not-fly-sample.pdf'
// =========================================================================
export const SAMPLE_PDF_URL = ''; // Paste GCP bucket PDF URL here

export default function EbookModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  const handlePurchaseClick = (e) => {
    e.preventDefault();
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
      aria-labelledby="modal-pdf-title"
    >
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.modalEyebrow}>BOOK PREVIEW · PDF DOCUMENT</span>
            <h2 id="modal-pdf-title" className={styles.modalTitle}>
              You Will Not Fly — Sample Pages
            </h2>
          </div>

          <div className={styles.headerActions}>
            {SAMPLE_PDF_URL && (
              <a
                href={SAMPLE_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.openExternalBtn}
                title="Open PDF in new tab"
              >
                <span>Open Full PDF</span>
                <span>↗</span>
              </a>
            )}
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close PDF preview"
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF Document Viewer Container */}
        <div className={styles.pdfViewerWrapper}>
          {SAMPLE_PDF_URL ? (
            /* When GCP bucket URL is provided, renders native PDF viewer in iframe */
            <iframe
              src={`${SAMPLE_PDF_URL}#toolbar=0&navpanes=0`}
              title="You Will Not Fly Sample PDF Preview"
              className={styles.pdfFrame}
            />
          ) : (
            /* Styled PDF Document Layout ready for GCP URL */
            <div className={styles.pdfDocContainer}>
              <div className={styles.pdfPageSheet}>
                <div className={styles.pdfPageHeader}>
                  <span>YOU WILL NOT FLY · DR. ANURAAG GUGLAANI</span>
                  <span>SAMPLE PREVIEW</span>
                </div>

                <div className={styles.pdfPageBody}>
                  <span className={styles.chapterOverline}>PROLOGUE</span>
                  <h3 className={styles.chapterHeading}>The Closed Runway</h3>

                  <p className={styles.openingCallout}>
                    WHAT HAPPENS WHEN THE DREAM YOU'VE BUILT YOUR ENTIRE LIFE AROUND DISAPPEARS IN FOUR WORDS?
                  </p>

                  <h4 className={styles.verdictQuote}>“YOU WILL NOT FLY.”</h4>

                  <p>
                    At twenty, after clearing one of the toughest selection processes in the country and training
                    at the National Defence Academy (NDA) to become a fighter pilot, Anuraag was grounded by a verdict
                    he could not appeal.
                  </p>

                  <p>
                    He hadn’t failed. He hadn’t quit. The sky he had staked everything on simply closed.
                  </p>

                  <div className={styles.pdfAxiomBox}>
                    <p>“A Verdict is not a Destiny. A Title is a Noun. What you can do is a Verb.”</p>
                    <small>— FROM YOU WILL NOT FLY</small>
                  </div>

                  <p>
                    What followed was not a comeback story. It was a thirty-year reinvention across factories,
                    family businesses, classrooms, and start-up investment rooms spanning twenty-six industries and
                    thirty-five countries.
                  </p>

                  <p>
                    This sample preview contains selected pages from Part I and Part II, introducing the five
                    interconnected disciplines: <strong>Cash · Decisions · Talent · Foresight · Governance</strong>.
                  </p>
                </div>

                <div className={styles.pdfPageFooter}>
                  <span>© Notion Press · Dr. Anuraag Guglaani</span>
                  <span>[ End of Sample Page 1 ]</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={styles.modalFooter}>
          <span className={styles.footerNote}>
            Published by Notion Press · Complete Edition Available in Hardcover &amp; Paperback
          </span>
          <a
            href="#purchase"
            className={styles.footerCtaBtn}
            onClick={handlePurchaseClick}
          >
            <span>Get the Book</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
