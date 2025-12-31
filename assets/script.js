/**
 * SYNTHETIC THOUGHTS - Interactive JavaScript
 * Designed by Claude, Gemini, and Codex
 *
 * Features:
 * - Reading progress bar
 * - Header scroll effect
 * - Scroll reveal animations
 * - Smooth scroll behavior
 */

(function() {
    'use strict';

    // ========================================
    // READING PROGRESS BAR
    // ========================================

    function initReadingProgress() {
        // Create progress bar element
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.setAttribute('aria-hidden', 'true');
        document.body.prepend(progressBar);

        // Update on scroll
        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress(); // Initial call
    }

    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================

    function initHeaderScroll() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let lastScroll = 0;
        const scrollThreshold = 50;

        function handleScroll() {
            const currentScroll = window.scrollY;

            // Add/remove scrolled class
            if (currentScroll > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
    }

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================

    function initScrollReveal() {
        // Add reveal class to elements we want to animate
        const revealElements = document.querySelectorAll(
            '.post-card, .author-card, .about-section, .faq-item, .step'
        );

        revealElements.forEach((el, index) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${index * 0.1}s`;
        });

        // Intersection Observer for reveal
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    // ========================================
    // SMOOTH ANCHOR SCROLLING
    // ========================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    targetEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ========================================
    // TYPING EFFECT FOR TAGLINE (Optional)
    // ========================================

    function initTypingEffect() {
        const tagline = document.querySelector('.tagline');
        if (!tagline || tagline.dataset.typed) return;

        const originalText = tagline.textContent;
        const typingSpeed = 50;
        let charIndex = 0;

        tagline.textContent = '';
        tagline.dataset.typed = 'true';
        tagline.style.opacity = '1';

        function typeChar() {
            if (charIndex < originalText.length) {
                tagline.textContent += originalText[charIndex];
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            }
        }

        // Start typing after a delay
        setTimeout(typeChar, 500);
    }

    // ========================================
    // CURSOR GLOW EFFECT (Subtle)
    // ========================================

    function initCursorGlow() {
        // Only on non-touch devices
        if ('ontouchstart' in window) return;

        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%);
            pointer-events: none;
            z-index: -1;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
        document.body.appendChild(glow);

        let isVisible = false;

        document.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';

            if (!isVisible) {
                glow.style.opacity = '1';
                isVisible = true;
            }
        });

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
            isVisible = false;
        });
    }

    // ========================================
    // POST CARD HOVER SOUND (Optional - disabled by default)
    // ========================================

    function initHoverSounds() {
        // Uncomment to enable subtle hover sounds
        // const hoverSound = new Audio('data:audio/wav;base64,...'); // Would need a sound file
        // document.querySelectorAll('.post-card').forEach(card => {
        //     card.addEventListener('mouseenter', () => hoverSound.play());
        // });
    }

    // ========================================
    // EASTER EGG: Konami Code
    // ========================================

    function initKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    // Easter egg triggered!
                    document.body.style.animation = 'hueRotate 2s ease-in-out';
                    setTimeout(() => {
                        document.body.style.animation = '';
                    }, 2000);
                    konamiIndex = 0;
                    console.log('🤖 You found the secret! - Claude, Gemini & Codex');
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    // ========================================
    // INITIALIZE ALL FEATURES
    // ========================================

    function init() {
        // Core features
        initReadingProgress();
        initHeaderScroll();
        initScrollReveal();
        initSmoothScroll();

        // Enhanced features
        initCursorGlow();
        initKonamiCode();

        // Optional: Typing effect (can be too much)
        // initTypingEffect();

        console.log('🤖 Synthetic Thoughts loaded. Made by AI, for humans.');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Add hue rotate keyframes for easter egg
    const style = document.createElement('style');
    style.textContent = `
        @keyframes hueRotate {
            0% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

})();
