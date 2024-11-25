// import * as THREE from 'three';
// import { Utils } from './utils';

// export class BodiesCollection {

//     static #instance: BodiesCollection;

//     private constructor() { }
    

//     public static get instance(): BodiesCollection {
//         if (!BodiesCollection.#instance) {
//             BodiesCollection.#instance = new BodiesCollection();
//         }

//         return BodiesCollection.#instance;
//     }

//     addSphere(body: Body): THREE.Mesh {

//         const geometry = new THREE.SphereGeometry(radius, 100, 100);
//         const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true });
//         const sphere = new THREE.Mesh(geometry, material);
//         const randomness: number = 5;

//         sphere.position.y = Utils.getRandomNumber(-randomness, randomness);
//         sphere.position.x = Utils.getRandomNumber(-randomness, randomness);
//         sphere.position.z = Utils.getRandomNumber(-randomness, randomness);

//         return sphere;
//     }



// }