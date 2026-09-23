function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

const form = document.getElementById('contactForm');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popupText');
const closePopupButton = document.getElementById('closePopup');
let skipResetMessage = false;

const navigationLinks = document.querySelectorAll('nav a');
const pageSections = document.querySelectorAll('section[id]');

function setActiveNavigation(sectionId) {
    navigationLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });
}

navigationLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        setActiveNavigation(link.getAttribute('href').slice(1));
    });
});

const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            setActiveNavigation(entry.target.id);
        }
    });
}, {
    rootMargin: '-35% 0px -55% 0px'
});

pageSections.forEach(function (section) {
    sectionObserver.observe(section);
});

setActiveNavigation('home');

const heroTyping = document.querySelector('.hero-typing');
const heroTypingMessages = [
    'Website Ini Belum Jadi!',
    'Solo Web Developed by: Kaizar.'
];
let heroTypingMessageIndex = 0;
let heroTypingCharacterIndex = 0;
let heroTypingIsDeleting = false;

function runHeroTyping() {
    const currentMessage = heroTypingMessages[heroTypingMessageIndex];
    heroTyping.textContent = currentMessage.slice(0, heroTypingCharacterIndex);

    let typingDelay = heroTypingIsDeleting ? 55 : 100;

    if (!heroTypingIsDeleting && heroTypingCharacterIndex === currentMessage.length) {
        heroTypingIsDeleting = true;
        typingDelay = 1800;
    } else if (heroTypingIsDeleting && heroTypingCharacterIndex === 0) {
        heroTypingIsDeleting = false;
        heroTypingMessageIndex = (heroTypingMessageIndex + 1) % heroTypingMessages.length;
        typingDelay = 500;
    } else {
        heroTypingCharacterIndex += heroTypingIsDeleting ? -1 : 1;
    }

    window.setTimeout(runHeroTyping, typingDelay);
}

runHeroTyping();

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
