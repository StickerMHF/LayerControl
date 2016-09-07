package com.sticker.terminal.model;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.text.StyledEditorKit.BoldAction;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

public class StructureTreeNode {
	public Map<String, JSONArray> turnStringToArr(String layerDataStr,
			String mapService) {
		// 目录树JSONArray
		JSONArray zTreeJsonArr = new JSONArray();
		JSONArray dynamicJsonArr = new JSONArray();
		JSONObject dynamicjson = new JSONObject();
		dynamicjson.put("url", mapService);
		List<Integer> layers = new ArrayList<Integer>();
		Map<Integer, String> layerDefs = new HashMap<Integer, String>();
		String layerDefsStr = "";
		// 一级目录
		if (layerDataStr != null) {
			JSONArray jsonArray = JSONArray.fromObject(layerDataStr);
			List<Map<String, Object>> mapListJson = (List) jsonArray;
			for (int i = 1; i < mapListJson.size() + 1; i++) {

				Map<String, Object> obj = mapListJson.get(i - 1);
				JSONObject json = new JSONObject();
				Integer layerIndex = Integer.parseInt(obj.get("layerIndex")
						.toString());
				String layerType = obj.get("layerType").toString();
				String layerDefsStrPart2 = "", layerDefsStrPart3 = "";

				json.put("id", "a" + i);
				json.put("pId", "0");
				json.put("name", obj.get("name"));
				json.put("checked", obj.get("checked"));
				json.put("open", obj.get("open"));
				json.put("layerIndex", layerIndex);
				zTreeJsonArr.add(json);

				layers.add(layerIndex);

				// 二级目录
				Boolean flag = false;
				if ("true".equals(obj.get("isHaveChildren").toString())
						&& "multiple".equals(layerType)) {
					JSONArray ja = JSONArray.fromObject(obj.get("children"));
					List<Map<String, Object>> subNode = (List) ja;
					for (int j = 1; j < subNode.size() + 1; j++) {
						Map<String, Object> subObj = subNode.get(j - 1);
						JSONObject subjson = new JSONObject();
						subjson.put("id", "b" + i + j);
						subjson.put("pId", "a" + i);
						subjson.put("name", subObj.get("name"));
						subjson.put("checked", obj.get("checked"));
						subjson.put("open", subObj.get("open"));
						subjson.put("belongKey", subObj.get("belongKey"));
						subjson.put("belongText", subObj.get("belongText"));
						subjson.put("layerIndex", layerIndex);
						zTreeJsonArr.add(subjson);

						layerDefsStrPart2 += getlayerDefsStr(
								subObj.get("belongKey"),
								subObj.get("belongText"), obj.get("checked"));

						// 三级目录
						if ("true".equals(subObj.get("isHaveChildren")
								.toString())) {
							flag = true;
							JSONArray features = null;
							String param = "";

							switch (subObj.get("serviceType").toString()) {
							case "query":
								param = "/"
										+ layerIndex
										+ "/query?where="
										+ subObj.get("belongKey").toString()
										+ "%3D%27"
										+ changeEncode(subObj.get("belongText")
												.toString())
										+ "%27"
										+ "&text=&objectIds=&time=&geometry="
										+ "&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam="
										+ "&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false"
										+ "&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false"
										+ "&returnM=false&gdbVersion=&returnDistinctValues=false&f=json";
								break;
							case "groupBy":
								param = "/"
										+ layerIndex
										+ "/query?where="
										+ subObj.get("belongKey").toString()
										+ "%3D%27"
										+ changeEncode(subObj.get("belongText")
												.toString())
										+ "%27"
										+ "&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects"
										+ "&relationParam=&outFields=*&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false"
										+ "&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics="
										+ subObj.get("groupByText").toString()
										+ "&outStatistics=%5B%7B\"statisticType\"%3A+\"count\"%2C\"onStatisticField\"%3A\""
										+ subObj.get("groupByText").toString()
										+ "\"%2C\"outStatisticFieldName\"%3A+\"count\"%7D%5D&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=json";
								break;
							case "dynamic":
								param = "/"
										+ layerIndex
										+ "/query?where=type%3D%27"
										+ changeEncode(subObj.get("type")
												.toString())
										+ "%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=name&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=json";
								break;
							default:
								break;
							}

							try {
								String urlPath = mapService + param;
								features = new GetPlaceByIp().readJsonFromUrl(
										urlPath).getJSONArray("features");
							} catch (UnsupportedEncodingException e2) {
								// TODO Auto-generated catch block
								e2.printStackTrace();
							} catch (JSONException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}

							List<Map<String, Object>> featuresList = (List) features;

							for (int k = 1; k < featuresList.size() + 1; k++) {
								Map<String, Object> lastObj = featuresList
										.get(k - 1);

								JSONObject lastjson = new JSONObject();
								String name = "", groupByText = "", serviceType = subObj
										.get("serviceType").toString();
								switch (serviceType) {
								case "query":
									name = JSONObject
											.fromObject(
													lastObj.get("attributes"))
											.get("WELLNAME").toString();
									layerDefsStrPart3 += getlayerDefsStr(
											"name", name, obj.get("checked"));
									break;
								case "groupBy":
									groupByText = subObj.get("groupByText")
											.toString();
									name = JSONObject
											.fromObject(
													lastObj.get("attributes"))
											.get(groupByText).toString();
									layerDefsStrPart3 += getlayerDefsStr(
											groupByText, name,
											obj.get("checked"));
									break;
								default:
									break;
								}

								lastjson.put("id", "c" + i + j + k);
								lastjson.put("pId", "b" + i + j);
								lastjson.put("name", name);
								lastjson.put("checked", obj.get("checked"));
								lastjson.put("open", false);
								lastjson.put("belongKey", "query"
										.equals(serviceType) ? "name"
										: groupByText);
								lastjson.put("belongText", name);
								lastjson.put("layerIndex", layerIndex);
								zTreeJsonArr.add(lastjson);
							}
						}
						// 三级结束
					}
				} else if ("true".equals(obj.get("isHaveChildren").toString())
						&& "single".equals(layerType)) {
					// System.out.println(subNode.get(0));
					JSONArray features = null;
					String param = "/"
							+ layerIndex
							+ "/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope"
							+ "&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset="
							+ "&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics="
							+ "&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=json";
					try {
						String urlPath = mapService + param;
						features = new GetPlaceByIp().readJsonFromUrl(urlPath)
								.getJSONArray("features");
					} catch (UnsupportedEncodingException e2) {
						// TODO Auto-generated catch block
						e2.printStackTrace();
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					List<Map<String, Object>> featuresList = (List) features;
					for (int j = 1; j < featuresList.size() + 1; j++) {
						Map<String, Object> subObj = featuresList.get(j - 1);

						JSONObject subjson = new JSONObject();
						String name = JSONObject
								.fromObject(subObj.get("attributes"))
								.get("测线编号").toString();

						layerDefsStrPart2 += getlayerDefsStr("测线编号", name,
								obj.get("checked"));

						subjson.put("id", "b" + i + j);
						subjson.put("pId", "a" + i);
						subjson.put("name", name);
						subjson.put("checked", obj.get("checked"));
						subjson.put("open", false);
						subjson.put("belongKey", "测线编号");
						subjson.put("belongText", name);
						subjson.put("layerIndex", layerIndex);
						zTreeJsonArr.add(subjson);
					}
				}
				// 二级结束
				if (flag) {
					layerDefsStr = getlayerDefsStr(layerDefsStrPart2) + " and "
							+ getlayerDefsStr(layerDefsStrPart3);
				} else {
					layerDefsStr = layerDefsStrPart2.substring(0,
							layerDefsStrPart2.length() - 4);
				}
				layerDefs.put(layerIndex, layerDefsStr);
			}
		}
		dynamicjson.put("layers", layers.toString());
		dynamicjson.put("layerDefs", layerDefs);
		dynamicJsonArr.add(dynamicjson);

		// System.out.println(zTreeJsonArr.toString());
		// System.out.println(dynamicjson.toString());
		Map<String, JSONArray> allneed = new HashMap<String, JSONArray>();
		allneed.put("ztree", zTreeJsonArr);
		allneed.put("dynamic", dynamicJsonArr);
		return allneed;
	}

	private static String changeEncode(String str) {
		String s = "";
		try {
			s = java.net.URLEncoder.encode(str, "utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return s;
	}

	private static String getlayerDefsStr(Object key, Object value, Object flag) {
		String str = "";
		if (flag.toString().equals("true")) {
			str = key.toString() + "='" + value.toString() + "' or ";
		} else {
			str = key.toString() + "='" + value.toString() + "_no' or ";
		}

		return str;
	}

	private static String getlayerDefsStr(String value) {
		String layerDefsStr = "(";
		layerDefsStr += value.substring(0, value.length() - 4);
		layerDefsStr += ")";
		return layerDefsStr;
	}

}
