import CookieConsent, {getCookieConsentValue} from 'react-cookie-consent';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';

const ConsentBanner = () => {
  useEffect(() => {
    const consent = getCookieConsentValue('booknestConsent');
    if (!consent) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, []);
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accepter"
      declineButtonText="Refuser"
      enableDeclineButton
      cookieName="booknestConsent"
      style={{ background: "#2B373B", fontSize: "15px" }}
      buttonStyle={{ backgroundColor: "#4CAF50", color: "#fff", fontSize: "13px", borderRadius: "5px", padding: "10px 20px" }}
      declineButtonStyle={{ backgroundColor: "#f44336", color: "fff", fontSize: "13px", borderRadius: "5px", padding: "10px 20px" }}
      expires={150}
      onAccept={() => {
        if (window.gtag) {
          window.gtag('consent', 'update', { analytics_storage: 'granred' });
        }
        document.body.style.overflow = 'auto';
      }}
      onDecline={() => {
        if (window.gtag) {
          window.gtag('consent', 'update', { analytics_storage: 'denied' });
        }
        document.body.style.overflow = 'auto';
      }}
    >
      Ce site utilise des cookies pour améliorer votre expérience utilisateur, mesuser l'audience et améliorer notre service. 
      En cliquant sur "Accepter", vous consentez à l'utilisation de cookies conformément à notre politique de confidentialité.
      <Link to="/politique-de-confidentialite" style={{ color: "#fff", textDecoration: "underline", marginLeft: "8px" }}>
        En savoir plus
      </Link>
    </CookieConsent>
  );
};

export default ConsentBanner;
