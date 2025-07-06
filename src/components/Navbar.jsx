import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [utilisateur, setUtilisateur] = useState(null);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("utilisateur");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUtilisateur(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    setToken(null);
    setUtilisateur(null);
    navigate("/");
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/booknest_logo.png" alt="BookNest Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-bold text-blue-600">BookNest</h1>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <Link to="/livres" className="hover:text-blue-600">Livres</Link>
          <Link to="/categories" className="hover:text-blue-600">Catégories</Link>
          {!token ? (
            <>
              <Link to="/login" className="hover:text-blue-600">Connexion</Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                Créer un compte
              </Link>
            </>
          ) : (
            <>
              {utilisateur?.role === "admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  Dashboard Admin
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  Mon tableau de bord
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
              >
                Se déconnecter
              </button>
            </>
          )}
        </nav>
        {/* Mobile burger */}
        <button className="md:hidden text-blue-600" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white border-t border-gray-200 py-4 flex flex-col items-center space-y-2 text-center">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">Accueil</Link>
          <Link to="/livres" className="block text-gray-700 hover:text-blue-600">Livres</Link>
          <Link to="/categories" className="block text-gray-700 hover:text-blue-600">Catégories</Link>
          {!token ? (
            <>
              <Link to="/login" className="block text-gray-700 hover:text-blue-600">Connexion</Link>
              <Link
                to="/register"
                className="block bg-blue-600 text-white px-4 py-2 mx-auto w-fit rounded hover:bg-blue-700 transition text-sm"
              >
                Créer un compte
              </Link>
            </>
          ) : (
            <>
              {utilisateur?.role === "admin" ? (
                <Link
                  to="/admin/dashboard"
                  className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  Dashboard Admin
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
                >
                  Mon tableau de bord
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm"
              >
                Se déconnecter
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
