import * as THREE from 'three';
const canvas=document.querySelector('#cinema-canvas');
if(canvas && !matchMedia('(prefers-reduced-motion: reduce)').matches){
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,.1,100);
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);camera.position.z=7;
 const group=new THREE.Group();scene.add(group);
 const geo=new THREE.PlaneGeometry(1.25,.78);
 const mats=[0xc4a05d,0x8d211d,0xe9dfce].map(c=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.18,side:THREE.DoubleSide,wireframe:true}));
 for(let i=0;i<15;i++){const m=new THREE.Mesh(geo,mats[i%3]);const a=i/15*Math.PI*2;m.position.set(Math.cos(a)*3.7,Math.sin(a)*2.2,(i%5)*-.45);m.rotation.set(a*.2,a*.35,a);group.add(m)}
 const pts=[];for(let i=0;i<180;i++)pts.push((Math.random()-.5)*12,(Math.random()-.5)*8,(Math.random()-.5)*7);
 const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(pts,3));
 const stars=new THREE.Points(pg,new THREE.PointsMaterial({color:0xd5b16b,size:.018,transparent:true,opacity:.5}));scene.add(stars);
 let mx=0,my=0;addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5)});
 const clock=new THREE.Clock();function tick(){const t=clock.getElapsedTime();group.rotation.z=t*.025;group.rotation.y=mx*.12;group.rotation.x=-my*.08;stars.rotation.y=t*.008;renderer.render(scene,camera);requestAnimationFrame(tick)}tick();
 addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
}