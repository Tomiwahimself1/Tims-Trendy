const heroImages = [
    "fashion website/IMG_7370.JPG",
    "fashion website/IMG_7364.JPG",
    "fashion website/IMG_7371.JPG",
    "fashion website/IMG_7388.JPG"
];

let currentIndex = 0;
const heroImg = document.getElementById("heroImg");

function changeHeroImage() {
    // fade out
    heroImg.style.opacity = 0;

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % heroImages.length;
        heroImg.src = heroImages[currentIndex];

        // force browser reflow (VERY IMPORTANT)
        heroImg.onload = () => {
            heroImg.style.opacity = 1;
        };

    }, 500); // longer fade-out = smoother easing
}

// run every 5 seconds
setInterval(changeHeroImage, 6000);







// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scroll
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

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show the success message
        console.log('Form submitted:', data);
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        
        // Reset form after 3 seconds and show it again
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }, 5000);
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.feature-card, .value-card, .philosophy-item, .contact-item, .project-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Image Loading Effect
const heroImage = document.getElementById('heroImg');
if (heroImage) {
    heroImage.style.opacity = '0';
    heroImage.style.transition = 'opacity 1s ease';
    
    heroImage.addEventListener('load', () => {
        heroImage.style.opacity = '1';
    });
    
    // If image is already loaded (cached)
    if (heroImage.complete) {
        heroImage.style.opacity = '1';
    }
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Active Navigation Link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Parallax Effect on Hero Image
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = hero.querySelector('.hero-image');
        if (heroImage && scrolled < hero.offsetHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Form Input Animation
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Lazy Loading for Images (when you add project images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// Scroll to Top Button (Optional Enhancement)
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--secondary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Prevent Default Form Submission on Enter in Text Inputs
document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});

console.log('Tims Trendy website loaded successfully! ✨');
