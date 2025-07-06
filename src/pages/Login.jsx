import { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword ] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
  
    try {
      const res = await axios.post("https://booknest-backend-z9vo.onrender.com/utilisateurs/login", {
        email,
        mot_de_passe: motDePasse,
      });
  
      const { token, utilisateur, ancienneDerniereConnexion  } = res.data;
      const utilisateurAvecDerniereConnexion = {
        ...utilisateur,
        ancienneDerniereConnexion,
      }
      localStorage.setItem("token", token);
      localStorage.setItem("utilisateur", JSON.stringify(utilisateurAvecDerniereConnexion));
  
      setMessage(res.data.message);
  
      if (utilisateur.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/dashboard";
      }
  
    } catch (err) {
      setMessage(err.response?.data?.error || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <>
      <Helmet>
        <title>Connexion | BookNest</title>
        <meta name="description" content="Connectez-vous à BookNest pour accéder à votre bibliothèque de livres numériques. Profitez d'une expérience de lecture enrichissante." />
        <link rel="canonical" href="https://booknest-front-pn2qapybn-ibrahimmahamatismails-projects.vercel.app/login" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Connexion</h2>
          {message && <p className="mb-4 text-sm text-center text-red-500">{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="relative">
              <label className="block mb-1 text-sm font-medium">Mot de passe</label>
              <input
                type={showPassword ? "text" : "password"}
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
                className="w-full p-2 border rounded"
              />
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />           
                <label>Afficher le mot de passe</label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Mot de passe oublié ? <Link to="/mot-de-passe-oublie" className="text-blue-600 hover:underline">Réinitialiser</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;