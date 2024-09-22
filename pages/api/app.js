// app.js

// Fonction pour importer et afficher du HTML
function importHTML(filePath) {
    fetch(filePath)
      .then(response => response.text())
      .then(data => {
        // Afficher le contenu HTML dans un élément spécifique
        document.getElementById('content').innerHTML = data;
      })
      .catch(error => console.error('Erreur lors de l\'importation du HTML:', error));
  }
  
  // Appeler la fonction pour importer un fichier HTML
  importHTML('board.html');