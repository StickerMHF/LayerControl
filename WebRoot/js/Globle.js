$(function(){
	// 加载地图
	Globle.initMap();
	Globle.arcgisurl="http://192.168.0.116:6080/";
	Globle.url = "http://localhost:8080/";
	Globle.trends();//实时获取车辆、终端动态信息
//	Globle.starttrends();//开始更新	
	Globle.dynamicService();
});

var Globle={
		
		initMap:function(){
			Globle.map = new L.map('map', {
				crs : L.CRS.EPSG3857,
				center : {lat: 39.810645900839134, lng: 108.885498046875},
				zoom :8,
				scrollWheelZoom : (window.self === window.top) ? true : false,
				dragging : (window.self !== window.top && L.Browser.touch) ? false: true,
				tap : (window.self !== window.top && L.Browser.touch) ? false : true,
				maxZoom:15,
				minZoom:6,
				maxBounds:L.latLngBounds([31.12819929911196,89.09912109375],[46.7248003746672,131.28662109375]),
//				measureControl: true,
				zoomControl : false,
				contextmenu: false,
			    contextmenuWidth: 140,
			    contextmenuItems: [{
				      text: '设为起点',
				      icon:'img/start.png',
				      callback: LXGH.getStart
			    },{
				      text: '设置途经点',
				      icon:'img/stop.png',
				      callback: LXGH.getStop
			    },{
				      text: '设置终点',
				      icon:'img/end.png',
				      callback: LXGH.getDest
			    }]
			});
			
			Globle.TempLayer = L.layerGroup();//临时图层
			Globle.onlineTerminalLayer = L.layerGroup();//终端在线图层
			Globle.offlineTerminalLayer = L.layerGroup(); //终端离线图层
			Globle.onlineVehicleLayer = L.layerGroup(); //车辆在线图层
			Globle.offlineVehicleLayer = L.layerGroup(); //车辆离线图层
			Globle.ClusterLayer = L.markerClusterGroup();//聚簇图层
			Globle.PointLayer = L.layerGroup();  	//临时点图层
			Globle.map.addLayer(Globle.TempLayer);  //临时图层
			Globle.map.addLayer(Globle.PointLayer);
			
			Globle.dynamic=L.esri.dynamicMapLayer(ZHGL.dynamicNodes);
			Globle.dynamic.addTo(Globle.map);
			
			// 比例尺
			/*var scale = new L.Control.Scale({
				position : 'bottomleft',
				imperial : false
			}).addTo(Globle.map);*/
			
			Globle.addToolbar();
			
//			//图层控制按钮
//			Globle.layerControl = L.control.layers({
//				
//			}).addTo(Globle.map);  
			
			//量测面积方法
			Globle.measureCont = new L.Control.Measure().addTo(Globle.map);
//			$(".leaflet-control-measure").attr("style","dispaly:none");
			
			//地图切换
			Globle.addIconMap();
			//添加事件监听
			Globle.mapEventListener();
			Globle.terminalAndVehicleControl();
		},
		//清理临时图层
		clearTempLayer:function(){
			Globle.TempLayer.clearLayers();
			Globle.trendsPara.isTerminalUpdateMap=false;
			Globle.trendsPara.isVehicleUpdateMap=false;
		},
		addToolbar:function(){
			var toolbar = L.control({position:'topright'}),add_marker_div,del_marker_div;
			toolbar.onAdd = function () {
				var div = L.DomUtil.create('div', 'toolbar');
				L.DomUtil.create('div', 'tooldiv', div).innerHTML = '<img class="identify" value="-1" src="../../images/toolbar/gongju_search_noral.png" style="width:30px;height:30px;"/>';
				L.DomUtil.create('div', 'tooldiv', div).innerHTML = '<img class="measure" value="-1" src="../../images/toolbar/gongju_ceju_noral.png" style="width:30px;height:30px;"/>';
				L.DomUtil.create('div', 'tooldiv', div).innerHTML = '<img class="measurePoly" value="-1"  src="../../images/toolbar/gongju_cemian_noral.png" style="width:30px;height:30px;"/>';
				L.DomUtil.create('div', 'tooldiv', div).innerHTML = '<img class="default"  src="../../images/toolbar/gongju_quantu_noral.png" style="width:30px;height:30px;"/>';
				add_marker_div = L.DomUtil.create('div', 'tooldiv',div);
				add_marker_div.innerHTML = '<img class="addMarker" value="-1" src="../../images/toolbar/gongju_biaoji_noral.png" style="width:30px;height:30px;"/>';
				del_marker_div = L.DomUtil.create('div','tooldiv',div);
				del_marker_div.innerHTML = '<img class="delMarker" value="-1" src="../../images/toolbar/gongju_shanchu_noral.png" style="width:30px;height:30px;">';
				
				L.DomUtil.create('div', 'tooldiv', div).innerHTML = '<img class="zoom_in" src="../../images/toolbar/gongju_fangda_noral.png" style="width:30px;height:30px;"/>';
				L.DomUtil.create('div', 'tooldiv', div).innerHTML = '<img class="zoom_out" src="../../images/toolbar/gongju_suoxiao_noral.png" style="width:30px;height:30px;"/>';
				return div;
			};
			toolbar.addTo(Globle.map);

			$(".measure").hover(function() {
				$(this).attr("src", "../../images/toolbar/gongju_ceju_hover.png");
			}, function() {
				if($(this).attr("value") == "-1"){
					$(this).attr("src", "../../images/toolbar/gongju_ceju_noral.png");
				}else{
					$(this).attr("src", "../../images/toolbar/gongju_ceju_hover.png");
				}
			});
			$(".identify").hover(function() {
				$(this).attr("src", "../../images/toolbar/gongju_search_hover.png");
			}, function() {
				if($(this).attr("value") == "-1"){
					$(this).attr("src", "../../images/toolbar/gongju_search_noral.png");
				}else{
					$(this).attr("src", "../../images/toolbar/gongju_search_hover.png");
				}
			});

			$(".measure").click(function(){
				if($(this).attr("value") == "-1"){
					$(this).attr("value", "1");
					$(this).attr("src", "../../images/toolbar/gongju_ceju_hover.png");
				}else{
					$(this).attr("value", "-1");
					$(this).attr("src", "../../images/toolbar/gongju_ceju_noral.png");
				}
			});
			
			$(".identify").click(function(){
				if($(this).attr("value") == "-1"){
					$(this).attr("value", "1");
					$(this).attr("src", "../../images/toolbar/gongju_search_hover.png");
				}else{
					$(this).attr("value", "-1");
					$(this).attr("src", "../../images/toolbar/gongju_search_noral.png");
				}
			});

			$(".default").hover(function() {
				$(this).attr("src", "../../images/toolbar/gongju_quantu_hover.png");
			}, function() {
				$(this).attr("src", "../../images/toolbar/gongju_quantu_noral.png");
			});

			$(".addMarker").hover(function() {
				$(this).attr("src", "../../images/toolbar/gongju_biaoji_hover.png");
			}, function() {
				if($(this).attr("value") == "-1"){
					$(this).attr("src", "../../images/toolbar/gongju_biaoji_noral.png");
				}else{
					$(this).attr("src", "../../images/toolbar/gongju_biaoji_hover.png");
				}
			});


			$(".addMarker").click(function(){
				if($(this).attr("value") == "-1"){
					$(this).attr("value", "1");
					$(this).attr("src", "../../images/toolbar/gongju_biaoji_hover.png");
				}else{
					$(this).attr("value", "-1");
					$(this).attr("src", "../../images/toolbar/gongju_biaoji_noral.png");
				}
			});

			$(".delMarker").hover(function() {
				$(this).attr("src", "../../images/toolbar/gongju_shanchu_hover.png");
			}, function() {
				if($(this).attr("value") == "-1"){
					$(this).attr("src", "../../images/toolbar/gongju_shanchu_noral.png");
				}else{
					$(this).attr("src", "../../images/toolbar/gongju_shanchu_hover.png");
				}
			});


			$(".delMarker").click(function(){
				if($(this).attr("value") == "-1"){
					$(this).attr("value", "1");
					$(this).attr("src", "../../images/toolbar/gongju_shanchu_hover.png");
				}else{
					$(this).attr("value", "-1");
					$(this).attr("src", "../../images/toolbar/gongju_shanchu_noral.png");
				}
			});
			$(".zoom_in").hover(function() {
				$(this).attr("src", "../../images/toolbar/gongju_fangda_hover.png");
			}, function() {
				$(this).attr("src", "../../images/toolbar/gongju_fangda_noral.png");
			});
			$(".zoom_out").hover(function() {
				$(this).attr("src", "../../images/toolbar/gongju_suoxiao_hover.png");
			}, function() {
				$(this).attr("src", "../../images/toolbar/gongju_suoxiao_noral.png");
			});
			Globle.measureLength();
			Globle.measurePloy();
			Globle.zoomToDefault();
			Globle.addMarker(add_marker_div);
			Globle.delMarker(del_marker_div);
			Globle.identify();
			Globle.mapZoomIn();
			Globle.mapZoomOut();
			
		},
		//测量距离
		measureLength:function(){
			var measure = new L.Control.measureControl({handler:'enabled'}).addTo(Globle.map);
			$(".measure").click(function(){
				measure.toggle();
			});
		},
		//测量面积
		measurePloy:function(){
			$(".measurePoly").click(function(){
				if($(this).attr("value") == "-1"){
					$(this).attr("value", "1");
					$(this).attr("src", "../../images/toolbar/gongju_cemian_hover.png");
				}else{
					$(this).attr("value", "-1");
					$(this).attr("src", "../../images/toolbar/gongju_cemian_noral.png");
				}
			});
			$(".toolbar .measurePoly").mouseleave(function(){
				L.DomEvent.stop;
				if($(this).attr("value") == "1"){
					$(this).attr("src", "../../images/toolbar/gongju_cemian_hover.png");
					Globle.measureCont._startMeasure();
				}else{
					$(this).attr("src", "../../images/toolbar/gongju_cemian_noral.png");
				}
			});
			$(".toolbar .measurePoly").mouseover(function(){
				$(this).attr("src", "../../images/toolbar/gongju_cemian_hover.png");
				L.DomEvent.stop;
			});
			
		},
		//缩放到全图
		zoomToDefault:function(){
			$(".default").click(function(){
				Globle.map.setView({lon : 109.17388916015625,lat : 38.97468566894531},10);
			});
		},
		
		//添加标记
		addMarker:function(add_marker_div){
			Globle.markerList = [];

			$(".addMarker").click(function(e){
				L.DomEvent.addListener(add_marker_div, 'click', L.DomEvent.stopPropagation)
					.addListener(add_marker_div, 'click', L.DomEvent.preventDefault)
					.addListener(add_marker_div, 'click', Globle.enterAddMarkerMode().bind(this));
				
				Globle.map.addEventListener('click', Globle.enterAddMarkerMode());
			});
		},
		enterAddMarkerMode:function (){
				Globle.map.addEventListener('click', function(e){
				$(".addMarker").attr("value", "-1");
				$(".addMarker").attr("src", "../../images/toolbar/gongju_biaoji_noral.png");
				Globle.map.removeEventListener('click'); 
		        document.getElementById('map').style.cursor = 'auto';
		        var marker = L.marker(e.latlng);
		        marker.setIcon(L.icon({
		        	iconUrl:'../../images/common/marker-icon.png',
		        	iconSize:[25,41]
		        }));
		        marker.addTo(Globle.map);
		        Globle.markerList.push(marker);
		        return true;
			});
		},
		//删除标记
		delMarker:function(){
			$(".delMarker").click(function(e){
				//遍历markerList，给所有的marker添加监听事件
				for (var marker = 0; marker < Globle.markerList.length; marker++) {
					if (typeof(Globle.markerList[marker]) !== 'undefined') {
						Globle.markerList[marker].addEventListener('click', function(){
							Globle.map.removeLayer(this);
							var marker_index = Globle.markerList.indexOf(this);
							delete Globle.markerList[marker_index];
							
							for (var marker = 0; marker < Globle.markerList.length; marker++) {
								if (typeof(Globle.markerList[marker]) !== 'undefined') {
									Globle.markerList[marker].removeEventListener('click', arguments.callee);
								} 
							}
							return true;  
						});
					}
				}
				
			});
		},
		//identify查询
		identify:function(){
			Globle.identifyControl = new L.Control.IdentifyControl({handler:'enabled',identifylayerId:Globle.dynamic._leaflet_id,identifysuccess:function(data){
//				alert(data.results.length);
//				左侧栏显示
				GloBeL();
				//查询结果显示
				QueryZHGL.showIdentifyResult(data);
				
			}}).addTo(Globle.map);
			$(".identify").click(function(){
				Globle.identifyControl.toggle();
			});
		},
		//地图放大
		mapZoomIn:function(){
			$(".zoom_in").click(function(e){
				Globle.map.zoomIn();
			});
		},
		//地图缩小
		mapZoomOut:function(){
			$(".zoom_out").click(function(e){
				Globle.map.zoomOut();
			});
		},
		addIconMap:function(){
			//地图切换
			var layers = [];
			for (var providerId in providers) {
			    layers.push(providers[providerId]);
			}
			Globle.ctrl = L.control.iconLayers(layers,{position:'bottomright'}).addTo(Globle.map);
		},
		//websocket动态获取数据
		trends:function(){
			//终端动态更新参数
			Globle.trendsPara={"isTerminalUpdateMap":false,"isVehicleUpdateMap":false,"isTerminalUpdateList":false,"isVehicleUpdateList":false,"isQueryCondition":false}
			var webSocket = new WebSocket('ws://localhost:8080/VehiclePosition/websocket');

			webSocket.onerror = function(event) {
				onError(event)
			};

			webSocket.onopen = function(event) {
				onOpen(event)
			};

			webSocket.onmessage = function(event) {
				onMessage(event)
			};

			function onMessage(event) {
				Globle.trendsUpdate(JSON.parse(event.data));
			}

			function onOpen(event) {
				//alert("start");
			}

			function onError(event) {
				alert(event.data);
			}

			function start() {
				webSocket.send('hello');
				return false;
			}
		},
		starttrends:function(){
			$.ajax({
				url:"http://localhost:8080/VehiclePosition/rest/service/TerminalService/queryTrends",
				type:"GET",
				success:function(data){
//					alert("start success!");
				}
			});
		},
		trendsUpdate:function(data){
			if(Globle.trendsPara.isQueryCondition){
				Globle.TempLayer.clearLayers();
				for(var i=0;i<data.vehicle.onlinelist.length;i++){
					var latlng = L.latLng(data.vehicle.onlinelist[i].y,
							data.vehicle.onlinelist[i].x);
					var marker = L.marker(latlng, {
						icon : new L.icon({
							iconUrl : '../../images/CLJK/cheliang.png',
							iconSize : [ 20, 24 ],
							iconAnchor : [ 10, 12 ]
						})
					}).bindPopup("车牌号:" + data.vehicle.onlinelist[i].no);
					//Globle.ClusterLayer.addLayer(marker);
				    Globle.TempLayer.addLayer(marker);
				}
                for(var j=0;j<data.vehicle.offlinelist.length;j++){
                	var latlng = L.latLng(data.vehicle.offlinelist[j].y,
                			data.vehicle.offlinelist[j].x);
					var marker = L.marker(latlng, {
						icon : new L.icon({
							iconUrl : '../../images/CLJK/cheliang.png',
							iconSize : [ 20, 24 ],
							iconAnchor : [ 10, 12 ]
						})
					}).bindPopup("车牌号:" + data.vehicle.offlinelist[j].no);
					//Globle.ClusterLayer.addLayer(marker);
				    Globle.TempLayer.addLayer(marker);
				}
			}
			//右上角实时数量更新
			$("#terminal_online").html(data.terminal.online+"部");
			$("#terminal_offline").html(data.terminal.offline+"部");
			$("#vehicle_online").html(data.vehicle.online+"辆");
			$("#vehicle_offline").html(data.vehicle.offline+"辆");
			
		},
		//地图添加动作监听
		mapEventListener:function(){
			Globle.map.addEventListener('zoomend',function(){
				$(".leaflet-zoom-animated").css("z-index","99999");
				Globle.trackingLayer();   //动态图层
				
			});
		},
		//右上角车辆终端快捷控制
		terminalAndVehicleControl:function(){
				$(".vehicle-state .cheliangshow").click(function(){
					if($(".vehicle-state .green-dot").length == 1){
						Globle.TempLayer.removeLayer(Globle.onlineVehicleLayer);
					}else{
						Globle.TempLayer.addLayer(Globle.onlineVehicleLayer);
					}
					toggleOnline(".vehicle-state .cheliangshow","green");
				});
				$(".vehicle-state .chelianghide").click(function(){
					if($(".vehicle-state .red-dot").length == 1){
						Globle.TempLayer.removeLayer(Globle.offlineVehicleLayer);
					}else{
						Globle.TempLayer.addLayer(Globle.offlineVehicleLayer)
					}
					toggleOnline(".vehicle-state .chelianghide","red");
				});
				$(".terminal-state .zhongduanshow").click(function(){
					if($(".terminal-state .green-dot").length == 1){
						Globle.TempLayer.removeLayer(Globle.onlineTerminalLayer);
					}else{
						Globle.TempLayer.addLayer(Globle.onlineTerminalLayer);
					}
					toggleOnline(".terminal-state .zhongduanshow","green");
				});
				$(".terminal-state .zhongduanhide").click(function(){
					if($(".terminal-state .red-dot").length == 1){
						Globle.TempLayer.removeLayer(Globle.offlineTerminalLayer);
					}else{
						Globle.TempLayer.addLayer(Globle.offlineTerminalLayer)
					}
					toggleOnline(".terminal-state .zhongduanhide","red");
				});
		},
		
		//添加动态服务
		dynamicService:function(){

			var url = "http://192.168.0.116:6080/arcgis/rest/services/GAS/trackLayer/MapServer";

			Globle.dynamicMapLayer = L.esri.dynamicMapLayer({
			  url: url,
			  opacity : 1
			});
			
			Globle.dynamicMapLayer.addTo(Globle.map);
			Globle.controlLayer();
		},
		controlLayer:function(){
			$.getJSON("http://192.168.0.116:6080/arcgis/rest/services/GAS/trackLayer/MapServer?f=pjson", function(json){
//				  alert("JSON Data: " + json);
				TrackLayer = json.layers;
				hashMap = {   
					    Set : function(key,value){this[key] = value},   
					    Get : function(key){return this[key]},   
					    Contains : function(key){return this.Get(key) == null?false:true},   
					    Remove : function(key){delete this[key]}   
					};
				hashLayer = {
						Set : function(key,value){this[key] = value},   
					    Get : function(key){return this[key]},   
					    Contains : function(key){return this.Get(key) == null?false:true},   
					    Remove : function(key){delete this[key]}  
				};
//				hashMap.Set("name","1");
				for (var i = 0; i < TrackLayer.length; i++) {
					if(json.layers[i].subLayerIds != null){
						hashMap.Set(json.layers[i].name,json.layers[i].subLayerIds);
					}else {
						hashLayer.Set(json.layers[i].id,json.layers[i].name);
					}
				}
				Globle.trackingLayer();   //初始化动态图层
			});
		},
		//动态图层选项卡
		trackingLayer:function(){
			var subLayerIds = hashMap.Get("L"+Globle.map.getZoom());  //当前图层要显示的元素
			var html = '<div class="selectLabel" style="box-shadow: 0 1px 0 #ccc;margin: 0 -5px; padding: 0 5px;">'+
							'<div class="checkbox">'+
								'<label>'+
									'<input type="checkbox" name="quanxuancheckbox"  checked="checked" />'+
									'<span class="radioFont">全选/不选</span>'+
								'</label>'+
							'</div>'+
							'<div class="clearfloat"></div>'+
						'</div>';
			for (var i = 0; i < subLayerIds.length; i++) {
				html += '<li>'+
							'<div class="checkbox">'+
								'<label>'+
									' <input type="checkbox" name="optionsRadios" value="option1" checked="checked">'+
									'<span class="radioFont" value="'+subLayerIds[i]+'">'+hashLayer.Get(subLayerIds[i])+'</span>'+
								'</label>'+
							'</div>'+
						'</li>'; 
			}
			
			$(".hidecheckbox").html(html);
			
			var $optionsRadios = $(".hidecheckbox input[name=optionsRadios]");
			$(".selectLabel .checkbox input[name=quanxuancheckbox]").click(function() {
					if (this.checked) {
						$optionsRadios.each(function() {
							this.checked=true;
						});
					} else {
						$optionsRadios.each(function() {
							this.checked=false;
						});
					}
			});
			
//			Globle.dynamicMapLayer.setLayers(subLayerIds); //显示当前级别的所有 图层
			$(".positionRight input").click(function(){
				var subLayerIds = [];
				for (var i = 0; i < $("input[name=optionsRadios]").parents('li').length; i++) {
					if ($("input[name=optionsRadios]").parents('li').eq(i).find("input").is(':checked')) {
						subLayerIds.push($("input[name=optionsRadios]").parents('li').eq(i).find("span").attr("value"));
					}
					
				}
//				subLayerIds.splice(jQuery.inArray(Array,subLayerIds),1); 
				if (subLayerIds.length == 0) {
					Globle.dynamicMapLayer.setLayers([1]);
				} else {
					Globle.dynamicMapLayer.setLayers(subLayerIds);
				}
			});
		}
}
