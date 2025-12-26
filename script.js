// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');

    // Animate burger lines
    const bars = document.querySelectorAll('.bar');
    if (navLinks.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');

        // Reset burger lines
        const bars = document.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Anchor Links (Polyfill-like behavior if needed, but CSS handles it mostly)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section-title, .about-content, .info-item, .contact-form, .skill-card, .project-card, .edu-card, .timeline-item');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

// Add initial styles for reveal animation via JS to keep CSS clean(er) or assume CSS handles hidden state
// Let's inject a small style for animation if not present
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .section-title, .about-content, .info-item, .contact-form, .skill-card, .project-card, .edu-card, .timeline-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    .active {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;

        // Construct mailto link
        const myEmail = "pasupuletisashank7@gmail.com";
        const mailtoLink = `mailto:${myEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

        // Open default mail client
        window.location.href = mailtoLink;

        // Optional: Reset form
        this.reset();
        alert('Opening your email client to send the message...');
    });
}


// Initialize Scroll Reveal
window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();
