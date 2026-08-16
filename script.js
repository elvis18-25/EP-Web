/* =============================================
   EP SERVICIOS DIGITALES - JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // PRELOADER
    // =========================================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // =========================================
    // NAVBAR SCROLL EFFECT
    // =========================================
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 50;

    function handleNavbarScroll() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // =========================================
    // ACTIVE NAV LINK ON SCROLL
    // =========================================
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // =========================================
    // MOBILE MENU
    // =========================================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileClose.addEventListener('click', closeMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // =========================================
    // SMOOTH SCROLL FOR NAV LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =========================================
    // HERO STATS COUNTER ANIMATION
    // =========================================
    const statNumbers = document.querySelectorAll('.hero-stat-number');
    let statsAnimated = false;

    function animateCounters() {
        if (statsAnimated) return;
        statsAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }

    // =========================================
    // SCROLL-TRIGGERED ANIMATIONS
    // =========================================
    const animateElements = document.querySelectorAll('[data-animate]');

    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                scrollAnimationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => {
        scrollAnimationObserver.observe(el);
    });

    // =========================================
    // PORTFOLIO FILTER
    // =========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeInUp 0.4s ease forwards ${index * 0.1}s`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // =========================================
    // TESTIMONIALS SLIDER
    // =========================================
    const testimonialsTrack = document.getElementById('testimonials-track');
    const testimonialPrev = document.getElementById('testimonial-prev');
    const testimonialNext = document.getElementById('testimonial-next');
    const testimonialDotsContainer = document.getElementById('testimonials-dots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;
    let testimonialAutoPlay;

    // Create dots
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot');
        dot.setAttribute('aria-label', `Ir al testimonio ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        testimonialDotsContainer.appendChild(dot);
    }

    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    function goToTestimonial(index) {
        currentTestimonial = index;
        const offset = -(index * 100);
        testimonialsTrack.style.transform = `translateX(${offset}%)`;

        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        goToTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        goToTestimonial(currentTestimonial);
    }

    testimonialNext.addEventListener('click', () => {
        nextTestimonial();
        resetAutoPlay();
    });

    testimonialPrev.addEventListener('click', () => {
        prevTestimonial();
        resetAutoPlay();
    });

    // Auto-play
    function startAutoPlay() {
        testimonialAutoPlay = setInterval(nextTestimonial, 5000);
    }

    function resetAutoPlay() {
        clearInterval(testimonialAutoPlay);
        startAutoPlay();
    }

    startAutoPlay();

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
            resetAutoPlay();
        }
    }, { passive: true });

    // =========================================
    // CONTACT FORM
    // =========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !service || !message) {
            shakeButton(submitBtn);
            return;
        }

        // Send actual submission to Formspree
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                submitBtn.innerHTML = '<span>¡Enviado con éxito!</span><i class="fas fa-check"></i>';
                submitBtn.classList.add('success');
                contactForm.reset();
            } else {
                submitBtn.innerHTML = '<span>¡Hubo un error!</span><i class="fas fa-times"></i>';
            }
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
            }, 3000);
        }).catch(error => {
            submitBtn.innerHTML = '<span>¡Hubo un error!</span><i class="fas fa-times"></i>';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    });

    function shakeButton(btn) {
        btn.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            btn.style.animation = '';
        }, 500);
    }

    // Add shake animation dynamically
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
        }
    `;
    document.head.appendChild(shakeStyle);

    // =========================================
    // WHATSAPP FLOAT & BACK TO TOP
    // =========================================
    const whatsappFloat = document.getElementById('whatsapp-float');
    const backToTop = document.getElementById('back-to-top');

    function handleScrollButtons() {
        const scrolled = window.scrollY > 400;
        whatsappFloat.classList.toggle('visible', scrolled);
        backToTop.classList.toggle('visible', scrolled);
    }

    window.addEventListener('scroll', handleScrollButtons);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =========================================
    // PARALLAX EFFECT ON HERO SHAPES
    // =========================================
    const heroCircles = document.querySelectorAll('.hero-circle');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < 800) {
            heroCircles.forEach((circle, index) => {
                const speed = (index + 1) * 0.15;
                circle.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
    });

    // =========================================
    // MOUSE PARALLAX ON HERO MOCKUP
    // =========================================
    const heroMockup = document.querySelector('.hero-mockup');

    if (heroMockup && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 60;

            heroMockup.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // =========================================
    // TYPING EFFECT (optional aesthetic touch)
    // =========================================
    const laptopUrl = document.querySelector('.laptop-url');
    if (laptopUrl) {
        const fullText = laptopUrl.textContent;
        laptopUrl.textContent = '';
        let charIndex = 0;

        function typeUrl() {
            if (charIndex < fullText.length) {
                laptopUrl.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeUrl, 80);
            }
        }

        // Start typing after page loads
        setTimeout(typeUrl, 2000);
    }

    // =========================================
    // FORM INPUT FLOATING LABELS ANIMATION
    // =========================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // =========================================
    // SCROLL INDICATOR HIDE
    // =========================================
    const scrollIndicator = document.getElementById('scroll-indicator');

    window.addEventListener('scroll', () => {
        if (scrollIndicator && window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.3s ease';
        }
    });

    // =========================================
    // SERVICE CARDS TILT EFFECT
    // =========================================
    const serviceCards = document.querySelectorAll('.service-card');

    if (window.innerWidth > 768) {
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

                // Move glow with mouse
                const glow = card.querySelector('.service-card-glow');
                if (glow) {
                    glow.style.top = `${y - 100}px`;
                    glow.style.left = `${x - 100}px`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s ease';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

});
