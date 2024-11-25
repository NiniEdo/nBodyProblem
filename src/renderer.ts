import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import  {Utils} from './utils';

const fps = 60;
const fpsInterval = 1000 / fps;
let then = performance.now();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x021221), 1);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 10);
scene.add(hemisphereLight);

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

renderer.setAnimationLoop(animate);

let spheres: THREE.Mesh[] = [];
addSphere(0.2, spheres);
addSphere(0.2, spheres);

let angle = 0;
const radius = 1; 
const angularSpeed = Math.PI / 2; 

function animate(now: number) {
    const elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        const deltaTime = elapsed / 1000; 

        angle += angularSpeed * deltaTime;
        angle = angle % (2 * Math.PI);
        
        let directionMultiplier : number = 1;
        for (const sphere of spheres) {
            sphere.position.x = directionMultiplier * radius * Math.sin(angle);
            sphere.position.z = directionMultiplier * radius * Math.cos(angle);
            directionMultiplier *= -1;
        }
        controls.update();
        renderer.render(scene, camera);
    }
}

function addSphere(radius: number, spheres: THREE.Mesh[]) {
    const geometry = new THREE.SphereGeometry(radius, 100, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true });
    const sphere = new THREE.Mesh(geometry, material);
    const randomness : number = 5;
    sphere.position.y = Utils.getRandomNumber(-randomness, randomness);
    sphere.position.x = Utils.getRandomNumber(-randomness, randomness);
    sphere.position.z = Utils.getRandomNumber(-randomness, randomness);
    scene.add(sphere);
    spheres.push(sphere);
}