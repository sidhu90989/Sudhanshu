// Utility & feature detection helpers
export function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) { return false; }
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function prefersReducedData() {
  return navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType === '2g');
}

export function smoothScrollTo(target) {
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

export function enableFallbackUI() {
  const fallback = document.getElementById('hero-fallback');
  if (fallback) fallback.hidden = false;
  document.getElementById('three-canvas')?.remove();
  console.warn('[Fallback] WebGL disabled or failed. Showing static hero.');
}

export function focusTrap(modalEl) {
  const focusable = modalEl.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  function keyHandler(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    } else if (e.key === 'Escape') { modalEl.dispatchEvent(new CustomEvent('close')); }
  }
  modalEl.addEventListener('keydown', keyHandler);
}

export function createLoadingOverlay() {
  const el = document.createElement('div');
  el.className = 'loading-overlay';
  el.innerHTML = '<div class="loader"><div class="shimmer"></div><span class="progress">0%</span></div>';
  document.body.appendChild(el);
  return {
    setProgress(p) { el.querySelector('.progress').textContent = Math.round(p) + '%'; if (p >= 100) el.classList.add('done'); },
    remove() { el.classList.add('fade'); setTimeout(()=>el.remove(),600); }
  };
}

export function throttle(fn, wait=100) {
  let last=0; return function(...args){ const now=Date.now(); if(now-last>wait){ last=now; fn.apply(this,args); }};
}

export function makeFPSMeter() {
  let last = performance.now(), frames=0, fps=0;
  const el = document.createElement('div');
  el.className='fps-meter';
  document.body.appendChild(el);
  function loop() { frames++; const now=performance.now(); if(now-last>=1000){ fps=frames; frames=0; last=now; el.textContent=fps+' FPS'; } requestAnimationFrame(loop); }
  loop();
  return el;
}

export function loadScriptOnce(src) {
  return new Promise((res, rej)=>{ if(document.querySelector(`script[src="${src}"]`)) return res(); const s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s); });
}
