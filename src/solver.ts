export default class Solver {
    private static instance: Solver;

    private constructor() { }

    public static getInstance(): Solver {
        if (!Solver.instance) {
            Solver.instance = new Solver();
        }
        return Solver.instance;
    }

    public solve(): void {
        console.log("Solving the problem...");
    }
}