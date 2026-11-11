import styles from './Footer.module.css';
import { trackSocialClick } from '../utils/analytics';
import { useTheme } from '../utils/ThemeContext';
import Link from '../router/Link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.wrap}>
        {/* Top Row: Brand & Quick Navigation */}
        <div className={styles.footerTop}>
          {/* <Link> so the logo also works from pages other than the home page */}
          <Link to="/" className={styles.brand} aria-label="Dr. Anuraag Guglaani home">
            <img
              src={theme === 'light' ? '/logos/name_logo.PNG' : '/logos/name_logo_white.png'}
              alt="Dr. Anuraag Guglaani"
              className={styles.brandLogo}
            />
          </Link>

          <div className={styles.footerTagline}>
            <span>AUTHOR · INVESTOR · PROFESSOR</span>
            <p className={styles.brandMotto}>The Family Business Doctor™</p>
          </div>

          <div className={styles.socialRow}>
            <a
              href="http://www.linkedin.com/in/anuraagguglaani"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
              onClick={() => trackSocialClick('LinkedIn', 'http://www.linkedin.com/in/anuraagguglaani')}
            >
              <span>LinkedIn ↗</span>
            </a>
            <a
              href="https://www.instagram.com/anuraagguglaani/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
              onClick={() => trackSocialClick('Instagram', 'https://www.instagram.com/anuraagguglaani/')}
            >
              <span>Instagram ↗</span>
            </a>
            <a
              href="https://www.threads.com/@anuraagguglaani"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Threads"
              onClick={() => trackSocialClick('Threads', 'https://www.threads.com/@anuraagguglaani')}
            >
              <span>Threads ↗</span>
            </a>
            {/* /falcons opens the home page and scrolls to the Falcons section */}
            <Link
              to="/falcons"
              className={styles.socialLink}
              aria-label="Falcons of Majlis"
              onClick={() => trackSocialClick('Falcons of Majlis', '/falcons')}
            >
              <span>Falcons ↗</span>
            </Link>
          </div>

          <a href="#top" onClick={handleScrollToTop} className={styles.backToTop}>
            <span>Back to top</span>
            <span className={styles.arrowUp}>↑</span>
          </a>
        </div>

        {/* Developer Tag on a Dedicated Centered Line Above Copyright */}
        <div className={styles.creditLine}>
          <span className={styles.developerCredit}>
            Developed By{' '}
            <a
              href="https://www.creatorsblueprint.io/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.creditLink}
            >
              Creators Blueprint
            </a>
          </span>
        </div>

        {/* Bottom Sub-footer */}
        <div className={styles.footerBottom}>
          <span>© {currentYear} Dr. Anuraag Guglaani. All rights reserved.</span>
          <span>BASED IN DUBAI. SHAPED BY THE WORLD.</span>
        </div>
      </div>
    </footer>
  );
}
