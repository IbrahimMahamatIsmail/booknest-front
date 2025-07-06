import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
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
  return (
    <div className="max-w-4xl mx-auto text-center p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Bienvenue {utilisateur?.nom} 👑
      </h1>
      <p className="text-gray-600 text-center">
        Dernière visite : {utilisateur.ancienneDerniereConnexion ? formatDate(utilisateur.ancienneDerniereConnexion) : "Première connexion"}
      </p>
      <p className="text-gray-600 mb-8">
        Vous êtes dans votre <span className="font-semibold text-blue-600">Espace Administrateur</span> ! <br />
        Ici, vous pouvez superviser les livres, gérer les utilisateurs, surveiller les avis des lecteurs 📖📝, et garder la bibliothèque au top ✍️.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Link to="/admin/gestion-livres" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg transition">
          Gérer les Livres 📚
        </Link>
        <Link to="/admin/gestion-utilisateurs" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg transition">
          Gérer les Utilisateurs 👥
        </Link>
        <Link to="/admin/logs-suppressions" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded text-lg transition">
          Voir les Utilisateurs inactifs 👥
        </Link>
        <Link to="/admin/gestion-avis" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded text-lg transition">
          Gérer les Avis 💬
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
