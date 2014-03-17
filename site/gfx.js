/*
Copywrite 2013, 4thTemple.com, FourthTemple.com
2013 Seth Tenenbaum
*/

// launch this on start
// let's start by polluting the global scope more

//var bigAssCanvas = 
//
//

// this needs to be done a bit better...
// moveTo is sketchy ..... 
zIndex = {};
zIndex["ptr"] = 100;
zIndex["svg"] = 1000;
zIndex["stagemenu"] = 10000;
zIndex["contextmenu"] = 10000;
zIndex["dialogmenu"] = 150
zIndex["renderedApps"] = 12000





// this needs to be merged with the general graph
// the best way to manage node references is to classify them by ID only and use getElementByID... 
// obvious source of memory leaks..
// need to update it...

//used to be gfx(objType, id....
//there shouldnt be any html / dom references in here
//should be able to reinitialize a graphics object from the graph object


function Gfx(obj) {
	// shouldnt call this on new .
	this.create(obj);
}

Gfx.prototype = {

	"create":function(obj) {
		this.init(obj.type, obj.ptr, obj.renderer, obj.baseElement);
	},

	"init": function(type, ptr, renderer, baseElement ) {
		//console.log(baseElement);
		this.type = type;
		this.rootPtr = ptr;
		this.graphId = ptr[0];
	//	this.uid = uid;
	//	this.baseNode = baseNode;

		if (!renderer)
			this.renderer = htmlRenderer.prototype;

		//else
		//case "dropdown":
		
	
		this.renderer  = renderer.prototype;

		var ng = 0;

		this.id = mkguid();
		//the link curve still needs to be refactored to be 
		//managed by seperate id's...

		//if (!gfxLookup['type'][type])
		//	gfxLookup['type'][type] = {};

		gfxLookup[this.id] = this;

		var o = getObject(ptr, graphLookup);
		try { 
		console.log(o.gfx.ptr.loc)
		console.log(JSON.parse(JSON.stringify(o)));
		} catch (e) { }
		console.log("smiley don");
		if (!o.gfx) {
			o.gfx = {};
		}
		if (!o.gfx[type]) {
			o.gfx[this.type] = {};
		}


		// baseElement is when there is an object within another object
		// the external object's responsibility to set it 
		var be = baseElement ? true : false;
		if (!baseElement)
			baseElement = document.body;
		this.baseElement = baseElement;
		//console.log(this.baseElement);
		//if (!baseElement) {
		
		o.gfx[this.type]['baseElement'] = baseElement;
		o.gfx[this.type]['type'] = type;
	        o.gfx[this.type]['rootPtr'] = ptr;
		o.gfx[this.type]['gfxId'] = this.id;
		o.gfx[this.type]['hasBaseElement'] = be;

		// not sure if setting the type is necessary

		this.gfxPtr = ptr.concat(['gfx', this.type]);
		if (!Gfx.prototype.setted) 
			this.setupNodeEvents();
		Gfx.prototype.setted = true;

	},
	get graphGfxPtr() { return this.rootPtr.concat(['gfx', this.type]) },
	get rootGfxObj() { return getObject(this.graphGfxPtr, graphLookup) },
	set hasIndex() { this.rootGfxObj._index = false; },
	get hasIndex() { if (this.rootGfxObj.hasOwnProperty("_index")) {
				return this.rootGfxObj._index;
			}
			else return true; 
	},
	"getGfx":function(ptr) { 
		var o = getGraphObject(ptr);
		return o['gfx'][this.type];
	},
	"setVisibility":function(ptr, bool) {
		var gfx = this.getGfx(ptr);
		if (bool) {
			gfx.hideItem = true;
			this.hideChildren(ptr);			
		}
	},
	"hideItem":function(ptr) {
		// should test suffix
		getGraphObject(ptr);
	},
	"ptrs":{},
	"img":{},
	"ptrModel":{},
	"idxSort":[],
	"linkSize":10,
	"fontSize":28,
	"initNodes":function() {
		var type = this.type;
		graphLookup[this.graphId].recurseItems(
				function(ptr) {
			//	       console.log(ptr);	
					var o = getGraphObject(ptr); 
					if (!o.gfx)o.gfx = {};
				       	o.gfx[type] = {} 
				}
				)

	},
	// there should be a property set in the graph object which defines this.rootPtr to be an input box...
	// this input box shit has to be put into the html renderer...
	// type = "inputBox" -- then re-indexed
	// after refresh, should it display (it should go through a subtle intermediate phase)
	//
	// as well, these specific node things should be subsetted with their respective functions ... 

		

	"setupNodeEvents": function () {
		var cfe = Gfx.prototype.checkForEnter; //.bind({gid:this.id, uni:this.uid});
		Gfx.prototype.c4n = cfe;
		window.addEventListener('keypress', cfe, true);
		//if (!events["screenClick"]) events["screenClick"] = [];
		//events["screenClick"].push(Gfx.prototype.deselectInputBox);
	},
	"checkForEnter": function(e) {
	       	//alert("test...");
		// need 'current focuses' 	
		if (e.keyCode == 13 && Gfx.prototype.isRenaming) {
				
			var n = Gfx.prototype.deselectInputBox.bind({id:this.id})();
			
			//window.removeEventListener('keypress', stageMenu.checkForEnter, true);
		}
	},
	//maybe extend this for UI gfx
	"getDropdownIndex":function(ptr, attr) {
		// i forgot how to do this.
		var v = getGraphObject(ptr.concat(['gfx', this.type])).div;
		//var o = v.options[v.selectedIndex]
		return v.selectedIndex; //v ? v : getGraphObject(ptr).value

	},	
	"getValue":function(ptr) {
		var v = getGraphObject(ptr.concat(['gfx', this.type])).div.value;
		return v ? v : getGraphObject(ptr).value;
		
	},
	"setInputBox":function(ptr) {
	
		getGraphObject(ptr.concat(['gfx', this.type])).objType = 'inputBox';
	       this.rebuild();	
	},
	"setLabel":function(ptr) {
		getGraphObject(ptr.concat['gfx', this.type]).objType = 'label';
	},
	"setType":function(ptr, type) {
		console.log(ptr);
		console.log(ptr.concat['gfx', this.type]);
		getGraphObject(ptr.concat(['gfx', this.type])).objType = type;
		this.rebuild;
	},
	"deselectInputBox": function() {
		//alert("TEST..");
		//var t = gfxLookup.isRenaming;
		var rect = Gfx.prototype.isRenaming.rect;
		var ptr = rect.ptr;
		//alert(ptr);
		if (ptr) {
			
			var o = getObject(ptr, graphLookup);
			//once again.. need to store id's...
			if (!o.inputBox) console.log(o);
			var it = o.inputBox.value;
			//	return;
			
			o.inputBox.parentNode.removeChild(o.inputBox);
			o.hiddenInputBox.parentNode.removeChild(o.hiddenInputBox);	
			
			var p = copyArray(ptr);
			p.pop(); 
			var id = ptr[0];
		
			graphObjLookup[id].renamePtr(rect.nodeRoot, it);
			Gfx.prototype.isRenaming = false;
			delete events[id];
			gfxLookup[rect.gfxId].rebuild();
		}
	},
	// this should do something silly  like f(ptr).type = "inputBox"; reindex();
	// this should be in html renderer
	// will refactor in a minute....
	"mkInputBox":function(rect) {
		// push textmenu div :)
		//alert("test..");
	//	console.log(ptr + "<<<<>>>>>");	
	//	var id = rect.ptr[0];
		console.log(rect);
		var o = getGraphObject(rect.ptr)//, graphLookup);
		var item = getGraphObject(rect.nodeRoot);
		//var item = this.rootGfxObj;//ect() //getObject(ca, graphics);
		var d = o.div;
		d.innerText = "";

		var ib = d.ownerDocument.createElement("input");
		var ibc = d.ownerDocument.createElement("input");

		ib.type = "text";
		ibc.type = "text";
		//ib.style.zIndex = "2000000";
		ib.value = item.value; 
		d.appendChild(ib);
	
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
		d.ownerDocument.body.appendChild(ibc)
			//console.log(graphics[id]);
			o.inputBox = ibc;
		o.hiddenInputBox = ib;
		//console.log("__________________________________");
		this.reindex();
		//console.log(this.lastPtr);
		//console.log("&*8&&&**************************&$&$");
		//console.log(id + "<thumb");
	
		// this is such a hack becuase it requires focus.. whatever.
		Gfx.prototype.isRenaming = {"rect":rect, "gfxId":this.id};

	},

	// 2 b refactored
	//
	// the way this works is that it should link to a 
	// sublings = columns, children = rows
	"switchType":function(ptr, type) {
		var o = getObject(ptr, graphLookup);
		graphObjLookup[ptr[0]].switchType(ptr, type);
		this.rebuild();
		

	},

	"setGridLayout":function(ptr) {
		var o = getObject(ptr, graphLookup);
		o['gfx'][this.type].layout = "grid";
		this.rebuild();
	},
	"setListLayout":function(ptr) {
		var o = getObject(ptr, graphLookup);
		o.layout = "list";
		this.rebuild();
	},
	
	"build":function(cb) {
		//graphics = graphLookup;
		this.renderer.setElement(this.rootGfxObj);
                                        //obj ref, beginPtr
		this.renderer.mkPtrImgs(this.rootGfxObj);
		this.hasBeenBuilt = true;
	},
	"rebuild":function(cb) {
	//	alert("x");
		//console.log("rebuilding....");
		this.build();
		this.reindex();
		handlerData.offset = false;
		if (typeof this._rebuild === 'function') this._rebuild();
		//this.drawCurves();
		return;
	},
	"reindex":function() {

		snapSpace.prototype.updateSnapObject(this.graphId, "graphLookup");
	//	alert("test");
		this.renderer.reindex(this.rootGfxObj);
		
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
			g.sort(Gfx.prototype.doSort); // gfx contains dom references, can't use closures.
		else return;
		for (var i = 0; i <  g.length; i++) {
			if (g[i]["item"]) {
				//this.idxSort.push(g[i]["item"]);
				var o = g[i]["item"];
				Gfx.prototype.sortIM(o);
				//o.sort(Gfx.prototype.doSort);	
			}
		}
	},
	// dont thnk this ever gets called
	/*
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
		//alert(Gfx.prototype.lastz);
		//console.log(gfx);
		gfxLookup[this.id].moveTo(pe.x, pe.y, zIndex["ptr"]+10);
		gfxLookup[this.id].reindex();
	},
	*/
	"hide":function() {
		//this.model.hidden = true;
		//this.renderer.hide(this.id);
		//console.log("hail cleo!!!!");
		//	alert("test");
		var o = getObject(this.gfxPtr, graphLookup);
		//var d = o.el.style;
		//d.display = "none";
		//o["hidden"] = true;	
		this.renderer.hide(o);
	},
	"isHidden":function() {
		var o = getObject(this.gfxPtr, graphLookup);
		return o.hidden;	
	},
	"show":function() {
		var o = getObject(this.gfxPtr, graphLookup);
		this.renderer.show(o);
	},
	"showChildren":function(ptr) { 
		var o = getObject(ptr, graphLookup);
		o.hideChildren = false;
		//console.log(o);
		//console.log("extasy");
		this.rebuild();
	},
	"hideChildren":function(ptr) {
		// should be in gfx object
		var o = getObject(ptr, graphLookup);
		o.hideChildren = true;
	//	console.log(o);
		//console.log("extasy");

		this.rebuild();
	},
	"hideItem":function(ptr) {
		// should be in gfx object
		var o = getObject(ptr, graphLookup);
		o.hideItem = true;
	//	console.log(o);
		//console.log("extasy");

		this.rebuild();
	},
	/*
	"moveTo":function(x,y,z) {
		//console.log(this);
		// only manage the lastz for indexPtr
		this.rootGfxObj.loc = {"x":x, "y":y};
		if (z) {
			this.rootGfxObj.loc.z = z

//this should be typed to the graphicsType 

			if (z > Gfx.prototype.lastz && this.rootGfxObj.indexPtr)
				Gfx.prototype.lastz = z;
		} 
		if (this.hasBeenBuilt) {
			this.renderer.moveGfx(this.rootGfxObj);
		}

		//linkCurve.prototype.drawCurves(c1);
		//console.log("test test...");
		// use proper canvas movation
		//this.putToScreen();
	},
	*/
	// wtv
	"moveTo":function(x,y,z) {
		this.setXY(x,y,z);

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
		console.log(c1+ " "+c2);	 
		pt = Graph.prototype.connect(c1.indexRoot, c2.indexRoot);
	
		if (!pt) return;
		gfxLookup[c1.gfxId].rebuild();

		gfxLookup[c2.gfxId].rebuild();

		linkCurve.prototype.drawCurves(c1.indexRoot);
		linkCurve.prototype.drawCurves(c2.indexRoot);

	},


	"moveCanvas":function() {
		this.renderer.moveGfx(this.rootGfxObj);
		// no clue what this is 
		if (typeof this._moveCanvas === 'function') this._moveCanvas();//this.drawCurves();
		
		return;
		var t = this.model.loc;
		var canvas = gfxLookup[this.id].canvas;
		//console.log("moving...."+this.id);
		canvas.style.top = t.y+"px";

		canvas.style.left = t.x+"px";

		//alert(JSON.stringify(t)+" "+t.x+" "+t.y+" "+canvas.style.top+" "+canvas.style.left);
		//console.log("----------()*)(*)(*)(#*)$(*@#)(*$)#(*$#@<S-F9>+)$#)$+#_)+$#_)$+#@_)+#_");
		//console.log(canvas.style);
	},
	"setX":function(x) {
		var tml = this.rootGfxObj
		//console.log(this.rootGfxObj.loc + ")()()(*)(*)(*)()(*)(*)(*");
		tml.loc.x = x;

		this.moveCanvas();
			
		//this.putToScreen();/draw
		// move canvas element
	},
	"setY":function(y) {
		//console.log("draggging....");
		var tml = this.rootGfxObj
		//
		tml.loc.y = y;
		this.moveCanvas();
		//this.putToScreen();

		// move canvas element
	},
	"setXY":function(x, y) {
		if (!this.rootGfxObj.loc)
			this.rootGfxObj.loc = {'x':x, 'y':y}
	       	else {
			var tml = this.rootGfxObj.loc
			tml.x = x;
			tml.y = y;// = { "x":x, "y":y};
		//}
			this.moveCanvas();
		}
		//console.log(this.model.loc)
		//console.log(canvas.style.top+" "+canvas.style.left);
		//this.putToScreen();

		// move canvas element
	},
       	"setZ":function(z) {
		this.rootGfxObj.loc.z = z;
	},

	//"mkInputBox":function(ptr) {

	//},
	"mkButton":function(ptr) {
	},	
	"setXYZ":function(x,y,z) {
		var tml = this.rootGfxObj.loc
		tml.x = x;
		tml.y = y;// = { "x":x, "y":y};
		if (z) {
			tml.z = z;
		//	Gfx.prototype.lastz = z;
		}
		this.moveCanvas();

	},
	// most likely this will be refactored out into something more generic ... 

	"ptr2InputBox":function(ptr) {
		//ptr[ptr] = 
	}


	
}



// probably easiest way of doing this is create an alert system to update the drawing of the grph
//
//

