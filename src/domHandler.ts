import * as renderer from './renderer';

document.getElementById('menuButton')?.addEventListener('click', (e) => {
    const form = document.getElementById('options');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
});

document.getElementById('addBody')?.addEventListener('click', (e) => {

    const form = document.getElementById('addBodyForm');
    if (form) {
        form.style.display = form.style.display === 'none' ? 'block' : 'none';
    }
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

document.getElementById('reset')?.addEventListener('click', () => {
    renderer.reset();
    
});