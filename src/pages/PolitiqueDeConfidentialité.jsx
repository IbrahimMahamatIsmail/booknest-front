import React from "react";
import { Helmet } from "react-helmet-async";

const PolitiqueDeConfidentialite = () => {
  const reAfficherConsentement = () => {
    document.cookie = "booknestConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
  };
  return (
    <>
      <Helmet>
        <title>Politique de confidentialité | BookNest</title>
        <meta name="description" content="Notre politique de confidentialité explique comment nous protégeons vos données sur BookNest." />
      </Helmet>

      <div className="max-w-4xl mx-auto p-8 text-sm text-gray-700">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center border-b-2 border-blue-200 pb-2"
        >
          Politique de confidentialité
        </h1>
        <p className="text-justify mb-4">
          BookNest respecte votre vie privée. Cette politique explique comment vos données sont collectées, utilisées
          et protégées.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Responsable du traitement</h2>
        <p>BookNest – IMISBRAH – Adresse email de contact : booknestapi@gmail.com</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. Données collectées</h2>
        <ul className="list-disc list-inside">
          <li>Nom, prénom, adresse email</li>
          <li>Données de connexion dernière connexion(last_login)</li>
          <li>Données analytiques anonymes (Google Analytics)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Finalités du traitements</h2>
        <p>Créer et gérer votre compte, améliorer nos services, respecter la réglementation.</p>
        <p>Permettre l’accès à votre bibliothèque numérique</p>
        <p>Améliorer la qualité du service (statistiques anonymes)</p>
        <p>Respecter nos obligations légales (ex. RGPD, sécurité)</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Vos droits</h2>
        <p>
          Conformément au RGPD, vous avez le droit d’accéder, rectifier, supprimer vos données. Contactez-nous à <strong>booknestapi@gmail.com</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Base légale du traitement</h2>
        <p>
          Le traitement de vos données repose sur votre consentement, l’exécution d’un contrat, le respect d’une obligation légale
          ou nos intérêts légitimes.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Durée de conservation</h2>
        <p>Compte inactif suppression automatique après <strong>12 mois</strong> d'inactivité (après notification)</p>
        <p>Données de connexion : 12 mois, données anonymes (statistiques) : conservées sans limite</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Destinataires des données</h2>
        <p>Vos données ne sont jamais vendues. Elles peuvent être partagées avec notre <strong>hébergeur</strong> sécurisé et notre outil <strong>d’analyse (Google Analytics)</strong></p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Hébergement et sécurité</h2>
        <p>
          Les données sont hébergées sur des serveurs sécurisés. Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos informations et ces serveurs utilise des mesures de sécurité pour protéger vos données.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">9. Vos droits</h2>
        <p>Conformément au RGPD, vous disposez de :</p>
          <ul>
          <li>1. Droit d’accès</li>
          <li>2. Droit de rectification</li>
          <li>3. Droit à l’effacement</li>
          <li>4. Droit d’opposition</li>
          <li>5. Droit à la portabilité</li>
          <li>6. Droit à la limitation du traitement</li>
          </ul>
        <p>Vous pouvez exercer vos droits à tout moment par email : <strong>booknestapi@gmail.com</strong></p>
        <h2 className="text-xl font-semibold mt-6 mb-2">10. Cookies</h2>
        <p>Nous n’utilisons aucun cookie marketing ou publicitaire. 
          Nous n’utilisons que des cookies strictement nécessaires pour le bon fonctionnement du site, à des fins statistiques anonymes (Google Analytics) et de sécurité.
          Aucune donnée n’est revendue ou exploitée à des fins commerciales.
          Vous pouvez modifier votre choix à tout moment en cliquant sur le lien ci-dessous :
        </p>

        <button 
          onClick={reAfficherConsentement}
          className="mt-4 bg-blue-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Modifier mon choix concernant les préférences de cookies
        </button>

        <p className="mt-6 text-sm text-gray-500">
        Si vous estimez que vos droits ne sont pas respectés pour plus d’informations, contactez-nous ou consultez la <strong>CNIL : www.cnil.fr</strong>
        </p>
      </div>
    </>
  );
};

export default PolitiqueDeConfidentialite;
