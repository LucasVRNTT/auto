// pages/protected.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedPage() {
  const [authorized, setAuthorized] = useState(false);
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
    // return authMsg && <p>authMsg: {authMsg}</p>;
    return <p>Vérification de l'authentification...</p>;
  }

  if (isClient && authorized) {
    fetch('/api/load-html')
      .then((res) => res.text())
      .then((data) => setHtmlContent(data))
      .catch((err) => console.error('Erreur:', err));
    return (
      <div>
        <h1>Contenu HTML Importé</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  }
}
