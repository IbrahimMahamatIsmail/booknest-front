import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AvisLivre = () => {
  const { livreId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [commentaire, setCommentaire] = useState("");
  const [note, setNote] = useState(5);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://booknest-backend-z9vo.onrender.com/avis/${livreId}`,
        { commentaire, note: parseInt(note) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      setCommentaire("");
      setNote(5);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors de l'envoi de l'avis");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Laisser un avis</h2>
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Commentaire</label>
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium">Note (1 à 5)</label>
          <select
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publier mon avis
        </button>
      </form>
    </div>
  );
};

export default AvisLivre;
