(function(){
var W=window.WORLD,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var countries=topojson.feature(W,W.objects.countries).features,
    land=topojson.feature(W,W.objects.land),
    borders=topojson.mesh(W,W.objects.countries,function(a,b){return a!==b}),
    drc=countries.filter(function(c){return c.id==='180'})[0],
    idn=countries.filter(function(c){return c.id==='360'})[0];
var CAM={world:{c:[65,0],k:1},drc:{c:[23,-3],k:2.6},copper:{c:[25.5,-10.7],k:9},kivus:{c:[28.5,-2],k:9}};
var LAYERS={
 prod:[{ll:[23.6,-2.9],r:33,t:'DRC 230,000 t'},{ll:[118,-2],r:15,t:'Indonesia 44,000 t'}],
 reserves:[{ll:[23.6,-2.9],r:36,t:'DRC reserves 6 of 12 million t'}],
 none:[]};
var PINS=[{ll:[25.47,-10.71],t:'Kolwezi'},{ll:[28.9,-1.15],t:'Rubaya (approximate)'}];
var svg=d3.select('#map').append('svg'),w,h,R,proj=d3.geoOrthographic().clipAngle(90).precision(.5),path=d3.geoPath(proj);
var sea=svg.append('path').attr('class','sea'),lp=svg.append('path').attr('class','land'),
    bp=svg.append('path').attr('class','land').style('fill','none'),
    dp=svg.append('path').attr('class','drc'),ip=svg.append('path').attr('class','idn'),
    bg=svg.append('g'),pg=svg.append('g');
var cur={c:CAM.world.c.slice(),k:1},layer='none',showPins=false,raf;
function size(){w=innerWidth;h=innerHeight;R=Math.min(w,h)*.42;svg.attr('viewBox','0 0 '+w+' '+h)}
function draw(){
 var cx=w>800?w*.64:w/2,cy=w>800?h/2:h*.36;
 proj.rotate([-cur.c[0],-cur.c[1]]).scale(R*cur.k).translate([cx,cy]);
 sea.attr('d',path({type:'Sphere'}));lp.attr('d',path(land));bp.attr('d',path(borders));
 dp.attr('d',path(drc));ip.attr('d',path(idn));
 var center=[cur.c[0],cur.c[1]],items=(LAYERS[layer]||[]).map(function(d){return{d:d,kind:'b'}});
 if(showPins)PINS.forEach(function(p){items.push({d:p,kind:'p'})});
 var vis=items.filter(function(i){return d3.geoDistance(i.d.ll,center)<1.4&&(i.kind==='p'||cur.k<4)});
 var b=bg.selectAll('g').data(vis.filter(function(i){return i.kind==='b'}),function(i){return i.d.t});
 b.exit().remove();
 var be=b.enter().append('g');be.append('circle').attr('class','bub');be.append('text').attr('class','lbl').attr('text-anchor','middle');
 bg.selectAll('g').each(function(i){var p=proj(i.d.ll),g=d3.select(this);
  g.select('circle').attr('cx',p[0]).attr('cy',p[1]).attr('r',i.d.r);
  g.select('text').attr('x',p[0]).attr('y',p[1]+i.d.r+16).text(i.d.t)});
 var q=pg.selectAll('g').data(vis.filter(function(i){return i.kind==='p'}),function(i){return i.d.t});
 q.exit().remove();
 var qe=q.enter().append('g');qe.append('circle').attr('class','pin').attr('r',6);qe.append('text').attr('class','lbl');
 pg.selectAll('g').each(function(i){var p=proj(i.d.ll),g=d3.select(this);
  g.select('circle').attr('cx',p[0]).attr('cy',p[1]);g.select('text').attr('x',p[0]+12).attr('y',p[1]+4).text(i.d.t)});
}
function go(name){
 var t=CAM[name],a=d3.interpolate(cur.c,t.c),k=d3.interpolate(cur.k,t.k),t0=performance.now(),dur=reduce?0:1500;
 cancelAnimationFrame(raf);
 (function step(now){var u=dur?Math.min(1,(now-t0)/dur):1,e=d3.easeCubicInOut(u);
  cur={c:a(e),k:k(e)};draw();if(u<1)raf=requestAnimationFrame(step)})(t0);
}
size();draw();
if(!reduce){cur.c=[-40,10];cur.k=.9;go('world')}
addEventListener('resize',function(){size();draw()});
var chip=document.getElementById('chip');
var io=new IntersectionObserver(function(es){es.forEach(function(e){
 if(!e.isIntersecting)return;var s=e.target;
 layer=s.dataset.layer||'none';showPins=s.dataset.cam==='copper'||s.dataset.cam==='kivus'||s.dataset.cam==='drc';
 go(s.dataset.cam)})},{threshold:.55});
document.querySelectorAll('[data-cam]').forEach(function(s){io.observe(s)});
function openHash(){var el=location.hash&&document.querySelector(location.hash);if(el&&el.tagName==='DETAILS')el.open=true}
addEventListener('hashchange',openHash);openHash();
document.documentElement.classList.add('js');
})();
