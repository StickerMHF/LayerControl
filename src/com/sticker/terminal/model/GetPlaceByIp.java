package com.sticker.terminal.model;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;
 
/**
 * java根据 url获取 json对象
 * @author openks
 * @since 2013-7-16
 *  需要添加java-json.jar才能运行
 */
public class GetPlaceByIp {
 
  private String readAll(Reader rd) throws IOException {
    StringBuilder sb = new StringBuilder();
    int cp;
    while ((cp = rd.read()) != -1) {
      sb.append((char) cp);
    }
    return sb.toString();
  }
 
  public JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
    InputStream is = new URL(url).openStream();
    
    try {
      BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
      String jsonText = readAll(rd);
      JSONObject json =JSONObject.fromObject(jsonText);// new JSONObject(jsonText);
      return json;
    } finally {
      is.close();
     // System.out.println("同时 从这里也能看出 即便return了，仍然会执行finally的！");
    }
  }
 
  public static void main(String[] args) throws IOException, JSONException {
      //这里调用百度的ip定位api服务 详见 http://api.map.baidu.com/lbsapi/cloud/ip-location-api.htm
	  for (int i = 0; i < 100; i++) {
		  JSONObject json = new GetPlaceByIp().readJsonFromUrl("http://192.168.0.199:6080/arcgis/rest/services/pointlayer/MapServer/0/query?where=type%3D%27%E9%9B%86%E6%B0%94%E7%AB%99%27+and+belong%3D%27%E4%BD%9C%E4%B8%9A%E4%B8%80%E5%8C%BA%27&geometryType=esriGeometryEnvelope&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson");
//		  System.out.println(json.toString());
	  }
  }
  
  
}