/* ==========================================================
   Logika layar Tentang - Galeri Karya STMM
   ========================================================== */

// 1. Tombol Ajukan Karya
const tombolAjukan = document.getElementById('tombol-ajukan');
tombolAjukan?.addEventListener('click', () => {
  tampilkanToast('Formulir kurasi karya akan dibuka pada jadwal kurasi berikutnya.');
});

// 2. Menu Kebijakan Karya & Hak Cipta
const menuKebijakan = document.getElementById('menu-kebijakan');
menuKebijakan?.addEventListener('click', () => {
  window.alert(
    'Kebijakan Karya & Hak Cipta:\n\n' +
    'Seluruh karya yang tayang di Galeri Karya STMM tetap merupakan hak cipta penuh mahasiswa kreator yang bersangkutan. ' +
    'Karya dikurasi dan ditayangkan untuk tujuan edukasi serta apresiasi karya sivitas akademika STMM Yogyakarta.'
  );
});

// 3. Menu Tim Pengembang
const menuTim = document.getElementById('menu-tim');
menuTim?.addEventListener('click', () => {
  window.alert(
    'Tim Pengembang:\n\n' +
    'Aplikasi Galeri Karya STMM dikembangkan secara kolaboratif oleh mahasiswa STMM (Sekolah Tinggi Multi Media) Yogyakarta dalam proyek Mobile Computing.'
  );
});

// 4. Menu Kontak
const menuKontak = document.getElementById('menu-kontak');
menuKontak?.addEventListener('click', () => {
  window.alert(
    'Kontak Galeri Karya STMM:\n\n' +
    'Email: galeri@mmtc.ac.id\n' +
    'Alamat: Kampus STMM MMTC, Jl. Magelang Km. 6, Sinduadi, Mlati, Sleman, D.I. Yogyakarta 55284'
  );
});
