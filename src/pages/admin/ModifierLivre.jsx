import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"; // Import du toast

const ModifierLivre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [livre, setLivre] = useState("");
  const [utiliserUpload, setUtiliserUpload] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imagePublicId, setImagePublicId] = useState("");
  // const [fichierUploadNom, setFichierUploadNom] = useState("");


  useEffect(() => {
    const fetchLivre = async () => {
      try {
        const res = await axios.get(`https://booknest-backend-z9vo.onrender.com/livres/${id}`);
        setLivre(res.data);
        setPreviewImage(res.data.image_url || ""); // Pour afficher l'image actuelle si elle existe new
      } catch (err) {
        console.error("Erreur récupération livre :", err);
      }
    };
    fetchLivre();
  }, [id]);

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
      setLivre({ ...livre, image_url: res.data.url });
      // setPreviewImage(`https://booknest-backend-z9vo.onrender.com${res.data.url}`);
      setPreviewImage(res.data.url);
      setImagePublicId(res.data.public_id);
      // setFichierUploadNom(res.data.filename);
      toast.success("Image uploadée ✅");
    } catch (err) {
      console.error("Erreur upload image:", err);
      toast.error("Erreur lors de l'upload de l'image !");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadImage(file);
    }
  };

  const supprimerImageUploadee = async () => {
    if (!imagePublicId) {
      toast.error("Aucune image à supprimer");
      return;
    }
    try {
      await axios.delete(`https://booknest-backend-z9vo.onrender.com/upload/${imagePublicId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLivre({ ...livre, image_url: "" });
      setPreviewImage("");
      // setFichierUploadNom("");
      setImagePublicId("");
      toast.success("Image supprimée 🗑️");
    } catch (err) {
      console.error("Erreur lors de la suppression du fichier uploadé:", err);
      toast.error("Erreur suppression !");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://booknest-backend-z9vo.onrender.com/admin/update-livre/${id}`,
        livre,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Livre modifié avec succès 🚀"); // Toast ici
      navigate("/admin/gestion-livres");
    } catch (err) {
      console.error("Erreur lors de la modification:", err);
      toast.error("Erreur lors de la modification");
    }
  };

  if (!livre) return <p>Chargement...</p>; // TODO: Améliorer le loading

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Modifier Livre ✏️</h2>
      <form onSubmit={handleUpdate} className="grid gap-4">
        <input
          type="text"
          value={livre.titre}
          onChange={(e) => setLivre({ ...livre, titre: e.target.value })}
          className="p-2 border rounded"
          placeholder="Titre"
          required
        />
        <input
          type="text"
          value={livre.auteur}
          onChange={(e) => setLivre({ ...livre, auteur: e.target.value })}
          className="p-2 border rounded"
          placeholder="Auteur"
        />
        <input
          type="text"
          value={livre.categorie}
          onChange={(e) => setLivre({ ...livre, categorie: e.target.value })}
          className="p-2 border rounded"
          placeholder="Catégorie"
        />
        {/* Partie upload OU lien image */}
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
            value={livre.image_url}
            onChange={(e) => setLivre({ ...livre, image_url: e.target.value })}
            className="p-2 border rounded"
            placeholder="URL Image"
          />
        )}

        <textarea
          value={livre.description}
          onChange={(e) => setLivre({ ...livre, description: e.target.value })}
          className="p-2 border rounded"
          placeholder="Description"
        ></textarea>
        <textarea
          value={livre.extrait}
          onChange={(e) => setLivre({ ...livre, extrait: e.target.value })}
          className="p-2 border rounded"
          placeholder="Extrait"
        ></textarea>
        <textarea
          value={livre.contenu}
          onChange={(e) => setLivre({ ...livre, contenu: e.target.value })}
          className="p-2 border rounded"
          placeholder="Contenu"
        ></textarea>
        <input
          type="number"
          value={livre.stock}
          min={1}
          onChange={(e) => setLivre({ ...livre, stock: parseInt(e.target.value) })}
          className="p-2 border rounded"
          placeholder="Stock"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default ModifierLivre;
