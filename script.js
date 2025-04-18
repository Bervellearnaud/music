const RAPID_API_KEY = "a13ccdca77msh3d7238ed3cbfc4ep1617fcjsn02f27dd180ba"; // Remplace par ta clé

document.getElementById("search-btn").addEventListener("click", searchSong);

// Optionnel : permettre la recherche avec la touche "Entrée"
document.getElementById("search").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    searchSong();
  }
});

function searchSong() {
  const query = document.getElementById("search").value.trim();
  if (!query) {
    alert("Veuillez entrer un nom de chanson.");
    return;
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "<p>Chargement...</p>";

  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${encodeURIComponent(query)}`;

  fetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resultsDiv.innerHTML = "";
      if (!data.data.length) {
        resultsDiv.innerHTML = "<p>Aucun résultat trouvé.</p>";
        return;
      }
      data.data.slice(0, 5).forEach((track) => {
        const trackElement = document.createElement("div");
        trackElement.classList.add("track");
        trackElement.innerHTML = `
          <img src="${track.album.cover_medium}" alt="Cover de l'album ${track.album.title}" />
          <p><strong>${track.title}</strong><br><em>${track.artist.name}</em></p>
          <audio controls src="${track.preview}" preload="none"></audio>
        `;
        resultsDiv.appendChild(trackElement);
      });
    })
    .catch((error) => {
      console.error("Erreur:", error);
      alert("Erreur de récupération des données. Vérifie ta clé API.");
      resultsDiv.innerHTML = "";
    });
}
