/* Motion timing lives here; card timing is also in styles/main.css. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal, .reveal-card');

if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const closing = document.querySelector('.closing');
const canvas = document.querySelector('#confetti');
let hasCelebrated = false;

function burstConfetti() {
  if (reduceMotion || hasCelebrated || !canvas) return;
  hasCelebrated = true;
  const context = canvas.getContext('2d');
  const ratio = window.devicePixelRatio || 1;
  const bounds = canvas.getBoundingClientRect();
  canvas.width = bounds.width * ratio;
  canvas.height = bounds.height * ratio;
  context.scale(ratio, ratio);
  const colors = ['#ffe36a', '#fff6e5', '#84ecd1', '#ff9c75', '#b99aff'];
  const pieces = Array.from({ length: 105 }, () => ({
    x: bounds.width / 2 + (Math.random() - .5) * 45,
    y: bounds.height * .42,
    vx: (Math.random() - .5) * 11,
    vy: -Math.random() * 11 - 3,
    gravity: .16 + Math.random() * .1,
    size: 5 + Math.random() * 7,
    spin: Math.random() * Math.PI,
    rotate: (Math.random() - .5) * .24,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
  let frame = 0;
  function draw() {
    context.clearRect(0, 0, bounds.width, bounds.height);
    pieces.forEach((piece) => {
      piece.x += piece.vx; piece.y += piece.vy; piece.vy += piece.gravity; piece.spin += piece.rotate;
      context.save(); context.translate(piece.x, piece.y); context.rotate(piece.spin); context.fillStyle = piece.color;
      context.fillRect(-piece.size / 2, -piece.size / 3, piece.size, piece.size * .66); context.restore();
    });
    frame += 1;
    if (frame < 150) requestAnimationFrame(draw); else context.clearRect(0, 0, bounds.width, bounds.height);
  }
  draw();
}
if (!reduceMotion && closing && 'IntersectionObserver' in window) {
  new IntersectionObserver((entries, observer) => { if (entries[0].isIntersecting) { burstConfetti(); observer.disconnect(); } }, { threshold: .35 }).observe(closing);
}
