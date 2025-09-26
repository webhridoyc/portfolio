// Space-themed portfolio interactive features

// Cursor trail effect
class StarTrail {
    constructor() {
        this.stars = [];
        this.maxStars = 15;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.createStar(e.clientX, e.clientY);
        });

        setInterval(() => {
            this.updateStars();
        }, 50);
    }

    createStar(x, y) {
        const star = {
            x: x,
            y: y,
            life: 30,
            maxLife: 30,
            element: this.createStarElement(x, y)
        };

        this.stars.push(star);
        document.body.appendChild(star.element);

        if (this.stars.length > this.maxStars) {
            const oldStar = this.stars.shift();
            if (oldStar.element.parentNode) {
                oldStar.element.parentNode.removeChild(oldStar.element);
            }
        }
    }

    createStarElement(x, y) {
        const star = document.createElement('div');
        star.className = 'cursor-star';
        star.style.cssText = `
            position: fixed;
            left: ${x - 5}px;
            top: ${y - 5}px;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #00FFFF, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: sparkle-fade 1.5s ease-out forwards;
        `;
        return star;
    }

    updateStars() {
        this.stars.forEach((star, index) => {
            star.life--;
            const opacity = star.life / star.maxLife;
            star.element.style.opacity = opacity;
            
            if (star.life <= 0) {
                if (star.element.parentNode) {
                    star.element.parentNode.removeChild(star.element);
                }
                this.stars.splice(index, 1);
            }
        });
    }
}

// Particle system for cosmic effects
class CosmicParticles {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        // Create initial particles
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }

        // Animation loop
        this.animate();
    }

    createParticle() {
        const particle = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            life: Math.random() * 200 + 100,
            maxLife: Math.random() * 200 + 100,
            size: Math.random() * 3 + 1,
            color: Math.random() > 0.5 ? '#00FFFF' : '#39FF14',
            element: null
        };

        particle.element = this.createParticleElement(particle);
        document.body.appendChild(particle.element);
        this.particles.push(particle);
    }

    createParticleElement(particle) {
        const element = document.createElement('div');
        element.className = 'cosmic-particle';
        element.style.cssText = `
            position: fixed;
            left: ${particle.x}px;
            top: ${particle.y}px;
            width: ${particle.size}px;
            height: ${particle.size}px;
            background: ${particle.color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
            box-shadow: 0 0 ${particle.size * 2}px ${particle.color};
        `;
        return element;
    }

    animate() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around screen
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;

            // Update life
            particle.life--;
            const opacity = particle.life / particle.maxLife * 0.6;

            // Update element
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = opacity;

            // Remove dead particles
            if (particle.life <= 0) {
                if (particle.element.parentNode) {
                    particle.element.parentNode.removeChild(particle.element);
                }
                this.particles.splice(index, 1);
                this.createParticle(); // Create new particle to maintain count
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Letter-by-letter text animation
class TextAnimator {
    constructor() {
        this.init();
    }

    init() {
        const title = document.querySelector('.home-content h1');
        if (title) {
            this.animateText(title, 0.1);
        }
    }

    animateText(element, delay) {
        const text = element.textContent;
        element.innerHTML = '';
        
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.animation = `letterDrop 0.5s ease-out ${index * delay}s forwards`;
            element.appendChild(span);
        });
    }
}

// Parallax scroll effects
class ParallaxController {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.planet, .asteroid');
            
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                element.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Enhanced hover effects
class HoverEffects {
    constructor() {
        this.init();
    }

    init() {
        // Enhanced social icons hover
        const socialIcons = document.querySelectorAll('.social-icons a');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                this.createHoverParticles(icon);
            });
        });

        // Enhanced button hover
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createHoverParticles(button);
            });
        });
    }

    createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: 4px;
                height: 4px;
                background: #00FFFF;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: hoverBurst 0.6s ease-out forwards;
                --angle: ${i * 45}deg;
            `;
            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 600);
        }
    }
}

// Add CSS animations for interactive effects
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes sparkle-fade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.3); }
    }

    @keyframes letterDrop {
        0% { 
            opacity: 0; 
            transform: translateY(-20px) rotateX(90deg); 
        }
        100% { 
            opacity: 1; 
            transform: translateY(0) rotateX(0deg); 
        }
    }

    @keyframes hoverBurst {
        0% { 
            opacity: 1; 
            transform: scale(1) rotate(var(--angle)) translateX(0);
        }
        100% { 
            opacity: 0; 
            transform: scale(0.3) rotate(var(--angle)) translateX(30px);
        }
    }
`;

document.head.appendChild(dynamicStyles);

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StarTrail();
    new CosmicParticles();
    new TextAnimator();
    new ParallaxController();
    new HoverEffects();
});

// Loading animation
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        document.body.style.animation = 'fadeIn 1s ease-out';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500); // Show loading for 1.5 seconds
});