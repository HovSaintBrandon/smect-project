// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

     
    // Hero carousel
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your inquiry! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add scroll animation effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.service-card, .why-card, .client-card, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ——— TEAM DATA (global) ———
const teamData = {
    ceo: {
        name: 'Charles Oranga',
        position: 'Chief Executive Officer',
        image: 'Coranga.png',
        description: `
            <h4>Professional Experience</h4>
            <ul>
                <li>Over 20 years of experience in business development and consultancy</li>
                <li>Extensive expertise in programme design and project management</li>
                <li>Proven track record in organizational capacity building</li>
                <li>Led numerous successful projects across East Africa</li>
            </ul>
            <h4>Key Skills</h4>
            <ul>
                <li>Strategic Planning & Business Development</li>
                <li>Project Management & Leadership</li>
                <li>Stakeholder Engagement & Communication</li>
                <li>Organizational Development & Change Management</li>
            </ul>
        `
    },
    uganda: {
        name: 'Elvis Obbo',
        position: 'Manager Head Office Uganda',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
        description: `<h4>Professional Experience</h4>
            <ul>
                <li>15+ years managing regional operations across East Africa</li>
                <li>Specialized in cross-border project coordination</li>
                <li>Expert in stakeholder management and client relations</li>
                <li>Successfully delivered multiple capacity building initiatives</li>
            </ul>
            <h4>Key Skills</h4>
            <ul>
                <li>Regional Operations Management</li>
                <li>Client Relationship Management</li>
                <li>Team Leadership & Development</li>
                <li>Programme Implementation & Monitoring</li>
            </ul>`
    },
    general: {
        name: 'General Manager',
        position: 'General Manager',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
        description: `<h4>Professional Experience</h4>
            <ul>
                <li>Extensive experience in organizational management and operations</li>
                <li>Proven expertise in quality assurance and service delivery</li>
                <li>Strong background in research and monitoring & evaluation</li>
                <li>Led implementation of innovative business solutions</li>
            </ul>
            <h4>Key Skills</h4>
            <ul>
                <li>Operational Excellence & Process Optimization</li>
                <li>Quality Management & Assurance</li>
                <li>Research & Evaluation Methodologies</li>
                <li>Strategic Planning & Implementation</li>
            </ul>`
    }
};

// ——— ALL DOM-READY CODE ———
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();

    // ... all your existing code (carousel, mobile menu, smooth scroll, form, etc.) ...

    // Team modal functions
    function openTeamModal(managerId) {
        const data = teamData[managerId];
        if (!data) return;

        document.getElementById('modalName').textContent = data.name;
        document.getElementById('modalPosition').textContent = data.position;
        document.getElementById('modalImage').src = data.image;
        document.getElementById('modalImage').alt = data.position;
        document.getElementById('modalDescription').innerHTML = data.description;

        document.getElementById('teamModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeTeamModal = function() {
    document.getElementById('teamModal').classList.remove('active');
    document.body.style.overflow = '';
};

    // Close on backdrop click
    document.getElementById('teamModal').addEventListener('click', e => {
        if (e.target === e.currentTarget) closeTeamModal();
    });

    // Close with Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeTeamModal();
    });

    // ——— THIS IS THE IMPORTANT PART ———
    document.querySelectorAll('.team-card').forEach(card => {
        card.addEventListener('click', function () {
            const managerId = this.dataset.manager;   // "ceo", "uganda", "general"
            if (managerId && teamData[managerId]) {
                openTeamModal(managerId);
            }
        });
    });

    // ... rest of your code (observer, scroll spy, etc.) ...

}); // ← only ONE closing here

// Global scroll helper (still fine outside)
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
        const navHeight = document.querySelector('.navigation')?.offsetHeight || 0;
        window.scrollTo({
            top: el.offsetTop - navHeight - 20,
            behavior: 'smooth'
        });
    }
}