import { AxesHelper, Points, BufferGeometry, Float32BufferAttribute, PointsMaterial, PerspectiveCamera, Scene, WebGLRenderer,  MathUtils, TextureLoader } from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import './style.css'

const textureLoader = new TextureLoader()
const circleTexture = textureLoader.load('/public/cercle.png')
const scene = new Scene()
const count = 100
const distance = 2;

scene.add(new AxesHelper())

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);

const points = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)
for(let i = 0; i < points.length; i++){
  points[i] = MathUtils.randFloatSpread(distance * 2)
  colors[i] = Math.random() * 0.5 + 0.5

}

const geometry = new BufferGeometry(1, 1, 1);
geometry.setAttribute('position', new Float32BufferAttribute(points, 3))
geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
const pointMaterial = new PointsMaterial({
  size: 0.1,
  vertexColors: true,
  map: circleTexture,
  alphaTest: 0.01,
  transparent: true
})

const pointsObject = new Points(geometry, pointMaterial)

scene.add(pointsObject)

const renderer = new WebGLRenderer({
  antialias : true,
  alpha : true
})
renderer.setClearColor(0x000000, 0)
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