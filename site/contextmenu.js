

var menuHandler = {

	"init":function(json, uniName) {
		var o = this.setupPtrs(json, uniName);
		this.gid = o.gid;
	
		return {"uni":this.uni, "gid":this.gid};
	},
	"setupPtrs":function(json, uniName) {
	
		this.uniName = uniName;
	

		var graph = new Graph();

		graph.setFromJSON(json);
	
		this.gid = graph.id;

		var g= new Gfx({"type":uniName, "ptr":[this.gid], "renderer":htmlRenderer, "baseElement": frame.contentDocument.body});
		g.hasIndex = false;
		this.gfxId = g.id;
	
		
		g.build();
		g.hide();
		this.cssType = //ca.pop();g.type
	
		g.setZ(10000);

		return {"gid":this.gid}
	},
	"getObj":function() {
	
	},
	"getLastPtr":function() {
		var a = copyArray(this.lastPtr);
		a.pop();
		return a;
	},

	"showMenu":function (e, gfxObj) {
		if (Gfx.prototype.isRenaming) return;
		var id = this.gid;
	
		this.lastRect = gfxObj;
	
		
		gfxLookup[this.gfxId].show();
		var pe = getPos(e);
	
		gfxLookup[this.gfxId].moveTo(pe.x, pe.y,  zIndex[gfxLookup[this.gfxId].type]);
		gfxLookup[this.gfxId].reindex();
		this.menuVisible = true;

	},
	
	"switchVisibility":function(e) {
	
		var id = this.gid;
	
		if (!gfxLookup[this.gfxId].isHidden()) {
			gfxLookup[this.gfxId].hide();
		
		} else {
			var cm = menuHandler.showMenu.bind({"gid":id, "gfxId":this.gfxId});
			cm(e);
		}
	},
	"hideMenu":function(e) {
		var id = this.gid;
	
		var h = gfxLookup[this.gfxId].isHidden()
		if (!h) {
		
			gfxLookup[this.gfxId].hide();
			this.menuVisible = false;		
			
		} else {
			// show context menu
		}
	},
	"menuToPtr": function(){
		getObject(graphLookup[id], graphLookup);

	},
	"ptrToMenu": function(){

	}
}


var contextMenu = Object.create(menuHandler);



contextMenu.setup = function(e) {

	var json = ['expand', 'hide', 'rename', 'remove', 'add child', 'add sibling', 'converge', 'split', 'copy', {'set type':["root", "program", "module"]}, {'set layout':["grid", "list"]}, 'evaluate'];
	var o = this.init(json, "contextmenu");

	// event processor needs to check if there is a specific event on the item node selected
	//
	events['contextmenu'] = contextEventHandler.prototype;
}

contextMenu.traverseProgram = function() {
	
	Point.prototype.traverseProgram(this.lastRect.nodeRoot)


}

contextMenu.hideLastPtr = function()  {
	gfxLookup[this.lastRect.gfxId].hideChildren(this.lastRect.nodeRoot);
}

contextMenu.showLastPtr = function(rect) {
	gfxLookup[this.lastRect.gfxId].showChildren(this.lastRect.nodeRoot);

}

contextMenu.renamePtr = function() {
	console.log(gfxLookup[this.lastRect.gfxId]);
	gfxLookup[this.lastRect.gfxId].mkInputBox(this.lastRect);
}

contextMenu.addSibling = function() {
	var id = this.lastRect.ptr[0];

	graphObjLookup[id].addSibling(this.lastRect.nodeRoot, "acid", contextMenu.cleanUpLines);
	gfxLookup[this.lastRect.gfxId].rebuild();	
}

contextMenu.addChild = function() {
	var id = this.lastRect.ptr[0];

	graphObjLookup[id].addChild(this.lastRect.nodeRoot, "acid", contextMenu.cleanUpLines);

	gfxLookup[this.lastRect.gfxId].rebuild();

}

contextMenu.cleanUpLines = function(o) {

	if (o.oldChild) {
		var oc = curveLookup[o.oldChild.join()]
		for (var g in oc) {
			if (oc[g] instanceof curveLine) {
				oc[g].delete();
			
			}
		}
	}
		
	if (o.oldParent) {
		var oc = curveLookup[o.oldParent.join()];
		for (var g in oc) {
			if (oc[g] instanceof curveLine) {
				oc[g].delete();
			
			}
		}
	}
}
contextMenu.remove = function() {
	var id = this.lastRect.ptr[0];
	var an = graphObjLookup[id].deleteNode(this.lastRect.nodeRoot, contextMenu.cleanUpLines);

//	it's a bit hackish becauase the gfxID is not supposed to rebuild the entire object
//	each subnode is supposed to be independant... 
//	the main issue is that the gfx object from the node doesnt get rebuilt.. but the entire object
//	the way i should do it is just recurse through the entire node
	gfxLookup[this.lastRect.gfxId].rebuild();
	// this code needs some fixing cuz the ptr link renderer should be tied to the gfx class

	var idHash = {};
	var hash = {};
	for (var key in an) {
		var o = an[key];
			var op = o;//o[i];
			console.log(op);
			console.log(this.lastRect.ptr);
			var oi = (getGraphObject(op));
			console.log(oi);
	
				hash[oi.gfx.ptr.gfxId] = true;
	
	}

	for (var k in hash) {
		gfxLookup[k].rebuild();
	}


}
contextMenu.test = function() {
	var pp = copyArray(this.lastRect.ptr);
	pp.pop();pp.pop();
	console.log(getGraphObject(pp));
}
contextMenu.setNodeType = function(type) {

	PtrGfx.prototype.setNodeType(this.lastRect, type);


}

contextMenu.setRootNode = function() {
	this.setNodeType('root');
	return;

}



contextMenu.setLayout = function(g) {


	this.lastRect.layout = g;
	gfxLookup[this.lastRect.gfxId].rebuild();

}


var stageMenu = Object.create(menuHandler);



stageMenu.setup = function() {
	var menu = ['evaluate', '_____', 'new node', '_____', 'save', 'load'];
	var o = this.init(menu, "stagemenu");
	events['stagemenu'] = stageEventHandler.prototype;
	events["screenClick"] = this.manageScreenClick.bind({gid:o.gid, gfxId:this.gfxId});
}


stageMenu.mksubmenu = function() {
	var m = Object.create(menuHandler);
	m.draw({"save as":[]});
}


stageMenu.manageScreenClick = function(e) {

	if (gfxLookup[this.gfxId].baseElement.ownerDocument.defaultView != e.view) return;
	var sv = menuHandler.switchVisibility.bind({gid:this.gid, gfxId:this.gfxId});
	var ok = true;
	if (Gfx.prototype.isRenaming) {
		ok = false;
		gfxLookup[this.gfxId].deselectInputBox();
	}
	if (contextMenu.menuVisible) {
	       ok = false;	
		contextMenu.hideMenu();
	}
	if (ok) sv(e);	
	return sv;
	
}

stageMenu.mkNewNode = function(e) {
	var graph = new Graph('ptr');
	var json = ['acid'];
	graph.setFromJSON(json, true);
	var pg = mkPtrGfx({"id":graph.id}); 
	var p = getPos(e);
	pg.moveTo(p.x, p.y);

	pg.build();
}

// draw the save / load dialogs
// dialogebox should be a basic dialog box which save and load could be furhter oo'd 


function dialog() {
}

dialog.prototype = Object.create(menuHandler);


// thinking this might be a rendering option from the htmlRenderer side......
dialog.prototype.addGrid = function(type, loc) {
}

dialog.prototype.buildUI = function(obj, ptr) {

	var json = obj;
	
	var o = this.init(json, "dialogmenu");
	// event processor needs to check if there is a specific event on the item node selected
	events[o.uni] = nodeEvents;

	return o;



}

function saveMenu() { };

saveMenu = Object.create(dialog.prototype);

saveMenu.setup = function(lastMenu) {

	var o = this.buildUI({"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"save as"}]}, {"inputbox":[{"text":"enterSomeText"}]}, {"button":[{"type":"onSubmit"}]}]}]}});


	graphLookup[o.gid]['item'][0]['item'][0].layout = "grid";


}

function saveHandler() { };
saveHandler.prototype = Object.create(userEvents.prototype);
saveHandler.prototype.handleMouseClick = function(obj, e) {
	var ca = copyArray(obj.rect.ptr);
	ca.pop(); 
	var lookup = lookups[obj.lookupName];
	var o = getObject(ca, lookup);
}

var subMenu = Object.create(menuHandler);

subMenu.draw = function(json) {
	var o = this.init(json);
	events[o.uni] = stageEventHandler
}



