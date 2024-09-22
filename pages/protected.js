// pages/protected.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ProtectedPage() {
  const [authorized, setAuthorized] = useState(false);
  const [authMsg, setAuthMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
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
        setAuthMsg(data.message);
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

  return (
    <div>
      <h1>Page Protégée</h1>
      <p>Vous avez accès à cette page car vous êtes authentifié.</p>
      {authMsg && <p>authMsg: {authMsg}</p>}
    </div>
  );
}
