import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>À propos | BookNest</title>
        <meta
          name="description"
          content="Découvrez l'histoire et la mission de BookNest, une bibliothèque numérique née de la passion pour le savoir et l'accessibilité."
        />
      </Helmet>
      <div className="max-w-3xl mx-auto p-8 text-sm text-gray-800">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center border-b-2 border-blue-300 pb-2">
          À propos de BookNest
        </h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src="https://i.imgur.com/EolpCTH.jpg"
            alt="Fondateur de BookNest"
            className="w-48 h-48 rounded-full shadow-lg object-cover border-4 border-blue-200"
          />
          <p className="text-center text-sm italic text-gray-600">
            📸 Dans les coulisses : un instant capturé dans la bibliothèque universitaire de la faculté des sciences de Montpellier FDS, 
            où l’esprit de BookNest est né entre les rayonnages, le code, et une vision claire.
          </p>
        </div>

        <div className="space-y-4 text-justify text-sm leading-relaxed">
          <p>
            BookNest est une plateforme de bibliothèque numérique dédiée à rendre le savoir accessible à tous.
            Elle est bien plus qu’une simple bibliothèque numérique. C’est un projet né 
            de la passion d’un étudiant engagé, convaincu que la connaissance ne devrait jamais 
            être limitée par des murs ou des frontières.
          </p>
          <p>
            Mon objectif est de rendre la lecture et l’accès au savoir accessibles à tous, 
            24h/24, 7jours/7, depuis n’importe quel endroit de la planète terre. Que vous soyez passionné de littérature, de sciences, 
            étudiant ou simplement curieux, BookNest vous ouvre ses portes.
            Sa mission crucial est de connecter les lecteurs à un monde d’histoires, d’idées et d’inspiration, peu importe où ils se trouvent. 📚✨
          </p>
          <p>
            Derrière l’écran, il y a un passionné de lecture mais surtout un développeur, en chemise 
            rose, concentré devant son écran, de développement et d'impact social, 
            BookNest a été codé ligne par ligne avec une seule ambition qui est de rendre la connaissance libre, accessible et chaleureuse et de 
            transformer une idée locale en solution globale.
          </p>
          <p>Bienvenue dans le nid des esprits en éveil.</p>
          <p className="text-blue-700 font-semibold text-center mt-6">
            Rejoignez-nous dans cette aventure numérique.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;

