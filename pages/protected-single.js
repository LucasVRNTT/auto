import { useEffect, useState, useRef  } from 'react';
import { useRouter } from 'next/router';

const MonComposant = ({ content }) => {
  return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

const Home = ({ content }) => {
  useEffect(() => {
      const hashe = window.location.hash;
      const sectionToEdit = document.getElementById("titreComposant");

      if (sectionToEdit) {
          sectionToEdit.innerText = hashe ? hashe.slice(1) : "Nothing"; // Supprime le '#' du hash
      }
  }, [content]); // Dépendance à content pour s'assurer que l'effet s'exécute après le rendu

  return (
      <div>
          <MonComposant content={content} />
      </div>
  );
};

export default function ProtectedPage() {
  const [authorized, setAuthorized] = useState(false);
  const [content, setContent] = useState('');
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mettre à jour l'état indiquant que le composant est monté côté client

    // Fonction pour vérifier l'authentification
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();

        if (data.authenticated) {
          setAuthorized(true);
          const resContent = await fetch('/single.html'); // Remplacez par l'URL correcte
          const textContent = await resContent.text();
          setContent(textContent);
        } else {
          console.error("Mauvais identifiant");
          router.push('/index'); // Redirection vers la page de login si non authentifié
        }
      } catch (error) {
        console.error("Erreur d'authentification", error);
        router.push('/index');
      }
    };

    checkAuth();
  }, []);

  if (!authorized) {
    return <p>Vérification de l'authentification...</p>;
  }
  console.log("nike");

  if (isClient && authorized) {
    return <Home content={content} />;
  }
  return null; // En attendant le rendu final
}
