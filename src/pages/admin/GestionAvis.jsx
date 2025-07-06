import { useEffect, useState } from "react";
import axios from "axios";

const GestionAvis = () => {
  const [avis, setAvis] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAvis();
  }, []);

  const fetchAvis = async () => {
    try {
      const res = await axios.get("https://booknest-backend-z9vo.onrender.com/livres");
      const livres = res.data.livres || [];

      let allAvis = [];
      for (const livre of livres) {
        const avisRes = await axios.get(`https://booknest-backend-z9vo.onrender.com/avis/livre/${livre.id}`);
        allAvis = [...allAvis, ...avisRes.data];
      }
      setAvis(allAvis);
    } catch (err) {
      console.error("Erreur chargement des avis :", err);
    }
  };

  const handleDelete = async (avisId) => {
    if (!window.confirm("Supprimer cet avis ?")) return;
    try {
      await axios.delete(`https://booknest-backend-z9vo.onrender.com/admin/delete-avis/${avisId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Avis supprimé avec succès 💬🗑️");
      fetchAvis();
    } catch (err) {
      console.error("Erreur suppression :", err);
      setMessage("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Gestion des avis 💬</h2>

      {message && <div className="text-center mb-4 text-green-600">{message}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Livre ID</th>
              <th className="py-2 px-4 border">Utilisateur</th>
              <th className="py-2 px-4 border">Note</th>
              <th className="py-2 px-4 border">Commentaire</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {avis.map((a) => (
              <tr key={a.id} className="text-center">
                <td className="py-2 px-4 border">{a.id}</td>
                <td className="py-2 px-4 border">{a.livre_id}</td>
                <td className="py-2 px-4 border">{a.nom_utilisateur}</td>
                <td className="py-2 px-4 border">{a.note}/5</td>
                <td className="py-2 px-4 border">{a.commentaire}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionAvis;
