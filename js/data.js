/* ==========================================================
   DATA KARYA — Galeri Karya STMM
   ⚠️ DATA CONTOH: semua nama, judul, prodi, dan angka di sini
   karangan, BUKAN karya asli. Pertemuan 11 akan menggantinya
   dengan data dari Google Sheets tim kurator.

   File BERSAMA: hanya dosen/integrator yang boleh mengubah.

   Model data (kontrak bersama — semua tim memakai nama field ini):
   KREATOR: id, nama, prodi, angkatan, bio
   KARYA:   id, judul, kategori, genre, kreatorId, tahun, durasi,
            mataKuliah, sinopsis, youtubeId, thumbnail, unggulan
   - kategori : salah satu dari Film | Video | Podcast | Foto | Gim
   - durasi   : "mm:ss" untuk Film/Video/Podcast, "12 foto" untuk Foto,
                platform (misal "Web") untuk Gim
   - youtubeId: kode video YouTube (bagian setelah v= pada link), boleh ""
   - thumbnail: path/URL gambar, boleh "" (akan diganti blok warna)
   ========================================================== */

const KREATOR = [
  { id: 'raka-pratama', nama: 'Raka Pratama', prodi: 'Produksi Film & Televisi', angkatan: 2023,
    bio: 'Suka bercerita lewat gambar bergerak. Biasa mengambil peran sutradara dan editor, dengan DaVinci Resolve sebagai alat andalan.' },
  { id: 'nadia-putri', nama: 'Nadia Putri', prodi: 'Produksi Film & Televisi', angkatan: 2022,
    bio: 'Sinematografer yang senang bereksperimen dengan cahaya alami dan warna.' },
  { id: 'dimas-aditya', nama: 'Dimas Aditya', prodi: 'Penyiaran', angkatan: 2023,
    bio: 'Host dan produser podcast kampus. Tertarik pada cerita orang-orang biasa.' },
  { id: 'salsa-maharani', nama: 'Salsa Maharani', prodi: 'Jurnalistik', angkatan: 2024,
    bio: 'Fotografer jalanan yang memotret kehidupan pagi di kota.' },
  { id: 'bima-saputra', nama: 'Bima Saputra', prodi: 'Animasi & Gim', angkatan: 2023,
    bio: 'Membuat gim edukasi sederhana bertema budaya lokal.' },
  { id: 'ayu-lestari', nama: 'Ayu Lestari', prodi: 'Produksi Film & Televisi', angkatan: 2022,
    bio: 'Dokumenteris yang betah berlama-lama di pasar tradisional.' }
];

const KARYA = [
  { id: 1, judul: 'Senja di Ujung Dermaga', kategori: 'Film', genre: 'Drama', kreatorId: 'raka-pratama',
    tahun: 2025, durasi: '14:20', mataKuliah: 'Penyutradaraan', unggulan: true, youtubeId: '', thumbnail: '',
    sinopsis: 'Seorang nelayan muda harus memilih: tetap melaut bersama ayahnya atau mengejar mimpinya di kota. Film pendek ini direkam selama tiga hari di pesisir selatan dengan kru enam orang.' },
  { id: 2, judul: 'Rindu yang Pulang', kategori: 'Video', genre: 'Video Musik', kreatorId: 'nadia-putri',
    tahun: 2025, durasi: '04:12', mataKuliah: 'Videografi', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Video musik tentang perjalanan pulang kampung, direkam dari jendela kereta dan bus antarkota.' },
  { id: 3, judul: 'Obrolan Kampus Eps. 12', kategori: 'Podcast', genre: 'Talkshow', kreatorId: 'dimas-aditya',
    tahun: 2025, durasi: '32:15', mataKuliah: 'Produksi Audio', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Ngobrol santai bersama alumni tentang pengalaman magang pertama di stasiun televisi.' },
  { id: 4, judul: 'Pagi di Malioboro', kategori: 'Foto', genre: 'Jurnalistik', kreatorId: 'salsa-maharani',
    tahun: 2025, durasi: '10 foto', mataKuliah: 'Fotografi Jurnalistik', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Seri foto tentang pedagang, tukang becak, dan penyapu jalan sebelum kota ramai.' },
  { id: 5, judul: 'Petualangan Si Kancil', kategori: 'Gim', genre: 'Edukasi', kreatorId: 'bima-saputra',
    tahun: 2025, durasi: 'Web', mataKuliah: 'Desain Gim', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Gim petualangan singkat untuk anak SD, mengenalkan dongeng Nusantara lewat teka-teki.' },
  { id: 6, judul: 'Suara dari Pasar Lama', kategori: 'Video', genre: 'Dokumenter', kreatorId: 'ayu-lestari',
    tahun: 2024, durasi: '18:30', mataKuliah: 'Produksi Dokumenter', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Dokumenter tentang tiga generasi pedagang di pasar yang akan direnovasi.' },
  { id: 7, judul: 'Rumah Tanpa Jendela', kategori: 'Film', genre: 'Drama Keluarga', kreatorId: 'raka-pratama',
    tahun: 2024, durasi: '11:05', mataKuliah: 'Produksi Film Fiksi', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Kakak-beradik berusaha mempertahankan rumah peninggalan orang tua mereka.' },
  { id: 8, judul: 'Cerita Perantau Eps. 3', kategori: 'Podcast', genre: 'Cerita', kreatorId: 'dimas-aditya',
    tahun: 2024, durasi: '27:40', mataKuliah: 'Produksi Audio', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Kisah mahasiswa perantau dari luar Jawa tentang tahun pertama mereka di kota pelajar.' },
  { id: 9, judul: 'Di Balik Layar: Senja', kategori: 'Video', genre: 'Behind the Scenes', kreatorId: 'raka-pratama',
    tahun: 2025, durasi: '06:40', mataKuliah: 'Penyutradaraan', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Proses produksi film pendek Senja di Ujung Dermaga, dari reka adegan sampai hari terakhir syuting.' },
  { id: 10, judul: 'Potret Nelayan Selatan', kategori: 'Foto', genre: 'Dokumenter', kreatorId: 'raka-pratama',
    tahun: 2024, durasi: '12 foto', mataKuliah: 'Fotografi Dasar', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Wajah-wajah nelayan yang menjadi inspirasi tokoh dalam film Senja di Ujung Dermaga.' },
  { id: 11, judul: 'Langkah Terakhir', kategori: 'Film', genre: 'Thriller', kreatorId: 'nadia-putri',
    tahun: 2023, durasi: '09:50', mataKuliah: 'Penyutradaraan', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Seorang penjaga malam menemukan sesuatu yang janggal di gedung kampus yang kosong.' },
  { id: 12, judul: 'Kuis Aksara Jawa', kategori: 'Gim', genre: 'Kuis', kreatorId: 'bima-saputra',
    tahun: 2024, durasi: 'Web', mataKuliah: 'Desain Gim', unggulan: false, youtubeId: '', thumbnail: '',
    sinopsis: 'Kuis cepat untuk belajar membaca aksara Jawa, cocok dimainkan di HP.' }
];
