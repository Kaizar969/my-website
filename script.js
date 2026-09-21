function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

const form = document.getElementById('contactForm');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popupText');
const closePopupButton = document.getElementById('closePopup');
let skipResetMessage = false;

function openPopup(messageText) {
    popupText.textContent = messageText;
    popup.classList.add('show');
    document.body.classList.add('popup-open');
}

function closePopupModal() {
    popup.classList.remove('show');
    document.body.classList.remove('popup-open');
}

closePopupButton.addEventListener('click', function () {
    closePopupModal();
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    skipResetMessage = true;
    form.reset();
    openPopup('Pesan kamu telah berhasil dikirim! Terima kasih telah menghubungi saya.');
});

form.addEventListener('reset', function () {
    if (skipResetMessage) {
        skipResetMessage = false;
        return;
    }

    openPopup('Ini adalah tombol untuk menghapus semua pesan yang telah kamu, silahkan klik tombol "Kirim" untuk mengirim pesan ya!');
});
