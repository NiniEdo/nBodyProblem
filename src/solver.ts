import * as THREE from 'three';

export default class Solver {
    static instance: Solver;
    private readonly G: number = 1;
    private readonly softening: number = 0.1;
    private deltaT: number = 0.1;
    private constructor() { }

    public static getInstance(): Solver {
        if (!Solver.instance) {
            Solver.instance = new Solver();
        }
        return Solver.instance;
    }

    public solve(spheres: THREE.Mesh[], simulationArea: number): void {
        spheres.forEach((sphere) => {
            let objectAcceleration = new THREE.Vector3(0, 0, 0);
            spheres.forEach((other) => {
                if (sphere !== other) {
                    let vectorDiff = new THREE.Vector3().subVectors(other.position, sphere.position);
                    let distance = vectorDiff.length() + this.softening;
                    let scalar = this.G * other.userData.mass / Math.pow(distance, 3);
                    let acceleration = vectorDiff.multiplyScalar(scalar);
                    objectAcceleration.add(acceleration);
                }
            });
            let maxAcceleration = 1;
            if (objectAcceleration.length() > maxAcceleration) {
                objectAcceleration.setLength(maxAcceleration);
            }
            sphere.userData.velocity.add(objectAcceleration.clone().multiplyScalar(this.deltaT));
            sphere.position.add(sphere.userData.velocity.clone().multiplyScalar(this.deltaT));
            if(sphere.position.x > simulationArea || sphere.position.x < -simulationArea)
            {
                sphere.position.x *= -1
            }
            if(sphere.position.y > simulationArea || sphere.position.y < -simulationArea)
            {
                sphere.position.y *= -1
            }
            if(sphere.position.z > simulationArea || sphere.position.z < -simulationArea)
            {
                sphere.position.z *= -1
            }
        });
    }
}