import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Utils } from './utils/utils';
import Solver from './solver';

const fps = 60;
let simulationArea = 10;
let e = 1.5;
let then = performance.now();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
let runSimulation = false;

camera.position.set(10, 10, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x021221), 1);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const hemisphereLight = new THREE.HemisphereLight(0xffffff, 10);
scene.add(hemisphereLight);

const gridHelper = new THREE.GridHelper(simulationArea, simulationArea);
const axesHelper = new THREE.AxesHelper(simulationArea/2);

let boxGeometry = new THREE.BoxGeometry(simulationArea, simulationArea, simulationArea);
let edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
let edgesMaterial = new THREE.LineBasicMaterial({ color: 0x4080ff, linewidth: 2 });
let wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial);
scene.add(wireframe);

renderer.setAnimationLoop(animate);

let spheres: THREE.Mesh[] = [];

function animate(now: number) {
    const deltaTime = (now - then) / 1000;
    if (deltaTime > 1 / fps) {
        if (runSimulation === true) {
            let solver = Solver.getInstance()
            solver.solve(spheres, simulationArea/2, e);
        }
        then = now;
        renderer.render(scene, camera);
    }
}

export function addBody(mass: number = 10, radius: number = 0.2) {
    let color = new THREE.Color().setRGB(Math.random(), Math.random(), Math.random());
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: color, flatShading: true });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.set(Utils.getRandomNumber(-simulationArea/2, simulationArea/2), Utils.getRandomNumber(-simulationArea/2, simulationArea/2), Utils.getRandomNumber(-simulationArea/2, simulationArea/2));
    sphere.userData = {
        velocity: new THREE.Vector3(Utils.getRandomNumber(-0.05, 0.05), Utils.getRandomNumber(-0.05, 0.05), Utils.getRandomNumber(-0.05, 0.05)),
        mass: mass,
        radius: radius,
    };

    spheres.push(sphere);
    scene.add(sphere);
}

export function setSettings(simArea: number, axis: boolean, grid: boolean, restitution: number) {

    if (simulationArea !== simArea) {
        let scaleFactor = (simArea / simulationArea) * wireframe.scale.x;
        wireframe.scale.set(scaleFactor, scaleFactor, scaleFactor);
        gridHelper.scale.set(scaleFactor, scaleFactor, scaleFactor);
        axesHelper.scale.set(scaleFactor, scaleFactor, scaleFactor);
        reset();
    }

    e = restitution;
    
    simulationArea = simArea;

    if (axis) {
        scene.add(axesHelper);
    } else {
        scene.remove(axesHelper);
    }
    if (grid) {
        scene.add(gridHelper);
    } else {
        scene.remove(gridHelper);
    }
}

export function reset() {
    spheres.forEach((sphere) => scene.remove(sphere));
    spheres = [];
}
export function startSimulation() {
    runSimulation = true;
}
export function stopSimulation() {
    runSimulation = false;
}