import Figure from './figure.js';
import Scene from './scene.js';
import Route from './route.js';
import { ctx, renderBlackBackground } from './canvas.js';
import loadMapData from './loadMapData.js';
import gameSettings from './gameSettings.js';

export default {
    async generate ({ scene, entry }) {
        const data = await Promise.all([
            await loadMapData(scene, 'offsetData'),
            await loadMapData(scene, 'map'),
            await loadMapData(scene, 'blocks'),
            await loadMapData(scene, 'connections'),
        ]);

        this.scene = scene;
        this.data = data;

        if (entry) {
            data[0].mapPosition = entry;
        }

        this.player = new Figure({
            src: './assets/chars/maggus.png',
            data, 
            ctx
        });
        this.background = new Route({
            src: `./assets/map/${scene}/background.png`,
            data,
            ctx
        });
        this.foreground = new Scene({
            src: `/assets/map/${scene}/foreground.png`,
            data,
            ctx
        });
        this.collisonBlock = new Scene({
            src: `./assets/map/${scene}/collisionblocks.png`,
            data,
            ctx
        });

        this.background.addEventListener('sceneChange', async (detail) => {
            await this.generate(detail);
            return this.bootStrap(detail);
        });
    },

    animate (direction) {
        renderBlackBackground();
        this.background.draw(direction);
  
        if (gameSettings.collisonBlock) {
            this.collisonBlock.draw(direction);
        }
    
        this.player.draw(direction);
        this.foreground.draw(direction);
    },

    interact () {
        this.background.interact();
    },

    async bootStrap ({ direction }) {
        const allLoads = [
            this.background.load(),
            this.player.load(),
            this.foreground.load(),
            this.collisonBlock.load()
        ];
      
        await Promise.all(allLoads);
        return this.animate(direction);
    }
};
