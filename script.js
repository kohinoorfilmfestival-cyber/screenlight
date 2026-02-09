// ====================================
// Navigation Scroll Effect
// ====================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active navigation link on scroll
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ====================================
// Mobile Menu Toggle
// ====================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ====================================
// Smooth Scroll for Navigation Links
// ====================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Scroll Animations
// ====================================
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
const animateElements = document.querySelectorAll('.team-card, .gallery-item, .feature-item, .info-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ====================================
// Contact Form Handling
// ====================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && subject && message) {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #00D4FF, #FF8C00);
                color: white;
                padding: 20px;
                border-radius: 10px;
                margin-top: 20px;
                text-align: center;
                animation: fadeInUp 0.5s ease;
            ">
                <h4 style="margin-bottom: 10px;">Message Sent Successfully! ✓</h4>
                <p style="margin: 0;">Thank you for contacting us. We'll get back to you soon.</p>
            </div>
        `;
        
        // Insert message after form
        contactForm.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
        // Log form data (in production, this would be sent to a server)
        console.log('Form submitted:', { name, email, subject, message });
    }
});

// ====================================
// Newsletter Form Handling
// ====================================
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
        // Create temporary success message
        const originalHTML = newsletterForm.innerHTML;
        newsletterForm.innerHTML = `
            <div style="
                color: #00D4FF;
                text-align: center;
                padding: 15px;
                animation: fadeInUp 0.5s ease;
            ">
                ✓ Subscribed successfully!
            </div>
        `;
        
        // Reset after 3 seconds
        setTimeout(() => {
            newsletterForm.innerHTML = originalHTML;
            // Re-attach event listener
            newsletterForm.addEventListener('submit', arguments.callee);
        }, 3000);
        
        // Log email (in production, this would be sent to a server)
        console.log('Newsletter subscription:', email);
    }
});

// ====================================
// Counter Animation for Stats
// ====================================
const statsSection = document.querySelector('.hero-stats');
let statsAnimated = false;

const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            const statNumbers = document.querySelectorAll('.stat-number');
            const targets = [500, 60, 15000];
            
            statNumbers.forEach((stat, index) => {
                animateCounter(stat, targets[index]);
            });
            
            statsAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ====================================
// Gallery Modal (Optional Enhancement)
// ====================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            " onclick="this.parentElement.remove()">
                <img src="${img.src}" style="
                    max-width: 90%;
                    max-height: 90vh;
                    border-radius: 10px;
                    box-shadow: 0 20px 60px rgba(0, 212, 255, 0.5);
                    animation: scaleIn 0.3s ease;
                ">
                <button style="
                    position: absolute;
                    top: 30px;
                    right: 30px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 40px;
                    cursor: pointer;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(0, 212, 255, 0.3)'" 
                   onmouseout="this.style.background='rgba(255, 255, 255, 0.1)'">
                    ×
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        modal.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = 'auto';
        });
    });
});

// ====================================
// Parallax Effect for Hero Section
// ====================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// ====================================
// Add CSS Animations Dynamically
// ====================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// ====================================
// Lazy Loading Images
// ====================================
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ====================================
// Console Welcome Message
// ====================================
console.log('%c🎬 Screen Lights International Film Festival', 'color: #00D4FF; font-size: 20px; font-weight: bold;');
console.log('%cWebsite developed with passion for cinema', 'color: #FF8C00; font-size: 14px;');
console.log('%cIlluminating stories from around the globe', 'color: #B0B0B0; font-size: 12px;');
