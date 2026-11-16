/* ==========================================================
   Logika layar Detail Karya — Galeri Karya STMM
   ========================================================== */

// 1. Inisialisasi tombol bilah atas
pasangTombolKembali('tombol-kembali');

const tombolBagikanAtas = document.getElementById('tombol-bagikan-atas');
tombolBagikanAtas.innerHTML = ikon('bagikan', 22);

const kontenDetail = document.getElementById('konten-detail');

// 2. Ambil parameter ?id= dari URL
const id = ambilParameter('id');
const karya = id ? cariKarya(id) : null;
const kreator = karya ? cariKreator(karya.kreatorId) : null;

// 3. Tangani jika karya tidak ditemukan
if (!karya) {
  tombolBagikanAtas.style.display = 'none';

  kontenDetail.innerHTML = `
    <div class="pesan-kosong">
      <div style="color: var(--warna-redup); margin-bottom: 8px;">
        ${ikon('cari', 48, 1.5)}
      </div>
      <strong>Karya Tidak Ditemukan</strong>
      <p class="teks-isi teks-redup">
        ${id ? `Karya dengan ID &ldquo;${aman(id)}&rdquo; tidak ditemukan.` : 'Alamat karya tidak memuat ID karya yang dicari.'}
      </p>
      <a class="tombol tombol--utama" href="index.html" style="margin-top: 16px;">
        Kembali ke Beranda
      </a>
    </div>
  `;
} else {
  // 4. Perbarui judul halaman di browser
  document.title = `${karya.judul} · Galeri Karya STMM`;

  // 5. Setup data pendukung
  const labelKategori = karya.kategori === 'Film' ? 'Film Pendek' : karya.kategori;
  const labelSatuan = KATEGORI[karya.kategori]?.satuan || 'Durasi';
  const urlYouTube = karya.youtubeId
    ? `https://www.youtube.com/watch?v=${encodeURIComponent(karya.youtubeId)}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(karya.judul + ' STMM')}`;

  const inisialKreator = kreator ? inisial(kreator.nama) : 'ST';
  const namaKreator = kreator ? kreator.nama : 'Mahasiswa STMM';
  const subKreator = kreator
    ? `${kreator.prodi} · Angkatan ${kreator.angkatan}`
    : 'Sekolah Tinggi Multi Media';

  // 6. Dapatkan karya lain dari kreator yang sama
  const karyaLain = kreator
    ? karyaMilik(kreator.id).filter((k) => String(k.id) !== String(karya.id))
    : [];

  // 7. Render konten detail
  kontenDetail.innerHTML = `
    <!-- Pemutar Media / Video -->
    <div class="detail-pemutar" id="pemutar-media">
      <button class="detail-pemutar__putar" id="tombol-putar" aria-label="Putar video" type="button">
        ${IKON_PUTAR}
      </button>
      <span class="detail-pemutar__keterangan">Video tersemat dari YouTube</span>
    </div>

    <!-- Kategori & Genre -->
    <div class="deret-chip">
      <span class="chip chip--kategori" style="${gayaKategori(karya.kategori)}">
        ${aman(labelKategori)}
      </span>
      ${karya.genre ? `<span class="chip chip--genre">${aman(karya.genre)}</span>` : ''}
    </div>

    <!-- Judul Karya -->
    <h1 class="detail-judul">${aman(karya.judul)}</h1>

    <!-- Kartu Profil Kreator -->
    <div class="detail-kreator">
      <div class="detail-kreator__avatar">${aman(inisialKreator)}</div>
      <div class="detail-kreator__info">
        <div class="detail-kreator__nama">${aman(namaKreator)}</div>
        <div class="detail-kreator__sub">${aman(subKreator)}</div>
      </div>
      ${kreator ? `<a class="detail-kreator__profil" href="kreator.html?id=${encodeURIComponent(kreator.id)}">Profil</a>` : ''}
    </div>

    <!-- Sinopsis -->
    <p class="teks-isi">${aman(karya.sinopsis)}</p>

    <!-- Info Metadata -->
    <div class="detail-meta-grid">
      <div class="detail-meta-box">
        <span class="detail-meta-box__label">Tahun</span>
        <span class="detail-meta-box__nilai">${aman(karya.tahun)}</span>
      </div>
      <div class="detail-meta-box">
        <span class="detail-meta-box__label">${aman(labelSatuan)}</span>
        <span class="detail-meta-box__nilai">${aman(karya.durasi)}</span>
      </div>
      <div class="detail-meta-box">
        <span class="detail-meta-box__label">Mata Kuliah</span>
        <span class="detail-meta-box__nilai">${aman(karya.mataKuliah)}</span>
      </div>
    </div>

    <!-- Tombol Aksi -->
    <div class="detail-aksi">
      <button class="tombol tombol--utama" id="tombol-bagikan-bawah" type="button">
        Bagikan Karya
      </button>
      <a class="tombol tombol--garis" href="${urlYouTube}" target="_blank" rel="noopener">
        Buka di YouTube
      </a>
    </div>

    <!-- Karya Lain dari Kreator -->
    ${karyaLain.length > 0 ? `
      <section class="bagian" style="margin-top: var(--jarak-2);">
        <h2 class="judul-bagian">Karya Lain dari Kreator</h2>
        <div class="grid-2">
          ${karyaLain.map((k) => `
            <a class="kartu" href="detail.html?id=${k.id}">
              ${thumbKarya(k, { label: false })}
              <span class="kartu__judul">${aman(k.judul)}</span>
            </a>
          `).join('')}
        </div>
      </section>
    ` : ''}
  `;

  // 8. Event Listener Berbagi
  const aksiBagikan = () => bagikanKarya(karya);
  tombolBagikanAtas.addEventListener('click', aksiBagikan);
  document.getElementById('tombol-bagikan-bawah')?.addEventListener('click', aksiBagikan);

  // 9. Event Listener Tombol Putar
  const tombolPutar = document.getElementById('tombol-putar');
  tombolPutar?.addEventListener('click', () => {
    const wadah = document.getElementById('pemutar-media');
    if (karya.youtubeId) {
      wadah.innerHTML = `
        <iframe
          src="https://www.youtube.com/embed/${encodeURIComponent(karya.youtubeId)}?autoplay=1"
          title="${aman(karya.judul)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;
    } else {
      window.open(urlYouTube, '_blank');
    }
  });
}
