function getlLineLatlngs(str){
//	var temp = str.split(";");
	var ll,latlngs = [];
	for (var i = 0; i < str.length; i++) {
		
		ll = L.latLng(str[i][1],str[i][0]);
		latlngs.push(ll);
	}
	return latlngs;
}


//获取url中的参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
}
//获取url中的锚点
function getUrlAnchor() {
	if(window.location.href.indexOf("#") != -1){
		return window.location.href.substring(window.location.href.indexOf("#")+1, window.location.href.length).toUpperCase();
	}else {
		return "unknow";
	}
}

function getQueryString(key){
    var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
  }

//计算两个点之间的距离
var EARTH_RADIUS = 6378137.0;    //单位M
var PI = Math.PI;

function getRad(d){
    return d*PI/180.0;
}
/**
 * approx distance between two points on earth ellipsoid
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
function getFlatternDistance(latLng1,latLng2){
	
	var lat1 = parseFloat(latLng1.split(",")[0]);
	var lng1 = parseFloat(latLng1.split(",")[1]);
	var lat2 = parseFloat(latLng2.split(",")[0]);
	var lng2 = parseFloat(latLng2.split(",")[1]); 
   
	var f = getRad((lat1 + lat2)/2);
    var g = getRad((lat1 - lat2)/2);
    var l = getRad((lng1 - lng2)/2);
    
    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);
    
    var s,c,w,r,d,h1,h2;
    var a = EARTH_RADIUS;
    var fl = 1/298.257;
    
    sg = sg*sg;
    sl = sl*sl;
    sf = sf*sf;
    
    s = sg*(1-sl) + (1-sf)*sl;
    c = (1-sg)*(1-sl) + sf*sl;
    
    w = Math.atan(Math.sqrt(s/c));
    r = Math.sqrt(s*c)/w;
    d = 2*w*a;
    h1 = (3*r -1)/2/c;
    h2 = (3*r +1)/2/s;
    
    return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
}

//时间转换
function formatSeconds(e) {
	var value = e*60;
    var theTime = parseInt(value);// 秒

    var theTime1 = 0;// 分

    var theTime2 = 0;// 小时

    if(theTime > 60) {

        theTime1 = parseInt(theTime/60);

        theTime = parseInt(theTime%60);

            if(theTime1 > 60) {

            theTime2 = parseInt(theTime1/60);

            theTime1 = parseInt(theTime1%60);

            }

    }

        var result = "";

        if(theTime1 > 0) {

        result = ""+parseInt(theTime1)+"分"+result;

        }

        if(theTime2 > 0) {

        result = ""+parseInt(theTime2)+"小时"+result;

        }

    return result;

}
//获取系统当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}