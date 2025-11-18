/* Entry point: bootstrap scene, UI, animations, particles */
import { hasWebGL, prefersReducedMotion, prefersReducedData, createLoadingOverlay, throttle, makeFPSMeter } from './utils.js';
import { initThree, loadHeroModel, animate, handlePointer } from './three-scene.js';
import { introTimeline, typeTagline } from './animations.js';
import { initUI } from './ui.js';

let threeCtx, loading;
let particles=[]; let particleCanvas;

function init(){
  initUI();
  typeTagline();
  if(!hasWebGL() || prefersReducedMotion()) { enableFallback(); return; }
  const canvas = document.getElementById('three-canvas');
  threeCtx = initThree(canvas);
  loading = createLoadingOverlay();
  loadHeroModel(p=> loading.setProgress(p)).then(()=>{ loading.setProgress(100); setTimeout(()=>loading.remove(),800); startLoop(); });
  setupPointer();
  setupParticles();
  introTimeline();
  if(location.search.includes('debug')) makeFPSMeter();
  lazyAssets();
}

function enableFallback(){
  import('./utils.js').then(m=> m.enableFallbackUI());
}

function startLoop(){
  function loop(){ requestAnimationFrame(loop); animate(); updateParticles(); }
  loop();
}

function setupPointer(){
  window.addEventListener('pointermove', throttle(e=> handlePointer(e.clientX, e.clientY), 32));
  window.addEventListener('scroll', throttle(()=>{ const vy = Math.min(Math.abs(window.scrollY - (window.lastScrollY||0)), 200); window.lastScrollY=window.scrollY; threeCtx.camera.rotation.z = vy*0.0005; }, 100));
}

function setupParticles(){
  particleCanvas = document.createElement('canvas');
  particleCanvas.className='particle-field';
  document.body.appendChild(particleCanvas);
  const ctx = particleCanvas.getContext('2d');
  const count = prefersReducedData()? 40 : 120;
  for(let i=0;i<count;i++){ particles.push({ x:Math.random()*window.innerWidth, y:Math.random()*window.innerHeight, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, r:1+Math.random()*2 }); }
  function draw(){ ctx.clearRect(0,0,particleCanvas.width,particleCanvas.height); particles.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(120,200,255,0.5)'; ctx.fill(); }); }
  function resize(){ particleCanvas.width=window.innerWidth; particleCanvas.height=window.innerHeight; }
  window.addEventListener('resize', resize); resize();
  window.addEventListener('pointermove', e=>{ particles.forEach(p=> { const dx=p.x-e.clientX, dy=p.y-e.clientY, d=Math.sqrt(dx*dx+dy*dy); if(d<120){ p.vx += (dx/d)*0.02; p.vy += (dy/d)*0.02; } }); });
  function physics(){ particles.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.vx*=0.99; p.vy*=0.99; if(p.x<0||p.x>window.innerWidth) p.vx*=-1; if(p.y<0||p.y>window.innerHeight) p.vy*=-1; }); }
  updateParticles = function(){ physics(); draw(); };
}

let updateParticles = ()=>{};

function lazyAssets(){
  requestIdleCallback(()=>{
    // Placeholder for secondary assets loading
    console.log('Idle: load secondary assets');
  });
}

window.addEventListener('DOMContentLoaded', init);
