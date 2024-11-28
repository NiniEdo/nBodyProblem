import * as THREE from 'three';

export default class Solver {
    private static instance: Solver;
    private readonly G: number = 1; // Costante gravitazionale aumentata per visualizzazione
    private readonly softening: number = 0.1; // Evita divisioni per zero
    private constructor() { }

    public static getInstance(): Solver {
        if (!Solver.instance) {
            Solver.instance = new Solver();
        }
        return Solver.instance;
    }

    public solve(bodies: THREE.Mesh[], deltaTime: number = 0.016): void {
        const forces: THREE.Vector3[] = bodies.map(() => new THREE.Vector3());

        for (let i = 0; i < bodies.length; i++) {
            for (let j = i + 1; j < bodies.length; j++) {
                const force = this.calculateGravitationalForce(bodies[i], bodies[j]);
                forces[i].add(force);
                forces[j].sub(force); // Forza uguale e opposta
            }
        }

        for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            const acceleration = forces[i].divideScalar(body.userData.mass);
            
            // v = v + a*dt
            body.userData.velocity.add(acceleration.multiplyScalar(deltaTime));
            
            // x = x + v*dt
            body.position.add(body.userData.velocity.clone().multiplyScalar(deltaTime));
        }
    }

    private calculateGravitationalForce(body1: THREE.Mesh, body2: THREE.Mesh): THREE.Vector3 {
        const direction = new THREE.Vector3()
            .subVectors(body2.position, body1.position);
        
        const distance = direction.length();
        
        if (distance < this.softening) {
            return new THREE.Vector3();
        }

        const forceMagnitude = this.G * body1.userData.mass * body2.userData.mass / 
            (distance * distance + this.softening * this.softening);

        return direction.normalize().multiplyScalar(forceMagnitude);
    }
}