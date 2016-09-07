/**
 * Created by whs on 2016/8/18 0001.
 * 基础图层定义
 */

(function(factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('leaflet'));
    } else {
        window.providers = factory(window.L);
    }
})
(function(L) {

//影像
    var imgLayer0T10 = new L.esri.tiledMapLayer({
											        url: 'http://192.168.0.120:6080/arcgis/rest/services/GAS/img10/MapServer',
											        crs:L.CRS.EPSG3857,
											        maxZoom:10,
											        minZoom:0
											    });
    var imgLayer11T15 = new L.esri.tiledMapLayer({
											    	url: 'http://192.168.0.120:6080/arcgis/rest/services/GAS/img15/MapServer',
											    	crs:L.CRS.EPSG3857,
											    	maxZoom:15,
											    	minZoom:11
											    });


//矢量
    var vecLayer0T10 = new L.esri.tiledMapLayer({
											        url: 'http://192.168.0.120:6080/arcgis/rest/services/GAS/vec10/MapServer',
											        crs:L.CRS.EPSG3857,
											        maxZoom:10,
											        minZoom:0
											    });
    var vecLayer11T15 = new L.esri.tiledMapLayer({
											    	url: 'http://192.168.0.120:6080/arcgis/rest/services/GAS/vec15/MapServer',
											    	crs:L.CRS.EPSG3857,
											    	maxZoom:15,
											    	minZoom:11
											    });


//地形
    var demLayer0T10 = new L.esri.tiledMapLayer({
											        url: 'http://192.168.0.120:6080/arcgis/rest/services/GAS/dem10/MapServer',
											        crs:L.CRS.EPSG3857,
											        maxZoom:10,
											        minZoom:0
											    });
    var demLayer11T15 = new L.esri.tiledMapLayer({
											    	url: 'http://192.168.0.120:6080/arcgis/rest/services/GAS/dem15/MapServer',
											    	crs:L.CRS.EPSG3857,
											    	maxZoom:15,
											    	minZoom:11
											    });

    var vectorGroup = L.layerGroup([vecLayer0T10,vecLayer11T15]),
        imageGroup = L.layerGroup([imgLayer0T10,imgLayer11T15]),
        terGroup = L.layerGroup([demLayer0T10,demLayer11T15]);

    var providers = {};


    providers['Google_Image'] = {
    		title: '卫星',
    		icon: '../../images/img.png',
    		layer: imageGroup
    };
    
    providers['Google_Vector'] = {
    		title: '地图',
    		icon: '../../images/vec.png',
    		layer: vectorGroup
    };

    providers['Google_Terr'] = {
        title: '地形',
        icon: '../../images/ter.png',
        layer: terGroup
    };
    

    return providers;
});
