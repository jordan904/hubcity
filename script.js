// ============================================
// Hub City Drywall — Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll ---
    const navbar = document.getElementById('navbar');
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Mobile nav ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIdx = 0;

    function openLightbox(idx) {
        currentIdx = idx;
        const img = galleryItems[currentIdx].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navLightbox(dir) {
        currentIdx = (currentIdx + dir + galleryItems.length) % galleryItems.length;
        const img = galleryItems[currentIdx].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    }

    galleryItems.forEach((item, i) => {
        item.addEventListener('click', () => openLightbox(i));
    });

    document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    document.querySelector('.lightbox-prev').addEventListener('click', () => navLightbox(-1));
    document.querySelector('.lightbox-next').addEventListener('click', () => navLightbox(1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navLightbox(-1);
        if (e.key === 'ArrowRight') navLightbox(1);
    });

    // --- Reviews carousel ---
    const track = document.querySelector('.reviews-track');
    const cards = document.querySelectorAll('.review-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let carouselIdx = 0;

    function getVisibleCount() {
        const cardW = cards[0].offsetWidth + 20;
        return Math.round(track.offsetWidth / cardW);
    }

    function scrollCarousel() {
        const cardW = cards[0].offsetWidth + 20;
        track.scrollTo({ left: carouselIdx * cardW, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', () => {
        carouselIdx = Math.max(0, carouselIdx - 1);
        scrollCarousel();
    });

    nextBtn.addEventListener('click', () => {
        const maxIdx = cards.length - getVisibleCount();
        carouselIdx = Math.min(maxIdx, carouselIdx + 1);
        scrollCarousel();
    });

    // --- Scroll animations ---
    document.querySelectorAll('.about-image-col, .contact-left').forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('.about-text, .contact-right').forEach(el => el.classList.add('reveal-right'));
    document.querySelectorAll('.gallery-item').forEach(el => el.classList.add('reveal-scale'));
    document.querySelectorAll('.services-row').forEach(el => el.classList.add('stagger-children'));
    document.querySelectorAll('.section-head, .about-stats, .trust-bar').forEach(el => el.classList.add('reveal'));

    const allAnimated = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    allAnimated.forEach(el => obs.observe(el));

    // --- Smooth scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // --- Form ---
    document.getElementById('contactForm').addEventListener('submit', e => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        btn.textContent = 'Message Sent!';
        btn.style.background = 'var(--accent-warm)';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = 'Send Request';
            btn.style.background = '';
            btn.disabled = false;
            e.target.reset();
        }, 3000);
    });
});
