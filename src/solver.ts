import * as THREE from 'three';

export default class Solver {
    private static instance: Solver;
    private readonly G: number = 1;
    private readonly softening: number = 0.1;
    private deltaT: number = 0.1;
    private constructor() { }

    public static getInstance(): Solver {
        if (!Solver.instance) {
            this.instance = new Solver
        }
        return Solver.instance;
    }

    public solve(spheres: THREE.Mesh[], bounds: number, e: number): void {
        spheres.forEach((sphere) => {
            let objectAcceleration = new THREE.Vector3(0, 0, 0);
            spheres.forEach((other) => {
                if (sphere !== other) {
                    let vectorDiff: THREE.Vector3 = new THREE.Vector3().subVectors(other.position, sphere.position);
                    let distance: number = vectorDiff.length() + this.softening;
                    let scalar: number = this.G * other.userData.mass / Math.pow(distance, 3);
                    let acceleration: THREE.Vector3 = vectorDiff.multiplyScalar(scalar);
                    objectAcceleration.add(acceleration);
                }
            });

            let maxAcceleration = 1;
            if (objectAcceleration.length() > maxAcceleration) {
                objectAcceleration.setLength(maxAcceleration);
            }

            sphere.userData.velocity.add(objectAcceleration.clone().multiplyScalar(this.deltaT));

            sphere.position.add(sphere.userData.velocity.clone().multiplyScalar(this.deltaT));
            //detect if the sphere is out of bounds
            let wallBounceE : number = 0.1; 
            if (sphere.position.x + sphere.userData.radius > bounds) {
                sphere.position.x = bounds - sphere.userData.radius;
                sphere.userData.velocity.x *= -wallBounceE;
            } else if (sphere.position.x - sphere.userData.radius < -bounds) {
                sphere.position.x = -bounds + sphere.userData.radius;
                sphere.userData.velocity.x *= -wallBounceE;
            }

            if (sphere.position.y + sphere.userData.radius > bounds) {
                sphere.position.y = bounds - sphere.userData.radius;
                sphere.userData.velocity.y *= -wallBounceE;
            } else if (sphere.position.y - sphere.userData.radius < -bounds) {
                sphere.position.y = -bounds + sphere.userData.radius;
                sphere.userData.velocity.y *= -wallBounceE;
            }

            if (sphere.position.z + sphere.userData.radius > bounds) {
                sphere.position.z = bounds - sphere.userData.radius;
                sphere.userData.velocity.z *= -wallBounceE;
            } else if (sphere.position.z - sphere.userData.radius < -bounds) {
                sphere.position.z = -bounds + sphere.userData.radius;
                sphere.userData.velocity.z *= -wallBounceE;
            }

            let maxVel = 2.5;
            if (sphere.userData.velocity.length() > maxVel) {
                sphere.userData.velocity.setLength(maxVel);
            }

            //detect if the sphere is colliding with another sphere
            spheres.forEach(other => {
                if (sphere !== other) {
                    let delta = new THREE.Vector3().subVectors(sphere.position, other.position)
                    let distance: number = delta.length();
                    const radiusSum = sphere.userData.radius + other.userData.radius;
                    if (distance < radiusSum) {
                        const collisionNormal = delta.normalize();
                        const relativeVelocity = new THREE.Vector3().subVectors(sphere.userData.velocity, other.userData.velocity);
                        const velocityAlongNormal = relativeVelocity.dot(collisionNormal);
                        if (velocityAlongNormal > 0) return;
                        const impulseScalar = -(1 + e) * velocityAlongNormal / (1 / sphere.userData.mass + 1 / other.userData.mass);
                        const impulse = collisionNormal.multiplyScalar(impulseScalar);
                        sphere.userData.velocity.add(impulse.clone().multiplyScalar(1 / sphere.userData.mass));
                        other.userData.velocity.sub(impulse.clone().multiplyScalar(1 / other.userData.mass));
                        const overlap = radiusSum - distance;
                        const correction = collisionNormal.multiplyScalar(overlap / (1 / sphere.userData.mass + 1 / other.userData.mass));
                        sphere.position.add(correction.clone().multiplyScalar(1 / sphere.userData.mass));
                        other.position.sub(correction.clone().multiplyScalar(1 / other.userData.mass));
                    }
                }
            });

        });
    }
}