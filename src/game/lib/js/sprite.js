export default class Sprite {
    isInteracting = false;

    constructor ({ src, data, ctx }) {
        const [
            { mapPosition, playerOffset }, 
            mapData, 
            blocks,
            connections
        ] = data;

        this.ctx = ctx;
        this.src = src;
        this.image = new Image();
        this.position = structuredClone(mapPosition),
        this.offset = structuredClone(playerOffset),
        this.blocks = blocks;
        this.connections = connections;
        this.blocks;
        this.mapData = mapData;
    }

    async load () {
        return new Promise (success => {
            this.image.src = this.src;
            this.image.onload = function () {
                return success();
            };
        });
    }
}