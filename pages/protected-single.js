import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Home = ({ content }) => {
  codeHtml = 
   (
      <div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
  );
  
  console.log("ba")
  hashe = window.location.hash;
	sectionToEdit = codeHtml.getElementById("titreComposant");
  if (hashe) {
    sectionToEdit.innerText = hashe
  }
  else {
    sectionToEdit.innerText = "Nothing"
  }
  console.log(hash)
  console.log(sectionToEdit)
  return codeHtml;
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
  console.log("nike")

  if (isClient && authorized) {
    return <Home content={content} />;
  }
  return null; // En attendant le rendu final
}
