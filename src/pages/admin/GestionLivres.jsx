import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GestionLivres = () => {
  const [livres, setLivres] = useState([]);
  const [titre, setTitre] = useState("");
  const [auteur, setAuteur] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFichier, setImageFichier] = useState(null);
  const [utiliserUpload, setUtiliserUpload] = useState(false);
  const [contenu, setContenu] = useState("");
  const [extrait, setExtrait] = useState("");
  const [stock, setStock] = useState(1);
  const [message, setMessage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [fichierUploadNom, setFichierUploadNom] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLivres();
  }, []);

  const fetchLivres = async () => {
    try {
      const res = await axios.get("https://booknest-backend-z9vo.onrender.com/livres");
      setLivres(res.data.livres);
    } catch (err) {
      console.error("Erreur chargement livres :", err);
    }
  };

  const handleUploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await axios.post("https://booknest-backend-z9vo.onrender.com/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      setImageUrl(res.data.url);
      setPreviewImage(`https://booknest-backend-z9vo.onrender.com${res.data.url}`);
      setFichierUploadNom(res.data.filename);
    } catch (err) {
      console.error("Erreur lors de l'upload de l'image :", err);
    }
  };  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFichier(file);
      handleUploadImage(file);
    }
  };

  const supprimerImageUploadee = async () => {
    if (!fichierUploadNom) return;
    try {
      await axios.delete(`https://booknest-backend-z9vo.onrender.com/upload/${fichierUploadNom}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImageUrl("");
      setPreviewImage("");
      setImageFichier(null);
      setFichierUploadNom("");
    } catch (err) {
      console.error("Erreur lors de la suppression du fichier uploadé:", err);
    }
  };

  const handleAddLivre = async (e) => {
    e.preventDefault();
    try {
      if (!titre || !description || (!imageUrl && !imageFichier)) {
        setMessage("Veuillez remplir tous les champs obligatoires et ajouter une image");
        return;
      }

      await axios.post(
        "https://booknest-backend-z9vo.onrender.com/admin/add-livre",
        { titre, auteur, description, categorie, image_url: imageUrl, contenu, extrait, stock },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Livre ajouté avec succès 📚✅");
      resetForm();
      fetchLivres();
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'ajout du livre");
    }
  };

  const resetForm = () => {
    setTitre("");
    setAuteur("");
    setDescription("");
    setCategorie("");
    setImageUrl("");
    setImageFichier(null);
    setPreviewImage("");
    setFichierUploadNom("");
    setContenu("");
    setExtrait("");
    setStock(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression du livre ?")) return;
    try {
      await axios.delete(`https://booknest-backend-z9vo.onrender.com/admin/delete-livre/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Livre supprimé avec succès 🗑️");
      fetchLivres();
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la suppression");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Gestion des Livres 📚</h2>

      {message && <div className="text-center mb-4 text-green-600">{message}</div>}

      {/* Ajouter un livre */}
      <form onSubmit={handleAddLivre} className="grid gap-4 mb-8">
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Auteur"
          value={auteur}
          onChange={(e) => setAuteur(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="p-2 border rounded"
        />

        {/* Toggle entre Upload et URL */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Image :</label>
          <button
            type="button"
            onClick={() => {
              setUtiliserUpload(!utiliserUpload);
              if (utiliserUpload) {
                supprimerImageUploadee();
              }
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
          >
            {utiliserUpload ? "Utiliser une URL" : "Uploader une image"}
          </button>
        </div>

        {utiliserUpload ? (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 border rounded"
            />
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Preview" className="h-32 object-cover mb-2" />
                <button
                  type="button"
                  onClick={supprimerImageUploadee}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Supprimer l'image
                </button>
              </div>
            )}
          </div>
        ) : (
          <input
            type="text"
            placeholder="Lien image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="p-2 border rounded"
          />
        )}
        <textarea
          placeholder="Extrait (HTML autorisé)"
          value={extrait}
          onChange={(e) => setExtrait(e.target.value)}
          className="p-2 border rounded"
        ></textarea>
        <textarea
          placeholder="Contenu complet (HTML autorisé)"
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          className="p-2 border rounded"
        ></textarea>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
          className="p-2 border rounded"
          min={1}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Ajouter le livre
        </button>
      </form>
      
      {/* Liste des livres et depuis le bouton supprimer peut supprimer le livre souhaité */}
      <div className="grid gap-6 md:grid-cols-2">
        {livres.map((livre) => (
          <div key={livre.id} className="bg-white shadow p-4 rounded relative">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-blue-600">{livre.titre}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/admin/update-livre/${livre.id}`)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(livre.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-2">Auteur : {livre.auteur}</p>
          <p className="text-sm text-gray-600">Catégorie : {livre.categorie}</p>
        </div>        
        ))}
      </div>
    </div>
  );
};

export default GestionLivres;
