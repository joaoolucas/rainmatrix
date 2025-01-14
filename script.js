class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 16;
        this.columns = 0;
        this.drops = [];
        this.speed = 15;
        this.isPaused = false;
        this.interactionCount = 0;

        this.resize();
        this.setupEventListeners();
        this.initializeDrops();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.initializeDrops();
    }

    initializeDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            const column = Math.floor(e.clientX / this.fontSize);
            this.drops[column] = 0;
            this.interactionCount++;
            
            if (this.interactionCount > 50) {
                document.querySelector('.hidden-message').classList.add('show');
                setTimeout(() => {
                    document.querySelector('.hidden-message').classList.remove('show');
                }, 3000);
                this.interactionCount = 0;
            }
        });

        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const speed = e.target.dataset.speed;
                switch(speed) {
                    case 'slow': this.speed = 30; break;
                    case 'normal': this.speed = 15; break;
                    case 'extreme': this.speed = 5; break;
                }
            });
        });

        this.canvas.addEventListener('mouseenter', () => {
            this.isPaused = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isPaused = false;
        });
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';

        for (let i = 0; i < this.drops.length; i++) {
            if (this.isPaused) continue;
            
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    animate() {
        setTimeout(() => {
            requestAnimationFrame(() => this.animate());
            this.draw();
        }, this.speed);
    }
}

// Initialize when the page loads
window.addEventListener('load', () => {
    new MatrixRain();
}); 