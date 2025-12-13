const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");

let allMovies = []; // Tüm filmleri burada tutacağız

// --- Verileri JSON Dosyasından Çekme (Fetch API) ---
async function fetchMovies() {
  try {
    const response = await fetch("movies.json");

    if (!response.ok) {
      throw new Error("Veri çekilemedi!");
    }
    const data = await response.json();
    allMovies = data;

    // Filmleri ekrana bas
    displayMovies(allMovies);
  } catch (error) {
    console.error("Hata:", error);
    movieGrid.innerHTML = `<p class="error">Filmler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>`;
  }
}

function displayMovies(movies) {
  movieGrid.innerHTML = "";

  // Eğer hiç film yoksa uyarı ver
  if (movies.length === 0) {
    movieGrid.innerHTML =
      '<p class="error">Aradığınız kriterlere uygun film bulunamadı.</p>';
    return;
  }

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.setAttribute("data-id", movie.id);

    movieCard.innerHTML = `
            <div class="card-image">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span class="rating-badge">IMDb: ${movie.imdb}</span>
                </div>
                <div class="genre-tag">${movie.genre}</div>
            </div>
        `;

    movieGrid.appendChild(movieCard);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchMovies();
});
