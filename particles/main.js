import { AxesHelper, BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

const scene = new Scene()

scene.add(new AxesHelper())

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);

const cube = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshNormalMaterial()
);
scene.add(cube)

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