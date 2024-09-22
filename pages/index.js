import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  // Utilisez useEffect pour appeler la fonction asynchrone au montage du composant
  useEffect(() => {
  }, []); // Le tableau vide [] signifie que l'effet s'exécute seulement au montage
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
        }
      } catch (error) {
        console.error("Erreur d'authentification", error);
        router.push('/index');
      }
    };
    checkAuth();
    if (authorized){
      router.push('/protected');
    }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envoyer la requête POST au serveur
    const res = await fetch('/api/check-value', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: inputValue }),
    });

    const data = await res.json();
    setResponse(data.message);
    if (data.message.includes("protected")){
      router.push('/protected');
    }
  };

  return (
    <div>
      <h1>Accès restreint</h1>
      <form onSubmit={handleSubmit}>
        <p>Entrez le mot de passe</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Entrez une valeur"
          maxlength="20"
        />
        <button type="submit">Vérifier</button>
      </form>
      {response && (
        <p>
          {response}
          </p>
          )}
    </div>
  );
}
