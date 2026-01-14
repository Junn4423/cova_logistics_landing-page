/**
 * ============================================
 * COVASOL GLOBAL LINK - MAIN.JS
 * "The Art of Movement" - Interactive Effects
 * ============================================
 */

(function() {
    'use strict';

    // ============================================
    // 1. PAGE LOADER
    // ============================================
    const pageLoader = document.querySelector('.page-loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            pageLoader.classList.add('loaded');
        }, 500);
    });

    // ============================================
    // 2. SMOOTH REVEAL - IntersectionObserver
    // ============================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-skew, .reveal-fade, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after reveal
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ============================================
    // 3. HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    let lastScrollY = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // ============================================
    // 4. MAGNETIC BUTTON EFFECT
    // ============================================
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Magnetic pull strength
            const strength = 0.3;
            
            el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'transform 0.1s ease-out';
        });
    });

    // ============================================
    // 5. PAGE TRANSITION
    // ============================================
    const pageTransition = document.querySelector('.page-transition');
    const transitionLinks = document.querySelectorAll('[data-transition]');
    
    transitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Don't transition for same page or anchor links
            if (href === window.location.pathname || href.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            
            // Activate transition overlay
            pageTransition.classList.add('active');
            
            // Navigate after transition
            setTimeout(() => {
                window.location.href = href;
            }, 600);
        });
    });
    
    // Fade in on page load
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            pageTransition.classList.remove('active');
        }
    });

    // ============================================
    // 6. PARALLAX EFFECT FOR FLEET IMAGES
    // ============================================
    const parallaxImages = document.querySelectorAll('[data-parallax-img]');
    
    if (parallaxImages.length > 0) {
        let parallaxTicking = false;
        
        function updateParallax() {
            parallaxImages.forEach(img => {
                const wrapper = img.closest('.fleet-image-wrapper');
                if (!wrapper) return;
                
                const rect = wrapper.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                // Check if element is in viewport
                if (rect.top < windowHeight && rect.bottom > 0) {
                    // Calculate parallax offset
                    const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
                    const parallaxOffset = (scrollProgress - 0.5) * 60; // 60px max offset
                    
                    img.style.transform = `translateY(${parallaxOffset}px)`;
                }
            });
            
            parallaxTicking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                window.requestAnimationFrame(updateParallax);
                parallaxTicking = true;
            }
        });
        
        // Initial call
        updateParallax();
    }

    // ============================================
    // 7. CITY IMAGE HOVER FOLLOW CURSOR
    // ============================================
    const cityItems = document.querySelectorAll('.city-item');
    
    cityItems.forEach(item => {
        const image = item.querySelector('.city-image');
        
        if (image) {
            item.addEventListener('mousemove', (e) => {
                // Position image near cursor
                const x = e.clientX;
                const y = e.clientY;
                
                image.style.left = `${x}px`;
                image.style.top = `${y}px`;
                image.style.transform = 'translate(-50%, -50%)';
            });
        }
    });

    // ============================================
    // 8. SMOOTH ANCHOR SCROLLING
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 9. MOBILE MENU TOGGLE
    // ============================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    let isMenuOpen = false;
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'fixed';
                nav.style.top = 'var(--header-height)';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'rgba(248, 250, 252, 0.98)';
                nav.style.backdropFilter = 'blur(20px)';
                nav.style.padding = 'var(--space-2xl)';
                nav.style.gap = 'var(--space-lg)';
                nav.style.animation = 'fadeIn 0.3s ease';
                
                // Animate hamburger to X
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                nav.style.display = '';
                nav.style.flexDirection = '';
                nav.style.position = '';
                nav.style.top = '';
                nav.style.left = '';
                nav.style.right = '';
                nav.style.background = '';
                nav.style.backdropFilter = '';
                nav.style.padding = '';
                nav.style.gap = '';
                nav.style.animation = '';
                
                // Reset hamburger
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }

    // ============================================
    // 10. GLOBE ANIMATION (Additional touch)
    // ============================================
    const globeContainer = document.querySelector('.globe-container');
    
    if (globeContainer) {
        // Add slight mouse-follow rotation
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            const globe = globeContainer.querySelector('.globe-wireframe');
            if (globe) {
                globe.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
            }
        });
    }

    // ============================================
    // 11. TYPING EFFECT FOR HERO (Optional)
    // ============================================
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // ============================================
    // 12. PERFORMANCE: Debounce & Throttle
    // ============================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // 13. IMAGE LAZY LOADING
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // 14. CURSOR CUSTOM - Red Elegant Design
    // ============================================
    const createCustomCursor = () => {
        // Only for desktop
        if (window.matchMedia('(pointer: fine)').matches) {
            // Create cursor dot
            const cursorDot = document.createElement('div');
            cursorDot.className = 'cursor-dot';
            document.body.appendChild(cursorDot);
            
            // Create cursor ring
            const cursorRing = document.createElement('div');
            cursorRing.className = 'cursor-ring';
            document.body.appendChild(cursorRing);
            
            let dotX = 0, dotY = 0;
            let ringX = 0, ringY = 0;
            let targetX = 0, targetY = 0;
            
            // Mouse move event
            document.addEventListener('mousemove', (e) => {
                targetX = e.clientX;
                targetY = e.clientY;
                
                // Show cursors
                cursorDot.classList.add('active');
                cursorRing.classList.add('active');
            });
            
            // Mouse leave event
            document.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('active');
                cursorRing.classList.remove('active');
            });
            
            // Smooth cursor animation
            function animateCursor() {
                // Dot follows quickly
                dotX += (targetX - dotX) * 0.25;
                dotY += (targetY - dotY) * 0.25;
                
                // Ring follows slower for trailing effect
                ringX += (targetX - ringX) * 0.15;
                ringY += (targetY - ringY) * 0.15;
                
                cursorDot.style.left = `${dotX - 4}px`;
                cursorDot.style.top = `${dotY - 4}px`;
                
                cursorRing.style.left = `${ringX - 20}px`;
                cursorRing.style.top = `${ringY - 20}px`;
                
                requestAnimationFrame(animateCursor);
            }
            
            animateCursor();
            
            // Hover effect on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .magnetic, .link-underline, .city-item, input, textarea');
            
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorDot.classList.add('hover');
                    cursorRing.classList.add('hover');
                });
                
                el.addEventListener('mouseleave', () => {
                    cursorDot.classList.remove('hover');
                    cursorRing.classList.remove('hover');
                });
            });
            
            // Click effect
            document.addEventListener('mousedown', () => {
                cursorRing.classList.add('click');
            });
            
            document.addEventListener('mouseup', () => {
                cursorRing.classList.remove('click');
            });
        }
    };
    
    // Enable custom cursor
    createCustomCursor();

    // ============================================
    // 15. INITIALIZE
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        // Add fade-in animation keyframe
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
        
        console.log('🌊 Covasol Global Link - The Art of Movement');
        console.log('📦 All systems initialized');
    });

})();
