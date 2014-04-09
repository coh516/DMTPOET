/*
Copywrite 2013, 4thTemple.com, FourthTemple.org.

the idea with this handler is to manage the global location settings
at very least, bounding boxes need to be mantained from the graphics side
*/
// should have some addition methods....
// shouldnt allow a tab to go negative
// should get the max height/widhth of all Items
//
// need to break apart the event handlers from the actual eventing
function withinRect(point, rect) {

	return ( (point.x >= rect.x) && (point.x <rect.right) && (point.y >= rect.y) && (point.y < rect.bottom));

}
snapSpace = function(win) {

	this.id = mkguid();
	snapGrids[this.id] = this;
	this.snapLookup = snapSpace.prototype.snapLookup; //enforce singleton
};
snapSpace.prototype = {
	"snapWidth":50,
	"snapHeight":50,
	"snapLookup": {}, 
	"regObject":function(ptr, objName, eventObject, refinementFunction) { // using bounding box from the gfx renderer

		var lookup = lookups[objName]
		//console.log(ptr);
		var rect = getObject(ptr, lookup);
		if (objName == "curveLookup") {		

		}
		var snapLookup = snapSpace.prototype.snapLookup;
		var id = rect.ptr[0];

		var my = snapSpace.prototype.maxY 
		snapSpace.prototype.maxY = my > rect.bottom ? my : rect.bottom;
	
		var mx = snapSpace.prototype.maxX
		snapSpace.prototype.maxX = mx > rect.right ? mx : rect.right;

		var leftMostX = Math.floor(rect.x/this.snapWidth) * this.snapWidth

		
		var topMostY = Math.floor(rect.y/this.snapHeight) * this.snapHeight;
		var snaps = [];	
 

		for (var x = leftMostX; x <= rect.right; x += this.snapWidth) {

			if (snapLookup[x] === undefined)
				snapLookup[x] = [];
			for (var y = topMostY; y <= rect.bottom; y += this.snapHeight) {

				if (!snapLookup[x][y])
					snapLookup[x][y] = {};

				snapLookup[x][y][rect.ptr.join()] = {"rect":rect, "lookupName":objName};
				var snap = {"ptr":rect.ptr.join(), "x":x, "y":y};
	
				snaps.push(snap);
			}
		}
		if (!lookup[id].snaps) lookup[id].snaps = [];
		lookup[id].snaps.push(snaps);
	},

	"findRegged":function(e) {
		var pos = getPos(e);
		if (!pos) return;
		var x = Math.floor(pos.x/this.snapWidth) * this.snapWidth;
		var y = Math.floor(pos.y/this.snapHeight) * this.snapHeight;


		var sz = 0;
		var ar = {};
		var snapLookup = snapSpace.prototype.snapLookup;
		if (snapLookup.hasOwnProperty(x)) {
			if (snapLookup[x].hasOwnProperty(y)) {
				// do something with the object
				//refine the object now...
				var slu = snapLookup[x][y];

				for (var i in snapLookup[x][y]) {
					var a = snapLookup[x][y][i];
					if (gfxLookup[a.rect.gfxId].isHidden()) continue;
				 	var rect = a.rect; 
					if (rect.div.ownerDocument.defaultView != e.view) {		
						continue; 
					}
					if (withinRect({"x":pos.x, "y":pos.y}, rect)) {
						// do further refinement of hit testing

						var z = rect.z;
						if (!ar[z]) ar[z] = [];

						var idx = rect.index !== undefined ? rect.index : "";
						ar[z][i] = a;

						sz = z >= sz ? z : sz;
					}
				}
			}
		}

		if (ar[sz]) {

		 
			return ar[sz];
		}


	},
			
	
	"overs":{},

	"mousemove":function(e) {
		var grid = snapGrids[this.id];

		var regged = grid.findRegged(e)

		// find stuff that wasn't in there before
		

		var go = Object.getOwnPropertyNames(grid.overs);

		if (regged)
			var ro = Object.getOwnPropertyNames(regged);
		else ro = [];
		// test all out
			
		var ok = false;	

		if (!grid.entered) grid.entered = {};

		for (var r in regged) {
			var le = regged[r].rect.ptr.join();

			var rr = regged[r];
			if (!events[le]) {				
				var eventType = rr.rect.cssType;

				var evt = events[eventType];

			} else {
				evt = events[le];
			}

			if (!grid.entered[r]) {
				grid.entered[r] = rr;
				evt.handleMouseEnter(rr, e);
			}
		}
		for (var me in grid.entered) {
			if (regged)
				if (!regged[me]) {
					var ok = true;
				}
			if (!regged || ok) {
				var gem = grid.entered[me];

				var evt = events[gem.rect.ptr.join()];
				if (!evt) {

					var eventType = gem.rect.cssType;

					evt = events[eventType];


				}
				evt.handleMouseOut(gem, e)
				delete  grid.entered[me]
				ok = false;
			}
		}
	


		for (var g in grid.movers)  {
			var gmg = grid.movers[g];
			
			var evt = events[gmg.rect.ptr];
			if (!evt)
				evt = events[gmg.rect.cssType]
			evt.handleMouseDrag(gmg, e);
		}

		grid.overs = {};
		for (var r in regged) {
			grid.overs[r] = regged[r];


			var rr = regged[r];
			var eventType = rr.rect.cssType;
			
			var evt = events[rr.rect.ptr.join()];
			if (!evt)
				evt = events[eventType];
			evt.handleMouseMove(rr, e)
		}
	},
	"moving":{},
	"movers":{},
	"mousedown":function(e) {
		var grid = snapGrids[this.id];
		moving=true;
		// need to log the x,y to check for mouseup click
		var pos = getPos(e);
		grid.mouseDownXY = pos;

		for (var g in grid.overs) {

			var gog = grid.overs[g];

				var eventType = gog.rect.cssType;
			

			if (!evt) 
				var evt = events[eventType];
			
			evt.handleMouseDown(gog, e); 
			grid.movers[g] = gog; 
		}
	},
	"mouseout":function(e) {

		var grid = this.id;
		if (!e.relatedTarget || e.relatedTarget.nodeName == "HTML") {
			for (var g in grid.overs) {
				var ggo = grid.overs[g];

				var uid = lookups[ggo.lookupName][ggo.rect.ptr[0]].universeid;
				var evt = events[ggo.rect.ptr.join()];
				var eventType = ggo.rect.cssType;
				if (!evt) {

					evt = events[eventType];
				}
				evt.handleMouseOut(ggo, e);
			}
			grid.overs = {};
		}
	},
	"mouseup":function(e) {
		// need to test if the item moved to detect a click 
		// also need to detect right click...
		var grid = snapGrids[this.id];
		var pos = getPos(e);
		var mc = Object.getOwnPropertyNames(grid.overs);
		for (var g in grid.movers) {

			var gmg = grid.movers[g];
			var eventType = gmg.rect.cssType;
			
			var evt = events[gmg.rect.ptr.join()]
			if (!evt)
				evt = events[eventType];
			// if you mouse down and up within a 4 pixel range, i consider this a click -- maybe 2 pixels would be better
			if (Math.abs(grid.mouseDownXY.x - pos.x) < 4 && Math.abs(grid.mouseDownXY.y - pos.y) < 4) {

				evt.handleMouseClick(gmg, e);
			}
			evt.handleMouseUp(gmg, e);

		}
		if (mc.length == 0) {
			if (Math.abs(grid.mouseDownXY.x - pos.x) < 2 && Math.abs(grid.mouseDownXY.y - pos.y) < 2) {
				if (events["screenClick"]) {
					if (!events['ignoreScreenClick'])
					//needs some extra logic to map which screen we're clicking..
					
					events["screenClick"](e);
				}
			}	
		}
		grid.movers= {}
	},

	"setupHandlers":function(win) { 
	//	alert("test");
		win.addEventListener("mousemove", snapSpace.prototype.mousemove.bind({"id":this.id}), true);
		win.addEventListener("mousedown", snapSpace.prototype.mousedown.bind({"id":this.id}), true);
		win.addEventListener("mouseup", snapSpace.prototype.mouseup.bind({"id":this.id}), true);
		win.document.addEventListener("mouseout", snapSpace.prototype.mouseout.bind({"id":this.id}), true);
	},
	"updateSnapObject":function(id, lookupName) {

		var gl = lookups[lookupName][id];
	

		if (!gl) { console.log("error!!!! no lookup with that name"+id); return; }
		if (!gl.snaps) {
		       // need to figure this out some more..
		       /*	
			console.log("error, "+lookupName+" <> "+id+" gl.snaps not found..");  console.log(gl); return; 
			*/
			return;
		}
		var sl = gl.snaps.length;
		snapLookup = snapSpace.prototype.snapLookup;
		//console.log("updating snapObject");
		for (var i=0; i < sl; i++) {
			var gls = gl.snaps[i];
			var glsl = gls.length;
			for (var j = 0; j < glsl; j++) {
				var glsj = gls[j];

				delete snapLookup[glsj.x][glsj.y][glsj.ptr];
			}
		}

		delete gl.snaps;
		
	}
}



//move handler code to new file 



function userEvents() {
}


userEvents.prototype = {
	"handleMouseEnter":function(obj, e) {
		var id = obj.rect.ptr[0];


		var csstype = obj.rect.cssType

		var p = getObject(obj.rect.ptr, graphLookup);	
		var type = obj.rect.type ? obj.rect.type : "";
			

		p.div.setAttribute(csstype+type, "over");

	}, 

	"handleMouseDown": function(obj, e) {


	},

	"handleMouseDrag": function(obj, e) {

	},
	
	"handleMouseMove": function(obj, e) {

	},

	"handleMouseClick": function(obj, e) {

	},

	"handleMouseOut":function(obj, e) {

		var id = obj.rect.ptr[0];
		var csstype = obj.rect.cssType;
		var type= obj.rect.type;

		var a = copyArray(obj.rect.ptr);
		var selected = !getObject(a, graphLookup).hideChildren;
		
		switch (type) {
			case "index":
			       //alert("test1");	
				var state = obj.rect.selected ? "selected" : "unselected";
				break;
			
			case "label": 
				var state = selected ? "unselected" : "hidechildren"
				break;	
		}	
		obj.rect.div.setAttribute(csstype+type, state); // stuff like this should be in the html renderer
	},

	"handleMouseUp": function(obj, e) {

	},

	"handleMouseCanvasClick": function(obj, e) {

	}
}

// should be moved into a seperate file


function stageEventHandler() {
}
stageEventHandler.prototype = Object.create(userEvents.prototype);
stageEventHandler.prototype.handleMouseClick = function(obj, e) {


	var ca = copyArray(obj.rect.ptr);

	var h = gfxLookup[obj.rect.gfxId].isHidden()
	if (h) return;

	ca.pop(); 
	ca.pop();

	var lookup = lookups[obj.lookupName];
	var o = getObject(ca, lookup);
	console.log(o);

	switch (o.value) {
		case "design window": 
			// not sure if this is possible?
			break;
		case "render window":
			break;
		case "new node":
			stageMenu.mkNewNode(e);
			stageMenu.hideMenu();

			break;
	
		case "save":
		       	// draw save menu dialog
			stageMenu.hideMenu(); // either this or push the prior menu z axis below the "dialoogmenu"
		       	saveMenu.switchVisibility(e);
			//new storage.prototype.storeUniverse();
			break;
	}


	// determine what element we just clicked on ...., return the node value
}

function contextEventHandler () {
}
 
contextEventHandler.prototype = Object.create(userEvents.prototype);

contextEventHandler.prototype.handleMouseCanvasClick = function(obj, e) {
}

contextEventHandler.prototype.handleMouseClick = function(obj, e) {

	var r = Graph.prototype.getLabels(obj.rect.nodeRoot);

	switch (r.join()) {
		case "expand":
			contextMenu.showLastPtr();			
			break;
		case "hide":
			contextMenu.hideLastPtr(); 
			break;
		case "rename":
			contextMenu.renamePtr();
			break;
		case "remove":
			contextMenu.remove();
			break;
		case "add child":
			contextMenu.addChild();
			break;
		case "add sibling":
			contextMenu.addSibling();
			break;
		case "copy":
			contextMenu.test();
			break;
		case "set type,value":
			contextMenu.setNodeType("value");
			break;
		case "set type,root":
			contextMenu.setNodeType("root");
			break;
		case "set type,program":
			contextMenu.setNodeType("program");
			console.log("hihihi")
			break;
		case "set layout,grid":
			contextMenu.setLayout('grid');
			break;
		case "set layout,list":
			contextMenu.setLayout('list');
			break;
		case "set type,module":
			contextMenu.setNodeType("module");
			break
		case "evaluate":
			contextMenu.traverseProgram();
			break;
	
	}

	contextMenu.hideMenu(e);

	// determine what element we just clicked on ...., return the node value
}


function staticEvents() { }
 

staticEvents.prototype = Object.create(userEvents.prototype);

staticEvents.prototype.checkPtr = function(ptr) {
	return (ptrEvents.hasOwnProperty(ptr))
}
staticEvents.prototype["handleMouseDown"] =  function(obj, e) {

	if (this.checkPtr(obj.rect.ptr.join()))
	
	if (ptrEvents[obj.rect.ptr.join()].handleMouseDown)
		ptrEvents[obj.rect.ptr].handleMouseDown();

}

staticEvents.prototype[	"handleMouseDrag"]= function(obj, e) {
	if (this.checkPtr(obj.rect.ptr.join()))

	
	if (ptrEvents[obj.rect.ptr.join()].handleMouseDrag)	
		ptrEvents[obj.rect.ptr].handleMouseDrag();
}

staticEvents.prototype[	"handleMouseMove"]= function(obj, e) {
	if (this.checkPtr(obj.rect.ptr.join()))

	
	if (ptrEvents[obj.rect.ptr.join()].handleMouseMove)
		ptrEvents[obj.rect.ptr].handleMouseMove();
}

staticEvents.prototype[	"handleMouseClick"]= function(obj, e) {

	if (this.checkPtr(obj.rect.ptr.join())) {
	
	if (ptrEvents[obj.rect.ptr.join()].handleMouseClick)
		ptrEvents[obj.rect.ptr].handleMouseClick();
	}
}

staticEvents.prototype[	"handleMouseOut"]=function(obj, e) {
	if (this.checkPtr(obj.rect.ptr.join()))

	if (ptrEvents[obj.rect.ptr.join()].handleMouseOut)
		ptrEvents[obj.rect.ptr].handleMouseOut();	
}
staticEvents.prototype[	"handleMouseEnter"]=function(obj, e) {
	if (this.checkPtr(obj.rect.ptr.join()))

	if (ptrEvents[obj.rect.ptr.join()].handleMouseEnter)
		ptrEvents[obj.rect.ptr].handleMouseEnter();	
}

ptrEvents = {};


var handlerData = {};

function moveHandler(f) {
	this.caller = f;
}
moveHandler.prototype = Object.create(userEvents.prototype);

moveHandler.prototype.register = function(f) {
	this.caller = f;	
}
moveHandler.prototype.handleMouseClick = function(gfx, e) {

	this.caller.handleMouseClick(gfx, e);
}
moveHandler.prototype.handleMouseEnter = function(gfx, e) {
	this.caller.handleMouseEnter(gfx, e);
}
moveHandler.prototype.handleMouseDown = function(obj, e) {

	var ogptr = obj.rect.ptr;
	ptr = obj.rect.ptr;

	var id = ptr[0];

	if (!handlerData.offset) {
	
		handlerData.ogup = getPos(e);
		var pos = getPos(e);

		var abs = getObject(obj.rect.gfxRoot, graphLookup).loc;
		handlerData.offset = {"x": pos.x - abs.x, "y": pos.y - abs.y};
	}
	this.caller.handleMouseDown(ogptr, e);

}

moveHandler.prototype.handleMouseMove = function(obj, e) {
	this.caller.handleMouseMove(obj.rect, e);
}
moveHandler.prototype.handleMouseDrag = function(obj, e){
	var ogptr = obj.rect;

	ptr = obj.rect.ptr; 
	var lookup = lookups[obj.lookupName];
	var gfo = gfxLookup[obj.rect.gfxId];
	if (handlerData.offset) {
		var pos = getPos(e);

		if ((pos.x - handlerData.offset.x) <= 0) {

			gfo.setX(0);
			gfo.reindex();
			return;

		}

		if ((pos.y - handlerData.offset.y)  <= 0) {
			gfo.setY(0);
			gfo.reindex();
			return;

		}


		gfo.setXY( pos.x - handlerData.offset.x, pos.y - handlerData.offset.y);

			gfxLookup[obj.rect.gfxId].isDragging = true;
		gfo.reindex();
	}
	this.caller.handleMouseDrag(ogptr, e);

}

moveHandler.prototype.handleMouseUp = function(obj, e) {
	var ogptr = ptr.rect;
	ptr = obj.rect.ptr;
	
	handlerData.offset = false;

	var lookup = lookups[ptr.lookupName];
	var gfo = gfxLookup[ptr[0]]; // perhaps gtfo is a better variable name
	gfxLookup[obj.rect.gfxId].isDragging = false;

	this.caller.handleMouseUp(obj, e);

}

moveHandler.prototype.handleMouseOut = function(ptr, e) {
	this.caller.handleMouseOut(ptr, e);
}


function inputBoxHandler() {
}
inputBoxHandler.prototype = Object.create(userEvents.prototype);

inputBoxHandler.prototype.handleMouseClick = function(ptr, e) {


}
	
function linkCurveHandler() {

}

linkCurveHandler.prototype = Object.create(userEvents.prototype);
linkCurveHandler.prototype.handleMouseEnter = function(rect) {
//	console.log("testing... link curve mouse over");

}
linkCurveHandler.prototype.handleMouseOut = function(rect) {

}

linkCurveHandler.prototype.handleMouseClick = function(rect) {
//	console.log("testing link curve mouse click");
}
linkCurveHandler.prototype.handleMouseUp = function(rect) {
	
}

function nodeEventHandler() {

}

nodeEventHandler.prototype = Object.create(userEvents.prototype);


nodeEventHandler.prototype["handleMouseClick"] = function(obj, e) {

		var or = obj.rect;
		
		var csstype = getCSS(obj);
		if (obj.rect.type == "index") {
			obj.rect.selected = !obj.rect.selected
			
			if (!nodeEventHandler.prototype.selection1) {
				nodeEventHandler.prototype.selection1 = obj;
			}else { 
				// is this selected twice?
				if (obj.rect.ptr.join() == nodeEventHandler.prototype.selection1.rect.ptr.join()) {
					delete nodeEventHandler.prototype.selection1
				}
				else 
				nodeEventHandler.prototype.selection2 = obj; 
			}
			var s1 = nodeEventHandler.prototype.selection1;
			var s2 = nodeEventHandler.prototype.selection2;
			
		
			obj.rect.div.setAttribute(csstype, obj.rect.selected ? "selected" : "unselected");
			
			if (s1 && s2) { 
	
				Gfx.prototype.connect(s1.rect, s2.rect);

	
				s1.rect.div.setAttribute(csstype, "unselected");
				s2.rect.div.setAttribute(csstype, "unselected");
				s1.rect.selected = false;
				s2.rect.selected = false;
				delete nodeEventHandler.prototype.selection1
				delete nodeEventHandler.prototype.selection2
			
			}
		}
		if (obj.rect.type == "label") {
			contextMenu.showMenu(e, obj.rect);
		}
	
		
		// hypothetical rule checker
			

		//document
	}
	nodeEventHandler.prototype["handleMouseEnter"] = function(obj, e) {
		//console.log(gfx);
		//
		var id = obj.rect.ptr[0];
		//alert('test...');
		if (	gfxLookup[obj.rect.gfxId].isDragging)
			return;

		var csstype =obj.rect.cssType;// models[graphLookup[id].universeid].type;

		var p = getObject(obj.rect.ptr, graphLookup);	
		//console.log(p);
		var type = obj.rect.type	

		p.div.setAttribute(csstype+type, "over");
	
	}

	nodeEventHandler.prototype["handleMouseOut"] = function(obj, e) {

		var id = obj.rect.ptr[0];
		if (	gfxLookup[obj.rect.gfxId].isDragging)
		       	return;

		var csstype = obj.rect.cssType;
		var type= obj.rect.type;

	
		var a = copyArray(obj.rect.ptr);
		var selected = !getObject(a, graphLookup).hideChildren;
		
		switch (type) {
			case "index": 
				var state = obj.rect.selected ? "selected" : "unselected";
				break;
			
			case "label": 
				var state = selected ? "unselected" : "hidechildren"
				break;	
		}	
		obj.rect.div.setAttribute(csstype+type, state); // stuff like this should be in the html renderer
	}

	nodeEventHandler.prototype["handleMouseUp"] = function (obj, e) {
		var id = obj.rect.gfxId;
		gfxLookup[id].reindex();
	}



//todo: moveHandler should extend nodeEventHandler through Object.getPrototypeOf(this) rather than using a decorator .. 
//moveHandler.prototype = new(nodeEventHandler());

var nodeEvents = new moveHandler(new nodeEventHandler);


function getCSS(gfx) {
	var type = gfx.rect.type

	return gfx.rect.cssType+type;
}

function getGraph(ptr) {
	var id = ptr[0];
	var ca = copyArray(ptr);
	ca.pop();ca.pop();
	var p = getObject(ca, graphics);
	return graphLookup[id]["ptr"][p.ptr];
}


/*
handler = new moveHandler();
*/
