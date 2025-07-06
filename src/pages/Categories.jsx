import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("https://booknest-backend-z9vo.onrender.com/livres")
      .then(res => {
        const livres = res.data.livres || [];
        const uniqueCategories = [...new Set(livres.map(l => l.categorie))]
        .sort((a, b) => a.localeCompare(b));
        setCategories(uniqueCategories);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Toutes les catégories</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((categorie, index) => (
          <Link key={index} to={`/livres/categories/${categorie}`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              {categorie}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
