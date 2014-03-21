/*
Copywrite 2013, 4thTemple.com, FourthTemple.org.

the idea with this handler is to manage the global location settings
at very least, bounding boxes need to be mantained from the graphics side
*/
// should have some addition methods....
// shouldnt allow an icon to go negative
// should get the max height/widhth of all Items
//
// need to break apart the event handlers from the actual eventing
function withinRect(point, rect) {
//	console.log("pointx:"+point.x+" pointy:"+point.y+" rectx:"+rect.x+" recty"+rect.y+"rectb"+rect.bottom);
//	console.log("iswithin"+rect.right);
	//console.log((point.x >= rect.x) +" "+(point.x <=rect.right)+" "+(point.y >= rect.y)+" "+(point.y <= rect.bottom))
	return ( (point.x >= rect.x) && (point.x <rect.right) && (point.y >= rect.y) && (point.y < rect.bottom));

}
// this needs to point to the actual window.. 
snapSpace = function(win) {
//	alert("test");
//	throw "error";
//	this.setupHandlers(win);
//	if (!snapSpace.prototype.snapLookup) snapSpace.prototype.snapLookup = {}
	this.id = mkguid();
	snapGrids[this.id] = this;
	this.snapLookup = snapSpace.prototype.snapLookup; //enforce singleton
};
snapSpace.prototype = {
	"snapWidth":50,
	"snapHeight":50,
	"snapLookup": {}, // should be an outside object or a singleton referenced by snapSpace.prototype.snapLookup
	// item must have a 'getLabel()' object with x,y,width,height .. (perhaps rect is already used then we use smth else)
	// quantize objets to nearest grid snap point

	// the rects should be stored in some type of hash

	// get bounding box by looking at type
	// bounding box handler.. done
	// expects a group (array) of objects' bounding boxes.........
	// needs to point to the gfx portion
	// bound a different object other than 'graphics' ... 'graphics' should be parameterized 
	// objName needs to go... useless shit
	"regObject":function(ptr, objName, eventObject, refinementFunction) { // using bounding box from the gfx renderer

		// it would be smarter to just store references to the ptr and object lookup names
		// rather than copying them to a single lookup table ....
		// needs to be fixed.......... 
	//	console.log("test...");
		var lookup = lookups[objName]
		//console.log(ptr);
		var rect = getObject(ptr, lookup);
		if (objName == "curveLookup") {		
		//	console.log("ptr:"+ptr+" "+objName);
		//	console.log(rect); 
		}
		var snapLookup = snapSpace.prototype.snapLookup;
		var id = rect.ptr[0];

		var my = snapSpace.prototype.maxY 
		snapSpace.prototype.maxY = my > rect.bottom ? my : rect.bottom;
	
		var mx = snapSpace.prototype.maxX
		snapSpace.prototype.maxX = mx > rect.right ? mx : rect.right;

		var leftMostX = Math.floor(rect.x/this.snapWidth) * this.snapWidth
			//		leftMostX + (units*n) = rightMostX
			//		var unitHeight = Math.ceil(rect.height/self.snapHeight);
		
		var topMostY = Math.floor(rect.y/this.snapHeight) * this.snapHeight;
		var snaps = [];	
 
		//quantizer
//		console.log(ptr +" "+leftMostX);
		//
		for (var x = leftMostX; x <= rect.right; x += this.snapWidth) {

			if (snapLookup[x] === undefined)
				snapLookup[x] = [];
			//console.log("fuck..you");
			for (var y = topMostY; y <= rect.bottom; y += this.snapHeight) {

				if (!snapLookup[x][y])
					snapLookup[x][y] = {};

				snapLookup[x][y][rect.ptr.join()] = {"rect":rect, "lookupName":objName};
			//console.log({"type":"index", "ptr":ptr});
				var snap = {"ptr":rect.ptr.join(), "x":x, "y":y};
	
				snaps.push(snap);
			}
		}
		//events[ptr.join()] = eventObject; // should be a secondary function call to add an event to the object
		if (!lookup[id].snaps) lookup[id].snaps = [];
		lookup[id].snaps.push(snaps);
		//console
	},

	"findRegged":function(e) {
	//	console.log("test");
		var pos = getPos(e);
		if (!pos) return;
		var x = Math.floor(pos.x/this.snapWidth) * this.snapWidth;
		var y = Math.floor(pos.y/this.snapHeight) * this.snapHeight;
		
		//console.log(x+" "+y);
		// snap lookup has to also check for z axis to find the topmost element

		var sz = 0;
		var ar = {};
		var snapLookup = snapSpace.prototype.snapLookup;
		if (snapLookup.hasOwnProperty(x)) {
			if (snapLookup[x].hasOwnProperty(y)) {
				// do something with the object
				//refine the object now...
				var slu = snapLookup[x][y];
				//console.log(x+" "+y);
				//for (var ii in this.snapLookup[x][y])
				//	console.log(ii);
			//	console.log("_______________________");
				for (var i in snapLookup[x][y]) {
					var a = snapLookup[x][y][i];
					//console.log(a);
					if (gfxLookup[a.rect.gfxId].isHidden()) continue;
				 	var rect = a.rect; //getObject(a.rect, lookups[a.lookupName]);
					if (rect.div.ownerDocument.defaultView != e.view) {		
						continue; 
					}
					if (withinRect({"x":pos.x, "y":pos.y}, rect)) {
						// do further refinement of hit testing
						//console.log(j+" "+jj+"_marijuana_"+x+"_"+y+" "+i);
						//console.log("==x=x=x=xxxx===xx=");	
						var z = rect.z;
						if (!ar[z]) ar[z] = [];

						var idx = rect.index !== undefined ? rect.index : "";
						ar[z][i] = a;
						//console.log(a);
						//check properties .. is it visible?
						//	console.log(rect.z);
						sz = z >= sz ? z : sz;
					}
				}
			}
		}
		//console.log(ar);
		//console.log(ar[sz]);
		if (ar[sz]) {
			//console.log(sz);
			//console.log("yoooo");
		 
			return ar[sz];
		}


	},
			
	
	"overs":{},

	"mousemove":function(e) {
		var grid = snapGrids[this.id];
	//	console.log("testtttttttttttttttttt");
		//e.stopPropagation();
		//e.cancelBubble = true;
		//if (!moving)
		//console.log(e);
		//console.log(getPos(e));
		//console.log(this.id);
		var regged = grid.findRegged(e)
		//console.log(regged);
		//var objLookup;
		//var objLookup = lookups[reg.lookupName];

		//console.log("reggie reg");
		//console.log(regged);

		// find stuff that wasn't in there before
		

		var go = Object.getOwnPropertyNames(grid.overs);

		if (regged)
			var ro = Object.getOwnPropertyNames(regged);
		else ro = [];
		// test all out
			
		var ok = false;	
	//	if (regged && go.length > 0)

		if (!grid.entered) grid.entered = {};

		for (var r in regged) {
//			if (go.length > 0) 
			var le = regged[r].rect.ptr.join();
			//console.log("_______________localE___________");
			//console.log(le);
			var rr = regged[r];
			//console.log(rr);
			if (!events[le]) {				
				var eventType = rr.rect.cssType;
				//console.log("xx: "+eventType);
				//console.log(rr.rect.ptr[0]);
				var evt = events[eventType];
//				console.log(eventType);
				//console.log(events[eventType]);
			} else {
				evt = events[le];
			}
		//	if (!evt) console.log(

			if (!grid.entered[r]) {
				grid.entered[r] = rr;
				//console.log(grid.entered);
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

				//console.log("me");
				//console.log(grid.entered[me]);
				var evt = events[gem.rect.ptr.join()];
				//console.log(gem.rect.ptr);
				if (!evt) {
					//console.log(gem);
					//var uid = lookups[gem.lookupName][gem.rect.ptr[0]].universeid;
					var eventType = gem.rect.cssType;
					
					//console.log(uid);
					//console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^");
					evt = events[eventType];

					// mix in program level calls...

				}
				//console.log(evt)
				evt.handleMouseOut(gem, e)
				delete  grid.entered[me]
				ok = false;
			}
		}
	
/*

		for (var gi =0; gi < go.length; gi++) {
			var goji = grid.overs[go[gi]];
			var uid = gfxLookup[goji.ptr[0]].uid;
			var evt = events[uid];
			for (var ri = 0; ri < ro.length; ri++) {
				if (go[gi] == ro[ri]) {
					evt.handleMouseEnter(goji , e);
					console.log("testing mouse over....-------------------------------------------");
					ok = true;
					break;
				}
			}
			if (ri == ro.length-1 && ok == false) {
				evt.handleMouseOut(goji, e);
			}else if (ri == ro.length-1 && ok == true) 
				ok = true;
		}
*/

		//console.log(regged) 
		//console.log("___");

		for (var g in grid.movers)  {
			var gmg = grid.movers[g];
			
			//var uid = lookups[gmg.lookupName][gmg.rect.ptr[0]].universeid
			var evt = events[gmg.rect.ptr];
			if (!evt)
				evt = events[gmg.rect.cssType]
			evt.handleMouseDrag(gmg, e);
		}
/*

		for (var g in grid.overs) {
			//var obj = gfxLookup[grid.overs[g][0]];
			if (!regged) {
				delete grid.overs[g];
				continue;
			}
						

			if (!regged[g]) {
			//	console.log(g);
				//needs to be fixed for generic mouse outing...
				//console.log("testing mouse out.. HUH"+JSON.stringify(g));
			//	if (obj.handleMouseOut) {
					//console.log(grid.overs[g].type);
					//console.log("_____");
					var uid = gfxLookup[grid.overs[g].ptr[0]].uid ;
					var evt = events[uid];

					evt.handleMouseOut(grid.overs[g], e);
					//	}
				delete grid.overs[g];
			}
		}
*/
/*
		for (var r in regged) {
			//var gir = gfxLookup[regged[r][0]]
			// obvios issue is that the same ptr is being used for multiple stuff....
			if (!grid.overs[r]) {
				console.log("testing mouse enter..")
				//console.log(regged[r].ptr);
				var uid = gfxLookup[regged[r].ptr[0]].uid ;
				var evt = events[uid];
				//if (gir.handleMouseEnter)
				//console.log(regged[r]);
				//console.log(regged[r].type);
				//if (regged[r].type == "label") 
				//console.log("*&**");
				//console.log(evt);
				evt.handleMouseEnter(regged[r], e);	
			}
		}
*/
		grid.overs = {};
		//console.log(regged);
		for (var r in regged) {
			grid.overs[r] = regged[r];
			//var rr = gfxLookup[regged[r][0]];
			//console.log("testing on mouse move"+regged[g]);

			//if (rr.handleMouseMove) {
			var rr = regged[r];
			//var uid = lookups[rr.lookupName][rr.rect.ptr[0]].universeid ;
			var eventType = rr.rect.cssType;
			
			var evt = events[rr.rect.ptr.join()];
			if (!evt)
				evt = events[eventType];
			//console.log(uid + "<<uid");
			evt.handleMouseMove(rr, e)
			//}
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
			//	var gog = gfxLookup[grid.overs[g][0]];

			//console.log("testing mouse down..");

			//if (self.overs[g].handleMouseDown)

			//console.log(grid.overs[g]);

			//need to test whether or not to actually trigger a mouse move 

			//console.log(grid.overs[g];
			var gog = grid.overs[g];

//			var uid = lookups[gog.lookupName][gog.rect.ptr[0]].universeid;
				var eventType = gog.rect.cssType;
			
			//lookups[	
			// need to 'mixin types' 
			

			
			
			//events should have a 'type' 
			//var evt = events[grid.overs[g].ptr];  // do not delete 
			//
			if (!evt) 
				var evt = events[eventType];
			
			evt.handleMouseDown(gog, e); //gog.handleMouseDown(e);
			grid.movers[g] = gog; //grid.overs[g];
		}
	},
	"mouseout":function(e) {
		//console.log(e);
		//console.log("_-_-__-");
		var grid = this.id;
		if (!e.relatedTarget || e.relatedTarget.nodeName == "HTML") {
			for (var g in grid.overs) {
				var ggo = grid.overs[g];

				var uid = lookups[ggo.lookupName][ggo.rect.ptr[0]].universeid;
				//console.log(uid);
				var evt = events[ggo.rect.ptr.join()];
				var eventType = ggo.rect.cssType;
				//console.log(ggo.rect);
				if (!evt) {
			//		console.log(ggo.lookupName);
			//		console.log(uid);
			//		console.log("-----------------");
					evt = events[eventType];
			//		console.log(evt);
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
			//var gom = gfxLookup[grid.movers[g][0]];
			//console.log("testing mouse up.."+grid.overs[g]);
			//if (self.overs[g].__handlers.handleMouseUp) {
			//console.log("testing mouse up handler from __handlers");
			//console.log(grid.movers[g].ptr[0]);
			var gmg = grid.movers[g];
			//var uid = lookups[gmg.lookupName][gmg.rect.ptr[0]].universeid;
			var eventType = gmg.rect.cssType;
			
			var evt = events[gmg.rect.ptr.join()]
			if (!evt)
				evt = events[eventType];
			if (Math.abs(grid.mouseDownXY.x - pos.x) < 4 && Math.abs(grid.mouseDownXY.y - pos.y) < 4) {
				//	alert("click")
				//	console.log(grid.movers[g]);
				evt.handleMouseClick(gmg, e);
				//should remove the mouse up handler, and re-attach on mousedown
			}
			//moveHandler.prototype should be sectioned off
			evt.handleMouseUp(gmg, e);
			//console.log(grid.movers[g].handleMouseUp)
			//}
		}
		if (mc.length == 0) {
			if (Math.abs(grid.mouseDownXY.x - pos.x) < 2 && Math.abs(grid.mouseDownXY.y - pos.y) < 2) {
				//console.log(events);
				if (events["screenClick"]) {
					if (!events['ignoreScreenClick'])
					//for (var ei = 0; ei < events["screenClick"].length; ei++)
					//needs some extra logic to map which screen we're clicking..
					
					events["screenClick"](e);
				}
				//alert("clicked on blank canvas");
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
		//var id = ptr[0];
		//console.log(id);
	
		var gl = lookups[lookupName][id];
	
		//console.log(id);
		//console.log(gfxLookup[id]);
		if (!gl) { console.log("error!!!! no lookup with that name"+id); return; }
		if (!gl.snaps) { console.log("error, "+lookupName+" <> "+id+" gl.snaps not found..");  console.log(gl); return; }
		var sl = gl.snaps.length;
		snapLookup = snapSpace.prototype.snapLookup;
		//console.log("updating snapObject");
		for (var i=0; i < sl; i++) {
			var gls = gl.snaps[i];
			var glsl = gls.length;
			for (var j = 0; j < glsl; j++) {
				var glsj = gls[j];
				//console.log("deleting........."+glsj.x+" "+glsj.y+" "+glsj.ptr);
				//console.log(snapLookup[glsj.x][glsj.y][glsj.ptr]);
				//console.log("^^^^^^^^^^^^^^^");
				delete snapLookup[glsj.x][glsj.y][glsj.ptr];
			}
		}
		//console.log("____ggggllll_____");
		//console.log(gl) 
		delete gl.snaps;
		//grid.setItem(ptr);
		//console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx_________________________________xxxxxxxxxxxxxxxxxxxxxx");
		//gl.reindex();			
	}
}
//moveHandler = new moveHandler();
//grid = new snapSpace();
//alert("test..");


//move handler code to new file 



function userEvents() {
}


userEvents.prototype = {
	"handleMouseEnter":function(obj, e) {
	//	console.log(obj);
		var id = obj.rect.ptr[0];
		//var lookup = lookups[obj.lookupName];
		//var mlu = models[lookup[id].universeid];

		var csstype = obj.rect.cssType
/*
		if (mlu)
			var csstype = mlu.type;
		else 
			var csstype = obj.lookupName;
*/
	//	var type= ptr.ptr[ptr.ptr.length-2];
		//console.log(gfx);
		//console.log("*********");
		var p = getObject(obj.rect.ptr, graphLookup);	
		//console.log(p);
		var type = obj.rect.type ? obj.rect.type : "";
			
	//	if (type == "label") i
//		console.log("::::p:::::");
		//console.log(p);
		//alert("test");
		p.div.setAttribute(csstype+type, "over");
		//console.log(p.div);	

		//	console.log(ptr.div);
	//	}else 
	//	if (type == "index") {
		//	p.div.setAttribute(csstype+type, "over");
	//	}
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
	//	console.log(gfx);
//		return;
		//console.log("testing mouse out from this shit..");
		//console.log(gfx);
		var id = obj.rect.ptr[0];
		var csstype = obj.rect.cssType;
		var type= obj.rect.type;
		//console.log(obj);
		//console.log("*******^^^^********");	
		/*
		var ca = copyArray(ptr.ptr);
		ca.pop();ca.pop();
		var p = getObject(ca, graphics);
		graphLookup[id]["ptr"][p.ptr];
		*/
		var a = copyArray(obj.rect.ptr);
	//	a.pop();a.pop();	
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

		//alert("test...");
	}
}

// should be moved into a seperate file


function stageEventHandler() {
}
stageEventHandler.prototype = Object.create(userEvents.prototype);
stageEventHandler.prototype.handleMouseClick = function(obj, e) {

//	alert("test...");
	//console.log(ptr);
	//console.log(ptr);
	var ca = copyArray(obj.rect.ptr);
	//ca.splice(ptr.length-2, 2);
	//var o = getObject(ca, graphLookup);
	var h = gfxLookup[obj.rect.gfxId].isHidden()
	if (h) return;

	ca.pop(); 
	ca.pop();
//
	var lookup = lookups[obj.lookupName];
	var o = getObject(ca, lookup);
	console.log(o);
	//console.log("LOG LOG LOG LOG LOG LOG LOG LOG LOG LOG LOG LOG LOG");

	//console.log(o);
	//alert(ca);
	//console.log(o);
	//alert(ptr.ptr);
	//alert(o.);
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
			//alert("test...");
		       	// draw save menu dialog
		//	saveMenu.setup();
			stageMenu.hideMenu(); // either this or push the prior menu z axis below the "dialoogmenu"
		       	saveMenu.switchVisibility(e);
			//new storage.prototype.storeUniverse();
			//stageMenu.hideMenu();
			break;
	}
	//console.log("handling mouse click on "+ptr);
	//console.log(ptr);
	//stageMenu.hideMenu(e);
	////console.log("-----");
	//console.log(o.ptr);

	// determine what element we just clicked on ...., return the node value
}

function contextEventHandler () {
}
// need to change the extend to object.create and remove the .prototype shit...
 
contextEventHandler.prototype = Object.create(userEvents.prototype);

contextEventHandler.prototype.handleMouseCanvasClick = function(obj, e) {
	//alert("booo");
}

contextEventHandler.prototype.handleMouseClick = function(obj, e) {
	//alert("test...");
	//console.log(ptr);

	var r = Graph.prototype.getLabels(obj.rect.nodeRoot);
//	alert("test...");
//	return;
	switch (r.join()) {
		case "expand":
		//		alert("test..");
			contextMenu.showLastPtr();			
			break;
		case "hide":
			// set parent to
			contextMenu.hideLastPtr(); 
			break;
		case "rename":
			contextMenu.renamePtr();
			break;
		case "remove":
		//	alert("xxx");
			contextMenu.remove();
			break;
		case "add child":
		//	alert("test...");
			contextMenu.addChild();
			break;
		case "add sibling":
			contextMenu.addSibling();
			break;
		case "set type,value":
			contextMenu.setNodeType("value");
			break;
		case "set type,root":
			contextMenu.setNodeType("root");
			//alert("xxx");
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
			/*
		//	for (var g in graphLookup)
				if (graphLookup[g].type == 'program') {
					// most likely this will change......
					traverseProgram(graphLookup[g]);
				}
			*/
		//	break;
	}
	//console.log("handling mouse click on "+ptr);
	//console.log(ptr);
	contextMenu.hideMenu(e);
	////console.log("-----");
	//console.log(o.ptr);

	// determine what element we just clicked on ...., return the node value
}


function staticEvents() { }
 

staticEvents.prototype = Object.create(userEvents.prototype);

staticEvents.prototype.checkPtr = function(ptr) {
	return (ptrEvents.hasOwnProperty(ptr))
}
staticEvents.prototype["handleMouseDown"] =  function(obj, e) {
	//for (var i = 0; i < obj.rect.events.mouseDown.length; i++) {
	console.log(obj.rect.ptr);
	if (this.checkPtr(obj.rect.ptr.join()))
	
	if (ptrEvents[obj.rect.ptr.join()].handleMouseDown)
		ptrEvents[obj.rect.ptr].handleMouseDown();
	//}
	//staticEvents[
}

staticEvents.prototype[	"handleMouseDrag"]= function(obj, e) {
	if (this.checkPtr(obj.rect.ptr.join()))

	
	if (ptrEvents[obj.rect.ptr.join()].handleMouseDrag)	
		ptrEvents[obj.rect.ptr].handleMouseDrag();
}

staticEvents.prototype[	"handleMouseMove"]= function(obj, e) {
	//console.log(obj.rect.ptr.join());
	if (this.checkPtr(obj.rect.ptr.join()))

	
	if (ptrEvents[obj.rect.ptr.join()].handleMouseMove)
		ptrEvents[obj.rect.ptr].handleMouseMove();
}

staticEvents.prototype[	"handleMouseClick"]= function(obj, e) {
//	alert("test..");
//	console.log(obj.rect.ptr.join());
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
//console.log(contextEventHandler.prototype);

// todo manage ptr to events //
// then refresh ptr event // 




var handlerData = {};

function moveHandler(f) {
	this.caller = f;
}
moveHandler.prototype = Object.create(userEvents.prototype);

moveHandler.prototype.register = function(f) {
	this.caller = f;	
}
moveHandler.prototype.handleMouseClick = function(gfx, e) {
	//alert('test..');
	//alert(ptr.ptr);
	this.caller.handleMouseClick(gfx, e);
}
moveHandler.prototype.handleMouseEnter = function(gfx, e) {
	// get object, change the css state
	this.caller.handleMouseEnter(gfx, e);
}
moveHandler.prototype.handleMouseDown = function(obj, e) {
	//console.log(self.obj);
	// right now, this code is specific for moving the shit around
	// needs to test type
	//console.log("test test test...");
	var ogptr = obj.rect.ptr;
	ptr = obj.rect.ptr;
	//console.log(ptr);
	//console.log("____");
	var id = ptr[0];
	//todo 
	/*
	   gfxLookup[id].model.draggable 
	   if (!self.draggable) {
	   console.log("xxx");
	   return;
	   }
	   */
	if (!handlerData.offset) {
		//console.log("*)()(())()(*");
		//getmouseposition
		handlerData.ogup = getPos(e);
		var pos = getPos(e);
		//console.log(pos.x+" "+abs.x);
		//console.log(id);
		//var lookup = lookups[obj.lookupName];
		//var abs = lookup[id].loc;
		var abs = getObject(obj.rect.gfxRoot, graphLookup).loc;
		handlerData.offset = {"x": pos.x - abs.x, "y": pos.y - abs.y};
		//console.log("offset: "+self.offset);
	}
	this.caller.handleMouseDown(ogptr, e);

e
}
// should probably be a new one
//mover.layer.on("mousemove",
moveHandler.prototype.handleMouseMove = function(obj, e) {
	this.caller.handleMouseMove(obj.rect, e);
}
moveHandler.prototype.handleMouseDrag = function(obj, e){
	var ogptr = obj.rect;
	//console.log(self.draggable);
	//	console.log("xx");

	/*
	   if (!handler.draggable) {
	//	console.log("uu");
	return;
	}`
	*/
	//	var pos = stage.getUserPosition();
	ptr = obj.rect.ptr; // 
	var lookup = lookups[obj.lookupName];
	//console.log(obj.rect.gfxId + "<<");
	var gfo = gfxLookup[obj.rect.gfxId];
	//console.log(pos.x);
	if (handlerData.offset) {
		var pos = getPos(e);

		if ((pos.x - handlerData.offset.x) <= 0) {

			gfo.setX(0);
			gfo.reindex();
			return;
			//gfo.putToScreen();
			//	self.root.stopDrag();
			//	return;
		}

		if ((pos.y - handlerData.offset.y)  <= 0) {
			gfo.setY(0);
			gfo.reindex();
			return;
			//self.layer.draw();
			//	self.root.stopDrag();
			//	return;
		}

		//	console.log("________________");
		//console.log(pos.x+" "+handlerData.offset.x);
		gfo.setXY( pos.x - handlerData.offset.x, pos.y - handlerData.offset.y);

		//snapSpace.prototype.updateSnapObject(ptr[0]);
		
		// this really shouldnt be here -- this was just put there because as you dragged it was weird ...
		// the onmouse over commands should be ignored if moving
			gfxLookup[obj.rect.gfxId].isDragging = true;
		gfo.reindex();
		//.layer.draw();
	}
	this.caller.handleMouseDrag(ogptr, e);

}

//mover.layer.on("mouseup", 
moveHandler.prototype.handleMouseUp = function(obj, e) {
	var ogptr = ptr.rect;
	ptr = obj.rect.ptr;
	
	handlerData.offset = false;
;
	var lookup = lookups[ptr.lookupName];
	var gfo = gfxLookup[ptr[0]]; // perhaps gtfo is a better variable name
	gfxLookup[obj.rect.gfxId].isDragging = false;

	this.caller.handleMouseUp(obj, e);

}

moveHandler.prototype.handleMouseOut = function(ptr, e) {
	//ptr = ptr.ptr;
	this.caller.handleMouseOut(ptr, e);
}

//extend(userEvents, moveHandler); // this doesnt really extend, it just adds in the missing functions for mouse events.

function inputBoxHandler() {
	//alert('test...');
}
inputBoxHandler.prototype = Object.create(userEvents.prototype);

inputBoxHandler.prototype.handleMouseClick = function(ptr, e) {
	/*
	   console.log(ptr.ptr+" <<<<");
	   var o = getObject(ptr.ptr, graphics);
	//o.div.firstChild.focus();
	var i = o.div.firstChild;
			gfo.selected = !gfo.selected

	console.log("_____");
	*/

}
	
function linkCurveHandler() {

}

linkCurveHandler.prototype = Object.create(userEvents.prototype);
linkCurveHandler.prototype.handleMouseEnter = function(rect) {
	console.log("testing... link curve mouse over");
//	cl = curveLookup[rect.rect.ptr[0]][rect.rect.ptr[1]]
//	cl.test();
}
linkCurveHandler.prototype.handleMouseOut = function(rect) {
//	cl = curveLookup[rect.rect.ptr[0]][rect.rect.ptr[1]]
//	cl.untest();
}

linkCurveHandler.prototype.handleMouseClick = function(rect) {
	console.log("testing link curve mouse click");
}
linkCurveHandler.prototype.handleMouseUp = function(rect) {
	
}

function nodeEventHandler() {

}

nodeEventHandler.prototype = Object.create(userEvents.prototype);


nodeEventHandler.prototype["handleMouseClick"] = function(obj, e) {
		//alert("test");
		//console.log(gfx);
		//console.log("click");
		//console.log(gfx);
		//console.log(obj.rect);
		var or = obj.rect;
		//console.log("--");
		//console.log(obj);
		//console.log("00-------------------00");
//		if (gfxLookup[.gfxId].baseElement.ownerDocument.defaultView != e.view) return;
		
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
			
			// get x,y of ptr .. draw svg line
			// this should be in the html renderer
			obj.rect.div.setAttribute(csstype, obj.rect.selected ? "selected" : "unselected");
			
			if (s1 && s2) { 
				// the connection vector should end with the item integer
				//graph = graphLookup[s1.id];
				//graph.prototype.connect(s1.graphptr, s2.graphptr);
				//alert("test..");
		//		var s1c = copyArray(s1.rect.indexRoot);
		//		var s2c = copyArray(s2.rect.indexRoot);
				// should call Graph.prototype.connect, then call the gfx's re-render 	
				Gfx.prototype.connect(s1.rect, s2.rect);

	
				s1.rect.div.setAttribute(csstype, "unselected");
				s2.rect.div.setAttribute(csstype, "unselected");
				s1.rect.selected = false;
				s2.rect.selected = false;
				delete nodeEventHandler.prototype.selection1
				delete nodeEventHandler.prototype.selection2
				// add another link box
				// draw the bezier
				// set the boxes to normal
				// get direction 
				// 
				//alert("yo");
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
	//	var type= ptr.ptr[ptr.ptr.length-2];
		//console.log(gfx);
		//console.log("*********");
		var p = getObject(obj.rect.ptr, graphLookup);	
		//console.log(p);
		var type = obj.rect.type	
	//	if (type == "label") {
		//console.log("test....");
		p.div.setAttribute(csstype+type, "over");
		//	console.log(ptr.div);
	//	}else 
	//	if (type == "index") {
		//	p.div.setAttribute(csstype+type, "over");
	//	}
	}

	nodeEventHandler.prototype["handleMouseOut"] = function(obj, e) {
	//	console.log(gfx);
//		return;
		//console.log("testing mouse out from this shit..");
		//console.log(gfx);
		var id = obj.rect.ptr[0];
		if (	gfxLookup[obj.rect.gfxId].isDragging)
		       	return;

		var csstype = obj.rect.cssType;//models[graphLookup[id].universeid].type;
		var type= obj.rect.type;

		/*
		var ca = copyArray(ptr.ptr);
		ca.pop();ca.pop();
		var p = getObject(ca, graphics);
		graphLookup[id]["ptr"][p.ptr];
		*/
		var a = copyArray(obj.rect.ptr);
	//	a.pop();a.pop();	
		var selected = !getObject(a, graphLookup).hideChildren;
		
		switch (type) {
			case "index": 
				//alert("test2");
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
		//gfxLookup[id].redrawImages();
	}


// need to change this to the standard Object.create(...)


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
