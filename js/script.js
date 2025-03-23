// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Page loading animation
    const loaderWrapper = document.createElement('div');
    loaderWrapper.className = 'loader-wrapper';
    const loader = document.createElement('div');
    loader.className = 'loader';
    loaderWrapper.appendChild(loader);
    document.body.appendChild(loaderWrapper);

    // Hide loader after page loads
    window.addEventListener('load', () => {
        loaderWrapper.classList.add('fade-out');
        setTimeout(() => {
            loaderWrapper.remove();
        }, 800);
    });

    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.querySelector('body');
    
    // Toggle navigation menu
    if (burger) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
            
            // Prevent background scrolling when menu is open
            body.classList.toggle('no-scroll');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                body.classList.remove('no-scroll');
                
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // Typing effect for hero heading
    const nameElement = document.querySelector('.hero-content h1 .highlight');
    if (nameElement) {
        const name = nameElement.textContent;
        nameElement.textContent = '';
        
        function typeEffect(element, text, i = 0) {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                setTimeout(() => typeEffect(element, text, i + 1), 100);
            } else {
                // Add cursor blink effect
                const cursor = document.createElement('span');
                cursor.className = 'typed-cursor';
                cursor.textContent = '|';
                element.parentNode.appendChild(cursor);
                
                // Blink cursor
                setInterval(() => {
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }, 500);
            }
        }
        
        // Start typing effect after a small delay
        setTimeout(() => {
            typeEffect(nameElement, name);
        }, 1000);
    }
    
    // Form submission with enhanced validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add focus effect elements to form inputs
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            const focusEffect = document.createElement('span');
            focusEffect.className = 'input-focus-effect';
            input.parentNode.appendChild(focusEffect);
        });
        
        // Add error message elements
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            group.appendChild(errorMessage);
        });
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Your message has been sent successfully! I will get back to you soon.';
        contactForm.insertBefore(successMessage, contactForm.firstChild);
        
        // Validate email function
        function validateEmail(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        
        // Show error message
        function showError(input, message) {
            const formGroup = input.parentElement;
            formGroup.className = 'form-group error';
            const errorMessage = formGroup.querySelector('.error-message');
            errorMessage.textContent = message;
        }
        
        // Show success outline
        function showSuccess(input) {
            const formGroup = input.parentElement;
            formGroup.className = 'form-group';
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Get form values
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                showSuccess(name);
            }
            
            // Validate email
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email.value.trim())) {
                showError(email, 'Email is not valid');
                isValid = false;
            } else {
                showSuccess(email);
            }
            
            // Validate subject
            if (subject.value.trim() === '') {
                showError(subject, 'Subject is required');
                isValid = false;
            } else {
                showSuccess(subject);
            }
            
            // Validate message
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                showSuccess(message);
            }
            
            // If form is valid, show success message
            if (isValid) {
                successMessage.classList.add('show');
                
                // Reset the form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Scroll smoothly to target
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Highlight the active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Add shadow and shrink to header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add animation to stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    
    // Animation function for incrementing numbers
    function animateStats() {
        stats.forEach(stat => {
            const targetText = stat.textContent;
            const isPlus = targetText.includes('+');
            const target = parseInt(targetText);
            
            // Set initial value and clear content
            stat.textContent = '0';
            
            // Determine increment based on target value
            const increment = Math.ceil(target / 40);
            const duration = 1500; // Total animation duration in ms
            const interval = duration / (target / increment);
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = isPlus ? target + '+' : target;
                    clearInterval(timer);
                } else {
                    stat.textContent = current;
                }
            }, interval);
        });
    }
    
    // Add scroll reveal animation
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    const staggerElements = document.querySelectorAll('.timeline-item, .experience-card, .research-item, .skill-list li');
    
    // Apply stagger item class to elements
    staggerElements.forEach(el => {
        el.classList.add('stagger-item');
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Track if animations have run
    let statsAnimated = false;
    
    // Check element visibility on scroll and show animations
    function checkVisibility() {
        // Check fade elements
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('appear');
            }
        });
        
        // Check stagger elements
        staggerElements.forEach((element, index) => {
            if (isInViewport(element)) {
                setTimeout(() => {
                    element.classList.add('appear');
                }, 100 * index);
            }
        });
        
        // Animate stats when they come into view
        if (!statsAnimated && stats.length > 0) {
            const statsSection = document.querySelector('.key-stats');
            if (statsSection && isInViewport(statsSection)) {
                animateStats();
                statsAnimated = true;
            }
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Check on initial load
    checkVisibility();
    
    // Add filter functionality for experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    const addFilters = () => {
        if (experienceCards.length > 0) {
            // Extract categories from the cards
            const categories = new Set();
            experienceCards.forEach(card => {
                const category = card.getAttribute('data-category') || 'all';
                categories.add(category);
            });
            
            // Create filter buttons if we have categories
            if (categories.size > 0) {
                const filterContainer = document.createElement('div');
                filterContainer.className = 'filter-buttons';
                
                // Add "All" button first
                const allButton = document.createElement('button');
                allButton.className = 'filter-button active';
                allButton.textContent = 'All';
                allButton.setAttribute('data-filter', 'all');
                filterContainer.appendChild(allButton);
                
                // Add category buttons
                categories.forEach(category => {
                    if (category !== 'all') {
                        const button = document.createElement('button');
                        button.className = 'filter-button';
                        button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                        button.setAttribute('data-filter', category);
                        filterContainer.appendChild(button);
                    }
                });
                
                // Insert filter buttons at the beginning of the experience section
                const experienceSection = document.querySelector('.experience .section-header');
                if (experienceSection) {
                    experienceSection.parentNode.insertBefore(filterContainer, experienceSection.nextSibling);
                    
                    // Add click event to filter buttons
                    const filterButtons = document.querySelectorAll('.filter-button');
                    filterButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            // Remove active class from all buttons
                            filterButtons.forEach(btn => btn.classList.remove('active'));
                            
                            // Add active class to clicked button
                            button.classList.add('active');
                            
                            // Get filter value
                            const filterValue = button.getAttribute('data-filter');
                            
                            // Show/hide cards
                            experienceCards.forEach(card => {
                                const cardCategory = card.getAttribute('data-category') || 'all';
                                
                                // Animate for smoother transition
                                if (filterValue === 'all' || cardCategory === filterValue) {
                                    card.style.opacity = '0';
                                    card.style.transform = 'translateY(20px)';
                                    
                                    setTimeout(() => {
                                        card.style.display = 'block';
                                        setTimeout(() => {
                                            card.style.opacity = '1';
                                            card.style.transform = 'translateY(0)';
                                        }, 50);
                                    }, 300);
                                } else {
                                    card.style.opacity = '0';
                                    card.style.transform = 'translateY(20px)';
                                    
                                    setTimeout(() => {
                                        card.style.display = 'none';
                                    }, 300);
                                }
                            });
                        });
                    });
                }
            }
        }
    };
    
    // Initialize filters
    addFilters();
    
    // Add data-category attribute to experience cards if not already present
    experienceCards.forEach(card => {
        if (!card.hasAttribute('data-category')) {
            // Get category from card title or set to default
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            if (title.includes('internal')) {
                card.setAttribute('data-category', 'internal');
            } else if (title.includes('pediatric')) {
                card.setAttribute('data-category', 'pediatrics');
            } else if (title.includes('surgery')) {
                card.setAttribute('data-category', 'surgery');
            } else {
                card.setAttribute('data-category', 'other');
            }
        }
    });
    
    // Add hover effect to experience cards with JS for more complex animations
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.experience-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.experience-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    
    function setActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.querySelector('a').classList.remove('active');
            if (link.querySelector(`a[href="#${current}"]`)) {
                link.querySelector(`a[href="#${current}"]`).classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initially set active class
    setActiveNavLink();
}); 