document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const parallaxImg = document.getElementById('parallax-img');
    const welcomeSection = document.getElementById('welcome');
    const contentSection = document.getElementById('content');
    const animatedElements = document.querySelectorAll('.animated-element');
    
    // Reduced the threshold to match the viewport height
    const FIXED_SCROLL_THRESHOLD = window.innerHeight;
    
    // For smoother scrolling - throttle function
    function throttle(callback, limit) {
        let waiting = false;
        return function() {
            if (!waiting) {
                callback.apply(this, arguments);
                waiting = true;
                setTimeout(function() {
                    waiting = false;
                }, limit);
            }
        }
    }
    
    // Handle scroll events with throttling for better performance
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background change on scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Improved parallax effect with proper reset
        if (scrollTop <= FIXED_SCROLL_THRESHOLD) {
            parallaxImg.style.position = 'fixed';
            parallaxImg.style.top = '0';
            parallaxImg.style.transform = `translateY(${scrollTop * 0.5}px)`;
        } else {
            parallaxImg.style.position = 'absolute';
            parallaxImg.style.top = FIXED_SCROLL_THRESHOLD + 'px';
            parallaxImg.style.transform = 'none';
        }
        
        // Check for animated elements becoming visible
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('is-visible');
            }
        });
        
    }, 10));
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Setup nav menu item animation delays
    document.querySelectorAll('nav ul li').forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
    });
    
    // Handle window resize
    window.addEventListener('resize', throttle(function() {
        // Check for animated elements becoming visible after resize
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('is-visible');
            }
        });
    }, 100));
    
    // Initial check for visible elements
    setTimeout(() => {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('is-visible');
            }
        });
    }, 100);
    
    // Add hover animations for work items
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('h3').style.animation = 'pulse 1s infinite';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('h3').style.animation = '';
        });
    });
    
    // Add some random atmospheric animations to elements
    function addRandomAnimations() {
        const socialIcons = document.querySelectorAll('.social-icons a');
        
        // Randomly animate one social icon
        if (socialIcons.length > 0) {
            const randomIcon = socialIcons[Math.floor(Math.random() * socialIcons.length)];
            randomIcon.style.animation = 'pulse 2s';
            
            setTimeout(() => {
                randomIcon.style.animation = '';
            }, 2000);
        }
        
        // Schedule next animation
        setTimeout(addRandomAnimations, 3000 + Math.random() * 5000);
    }
    
    // Start random animations
    setTimeout(addRandomAnimations, 3000);
});