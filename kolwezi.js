(function(){
var Y=[2009,2014,2019,2021],R=[48.86,51.60,68.38,76.32],MAX=80;
var T=['Exposed rock, the class the authors read as mining-related, covered about 48.9 km2, 13.9% of the study area.',
'About 51.6 km2, up 2.7 km2 since 2009. Vegetation still dominated the area.',
'About 68.4 km2 (19.4% of the area), up 32.5% in five years. The authors note this coincided with the price of cobalt tripling between 2015 and 2018.',
'About 76.3 km2, 56% more than in 2009 (up 27.5 km2). By now, the authors report, vegetation no longer dominated the area.'];
/* Edit these credits to match the imagery you add to images/ (see README). */
var FR={0:{alt:'Satellite image of Kolwezi in May 2009: open pits with dark ponds and a pale tailings dam west of the town, the pinkish town area to the east, a river to the north, and grassland all around',credit:'Landsat 5, 22 May 2009. False color: vegetation is green, bare ground and mines pink to brown, water dark. The frame is about 32 km wide. Data available from the U.S. Geological Survey.'},
1:{alt:'Satellite image of Kolwezi in June 2014: the same area with the bare, pale ground around the pits visibly wider than in 2009',credit:'Landsat 8, 21 June 2014. False color: vegetation is green, bare ground and mines pink to brown, water dark. The frame is about 32 km wide. Data available from the U.S. Geological Survey.'},
2:{alt:'Satellite image of Kolwezi in June 2019: the same area with bare ground spread further across the mining zone and new ponds beside the tailings dam',credit:'Landsat 8, 3 June 2019. False color: vegetation is green, bare ground and mines pink to brown, water dark. The frame is about 32 km wide. Data available from the U.S. Geological Survey.'},
3:{alt:'Satellite image of Kolwezi in July 2021: the same area with the largest extent of bare, pale ground around the pits and the tailings dam',credit:'Landsat 8, 10 July 2021. False color: vegetation is green, bare ground and mines pink to brown, water dark. The frame is about 32 km wide. Data available from the U.S. Geological Survey.'}};
var bars=document.getElementById('bars'),txt=document.getElementById('yrtext'),rng=document.getElementById('yr'),fig=document.getElementById('sat-fig'),img=document.getElementById('sat-img'),cap=document.getElementById('sat-cap');
if(!bars)return;
bars.innerHTML=Y.map(function(y,i){return '<div class="brow" data-i="'+i+'" style="display:grid;grid-template-columns:3.2rem 1fr 5.5rem;gap:.7rem;align-items:center;margin:.35rem 0;font-family:system-ui,sans-serif;font-size:.9rem"><span>'+y+'</span><span style="background:#13294a;border-radius:3px;height:.9rem"><span class="bar" style="display:block;height:100%;width:'+(R[i]/MAX*100)+'%;background:#4a86ff;border-radius:3px"></span></span><span>'+R[i].toFixed(1)+' km2</span></div>'}).join('');
var ok={};
Y.forEach(function(y,i){var im=new Image();im.onload=function(){ok[i]=true;if(+rng.value===i)show(i)};im.src='images/kolwezi-'+y+'.jpg'});
function show(i){
 txt.textContent=T[i];rng.value=i;rng.setAttribute('aria-valuetext',String(Y[i]));
 document.querySelectorAll('#yearpick button').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.y===i)});
 document.querySelectorAll('.brow').forEach(function(r){var on=+r.dataset.i===i;r.style.opacity=on?1:.55;r.querySelector('.bar').style.background=on?'#e08a4b':'#4a86ff'});
 if(ok[i]){img.src='images/kolwezi-'+Y[i]+'.jpg';img.alt=FR[i].alt;cap.textContent=FR[i].credit;fig.hidden=false}else{fig.hidden=true}
}
document.querySelectorAll('#yearpick button').forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.y)})});
rng.addEventListener('input',function(){show(+rng.value)});
show(0);
})();
