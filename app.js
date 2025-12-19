const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");
const yearFilter = document.getElementById("yearFilter");

let allMovies = []; // Tüm filmleri burada tutacağız
let favorites = JSON.parse(localStorage.getItem("favorites")) || []; //Favoriler için

// --- Verileri JSON Dosyasından Çekme (Fetch API) ---
async function fetchMovies() {
  try {
    const response = await fetch("movies.json");

    if (!response.ok) {
      throw new Error("Veri çekilemedi!");
    }
    const data = await response.json();
    allMovies = data;
    populateYears();

    // Filmleri ekrana bas
    displayMovies(allMovies);
  } catch (error) {
    console.error("Hata:", error);
    movieGrid.innerHTML = `<p class="error">Filmler yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.</p>`;
  }
}
function populateYears() {
  // Tüm filmlerden yılları al, tekrarlayanları kaldır (Set kullanarak)
  const years = [...new Set(allMovies.map((movie) => movie.year))];

  // Yılları yeniden eskiye sırala
  years.sort((a, b) => b - a);

  // Her yıl için bir <option> oluştur
  years.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
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

    // Film favorilerde mi kontrol et?
    const isFavorite = favorites.includes(movie.id);

    // HTML içine "favorite-btn" ekliyoruz:
    movieCard.innerHTML = `
            <div class="card-image">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                
                <button class="favorite-btn ${
                  isFavorite ? "active" : ""
                }" onclick="toggleFavorite(event, ${movie.id})">
                    ♥
                </button>
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

// --- Olay Dinleyicileri ---

searchInput.addEventListener("input", filterMovies);
genreFilter.addEventListener("change", filterMovies);
yearFilter.addEventListener("change", filterMovies);

function filterMovies() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedGenre = genreFilter.value;
  const selectedYear = yearFilter.value;

  const filteredMovies = allMovies.filter((movie) => {
    // Arama Kelimesi Kontrolü
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm);

    //  Kategori Kontrolü
    const matchesGenre =
      selectedGenre === "all" || movie.genre === selectedGenre;

    // Yıl Kontrolü
    // (movie.year sayı olduğu için string'e çevirip karşılaştırıyoruz)
    const matchesYear =
      selectedYear === "all" || movie.year.toString() === selectedYear;

    // Hepsi uyuyorsa göster
    return matchesSearch && matchesGenre && matchesYear;
  });

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

// --- FAVORİ İŞLEMLERİ ---
// 1. Favoriye Ekle/Çıkar Fonksiyonu
window.toggleFavorite = function (event, id) {
  // Detay penceresi açılmasın diye tıklamayı durdur
  event.stopPropagation();

  // ID listede var mı?
  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id); // Çıkar
  } else {
    favorites.push(id); // Ekle
  }

  // Tarayıcı hafızasına kaydet
  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Ekranı güncelle
  // Eğer şu an "Favorilerim" sekmesindeysek listeyi yenile
  if (showFavoritesBtn.classList.contains("active-tab")) {
    showOnlyFavorites();
  } else {
    // Değilsek sadece butonun rengini değiştir (Sayfa yenilenmesin diye)
    const btn = event.target;
    btn.classList.toggle("active");
  }
};

// 2. Navbar'daki "Favorilerim" Butonu
showFavoritesBtn.addEventListener("click", () => {
  // Eğer zaten favorilerdeysek, ana listeye dön
  if (showFavoritesBtn.classList.contains("active-tab")) {
    showFavoritesBtn.textContent = "Favorilerim";
    showFavoritesBtn.classList.remove("active-tab");
    showFavoritesBtn.classList.add("btn-outline");
    showFavoritesBtn.classList.remove("btn-primary");

    // Filtreleri sıfırla ve tümünü göster
    searchInput.value = "";
    genreFilter.value = "all";
    yearFilter.value = "all";
    displayMovies(allMovies);
  }
  // Değilse, sadece favorileri göster
  else {
    showOnlyFavorites();
  }
});

function showOnlyFavorites() {
  // Butonun görüntüsünü değiştir
  showFavoritesBtn.textContent = "Tüm Filmler";
  showFavoritesBtn.classList.add("active-tab");
  showFavoritesBtn.classList.remove("btn-outline");
  showFavoritesBtn.classList.add("btn-primary");

  // Sadece ID'si favoriler listesinde olan filmleri filtrele
  const favoriteMovies = allMovies.filter((movie) =>
    favorites.includes(movie.id)
  );
  displayMovies(favoriteMovies);
}
