import { useState } from "react";
import axios from "axios";

const RechercheLivre = () => {
  const [query, setQuery] = useState("");
  const [livres, setLivres] = useState([]);
  const handleSearch = async (query) => {
    try {
      const res = await axios.get(`https://booknest-backend-z9vo.onrender.com/livres/search?titre=${query}`);
      setLivres(res.data.livres);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
      setLivres([]);
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length > 0 ) {
      handleSearch(value);
    } else {
      setLivres([]);
    }
  };
  /*return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Rechercher un livre</h2>
      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange= {handleInputChange}
          placeholder="Ex : La Peste"
          className="border border-gray-300 p-2 rounded w-full relative z-10"
        />
        {livres.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded mt-2 w-full max-h-60 overflow-auto shadow-lg z-20 text-left">
            {livres.map((livre) => (
              <li
                key={livre.id}
                onClick={() => window.location.href = `/livres/${livre.id}`}  // Redirection simple vers la page du livre
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {livre.titre}
              </li>
            ))}
          </ul>
        )}
      </div>
      {query && livres.length === 0 && (
        <p className="text-sm text-gray-500 mt-2">Aucun livre trouvé.</p>
      )}
    </div>
  );*/
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
    <h2 className="text-xl font-semibold mb-4 text-blue-700">Rechercher un livre</h2>
      <div className="mb-6 flex justify-center">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Ex : La Peste"
            className="border border-gray-300 p-2 rounded w-full"
          />
          {livres.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-2 max-h-60 overflow-auto shadow-lg z-20 text-left">
              {livres.map((livre) => (
                <li
                  key={livre.id}
                  onClick={() => window.location.href = `/livres/${livre.id}`}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {livre.titre}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {query && livres.length === 0 && (
        <p className="text-sm text-gray-500 mt-2">Aucun livre trouvé.</p>
      )}
    </div>
  );
};
export default RechercheLivre;
