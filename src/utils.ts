export class Utils {
    private constructor() { }

    static getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}