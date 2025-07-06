import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LivresParCategorie = () => {
  const { nom } = useParams();
  const [livres, setLivres] = useState([]);

  useEffect(() => {
    axios.get(`https://booknest-backend-z9vo.onrender.com/livres/categories/${nom}`) 
      .then(res => setLivres(res.data))
      .catch(err => console.error(err));
  }, [nom]);

  return (
    <>
      <Helmet>
        <title>Livres de la catégorie {nom} | BookNest</title>
        <meta name="description" content={`Découvrez les livres de la catégorie ${nom} sur BookNest. Explorez notre collection variée et trouvez votre prochaine lecture.`} />
      </Helmet>
      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Livres de la catégorie : {nom}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {livres.map((livre) => (
            <div key={livre.id} className="bg-white shadow p-4 rounded">
              {livre.image_url && (
                <img 
                    src={livre.image_url.startsWith("/uploads") ? `https://booknest-backend-z9vo.onrender.com${livre.image_url}` : livre.image_url}
                    alt={`Couverture de ${livre.titre}`} 
                    className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h3 className="text-lg font-semibold">{livre.titre}</h3>
              <p className="text-sm text-gray-600 mb-2">{livre.auteur}</p>
              <p className="text-sm">{livre.description.slice(0, 400)}...</p>
              <p className="text-sm italic">
                <span className="font-semibold">Extrait :</span><br />
                <span dangerouslySetInnerHTML={{__html: livre.extrait?.slice(0, 400) + "..."}} />
              </p>
              <Link to={`/livres/${livre.id}`} className="inline-block text-blue-700 hover:underline font-medium">Lire plus ...</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LivresParCategorie;
