/* ==========================================================
   Logika layar Profil Kreator - Galeri Karya STMM
   ========================================================== */

const wadahKreator = document.getElementById('wadah-kreator');

// 1. Ambil parameter ?id= dari URL
const id = ambilParameter('id');
const kreator = id ? cariKreator(id) : null;

// 2. Tangani jika kreator tidak ditemukan
if (!kreator) {
  wadahKreator.innerHTML = `
    <header class="bilah-atas">
      <a class="ikon-tombol" href="index.html" id="tombol-kembali" aria-label="Kembali ke Beranda"></a>
      <h1 class="bilah-atas__judul">Profil Kreator</h1>
      <span style="width: 44px;" aria-hidden="true"></span>
    </header>
    <main class="konten">
      <div class="pesan-kosong">
        <div style="color: var(--warna-redup); margin-bottom: 8px;">
          ${ikon('cari', 48, 1.5)}
        </div>
        <strong>Kreator Tidak Ditemukan</strong>
        <p class="teks-isi teks-redup">
          ${id ? `Kreator dengan ID &ldquo;${aman(id)}&rdquo; tidak ditemukan.` : 'Alamat profil tidak memuat ID kreator yang dicari.'}
        </p>
        <a class="tombol tombol--utama" href="index.html" style="margin-top: 16px;">
          Kembali ke Beranda
        </a>
      </div>
    </main>
  `;
  pasangTombolKembali('tombol-kembali');
} else {
  // 3. Perbarui judul halaman di tab browser
  document.title = `${kreator.nama} - Profil Kreator STMM`;

  // 4. Hitung data statistik karya kreator
  const karyaKreator = karyaMilik(kreator.id);
  const jumlahKarya = karyaKreator.length;
  const jumlahKategori = new Set(karyaKreator.map((k) => k.kategori)).size;
  const tahunBergabung = kreator.angkatan;

  // 5. Render tampilan profil kreator
  wadahKreator.innerHTML = `
    <!-- Hero Banner Biru -->
    <section class="kreator-hero">
      <header class="bilah-atas">
        <a class="ikon-tombol" href="index.html" id="tombol-kembali" aria-label="Kembali ke Beranda"></a>
        <h1 class="bilah-atas__judul" style="color: var(--warna-putih);">Profil Kreator</h1>
        <span style="width: 44px;" aria-hidden="true"></span>
      </header>

      <div class="kreator-hero__badan">
        <div class="kreator-hero__avatar">${aman(inisial(kreator.nama))}</div>
        <h2 class="kreator-hero__nama">${aman(kreator.nama)}</h2>
        <div class="kreator-hero__sub">${aman(kreator.prodi)} \u00B7 Angkatan ${aman(kreator.angkatan)}</div>
      </div>
    </section>

    <!-- 3 Kartu Statistik Mengambang -->
    <div class="kreator-stats">
      <div class="kreator-stats__kartu">
        <span class="kreator-stats__nilai">${jumlahKarya}</span>
        <span class="kreator-stats__label">Karya</span>
      </div>
      <div class="kreator-stats__kartu">
        <span class="kreator-stats__nilai">${jumlahKategori}</span>
        <span class="kreator-stats__label">Kategori</span>
      </div>
      <div class="kreator-stats__kartu">
        <span class="kreator-stats__nilai">${tahunBergabung}</span>
        <span class="kreator-stats__label">Bergabung</span>
      </div>
    </div>

    <!-- Konten Isi Profil -->
    <main class="kreator-konten">
      <!-- Tentang Kreator -->
      <section class="bagian">
        <h3 class="judul-bagian">Tentang Kreator</h3>
        <p class="teks-isi">${aman(kreator.bio)}</p>
      </section>

      <!-- Karya Kreator -->
      <section class="bagian">
        <h3 class="judul-bagian">Karya</h3>
        ${karyaKreator.length > 0 ? `
          <div class="grid-2">
            ${karyaKreator.map((k) => kartuKarya(k, { tampilkanKreator: false })).join('')}
          </div>
        ` : `
          <p class="teks-redup">Belum ada karya yang diunggah.</p>
        `}
      </section>
    </main>
  `;

  // 6. Pasang fungsi tombol kembali
  pasangTombolKembali('tombol-kembali');
}
