/* ==========================================================
   Logika layar Kategori — Galeri Karya STMM
   ========================================================== */

const DAFTAR_SEMUA_KATEGORI = ['Semua', ...DAFTAR_KATEGORI];

const daftarChipEl = document.getElementById('daftar-chip');
const infoJumlahEl = document.getElementById('info-jumlah-karya');
const pilihUrutanEl = document.getElementById('pilih-urutan');
const ikonUrutanEl = document.getElementById('ikon-urutan');
const gridKaryaEl = document.getElementById('grid-karya');
const wadahKosongEl = document.getElementById('wadah-kosong');

// Ikon panah bawah (chevron down) untuk pemilih urutan
ikonUrutanEl.innerHTML = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
`;

/**
 * Menentukan kategori yang aktif berdasarkan parameter URL ?k=
 */
function dapatkanKategoriDariURL() {
  const kParam = ambilParameter('k');
  if (!kParam) return 'Semua';
  const cocok = DAFTAR_SEMUA_KATEGORI.find(
    (item) => item.toLowerCase() === kParam.toLowerCase()
  );
  return cocok || 'Semua';
}

let kategoriAktif = dapatkanKategoriDariURL();

/**
 * Render tombol deret chip
 */
function renderChip() {
  daftarChipEl.innerHTML = DAFTAR_SEMUA_KATEGORI.map((nama) => {
    const aktif = nama.toLowerCase() === kategoriAktif.toLowerCase();
    return `
      <button
        type="button"
        class="chip"
        data-kategori="${aman(nama)}"
        aria-pressed="${aktif ? 'true' : 'false'}">
        ${aman(nama)}
      </button>
    `;
  }).join('');
}

/**
 * Filter dan sortir karya berdasarkan kategori aktif dan pilihan urutan
 */
function dapatkanKaryaTampil() {
  let hasil = KARYA;

  // Filter berdasarkan kategori
  if (kategoriAktif !== 'Semua') {
    hasil = hasil.filter(
      (k) => k.kategori.toLowerCase() === kategoriAktif.toLowerCase()
    );
  }

  // Sortir karya
  const urutan = pilihUrutanEl.value;
  hasil = [...hasil].sort((a, b) => {
    if (urutan === 'terbaru') {
      return b.id - a.id;
    }
    if (urutan === 'terlama') {
      return a.id - b.id;
    }
    if (urutan === 'az') {
      return a.judul.localeCompare(b.judul);
    }
    return 0;
  });

  return hasil;
}

/**
 * Render grid karya dan update bilah info
 */
function renderGrid() {
  const karyaTampil = dapatkanKaryaTampil();

  // Update teks info (misal: "24 karya · Film" atau "24 karya")
  const teksKategori = kategoriAktif === 'Semua' ? '' : ` \u00B7 ${kategoriAktif}`;
  infoJumlahEl.textContent = `${karyaTampil.length} karya${teksKategori}`;

  // Update judul halaman
  document.title = `${kategoriAktif === 'Semua' ? 'Kategori' : kategoriAktif} - Galeri Karya STMM`;

  if (karyaTampil.length === 0) {
    gridKaryaEl.style.display = 'none';
    wadahKosongEl.style.display = 'block';
    wadahKosongEl.innerHTML = `
      <div class="pesan-kosong">
        <div style="color: var(--warna-redup); margin-bottom: 8px;">
          ${ikon('cari', 48, 1.5)}
        </div>
        <strong>Belum ada karya</strong>
        <p class="teks-isi teks-redup">Belum ada karya untuk kategori &ldquo;${aman(kategoriAktif)}&rdquo;.</p>
        <button type="button" class="tombol tombol--utama" id="tombol-reset-kategori" style="margin-top: 16px;">
          Tampilkan Semua Karya
        </button>
      </div>
    `;

    document.getElementById('tombol-reset-kategori')?.addEventListener('click', () => {
      pilihKategori('Semua');
    });
  } else {
    gridKaryaEl.style.display = 'grid';
    wadahKosongEl.style.display = 'none';
    gridKaryaEl.innerHTML = karyaTampil.map((k) => kartuKarya(k)).join('');
  }
}

/**
 * Ubah kategori aktif & perbarui URL serta UI
 */
function pilihKategori(kategori, perbaruiHistory = true) {
  kategoriAktif = kategori;

  if (perbaruiHistory) {
    const url = new URL(window.location.href);
    if (kategori === 'Semua') {
      url.searchParams.delete('k');
    } else {
      url.searchParams.set('k', kategori);
    }
    window.history.pushState({ kategori }, '', url.href);
  }

  // Update aria-pressed di semua chip
  const semuaChip = daftarChipEl.querySelectorAll('.chip');
  semuaChip.forEach((chip) => {
    const nama = chip.getAttribute('data-kategori');
    chip.setAttribute(
      'aria-pressed',
      nama.toLowerCase() === kategoriAktif.toLowerCase() ? 'true' : 'false'
    );
  });

  renderGrid();
}

// Inisialisasi tampilan
renderChip();
renderGrid();

// Event listener untuk klik pada chip kategori
daftarChipEl.addEventListener('click', (e) => {
  const tombolChip = e.target.closest('.chip');
  if (!tombolChip) return;
  const targetKategori = tombolChip.getAttribute('data-kategori');
  if (targetKategori && targetKategori !== kategoriAktif) {
    pilihKategori(targetKategori);
  }
});

// Event listener untuk pilihan sortir
pilihUrutanEl.addEventListener('change', () => {
  renderGrid();
});

// Tangani tombol Back / Forward di browser (popstate)
window.addEventListener('popstate', () => {
  const kategoriDariURL = dapatkanKategoriDariURL();
  pilihKategori(kategoriDariURL, false);
});
