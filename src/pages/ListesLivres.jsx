import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const ListeLivres = () => {
  const [livres, setLivres] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("https://booknest-backend-z9vo.onrender.com/livres")
      .then((res) => setLivres(res.data.livres))
      .catch((err) => console.error(err));
  }, []);
  const handleEmprunt = async (livreId) => {
    try {
      const res = await axios.post(`https://booknest-backend-z9vo.onrender.com/emprunts/${livreId}`, {}, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'emprunt");
    }
  };
  return (
    <>
      <Helmet>
        <title>Liste des livres | BookNest</title>
        <meta name="description" content="Découvrez notre collection de livres numériques. Empruntez facilement vos livres préférés. Découvrez des œuvres variées accessibles 24h/24." />
      </Helmet>
      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Tous les livres</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {livres.map((livre) => (
            <div key={livre.id} className="bg-white shadow p-4 rounded">
              {livre.image_url && (
                <img
                  src={livre.image_url.startsWith("/uploads") ? `https://booknest-backend-z9vo.onrender.com${livre.image_url}` : livre.image_url}
                  alt={`Couverture de ${livre.titre}`}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h3 className="text-lg font-semibold">{livre.titre}</h3>
              <p className="text-sm text-gray-600 mb-1">Auteur : {livre.auteur}</p>
              <p className="text-sm text-gray-500 mb-1">Catégorie : {livre.categorie}</p>
              <p className="text-sm text-gray-700 mb-2">
                {livre.description?.slice(0, 200)}...
              </p>
              <p className="italic text-gray-500 mb-3">
                <span className="font-semibold">Extrait :</span><br />
                <span dangerouslySetInnerHTML={{ __html: livre.extrait?.slice(0, 400) + "..." }} />
              </p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/livres/${livre.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Voir le livre →
                </Link>
                {token && (
                  <button
                    onClick={() => handleEmprunt(livre.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Emprunter
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListeLivres;
