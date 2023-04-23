import './src/styles/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
*/
let distance = 15
let angle = 0
let speed = 0.001

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

/**
 * Texture
*/
const textureLoader = new THREE.TextureLoader()

const bgTexture = textureLoader.load('./assets/textures/background.jpg')
const sunTexture = textureLoader.load('./assets/textures/sun.jpg')
const mercuryTexture = textureLoader.load('./assets/textures/mercury.jpg')
const venusTexture = textureLoader.load('./assets/textures/venus.jpg')
const earthTexture = textureLoader.load('./assets/textures/earth.jpg')
const marsTexture = textureLoader.load('./assets/textures/mars.jpg')
const jupiterTexture = textureLoader.load('./assets/textures/jupiter.jpg')
const saturnTexture = textureLoader.load('./assets/textures/saturn.jpg')
const uranusTexture = textureLoader.load('./assets/textures/uranus.jpg')
const neptuneTexture = textureLoader.load('./assets/textures/neptune.jpg')

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = bgTexture

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 50
scene.add(camera)

/**
 * Object
 */

// Sun
const sunGeometry = new THREE.SphereGeometry( 10, 64, 32 )
const sunMaterial = new THREE.MeshStandardMaterial( { map: sunTexture } )
const sun = new THREE.Mesh( sunGeometry, sunMaterial )
scene.add( sun )

// Mercury
let mercuryDistance = distance
let mercuryAngle = angle
let mercurySpeed = speed

const mercuryGeometry = new THREE.SphereGeometry(1, 64, 32)
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture })
const mercury = new THREE.Mesh( mercuryGeometry, mercuryMaterial )

// Mercury Position
mercury.position.x = mercuryDistance

scene.add(mercury)

// Venus
let venusDistance = distance * 1.4
let venusAngle = angle * 1.5
let venusSpeed = speed * 0.5

const venusGeometry = new THREE.SphereGeometry(2, 64, 32)
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture })
const venus = new THREE.Mesh( venusGeometry, venusMaterial )

// Venus Position
venus.position.x = venusDistance

scene.add(venus)

// Earth
let earthDistance = distance * 2
let earthAngle = angle * 2
let earthSpeed = speed * 0.5

const earthGeometry = new THREE.SphereGeometry(3, 64, 32)
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture })
const earth = new THREE.Mesh( earthGeometry, earthMaterial )

// Earth Position
earth.position.x = earthDistance

scene.add(earth)

// Mars
let marsDistance = distance * 2.5
let marsAngle = angle * 2.5
let marsSpeed = speed * 0.2

const marsGeometry = new THREE.SphereGeometry(1.8, 64, 32)
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture })
const mars = new THREE.Mesh( marsGeometry, marsMaterial )

// Mars Position
mars.position.x = marsDistance

scene.add(mars)

// Jupiter
let jupiterDistance = distance * 3.2
let jupiterAngle = angle * 1.1
let jupiterSpeed = speed * 0.01

const jupiterGeometry = new THREE.SphereGeometry(3.5, 64, 32)
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture })
const jupiter = new THREE.Mesh( jupiterGeometry, jupiterMaterial )

// Jupiter Position
jupiter.position.x = jupiterDistance

scene.add(jupiter)

// saturn
let saturnDistance = distance * 4.5
let saturnAngle = angle * 0.5
let saturnSpeed = speed * 0.07

const saturnPlanetGeometry = new THREE.SphereGeometry(5, 64, 32)
const saturnPlanetMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture })
const saturnPlanet = new THREE.Mesh( saturnPlanetGeometry, saturnPlanetMaterial )

const saturnRingGeometry = new THREE.TorusGeometry(8, 1, 10, 100)
const saturnRingMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture })
const saturnRing = new THREE.Mesh( saturnRingGeometry, saturnRingMaterial )

const saturn = new THREE.Object3D();
saturn.add( saturnPlanet );
saturn.add( saturnRing );

// saturn Position
saturnRing.lookAt(saturnPlanet.position)
saturnRing.rotation.x = (Math.PI / 2) + 0.35;
saturn.position.x = saturnDistance

scene.add(saturn)

// uranus
let uranusDistance = distance * 5.5
let uranusAngle = angle * 1.5
let uranusSpeed = speed * 0.02

const uranusGeometry = new THREE.SphereGeometry(2.2, 64, 32)
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture })
const uranus = new THREE.Mesh( uranusGeometry, uranusMaterial )

// uranus Position
uranus.position.x = uranusDistance

scene.add(uranus)

// neptune
let neptuneDistance = distance * 6
let neptuneAngle = angle * 1.5
let neptuneSpeed = speed * 0.02

const neptuneGeometry = new THREE.SphereGeometry(1.8, 64, 32)
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture })
const neptune = new THREE.Mesh( neptuneGeometry, neptuneMaterial )

// uranus Position
neptune.position.x = neptuneDistance

scene.add(neptune)

/**
 * Lights
*/
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// handle full screen mode
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if(!fullscreenElement) {
      if(canvas.requestFullscreen) {
          canvas.requestFullscreen()
      }   else if(canvas.webkitRequestFullscreen) {
          canvas.webkitRequestFullscreen()
      }
  }   else {
      if(document.exitFullscreen) {
          document.exitFullscreen()
      }   else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
      }
  }
})

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const tick = () =>
{
  // Update controls
  controls.update()

  sun.rotation.y += 0.001

  // animate mercury
  mercury.rotation.y += 0.005

  mercury.position.x = mercuryDistance * Math.cos(mercuryAngle)
  mercury.position.z = mercuryDistance * Math.sin(mercuryAngle)
  mercuryAngle += mercurySpeed

  // animate venus
  venus.rotation.y += 0.005

  venus.position.x = venusDistance * Math.cos(venusAngle)
  venus.position.z = venusDistance * Math.sin(venusAngle)
  venusAngle += venusSpeed

  // animate earth
  earth.rotation.y += 0.005

  earth.position.x = earthDistance * Math.cos(earthAngle)
  earth.position.z = earthDistance * Math.sin(earthAngle)
  earthAngle += earthSpeed

  // animate mars
  mars.rotation.y += 0.005

  mars.position.x = marsDistance * Math.cos(marsAngle)
  mars.position.z = marsDistance * Math.sin(marsAngle)
  marsAngle += marsSpeed

  // animate jupiter
  jupiter.rotation.y += 0.005

  jupiter.position.x = jupiterDistance * Math.cos(jupiterAngle)
  jupiter.position.z = jupiterDistance * Math.sin(jupiterAngle)
  jupiterAngle += jupiterSpeed

  // animate jupiter
  jupiter.rotation.y += 0.005

  jupiter.position.x = jupiterDistance * Math.cos(jupiterAngle)
  jupiter.position.z = jupiterDistance * Math.sin(jupiterAngle)
  jupiterAngle += jupiterSpeed

  // animate saturn
  saturn.rotation.y += 0.005

  saturn.position.x = saturnDistance * Math.cos(saturnAngle)
  saturn.position.z = saturnDistance * Math.sin(saturnAngle)
  saturnAngle += saturnSpeed

  // animate uranus
  neptune.rotation.y += 0.005

  neptune.position.x = neptuneDistance * Math.cos(neptuneAngle)
  neptune.position.z = neptuneDistance * Math.sin(neptuneAngle)
  neptuneAngle += neptuneSpeed

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()