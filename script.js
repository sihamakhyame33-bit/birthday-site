/* ========================================
   BIRTHDAY WEBSITE JAVASCRIPT
   Handles animations, music, and interactions
   ======================================== */

// ===== WAIT FOR PAGE TO LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initMusicPlayer();
    initScrollAnimations();
    createBalloons();
    createConfetti();
    initFinalAnimation();
    
});

// ===== MUSIC PLAYER FUNCTIONALITY =====
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const birthdayMusic = document.getElementById('birthdayMusic');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    // Start music muted (autoplay requirement)
    birthdayMusic.muted = true;
    
    // Music toggle button click handler
    musicToggle.addEventListener('click', function() {
        if (birthdayMusic.paused) {
            // Unmute and play
            birthdayMusic.muted = false;
            birthdayMusic.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            
            // Add visual feedback
            musicToggle.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569)';
            musicToggle.style.color = 'white';
            musicToggle.style.borderColor = '#c44569';
        } else {
            // Pause music
            birthdayMusic.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            
            // Reset visual feedback
            musicToggle.style.background = 'white';
            musicToggle.style.color = '#ff6b9d';
            musicToggle.style.borderColor = '#ff6b9d';
        }
    });
    
    // Optional: Auto-play after first user interaction (better UX)
    document.body.addEventListener('click', function autoPlay() {
        if (birthdayMusic.paused) {
            birthdayMusic.muted = false;
            birthdayMusic.play().catch(function(error) {
                console.log('Autoplay prevented:', error);
            });
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            musicToggle.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569)';
            musicToggle.style.color = 'white';
            musicToggle.style.borderColor = '#c44569';
        }
        // Remove listener after first click
        document.body.removeEventListener('click', autoPlay);
    }, { once: true });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Get all elements with animation class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Intersection Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Intersection Observer callback
    const observerCallback = function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Add visible class when element enters viewport
                entry.target.classList.add('visible');
                
                // Optional: Stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    };
    
    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all animation elements
    animateElements.forEach(function(element) {
        observer.observe(element);
    });
}

// ===== CREATE FLOATING BALLOONS =====
function createBalloons() {
    const balloonsContainer = document.getElementById('balloonsContainer');
    
    // Balloon emojis to use
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    
    // Number of balloons to create
    const numberOfBalloons = 8;
    
    // Create balloons
    for (let i = 0; i < numberOfBalloons; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Random balloon emoji
        const randomEmoji = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        balloon.textContent = randomEmoji;
        
        // Random horizontal position
        balloon.style.left = Math.random() * 100 + '%';
        
        // Random animation delay for staggered effect
        balloon.style.animationDelay = Math.random() * 5 + 's';
        
        // Random animation duration (between 12-18 seconds)
        balloon.style.animationDuration = (12 + Math.random() * 6) + 's';
        
        // Add to container
        balloonsContainer.appendChild(balloon);
    }
}

// ===== CREATE CONFETTI EFFECT =====
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    
    // Confetti colors - Engineering theme
    const colors = [
        '#2c5f8d',  // Deep blue
        '#1a3a52',  // Dark navy
        '#f39c12',  // Construction orange
        '#3498db',  // Bright blue
        '#2980b9',  // Medium blue
        '#e67e22',  // Orange
        '#95a5a6',  // Steel gray
    ];
    
    // Number of confetti pieces
    const numberOfConfetti = 50;
    
    // Create confetti pieces
    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random color
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random horizontal position
        confetti.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        confetti.style.animationDelay = Math.random() * 5 + 's';
        
        // Random animation duration (between 3-6 seconds)
        confetti.style.animationDuration = (3 + Math.random() * 3) + 's';
        
        // Random size
        const size = 5 + Math.random() * 10;
        confetti.style.width = size + 'px';
        confetti.style.height = size + 'px';
        
        // Random shape (circle or square)
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        // Add to container
        confettiContainer.appendChild(confetti);
    }
}

// ===== FINAL ANIMATION (Hearts at Bottom) =====
function initFinalAnimation() {
    const finalAnimation = document.getElementById('finalAnimation');
    const finalSection = document.querySelector('.final-section');
    
    // Intersection Observer for final section
    const finalObserverOptions = {
        threshold: 0.5,  // Trigger when 50% of section is visible
        rootMargin: '0px'
    };
    
    const finalObserverCallback = function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Show final animation when section is in view
                finalAnimation.classList.add('visible');
            }
        });
    };
    
    const finalObserver = new IntersectionObserver(finalObserverCallback, finalObserverOptions);
    finalObserver.observe(finalSection);
}

// ===== SMOOTH SCROLL FOR NAVIGATION =====
// If you add navigation links, this will enable smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== PARALLAX EFFECT FOR BALLOONS (Optional Enhancement) =====
// This makes balloons move slightly based on scroll position
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const balloons = document.querySelectorAll('.balloon');
    
    balloons.forEach(function(balloon, index) {
        // Different speed for each balloon
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        balloon.style.transform = 'translateY(' + yPos + 'px)';
    });
});

// ===== GALLERY IMAGE ERROR HANDLING =====
// Provides fallback if images don't load
document.querySelectorAll('.gallery-frame img').forEach(function(img) {
    img.addEventListener('error', function() {
        // Create a placeholder gradient if image fails to load
        this.style.display = 'none';
        const frame = this.parentElement;
        frame.style.background = 'linear-gradient(135deg, #ff6b9d, #c44569, #ffa502)';
        
        // Add text overlay
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
            padding: 20px;
        `;
        placeholder.textContent = '📸 Add your photo here';
        frame.appendChild(placeholder);
    });
});

// ===== MUSIC FILE ERROR HANDLING =====
// Alerts user if music file is missing
const birthdayMusic = document.getElementById('birthdayMusic');
birthdayMusic.addEventListener('error', function() {
    console.log('Music file not found. Please add your music file to the music folder.');
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.style.opacity = '0.5';
    musicToggle.style.cursor = 'not-allowed';
    musicToggle.disabled = true;
});

// ===== CONSOLE MESSAGE =====
// Fun message in browser console
console.log('%c🎂 Happy Birthday Mounaim! 🎂', 'color: #ff6b9d; font-size: 24px; font-weight: bold;');
console.log('%cMade with 💙 and JavaScript', 'color: #c44569; font-size: 16px;');

// ===== PERFORMANCE: Lazy load images =====
// Images will load only when they're about to be visible
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image will load normally due to lazy loading attribute in HTML
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(function(img) {
        imageObserver.observe(img);
    });
}

// ===== ADDITIONAL FEATURES YOU CAN ADD =====

/*
// Example: Add a countdown timer
function addCountdownTimer() {
    // Set birthday date
    const birthdayDate = new Date('2026-02-03T00:00:00');
    const now = new Date();
    const timeDiff = birthdayDate - now;
    
    if (timeDiff > 0) {
        // Birthday hasn't happened yet
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        console.log('Days until birthday:', days);
    }
}

// Example: Add fullscreen image viewer
function addImageViewer() {
    document.querySelectorAll('.gallery-frame img').forEach(function(img) {
        img.addEventListener('click', function() {
            // Create fullscreen overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const fullImg = document.createElement('img');
            fullImg.src = this.src;
            fullImg.style.maxWidth = '90%';
            fullImg.style.maxHeight = '90%';
            
            overlay.appendChild(fullImg);
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    });
}

// Call these functions if you want to use them
// addCountdownTimer();
// addImageViewer();
*/
