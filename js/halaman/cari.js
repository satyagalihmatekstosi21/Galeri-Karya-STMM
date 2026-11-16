/* ==========================================================
   Logika layar Cari Karya - Galeri Karya STMM
   ========================================================== */

const ikonCariEl = document.getElementById('ikon-cari');
const inputCariEl = document.getElementById('input-cari');
const tombolHapusEl = document.getElementById('tombol-hapus');
const daftarChipEl = document.getElementById('daftar-chip-cari');
const subjudulHasilEl = document.getElementById('subjudul-hasil');
const daftarHasilEl = document.getElementById('daftar-hasil');
const wadahKosongEl = document.getElementById('wadah-kosong');

// 1. Inisialisasi ikon
ikonCariEl.innerHTML = ikon('cari', 20);

// 2. State pencarian
let kategoriDipilih = ambilParameter('k') || null;
const kataKunciAwal = ambilParameter('q') || '';

if (kataKunciAwal) {
  inputCariEl.value = kataKunciAwal;
}

// 3. Render chip kategori (Film, Video, Podcast, Foto, Gim)
function renderChips() {
  daftarChipEl.innerHTML = DAFTAR_KATEGORI.map((nama) => {
    const aktif = kategoriDipilih && kategoriDipilih.toLowerCase() === nama.toLowerCase();
    return `
      <button
        type="button"
        class="chip chip--garis"
        data-kategori="${aman(nama)}"
        aria-pressed="${aktif ? 'true' : 'false'}">
        ${aman(nama)}
      </button>
    `;
  }).join('');
}

// 4. Logika filter & pencarian karya
function jalankanPencarian() {
  const query = (inputCariEl.value || '').trim().toLowerCase();
  tombolHapusEl.style.display = query.length > 0 ? 'flex' : 'none';

  let hasil = KARYA;

  // Filter berdasarkan kategori jika ada yang dipilih
  if (kategoriDipilih) {
    hasil = hasil.filter(
      (k) => k.kategori.toLowerCase() === kategoriDipilih.toLowerCase()
    );
  }

  // Filter berdasarkan kata kunci judul atau nama kreator
  if (query.length > 0) {
    hasil = hasil.filter((k) => {
      const cocokJudul = k.judul.toLowerCase().includes(query);
      const kreator = cariKreator(k.kreatorId);
      const cocokKreator = kreator && kreator.nama.toLowerCase().includes(query);
      return cocokJudul || cocokKreator;
    });
  }

  // Update sub-judul
  if (query.length === 0 && !kategoriDipilih) {
    subjudulHasilEl.textContent = 'Karya terbaru';
  } else {
    subjudulHasilEl.textContent = `${hasil.length} karya ditemukan`;
  }

  // Render daftar hasil
  if (hasil.length === 0) {
    daftarHasilEl.style.display = 'none';
    wadahKosongEl.style.display = 'block';
    wadahKosongEl.innerHTML = `
      <div class="pesan-kosong">
        <div style="color: var(--warna-redup); margin-bottom: 8px;">
          ${ikon('cari', 48, 1.5)}
        </div>
        <strong>Tidak ada hasil</strong>
        <p class="teks-isi teks-redup">
          Tidak ditemukan karya yang cocok dengan pencarian Anda.
        </p>
        <button type="button" class="tombol tombol--utama" id="tombol-reset-cari" style="margin-top: 16px;">
          Reset Pencarian
        </button>
      </div>
    `;

    document.getElementById('tombol-reset-cari')?.addEventListener('click', () => {
      inputCariEl.value = '';
      kategoriDipilih = null;
      renderChips();
      jalankanPencarian();
      inputCariEl.focus();
    });
  } else {
    daftarHasilEl.style.display = 'flex';
    wadahKosongEl.style.display = 'none';

    daftarHasilEl.innerHTML = hasil.map((k) => {
      const kreator = cariKreator(k.kreatorId);
      const namaKreator = kreator ? kreator.nama : 'Mahasiswa STMM';
      return `
        <a class="cari-item" href="detail.html?id=${k.id}">
          <div class="cari-item__thumb" style="${gayaKategori(k.kategori)}">
            ${ikon(k.kategori, 24)}
          </div>
          <div class="cari-item__info">
            <span class="cari-item__judul">${aman(k.judul)}</span>
            <span class="cari-item__sub">${aman(namaKreator)} \u00B7 ${aman(k.kategori)}</span>
          </div>
        </a>
      `;
    }).join('');
  }
}

// 5. Event listener untuk chip filter kategori (toggle)
daftarChipEl.addEventListener('click', (e) => {
  const tombolChip = e.target.closest('.chip');
  if (!tombolChip) return;
  const targetKategori = tombolChip.getAttribute('data-kategori');

  if (kategoriDipilih && kategoriDipilih.toLowerCase() === targetKategori.toLowerCase()) {
    kategoriDipilih = null; // batalkan filter jika diklik lagi
  } else {
    kategoriDipilih = targetKategori;
  }

  renderChips();
  jalankanPencarian();
});

// 6. Event listener input pencarian
inputCariEl.addEventListener('input', jalankanPencarian);

// 7. Event listener tombol hapus input
tombolHapusEl.addEventListener('click', () => {
  inputCariEl.value = '';
  jalankanPencarian();
  inputCariEl.focus();
});

// Inisialisasi tampilan
renderChips();
jalankanPencarian();
