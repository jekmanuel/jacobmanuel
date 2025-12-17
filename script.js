// DOM Elements
const themeSwitch = document.getElementById('theme-checkbox');
const body = document.body;
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const projectsGrid = document.querySelector('.projects-grid');
const projectModal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

const navbar = document.querySelector('.navbar');
const themeCheckbox = document.getElementById('theme-checkbox');
const sections = document.querySelectorAll('section');

// Sample Projects Data
const projects = [
    {
        id: 1,
        title: "E-commerce Platform",
        category: "web",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        description: "A full-featured e-commerce platform with user authentication, product catalog, shopping cart, and payment integration.",
        tech: ["React", "Node.js", "MongoDB", "Stripe API"],
        liveLink: "https://example.com",
        codeLink: "https://github.com"
    },
    {
        id: 2,
        title: "Fitness Tracking App",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        description: "Mobile application for tracking workouts, nutrition, and fitness progress with social features.",
        tech: ["React Native", "Firebase", "Redux", "Chart.js"],
        liveLink: "https://example.com",
        codeLink: "https://github.com"
    },
    {
        id: 3,
        title: "Travel Blog UI",
        category: "design",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
        description: "Modern UI design for a travel blog with focus on photography and storytelling.",
        tech: ["Figma", "Adobe XD", "HTML/CSS", "JavaScript"],
        liveLink: "https://example.com",
        codeLink: "https://github.com"
    },
    {
        id: 4,
        title: "Task Management Dashboard",
        category: "web",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
        description: "Collaborative task management dashboard with real-time updates and team features.",
        tech: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
        liveLink: "https://example.com",
        codeLink: "https://github.com"
    },
    {
        id: 5,
        title: "Food Delivery App",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1681&q=80",
        description: "Food ordering and delivery application with restaurant selection and real-time tracking.",
        tech: ["Flutter", "Firebase", "Google Maps API", "Provider"],
        liveLink: "https://example.com",
        codeLink: "https://github.com"
    },
    {
        id: 6,
        title: "Portfolio Website Design",
        category: "design",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1715&q=80",
        description: "Clean and modern portfolio design for a freelance designer with case studies.",
        tech: ["Figma", "Adobe Creative Suite", "GSAP", "CSS Grid"],
        liveLink: "https://example.com",
        codeLink: "https://github.com"
    }
];

// Theme Switch
function initTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
}

themeSwitch.addEventListener('change', function () {
    if (this.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Initialize Projects Display
function displayProjects(filter = 'all') {
    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(project => project.category === filter);

    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card glass';
        projectCard.dataset.id = project.id;

        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <span class="project-category">${project.category === 'web' ? 'Web App' : project.category === 'mobile' ? 'Mobile App' : 'UI/UX Design'}</span>
                <p class="project-description">${project.description}</p>
            </div>
        `;

        projectCard.addEventListener('click', () => openProjectModal(project.id));
        projectsGrid.appendChild(projectCard);
    });
}

// Project Tabs Functionality
tabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Update active tab
        tabBtns.forEach(item => item.classList.remove('active'));
        this.classList.add('active');

        // Filter projects
        const filter = this.dataset.tab;
        displayProjects(filter);
    });
});

// Open Project Modal
function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('modal-img').src = project.image;
    document.getElementById('modal-img').alt = project.title;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-category').textContent = project.category === 'web' ? 'Web Application' : project.category === 'mobile' ? 'Mobile Application' : 'UI/UX Design';
    document.getElementById('modal-description').textContent = project.description;

    const techList = document.getElementById('modal-tech-list');
    techList.innerHTML = '';
    project.tech.forEach(tech => {
        const techItem = document.createElement('span');
        techItem.className = 'tech-item';
        techItem.textContent = tech;
        techList.appendChild(techItem);
    });

    document.getElementById('modal-live-link').href = project.liveLink;
    document.getElementById('modal-code-link').href = project.codeLink;

    projectModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close Project Modal
closeModal.addEventListener('click', () => {
    projectModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Submission
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Simple form validation
    if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // In a real application, you would send the form data to a server
    // For this demo, we'll simulate a successful submission
    showFormMessage('Message sent successfully! I will get back to you soon.', 'success');

    // Reset form
    contactForm.reset();

    // Simulate sending email (in a real app, you would use a backend service)
    const mailtoLink = `mailto:jacobmanuel.website@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.open(mailtoLink, '_blank');
});

function showFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Service Card Hover Effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize
function init() {
    initTheme();
    displayProjects();

    // Add scroll event listener
    window.addEventListener('scroll', updateActiveNavLink);

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .project-card, .about-image, .about-text');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Black & White Abstract Background Effects
function initBWAbstractBackground() {
    const bwBg = document.querySelector('.bw-abstract-bg');
    if (!bwBg) return;

    // Create dynamic particles
    function createParticles() {
        const particlesContainer = document.querySelector('.particles-container');
        if (!particlesContainer) return;

        // Clear existing particles
        particlesContainer.innerHTML = '';

        // Create particles based on screen size
        const particleCount = window.innerWidth > 768 ? 100 : 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random properties
            const size = 1 + Math.random() * 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.opacity = 0.05 + Math.random() * 0.1;
            particle.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.pointerEvents = 'none';

            // Random animation
            const duration = 10 + Math.random() * 20;
            const delay = Math.random() * 5;
            particle.style.animation = `particleMove ${duration}s linear infinite`;
            particle.style.animationDelay = `${delay}s`;

            particlesContainer.appendChild(particle);
        }

        // Add particle animation CSS
        if (!document.querySelector('#particle-animations')) {
            const style = document.createElement('style');
            style.id = 'particle-animations';
            style.textContent = `
                @keyframes particleMove {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: 0.1;
                    }
                    25% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                        opacity: 0.2;
                    }
                    50% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                        opacity: 0.15;
                    }
                    75% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                        opacity: 0.2;
                    }
                    100% {
                        transform: translate(0, 0) rotate(360deg);
                        opacity: 0.1;
                    }
                }
                
                .dark-mode .particle {
                    background-color: rgba(255, 255, 255, 0.3);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Mouse interaction effects
    function initMouseInteractions() {
        if (window.innerWidth > 768) {
            const shapes = document.querySelectorAll('.abstract-shape, .float-element');
            const layers = document.querySelectorAll('.bg-layer');

            document.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;

                // Move shapes based on mouse position
                shapes.forEach(shape => {
                    const speed = shape.classList.contains('abstract-shape') ? 0.3 : 0.5;
                    const xMove = (mouseX - 0.5) * 30 * speed;
                    const yMove = (mouseY - 0.5) * 30 * speed;

                    shape.style.transform = `${shape.style.transform.split(')')[0]}) translate(${xMove}px, ${yMove}px)`;
                    shape.style.transition = 'transform 0.3s ease-out';
                });

                // Shift layers based on mouse position
                layers.forEach((layer, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const xMove = (mouseX - 0.5) * 20 * speed;
                    const yMove = (mouseY - 0.5) * 20 * speed;

                    layer.style.transform = `translate(${xMove}px, ${yMove}px)`;
                });
            });
        }
    }

    // Scroll-based effects
    function initScrollEffects() {
        let lastScrollY = window.scrollY;

        function updateScrollEffects() {
            const scrollY = window.scrollY;
            const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight);

            // Update background opacity based on scroll
            bwBg.style.opacity = 0.4 - (scrollPercent * 0.1);

            // Update shapes based on scroll
            const shapes = document.querySelectorAll('.abstract-shape');
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.2);
                const rotate = scrollY * speed * 0.01;

                shape.style.transform = `${shape.style.transform.split('rotate')[0]} rotate(${rotate}deg)`;
            });

            // Update gradient overlay
            const overlay = document.querySelector('.gradient-overlay');
            if (overlay) {
                const gradientAngle = 135 + (scrollPercent * 180);
                overlay.style.background = `linear-gradient(
                    ${gradientAngle}deg,
                    rgba(255, 255, 255, 0.1) 0%,
                    transparent 50%,
                    rgba(0, 0, 0, 0.05) 100%
                )`;
            }

            lastScrollY = scrollY;
        }

        window.addEventListener('scroll', updateScrollEffects);
        updateScrollEffects(); // Initial call
    }

    // Section-aware background effects
    function initSectionEffects() {
        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;

                    // Adjust background based on active section
                    switch (sectionId) {
                        case 'home':
                            bwBg.style.filter = 'brightness(1.1) contrast(1.05)';
                            break;
                        case 'projects':
                            bwBg.style.filter = 'contrast(1.1) saturate(1.05)';
                            break;
                        case 'services':
                            bwBg.style.filter = 'blur(0.5px) brightness(1.05)';
                            break;
                        case 'about':
                            bwBg.style.filter = 'sepia(0.1) contrast(1.05)';
                            break;
                        case 'contact':
                            bwBg.style.filter = 'brightness(0.95) contrast(1.1)';
                            break;
                    }
                }
            });
        }, {
            threshold: 0.3
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Initialize
    createParticles();
    initMouseInteractions();
    initScrollEffects();
    initSectionEffects();

    // Recreate particles on resize
    window.addEventListener('resize', () => {
        createParticles();
    });
}

// Update your init function
function init() {
    initTheme();
    displayProjects();
    initFixedHeader();
    initBWAbstractBackground(); // Add this line
    // ... rest of your init code
}


// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');

        // Update active class on click
        navLinks.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
    });
});

// Theme toggle
themeCheckbox.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('dark-mode', this.checked);
});

// Check for saved theme preference
if (localStorage.getItem('dark-mode') === 'true') {
    themeCheckbox.checked = true;
    document.body.classList.add('dark-mode');
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Function to update active nav link
function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    // Find current section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Update nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize active link on page load
updateActiveNavLink();
