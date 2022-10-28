import Playground from './playground.js';

const keyAction = Object.freeze({
    a: dir => Playground.animate(dir),
    w: dir => Playground.animate(dir),
    s: dir => Playground.animate(dir),
    d: dir => Playground.animate(dir),
    ' ': act => Playground.interact(act),
});

await Playground.generate({ scene: 'alabastia' });

window.addEventListener('keydown', function ({ key }) {
    return keyAction[key]?.(key);
});

if (document.readyState !== 'loading') {
    await Playground.bootStrap({ direction: 's' });
} else { 
    document.addEventListener('DOMContentLoaded', async () => await Playground.bootStrap({ direction: 's' }));
}
