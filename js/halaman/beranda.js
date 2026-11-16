/* Tim 1 · Logika layar Beranda */

document.getElementById('tombol-cari').innerHTML = ikon('cari', 22);

// 1) Karya unggulan: karya pertama yang ditandai unggulan
const unggulan = KARYA.find((k) => k.unggulan) || KARYA[0];
const kreatorUnggulan = cariKreator(unggulan.kreatorId);
document.getElementById('unggulan').innerHTML = `
  <a class="unggulan" href="detail.html?id=${unggulan.id}">
    <div class="unggulan__gambar">
      ${unggulan.thumbnail ? `<img src="${aman(unggulan.thumbnail)}" alt="">` : ''}
      <span class="label label--aksen">${aman(unggulan.kategori)} · ${aman(unggulan.genre)}</span>
      <span class="unggulan__putar">${IKON_PUTAR}</span>
    </div>
    <span>
      <span class="unggulan__judul" style="display:block">${aman(unggulan.judul)}</span>
      <span class="teks-redup">${aman(kreatorUnggulan.nama)} · Angkatan ${kreatorUnggulan.angkatan}</span>
    </span>
  </a>`;

// 2) Chip kategori → membuka layar Kategori dengan filter (?k=Film)
document.getElementById('daftar-kategori').innerHTML = DAFTAR_KATEGORI.map((nama) => `
  <a class="chip chip--kategori" style="${gayaKategori(nama)}" href="kategori.html?k=${nama}">
    ${ikon(nama, 18)}${nama}
  </a>`).join('');

// 3) Karya terbaru: 4 karya dengan id terbesar, selain karya unggulan
const terbaru = KARYA
  .filter((k) => k.id !== unggulan.id)
  .sort((a, b) => b.id - a.id)
  .slice(0, 4);
document.getElementById('karya-terbaru').innerHTML = terbaru.map((k) => kartuKarya(k)).join('');
