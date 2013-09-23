L.TileLayer.Ign = L.TileLayer.extend({
    options : {
        attribution: 'Aerial and Parcel Imagery by IGN <a href="http://ign.fr"> Information </a>',
    },
    initialize : function(key, options){
        L.Util.setOptions(this, options);
        this._key = key;
        var urlFormat =
            '//wxs.ign.fr/{key}/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER={layer_name}&STYLE={layer_style}&TILEMATRIXSET=PM&TILEMATRIX={zoom}&TILEROW={y}&TILECOL={x}&FORMAT=image%2F{image_format}';
        if(options.type == 'Parcel'){
            this._url = urlFormat
                            .replace('{key}', key)
                            .replace('{layer_name}', 'CADASTRALPARCELS.PARCELS')
                            .replace('{layer_style}', 'bdparcellaire')
                            .replace('{image_format}', 'png');
        }
        //Default case: aerial imagery
        else{
            this._url = urlFormat
                            .replace('{key}', key)
                            .replace('{layer_name}', 'ORTHOIMAGERY.ORTHOPHOTOS')
                            .replace('{layer_style}', 'normal')
                            .replace('{image_format}', 'jpeg');
        }
    },
    getTileUrl: function(tilePoint) {
        var zoom = this._getZoomForUrl();
        var numTiles = Math.pow(2, zoom);
        return this._url
                .replace('{zoom}', zoom)
                .replace('{x}',  (((tilePoint.x % numTiles) + numTiles) % numTiles).toString(10))
                .replace('{y}', tilePoint.y.toString(10));
    }
});
