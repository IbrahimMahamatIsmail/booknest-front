import { Link } from "react-router-dom";
import RechercheLivre from "../components/RechercheLivre";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Accueil | BookNest - Bibliothèque numérique</title>
        <meta
          name="description"
          content="Bienvenue sur BookNest, la bibliothèque numérique qui vous connecte à un monde de savoirs. Empruntez, lisez et partagez vos livres préférés !"
        />
        <link rel="canonical" href="https://booknest-front.vercel.app" />
      </Helmet>
      <meta name="google-site-verification" content="aqVsBfWwiTYaRkjDlkJ1HPWeyFWfdWiGZcMyhj5x-s4" />
      <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-20">
          <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4 text-blue-800">Bienvenue sur BookNest</h2>
            <p className="text-lg text-gray-700 mb-6">
              La bibliothèque numérique qui vous connecte à un monde de savoirs 📖
            </p>
            <div className="mb-6">
              <RechercheLivre />
            </div>
            <Link
              to="/livres"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
            >
              Explorer les livres
            </Link>
          </div>
        </section>
        {/* Features */}
        <section className="py-16 bg-white" data-aos="zoom-in">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-semibold text-gray-800">Pourquoi BookNest ?</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
                <h4 className="text-xl font-bold text-blue-600 mb-2">📥 Empruntez Facilement</h4>
                <p>Un clic suffit pour accéder à des centaines de livres triés par catégorie.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
                <h4 className="text-xl font-bold text-blue-600 mb-2">📝 Laissez un avis</h4>
                <p>Partagez vos ressentis et recommandations avec la communauté.</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md transition">
                <h4 className="text-xl font-bold text-blue-600 mb-2">🔐 Accès Sécurisé</h4>
                <p>Créez un compte, connectez-vous et gardez une trace de vos emprunts.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-600">
          <Link to="/a-propos" className="hover:underline">À propos</Link>
          <span className="hidden sm:inline">•</span>
          <Link to="/mentions-legales" className="hover:underline">Mentions légales</Link>
          <span className="hidden sm:inline">•</span>
          <Link to="/politique-de-confidentialite" className="hover:underline">Politique de confidentialité</Link>
        </div>
        {/* Mentions légales */}
        <section id="mentions" className="py-12 bg-white" data-aos="fade-up">
          <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-600">
            <p>
              Ce site est édité par <strong>BookNest Inc.</strong> – Tous droits réservés.<br />
              Pour toute question ou réclamation, veuillez nous contacter à :{" "}
              <a href="mailto:booknestapi@gmail.com" className="text-blue-600 hover:underline">
                booknestapi@gmail.com
              </a>
            </p>
          </div>
        </section>
        <footer className="bg-gray-100 py-6 mt-12 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} BookNest. Tous droits réservés.
        </footer>
      </div>
    </>
  );
};

export default Home;
