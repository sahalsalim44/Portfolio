document.addEventListener('DOMContentLoaded', function() {
    // Initialize current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Navigation menu active state
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-nav a');
    
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
        });
    });
    
    // Theme toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme
    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulating form submission
            const formData = new FormData(contactForm);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                // Show success toast
                toast.classList.add('show');
                
                // Hide toast after animation completes
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 5000);
            }, 1500);
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTopBtn() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    }
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Event listeners for scroll
    window.addEventListener('scroll', function() {
        setActiveLink();
        toggleBackToTopBtn();
    });
    
    // Initial call
    setActiveLink();
    toggleBackToTopBtn();
});