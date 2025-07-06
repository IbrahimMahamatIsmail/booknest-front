import { useEffect, useState } from "react";
import axios from "axios";

const LogsSuppression = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://booknest-backend-z9vo.onrender.com/admin/logs-suppressions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Erreur récupération logs :", err);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
        Suppressions RGPD Automatiques
      </h2>
      {logs.length === 0 ? (
        <p className="text-gray-600 text-center">Aucun utilisateur inactif trouvé.</p>
      ) : (
        <table className="min w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nom</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Raison</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6">{log.utilisateur_id}</td>
                <td className="py-3 px-6">{log.nom}</td>
                <td className="py-3 px-6">{log.email}</td>
                <td className="py-3 px-6">{new Date(log.date_suppression).toLocaleString()}</td>
                <td className="py-3 px-6">{log.raison}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LogsSuppression;
