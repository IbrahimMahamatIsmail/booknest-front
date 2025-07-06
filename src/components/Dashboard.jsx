import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const [emprunts, setEmprunts] = useState([]);
  const [utilisateur, setUtilisateur] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  useEffect(() => {
    if (!token) return navigate("/login");

    const user = JSON.parse(localStorage.getItem("utilisateur"));
    console.log("Utilisateur récupéré du localStorage:", user);
    setUtilisateur(user);


    axios
      .get("https://booknest-backend-z9vo.onrender.com/emprunts/mes-emprunts", { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setEmprunts(res.data))
      .catch((err) => console.error("Erreur récupération emprunts:", err));
  }, [token, navigate]);

  // PROTECTION ici
  if (!utilisateur) {
    return <div className="p-8 text-center text-gray-500">Chargement du tableau de bord...</div>;
  }

  const handleRetour = async (empruntId) => {
    try {
      const res = await axios.put(
        `https://booknest-backend-z9vo.onrender.com/emprunts/${empruntId}/retour`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      setEmprunts((prev) =>
        prev.map((e) => (e.id === empruntId ? { ...e, rendu: true } : e))
      );
    } catch (err) {
      console.error("Erreur lors du retour:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">Bienvenue {utilisateur.nom} sur votre compte 👋📚</h1>
      <p className="text-gray-600 text-center">
        Dernière visite : {utilisateur.ancienneDerniereConnexion ? formatDate(utilisateur.ancienneDerniereConnexion) : "Première connexion"}
      </p>
      {emprunts.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">Vous n'avez pas encore emprunté de livres.</p>
          <Link to="/livres" className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            📖 Emprunter un livre
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {emprunts.map((e) => (
            <div key={e.id} className="bg-white shadow p-4 rounded">
              <h3 className="text-xl font-semibold text-blue-600">{e.titre}</h3>
              <p className="text-sm">Auteur : {e.auteur}</p>
              <p className="text-sm">Date d'emprunt : {new Date(e.date_emprunt).toLocaleDateString()}</p>
              <p className="text-sm">
                Statut : <span className={e.rendu ? "text-green-600" : "text-red-600"}>{e.rendu ? "Rendu" : "En cours"}</span>
              </p>
              <p className="text-sm">Date de retour : {new Date(e.date_retour).toLocaleDateString()}</p>
              {!e.rendu && (
                <button
                  onClick={() => handleRetour(e.id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Retourner le livre
                </button>
              )}
              {e.rendu && (
                <a
                  href={`/avis/${e.livre_id}`}
                  className="inline-block mt-2 text-blue-500 hover:underline"
                >
                  Laisser un avis 💬
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

