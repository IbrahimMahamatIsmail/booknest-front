import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const LivreDetails = () => {
  const { id } = useParams();
  const [livre, setLivre] = useState(null);
  const [contenu, setContenu] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [avis, setAvis] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`https://booknest-backend-z9vo.onrender.com/livres/${id}`)
      .then(res => setLivre(res.data))
      .catch(err => console.error(err));
    
      axios.get(`https://booknest-backend-z9vo.onrender.com/avis/livre/${id}`)
    .then(res => setAvis(res.data))
    .catch(err => console.error("Erreur chargement avis:", err));
  }, [id]);

  useEffect(() => {
    if (!token) return;

    axios.get(`https://booknest-backend-z9vo.onrender.com/livres/${id}/contenu`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      setContenu(res.data.contenu);
    })
    .catch(err => {
      console.error("Erreur contenu:", err.response?.data?.message);
      setAccessDenied(true);
    });
  }, [id, token]);

  if (!livre) return <p className="text-center mt-10">Chargement du livre...</p>;

  return (
    <>
      <Helmet>
        <title>{livre.titre} | BookNest</title>
        <meta name="description" content={`Détails du livre ${livre.titre} par ${livre.auteur}. Découvrez sa description, extrait et avis des lecteurs.`} />
        <link rel="canonical" href={`https://booknest-front.vercel.app/livres/${id}`} />
      </Helmet>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">{livre.titre}</h1>
        <p className="text-gray-600 text-sm mb-4">Auteur : {livre.auteur} — Catégorie : {livre.categorie}</p>
        <img 
            src={livre.image_url.startsWith("/uploads") ? `https://booknest-backend-z9vo.onrender.com${livre.image_url}` : livre.image_url} 
            alt={livre.titre} 
            className="w-full h-auto max-w-md mx-auto rounded shadow mb-6" 
        />
        <p className="text-gray-800 leading-relaxed mb-4"><strong>Description : </strong> {livre.description}</p>

        <div className="bg-blue-50 p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Extrait du livre :</h2>
          <div dangerouslySetInnerHTML={{ __html: livre.extrait }} />
        </div>

        {!token &&(
          <div className="mt-6 flex flex-col items-center">
            <p className="text-gray-600">📚 Pour lire ce livre en entier, veuillez vous connecter et l’emprunter.</p>
            <Link to="/login" className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Se connecter & emprunter
            </Link>
          </div>
        )}

        {contenu ? (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <h4 className="text-green-700 font-bold mb-2">Contenu complet :</h4>
            <div dangerouslySetInnerHTML={{ __html: contenu }} />
            
          </div>
        ) : accessDenied ? (
          <div className="mt-6 text-center">
            <p className="text-sm text-red-500">🔒 Vous devez emprunter ce livre pour lire le contenu complet.</p>
          </div>
        ) : null}

        {/* Avis publics */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-blue-700 mb-4">💬 Avis des lecteurs :</h3>
          {avis.length > 0 ? (
            avis.map((a, index) => (
              <div key={index} className="bg-gray-50 border p-4 rounded mb-3">
                <p className="text-sm font-semibold text-gray-800">{a.nom_utilisateur} — Note : {a.note}/5</p>
                <p className="text-gray-700 italic">"{a.commentaire}"</p>
                <p className="text-xs text-gray-500 mt-1">Posté le {new Date(a.date_avis).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Aucun avis pour ce livre pour le moment.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LivreDetails;
