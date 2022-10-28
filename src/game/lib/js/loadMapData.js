function wellformMapData (json) {
    json.layers = json.layers.map(function fixRows (layer) {
        if (!layer.data) {
            return layer;
        }
        layer.data = [...new Array(layer.height)].map(function (_, i) {
            return layer.data.slice(i * layer.width, (i + 1) * layer.width)
        });

        return layer;
    }); 
}

export default async function loadMapData (name, data) {
    const resp = await fetch(`/data/scenes/${name}/${data}.json`);
    const json = await resp.json();

    if (data === 'map') {
        wellformMapData(json);
    }

    return json;
}