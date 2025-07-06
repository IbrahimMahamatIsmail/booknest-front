import { useState } from "react";
import axios from "axios";

const MotDePasseOublie = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://booknest-backend-z9vo.onrender.com/utilisateurs/mot-de-passe-oublie", { email }); 
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Une erreur est survenue. Vérifie ton email.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Mot de passe oublié ?</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Réinitialiser
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
    </div>
  );
};

export default MotDePasseOublie;
