(function(){
var n=document.getElementById('n'),o=document.getElementById('out');if(!n||!o)return;
function L(x,d){return x.toLocaleString(undefined,{maximumFractionDigits:d||0})}
function g(v){return v>=1e6?L(v/1e6,1)+' tonnes':v>=1000?L(v/1000,1)+' kg':L(v)+' g'}
function k(v){return v>=1000?L(v/1000)+' tonnes':L(v)+' kg'}
function upd(){var v=Math.max(0,Math.min(1e9,Math.floor(+n.value||0)));
 o.textContent=L(v)+' phones hold roughly '+g(v*10)+' to '+g(v*20)+' of cobalt, and over their lifetimes were responsible for roughly '+k(v*29)+' to '+k(v*95)+' of CO2e.'}
n.addEventListener('input',upd);
document.querySelectorAll('.zoom:not(.pick) button').forEach(function(b){b.addEventListener('click',function(){n.value=b.dataset.n;upd()})});
upd();
var P={ip:['iPhone 18 Pro (256GB)','63 kg of CO2e','About 73%, by our reading of Apple\'s chart (46 of 63 kg)','Not found','Apple says 100% recycled','sources.html#de-33'],
gs:['Galaxy S26 Ultra','47.8 kg of CO2e','89.2%','10 g or more, per Samsung\'s UK product page','Samsung says 100% recycled','sources.html#de-13'],
px:['Pixel 11 Pro (256GB)','80 kg of CO2e','85%','Not found in this report (Google gave 10 to 20 g for the Pixel 10a)','Google says 100% recycled, and that recycled cobalt and lithium together are at least 27% of the battery cell weight','sources.html#de-34'],
fp:['Fairphone','About 37 to 42 kg for the Fairphone 5; 29 kg for the Gen 6','About 75% (Fairphone)','About 10 g (Fairphone 3, 2021)','99% fairly sourced from the DRC (Fairphone 3)','sources.html#de-07']};
var F=['Lifetime carbon footprint','Share from production','Cobalt in the battery','Cobalt sourcing claim'];
function show(k){var d=P[k];document.getElementById('phone-name').textContent=d[0];
 document.getElementById('card').innerHTML=F.map(function(f,i){return '<dt>'+f+'</dt><dd>'+d[i+1]+'</dd>'}).join('')+'<dt>Sources</dt><dd><a href="'+d[5]+'">Where this comes from</a></dd>';
 document.querySelectorAll('#phonepick button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.p===k)})}
document.querySelectorAll('#phonepick button').forEach(function(b){b.addEventListener('click',function(){show(b.dataset.p)})});
show('ip');
var tk=document.getElementById('ticker'),ts=document.getElementById('tickerSub'),rate=40,t0=Date.now(),calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
function tick(){var n=Math.floor(rate*(Date.now()-t0)/1000);tk.textContent=L(n)+' new phones';ts.textContent='holding roughly '+g(n*10)+' to '+g(n*20)+' of cobalt'}
document.querySelectorAll('#ratepick button').forEach(function(b){b.addEventListener('click',function(){rate=+b.dataset.r;t0=Date.now();
 document.querySelectorAll('#ratepick button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});tick()})});
tick();setInterval(tick,calm?1000:100)})();
