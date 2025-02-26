// Particles.js Configuration
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#bd4bff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#bd4bff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Navigation functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const nav = document.querySelector('.glass-nav');

    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
    });

    // Close menu when a nav item is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
        });
    });

    // Scroll functionality
    window.addEventListener('scroll', () => {
        // Nav bar background change on scroll
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Highlight active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });

        // Animate skill bars when in viewport
        const skillsSection = document.getElementById('skills');
        const skillBars = document.querySelectorAll('.skill-progress');
        
        if (isInViewport(skillsSection)) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                if (!width || width === '0px') {
                    const percentageWidth = bar.parentElement.previousElementSibling.querySelector('.percentage').textContent;
                    bar.style.width = percentageWidth;
                }
            });
        }

        // Animate counters when in viewport
        const aboutSection = document.getElementById('about');
        const counters = document.querySelectorAll('.counter');
        
        if (isInViewport(aboutSection)) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 100;
                
                if (count < target) {
                    counter.innerText = Math.min(Math.ceil(count + increment), target);
                    setTimeout(() => {
                        animateCounter(counter);
                    }, 20);
                }
            });
        }
    });

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate counter
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.min(Math.ceil(count + increment), target);
            setTimeout(() => {
                animateCounter(counter);
            }, 20);
        }
    }

    // Switch skills tabs
    const skillsCategories = document.querySelectorAll('.category');
    const skillsGroups = document.querySelectorAll('.skills-group');

    skillsCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            skillsCategories.forEach(c => c.classList.remove('active'));
            // Add active class to clicked category
            category.classList.add('active');
            
            // Hide all skill groups
            skillsGroups.forEach(group => group.classList.remove('active'));
            // Show the corresponding skill group
            const targetGroup = document.getElementById(category.getAttribute('data-category'));
            targetGroup.classList.add('active');
        });
    });

    // Form submission with validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                nameInput.style.borderColor = 'red';
                isValid = false;
            } else {
                nameInput.style.borderColor = '';
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                emailInput.style.borderColor = 'red';
                isValid = false;
            } else {
                emailInput.style.borderColor = '';
            }
            
            if (subjectInput.value.trim() === '') {
                subjectInput.style.borderColor = 'red';
                isValid = false;
            } else {
                subjectInput.style.borderColor = '';
            }
            
            if (messageInput.value.trim() === '') {
                messageInput.style.borderColor = 'red';
                isValid = false;
            } else {
                messageInput.style.borderColor = '';
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For demo purposes, we'll just show an alert
                alert('Message sent successfully!');
                contactForm.reset();
            }
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 50px 0 rgba(0, 0, 0, 0.6)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
        });
    });

    // Form input animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('.form-glow').style.width = '100%';
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.parentElement.querySelector('.form-glow').style.width = '0';
            }
        });
    });

    // Initial animations on page load
    setTimeout(() => {
        document.querySelectorAll('.glass-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});