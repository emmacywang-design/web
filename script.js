document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            navbar.style.padding = '10px 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            navbar.style.padding = '15px 0';
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileBtn.querySelector('i').classList.remove('fa-times');
                mobileBtn.querySelector('i').classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.about-card, .solution-card, .ai-feature-item, .case-card, .news-item');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = `${index % 3 * 0.1}s`; // Stagger effect
        observer.observe(el);
    });

    // Halftone Effect
    const canvas = document.getElementById('halftoneCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let dots = [];
        const spacing = 30; // Space between dots
        const mouse = { x: -1000, y: -1000 };
        const hoverRadius = 300; // Radius of effect

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initDots();
        }

        function initDots() {
            dots = [];
            for (let x = 0; x < width; x += spacing) {
                for (let y = 0; y < height; y += spacing) {
                    dots.push({
                        x: x + spacing / 2,
                        y: y + spacing / 2,
                        baseR: 2,
                        r: 2
                    });
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            // Draw background gradient
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#1C1C50'); // var(--dark-bg)
            gradient.addColorStop(1, '#0F0F30'); // Darker shade
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            dots.forEach(dot => {
                // Calculate distance to mouse
                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Calculate size based on distance
                let size = dot.baseR;
                let alpha = 0.2;
                let color = '#4CD964'; // New Secondary Color (Mint)

                if (distance < hoverRadius) {
                    const factor = 1 - distance / hoverRadius;
                    size = dot.baseR + (factor * 6); // Max size increase
                    alpha = 0.2 + (factor * 0.8); // Max opacity

                    // Optional: Color shift near mouse
                    if (factor > 0.5) {
                        color = '#007AFF'; // New Primary Color (Blue)
                    }
                }

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        // Initialize
        resize();
        draw();
    }
});
