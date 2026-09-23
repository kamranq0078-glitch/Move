const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = document.querySelectorAll('.reveal, .reveal-card');
if (!reduced && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, active) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); active.unobserve(entry.target); } }), { threshold: .14 });
  items.forEach((item) => observer.observe(item));
} else items.forEach((item) => item.classList.add('is-visible'));

const dialog = document.querySelector('#message-dialog');
const copy = document.querySelector('#dialog-copy');
document.querySelectorAll('.quest-card').forEach((card) => card.addEventListener('click', () => { copy.textContent = card.dataset.note; dialog.showModal(); }));
document.querySelector('#open-note').addEventListener('click', () => { copy.textContent = 'You are more ready than you feel right now. Take it one small, beautiful thing at a time — and let this new place surprise you.'; dialog.showModal(); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-button').addEventListener('click', () => dialog.close());

const canvas = document.querySelector('#confetti');
let played = false;
function confetti() {
  if (reduced) return;
  const ctx = canvas.getContext('2d'), bounds = canvas.getBoundingClientRect(), scale = devicePixelRatio || 1;
  canvas.width = bounds.width * scale; canvas.height = bounds.height * scale; ctx.setTransform(scale, 0, 0, scale, 0, 0);
  const colours = ['#fff47a','#fff','#a8e8d4','#ffacc4','#ffc95c'];
  const bits = Array.from({ length: 135 }, () => ({ x: bounds.width / 2, y: bounds.height * .48, vx:(Math.random()-.5)*13, vy:-4-Math.random()*12, size:5+Math.random()*7, spin:Math.random()*6, turn:(Math.random()-.5)*.28, color:colours[Math.floor(Math.random()*colours.length)] }));
  let frame = 0; const draw = () => { ctx.clearRect(0,0,bounds.width,bounds.height); bits.forEach((bit) => { bit.x += bit.vx; bit.y += bit.vy; bit.vy += .17; bit.spin += bit.turn; ctx.save(); ctx.translate(bit.x,bit.y); ctx.rotate(bit.spin); ctx.fillStyle=bit.color; ctx.fillRect(-bit.size/2,-bit.size/3,bit.size,bit.size*.7); ctx.restore(); }); if (++frame < 155) requestAnimationFrame(draw); else ctx.clearRect(0,0,bounds.width,bounds.height); }; draw();
}
if (!reduced && 'IntersectionObserver' in window) new IntersectionObserver((entries, observer) => { if (entries[0].isIntersecting && !played) { played = true; confetti(); observer.disconnect(); } }, { threshold:.38 }).observe(document.querySelector('.closing'));
document.querySelector('#celebrate').addEventListener('click', confetti);
