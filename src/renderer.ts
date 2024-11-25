import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const fps = 60; // FPS desiderati
const fpsInterval = 1000 / fps;
let then = performance.now();


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x021221), 1);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(0.2, 100, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true });
const cube1 = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material);
scene.add(cube1, cube2);

const directionalLight = new THREE.HemisphereLight(0xffffff, 10);
scene.add(directionalLight);

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.z = 5;

renderer.setAnimationLoop(animate);


let angle = 0;
const radius = 1; // Raggio del cerchio
const angularSpeed = Math.PI / 2; // Velocità angolare in radianti al secondo
function animate(now: number) {

    const elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        const deltaTime = elapsed / 1000; // Converti millisecondi in secondi

        // Aggiorna l'angolo
        angle += angularSpeed * deltaTime;
        angle = angle % (2 * Math.PI);

        // Posizioni delle sfere in moto circolare
        cube1.position.z = radius * Math.cos(angle);
        cube1.position.x = radius * Math.sin(angle);

        cube2.position.z = radius * Math.cos(angle + Math.PI);
        cube2.position.x = radius * Math.sin(angle + Math.PI);

        renderer.render(scene, camera);
    }
    controls.update();
}