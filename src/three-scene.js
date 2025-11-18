/* Three.js scene setup, loaders, postprocessing, interactions */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

let renderer, scene, camera, composer, raycaster;
let heroModel;
const interactiveObjects = [];

export const state = { ready:false, hover:null };

export function initThree(canvas) {
  renderer = new THREE.WebGLRenderer({ canvas, antialias:false, alpha:true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
  camera.position.set(0,1.2,3.5);

  raycaster = new THREE.Raycaster();
  addLights();
  addEnvironment();
  setupPostProcessing();
  window.addEventListener('resize', onResize);
  return { renderer, scene, camera };
}

function addLights(){
  scene.add(new THREE.AmbientLight(0x404040, 1.2));
  const dir = new THREE.DirectionalLight(0xffffff, 1);
  dir.position.set(5,10,7); scene.add(dir);
  const rim1 = new THREE.PointLight(0x6699ff, 2, 15); rim1.position.set(-4,2,-2); scene.add(rim1);
  const rim2 = new THREE.PointLight(0xaa66ff, 2, 15); rim2.position.set(4,2,2); scene.add(rim2);
}

function addEnvironment(){
  // Placeholder environment – user should replace HDR
  const texLoader = new THREE.TextureLoader();
  texLoader.load('/assets/hdr/studio.hdr', () => { /* Convert if real HDR via RGBELoader */ });
  scene.background = null; // transparent for overlay effect
}

function setupPostProcessing(){
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const fxaa = new ShaderPass(FXAAShader);
  fxaa.material.uniforms['resolution'].value.set(1/window.innerWidth,1/window.innerHeight);
  composer.addPass(fxaa);
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.75, 0.4, 0.85);
  composer.addPass(bloom);
}

export function loadHeroModel(onProgress){
  return new Promise((resolve,reject)=>{
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(draco);
    loader.load('/assets/models/hero-scene.glb', (gltf)=>{
      heroModel = gltf.scene;
      heroModel.traverse(obj=>{ if(obj.isMesh){ obj.castShadow=true; obj.receiveShadow=true; interactiveObjects.push(obj); }});
      heroModel.position.set(0,0,0);
      scene.add(heroModel);
      state.ready=true;
      resolve(heroModel);
    }, (e)=>{ onProgress?.(e.loaded/e.total*100); }, (err)=>{ console.warn('[GLTF] Hero model failed', err); reject(err); });
  });
}

export function loadProjectModels(paths, store){
  const loader = new GLTFLoader();
  const promises = paths.map(p=> new Promise((resolve)=>{
    loader.load(p, gltf=>{ const root=gltf.scene; root.scale.set(0.6,0.6,0.6); store.push(root); resolve(root); }, undefined, ()=>{ resolve(null); });
  }));
  return Promise.all(promises);
}

export function animate(){
  if(heroModel){ heroModel.rotation.y += 0.002; }
  composer.render();
}

function onResize(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  if(composer){ composer.setSize(window.innerWidth, window.innerHeight); }
}

export function handlePointer(x,y){
  if(!camera) return;
  const nx = (x / window.innerWidth) * 2 - 1;
  const ny = -(y / window.innerHeight) * 2 + 1;
  camera.position.x = nx * 0.5;
  camera.position.y = 1.2 + ny * 0.3;
  camera.lookAt(0,0,0);
  raycaster.setFromCamera({x:nx,y:ny}, camera);
  const inter = raycaster.intersectObjects(interactiveObjects, true)[0];
  if(inter){ state.hover = inter.object; inter.object.material.emissive?.setHex(0x2244ff); }
}

export function zoomToObject(obj){
  if(!obj) return;
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  camera.position.set(center.x + size.x*1.5, center.y + size.y*1.2, center.z + size.z*1.8);
  camera.lookAt(center);
}
