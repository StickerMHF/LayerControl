var setting = {
    check: {
        enable: true
    },
    data: {
        key: {
            title: "title"
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        onCheck: onCheck
    }
};

var zNodes = 
	[
          	{
        		"id": 1,
        		"pId": 0,
        		"name": "气井",
        		"checked": true,
        		"open": true,
        		"controlType":"单井",
        		"layerIndex":0,
        	}, {
        		"id": "11",
        		"pId": 1,
        		"name": "作业一区",
        		"checked": true,
        		"open": true,
        		"controlType":"作业一区",
        		"layerIndex":0,
        	}, {
        		"id": "111",
        		"pId": "11",
        		"name": "苏东1站",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东1站",
        		"layerIndex":0,
        	}, {
        		"id": "112",
        		"pId": "11",
        		"name": "苏东2站",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东2站",
        		"layerIndex":0,
        	}, {
        		"id": "113",
        		"pId": "11",
        		"name": "苏东3站",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东3站",
        		"layerIndex":0,
        	}, {
        		"id": "114",
        		"pId": "11",
        		"name": "苏东5站",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东5站",
        		"layerIndex":0,
        	}, {
        		"id": "115",
        		"pId": "11",
        		"name": "苏东6站",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东6站",
        		"layerIndex":0,
        	}, {
        		"id": "116",
        		"pId": "11",
        		"name": "苏东4站",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东4站",
        		"layerIndex":0,
        	}, {
        		"id": "117",
        		"pId": "11",
        		"name": "苏东3X",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东3X",
        		"layerIndex":0,
        	}, {
        		"id": "118",
        		"pId": "11",
        		"name": "苏东16X",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东16X",
        		"layerIndex":0,
        	}, {
        		"id": "12",
        		"pId": 1,
        		"name": "作业二区",
        		"checked": true,
        		"open": true,
        		"controlType":"作业二区",
        		"layerIndex":0,
        	}, {
        		"id": "121",
        		"pId": "12",
        		"name": " ",
        		"checked": true,
        		"open": false,
        		"controlType":" ",
        		"layerIndex":0,
        	}, {
        		"id": "13",
        		"pId": 1,
        		"name": "作业三区",
        		"checked": true,
        		"open": true,
        		"controlType":"作业三区",
        		"layerIndex":0,
        	}, {
        		"id": "131",
        		"pId": "13",
        		"name": "苏东8站",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东8站",
        		"layerIndex":0,
        	}, {
        		"id": "132",
        		"pId": "13",
        		"name": " ",
        		"checked": true,
        		"open": false,
        		"controlType":" ",
        		"layerIndex":0,
        	}, {
        		"id": "133",
        		"pId": "13",
        		"name": "苏东7站",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东7站",
        		"layerIndex":0,
        	}, {
        		"id": "14",
        		"pId": 1,
        		"name": "作业四区",
        		"checked": true,
        		"open": true,
        		"controlType":"作业四区",
        		"layerIndex":0,
        	}, {
        		"id": "141",
        		"pId": "14",
        		"name": "苏东9站",
        		"checked": true,
        		"open": false,
        		"controlType":"苏东9站",
        		"layerIndex":0,
        	}, {
        		"id": "142",
        		"pId": "14",
        		"name": " ",
        		"checked": true,
        		"open": false,
        		"controlType":" ",
        		"layerIndex":0,
        	}
        ]
;

function onCheck(e, treeId, treeNode) {
    count();
    controlDynamicMap(treeNode);
    
}

function controlDynamicMap(treeNode){

	var level = treeNode.id.toString().substring(0,1),layerDefsStr="";
	switch (level) {
	case "a":
		layerDefsStr = getChildLayerDefs(treeNode);
		break;
	case "b":
		layerDefsStr = getChildLayerDefs(treeNode.getParentNode());
		break;
	case "c":
		layerDefsStr = getChildLayerDefs(treeNode.getParentNode().getParentNode());
		break;
	default:
		break;
	}
	dynamic.options.layerDefs[treeNode.layerIndex] = layerDefsStr;
	dynamic.setLayerDefs(dynamic.options.layerDefs);

}

function getChildLayerDefs(treeNode){
	var childLayerDefsTemp = "";
	var grandChildLayerDefsTemp = "";
	var flag = false;
	var children = treeNode.children;
	if(children){
		childLayerDefsTemp += "( ";
		grandChildLayerDefsTemp += "( ";
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			childLayerDefsTemp +=child.belongKey+"='"+child.belongText+(child.checked?"":"_no")+"' or ";
			var grandChildren = child.children;
			if(grandChildren){
				flag = true;
				for (var j = 0; j < grandChildren.length; j++) {
					var gchild = grandChildren[j];
					grandChildLayerDefsTemp +=gchild.belongKey+"='"+gchild.belongText+(gchild.checked?"":"_no")+"' or ";
					
				}
			}
		}
		childLayerDefsTemp = childLayerDefsTemp.substring(0, childLayerDefsTemp.length-4);
		grandChildLayerDefsTemp = grandChildLayerDefsTemp.substring(0, grandChildLayerDefsTemp.length-4);
		childLayerDefsTemp += " ) ";
		grandChildLayerDefsTemp += " )";
		
	}
	return childLayerDefsTemp+(flag?" and "+grandChildLayerDefsTemp:" ");
}


function setTitle(node) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = node ? [node] : zTree.transformToArray(zTree.getNodes());
    for (var i = 0, l = nodes.length; i < l; i++) {
        var n = nodes[i];
        n.title = "[" + n.id + "] isFirstNode = " + n.isFirstNode + ", isLastNode = " + n.isLastNode;
        zTree.updateNode(n);
    }
}
function count() {
    function isForceHidden(node) {
        if (!node.parentTId) return false;
        var p = node.getParentNode();
        return !!p.isHidden ? true : isForceHidden(p);
    }

    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        checkNodes = zTree.getCheckedNodes(true),
        checkCount = checkNodes.length,
        nocheckNodes = zTree.getCheckedNodes(false),
        nocheckCount = nocheckNodes.length,
        hiddenNodes = zTree.getNodesByParam("isHidden", true),
        hiddenCount = hiddenNodes.length;

    for (var i = 0, j = hiddenNodes.length; i < j; i++) {
        var n = hiddenNodes[i];
        if (isForceHidden(n)) {
            hiddenCount -= 1;
        } else if (n.isParent) {
            hiddenCount += zTree.transformToArray(n.children).length;
        }
    }
    
    
    
    
    $("#isHiddenCount").text(hiddenNodes.length);
    $("#hiddenCount").text(hiddenCount);
    $("#checkCount").text(checkCount);
    $("#nocheckCount").text(nocheckCount);
}
function showNodes() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getNodesByParam("isHidden", true);
    zTree.showNodes(nodes);
    setTitle();
    count();
}
function hideNodes() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getSelectedNodes();
    if (nodes.length == 0) {
        alert("请至少选择一个节点");
        return;
    }
    zTree.hideNodes(nodes);
    setTitle();
    count();
}

/*$(document).ready(function () {
//	ZHGL.init();
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
    //$.fn.zTree.init($("#treeDemo"), setting, zNodes);
    $("#hideNodesBtn").bind("click", {type: "rename"}, hideNodes);
    $("#showNodesBtn").bind("click", {type: "icon"}, showNodes);
    setTitle();
    count();
});*/

function showZtree(){
  //$.fn.zTree.init($("#treeDemo"), setting, zNodes);
  $.fn.zTree.init($("#treeDemo"), setting, ztreeNodes);
  $("#hideNodesBtn").bind("click", {type: "rename"}, hideNodes);
  $("#showNodesBtn").bind("click", {type: "icon"}, showNodes);
  setTitle();
  count();
}