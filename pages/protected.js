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
    fetch("board.html")
      .then(response => response.text())
      .then(data => {
        // Afficher le contenu HTML dans un élément spécifique
        document.getElementById('content').innerHTML = data;
      })
      .catch(error => console.error('Erreur lors de l\'importation du HTML:', error));
    }
}
