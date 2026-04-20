export default function ArtikelDetail() {
  return (
    <div>
      <h2>Surat Undangan</h2>
      <Identitas/>
      <GambarSurat />
      <DeskripsiSuratUndangan />
      <KembaliLanjut />
    </div>
  );
}

function Identitas() {
  return (
    <div class="profile">
    <img src="img/revista.jpg" alt="Profile Picture" class="profile-picture"/>
    <div class="profile-info">
        <strong>Revista Jovie Savitri</strong>
        <small>Diperbarui 12 Maret 2025, 19:00 WIB</small>
    </div>
</div>

  )
}

function DeskripsiSuratUndangan() {
  return (
    <div>
      <p>
        Surat undangan pernikahan adalah media komunikasi resmi yang digunakan
        untuk mengundang seseorang menghadiri acara pernikahan. Biasanya, surat
        undangan ini mencantumkan informasi penting seperti nama mempelai,
        waktu, tanggal, lokasi, serta konsep acara pernikahan. Dalam industri
        wedding organizer, pembuatan undangan pernikahan menjadi salah satu
        layanan utama yang disesuaikan dengan kebutuhan dan tema yang diinginkan
        oleh klien.
      </p>
      <p>
        Dalam wedding organizer, desain dan format surat undangan menjadi aspek
        penting yang diperhatikan. Wedding organizer biasanya menyediakan
        berbagai pilihan desain mulai dari yang klasik, minimalis, hingga modern
        dan mewah. Selain undangan fisik yang dicetak di atas kertas
        berkualitas, kini juga tersedia undangan digital (e-invitation) yang
        lebih praktis dan ramah lingkungan. Pemilihan desain ini disesuaikan
        dengan konsep pernikahan dan selera pasangan pengantin agar memberikan
        kesan yang selaras dan estetis.
      </p>
      <p>
        Selain desain, penyusunan kata-kata dalam surat undangan pernikahan juga
        menjadi perhatian utama wedding organizer. Kata-kata yang disusun harus
        memperhatikan unsur kesopanan, kejelasan, dan kesesuaian dengan tema
        acara. Biasanya, wedding organizer memberikan beberapa contoh kalimat
        atau template yang dapat dipilih dan disesuaikan oleh klien. Hal ini
        bertujuan agar undangan tidak hanya terlihat indah secara visual tetapi
        juga memiliki penyampaian pesan yang tepat dan berkesan bagi tamu.
      </p>
      <p>
        Bagi wedding organizer, surat undangan bukan sekadar alat komunikasi,
        tetapi juga bagian dari konsep keseluruhan acara pernikahan. Undangan
        yang dirancang dengan baik dapat menjadi cerminan dari keseluruhan tema
        pernikahan dan memberikan kesan pertama yang positif kepada para tamu.
        Selain itu, wedding organizer juga memastikan bahwa undangan dapat
        disebarkan dengan tepat waktu, baik melalui pengiriman fisik maupun
        digital, untuk memastikan seluruh tamu menerima informasi dengan jelas
        dan tepat.
      </p>
    </div>
  );
}

function GambarSurat() {
  return (
    <div align="center">
      <img src="img/surat undangan.webp" alt="surat"/>
      <small className="gambar">Gambar Surat Undangan</small>
    </div>
  );
}

function KembaliLanjut() {
  return (
    <div>
      <small className="lanjutKembali">Kembali | Lanjut</small>
    </div>
  );
}
