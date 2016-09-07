package com.sticker.terminal.control;

import java.util.Map;

import net.sf.json.JSONArray;

import com.jfinal.core.Controller;
import com.sticker.terminal.model.StructureTreeNode;

public class OperationController extends Controller {
	private StructureTreeNode stn = new StructureTreeNode();
	
	public void index() {
		renderJson("sss");
	}	
	public void rebulidJson(){
		String layerData = getPara("layerData");
		String mapService = getPara("mapService");
		Map<String,JSONArray> ss= stn.turnStringToArr(layerData,mapService);
		renderJson(ss);
	}
}
