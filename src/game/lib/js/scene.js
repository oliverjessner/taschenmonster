import Sprite from './sprite.js';
import { rightKey, leftKey, upKey, downKey } from '../../data/misc/keys.js';

export default class Scene extends Sprite {
    #lastDirection = downKey;
    tileSize = 80; 

    constructor (config, ctx) {
        super(config, ctx);
        this.collision = this.mapData.layers.find(l => l.name === 'collisionblocks');
    }

    whereAmI () {
        const x = Math.abs(this.position.x - this.offset.x - this.tileSize);
        const y = Math.abs(this.position.y - this.offset.y - this.tileSize * 3);

        return {
            x: x / this.tileSize,
            y: y / this.tileSize,
            direction: this.#lastDirection
        };
    }
    
    #isLeftSideFree () {
        const { x, y } = this.whereAmI();
        const isLeftOfBody = this.collision.data[y][x - 1];
        
        return isLeftOfBody !== this.blocks.collisionBlock;
    }

    #isRightSideFree () {
        const { x, y } = this.whereAmI();
        const isRightOfBody = this.collision.data[y][x + 1];
        
        return isRightOfBody !== this.blocks.collisionBlock;
    }

    #isTopSideFree () {
        const { x, y } = this.whereAmI();
        const isTopOfHead = this.collision.data[y - 1][x];
        
        return isTopOfHead !== this.blocks.collisionBlock;
    }

    #isBottomSideFree () {
        const { x, y } = this.whereAmI();
        const isBottomOfHead = this.collision.data[y + 1][x];

        return isBottomOfHead !== this.blocks.collisionBlock;
    }

    draw (direction) {
        // left
        if (direction === leftKey && this.#isLeftSideFree()) {
            if (this.#lastDirection === leftKey) {
                this.position.x += this.tileSize;
            }
        }
        // up
        if (direction === upKey && this.#isTopSideFree()) {
            if (this.#lastDirection === upKey) {
                this.position.y += this.tileSize;
            }
        }
        // down
        if (direction === downKey && this.#isBottomSideFree()) {
            if (this.#lastDirection === downKey) {
                this.position.y -= this.tileSize;
            }
        }
        // right
        if (direction === rightKey  && this.#isRightSideFree()) {
            if (this.#lastDirection === rightKey) {
                this.position.x -= this.tileSize;
            }
        }

        this.#lastDirection = direction || downKey;
        this.ctx.drawImage(
            this.image, 
            this.position.x, 
            this.position.y, 
        );
    }
}