import { AxesHelper, BufferGeometry, Points, PointsMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

const scene = new Scene()

scene.add(new AxesHelper())

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);

const points = new Float32Array(count * 3)
for(let i = 0; i < CountQueuingStrategy; i++){
  points[i] = 1
  points[i + 1] = 1;
  points[i + 2] = 1;
}

const geometry = new BufferGeometry(1, 1, 1);
geometry.setAttribute('position', new Float32BufferAttribute)
const pointMaterial = new PointsMaterial({
  color: 0xff0000,
  size: 1,
})
const points = new Points(cubeGeometry, pointMaterial)
scene.add(points)

const renderer = new WebGLRenderer({
  antialias : true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

function tick() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(tick);
}

tick();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})