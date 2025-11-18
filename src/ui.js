/* DOM interactions, navigation, modals, contact form stub, resume generation */
import { smoothScrollTo, focusTrap, loadScriptOnce } from './utils.js';
import { modalAnimation } from './animations.js';

const projectsData = [
  { id:1, title:'3D Portfolio Engine', desc:'Custom WebGL engine for portfolio scenes.', stack:['Three.js','GSAP'], repo:'#', model:'/assets/models/project-3d-01.glb' },
  { id:2, title:'Interactive Resume', desc:'Generates PDF from dynamic components.', stack:['JavaScript','CSS'], repo:'#', model:'/assets/models/project-3d-02.glb' },
  { id:3, title:'Neon Particle Lab', desc:'Physics-driven particle experiments.', stack:['WebGL','Shaders'], repo:'#', model:'/assets/models/project-3d-03.glb' }
];

export function initUI(){
  document.getElementById('year').textContent = new Date().getFullYear();
  setupNav();
  renderProjects();
  setupContactForm();
  setupDegreeBadge();
  setupInspectToggle();
  setupCVDownload();
}

function setupNav(){
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('nav-menu');
  toggle.addEventListener('click', ()=>{
    const active = menu.dataset.active === 'true';
    menu.dataset.active = (!active).toString();
    toggle.setAttribute('aria-expanded', (!active).toString());
  });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click', e=>{ e.preventDefault(); smoothScrollTo(a.getAttribute('href')); }));
}

function renderProjects(){
  const track = document.getElementById('projects-track');
  if(!track) return;
  
  projectsData.forEach((p, i)=>{
    const card = document.createElement('article');
    card.className='project-card';
    card.tabIndex=0;
    card.innerHTML = `
      <div>
        <span style="font-size:0.85rem; color:var(--accent3); letter-spacing:2px;">PROJECT ${String(i+1).padStart(2,'0')}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div style="margin-top:1rem;">
          ${p.stack.map(s=>`<span style="display:inline-block; padding:0.4rem 0.8rem; background:rgba(255,255,255,0.08); border-radius:6px; font-size:0.8rem; margin:0.3rem 0.3rem 0 0;">${s}</span>`).join('')}
        </div>
      </div>
      <button class="btn ghost" data-id="${p.id}" aria-haspopup="dialog" data-magnetic>View Project</button>
    `;
    card.querySelector('button').addEventListener('click', ()=> openProjectModal(p));
    card.addEventListener('keydown', e=>{ if(e.key==='Enter') openProjectModal(p); });
    track.appendChild(card);
  });
}

function openProjectModal(project){
  const root = document.getElementById('modal-root');
  const modal = document.createElement('div');
  modal.className='modal';
  modal.role='dialog';
  modal.ariaLabel = project.title;
  modal.innerHTML = `<div class="modal__inner"><h3>${project.title}</h3><p>${project.desc}</p><p><strong>Stack:</strong> ${project.stack.join(', ')}</p><a href="${project.repo}" target="_blank" rel="noopener" class="btn primary">Repo</a><button class="btn ghost" data-close>Close</button></div>`;
  root.appendChild(modal);
  modalAnimation(modal);
  const closeBtn = modal.querySelector('[data-close]');
  function close(){ modal.classList.add('closing'); setTimeout(()=>modal.remove(),300); }
  closeBtn.addEventListener('click', close);
  modal.addEventListener('close', close);
  focusTrap(modal);
  closeBtn.focus();
  document.addEventListener('keydown', function esc(e){ if(e.key==='Escape'){ close(); document.removeEventListener('keydown', esc); }});
}

function setupContactForm(){
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Form submission stub. Configure Netlify/Formspree.');
  });
}

function setupDegreeBadge(){
  const badge = document.querySelector('.degree-badge');
  badge.addEventListener('mouseenter', ()=> badge.classList.add('flip'));
  badge.addEventListener('mouseleave', ()=> badge.classList.remove('flip'));
  badge.addEventListener('keydown', e=>{ if(e.key==='Enter') badge.classList.toggle('flip'); });
}

let inspectMode=false; let overlay;
function setupInspectToggle(){
  function toggle(){ inspectMode=!inspectMode; document.querySelector('[data-action="toggle-inspect"]').setAttribute('aria-pressed', inspectMode.toString()); if(inspectMode){ overlay=document.createElement('div'); overlay.className='inspect-overlay'; overlay.textContent='Inspect Mode ON'; document.body.appendChild(overlay); } else { overlay?.remove(); } }
  document.querySelector('[data-action="toggle-inspect"]').addEventListener('click', toggle);
  window.addEventListener('keydown', e=>{ if(e.key==='I') toggle(); });
}

function setupCVDownload(){
  const btn = document.querySelector('[data-action="download-cv"]');
  btn.addEventListener('click', async ()=>{
    // Light client-side PDF generation fallback
    try {
      await loadScriptOnce('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js');
      // eslint-disable-next-line no-undef
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text('Sudhanshu Suryawanshi - Resume (Placeholder)', 10, 10);
      doc.text('Replace this content in ui.js setupCVDownload()', 10, 20);
      doc.save('Sudhanshu_Suryawanshi_Resume.pdf');
    } catch(err){
      console.warn('PDF generation failed, falling back to print', err);
      window.print();
    }
  });
}
