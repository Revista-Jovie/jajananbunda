export default function QnASection() {
  return (
    <div>
      <br />
      <h3 className="qna">QnA</h3>
      <QnAInfo/>
      <br />
      <QnA
        pertanyaan="Apa saja jenis undangan yang disediakan oleh wedding organizer?"
        jawaban="Wedding organizer biasanya menyediakan dua jenis undangan, yaitu undangan fisik (dicetak di atas kertas berkualitas) dan undangan digital (e-invitation)"
      />
      <QnA
        pertanyaan="Apakah wedding organizer dapat membantu dalam pembuatan desain undangan?"
        jawaban="Ya, wedding organizer menyediakan berbagai pilihan desain undangan yang dapat disesuaikan dengan tema pernikahan"
      />
      <QnA
        pertanyaan="Apakah undangan digital lebih disarankan daripada undangan fisik?"
        jawaban="Tergantung preferensi klien. Undangan digital lebih praktis, hemat biaya, dan ramah lingkungan. Namun, undangan fisik sering dipilih karena nilai estetikanya"
      />
      <QnAContact/>
      <Contact/>
    </div>
  );
}

function QnA(props) {
  return (
    <div>
      <strong>Q : {props.pertanyaan}</strong>
      <p>A : {props.jawaban}</p>
    </div>
  );
}

function QnAInfo() {
  return (
    <div>
      <p>
        Semua pertanyaan di bawah ini berkaitan dengan penyediaan surat undangan
        oleh Wedding Organizer kami.
      </p>
    </div>
  );
}

function QnAContact() {
    return (
        <div>
            <p>Jika ada pertanyaan lebih lanjut, silahkan hubungi kami melalui
                email atau kontak yang tersedia.
            </p>
        </div>
    )
}

function Contact() {
    return (
        <div className="contact">
            <img src="img/wa logo.webp" alt="logo wa" width="30"/>
            089623409810
            <img src="img/email.png" alt="logo email" width="30"/>
            weedingorganizer@gmail.com
        </div>
    )
}
