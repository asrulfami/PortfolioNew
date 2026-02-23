const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const links = document.querySelectorAll('.nav-link');
const toTop = document.getElementById('toTop');
const yearEl = document.getElementById('year');
const headerEl = document.querySelector('.header');

if(yearEl){yearEl.textContent = new Date().getFullYear();}

if(navToggle){
  navToggle.addEventListener('click',()=>{nav.classList.toggle('open');});
}

links.forEach(l=>l.addEventListener('click',()=>{nav.classList.remove('open');}));

const sections = Array.from(document.querySelectorAll('section[id]'));
const byId = id => document.querySelector(`a[href="#${id}"]`);
const spy = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    const id = e.target.getAttribute('id');
    const a = byId(id);
    if(a){
      if(e.isIntersecting){a.classList.add('active');}
      else{a.classList.remove('active');}
    }
  });
},{threshold:.55});
sections.forEach(s=>spy.observe(s));

const animateEls = document.querySelectorAll('[data-animate]');
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
  });
},{threshold:.2});
animateEls.forEach(el=>io.observe(el));

const backTop = ()=>{
  if(window.scrollY>400){toTop.classList.add('show');}
  else{toTop.classList.remove('show');}
  if(headerEl){
    if(window.scrollY>10){headerEl.classList.add('scrolled');}
    else{headerEl.classList.remove('scrolled');}
  }
};
window.addEventListener('scroll',backTop);
toTop.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});});

document.querySelector('.form')?.addEventListener('submit',async e=>{
  e.preventDefault();
  const data = new FormData(e.target);
  const name = (data.get('name')||'').toString().trim();
  const email = (data.get('email')||'').toString().trim();
  const message = (data.get('message')||'').toString().trim();
  const metaKey = document.querySelector('meta[name=\"web3forms-key\"]')?.getAttribute('content')?.trim();
  if(metaKey){
    try{
      const payload={access_key:metaKey,name,email,message,subject:`Kontak Portofolio dari ${name}`};
      const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
      const json=await res.json();
      if(json.success){
        alert('Terima kasih! Pesan Anda sudah terkirim.');
        e.target.reset();
        return;
      }
    }catch(err){}
  }
  const to = 'asrulfami0912@gmail.com';
  const subject = encodeURIComponent(`Kontak Portofolio dari ${name}`);
  const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`);
  const url = `mailto:${to}?subject=${subject}&body=${body}`;
  window.location.href = url;
});

const i18n = {
  id: {
    navHome:'Beranda', navAbout:'Tentang', navEdu:'Pendidikan', navProjects:'Proyek', navContact:'Kontak',
    aboutTitle:'Tentang',
    aboutDesc:'Saya adalah seorang pengembang web yang berdedikasi untuk membangun antarmuka bersih, cepat, dan intuitif dengan mengintegrasikan keahlian pengembangan front-end dan back-end. Saya sangat mengutamakan performa, aksesibilitas, dan estetika minimalis dalam setiap proyek, serta memanfaatkan teknologi AI dan metodologi desain modern untuk menciptakan solusi digital yang efisien. Dengan pendekatan yang terstruktur dalam manajemen kode, infrastruktur jaringan, hingga dokumentasi teknis, saya berkomitmen untuk menghasilkan produk yang tidak hanya fungsional secara teknis, tetapi juga memberikan pengalaman pengguna yang bermakna.',
    educationTitle:'Pendidikan',
    eduSmkTitle:'SMK', eduSmkTime:'2019–2022', eduSmkDesc:'Saya bersekolah di SMK Telkom Sandhy Putra Jakarta, jurusan Teknik Jaringan Komputer. Lulus dengan rata‑rata 86,67.',
    eduUniTitle:'Universitas', eduUniTime:'2022–Sekarang', eduUniDesc:'Saya kuliah di Mercu Buana, jurusan Teknik Informatika. IPK saat ini 3,70.',
    projectsTitle:'Proyek Pilihan',
    contactTitle:'Kontak', contactDesc:'Ingin kolaborasi atau ada pertanyaan? Kirim pesan.',
    viewProjects:'Lihat Proyek', contactMe:'Hubungi Saya', submitBtn:'Kirim',
    heroSubtitle:'Pengembang full‑stack berfokus pada aplikasi web skalabel dan ML terapan. Berpengalaman membangun backend aman dengan Laravel, UI responsif dengan Tailwind CSS & Bootstrap, dan integrasi sistem pengenalan real‑time dengan Flask & MediaPipe.'
  },
  en: {
    navHome:'Home', navAbout:'About', navEdu:'Education', navProjects:'Projects', navContact:'Contact',
    aboutTitle:'About',
    aboutDesc:'I am a web developer dedicated to building clean, fast, and intuitive interfaces across front‑end and back‑end. I prioritize performance, accessibility, and minimalist aesthetics, leveraging AI and modern design methods to craft efficient digital solutions with structured code management, networking, and documentation.',
    educationTitle:'Education',
    eduSmkTitle:'High School', eduSmkTime:'2019–2022', eduSmkDesc:'I attended SMK Telkom Sandhy Putra Jakarta, majoring in Computer Network Engineering, and graduated with an average grade of 86.67.',
    eduUniTitle:'University', eduUniTime:'2022–Present', eduUniDesc:'I am attending Universitas Mercu Buana, majoring in Informatics Engineering. My current GPA is 3.70.',
    projectsTitle:'Featured Projects',
    contactTitle:'Contact', contactDesc:'Want to collaborate or have questions? Send a message.',
    viewProjects:'View Projects', contactMe:'Contact Me', submitBtn:'Send',
    heroSubtitle:'Full‑stack developer focused on scalable web applications and applied machine learning. Experienced in secure backends with Laravel, responsive UIs with Tailwind CSS & Bootstrap, and real‑time recognition systems using Flask & MediaPipe.'
  }
};

function applyLang(lang){
  const map=i18n[lang]||i18n.id;
  const ids=Object.keys(map);
  ids.forEach(k=>{
    const el=document.getElementById(k);
    if(el){el.textContent=map[k];}
  });
  localStorage.setItem('lang',lang);
  const btnID=document.getElementById('langID');
  const btnEN=document.getElementById('langEN');
  if(btnID&&btnEN){
    btnID.classList.toggle('active',lang==='id');
    btnEN.classList.toggle('active',lang==='en');
  }
  if(typeof renderProjects==='function'){renderProjects();}
}

document.getElementById('langID')?.addEventListener('click',()=>applyLang('id'));
document.getElementById('langEN')?.addEventListener('click',()=>applyLang('en'));
document.addEventListener('DOMContentLoaded',()=>{applyLang(localStorage.getItem('lang')||'id');});
const projects = [
  {
    title:' Finova Dashboard',
    meta:'Tangerang • Fullstack Developer • Jun 2026 – Present',
    summary:{
      id:'Membangun dashboard manajemen keuangan berbasis Next.js dan React dengan visualisasi data interaktif untuk insight transaksi real‑time. Menyusun sistem pelaporan transaksi yang akurat, UI responsif dengan Tailwind CSS, serta optimasi performa & SEO melalui fitur server‑side Next.js agar loading awal lebih cepat.',
      en:'Built a financial management dashboard with Next.js and React, delivering interactive data visualizations for real‑time transaction insights. Implemented accurate reporting, a responsive UI with Tailwind CSS, and performance & SEO optimizations using Next.js server‑side features.'
    },
    tech:['Next.js','React','Tailwind CSS'],
    slug:'finova-dashboard',
    link:'',
    image:'images/Project/Finova-Dashboard.png'
  },
  {
    title:'FinansialKU',
    meta:'Jakarta • Fullstack Developer • Dec 2025 – Present',
    summary:{
      id:'Mengembangkan aplikasi server‑side dengan Laravel menggunakan autentikasi aman dan arsitektur MVC. Menerapkan RBAC dua tingkat untuk admin dan pengguna, UI responsif berbasis Tailwind CSS, ekspor otomatis PDF/Excel, serta skema MySQL kompleks via migrasi untuk menjaga integritas data.',
      en:'Developing a scalable server‑side application with Laravel using secure authentication and MVC. Implemented two‑level RBAC, a responsive UI with Tailwind CSS, automated PDF/Excel export, and complex MySQL schemas via migrations to ensure data integrity.'
    },
    tech:['Laravel','Tailwind CSS','MySQL'],
    slug:'finansialku',
    link:'',
    image:'images/Project/Finansialku.png'
  },
  {
    title:'SIBI Sign Language Translator',
    meta:'Jakarta • Fullstack & ML • Sep 2025 – Present',
    summary:{
      id:'Membangun sistem pengenalan alfabet SIBI (A–Z) real‑time dengan Flask, model Random Forest (6.900 sampel, akurasi 98,62%), dan MediaPipe Hands (21 landmark). Memperkuat robustness melalui preprocessing & augmentasi, serta validasi metrik Precision, Recall, dan F1‑Score.',
      en:'Built real‑time SIBI alphabet recognition (A–Z) with Flask, a Random Forest model (6,900 samples, 98.62% accuracy), and MediaPipe Hands (21 landmarks). Strengthened robustness via preprocessing & augmentation and validated with Precision, Recall, and F1‑Score.'
    },
    tech:['Flask','MediaPipe','Random Forest'],
    slug:'sibi',
    link:'',
    image:'images/Project/Sibi.png'
  },
  {
    title:'PT. Winnicode Garuda Teknologi',
    meta:'Jakarta • Front‑end Developer • May 2025 – Sep 2025',
    summary:{
      id:'Mengembangkan modul manajemen keuangan berfokus visualisasi data dan desain berpusat pada pengguna. Menerapkan Tailwind CSS, chart interaktif dan SVG, mencapai 80% kepuasan pengguna serta optimasi rendering untuk waktu muat yang lebih cepat.',
      en:'Developed a finance module focused on data visualization and user‑centric design. Used Tailwind CSS, interactive charts, and SVG; achieved 80% user satisfaction and optimized rendering for faster loads.'
    },
    tech:['Tailwind CSS','SVG','UX'],
    slug:'winnicode',
    link:''
  },
];

function createChip(text){
  const s=document.createElement('span');
  s.className='chip';
  s.textContent=text;
  return s;
}

function renderProjects(){
  const host=document.getElementById('projects-list');
  if(!host) return;
  host.innerHTML='';
  host.classList.remove('cards');
  host.classList.add('projects-slider');
  const track=document.createElement('div');
  track.className='slider-track';
  const perSlide=6;
  for(let i=0;i<projects.length;i+=perSlide){
    const slide=document.createElement('div');
    slide.className='slide';
    const grid=document.createElement('div');
    grid.className='slide-grid';
    projects.slice(i,i+perSlide).forEach(p=>{
      const article=document.createElement('article');
      article.className='card project';
      const media=document.createElement('div');
      media.className='card-media';
      const img=document.createElement('img');
      img.loading='lazy';
      img.alt=p.title;
      img.src= p.image || `images/projects/${p.slug}.jpg`;
      img.onerror=()=>{img.remove();};
      img.style.cursor='zoom-in';
      img.addEventListener('click',()=>openModal(img.src,p.title));
      media.appendChild(img);
      const body=document.createElement('div');
      body.className='card-body';
      const h3=document.createElement('h3');h3.textContent=p.title;
      const meta=document.createElement('div');meta.className='meta';meta.textContent=p.meta;
    const par=document.createElement('p');
    const lang=localStorage.getItem('lang')||'id';
    const sum=typeof p.summary==='object'?(p.summary[lang]||p.summary.id||p.summary.en):p.summary;
    par.textContent=sum;
      const techs=document.createElement('div');techs.className='techs';
      p.tech.forEach(t=>techs.appendChild(createChip(t)));
      body.appendChild(h3);
      body.appendChild(meta);
      body.appendChild(par);
      body.appendChild(techs);
      if(p.link && p.link.trim()){
        const a=document.createElement('a');
        a.href=p.link;
        a.className='btn btn-small';
        a.textContent=(localStorage.getItem('lang')==='en'?'View':'Lihat');
        a.target='_blank';
        body.appendChild(a);
      }
      article.appendChild(media);
      article.appendChild(body);
      grid.appendChild(article);
    });
    slide.appendChild(grid);
    track.appendChild(slide);
  }
  host.appendChild(track);
  const nav=document.createElement('div');
  nav.className='slider-nav';
  const prev=document.createElement('button');prev.className='slider-btn';prev.textContent='‹';
  const next=document.createElement('button');next.className='slider-btn';next.textContent='›';
  const dots=document.createElement('div');dots.className='slider-dots';
  nav.appendChild(prev);nav.appendChild(dots);nav.appendChild(next);
  host.appendChild(nav);
  let current=0;
  const total=Math.ceil(projects.length/perSlide);
  for(let d=0;d<total;d++){const dot=document.createElement('div');dot.className='slider-dot'+(d===0?' active':'');dots.appendChild(dot);}
  function update(){track.style.transform=`translateX(-${current*100}%)`;dots.querySelectorAll('.slider-dot').forEach((el,idx)=>{el.classList.toggle('active',idx===current);});}
  prev.addEventListener('click',()=>{current=(current-1+total)%total;update();});
  next.addEventListener('click',()=>{current=(current+1)%total;update();});
  update();
}

document.addEventListener('DOMContentLoaded',renderProjects);

function ensureModal(){
  let m=document.getElementById('imgModal');
  if(m) return m;
  m=document.createElement('div');
  m.id='imgModal';
  m.className='modal';
  const content=document.createElement('div');
  content.className='modal-content';
  const close=document.createElement('button');close.className='modal-close';close.textContent='✕';
  const img=document.createElement('img');
  content.appendChild(img);
  m.appendChild(content);
  m.appendChild(close);
  document.body.appendChild(m);
  m.addEventListener('click',e=>{if(e.target===m) m.classList.remove('open');});
  close.addEventListener('click',()=>m.classList.remove('open'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape') m.classList.remove('open');});
  return m;
}

function openModal(src,alt){
  const m=ensureModal();
  const img=m.querySelector('img');
  img.src=src;
  img.alt=alt||'';
  m.classList.add('open');
}
