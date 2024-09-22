import { useState, useEffect } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [authMsg, setAuthMsg] = useState('');

  // Utilisez useEffect pour appeler la fonction asynchrone au montage du composant
  useEffect(() => {
    const fetchAuthMessage = async () => {
      const res = await fetch('/api/check-auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      setAuthMsg(data.message); // Mettez à jour l'état avec le message d'authentification
    };

    fetchAuthMessage();
  }, []); // Le tableau vide [] signifie que l'effet s'exécute seulement au montage

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
  };

  return (
    <div>
      <h1>Vérifier la valeur</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Entrez une valeur"
        />
        <button type="submit">Vérifier</button>
      </form>
      {authMsg && <p>authMsg: {authMsg}</p>}
      {response && <p>Résultat: {response}</p>}
    </div>
  );
}
