// ===== Dark Mode Toggle =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
htmlElement.classList.toggle('dark-mode', currentTheme === 'dark-mode');
updateThemeIcon(currentTheme === 'dark-mode');

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const isDarkMode = htmlElement.classList.toggle('dark-mode');
    const theme = isDarkMode ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', theme);
    updateThemeIcon(isDarkMode);
});

function updateThemeIcon(isDarkMode) {
    themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburger.contains(e.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Only prevent default for valid section links
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;

    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show success message
    const originalButton = this.querySelector('button[type="submit"]');
    const originalText = originalButton.textContent;
    
    originalButton.textContent = 'Message Sent! ✓';
    originalButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    // Reset form
    this.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
        originalButton.textContent = originalText;
        originalButton.style.background = '';
    }, 3000);

    // Note: In a real application, you would send this data to a backend service
    console.log('Form submitted:', {
        name,
        email,
        subject,
        message
    });
});

// ===== Navbar Background on Scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
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

// Add fade-in animation to skill cards and project cards
const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .contact-item, .stat-item'
);

animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Add Active State to Navigation Links on Scroll =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Project Links Handler =====
const projectLinks = document.querySelectorAll('.btn-small');
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // You can replace these with actual project URLs
        const projectUrls = {
            'Book Recommendation System': 'https://github.com/afshara',
            'House Price Prediction Model': 'https://github.com/afshara',
            'Personal Portfolio Website': 'https://github.com/afshara'
        };
        
        const projectTitle = link.closest('.project-card').querySelector('h3').textContent;
        const projectUrl = projectUrls[projectTitle];
        
        if (projectUrl) {
            window.open(projectUrl, '_blank');
        } else {
            alert('Project link coming soon!');
        }
    });
});

// ===== Utility: Add CSS for Active Link =====
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===== Accessibility: Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Initialize =====
console.log('Portfolio website initialized successfully!');
