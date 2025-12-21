[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Xg2jV1i2)
# 🎬 CineLibrary - İnteraktif Film ve Medya Kütüphanesi

Bu proje, **Sakarya Üniversitesi - Web Teknolojileri** dersi kapsamında, modern web teknolojileri kullanılarak geliştirilmiş interaktif bir film arşiv uygulamasıdır. Kullanıcıların filmleri listeleyebileceği, detaylarını inceleyebileceği ve favorilerini tarayıcı hafızasında saklayabileceği bir arayüz sunar.

🔗 **Canlı Önizleme (Live Demo):** [Projeyi Görüntülemek İçin Tıklayın](https://sauwebprogramming.github.io/web-tech-project-YarenElff/)

---

##  Proje Hakkında

CineLibrary, statik bir HTML dosyası yerine, verileri harici bir **JSON** kaynağından dinamik olarak çeken bir yapıya sahiptir. Kullanıcı deneyimini artırmak için gelişmiş filtreleme, arama ve modal (açılır pencere) özellikleri eklenmiştir.

### Temel Özellikler

* **Dinamik Veri Yönetimi:** Tüm film verileri (resim, başlık, puan, tür vb.) `movies.json` dosyasından **Fetch API** kullanılarak çekilmektedir.
* **Gelişmiş Filtreleme:**
    * **Kategoriye Göre:** Aksiyon, Dram, Bilim Kurgu vb. türlere göre süzme.
    * **Yıla Göre:** JSON verisindeki yıllar otomatik olarak taranır ve eskiden yeniye sıralanarak filtreye eklenir.
    * **Arama (Search):** Film isimlerine göre anlık arama yapma imkanı.
* **Detay Modalı (Pop-up):** Kullanıcı sayfadan ayrılmadan, filmin üzerine tıkladığında şık bir pencere açılarak filmin özeti, geniş posteri ve detaylı puan bilgisi gösterilir.
* **Favori Sistemi (LocalStorage):**
    * Kullanıcılar beğendikleri filmleri "Kalp" ikonuna basarak favorilere ekleyebilir.
    * Bu veriler tarayıcının **LocalStorage** alanında tutulur. Sayfa yenilense bile favoriler kaybolmaz.
    * "Favorilerim" sekmesi üzerinden sadece seçili filmler listelenebilir.
* **Responsive Tasarım:** Mobil, tablet ve masaüstü cihazlarla tam uyumlu, CSS Grid ve Flexbox yapısı.

---

##  Kullanılan Teknolojiler

Proje geliştirilirken herhangi bir hazır kütüphane (Bootstrap vb.) kullanılmamış, tamamen **saf (vanilla)** kodlama yapılmıştır.

* **HTML5:** Semantik etiket yapısı.
* **CSS3:** CSS Variables, Flexbox, Grid Layout, Responsive Media Queries.
* **JavaScript (ES6+):** `async/await`, `fetch()`, `filter()`, `map()`, `localStorage`, DOM Manipülasyonu.
* **JSON:** Veri saklama formatı.

---

##  Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için:

1.  Bu repoyu klonlayın veya ZIP olarak indirin.
2.  Proje klasörünü VS Code ile açın.
3.  `movies.json` dosyasının okunabilmesi için yerel bir sunucuya ihtiyaç vardır.
    * VS Code **"Live Server"** eklentisi ile `index.html` dosyasına sağ tıklayıp **"Open with Live Server"** diyerek çalıştırabilirsiniz.
    * *(Doğrudan çift tıklayarak açıldığında CORS politikası gereği JSON verileri yüklenmeyebilir.)*

---

## 📂 Dosya Yapısı

```text
/
├── index.html      # Ana sayfa yapısı ve modal
├── style.css       # Tüm tasarımsal stiller ve responsive kurallar
├── app.js          # Veri çekme, filtreleme ve etkileşim mantığı
├── movies.json     # Film veri kaynağı
└── README.md       # Proje dökümantasyonu
