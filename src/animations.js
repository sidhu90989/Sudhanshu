/* GSAP animations & timeline setup */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function introTimeline(){
  const tl = gsap.timeline({ defaults:{ ease:'power3.out', duration:1.2 } });
  
  // Animate hero title lines
  tl.from('.hero__title .line', {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1.4,
    ease: 'power4.out'
  })
  .from('.hero__label', { opacity:0, y:20, duration:0.8 }, '-=1.2')
  .from('.hero__subtitle', { opacity:0, y:20, duration:0.8 }, '-=0.8')
  .from('.hero__cta', { opacity:0, y:20, duration:0.8 }, '-=0.6')
  .from('.scroll-indicator', { opacity:0, duration:0.8 }, '-=0.4');
  
  return tl;
}

export function initScrollAnimations(){
  // Check if ScrollTrigger is available (load from CDN if needed)
  if(!gsap.registerPlugin) return;
  
  // Animate sections on scroll
  gsap.utils.toArray('.fade-in').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  });
  
  // Reveal line by line
  gsap.utils.toArray('.line-reveal').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out'
    });
  });
  
  // Parallax sections
  gsap.utils.toArray('[data-scroll-speed]').forEach(el => {
    const speed = parseFloat(el.dataset.scrollSpeed) || 1;
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      y: (i, target) => -(target.offsetHeight * (speed - 1) * 0.5),
      ease: 'none'
    });
  });
  
  // Horizontal scroll for projects
  const projectsTrack = document.getElementById('projects-track');
  if(projectsTrack && window.innerWidth > 768){
    const scrollWidth = projectsTrack.scrollWidth - window.innerWidth;
    gsap.to(projectsTrack, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: '.projects-section',
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });
  }
}

export function sectionReveal(selector){
  gsap.from(selector+' .section-title', { scrollTrigger:{ trigger:selector, start:'top 80%' }, y:30, opacity:0, duration:0.7 });
}

export function projectsEnter(models){
  gsap.from(models, { y:50, opacity:0, stagger:0.15, duration:0.9, ease:'power3.out' });
}

export function modalAnimation(modal){
  gsap.fromTo(modal, { scale:0.9, opacity:0 }, { scale:1, opacity:1, duration:0.35, ease:'power2.out' });
}
