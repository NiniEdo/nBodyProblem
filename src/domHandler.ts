import * as renderer from './renderer';

document.getElementById('addBody')?.addEventListener('click', () => {
    renderer.addBody();
});
document.getElementById('reset')?.addEventListener('click', () => {
    renderer.reset();
});
