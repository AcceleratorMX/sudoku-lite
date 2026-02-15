import { useState, useEffect } from "react";
import { CookieConsent as styles } from "../../css";

const CONSENT_KEY = "sudoku-cookie-consent";

/**
 * CookieConsent Component
 *
 * Displays a consent banner informing users about local data storage.
 * Compliant with data protection principles and Ukrainian Law No. 2297-VI
 * "On Personal Data Protection".
 *
 * This application does not use HTTP cookies — only localStorage for
 * saving game progress, settings, and leaderboard scores.
 *
 * @returns {JSX.Element|null} The consent banner or null if already accepted/declined
 */
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.overlay}
      id="cookie-consent-banner"
      role="dialog"
      aria-label="Data storage consent"
    >
      <div className={styles.container}>
        <h3 className={styles.title}>
          <span className={styles.icon}>🔒</span>
          Data Storage Notice
        </h3>
        <p className={styles.text}>
          This application uses your browser&apos;s local storage to save game
          progress, player settings, and leaderboard scores. No data is sent to
          any server or shared with third parties — everything stays on your
          device. By continuing, you agree to the local storage of this data.
          Read our{" "}
          <a
            href="https://github.com/AcceleratorMX/sudoku-lite/blob/main/PRIVACY_POLICY.md"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Privacy Policy
          </a>{" "}
          for more details.
        </p>
        <div className={styles.actions}>
          <button
            className={styles.acceptBtn}
            onClick={handleAccept}
            id="cookie-accept-btn"
          >
            Accept
          </button>
          <button
            className={styles.declineBtn}
            onClick={handleDecline}
            id="cookie-decline-btn"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
