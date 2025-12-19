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

// --- 3. AŞAMA: Olay Dinleyicileri (Event Listeners) ---

// Kullanıcı arama kutusuna her harf yazdığında tetiklenir
searchInput.addEventListener("input", filterMovies);

// Kullanıcı filtreyi (dropdown) değiştirdiğinde tetiklenir
genreFilter.addEventListener("change", filterMovies);

// Filtreleme Fonksiyonu
function filterMovies() {
  const searchTerm = searchInput.value.toLowerCase(); // Aranan kelimeyi küçült
  const selectedGenre = genreFilter.value; // Seçilen kategoriyi al

  // Ana film listesi (allMovies) üzerinde filtreleme yap
  const filteredMovies = allMovies.filter((movie) => {
    // 1. Arama kriteri: Film başlığı aranan kelimeyi içeriyor mu?
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm);

    // 2. Kategori kriteri: Seçilen kategori uyuyor mu veya "hepsi" mi?
    // (HTML'deki option value="all" olduğunu varsayıyoruz)
    const matchesGenre =
      selectedGenre === "all" || movie.genre === selectedGenre;

    // İki şartı da sağlıyorsa listeye al
    return matchesSearch && matchesGenre;
  });

  // Ekrana sadece filtrelenmiş listeyi bas
  displayMovies(filteredMovies);
}

// --- Modal Açma/Kapama İşlemleri ---

const modal = document.getElementById("movieModal");
const closeBtn = document.querySelector(".close-btn");

// HTML elemanlarını seçelim (İçlerini dolduracağız)
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalOverview = document.getElementById("modalOverview");
const modalRating = document.getElementById("modalRating");
const modalGenre = document.getElementById("modalGenre");

// 1. Film Kartına Tıklama Olayı
// Grid'e tıklayınca hangi karta tıklandığını buluruz
movieGrid.addEventListener("click", (e) => {
  // Tıklanan yer bir kartın içindeyse, o kartı bul
  const card = e.target.closest(".movie-card");

  if (card) {
    // Kartın üzerindeki data-id'den filmin ID'sini al
    const movieId = parseInt(card.getAttribute("data-id"));

    // Bu ID'ye sahip filmi ana listemizden bul
    const movie = allMovies.find((m) => m.id === movieId);

    if (movie) {
      // Modaldaki bilgileri güncelle
      modalTitle.textContent = movie.title;
      modalImage.src = movie.poster;
      modalOverview.textContent = movie.description;
      modalRating.textContent = movie.imdb;
      modalGenre.textContent = movie.genre;

      // Modalı aç
      modal.classList.add("active");
    }
  }
});

// Kapatma Butonuna Tıklayınca
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Modalin Dışına Tıklayınca Kapat
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
