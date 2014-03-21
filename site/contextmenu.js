
// this is really part of the user interface universe
// for now, this is ok.
// should really be menuHandler.prototype.init etc.... and copy the Object.create to the prototype there
var menuHandler = {

	"init":function(json, uniName) {
		//alert(evt);
		var o = this.setupPtrs(json, uniName);
	//	this.uni = o.uni;
		this.gid = o.gid;
		//events[o.uni] = this;
		//alert("xxx");
		return {"uni":this.uni, "gid":this.gid};
	},
	"setupPtrs":function(json, uniName) {
		//var o = init();
		//
		this.uniName = uniName;
		//var uni = new universe();

		var graph = new Graph();//uni.addGraph();

 		//this.uni =uni;

		graph.setFromJSON(json);
		//alert(gfx)
		//
		//

		// need to figure how to connect the nodes and execute the point.....
		this.gid = graph.id;

		var g= new Gfx({"type":uniName, "ptr":[this.gid], "renderer":htmlRenderer, "baseElement": frame.contentDocument.body});
		g.hasIndex = false;
		this.gfxId = g.id;
		//g.create(graph.id);  //uniName, [gid], htmlRenderer);
	//	g.moveTo(0,100, 100);//gfxLookup[gid].topz+1);
		//console.log(g);
		//console.log(this.gfxId);
		
		g.build();
		g.hide();
		this.cssType = g.type
		//console.log(g);

		//if (zIndex[uniName] === undefined)
		//	alert("xxxx");

		g.setZ(10000);
		//zIndex[uniName]+1; 

		return {"gid":this.gid}
	},
	"getObj":function() {
		//var gp = contextHandler.prototype;
		//return { "gid": gp.gid, "uni": gp.uni };
	},
	"getLastPtr":function() {
		var a = copyArray(this.lastPtr);
		a.pop();
		return a;
	},

	"showMenu":function (e, gfxObj) {
		if (Gfx.prototype.isRenaming) return;
		var id = this.gid;
		//console.log(id + " <<< yo");
		//console.log([id].isRenaming);
		//if (this.isRenaming) { this.isRenaming = false; return }
		//if (gfx.prototype.isRenaming) return;
		//console.log("<SLKFJSDLF" + this.lastPtr);
		//if (this.lastPtr) console.log(this.lastPtr);
		//gfxLookup[this.gfxId].rootGfxObj
		//this.cssType = gfxObj.cssType;
		//this.lastGfx = gfxObj;
		this.lastRect = gfxObj;
		
		//console.log("cleo the cat");
	//	var gph = models[this.uni]["graph"][this.gid];
		//var gf2 = gfxLookup[gpo.gid];
	//	var d = gph.el.style;
		//console.log(d);
		//console.log("_-----------------------_");
	//	d.display = ""; //"none" ? "" : "none";
		//alert("test...");
	//	gph["hidden"] =  false; //(d.display.length > 0)
		
		gfxLookup[this.gfxId].show();
		var pe = getPos(e);
		// update event table
		//alert(gfx.prototype.lastz);
		//console.log(gfx);
		
	//	alert("xxxxx: "+models[this.uni].type);
		gfxLookup[this.gfxId].moveTo(pe.x, pe.y,  zIndex[gfxLookup[this.gfxId].type]);
		gfxLookup[this.gfxId].reindex();
		this.menuVisible = true;

		console.log("xxxxxxxxxxxxxxxx");	
	},
	
	"switchVisibility":function(e) {
		// this should be a gfx method...
		// 

		var id = this.gid;
		//var ptr = contextHandler.prototype.lastPTR;
		//console.log(id);
		//var h = gfxLookup[this.gfxId]["hidden"]
		//alert(h);
		//if (gfxLookup[id].isRenaming) return;
		if (!gfxLookup[this.gfxId].isHidden()) {
			console.log(this);
			gfxLookup[this.gfxId].hide();
			//var d = graphLookup[id].el.style;
			//d.display = "none";
			//graphLookup[id]["hidden"] = true;
		} else {
		//	if (gfx.isRenaming) return;
			var cm = menuHandler.showMenu.bind({"gid":id, "gfxId":this.gfxId});
			cm(e);
		}
	},
	"hideMenu":function(e) {
		//alert(this.id);
		var id = this.gid;
		//var ptr = contextHandler.prototype.lastPTR;
		//var h = graphLookup[id]["hidden"]
		var h = gfxLookup[this.gfxId].isHidden()
		//alert(h);
		if (!h) {
			//var d = graphics[id].el.style;
			//d.display = "none";
			//graphLookup[id]["hidden"] = true;
			gfxLookup[this.gfxId].hide();
			this.menuVisible = false;		
			
		} else {
			// show context menu
		}
	},
	"menuToPtr": function(){
//		graphics["
		getObject(graphLookup[id], graphLookup);

	},
	"ptrToMenu": function(){

	}
}

// should be used as a prototype

var contextMenu = Object.create(menuHandler);



contextMenu.setup = function(e) {

	var json = ['expand', 'hide', 'rename', 'remove', 'add child', 'add sibling', 'converge', 'split', 'copy', {'set type':["root", "program", "module"]}, {'set layout':["grid", "list"]}, 'evaluate'];
	var o = this.init(json, "contextmenu");

	// event processor needs to check if there is a specific event on the item node selected
	//
	events['contextmenu'] = contextEventHandler.prototype;
}

contextMenu.traverseProgram = function() {
	//var id = this.lastPtr[0];
	
	Point.prototype.traverseProgram(this.lastRect.nodeRoot)
		/*
	var pathList = Graph.prototype.getPaths(this.lastRect.nodeRoot);

	ca.pop();
	var o = getGraphObject(this.lastRect.nodeRoot);
	var delRoot = false;

	// do this a bit cleaner for deliniating phrases
	if (!o.types) {
		o.types = {"root":true};
		delRoot = true;
	}
	if (!o.types.root) {
		o.types.root = true;
		delRoot = true;
	}

	console.log(o);
//	return;
	for (var i = 0 ; i < o.index.length; i++) {
	//	alert(o.ptr.join());
		var oc = copyArray(o.ptr);
		oc = oc.concat(['index', i]);
		
		var sys = new System(oc, pathList);
		sys.begin();
		//pt.evaluatePhrase();
	}
	if (delRoot) delete o.types.root;

	//point.evaluate();

	// maybe a method should be m

	//graphLookup[id].addChild(a, "acid",
	*/

}

contextMenu.hideLastPtr = function()  {
	// not right!	
	gfxLookup[this.lastRect.gfxId].hideChildren(this.lastRect.nodeRoot);
}

contextMenu.showLastPtr = function(rect) {
	gfxLookup[this.lastRect.gfxId].showChildren(this.lastRect.nodeRoot);

}

contextMenu.renamePtr = function() {
//	alert('xxx');
	console.log(gfxLookup[this.lastRect.gfxId]);
	gfxLookup[this.lastRect.gfxId].mkInputBox(this.lastRect);
//	gfxLookup[this.lastRect.gfxId].renamePtr(this.lastRect.nodeRoot);
}

contextMenu.addSibling = function() {
	var id = this.lastRect.ptr[0];
//	var a = copyArray(this.lastRect.nodeRoot);
	//a.pop();//;a.pop();
	//this makes no sense .. cleanUpLines should be part of gfx.......
	graphObjLookup[id].addSibling(this.lastRect.nodeRoot, "acid", contextMenu.cleanUpLines);
	gfxLookup[this.lastRect.gfxId].rebuild();	
}

contextMenu.addChild = function() {
	var id = this.lastRect.ptr[0];

	graphObjLookup[id].addChild(this.lastRect.nodeRoot, "acid", contextMenu.cleanUpLines);
	//console.log("loooochi");
	
	// need to delete all the curves..


	gfxLookup[this.lastRect.gfxId].rebuild();
	/*
	var id = this.lastPtr[0];
	var o = getObject(this.lastPtr, graphics);
	console.log(o);
	var ca = copyArray(o.ptr);
	ca.pop();ca.pop();
	var item = getObject(ca, graphics);
	*/
}

//
//
// this should bemoved to be part of the curvelines.... not here... anything but here! omg! no!
// ugh.
//
// this is kinda weird, because the graph renderer should just re-render all adjascent nodes anyway 
// i think it's a poor design to do this
// the link curve should delete all the lines, then do a redraw on them
// this is a pain in the ass to re-render for other renderers...
// but i guess it's ok for now.. just a poor design
contextMenu.cleanUpLines = function(o) {
	console.log(o);
	console.log("--==");
	/*
	if (o.oldChild && o.oldParent) {

		var pj = o.oldParent.join();
		var cj = o.oldChild.join();
		console.log(o.oldChild+" "+o.oldParent);
	//	console.log(curveLookup[pj]);	
	//	snapSpace.prototype.updateSnapObject(pj, "curveLookup");
		console.log(pj+" <pj:: "+cj);
	//	for (var g in curveLookup) console.log(g);
	//	if (curveLookup[cj]) {
			curveLookup[cj][pj].delete();
	//	} 
	//	if (curveLookup[pj]) 
	//		alert("test....");
		//return;	
		//var curve = getCurve(o.oldParent, o.newChild);
		//curve.register();
	//	/*	
		if (!curveLookup[pj]) curveLookup[pj] = {};
		if (!curveLookup[pj][cj]) curveLookup[pj][cj] = {}
		
		snapSpace.prototype.regObject([pj, cj, "rect"], "curveLookup");
		*/
		//getCurve
		
	//} 
	//alert(JSON.stringify(o));
	if (o.oldChild) {
		var oc = curveLookup[o.oldChild.join()]
		for (var g in oc) {
			if (oc[g] instanceof curveLine) {
			//	alert('test...1');
				oc[g].delete();
				//var curve = getCurve(o.newParent, [g])
				/*
				var pj = o.oldParent.join();
				if (!curveLookup[pj][g]) curveLookup[pj][g] = {};			
				snapSpace.prototype.regObject([o.oldParent.join(), g, "rect"], "curveLookup");
				*/
			}
		}
	}
		
	if (o.oldParent) {
		var oc = curveLookup[o.oldParent.join()];
		for (var g in oc) {
			if (oc[g] instanceof curveLine) {
			//	alert('test...2');
				oc[g].delete();
				//var curve = getCurve(o.newParent, [g])
				/*
				var pj = o.oldParent.join();
				if (!curveLookup[pj][g]) curveLookup[pj][g] = {};			
				snapSpace.prototype.regObject([o.oldParent.join(), g, "rect"], "curveLookup");
				*/
			}
		}
	}
}
// i think this should be in a general user interface class...... 
contextMenu.remove = function() {
	var id = this.lastRect.ptr[0];
	//alert("test...");
	graphObjLookup[id].deleteNode(this.lastRect.nodeRoot, contextMenu.cleanUpLines);
	//console.log("loooochi");
	gfxLookup[this.lastRect.gfxId].rebuild();

}
// should be in gfx
contextMenu.setNodeType = function(type) {
	/*
	var a = copyArray(this.lastPtr);
	a.pop();
	var id = a[0];
	var o = getObject(a, graphLookup)
	*/ // gotta fix this fucking api 
	PtrGfx.prototype.setNodeType(this.lastRect, type);
	/*
	var o = getGraphObject(this.lastRect.nodeRoot)
//	var p = getGraphObject(this.lastRect.)
//	console.log("xxxxxxxxxxxxxxxxxxxxx");
	//console.log(o);
	//o.type = o.type == type ? "" : type;
	//o.type = "root";
	 if (!o.types) o.types = {}
	
	o.types[type] = !o.types[type] 
	
	// this should be in the renderer (call re-render)
	// should be re-render node without rebuilding the entire tree
	var csstype = this.lastRect.cssType; //models[graphLookup[id].universeid].type;
	//csstype+="UL";
	var t = o.types[type];
	console.log("-------");
	console.log(this.lastRect);
	this.lastRect.div.setAttribute(csstype+type, t ? "label": false);

	this.lastRect.el.setAttribute(csstype+type, t ? "section":false);
	*/
	

}

contextMenu.setRootNode = function() {
	this.setNodeType('root');
	return;
	var a = copyArray(this.lastPtr);
	var id = a[0];
	var o = graphLookup[id];
	//console.log(o);
	o.root = o.root ? false : true;//; // == "root" ? "" : "root";
	//o.type = "root";
	
	var csstype = this.cssType; //models[graphLookup[id].universeid].type;
	//csstype+="UL";
	console.log(o);
	o.el.setAttribute(csstype+"root", o.root);
}



contextMenu.setLayout = function(g) {

	//var o = getGraphObject(this.lastRect)

	this.lastRect.layout = g;
	gfxLookup[this.lastRect.gfxId].rebuild();

	/*
	var lp = copyArray(this.lastPtr);
	lp.pop();
	//lp.pop();
	var o = getObject(lp, graphLookup);
	o.layout = "list";
	gfxLookup[this.lastPtr[0]].rebuild();
	*/
}


var stageMenu = Object.create(menuHandler);



stageMenu.setup = function() {
	// provide
	var menu = ['evaluate', '_____', 'new node', '_____', 'save', 'load'];
	var o = this.init(menu, "stagemenu");
	//console.log(o);
	//console.log("________________________________");
	events['stagemenu'] = stageEventHandler.prototype;
	events["screenClick"] = this.manageScreenClick.bind({gid:o.gid, gfxId:this.gfxId});
}


stageMenu.mksubmenu = function() {
	var m = Object.create(menuHandler);
	m.draw({"save as":[]});
}


stageMenu.manageScreenClick = function(e) {
	//if (!contextMenu.lastPtr) //return;
	//(rect.div.ownerDocument.defaultView != e.view)
	if (gfxLookup[this.gfxId].baseElement.ownerDocument.defaultView != e.view) return;
	var sv = menuHandler.switchVisibility.bind({gid:this.gid, gfxId:this.gfxId});
	//sv(e);
	var ok = true;
	// should be 'get renaming'
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
//	var pid = universes["ptr"][0];
	var graph = new Graph('ptr');// pid.addGraph();
	var json = ['acid'];
	graph.setFromJSON(json, true);
	//graphLookup[gid].indexPtr = true;
	var pg = mkPtrGfx({"id":graph.id}); 
	//pg.create(graph.id); //pid, gid);
	var p = getPos(e);
	pg.moveTo(p.x, p.y);
	//gf.setXYZ();
	//gf.build();
	pg.build();
//	events[pid] = nodeEvents;
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
	//console.log(o);
	//console.log("____________________________");
	// event processor needs to check if there is a specific event on the item node selected
	events[o.uni] = nodeEvents;

	return o;


	/*
	switch (obj.type) {
		case "input": 
			// mkInputBox(ptr);
			break;
		case "listbox":
			// mkGridLayout(ptr);
			break;
		case "button":
			break;
	}
	*/
}

function saveMenu() { };

saveMenu = Object.create(dialog.prototype);

saveMenu.setup = function(lastMenu) {

	var o = this.buildUI({"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"save as"}]}, {"inputbox":[{"text":"enterSomeText"}]}, {"button":[{"type":"onSubmit"}]}]}]}});

	// should be new point([o.gid]['item'][0]) .. that's not done yet
	//var ptr = [[o.gid]['item'][0]];
	graphLookup[o.gid]['item'][0]['item'][0].layout = "grid";

	//graphLookup[o.gid].switchType([[o.gid],['item'],[0], ['item'], [0]], "program");
	
	//var g = gfxLookup[o.gid].rebuild();
}
//saveMenu.setup();

function saveHandler() { };
saveHandler.prototype = Object.create(userEvents.prototype);
saveHandler.prototype.handleMouseClick = function(obj, e) {
	var ca = copyArray(obj.rect.ptr);
	//ca.splice(ptr.length-2, 2);
	ca.pop(); //ca.pop();
	var lookup = lookups[obj.lookupName];
	var o = getObject(ca, lookup);
}

var subMenu = Object.create(menuHandler);

subMenu.draw = function(json) {
	var o = this.init(json);
	events[o.uni] = stageEventHandler
}



