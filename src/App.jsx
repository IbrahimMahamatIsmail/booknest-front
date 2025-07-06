import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

// Composants utilisateurs
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Mentions from "./pages/Mentions";
import PolitiqueDeConfidentialite from "./pages/PolitiqueDeConfidentialité";
import ListeLivres from "./pages/ListesLivres";
import LivresDetails from "./pages/LivresDetails";
import Categories from "./pages/Categories";
import LivresParcategorie from "./pages/LivreParCategorie";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MotDePasseOublie from "./pages/MotDePasseOublie";
import ResetMotDePasse from "./pages/ResetMotDePasse";
import Dashboard from "./components/Dashboard";
import AvisLivre from "./pages/AvisLivre";
import ConsentBanner from "./components/ConsentBanner";

// Composants admin
import AdminDashboard from "./components/AdminDashboard";
import GestionLivres from "./pages/admin/GestionLivres";
import ModifierLivre from "./pages/admin/ModifierLivre";
import GestionUtilisateurs from "./pages/admin/GestionUtilisateurs";
import LogsSuppression from "./pages/admin/LogsSuppression";
import GestionAvis from "./pages/admin/GestionAvis";

const App = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Protection Admin
  const isAdmin = () => {
    const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
    return utilisateur && utilisateur.role === "admin";
  };

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} /> {/* Toast notifications */}
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/livres/categories/:nom" element={<LivresParcategorie />} />
        <Route path="/livres" element={<ListeLivres />} />
        <Route path="/livres/:id" element={<LivresDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
        <Route path="/reinitialiser-mot-de-passe/:token" element={<ResetMotDePasse />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/avis/:livreId" element={<AvisLivre />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/mentions-legales" element={<Mentions />} />
        <Route path="/politique-de-confidentialite" element={<PolitiqueDeConfidentialite />} />
        {/* Admin uniquement */}
        <Route
          path="/admin/dashboard"
          element={isAdmin() ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/gestion-livres"
          element={isAdmin() ? <GestionLivres /> : <Navigate to="/login" />}
        />
        <Route 
          path="/admin/update-livre/:id" 
          element={isAdmin() ? <ModifierLivre /> : <Navigate to="/login" />} 
        />
        <Route
          path="/admin/gestion-utilisateurs"
          element={isAdmin() ? <GestionUtilisateurs /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/logs-suppressions"
          element={isAdmin() ? <LogsSuppression /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/gestion-avis"
          element={isAdmin() ? <GestionAvis /> : <Navigate to="/login" />}
        />
      </Routes>
      <ConsentBanner />
    </Router>
  );
};

export default App;
