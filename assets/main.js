function toggleMenu(){
  const nav = document.querySelector('nav.main-nav');
  const btn = document.querySelector('.menu-toggle');
  const isOpen = nav.classList.toggle('open');
  btn.textContent = isOpen ? '✕' : '☰';
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

document.addEventListener('DOMContentLoaded', function(){
  const nav = document.querySelector('nav.main-nav');
  const btn = document.querySelector('.menu-toggle');
  if(nav){
    nav.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){
        nav.classList.remove('open');
        if(btn) btn.textContent = '☰';
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && nav.classList.contains('open')){
        nav.classList.remove('open');
        if(btn) btn.textContent = '☰';
        document.body.style.overflow = '';
      }
    });
  }

  // scroll-reveal animation for elements with class "reveal"
  const revealEls = document.querySelectorAll('.reveal');
  if(revealEls.length && 'IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add('in-view'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el=> io.observe(el));
  } else {
    revealEls.forEach(el=> el.classList.add('in-view'));
  }

  initMascot();
});

/* ---------- Mascot: 3 cute robot designs x 7 behaviors, cycling randomly ---------- */
function botSVG(accent, eye){
  return `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="122" rx="20" ry="5" fill="#000" opacity="0.12"/>
    <g class="leg-l"><rect x="35" y="92" width="12" height="26" rx="6" fill="#FFFFFF" stroke="#E4E1F5" stroke-width="2"/></g>
    <g class="leg-r"><rect x="53" y="92" width="12" height="26" rx="6" fill="#FFFFFF" stroke="#E4E1F5" stroke-width="2"/></g>
    <rect x="26" y="50" width="48" height="46" rx="16" fill="#FFFFFF" stroke="#E4E1F5" stroke-width="2"/>
    <circle cx="50" cy="72" r="6" fill="${accent}"/>
    <g class="arm-l"><rect x="10" y="54" width="14" height="10" rx="5" fill="${accent}"/></g>
    <g class="arm-r"><rect x="76" y="54" width="14" height="10" rx="5" fill="${accent}"/></g>
    <rect x="22" y="8" width="56" height="46" rx="20" fill="#FFFFFF" stroke="#E4E1F5" stroke-width="2"/>
    <circle class="eye" cx="38" cy="30" r="6" fill="${eye}"/>
    <circle class="eye" cx="62" cy="30" r="6" fill="${eye}"/>
    <path d="M42 40 Q50 46 58 40" stroke="${accent}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="16" cy="20" r="5" fill="${accent}"/>
    <circle cx="84" cy="20" r="5" fill="${accent}"/>
    <text class="zzz" x="80" y="12">Z</text>
  </svg>`;
}
const BOT_VARIANTS = [
  botSVG('#7B5CFA', '#7B5CFA'),
  botSVG('#8FD400', '#12121C'),
  botSVG('#7B5CFA', '#C6FF3D'),
];
const ACTS = [
  { cls: 'act-peek-right', extra: 'waving curious', duration: 5000 },
  { cls: 'act-peek-left', extra: 'waving curious', duration: 5000 },
  { cls: 'act-peek-bottom', extra: 'waving curious', duration: 5000 },
  { cls: 'act-fall-run', extra: 'walking', duration: 4600 },
  { cls: 'act-sleep', extra: 'sleeping', duration: 6000 },
  { cls: 'act-sit', extra: 'blinking', duration: 6000 },
  { cls: 'act-duo', extra: 'waving curious blinking', duration: 5500, duo:true },
];
function initMascot(){
  if(document.querySelector('.mascot-stage')) return;
  const stage = document.createElement('div');
  stage.className = 'mascot-stage';
  document.body.appendChild(stage);

  function playAct(){
    stage.innerHTML = '';
    const act = ACTS[Math.floor(Math.random()*ACTS.length)];
    const variant = BOT_VARIANTS[Math.floor(Math.random()*BOT_VARIANTS.length)];
    const bot = document.createElement('div');
    bot.className = 'mascot-bot blinking ' + act.cls + ' ' + act.extra;
    bot.innerHTML = variant;
    stage.appendChild(bot);
    if(act.duo){
      const bot2 = document.createElement('div');
      bot2.className = 'mascot-bot blinking act-duo-2 ' + act.extra;
      bot2.innerHTML = BOT_VARIANTS[(BOT_VARIANTS.indexOf(variant)+1) % BOT_VARIANTS.length];
      stage.appendChild(bot2);
    }
    setTimeout(()=>{ stage.innerHTML = ''; }, act.duration + 200);
  }
  setTimeout(playAct, 2200);
  setInterval(playAct, 13000);
}
