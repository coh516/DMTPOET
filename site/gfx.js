/*

Copywrite 2013, 4thTemple.com, FourthTemple.com
2013 Seth Tenenbaum
*/

// launch this on start
// let's start by polluting the global scope more

//var bigAssCanvas = 
var graphics = graphLookup; // probably this should be a subset from gfxLookup // this is the completed image  
var gfxLookup = {}; // object references by id
var events = {}
lookups["gfxLookup"] = gfxLookup;
gfxCounter = {};


// this needs to be merged with the general graph



function gfx(uid, id) {
	//alert("test....");
	this.gid= id;
	this.id = id;
	this.uid = uid;
	// should get rid of this reference
	this.model = graphLookup[id];
	//var id = gid;
	//graphics[id] = {}
	//console.log(this.model);
	//console.log("**************************************");
	var ng = 0;
	//console.log(id);
//	for (var g in graphics);
//	ng++;
	gfxLookup[id] = this;
	//div = document.createElement("div");
	//this.indexedModel = graphics[id]; 
	
	//thisGfx = this;
	//var gfxLookup
	//this.indexedModel = indexedModel;

//	build();
	if (!gfx.prototype.setted) {
		this.setupNodeEvents(this.id, this.uid);
	gfx.prototype.setted = true;
	}
}

gfx.prototype = {
	"ptrs":{},
	"img":{},
	"ptrModel":{},
	"idxSort":[],
	"linkSize":10,
	"fontSize":28,

	// there should be a property set in the graph object which defines this ptr to be an input box...
	// this input box shit has to be put into the html renderer...
	// type = "inputBox" -- then re-indexed
	// after refresh, should it display (it should go through a subtle intermediate phase)
	//
	// as well, these specific node things should be subsetted with their respective functions ... 


	"setupNodeEvents": function (id, uid) {
		var c4n = gfx.prototype.checkForEnter; //.bind({gid:this.id, uni:this.uid});
		gfx.prototype.c4n = c4n;
		window.addEventListener('keypress', c4n, true);
		//if (!events["screenClick"]) events["screenClick"] = [];
		//events["screenClick"].push(gfx.prototype.deselectInputBox);
	},
	"checkForEnter": function(e) {
	       	//alert("test...");	
		if (e.keyCode == 13 && gfx.prototype.isRenaming) {
				
			var n = gfx.prototype.deselectInputBox.bind({gid:this.gid})();
			
			//window.removeEventListener('keypress', stageMenu.checkForEnter, true);
		}
	},
	"deselectInputBox": function() {
		//alert("TEST..");
		//var t = gfxLookup.isRenaming;
		var ptr = gfx.prototype.isRenaming;
		//alert(ptr);
		if (ptr) { //gfx.prototype.isRenaming) { // renaming case
			//console.log("-----");
			//console.log(contextMenu.lastPtr);
			
			var o = getObject(ptr, graphLookup);
			//console.log(t);
			if (!o.inputBox) console.log(o);
			var it = o.inputBox.value;
			//	return;
			
			o.inputBox.parentNode.removeChild(o.inputBox);
			o.hiddenInputBox.parentNode.removeChild(o.hiddenInputBox);	
			//o.div.innerText = it;
			
			var p = copyArray(ptr);
			p.pop(); 
			var id = ptr[0];
			console.log(it);
			console.log(p);
			console.log("MEOOOOOOOOOOOOOOOOWWWWWWWWWWWWWWWWWWWWWWWW");	
			graphLookup[id].renamePtr(p, it);
			gfx.prototype.isRenaming = false;
			delete events[id];
			//for (var i=0; i < 100; i++)
			gfxLookup[id].rebuild();
		}
	},
	// this should do something silly  like f(ptr).type = "inputBox"; reindex();
	"mkInputBox":function(ptr) {
		// push textmenu div :)
		console.log(ptr + "<<<<>>>>>");	
		var id = ptr[0];
		var o = getObject(ptr, graphLookup);
		//console.log(o);
		var ca = copyArray(ptr);
		ca.pop();//ca.pop();
		var item = getObject(ca, graphics);
		var d = o.div;
		d.innerText = "";

		var ib = document.createElement("input");
		var ibc = document.createElement("input");

		ib.type = "text";
		ibc.type = "text";
		//ib.style.zIndex = "2000000";
		ib.value = item.value; 
		d.appendChild(ib);
		//d.style.width = d.offsetWidth + "px";
		//d.style.height = d.offsetHeight + "px";
		//d.removeChild(ib);
		//the idea is to create a hidden area and an absolute
		// position one .. this way you can keep the svg layer
		// between the two
		var xy = getElPos(d);
		ib.style.visibility = "hidden";
		ibc.value = item.value;
		ibc.style.position = "absolute";
		// next quantized level after svg
		ibc.style.zIndex =  zIndex["svg"]+10
			ibc.style.top = xy.y+"px";
		ibc.style.left = xy.x+"px";
		document.body.appendChild(ibc)
			//console.log(graphics[id]);
			o.inputBox = ibc;
		o.hiddenInputBox = ib;
		//console.log("__________________________________");
		gfxLookup[id].reindex();
		//console.log(this.lastPtr);
		//console.log("&*8&&&**************************&$&$");
		console.log(id + "<thumb");
		
		gfx.prototype.isRenaming = copyArray(ptr);

		//events[ptr.join()] = inputBoxHandler.prototype; //this.renamer.bind({gid:o.gid, uni:o.uni, objptr:this.lastPtr});
	},

	// 2 b refactored
	//
	// the way this works is that it should link to a 
	// sublings = columns, children = rows
	"switchType":function(ptr, type) {
		var o = getObject(ptr, graphLookup);
		graphLookup[ptr[0]].switchType(ptr, type);
		this.rebuild();
		

	},

	"setGridLayout":function(ptr) {
		var o = getObject(ptr, graphLookup);
		o.layout = "grid";
		this.rebuild();
	},
	"setListLayout":function(ptr) {
		var o = getObject(ptr, graphLookup);
		o.layout = "list";
		this.rebuild();
	},
	
	"build":function(cb) {
		//this.mkIndexedModel();
		//var pts = htmlRenderer.prototype.putToScreen.bind({id:this.id}); // after images made, put to screen
		graphics = graphLookup;
		htmlRenderer.prototype.setElement(this.uid, this.id);
		htmlRenderer.prototype.mkPtrImgs(this.id);
		this.renderer = htmlRenderer.prototype;
		//this.drawAll();
		//this.putToScreen();
	},
	"rebuild":function(cb) {
	//	alert("x");
		//console.log("rebuilding....");
		this.build();
		this.reindex();
		handlerData.offset = false;
		this.drawCurves();
		return;
	},
	"reindex":function() {

		snapSpace.prototype.updateSnapObject(this.gid, "graphLookup");

		htmlRenderer.prototype.reindex(this.id);
		
		// reindex all the index points (after deletion)
		// reindex the curveLookup table also
		//handlerData.offset = false;
	},

	// this converts the regular model into an indexed ptr model
	// ie, ["item"][0-9]["item"][0-9]....["item][0-9]
	// the ptr model looks like models[uid]["graph"][guid]["id"][ptr]["index"][index][("prop"|"children"|"parents")]
	// this should really be just a 'clone'

	"doSort":function(a,b) {
		//console.log(b.props.index+" _____________________________________________________________________________>");
		return a.props.index-b.props.index;
		//return false;
	},
	"sortIM":function(g) {
		// sort array, then traverse further into each element
		//console.log(Array.isArray(g));
		if (Array.isArray(g))
			g.sort(gfx.prototype.doSort); // gfx contains dom references, can't use closures.
		else return;
		for (var i = 0; i <  g.length; i++) {
			if (g[i]["item"]) {
				//this.idxSort.push(g[i]["item"]);
				var o = g[i]["item"];
				gfx.prototype.sortIM(o);
				//o.sort(gfx.prototype.doSort);	
			}
		}
	},
	"ptrSize":function(ptr) {
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
		gfxLookup[this.gid].moveTo(pe.x, pe.y, zIndex["ptr"]+10);
		gfxLookup[this.gid].reindex();
	},

	"hide":function() {
		//this.model.hidden = true;
		//this.renderer.hide(this.id);
		//console.log("hail cleo!!!!");
		//	alert("test");
		var d = graphLookup[this.id].el.style;
		d.display = "none";
		graphLookup[this.id]["hidden"] = true;	
	},

	"show":function() {
		this.model.hidden = false;
		this.renderer.show(this.id);
	},
	"showChildren":function(ptr) { 
		var o = getObject(ptr, graphLookup);
		o.hideChildren = false;
		//console.log(o);
		//console.log("extasy");
		this.rebuild();
	},
	"hideChildren":function(ptr) {
		var o = getObject(ptr, graphLookup);
		o.hideChildren = true;
		console.log(o);
		console.log("extasy");

		this.rebuild();
	},
	"moveTo":function(x,y,z) {
		// only manage the lastz for indexPtr
		graphLookup[this.id].loc = {"x":x, "y":y};
		if (z) {
			graphLookup[this.id].loc.z = z
			if (z > gfx.prototype.lastz && graphLookup[this.id].indexPtr)
				gfx.prototype.lastz = z;
		} 
		if (this.renderer)
			this.renderer.moveGfx(this.id);

		//linkCurve.prototype.drawCurves(c1);
		//console.log("test test...");
		// use proper canvas movation
		//this.putToScreen();
	},

	"renamePtr":function(oldptr, endPoint) {
		n = this.indexedObject["item"];
		//n.getOwnPropertNames.length();
		var ol = oldptr.length;
		for (var i=0; i < ol-1; i++)
			var n = n[i]["item"];
		n[endPoint]["item"] = n[old-1]["item"]
	},
	
	"ptrDelete":function(ptr) {
		delete ptrs[ptr];
		// check for id content length to see if object gets totally deleted
	},
	// to redraw lines after something has been deleted, delete everything from 
	// parent node's id off the curveLookup... and just redraw everything
	
	"deleteCurve":function(indexedPtr) {

	// reindex code...	
		var ids = [];
		if (indexedPtr[indexedPtr.length-2] == "index") {
			var idn = indexedPtr.pop();
			indexedPtr.pop();
		}else idn = 0; 
		var gil = graphLookup[this.id].getItemList(indexedPtr);
		for (var i =0; i < gil.length; i++) {
			var index = getObject(gil[i], graphLookup).index;
			if (index) {
				var limit = idn ? idn+1 : index.length;
					
				for (var idx = idn; idx < index.length; idx++) {
					var parents = index[idx].parents;
					var children = index[idx].children;
					for (var j = 0; j < parents.length; j++) {

						var cp = copyArray(parents[j]);
						
						var cpi = cp.pop();
						var o = getObject(parents[cp], graphObject);
						o.splice(cpi, 1);
						
						curveLookup[parents[j]][gil[i].concat(["index", idx])].delete();
						index[idx].parents.splice(j, 1);

						//if (notchDown) {
						//}	
						// need to delete the child element references
					}

					for (var j = 0; j < children.length; j++) {

						var cc = copyArray(children[j]);
						var cci = cc.pop();
						var o = getObject(children[j], graphObject);
						o.splice(cci, 1);

						curveLookup[gil[i].concat(["index", idx])][children[j]].delete();
						index[idx].children.splice(j, 1);
					
						// need to delete now the parent element references
					}
				}
			}
		}
	},
	"deleteCurve":function() {

	},

	"connect":function(c1, c2) {
		//graph function provides direction (s2c,s1c) same thing
		console.log("connecting..."+c1+" "+c2); 
		pt = graph.prototype.connect(c1, c2);
		//this.drawLinks(c1, c2); // doesnt matter which one we give it
		//this.rebuild();
	
		//linkCurve.prototype.refactor(c1, c2);
		if (!pt) return;
		gfxLookup[c1[0]].rebuild();

		gfxLookup[c2[0]].rebuild();
		// add another index to the graph 

		linkCurve.prototype.drawCurves(c1);
		linkCurve.prototype.drawCurves(c2);
		
		/*	
		var ps = pt.p.join(); 
		var cs = pt.c.join();
		var pca = [ps, cs, "rect"];
		var pj = pt.p.join();
		var cj = pt.c.join();
		var curve = curveLookup[pj][cj];
		*/

		//alert(pca);
	//	curve.register(); // should work
		//snapSpace.prototype.regObject(pca, "curveLookup");
		//curveLookup[pj]
		//curveLookup[pj].regObject(pca, "curveLookup");
//nom wah tea parlor dimsung
		//events[j+]	
		//curve.rect = {"ptr":[pt.ps, pt.cs], "x":

		//var ptr = pt.p.join().concat(pt.c.join());
	       	
		//graphics[ptr] = {"rect":{"ptr":[ptr], "x":"", "y""}}
		// create a new universe 
			
		//var o = {"visible":true, "type":"label", "height":loh, "right":low+pos.x, "width":low, "x":pos.x, "y":pos.y, "z": zi, "bottom":loh+pos.y, "ptr":ptr, "div":label, "ptrString":ps.join()};
		// register curves to event handler...
	},

	"drawCurves":function() {
		//console.log("test..."); 
		linkCurve.prototype.drawCurves([this.id]);
		// not sure if the lineCurve should be with the renderer
	},
	"moveCanvas":function() {
		this.renderer.moveGfx(this.id);
		this.drawCurves();
		
		return;
		var t = this.model.loc;
		var canvas = graphics[this.id].canvas;
		//console.log("moving...."+this.id);
		canvas.style.top = t.y+"px";

		canvas.style.left = t.x+"px";

		//alert(JSON.stringify(t)+" "+t.x+" "+t.y+" "+canvas.style.top+" "+canvas.style.left);
		//console.log("----------()*)(*)(*)(#*)$(*@#)(*$)#(*$#@<S-F9>+)$#)$+#_)+$#_)$+#@_)+#_");
		//console.log(canvas.style);
	},
	"setX":function(x) {

		this.model.loc.x = x;

		this.moveCanvas();
			
		//this.putToScreen();
		// move canvas element
	},
	"setY":function(y) {
		//console.log("draggging....");
		this.model.loc.y = y;
		this.moveCanvas();
		//this.putToScreen();

		// move canvas element
	},
	"setXY":function(x, y) {
		var tml = this.model.loc;
		tml.x = x;
		tml.y = y;// = { "x":x, "y":y};
		this.moveCanvas();
		//console.log(this.model.loc)
		//console.log(canvas.style.top+" "+canvas.style.left);
		//this.putToScreen();

		// move canvas element
	}, 

	// most likely this will be refactored out into something more generic ... 

	"ptr2InputBox":function(ptr) {
		//ptr[ptr] = 
	}


	
}



// probably easiest way of doing this is create an alert system to update the drawing of the grph
