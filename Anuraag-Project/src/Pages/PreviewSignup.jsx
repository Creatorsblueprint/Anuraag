import LeadForm from './LeadForm';
import styles from './PlaceholderPage.module.css';

/**
 * PreviewSignup — section on the Book page where a visitor leaves their email
 * to get the free preview of the digital book.
 * The preview file has not arrived from the client yet, so for now the text
 * promises to send it when it is ready. Once the file exists, this section
 * will give access to it straight away.
 */
export default function PreviewSignup() {
  return (
    <section className={styles.band} id="preview">
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>FREE PREVIEW</p>
        <h2 className={styles.heading}>Read before you buy</h2>
        <p className={styles.text}>
          A free preview of the digital book is on its way. Leave your email and it will be sent
          to you as soon as it is ready.
        </p>
        <LeadForm
          source="preview"
          consentLabel="Also send me occasional updates from Dr. Anuraag Guglaani. (Optional)"
          buttonLabel="Send Me the Preview"
          successTitle="You are on the list."
          successText="The preview will be emailed to you as soon as it is ready."
        />
      </div>
    </section>
  );
}
