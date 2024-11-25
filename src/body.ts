import * as THREE from 'three';
import { Utils } from './utils';

export class Body extends THREE.Mesh{

    private _velocity: THREE.Vector3;
    private _mass: number;
    private _radius: number;
    color: THREE.Color = new THREE.Color(0x00ff00);

    public get velocity(): THREE.Vector3 {
        return this._velocity;
    }
    public set velocity(value: THREE.Vector3) {
        this._velocity = value;
    }
    public get mass(): number {
        return this._mass;
    }
    public set mass(value: number) {
        this._mass = value;
    }
    public get radius(): number {
        return this._radius;
    }
    public set radius(value: number) {
        this._radius = value;
    }

    constructor(mass: number = 10, radius: number = 0.2) {
        super(new THREE.SphereGeometry(radius, 100, 100), new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true }));
        this._mass = mass;
        this._radius = radius;
        this.position.set(Utils.getRandomNumber(-1, 1), Utils.getRandomNumber(-1, 1), Utils.getRandomNumber(-1, 1));
        this._velocity = new THREE.Vector3(Utils.getRandomNumber(-1, 1), Utils.getRandomNumber(-1, 1), Utils.getRandomNumber(-1, 1));
    }

}