import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Utils } from './utils/utils';
import Solver from './solver';

let then = performance.now();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x021221), 1);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 10);
scene.add(hemisphereLight);

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

renderer.setAnimationLoop(animate);

let spheres: THREE.Mesh[] = [];

function animate(now: number) {
    const deltaTime = (now - then) / 1000;
    if (deltaTime > 0.016) { //60fps
        Solver.getInstance().solve(spheres, deltaTime);
        then = now;
        renderer.render(scene, camera);
    }
}

export function addBody(mass: number = 10, radius: number = 0.2) {
    let color = new THREE.Color().setRGB(Utils.getRandomNumber(0, 1), Utils.getRandomNumber(0, 1), Utils.getRandomNumber(0, 1));
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: color, flatShading: true });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(Math.random(), Math.random(), Math.random());
    sphere.userData = {
        velocity: new THREE.Vector3(Utils.getRandomNumber(-0.2, 0.2), Utils.getRandomNumber(-0.2, 0.2), Utils.getRandomNumber(-0.2, 0.2)),
        mass: mass,
        radius: radius
    };

    spheres.push(sphere);
    scene.add(sphere);
}

export function reset() {
    spheres.forEach((sphere) => scene.remove(sphere));
    spheres = [];
}