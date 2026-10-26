document.addEventListener('DOMContentLoaded',()=>{
 const button=document.querySelector('.mobile-menu-btn');const nav=document.querySelector('.main-nav');
 if(button&&nav){button.addEventListener('click',()=>{const isOpen=nav.classList.toggle('open');button.setAttribute('aria-expanded',String(isOpen));button.setAttribute('aria-label',isOpen?'Chiudi il menu':'Apri il menu');});}
 document.querySelectorAll('.submenu-toggle').forEach(toggle=>{toggle.addEventListener('click',()=>{const item=toggle.closest('.nav-group');let open=item.classList.toggle('submenu-open');toggle.setAttribute('aria-expanded',String(open));});});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav?.classList.remove('open');button?.setAttribute('aria-expanded','false');document.querySelectorAll('.nav-group.submenu-open').forEach(e=>e.classList.remove('submenu-open'));}});
});
