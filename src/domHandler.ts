import * as renderer from './renderer';

document.getElementById('menuButton')?.addEventListener('click', () => {
    const form = document.getElementById('options');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
});

document.getElementById('addBody')?.addEventListener('click', () => {
    const form = document.getElementById('addBodyForm');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
});

document.getElementById('settings')?.addEventListener('click', () => {
    const form = document.getElementById('settingsForm');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
});

document.getElementById('settingsForm')?.addEventListener('change', () => {
    const spawnRadius = Number((document.getElementById('simulationAria') as HTMLInputElement)?.value) || 10;
    const e = Number((document.getElementById('elastic') as HTMLInputElement)?.value) || 1.5;
    const showAxis = (document.getElementById('showAxis') as HTMLInputElement)?.checked || false;
    const showGrid = (document.getElementById('showGrid') as HTMLInputElement)?.checked || false;
    renderer.setSettings(spawnRadius, showAxis, showGrid, e);
});

document.getElementById('addBodyForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const mass = Number((document.getElementById('mass') as HTMLInputElement)?.value) || 1000;
    const radius = Number((document.getElementById('radius') as HTMLInputElement)?.value) || 0.2;
    if (mass < 0 || radius < 0) {
        return;
    }
    renderer.addBody(mass, radius);
});

document.getElementById('stop')?.addEventListener('click', () => {
    const stopButton = document.getElementById("stop");
    const startButton = document.getElementById("start");
    if (stopButton && startButton) {
        (startButton as HTMLButtonElement).disabled = false;
        (stopButton as HTMLButtonElement).disabled = true;
    }
    renderer.stopSimulation();
});

document.getElementById('start')?.addEventListener('click', () => {
    const stopButton = document.getElementById("stop");
    const startButton = document.getElementById("start");
    if (stopButton && startButton) {
        (startButton as HTMLButtonElement).disabled = true;
        (stopButton as HTMLButtonElement).disabled = false;
    }
    renderer.startSimulation();
});

document.getElementById('reset')?.addEventListener('click', () => {
    renderer.reset();
});