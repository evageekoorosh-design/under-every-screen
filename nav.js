(function(){
var L={top:'Start',engines:'Three drivers',backpack:'Phone backpack',cobalt:'Cobalt map',reserves:'Cobalt map',quotas:'Cobalt map',copperbelt:'Copperbelt','kolwezi-land':'Kolwezi from above',kivus:'The Kivus',people:'The people',act:'What you can do',method:'How we check facts'};
var here=document.getElementById('here'),bar=document.getElementById('progress'),btn=document.getElementById('menu-btn'),menu=document.getElementById('menu');
if(!here||!btn)return;
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&L[e.target.id])here.textContent=L[e.target.id]})},{rootMargin:'-45% 0px -45% 0px'});
document.querySelectorAll('section[id]').forEach(function(s){io.observe(s)});
var tick=false;function prog(){tick=false;var h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?Math.min(100,scrollY/h*100):0)+'%'}
addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(prog)}},{passive:true});prog();
function set(o){btn.setAttribute('aria-expanded',o);menu.hidden=!o}
btn.addEventListener('click',function(e){e.stopPropagation();set(menu.hidden)});
menu.addEventListener('click',function(e){if(e.target.tagName==='A')set(false)});
document.addEventListener('click',function(e){if(!menu.hidden&&!menu.contains(e.target))set(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){set(false);btn.focus()}});
})();
