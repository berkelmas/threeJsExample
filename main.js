import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const Img = require("./textures/crate.gif");
const { GLTFLoader } = require("three/examples/jsm/loaders/GLTFLoader");
const BmwM3 = require("./m3-car/source/m3.3DS.3ds");
const canonCamera = require("./bmw-deneme.glb");

// //Hexadecimal color (recommended)
// const colorGreen = new THREE.Color("green");

const init = async () => {
  const texture = new THREE.TextureLoader().load(Img);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#e1e1e1");
  const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  var light = new THREE.PointLight(0xffffff, 1);
  light.position.set(0, 0, 5);
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 5);
  hemiLight.position.set(1, 0, 50);

  scene.add(camera);
  camera.add(light);
  camera.add(hemiLight);

  new GLTFLoader().load(canonCamera, function (a) {
    console.log(a);
    scene.add(a.scene);
  });

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);

  // const geometryCube = new THREE.BoxGeometry();
  // const materialCube = new THREE.MeshPhysicalMaterial({ map: texture });

  // const cube = new THREE.Mesh(geometryCube, materialCube);
  // scene.add(cube);

  camera.position.z = 5;
  controls.update();
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y -= 0.01;
  }
  animate();
};

init();
