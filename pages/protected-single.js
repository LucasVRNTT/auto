import { useEffect, useState, useRef  } from 'react';
import { useRouter } from 'next/router';

const MonComposant = ({ content }) => {
  return (
      <div dangerouslySetInnerHTML={{ __html: content }} />
  );
};

const Home = ({ content }) => {
  useEffect(() => {
    // Fonction pour mettre à jour la section quand le hash change
    const updateContentBasedOnHash = () => {
      const hashe = window.location.hash;
      const titreToEdit = document.getElementById("titreComposant");
      const corpsToEdit = document.getElementById("corps");
      const sectionToAppendChild = document.getElementById("section");
      const newInput = document.createElement('input');
      const newImage = document.createElement('img');
      const imageSpan = document.getElementById("picture");

      if (titreToEdit) {
        titreToEdit.innerText = hashe ? hashe.slice(1) : "Nothing"; // Supprime le '#' du hash
          
          if (hashe === "#Volets") {
            corpsToEdit.innerText = "Contenu ajouté pour Volets\nA quelle heure ouvrir les volets demain ?";
            
            newInput.type = "time"
            sectionToAppendChild.appendChild(newInput);
          }
          else {
            sectionToAppendChild.removeChild(newInput);
          }
          if (hashe === "#Aspiro"){
            newImage.src = "images/aspiro.jpg"
            imageSpan.appendChild(newImage)
          }
          else {
            imageSpan.removeChild(newImage);
          }
      }
    };

    // Appelle une première fois pour gérer le hash initial au chargement de la page
    updateContentBasedOnHash();

    // Écoute les changements du hash et appelle la fonction à chaque changement
    window.addEventListener('hashchange', updateContentBasedOnHash);

    // Nettoyage de l'événement pour éviter des fuites de mémoire
    return () => {
      window.removeEventListener('hashchange', updateContentBasedOnHash);
    };
  }, [content]); // Le hook se déclenche si "content" change, mais il réagit aussi aux changements de hash

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
