import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//scene
const scene = new THREE.Scene()

//camera
const camera= new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000)

//renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
//controls
const controls = new OrbitControls(camera,renderer.domElement)
camera.position.set(-90,140,140)
controls.update()
//sun
const sunGeometry = new THREE.SphereGeometry(30,64,64)
const sunMaterial = new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('images/sun.jpg')})
const sun = new THREE.Mesh(sunGeometry,sunMaterial)

scene.add(sun)
//light
const light = new THREE.PointLight(0xffffff,300000,1100)
scene.add(light)
//Planet builder
function planetMaker(size,image,distance,Ring){
  const obj = new THREE.Object3D()
  const Geometry = new THREE.SphereGeometry(size,64,64)
  const Material = new THREE.MeshStandardMaterial({map:new THREE.TextureLoader().load(image)})
  const planet = new THREE.Mesh(Geometry,Material)
  planet.position.set(distance,10,10)
  obj.add(planet)
  scene.add(obj)
  if(Ring){
    const ringGeometry = new THREE.RingGeometry(Ring.innerRadius,Ring.outerRadius)
    const ringMaterial = new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(Ring.texture), side:THREE.DoubleSide})
    const ring = new THREE.Mesh(ringGeometry,ringMaterial)
   ring.rotateX(1.4)
    planet.add(ring)
  }
  return {obj, planet}

}
const mercury = planetMaker(5,'images/mercury.jpg',50)
const venus = planetMaker(8,'images/venus.jpg',100)
const earth = planetMaker(12,'images/earth.jpg',180)
const mars = planetMaker(11,'images/mars.jpg',250)
const jupiter = planetMaker(23,'images/jupiter.jpg',360)
const saturn = planetMaker(20,'images/saturn.jpg',470,{
  innerRadius:30,
  outerRadius:50,
  texture:'images/saturn ring.png'
})
const uranus = planetMaker(8,'images/uranus.jpg',580)
const neptune = planetMaker(8,'images/neptune.jpg',690)
//add stars
function addStar(){
  const Geometry = new THREE.SphereGeometry(0.5,64,64)
  const Material= new THREE.MeshBasicMaterial(0xffffff)
  const star = new THREE.Mesh(Geometry,Material)

  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(1000))
  star.position.set(x,y,z)
  scene.add(star)
}
Array(200).fill().forEach(addStar)

//animate function
function animate(){
  //rotate around sun
  mercury.obj.rotation.y+=0.005
  venus.obj.rotation.y+=0.004
  earth.obj.rotation.y+=0.003
  mars.obj.rotation.y+=0.0035
  jupiter.obj.rotation.y+=0.001
  saturn.obj.rotation.y+=0.0008
  uranus.obj.rotation.y+=0.0006
  neptune.obj.rotation.y+=0.0004
  sun.rotation.y+=0.003

  //rotate planet
  mercury.planet.rotation.y+=0.01
  venus.planet.rotation.y+=0.01
  earth.planet.rotation.y+=0.01
  mars.planet.rotation.y+=0.01
  jupiter.planet.rotation.y+=0.01
  saturn.planet.rotation.y+=0.01
  uranus.planet.rotation.y+=0.01
  neptune.planet.rotation.y+=0.01
  renderer.render(scene,camera)
}
renderer.setAnimationLoop(animate)