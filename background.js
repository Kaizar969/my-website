const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 80;
let mobileCanvasHeight = null;

const mouse = {
  x: null,
  y: null,
  radius: 150
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

function resizeCanvas() {
  const viewportWidth = window.innerWidth;
  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  const previousWidth = canvas.width;
  const previousHeight = canvas.height;

  if (isMobile && previousWidth === viewportWidth) {
    return;
  }

  if (isMobile) {
    mobileCanvasHeight = window.innerHeight;
  }

  const viewportHeight = isMobile ? mobileCanvasHeight : window.innerHeight;

  canvas.width = viewportWidth;
  canvas.height = viewportHeight;
  canvas.style.width = `${viewportWidth}px`;
  canvas.style.height = `${viewportHeight}px`;

  if (previousWidth && previousHeight) {
    const widthRatio = viewportWidth / previousWidth;
    const heightRatio = viewportHeight / previousHeight;

    particlesArray.forEach((particle) => {
      particle.x *= widthRatio;
      particle.y *= heightRatio;
    });
  }
}

window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.x += this.directionX;
    this.y += this.directionY;

    if (this.x >= canvas.width || this.x <= 0) {
      this.directionX = -this.directionX;
      this.x = Math.max(0, Math.min(canvas.width, this.x));
    }
    if (this.y >= canvas.height || this.y <= 0) {
      this.directionY = -this.directionY;
      this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    const hasMousePosition = mouse.x !== null && mouse.y !== null;
    let dx = hasMousePosition ? mouse.x - this.x : 0;
    let dy = hasMousePosition ? mouse.y - this.y : 0;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (hasMousePosition && distance > 0 && distance < mouse.radius) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      const directionX = forceDirectionX * force * 0.5;
      const directionY = forceDirectionY * force * 0.5;

      this.x -= directionX;
      this.y -= directionY;
    }

    this.x = Math.max(0, Math.min(canvas.width, this.x));
    this.y = Math.max(0, Math.min(canvas.height, this.y));

    this.draw();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let size = (Math.random() * 2) + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let directionX = (Math.random() * 1) - 0.5;
    let directionY = (Math.random() * 1) - 0.5;
    let color = 'rgb(44, 103, 237)';

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

function connect() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                   + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - (distance / 20000);
        ctx.strokeStyle = `rgba(44, 103, 237, ${opacityValue})`;
        ctx.lineWidth = 0.75;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  connect();
}

resizeCanvas();
init();
animate();