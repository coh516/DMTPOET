
// this is really part of the user interface universe
// for now, this is ok.
// should really be menuHandler.prototype.init etc.... and copy the Object.create to the prototype there
var menuHandler = {

	"init":function(json, uniName, postMix) {
		//alert(evt);
		var o = this.setupPtrs(json, uniName, postMix);
		this.uni = o.uni;
		this.gid = o.gid;
		//events[o.uni] = this;
		//alert("xxx");
		return {"uni":this.uni, "gid":this.gid};
	},
	"setupPtrs":function(json, uniName, postMix) {
		//var o = init();
		this.uniName = uniName;
		var uni = new universe(uniName);

		var gid = uni.addGraph();

 		this.uni =uni;

		this.gid = gid;
		
		graphLookup[gid].setFromJSON(json);
		//alert(gfx)
		//
		//
		if (postMix)
			postMix(uni, gid);
		// 

		var g= new gfx(uni.id, gid);
	//	g.moveTo(0,100, 100);//gfxLookup[gid].topz+1);
		g.build();
		g.hide();
		//console.log(g);
		if (zIndex[uniName] === undefined)
			alert("xxxx");

		graphLookup[gid].el.style.zIndex = 10000;
		//zIndex[uniName]+1; 

		return {"gid":gid, "uni":uni.id}
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

	"showMenu":function (e, ptr) {
		if (gfx.prototype.isRenaming) return;
		var id = this.gid;
		//console.log(id + " <<< yo");
		//console.log([id].isRenaming);
		//if (this.isRenaming) { this.isRenaming = false; return }
		//if (gfx.prototype.isRenaming) return;
		//console.log("<SLKFJSDLF" + this.lastPtr);
		//if (this.lastPtr) console.log(this.lastPtr);
	
		this.lastPtr = ptr;
		
		//console.log("cleo the cat");
		var gph = models[this.uni]["graph"][this.gid];
		//var gf2 = gfxLookup[gpo.gid];
		var d = gph.el.style;
		//console.log(d);
		//console.log("_-----------------------_");
		d.display = ""; //"none" ? "" : "none";
		//alert("test...");
		gph["hidden"] =  false; //(d.display.length > 0)
		var pe = getPos(e);
		// update event table
		//alert(gfx.prototype.lastz);
		//console.log(gfx);
		
	//	alert("xxxxx: "+models[this.uni].type);
		gfxLookup[this.gid].moveTo(pe.x, pe.y,  zIndex[models[this.uni].type]);
		gfxLookup[this.gid].reindex();
		this.menuVisible = true;

		console.log("xxxxxxxxxxxxxxxx");	
	},
	
	"switchVisibility":function(e) {
		// this should be a gfx method...
		// 

		var id = this.gid;
		//var ptr = contextHandler.prototype.lastPTR;
		//console.log(id);
		var h = graphLookup[id]["hidden"]
		//alert(h);
		//if (gfxLookup[id].isRenaming) return;
		if (!h) {
			gfxLookup[id].hide();
			//var d = graphLookup[id].el.style;
			//d.display = "none";
			//graphLookup[id]["hidden"] = true;
		} else {
		//	if (gfx.isRenaming) return;
			var cm = menuHandler.showMenu.bind({"gid":id, "uni":this.uni});
			cm(e);
		}
	},
	"hideMenu":function(e) {
		//alert(this.id);
		var id = this.gid;
		//var ptr = contextHandler.prototype.lastPTR;
		var h = graphLookup[id]["hidden"]
		//alert(h);
		if (!h) {
			var d = graphics[id].el.style;
			d.display = "none";
			graphLookup[id]["hidden"] = true;
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



contextMenu.setup = function() {
	//put JSON in here
	//alert("test");
	var json = ['expand', 'hide', 'rename', 'remove', 'add child', 'add sibling', 'converge', 'split', 'copy', {'set type':["root", "program", "value"]}, {'set layout':["grid", "list"]}, 'evaluate'];
	var o = this.init(json, "contextmenu");

	//console.log("============================");
	//console.log(o);
	//console.log("____________________________");
	// event processor needs to check if there is a specific event on the item node selected
	//
	events[o.uni] = contextEventHandler.prototype;
}

contextMenu.traverseProgram = function() {
	//var id = this.lastPtr[0];
	
	traverseProgram(this.getLastPtr());

	// maybe a method should be m

	//graphLookup[id].addChild(a, "acid",

}

contextMenu.hideLastPtr = function()  {
	var lastPtr =  this.lastPtr;
	console.log(lastPtr);
	var id = lastPtr[0]
		var a = copyArray(lastPtr);
	a.pop(); //a.pop();
	gfxLookup[id].hideChildren(a);
}

contextMenu.showLastPtr = function() {
	var lastPtr =  this.lastPtr;
	//lastPTR.pop();lastPTR.pop();
	// access ptr from graphics
	var id = lastPtr[0];
	var a = copyArray(lastPtr);
	a.pop(); 
	gfxLookup[id].showChildren(a);
}

contextMenu.renamePtr = function() {
	// push textmenu div :)	
	//var id = this.lastPtr[0];
	//alert("test..");
	gfx.prototype.mkInputBox(this.lastPtr);
	//this.isRenaming = true;
	return;
}

contextMenu.addSibling = function() {
	var id = this.lastPtr[0];
	var a = copyArray(this.lastPtr);
	a.pop();//;a.pop();
	graphLookup[id].addSibling(a, "acid", contextMenu.cleanUpLines);
	gfxLookup[id].rebuild();	
}

contextMenu.addChild = function() {
	var id = this.lastPtr[0];
	var o = graphLookup[id];
	var a = copyArray(this.lastPtr);
	a.pop();
	graphLookup[id].addChild(a, "acid", contextMenu.cleanUpLines);
	//console.log("loooochi");
	gfxLookup[id].rebuild();
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
//
//

contextMenu.cleanUpLines = function(o) {
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
		/*	
		if (!curveLookup[pj]) curveLookup[pj] = {};
		if (!curveLookup[pj][cj]) curveLookup[pj][cj] = {}
		
		snapSpace.prototype.regObject([pj, cj, "rect"], "curveLookup");
		*/
		//getCurve
		
	} else if (o.oldParent) {
		var oc = curveLookup[o.oldParent.join()];
		for (var g in oc) {
			if (oc[g] instanceof curveLine) {
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
	var a = copyArray(this.lastPtr);
	//console.log(a);
	var b = copyArray(this.lastPtr);

	//alert(this.lastPtr.join());

	b.pop();
        //b.pop();
	var ca = copyArray(b);
	
	//var o = getObject(b, grraphLookup);
	//var oItems = o.gfx.length

	var idx = a[a.length-1];

	var o = getObject(b, graphLookup);
	//console.log(idx);
	//console.log(o);
	ca.push("index");

	graphLookup[b[0]].deleteNode(b, contextMenu.cleanUpLines);

	gfxLookup[b[0]].rebuild();
}
contextMenu.setNodeType = function(type) {
	var a = copyArray(this.lastPtr);
	a.pop();
	var id = a[0];
	var o = getObject(a, graphLookup)
	console.log(o);
	//console.log(o);
	//o.type = o.type == type ? "" : type;
	//o.type = "root";
	if (!o.types) o.types = {}
	
	o.types[type] = !o.types[type] 
	
	// this should be in the renderer (call re-render)
	// should be re-render node without rebuilding the entire tree
	var csstype = models[graphLookup[id].universeid].type;
	//csstype+="UL";
	var t = o.types[type];
	o.gfx.div.setAttribute(csstype+type, t ? "label": false);

	o.el.setAttribute(csstype+type, t ? "section":false);

	

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
	
	var csstype = models[graphLookup[id].universeid].type;
	//csstype+="UL";
	console.log(o);
	o.el.setAttribute(csstype+"root", o.root);
}

contextMenu.setGridLayout = function() {
	var b = copyArray(this.lastPtr);
	b.pop();
        //b.pop();

	var o = getObject(b, graphLookup);

	o.layout = "grid";
	gfxLookup[this.lastPtr[0]].rebuild();
	console.log(o);
	console.log("ohioioioioioioioioooooo");
}

contextMenu.setListLayout = function() {
	var lp = copyArray(this.lastPtr);
	lp.pop();
	//lp.pop();
	var o = getObject(lp, graphLookup);
	o.layout = "list";
	gfxLookup[this.lastPtr[0]].rebuild();
}


var stageMenu = Object.create(menuHandler);



stageMenu.setup = function() {
	// provide
	var menu = ['evaluate', '_____', 'new node', '_____', 'save', 'load'];
	var o = this.init(menu, "stagemenu");
	//console.log(o);
	//console.log("________________________________");
	events[o.uni] = stageEventHandler.prototype;
	events["screenClick"] = this.manageScreenClick.bind({gid:o.gid, uni:o.uni});
}


stageMenu.mksubmenu = function() {
	var m = Object.create(menuHandler);
	m.draw({"save as":[]});
}


stageMenu.manageScreenClick = function(e) {
	//if (!contextMenu.lastPtr) //return;
	var sv = menuHandler.switchVisibility.bind({gid:this.gid, uni:this.uni});
	//sv(e);
	var ok = true;
	if (gfx.prototype.isRenaming) {
		ok = false;
		gfx.prototype.deselectInputBox();
	}
	if (contextMenu.menuVisible) {
	       ok = false;	
		contextMenu.hideMenu();
	}
	if (ok) sv(e);	
	return sv;
	
}

stageMenu.mkNewNode = function(e) {
	var pid = universes["ptr"][0];
	var gid = pid.addGraph();
	var json = ['acid'];
	graphLookup[gid].setFromJSON(json, true);
	//graphLookup[gid].indexPtr = true;
	var gf = new gfx(pid, gid);
	var p = getPos(e);
	gf.moveTo(p.x, p.y);
	//gf.setXYZ();
	//gf.build();
	gf.build();
	events[pid] = nodeEvents;
}

// draw the save / load dialogs
// dialogebox should be a basic dialog box which save and load could be furhter oo'd 


function dialog() {
}

dialog.prototype = Object.create(menuHandler);


// thinking this might be a rendering option from the htmlRenderer side......
dialog.prototype.addGrid = function(type, loc) {
}

dialog.prototype.buildMenu = function(obj, ptr) {

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

	var o = this.buildMenu( {"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"save as"}]}, {"inputbox":[{"text":"kkk"}]}, {"button":[{"onSubmit":"kkk"}]}]}, {"row":[{"dropdown":"values"}, {"xxx":"xxx"}, {"button":"button"}]}]}});

	// should be new point([o.gid]['item'][0]) .. that's not done yet
	//var ptr = [[o.gid]['item'][0]];
	graphLookup[o.gid]['item'][0]['item'][0].layout = "grid";

	graphLookup[o.gid].switchType([[o.gid],['item'],[0], ['item'], [0]], "program");
	
	var g = gfxLookup[o.gid].rebuild();
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



