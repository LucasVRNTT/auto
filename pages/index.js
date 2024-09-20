// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

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
      {response && <p>Résultat: {response}</p>}
    </div>
  );
}
