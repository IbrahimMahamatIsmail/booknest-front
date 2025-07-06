import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetMotDePasse = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://booknest-backend-z9vo.onrender.com/utilisateurs/reinitialiser-mot-de-passe/${token}`, {
        nouveauMotDePasse,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Lien invalide ou expiré.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">🔐 Réinitialisation du mot de passe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type={afficherMotDePasse ? "text" : "password"}
          placeholder="Nouveau mot de passe"
          value={nouveauMotDePasse}
          onChange={(e) => setNouveauMotDePasse(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <div className="text-sm text-gray-600 flex items-center gap-2">
          <input
            type="checkbox"
            checked={afficherMotDePasse}
            onChange={() => setAfficherMotDePasse(!afficherMotDePasse)}
          />
          <label>Afficher le mot de passe</label>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">Valider</button>
      </form>
      {message && (
        <p className="mt-4 text-sm text-green-600 text-center">{message}</p>
      )}
    </div>
  );
};

export default ResetMotDePasse;
