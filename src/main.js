/* Entry point: bootstrap scene, UI, animations, smooth scroll */
import { hasWebGL, prefersReducedMotion, prefersReducedData, createLoadingOverlay, throttle, makeFPSMeter } from './utils.js';
import { initThree, loadHeroModel, animate, handlePointer } from './three-scene.js';
import { introTimeline, initScrollAnimations } from './animations.js';
import { initUI } from './ui.js';

let threeCtx, loading, lenis;
let particles=[]; let particleCanvas;

function init(){
  initUI();
  initSmoothScroll();
  initCustomCursor();
  initMagneticButtons();
  
  if(!hasWebGL() || prefersReducedMotion()) { enableFallback(); return; }
  const canvas = document.getElementById('three-canvas');
  threeCtx = initThree(canvas);
  loading = createLoadingOverlay();
  loadHeroModel(p=> loading.setProgress(p)).then(()=>{ loading.setProgress(100); setTimeout(()=>loading.remove(),800); startLoop(); });
  setupPointer();
  setupParticles();
  introTimeline();
  initScrollAnimations();
  if(location.search.includes('debug')) makeFPSMeter();
  lazyAssets();
}

function initSmoothScroll(){
  // Lenis smooth scroll (imported via CDN fallback if package fails)
  if(window.innerWidth > 768){
    try {
      // Simple smooth scroll polyfill
      document.querySelectorAll('a[href^="#"]').forEach(a=>{
        a.addEventListener('click', e=>{
          e.preventDefault();
          const target = document.querySelector(a.getAttribute('href'));
          if(target) target.scrollIntoView({ behavior:'smooth', block:'start' });
        });
      });
    } catch(e){ console.warn('Smooth scroll init failed', e); }
  }
}

function initCustomCursor(){
  if(window.innerWidth <= 768) return;
  const cursor = document.getElementById('custom-cursor');
  const dot = cursor.querySelector('.cursor-dot');
  const outline = cursor.querySelector('.cursor-outline');
  
  let mouseX=0, mouseY=0;
  let dotX=0, dotY=0;
  let outlineX=0, outlineY=0;
  
  window.addEventListener('mousemove', e=>{ mouseX=e.clientX; mouseY=e.clientY; });
  
  function animateCursor(){
    dotX += (mouseX - dotX) * 0.9;
    dotY += (mouseY - dotY) * 0.9;
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    
    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

function initMagneticButtons(){
  if(window.innerWidth <= 768) return;
  document.querySelectorAll('[data-magnetic]').forEach(el=>{
    el.addEventListener('mouseenter', function(){
      this.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1)';
    });
    
    el.addEventListener('mousemove', function(e){
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      this.style.transform = `translate(${x*0.3}px, ${y*0.3}px)`;
    });
    
    el.addEventListener('mouseleave', function(){
      this.style.transform = 'translate(0, 0)';
    });
  });
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
