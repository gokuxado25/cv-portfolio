<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Dihenrry Barbaran | Sistemas y Redes</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Barlow:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);
 --bg:#020408;--fg:#e6edf3;--muted:#93a4b3;--accent:#22c55e;--line:#3b4b59;
 --head:"Barlow Condensed","Arial Narrow",sans-serif;--ui:"Barlow",system-ui,sans-serif}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#020408;--fg:#e6edf3}}
:root[data-theme="dark"]{--bg:#020408;--fg:#e6edf3}
*,*::before,*::after{box-sizing:inherit}
html,body{height:100%;margin:0;background:var(--bg);color:var(--fg);font-family:var(--ui);overflow:hidden}
html{scroll-padding-top:env(safe-area-inset-top,0px)}
canvas{position:fixed;inset:0;width:100%;height:100%;display:block}
button{font:inherit;cursor:pointer;transition: transform 0.2s, box-shadow 0.2s, background 0.2s}
button:hover {transform: translateY(-2px); box-shadow: 0 4px 20px rgba(34, 197, 94, 0.4); background: rgba(34, 197, 94, 0.1);}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
.btn{border:1px solid #22c55e;background:rgba(10, 15, 20, 0.8);color:#22c55e;padding:12px 28px;border-radius:4px;font-weight:600;font-size:16px; letter-spacing: 2px; text-transform: uppercase; backdrop-filter: blur(4px);}
.btn.ghost{background:rgba(5,8,12,.5);color:var(--muted);border-color:var(--line); font-size: 14px; letter-spacing: 1px;}
#start{position:fixed;left:50%;bottom:calc(15vh + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:4}
#hint{position:fixed;left:0;right:0;top:calc(10vh + env(safe-area-inset-top,0px));text-align:center;font:500 clamp(18px,3vw,26px) var(--ui);color: #a3b8cc; padding:0 20px;z-index:3;text-shadow:0 4px 20px #000; letter-spacing: 1px;}
#skip{position:fixed;right:16px;top:calc(12px + env(safe-area-inset-top,0px));z-index:5;padding:6px 14px;display:none}
#cap{position:fixed;left:0;right:0;bottom:calc(8vh + env(safe-area-inset-bottom,0px));text-align:center;font:500 clamp(22px,3.5vw,32px)/1.2 var(--head);padding:0 24px;z-index:3;opacity:0;transition:opacity .5s;text-shadow:0 4px 15px rgba(0,0,0,1); color: #22c55e; letter-spacing: 0.5px;}
#cap.on{opacity:1}
#term{position:fixed;left:50%;top:calc(9vh + env(safe-area-inset-top,0px));transform:translateX(-50%);width:min(640px,92vw);background:rgba(5, 10, 15,.85);backdrop-filter:blur(10px);border:1px solid rgba(34,197,94,.4);border-radius:4px;padding:12px 16px;z-index:3;font:13px/1.6 ui-monospace,Menlo,monospace;color:#22c55e;opacity:0;transition:opacity .6s;box-shadow:0 0 40px rgba(34,197,94,.15);pointer-events:none}
#term .bar{display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(34,197,94,.2);padding-bottom:8px;margin-bottom:8px}
#term i{width:10px;height:10px;border-radius:50%}
#term span{color:#8b99a6;font-size:11px;margin-left:6px; letter-spacing: 1px;}
#log{height:9em;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end; text-shadow: 0 0 5px rgba(34,197,94,0.5);}
#final{position:fixed;inset:0;z-index:6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;padding:24px;text-align:center;background:rgba(2,4,8,.92);opacity:0;pointer-events:none;transition:opacity 1.5s ease-in-out; backdrop-filter: blur(8px);}
#final.on{opacity:1;pointer-events:auto}
#final h1{font:300 clamp(24px,4.5vw,48px)/1.3 var(--ui);max-width:26ch;margin:0; color: #fff;}
#final h1 strong {color: #22c55e; font-weight: 600; text-shadow: 0 0 20px rgba(34, 197, 94, 0.3);}
#final p{color:#a3b8cc;max-width:50ch;margin:0;font-size:19px; line-height: 1.6;}
</style>
</head>
<body>
<canvas id="c"></canvas>
<div id="term" aria-hidden="true"><div class="bar"><i style="background:#ef4444"></i><i style="background:#eab308"></i><i style="background:#22c55e"></i><span>COM3 - PuTTY (9600 baud)</span></div><div id="log"></div></div>
<div id="hint">SISTEMA EN ESPERA. INICIA EL PROTOCOLO DE ARRANQUE.</div>
<button id="start" class="btn" type="button">[ Iniciar Sistema ]</button>
<button id="skip" class="btn ghost" type="button">Omitir intro</button>
<div id="cap" aria-live="polite"></div>
<section id="final">
  <h1>Todo lo que acabas de ver arrancar <br><strong>—enrutamiento de datos, servidores, firewalls y monitorización—</strong><br> no se gestiona solo.</h1>
  <p>Soy Dihenrry Barbaran Cotrina, técnico superior en sistemas de telecomunicaciones e informáticos, y ahí es donde entro yo.</p>
  <button class="btn" id="enterApp" type="button">[ ENTRAR AL PORTAFOLIO ]</button>
</section>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
const $=s=>document.querySelector(s), V=(x,y,z)=>new THREE.Vector3(x,y,z);
const Y0=-30, YN=-60, END=41;
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas:$('#c'),antialias:true, alpha:false})}catch(e){$('#start').style.display='none';$('#hint').style.display='none';$('#final').classList.add('on')}
if(renderer){
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x020408);
scene.fog=new THREE.FogExp2(0x020408,0.035);

const cam=new THREE.PerspectiveCamera(45,1,.05,400);
function resize(){renderer.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',resize);resize();

scene.add(new THREE.AmbientLight(0x1a2b3c,.7));
const key=new THREE.SpotLight(0xcceeff, 1.8, 60, 0.5, 0.5, 1);
key.position.set(8, 15, 15);
key.castShadow = true;
scene.add(key);

const gc=document.createElement('canvas');gc.width=gc.height=128;{const g=gc.getContext('2d'),r=g.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,'#fff');r.addColorStop(.2,'rgba(255,255,255,.6)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,128,128)}
const glowTex=new THREE.CanvasTexture(gc);
function glow(color,size,op=1){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,color,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:op}));s.scale.set(size,size,1);return s}

const std=(c,r=.3,m=.8)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
function box(w,h,d,mat,x=0,y=0,z=0,parent=scene){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function label(txt,x,y,z){const c=document.createElement('canvas');c.width=256;c.height=64;const g=c.getContext('2d');g.font='600 30px sans-serif';g.fillStyle='#a3b8cc';g.textAlign='center';g.fillText(txt,128,42);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false}));s.scale.set(7,1.75,1);s.position.set(x,y,z);scene.add(s)}

const dark=std(0x0a0c10,.4,.9);
const fc=document.createElement('canvas');fc.width=2400;fc.height=300;
{const g=fc.getContext('2d'),X=u=>(u+4)*300,Y=v=>(.5-v)*300;
 const gr=g.createLinearGradient(0,0,0,300);gr.addColorStop(0,'#2a2f35');gr.addColorStop(.45,'#1a1d21');gr.addColorStop(1,'#0f1115');g.fillStyle=gr;g.fillRect(0,0,2400,300);
 for(let i=0;i<3000;i++){g.fillStyle='rgba(255,255,255,'+Math.random()*.02+')';g.fillRect(Math.random()*2400,Math.random()*300,5+Math.random()*50,1)}
 g.fillStyle='rgba(0,0,0,.8)';g.fillRect(0,295,2400,5);
 for(const q of[-1,1]){g.fillStyle='#1c1f24';g.fillRect(q<0?0:X(3.6),0,120,300);for(const y of[-.28,.28]){g.fillStyle='#020202';g.fillRect(X(q*3.8)-14,Y(y)-30,28,60)}}
 g.textAlign='left';g.fillStyle='#e6edf3';g.font='bold 32px sans-serif';g.fillText('DIHENRRY_INFRA',X(-3.5),Y(.3));
 g.fillStyle='#22c55e';g.font='22px sans-serif';g.fillText('CATALYST CORE',X(-3.5),Y(.15));
 g.fillStyle='#6b7280';g.font='18px sans-serif';g.fillText('SYST',X(-3.32),Y(-.2)+7);
 const port=(cx,cy,w)=>{
    g.fillStyle='#050608';g.fillRect(cx-w/2,cy-w/2,w,w);
    g.strokeStyle='#2a3540';g.lineWidth=4;g.strokeRect(cx-w/2,cy-w/2,w,w);
    const sh=g.createLinearGradient(0,cy-w/2,0,cy+w/2);sh.addColorStop(0,'rgba(0,0,0,1)');sh.addColorStop(1,'rgba(20,20,25,.2)');
    g.fillStyle=sh;g.fillRect(cx-w/2+4,cy-w/2+4,w-8,w-8);
    g.fillStyle='#111820';g.fillRect(cx-w*.2,cy-w/2,w*.4,w*.25);
    g.fillStyle='#d9a036';for(let k=0;k<8;k++)g.fillRect(cx-w*.36+k*w*.1,cy+w*.18,4,w*.25)};
 g.textAlign='center';g.fillStyle='#22c55e';g.font='bold 16px sans-serif';g.fillText('CONSOLE',X(-2.05),Y(.28));port(X(-2.05),Y(0),84);
 for(let i=0;i<12;i++){const cx=X(-1.35+i*.32);port(cx,Y(.13),78);port(cx,Y(-.13),78);g.fillStyle='#4b5563';g.font='16px sans-serif';g.fillText(i+1,cx,Y(.39));g.fillText(i+13,cx,Y(-.43)+10)}
}
const faceTex=new THREE.CanvasTexture(fc);faceTex.anisotropy=16;
scene.add(new THREE.Mesh(new THREE.BoxGeometry(8,1,3),[dark,dark,std(0x1a1d21,.4,.7),dark,new THREE.MeshStandardMaterial({map:faceTex,roughness:.3,metalness:.6}),dark]));
const postMat=std(0x11151a, .5, .8);
for(const q of[-1,1])box(.4,12,3.4,postMat,q*4.4,0,0);
[1.15,2.3,-1.15,-2.3].forEach(y=>{box(8,.95,3,dark,0,y,0);for(let k=0;k<3;k++)box(.05,.05,.02,new THREE.MeshBasicMaterial({color:k?0x2fe39c:0x2a3540}),-3.5+k*.2,y,1.52)});

const leds=[];
function mkLed(x,y,sz=.05){const l=new THREE.Mesh(new THREE.BoxGeometry(sz,sz,.02),new THREE.MeshBasicMaterial({color:0x111820}));l.position.set(x,y,1.51);scene.add(l);const g=glow(0xffb238,.4,0);g.position.set(x,y,1.58);scene.add(g);return{l,g}}
function setLed(o,col){o.l.material.color.set(col);o.g.material.color.set(col);o.g.material.opacity=col===0x111820?0:1.2}
const sys=mkLed(-3.42,-.2,.06);
for(let r=0;r<2;r++)for(let i=0;i<12;i++){const o=mkLed(-1.35+i*.32-.1,(r?-.13:.13)+.16);o.n=r*12+i;leds.push(o)}

const term=$('#term'),logEl=$('#log');let tcount=-1;
const tcues=[[.9,'[ BIOS ] Iniciando secuencia POST... OK'],[1.8,'[ BIOS ] Verificando interfaces físicas...'],[3.5,'Cisco IOS Software, C2960X Software'],[4.1,'Cargando memoria flash... OK'],[4.6,'Inicializando VLANs y STP... OK'],[5.0,'Levantando interfaces GigabitEthernet... DONE'],[5.6,'[ RED ] Enrutando paquete: PC → Switch → Firewall → Servidor'],[7.6,'[ OK ] Conexión de red segura establecida.']];

const pcb=new THREE.Group();pcb.position.y=Y0;scene.add(pcb);
box(32,.4,21,std(0x062b1d,.5,.3),0,-.2,0,pcb);
const pl=new THREE.PointLight(0x88ccff, 2, 40);pl.position.set(0,6,2);pcb.add(pl);
box(5,.7,5,std(0x1a1d21,.4,.8),0,.35,0,pcb); 
for(let i=0;i<13;i++)box(4.6,1.1,.2,std(0x4a5568,.3,.9),0,1.2,-2.2+i*.37,pcb); 
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
for(let i=0;i<60;i++){const x=(rnd()-.5)*28,z=(rnd()-.5)*18;if(Math.abs(x)<4||z>1.5&&Math.abs(x)<10)continue;
 const w=.6+rnd()*1.8,d=.6+rnd()*1.6;box(w,.2+rnd()*.4,d,std(0x0a0c10,.4,.7),x,.2,z,pcb)} 
const traceMat=new THREE.MeshBasicMaterial({color:0x10b981}),paths=[];
function seg(a,b,w=.08){box(Math.abs(a.x-b.x)+w,.03,Math.abs(a.z-b.z)+w,traceMat,(a.x+b.x)/2,.03,(a.z+b.z)/2,pcb)}
function trace(pts){for(let i=1;i<pts.length;i++)seg(pts[i-1],pts[i]);const L=[0];for(let i=1;i<pts.length;i++)L.push(L[i-1]+pts[i].distanceTo(pts[i-1]));paths.push({pts,L,len:L[L.length-1]})}
for(let i=0;i<12;i++){const ax=(i-5.5)*.4,px=(i-5.5)*1.6,zk=4+(i%6)*.75;trace([V(ax,.04,2.5),V(ax,.04,zk),V(px,.04,zk),V(px,.04,9.6)])}
for(let i=0;i<8;i++){const ax=(i-3.5)*.55;trace([V(ax,.04,-2.5),V(ax,.04,-9)])}
const pulses=paths.flatMap((p,i)=>[0,.5].map(o=>{const s=glow(0x22c55e,.6);pcb.add(s);return{s,p,o:o+i*.13,v:.15+(i%4)*.02,rev:i%2}}));
function pAt(p,s){const d=s*p.len;let i=1;while(i<p.L.length-1&&p.L[i]<d)i++;return p.pts[i-1].clone().lerp(p.pts[i],(d-p.L[i-1])/(p.L[i]-p.L[i-1]))}

const net=new THREE.Group();net.position.y=YN;scene.add(net);
const grid=new THREE.GridHelper(120,60,0x0f172a,0x020617);net.add(grid);
const nl=new THREE.PointLight(0xaaddff,2.5,60);nl.position.set(0,15,5);net.add(nl);
const NX=[-24,-12,0,12,24],names=['PC Cliente','Switch Core','Router BGP','Firewall ASA','Servidor Web'];
const specs=[[3,5,4,0x1e293b,0x22c55e],[5,1.2,3,0x334155,0x22c55e],[4,.9,3,0x334155,0x0ea5e9],[4,1.8,3,0x1e293b,0xf97316],[3.5,8,4,0x0f172a,0x22c55e]]; 
specs.forEach(([w,h,d,c,led],i)=>{const g=new THREE.Group();g.position.set(NX[i],h/2,0);net.add(g);
 box(w,h,d,std(c,.4,.8),0,0,0,g); 
 const n=i===4?6:i===0?1:5;
 for(let k=0;k<n;k++){
   const y=i===4?-3+k*1.2:0,x=i===4?0:-w/2+.5+k*(w-1)/Math.max(n-1,1);
   const m=new THREE.Mesh(new THREE.BoxGeometry(i===4?2.4:.16,.12,.02),new THREE.MeshBasicMaterial({color:led}));
   m.position.set(i===0?0:x,i===0?1.5:y,d/2+.01);g.add(m);
   if(i===4 || i===3){ 
      const gl = glow(led, 0.8); gl.position.set(0, y, d/2+0.1); g.add(gl);
   }
 }
 label(names[i],NX[i],h+2.2,0);
});
for(let i=0;i<4;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,12,8),std(0x0ea5e9,.3,.6));c.rotation.z=Math.PI/2;c.position.set((NX[i]+NX[i+1])/2,.35,1.6);net.add(c)}
const pkt=glow(0xf97316, 3.5);const pktCore=new THREE.Mesh(new THREE.SphereGeometry(.25,16,16),new THREE.MeshBasicMaterial({color:0xffffff}));
const pk=new THREE.Group();pk.add(pkt,pktCore);pk.position.set(-24,.4,1.6);net.add(pk);

const es=u=>u*u*(3-2*u), curve=a=>new THREE.CatmullRomCurve3(a.map(p=>V(...p)));
let phases=[];
function build(){
  phases=[
   {a:0,b:7,p:curve([[14,5,20],[6,2.5,12],[0,1,8],[-1.3,.15,2.5]]),l:curve([[0,0,0],[-.5,0,0],[-1,0,1.5],[-1.3,0,1.5]])},
   {a:7,b:10,p:curve([[-1.3,.15,2.5],[-1.3,.15,0.5],[0,Y0+5,12],[3,3+Y0,17]]),l:curve([[-1.3,0,1.5],[-1.3,.15,-10],[0,Y0,0],[1.5,1.7+Y0,12]])},
   {a:10,b:22,p:curve([[3,3+Y0,17],[0,1.5+Y0,6],[-4,5+Y0,8],[0,8+Y0,12],[0,20+YN,15],[0,10+YN,15]]),l:curve([[1.5,1.7+Y0,12],[0,.8+Y0,0],[0,0+Y0,0],[0,0+Y0,0],[0,0+YN,0],[0,0+YN,0]])}
  ];
}
const caps=[
  [.3,'Energizando equipo de red. Verificando voltajes básicos.'],
  [3.4,'Cargando firmware y archivos de configuración Cisco IOS.'],
  [5.2,'Configurando VLANs y definiendo el árbol STP.'],
  [7.2,'Acceso concedido. Entrando a la estructura interna.'],
  [10.6,'Los pulsos eléctricos viajan por las pistas de cobre.'],
  [14.5,'El procesador ASIC conmuta los paquetes a velocidad luz.'],
  [18.5,'Saliendo de la placa hacia la red distribuida externa.'],
  [22.4,'Petición HTTP iniciada por el PC Cliente.'],
  [31.5,'El Servidor procesa la respuesta y la envía de vuelta.']
];
const hopsOut=[
  [0,'El paquete TCP/IP inicia en el PC del usuario.'],
  [1,'El Switch Core aísla y etiqueta la VLAN correcta.'],
  [2,'El Router BGP define la ruta más rápida hacia el destino.'],
  [3,'El Firewall Perimetral inspecciona y autoriza la conexión.'],
  [4,'El Servidor Físico recibe la solicitud web.']
];

let capTxt='',started=false,t0=0,skipT=0,cp=V(0,0,0),cl=V(0,0,0),last=performance.now(),ended=false;
function setCap(s){if(s===capTxt)return;capTxt=s;cap.classList.remove('on');setTimeout(()=>{if(capTxt===s){cap.textContent=s;cap.classList.add('on')}},250)}

function frame(now){
  requestAnimationFrame(frame);
  const dt=Math.min((now-last)/1000,.1);last=now;const time=now/1000;
  let t=started?(now-t0)/1000+skipT:-1;
  
  if(t<0){cam.position.set(13+Math.sin(time*.2)*2,4+Math.sin(time*.3)*.5,18);cam.lookAt(0,0,0);renderer.render(scene,cam);return}
  if(t>=END&&!ended){ended=true;$('#final').classList.add('on');cap.classList.remove('on')}
  
  const OFF=0x111820,AM=0xeab308,GR=0x22c55e,bl=r=>Math.sin(time*r)>0;
  setLed(sys,t<.3?OFF:t<.9?AM:t<3.2?(bl(9)?AM:OFF):t<5.6?(bl(9)?GR:OFF):GR);
  leds.forEach(o=>{let c=OFF;
    if(t>=1.8&&t<2.6)c=AM;else if(t>=2.6&&t<3.2)c=GR;
    else if(t>=5.2&&t<7.6){if(o.n===Math.floor((t-5.2)/.1))c=GR}
    else if(t>=7.6)c=(o.n===0||o.n===23)?(bl(9)?GR:OFF):o.n===11?GR:OFF;
    setLed(o,c)});
    
  term.style.opacity=(t>.2&&t<8.2)?1:0;
  const tn=tcues.filter(x=>t>=x[0]).length;if(tn!==tcount){tcount=tn;logEl.innerHTML=tcues.slice(0,tn).map(x=>'<div>'+x[1]+'</div>').join('')}
  
  let pos,look;
  const ph=phases.find(p=>t>=p.a&&t<p.b);
  if(ph){const u=es((t-ph.a)/(ph.b-ph.a));pos=ph.p.getPoint(u);look=ph.l.getPoint(u);cp.copy(pos);cl.copy(look)}
  else if(t>=22&&t<END){
    const out=Math.min(Math.max((t-22)/9.5,0),1);
    const back=Math.min(Math.max((t-31.5)/9.5,0),1);
    const x=t<31.5?-24+48*es(out):24-48*es(back);
    pk.position.x=x;
    pkt.material.color.set(t<31.5?0xf97316:0x22c55e);
    const dir=t<31.5?1:-1;
    const tp=V(x-dir*10,YN+5,13), tl=V(x+dir*6,YN+.6,0);
    if(t<22.2){cp.copy(tp);cl.copy(tl)}
    const k=1-Math.exp(-dt*3);cp.lerp(tp,k);cl.lerp(tl,k);pos=cp;look=cl;
    if(t<31.5){
        const h=hopsOut.find(h=>Math.abs(x-NX[h[0]])<3.5);
        if(h) setCap(h[1]);
    } else if (t >= 31.5 && t < END - 1) {
        setCap('La respuesta de los paquetes vuelve por el mismo camino.');
    }
  }else{pos=V(Math.sin(time*.12)*12,YN+6,16);look=V(0,YN+2,0);cp.copy(pos)}
  
  const sh=reduce?0:.018;
  cam.position.set(pos.x+Math.sin(time*1.2)*sh*8,pos.y+Math.sin(time*1.9)*sh*6,pos.z+Math.cos(time*1.5)*sh*6);cam.lookAt(look);
  if(t<22||t>=40){let c='';for(const x of caps)if(t>=x[0])c=x[1];if(t>=40||t<22)setCap(c)}
  pulses.forEach(q=>{let s=(time*q.v+q.o)%1;if(q.rev)s=1-s;q.s.position.copy(pAt(q.p,s))});
  renderer.render(scene,cam);
}

function begin(){build();started=true;t0=performance.now();skipT=0;ended=false;$('#final').classList.remove('on');$('#hint').style.display='none';$('#start').style.display='none';$('#skip').style.display='block'}
$('#start').onclick=begin;
$('#skip').onclick=()=>{skipT=END-(performance.now()-t0)/1000+.01};

// ESTE ES EL CÓDIGO QUE CONECTA EL 3D CON REACT
$('#enterApp').onclick=()=>{
  window.parent.postMessage('intro_done', '*');
};

requestAnimationFrame(frame);
}
</script>
</body>
</html>
