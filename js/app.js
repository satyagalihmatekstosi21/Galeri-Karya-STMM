/* ==========================================================
   FUNGSI BERSAMA — dipakai semua layar.
   File BERSAMA: hanya dosen/integrator yang boleh mengubah.
   Urutan memuat di setiap HTML: data.js → app.js → js/halaman/<layar>.js
   ========================================================== */

/* ---------- Ikon (SVG garis, 24x24) ---------- */
const IKON = {
  beranda: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  kategori: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  cari: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
  tentang: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01',
  kembali: 'm15 18-6-6 6-6',
  bagikan: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
  panah: 'm9 18 6-6-6-6',
  Film: 'M4 4h16v16H4zM4 9h16M4 15h16M9 4v5M15 4v5M9 15v5M15 15v5',
  Video: 'M3 6h12v12H3zM15 10l6-3v10l-6-3z',
  Podcast: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  Foto: 'M4 7h4l2-3h4l2 3h4v13H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  Gim: 'M6 8h12a4 4 0 0 1 4 4v2a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-2a4 4 0 0 1 4-4zM7 11v3M5.5 12.5h3M16 12h.01M18 14h.01'
};

function ikon(nama, ukuran = 24, tebal = 2) {
  return `<svg width="${ukuran}" height="${ukuran}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${tebal}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${IKON[nama]}"/></svg>`;
}

const IKON_PUTAR = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

/* ---------- Kategori: warna latar (bg) & warna ikon/teks (fg) ---------- */
const KATEGORI = {
  Film:    { bg: '#DCEBF6', fg: '#005A92', satuan: 'Durasi' },
  Video:   { bg: '#D9F1FB', fg: '#0369A1', satuan: 'Durasi' },
  Podcast: { bg: '#FBEFC8', fg: '#8A5A00', satuan: 'Durasi' },
  Foto:    { bg: '#E3E8EF', fg: '#334155', satuan: 'Jumlah' },
  Gim:     { bg: '#E2F3E9', fg: '#1F7A4D', satuan: 'Platform' }
};
const DAFTAR_KATEGORI = Object.keys(KATEGORI);

function gayaKategori(kategori) {
  const k = KATEGORI[kategori] || KATEGORI.Film;
  return `--kat-bg:${k.bg};--kat-fg:${k.fg}`;
}

/* ---------- Pengambil data ---------- */
function cariKarya(id) {
  return KARYA.find((k) => String(k.id) === String(id));
}
function cariKreator(id) {
  return KREATOR.find((k) => k.id === id);
}
function karyaMilik(kreatorId) {
  return KARYA.filter((k) => k.kreatorId === kreatorId);
}
function ambilParameter(nama) {
  return new URLSearchParams(window.location.search).get(nama);
}

/* Mencegah teks data merusak HTML */
function aman(teks) {
  return String(teks ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function inisial(nama) {
  return nama.split(' ').map((b) => b[0]).slice(0, 2).join('').toUpperCase();
}

/* ---------- Komponen: thumbnail & kartu karya ---------- */
function thumbKarya(karya, { label = true, tinggi = 100, ukuranIkon = 28 } = {}) {
  const isi = karya.thumbnail
    ? `<img src="${aman(karya.thumbnail)}" alt="">`
    : ikon(karya.kategori, ukuranIkon, 1.8);
  const lbl = label ? `<span class="thumb__label">${aman(karya.kategori)}</span>` : '';
  return `<div class="thumb" style="${gayaKategori(karya.kategori)};height:${tinggi}px">${isi}${lbl}</div>`;
}

function kartuKarya(karya, { tampilkanKreator = true } = {}) {
  const kreator = cariKreator(karya.kreatorId);
  const baris = tampilkanKreator && kreator ? `<span class="kartu__kreator">${aman(kreator.nama)}</span>` : '';
  return `
    <a class="kartu" href="detail.html?id=${karya.id}">
      ${thumbKarya(karya)}
      <span class="kartu__judul">${aman(karya.judul)}</span>
      ${baris}
    </a>`;
}

/* ---------- Komponen: navigasi bawah ---------- */
const MENU = [
  { halaman: 'beranda', label: 'Beranda', href: 'index.html', ikon: 'beranda' },
  { halaman: 'kategori', label: 'Kategori', href: 'kategori.html', ikon: 'kategori' },
  { halaman: 'cari', label: 'Cari', href: 'cari.html', ikon: 'cari' },
  { halaman: 'tentang', label: 'Tentang', href: 'tentang.html', ikon: 'tentang' }
];

function pasangNavBawah() {
  const nav = document.getElementById('nav-bawah');
  if (!nav) return;
  const aktif = document.body.dataset.halaman;
  nav.innerHTML = MENU.map((m) => `
    <a class="nav-bawah__item" href="${m.href}" ${m.halaman === aktif ? 'aria-current="page"' : ''}>
      ${ikon(m.ikon)}${m.label}
    </a>`).join('');
}

/* ---------- Distribusi: bagikan link karya ---------- */
function linkKarya(karya) {
  const url = new URL('detail.html', window.location.href);
  url.search = `?id=${karya.id}`;
  return url.href;
}

async function bagikanKarya(karya) {
  const kreator = cariKreator(karya.kreatorId);
  const data = {
    title: karya.judul,
    text: `${karya.judul} — karya ${kreator ? kreator.nama : 'mahasiswa'} di Galeri Karya STMM`,
    url: linkKarya(karya)
  };
  // 1) Menu bagikan bawaan HP (WhatsApp, Telegram, dll.)
  if (navigator.share) {
    try {
      await navigator.share(data);
      return;
    } catch (err) {
      if (err.name === 'AbortError') return; // pengguna membatalkan
    }
  }
  // 2) Cadangan: salin link ke clipboard
  try {
    await navigator.clipboard.writeText(data.url);
    tampilkanToast('Link karya disalin');
  } catch (err) {
    window.prompt('Salin link karya ini:', data.url);
  }
}

function tampilkanToast(pesan) {
  const lama = document.querySelector('.toast');
  if (lama) lama.remove();
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = pesan;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

/* ---------- Tombol kembali ----------
   Kembali ke halaman sebelumnya bila datang dari situs ini;
   bila link dibuka langsung (misalnya dari WhatsApp), ke Beranda. */
function pasangTombolKembali(idTombol) {
  const tombol = document.getElementById(idTombol);
  if (!tombol) return;
  tombol.innerHTML = ikon('kembali', 24, 2.2);
  tombol.addEventListener('click', (e) => {
    let dariSitusIni = false;
    try { dariSitusIni = document.referrer && new URL(document.referrer).origin === location.origin; } catch (err) {}
    if (dariSitusIni && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  });
}

document.addEventListener('DOMContentLoaded', pasangNavBawah);
