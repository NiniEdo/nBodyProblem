# [Three Body Problem](https://nbodyproblem-rvk9.onrender.com)

This project offers an interactive simulation of the N-body problem using Three.js. Explore gravitational dynamics between multiple bodies in a three-dimensional space, with the ability to add new bodies, modify simulation settings, and observe real-time interactions.![image](https://github.com/user-attachments/assets/e3bc8ecd-e895-49f7-ba64-294891d4268c)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/NiniEdo/nbodyproblem.git
   ```

2. **Install Dependencies**

   Navigate to the project directory:

   ```bash
   cd nbodyproblem
   ```

   Install the required packages:

   ```bash
   npm install
   ```

3. **Run the Simulation**

   Start the development server:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:5173` to view the simulation.

4. **Build for Production**

   To create a production build:

   ```bash
   npm run build
   ```

   The optimized files will be in the `target` directory.

5. **Run with Docker (Optional)**

   Build the Docker image:

   ```bash
   docker build -t nbodyproblem .
   ```

   Run the Docker container:

   ```bash
   docker run -p 80:80 nbodyproblem
   ```

   Access the simulation at `http://localhost`.

## Requirements

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Dependencies

- **Three.js**: For 3D rendering.
- **Vite**: For development and build tooling.
