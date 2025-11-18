/* GSAP animations & timeline setup */
import { gsap } from 'gsap';

export function introTimeline(){
  const tl = gsap.timeline({ defaults:{ ease:'power2.out', duration:0.8 } });
  tl.from('#hero-heading', { y:40, opacity:0 })
    .from('#tagline', { y:20, opacity:0 }, '-=0.4')
    .from('.hero__cta .btn', { scale:0.6, opacity:0, stagger:0.1 }, '-=0.3');
  return tl;
}

export function sectionReveal(selector){
  gsap.from(selector+' .gradient-text', { scrollTrigger:{ trigger:selector, start:'top 80%' }, y:30, opacity:0, duration:0.7 });
}

export function projectsEnter(models){
  gsap.from(models, { y:50, opacity:0, stagger:0.15, duration:0.9, ease:'power3.out' });
}

export function modalAnimation(modal){
  gsap.fromTo(modal, { scale:0.9, opacity:0 }, { scale:1, opacity:1, duration:0.35, ease:'power2.out' });
}

export function typeTagline(){
  const el = document.querySelector('[data-typewriter]');
  if(!el) return;
  const text = el.textContent.trim();
  el.textContent = '';
  let i=0; function step(){ if(i<=text.length){ el.textContent = text.slice(0,i); i++; setTimeout(step, 18); } }
  step();
}
