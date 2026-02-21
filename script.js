const textElement = document.getElementById('typewriter');
const titles = [
    "Web Developer",
    "Graphic Designer",
    "Front-End Developer",
    "Backend Developer",
    "SaaS Developer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        textElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);
document.addEventListener('DOMContentLoaded', function () {
    const filters = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));

            // Add active class to clicked filter
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const cardTypes = card.getAttribute('data-type').split(' ');
                    if (cardTypes.includes(filterValue)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
});
// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function () {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const appearOnScroll = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Active navigation on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;

        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');

            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function () {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('nav-blur');
    } else {
        nav.classList.remove('nav-blur');
    }
});



// Schedule modal
const scheduleBtn = document.getElementById('schedule-btn');
const scheduleModal = document.getElementById('schedule-modal');
const closeModal = document.getElementById('close-modal');

if (scheduleBtn && scheduleModal && closeModal) {
    scheduleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        scheduleModal.classList.remove('hidden');
    });

    closeModal.addEventListener('click', function () {
        scheduleModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    scheduleModal.addEventListener('click', function (e) {
        if (e.target === scheduleModal) {
            scheduleModal.classList.add('hidden');
        }
    });
}

// FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const toggle = this.querySelector('.faq-toggle');

        // Close other open FAQs
        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
            if (otherAnswer !== answer && otherAnswer.classList.contains('open')) {
                otherAnswer.classList.remove('open');
                otherAnswer.previousElementSibling.querySelector('.faq-toggle').classList.remove('open');
            }
        });

        // Toggle current FAQ
        answer.classList.toggle('open');
        toggle.classList.toggle('open');
    });
});

// Initialize hero animations
window.addEventListener('load', function () {
    document.querySelectorAll('#home .fade-in').forEach(el => {
        el.classList.add('visible');
    });

    // Set initial active nav link
    activateNavLink();
});