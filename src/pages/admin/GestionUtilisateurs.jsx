import { useEffect, useState } from "react";
import axios from "axios";

const GestionUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);

  
  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const token = localStorage.getItem("token"); // je récupère le token stocké
        const res = await axios.get("https://booknest-backend-z9vo.onrender.com/admin/utilisateurs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUtilisateurs(res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs admin :", err.response?.data || err.message);
      }
    };
    fetchUtilisateurs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression de l'utilisateur ?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://booknest-backend-z9vo.onrender.com/admin/utilisateurs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUtilisateurs((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur :", err.response?.data || err.message);
    }
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">📋 Liste des Utilisateurs</h2>
      {utilisateurs.length === 0 ? (
        <p className="text-gray-600">Aucun utilisateur trouvé.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nom</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Rôle</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.nom}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6">
                  <button 
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GestionUtilisateurs;
