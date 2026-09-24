const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal, .reveal-card');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, active) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); active.unobserve(entry.target); } }), { threshold: .14 });
  revealItems.forEach((item) => observer.observe(item));
} else revealItems.forEach((item) => item.classList.add('is-visible'));

const wardrobe = document.querySelector('#wardrobe');
document.querySelector('#open-doors').addEventListener('click', () => wardrobe.classList.toggle('is-open'));

const comfortCards = document.querySelectorAll('.comfort-card');
const meter = document.querySelector('#meter-fill');
const count = document.querySelector('#meter-count');
const comfortMessage = document.querySelector('#comfort-message');
const dialog = document.querySelector('#comfort-dialog');
const dialogText = document.querySelector('#dialog-text');
let comforts = 0;
comfortCards.forEach((card) => card.addEventListener('click', () => {
  if (card.classList.contains('picked')) return;
  card.classList.add('picked'); comforts += 1; count.textContent = comforts; meter.style.width = `${comforts / 3 * 100}%`;
  comfortMessage.textContent = comforts === 3 ? 'Comfort meter full. That is plenty for one day.' : 'Nice. One softer thing is already waiting for you.';
  dialogText.textContent = card.dataset.comfort; dialog.showModal();
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-button').addEventListener('click', () => dialog.close());

const canvas = document.querySelector('#confetti');
function confetti() {
  if (reduceMotion) return;
  const ctx = canvas.getContext('2d'); const rect = canvas.getBoundingClientRect(); const scale = devicePixelRatio || 1;
  canvas.width = rect.width * scale; canvas.height = rect.height * scale; ctx.setTransform(scale, 0, 0, scale, 0, 0);
  const colors = ['#fff67d','#fff','#94efd5','#ff9dc1','#ffa766']; const pieces = Array.from({length:150}, () => ({x:rect.width/2,y:rect.height*.47,vx:(Math.random()-.5)*14,vy:-5-Math.random()*12,size:5+Math.random()*7,spin:Math.random()*6,turn:(Math.random()-.5)*.25,color:colors[Math.floor(Math.random()*colors.length)]}));
  let frame = 0; const draw = () => { ctx.clearRect(0,0,rect.width,rect.height); pieces.forEach((p) => { p.x+=p.vx;p.y+=p.vy;p.vy+=.17;p.spin+=p.turn;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.spin);ctx.fillStyle=p.color;ctx.fillRect(-p.size/2,-p.size/3,p.size,p.size*.7);ctx.restore(); }); if (++frame<160) requestAnimationFrame(draw); else ctx.clearRect(0,0,rect.width,rect.height); }; draw();
}
if (!reduceMotion && 'IntersectionObserver' in window) new IntersectionObserver((entries, observer) => { if (entries[0].isIntersecting) { confetti(); observer.disconnect(); } }, {threshold:.38}).observe(document.querySelector('.closing'));
document.querySelector('#party-button').addEventListener('click', confetti);
