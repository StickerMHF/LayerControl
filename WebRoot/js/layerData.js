/*$(function(){
	ZHGL.init();
});*/
var mapService = "http://192.168.0.2:6080/arcgis/rest/services/server/yqscdcdt/MapServer/";
var LayerData=[
	{
		name:"井",   	 
		isHaveChildren:true,
		layerType:"multiple",			//图层类型：single（单层）、multiple（多层）
		layerIndex:"0",				//图层在服务中的序号
		open:false,
		checked:false,
		children:[
		    {
				name:"华北新层系",
				belongKey:"PROGRAM",
				belongText:"华北新层系油气资源战略选区调查",				//作业区名称
				isHaveChildren:true,
				serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
				groupByText:"WELLTYPE_1",		//serviceType为groupBy时填写
				open:false
			},{
				name:"天山-兴蒙-吉黑地区",
				belongKey:"PROGRAM",
				belongText:"天山-兴蒙-吉黑地区油气资源战略选区调查",
				isHaveChildren:true,
				serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
				groupByText:"WELLTYPE_1",
				open:false
			},{
				name:"武陵山地区页岩气",
				belongKey:"PROGRAM",
				belongText:"武陵山地区页岩气基础地质调查",
				isHaveChildren:true,
				serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
				groupByText:"WELLTYPE_1",
				open:false,
			},{
				name:"伦坡拉盆地远景区",
				belongKey:"PROGRAM",
				belongText:"伦坡拉盆地远景区油气资源战略选区调查",
				isHaveChildren:true,
				serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
				groupByText:"WELLTYPE_1",
				open:false
		},{
				name:"河西走廊盆地群",
				belongKey:"PROGRAM",
				belongText:"河西走廊盆地群油气基础地质调查",
				isHaveChildren:true,
				serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
				groupByText:"WELLTYPE_1",
				open:false
		},{
				name:"柴达木盆地重要页岩气",
				belongKey:"PROGRAM",
				belongText:"柴达木盆地重要页岩气远景区调查评价",
				isHaveChildren:true,
				serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
				groupByText:"WELLTYPE_1",
				open:false
		},{
				name:"滇黔桂页岩气",
				belongKey:"PROGRAM",
				belongText:" 滇黔桂页岩气基础地质调查",
				isHaveChildren:true,
				serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
				groupByText:"WELLTYPE_1",
				open:false
		},{
				name:"塔里木盆地油气资源",
				belongKey:"PROGRAM",
				belongText:"塔里木盆地油气资源战略选区项目",
				isHaveChildren:true,
				serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
				groupByText:"WELLTYPE_1",
				open:false
		},{
			name:"塔里木盆地",
			belongKey:"PROGRAM",
			belongText:"鄂尔多斯及周缘盆地群油气资源战略选区",
			isHaveChildren:true,
			serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
			groupByText:"WELLTYPE_1",
			open:false
	},{
		name:"准噶尔-吐哈-三塘湖",
		belongKey:"PROGRAM",
		belongText:"准噶尔-吐哈-三塘湖及周缘盆地油气基础地质调查",
		isHaveChildren:true,
		serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
		groupByText:"WELLTYPE_1",
		open:false
},{
	name:"非常规油气",
	belongKey:"PROGRAM",
	belongText:"非常规油气资源前景调查",
	isHaveChildren:true,
	serviceType:"groupBy",       	//groupBy:根据某个字段统计必须配置字段名称（groupByText）；query:查询符合条件的内容，并在目录树下一级展示，dynamic：动态展示图层
	groupByText:"WELLTYPE_1",
	open:false
}]
	},
	{
		name:"重磁电测线",   	 
		isHaveChildren:true,
		layerType:"single",			//图层类型
		layerIndex:"1",				//图层在服务中的序号
		open:false,
		checked:true
	}/*,
	{
		name:"地震测线",   	 
		isHaveChildren:true,
		layerType:"multiple",			//图层类型
		layerIndex:"3",				//图层在服务中的序号
		open:false,
		checked:true,
		children:[{
				name:"作业一区",
				belongKey:"SSZYQ",
				belongText:"作业一区",
				isHaveChildren:false,
				serviceType:"query",
				open:false
			},{
				name:"作业二区",
				belongKey:"SSZYQ",
				belongText:"作业二区",
				isHaveChildren:false,
				serviceType:"query",
				open:false
			},{
				name:"作业三区",
				belongKey:"SSZYQ",
				belongText:"作业三区",
				isHaveChildren:false,
				serviceType:"query",
				open:false
			},{
				name:"作业四区",
				belongKey:"SSZYQ",
				belongText:"作业四区",
				isHaveChildren:false,
				serviceType:"query",
				open:false
			},{
				name:"探井道路",
				belongKey:"SSZYQ",
				belongText:"探井道路",
				isHaveChildren:false,
				serviceType:"query",
				open:false
			}]
	},
	{
		name:"重磁电工区",   	 
		isHaveChildren:true,
		layerType:"multiple",			//图层类型
		layerIndex:"8",				//图层在服务中的序号
		open:false,
		checked:true,
		children:[{
				name:"作业一区",
				belongKey:"SSZYQ",
				belongText:"作业一区",
				isHaveChildren:false,
				serviceType:"query",
				open:false
			},{
				name:"作业二区",
				belongKey:"SSZYQ",
				belongText:"作业二区",
				isHaveChildren:false,
				serviceType:"query",
				open:false
			},{
				name:"作业三区",
				belongKey:"SSZYQ",
				belongText:"作业三区",
				isHaveChildren:false,
				serviceType:"query",
				open:false
			},{
				name:"作业四区",
				belongKey:"SSZYQ",
				belongText:"作业四区",
				isHaveChildren:false,
				serviceType:"query",
				open:false
			}]
	},
	{
		name:"地震工区",   	 
		isHaveChildren:true,
		layerType:"multiple",			//图层类型
		layerIndex:"9",				//图层在服务中的序号
		open:false,
		checked:true,
		children:[{
				name:"医疗",
				belongKey:"TYPE",
				belongText:"医疗",
				isHaveChildren:true,
				serviceType:"query",
				open:false
			},{
				name:"消防",
				belongKey:"TYPE",
				belongText:"消防",
				isHaveChildren:true,
				serviceType:"query",
				open:false
			},{
				name:"公安",
				belongKey:"TYPE",
				belongText:"公安",
				isHaveChildren:true,
				serviceType:"query",
				open:false
			},{
				name:"应急库",
				belongKey:"TYPE",
				belongText:"应急库",
				isHaveChildren:true,
				serviceType:"query",
				open:false
			}]
	},
	{
		name:"项目",   	 
		isHaveChildren:true,
		layerType:"multiple",			//图层类型
		layerIndex:"10",				//图层在服务中的序号
		open:false,
		checked:true,
		children:[{
					name:"作业一区",
					belongKey:"SSZYQ",
					belongText:"作业一区",
					isHaveChildren:true,
					serviceType:"query",
					open:false
				},{
					name:"作业二区",
					belongKey:"SSZYQ",
					belongText:"作业二区",
					isHaveChildren:true,
					serviceType:"query",
					open:false
				},{
					name:"作业三区",
					belongKey:"SSZYQ",
					belongText:"作业三区",
					isHaveChildren:true,
					serviceType:"query",
					open:false
				},{
					name:"作业四区",
					belongKey:"SSZYQ",
					belongText:"作业四区",
					isHaveChildren:true,
					serviceType:"query",
					open:false
				}]
	},
	{
		name:"页岩气区块",   	 
		isHaveChildren:true,
		layerType:"single",			//图层类型
		layerIndex:"11",				//图层在服务中的序号
		open:false,
		checked:true
	},
	{
		name:"盆地",   	 
		isHaveChildren:true,
		layerType:"single",			//图层类型
		layerIndex:"12",				//图层在服务中的序号
		open:false,
		checked:true
	},
	{
		name:"省级行政区划",   	 
		isHaveChildren:true,
		layerType:"single",			//图层类型
		layerIndex:"13",				//图层在服务中的序号
		open:false,
		checked:true
	},
	{
		name:"虚线",   	 
		isHaveChildren:true,
		layerType:"single",			//图层类型
		layerIndex:"14",				//图层在服务中的序号
		open:false,
		checked:true
	}
	,{
		name:"国",   	 
		isHaveChildren:true,
		layerType:"single",			//图层类型
		layerIndex:"15",				//图层在服务中的序号
		open:false,
		checked:true
	}*/
	];