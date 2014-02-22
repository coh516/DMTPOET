
// need to form a strategy to manage the zindex properly.....

function linkCurve() {

}
//hardcoded to gfx type ptr and singleton...
//should be referenced as part of the graphics window
linkCurve.prototype = {
	"setup": function(win) {

		linkLookup = {};
		curveLookup = {};
		lookups["curveLookup"] = curveLookup;
		//alert('test');

		var xmlns = "http://www.w3.org/2000/svg";
		var ver = "1.1";
		var svg = document.createElementNS(xmlns, "svg");
		svg.setAttribute("xmlns", xmlns);
		svg.setAttribute("version", "1.1");
		// really, there should be some quantized segments
		svg.style.zIndex = zIndex["svg"]//10000; //qIndex["svg"];
		svg.style.position = "absolute";
		//svg.setAttribute("height",  "2000");
		//svgee = svg;
		linkCurve.prototype.svg = svg;
		// not sure if this is the best approach ... but the link curve needs to be quantized .. so we'll do it like this.. maybe figure smoetning to extend the functionality of the universe model to add link curves... 
		events["curveLookup"] = new linkCurveHandler();		
		win.document.body.appendChild(svg);

		console.log(window.parent.window.graphLookup);



	//	this.gfxSuffix = ['gfx', 'ptr'];
		
		//var elem = document.createElementNS(xmlns, "path");
	},
	"points": function() {
		//not sure if this is needed
	},
	"curves": {},
	"getCurves": function(id) {
		// go through ptrs of both o1 and o2
	},
	"drawToCanvas": function() {},
	"_drawCurve": function(o) {
		//console.log("O:"+o);
		//console.log("S:"+s);
		//console.log("_________cats!_____");
		// check to see if theres a link at the item.....
		var hasLine = false;
		var n, c, p;
		var oo = getObject(o, graphLookup);
	//	console.log(oo);
	//	console.log("--------zzzzzzzzzzzzzzzzzzzzzzz----------------");
		for (var idx = 0; idx < oo.index.length; idx++) {
			var odx = oo.index[idx];
			
			var co = copyArray(o);
		//	console.log(odx);
		//	console.log("odx...");
		//	console.log("cococococ: "+idx);
			co = co.concat(["index", idx]);
		//	console.log(co);
		//	console.log("----------xxx==------");
			if (odx.children) if (n = odx.children.length) {
				var oc = odx.children;
				//console.log("yooo__c");
				for (var i = 0; i < n; i++) {
					c = oc[i]; // get pointer to index
					var c = getCurve(co, c);
					//console.log(c);
					c.delRegObj();
					c.draw();
				//	c.register();
				}
			}
			if (odx.parents) if (n= odx.parents.length) {
				var op = odx.parents;
				//console.log("yooo__p");
				
				for (var i = 0; i < n; i++) {
					p = op[i];
					//console.log("---------------------");
					//console.log(p);
					//console.log(o);
					//console.log("^^^^^^^^^^^^^^^^^^^^^")
					var p = getCurve(p, co);
					p.delRegObj();
					p.draw();
				//	p.register();
				}
			}
		}
		// check parent and child 'gfx' to see if there is a curve object in there...
	},
	"drawCurve": function (c) {
		var o = graphObjLookup[c[0]];
		//o.svgPath = document.createElement("path");
		//var svg = linkCurve.prototype.svg;
		o.recurseItems(linkCurve.prototype._drawCurve);
	},

	"drawCurves": function(c1, c2) {
		//console.log("test...");
		//console.log("______________________");
		//console.log(c1);
		this.drawCurve(c1);
		//this.drawCurve(c2);
		/*
		var o = graphLookup[c1[0]];
		o.svgPath = document.createElement("path");
		var svg = linkCurve.prototype.svg;
		o.recurseItems(linkCurve.prototype._drawCurve);
		*/

		// get x,y of 
	},
	"testCurve": function() {

		// if was a canvas ...
		//copy image to pixelbuffer..
		//since svg, just add an event listener..
	}

}


// assumes parent is p and child is c... gotten from the ptr index
function getCurve(p,c) {
		
	var pj = p.join();
	var cj = c.join();

	

	if (curveLookup.hasOwnProperty(pj)) if (curveLookup[pj].hasOwnProperty(cj))
		return curveLookup[pj][cj];
	/*
	if (curveLookup[cj])
		if (curveLookup[cj][pj])
			return curveLookup[cj][pj];
			*/
	if (!curveLookup[pj]) curveLookup[pj] = {};
	//console.log(pj+" <<>> "+cj);
	curveLookup[pj].uid = "linkCurves";	
	return curveLookup[pj][cj] = new curveLine(p, c);
}
function reduceAfterIndex(ptr) {
	var index = ptr[ptr.length-1]+1;
	var pta = copyArray(ptr);
	pta.pop();
	var o = getObject(pta,	graphLookup);

//	console.log(ptr);
//	console.log("from reduce aftert index");
	for (var i=index; i < o.length; i ++) {
		var check = copyArray(pta);
		check.push(i);
		var cj = check.join();
		var p = o[i].parents;
		//alert(p);
		for (var j=0; j < p.length; j++) {
			//p[p[j].length-1]--;
			//alert(p);
			var po = getObject(p[j], graphLookup);
			for (var c = 0; c < po.children.length; c++) {
				var poc = po.children[c];
	//			console.log(po.children[c].join+" "+cj);
	//			console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&---------------------1111111```````111111---");
			//	alert(poc+" K> "+cj);
}
				if (poc.join() == cj) {

					var pj = p[j];
					if (linkLookup[pj]) {
						var ll = linkLookup[pj][poc];
						ll.parentNode.removeChild(ll);

						delete linkLookup[pj][poc];
						delete linkLookup[pj];

						delete curveLookup[pj][poc];
						delete curveLookup[pj];
					}
					//	} catch (e) { 

					//		alert("po[c]");
					poc[poc.length-1]--;
					//delete [p][poc]
				}
			}
		

		var c = o[i].children;
		for (var j=0; j < c.length; j++) {
			//p[p[j].length-1]--;
			//alert("faker");
			var co = getObject(c[j], graphLookup);
			console.log(co);
			for (var p = 0; p < co.parents.length; p++) {
				var cop = co.parents[p];
				if (cop.join() == cj) {
					//alert(linkLookup[cop]);
					console.log(linkLookup[cop]);
					console.log("_-----------------------_");
					if (linkLookup[cop]) {
						var ll = linkLookup[cop][c[j]];
						ll.parentNode.removeChild(ll);
					
						delete linkLookup[cop][c[j]];
						delete linkLookup[cop][c[j]];

						delete curveLookup[cop][c[j]];
					
						delete curveLookup[cop];
					
					}
					//	} catch (e) { 


					cop[cop.length-1]--;
				}
			}
			if (c[j].join() == cj) {
				c[c.length-1]--;
				alert("reducing...");
			}

		}
	}

}

function deleteLineFromClick() {

	// should keep link to gfx ['index', 0, 'gfx', 'ptr']
	// for now, assume gfx,ptr


	var pj = this.pj
	var cj = this.cj;

	// remove element from dom
	// unlink child from graph
	//
	 
	console.log(pj+" "+cj);

	var ll = linkLookup[pj][cj];

	var cl = curveLookup[pj][cj];

//	if (!cl)// alert("wtf");

//	ll.parentNode.removeChild(ll);
	ll.parentNode.removeChild(ll);
	console.log(ll);
//	console.log("---------------------");
//	console.log(cl);
	//var p = getObject(cl.o1, graphLookup);
       	var p = graphObjLookup[cl.o1[0]];
	var c = graphObjLookup[cl.o2[0]];
	console.log(p);
	p.removeLink(cl.o1, cl.o2);

	// reduce indexed parents

	//c.removeChild(cl.o2, cl.o1);
	var po = (getObject(cl.o1, graphLookup))

	var co = (getObject(cl.o2, graphLookup));
	// remove references 
	
	var idx = cl.o1[cl.o1.length-1];
	var pp = copyArray(cl.o1);
	var cc = copyArray(cl.o2);
	var pi = pp.pop(); var ci = cc.pop();
	
	if (po.children.length == 0 && po.parents.length == 0) {
		var ppo = getObject(pp, graphLookup);
		reduceAfterIndex(cl.o1);
		ppo.splice(pi, 1); 

	//	reduceAfterIndex(cl.o2);
	}
	if (co.parents.length == 0 && co.children.length == 0) {
		var cco = getObject(cc, graphLookup);
		//alert("test2..");
		reduceAfterIndex(cl.o2);

		cco.splice(ci, 1);


	}
	if (po.children.length == 0 && po.parents.lenth == 0) {
	}
	
	if (co.parents.length == 0 && co.children.length == 0) {
	}
	console.log(cl);
	
	/* needs to be fixed better to attach links to other than ptr graphics */

	//better method rather than hardlinking gfx.ptr .. ptr should link to gfx.ptr obj instead

	var gfxId1 = graphLookup[cl.o1[0]].gfx.ptr.gfxId;
	var gfxId2 = graphLookup[cl.o2[0]].gfx.ptr.gfxId;


	gfxLookup[gfxId1].rebuild();
	gfxLookup[gfxId2].rebuild();
	// reduce po.children[index > idx] 
	//
	
//	console.log(po);
	
//	console.log(co);	
	//delete linkLookup[pj];
	if (linkLookup[pj])
		delete linkLookup[pj][cj];
	if (curveLookup[pj])
		delete curveLookup[pj][cj];

	events['ignoreScreenClick'] = false;
	console.log(getObject(cl.o1, graphLookup));
	console.log(getObject(cl.o2, graphLookup));


	// probably should be in the html renderer.....
	// clear line, then edit parent
	// remove links from parents and children 
	//graphLookup[cl.o1[0]].();
	//graphLookup[cl.o2[0]].rebuild();
}

function unselectLine() {
	var pj = this.pj;
	var cj = this.cj;
	try {
	linkLookup[pj][cj].style.stroke = "red";
	} catch (e) { }
	events['ignoreScreenClick'] = false;
	
}

function selectLine() {
	//alert("test...");
	var pj = this.pj
	var cj = this.cj;
	try { 
	linkLookup[pj][cj].style.stroke = "pink";
	} catch (e)  { }
	events['ignoreScreenClick'] = true;
	//linkLookup[pj][cj].over = true;	
	//console.log(pj+" <<<<>>> "+cj);
}

function curveLine(o1, o2) {
	this.o1 = o1;
	this.o2 = o2;
	var pj = this.pj = this.o1.join();
	var cj = this.cj = this.o2.join();
	if (!linkLookup[pj])
	       linkLookup[pj] = {};

	// should be from css
	
	var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	// a further quantization utility is required 
	// to create a hit test image:: canvas context putImage dataurl = 'data:image/svg+xml, '+encodeUriComponent((new XMLSerializer).serializeToString(svg));
	// getting a pixel is pretty quick for 1 pixel
	path.onclick = deleteLineFromClick.bind({"pj":pj, "cj":cj});
	path.onmouseover = selectLine.bind({"pj":pj, "cj":cj});
	path.onmouseout = unselectLine.bind({"pj":pj, "cj":cj});
	linkLookup[pj][cj] = path;

	this.g1 = this.getGfx(this.o1);
	this.g2 = this.getGfx(this.o2);

	linkCurve.prototype.svg.appendChild(linkLookup[pj][cj]);
}

curveLine.prototype = {
	"delRegObj":function() {	
	//		snapSpace.prototype.updateSnapObject(this.pj, "curveLookup");
	},
	"register": function() {

		//console.log(this.pj);

		//console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

	//	if (curveLookup[this.pj].og)
		//	snapSpace.prototype.updateSnapObject(this.pj, "curveLookup");
	//	else {
			//if (curveLookup[this.pj].snaps)
			//	snapSpace.prototype.updateSnapObject(this.pj, "curveLookup");			 
			
			//snapSpace.prototype.regObject([this.pj, this.cj, "rect"], "curveLookup");
			
			curveLookup[this.pj].og = true;
	//	}
		curveLookup[this.pj].universeid = "curveLookup";	
	},
	"getXY": function(o, sw) {
		//console.log(o);
		var x = o.x + ((o.right - o.x) / 2);   // needs to also have the line width in there
		var y = o.y + ((o.bottom - o.y) / 2);
		//console.log("________________oooo--");
		return {"x":Math.ceil(x), "y":Math.ceil(y)}
			//convert to graphics object	
	},
	"getGfx": function(o) {
		//this.mkPtr(o1, o2);
	//	alert(o);
		var a1 = copyArray(o);
		//console.log(a1);
		//console.log("&**&*********** a1 items")
		//console.log(getObject(a1, graphLookup));
		//var gl = getObject(a1, graphLookup).gfx.length;
			
		var i1 = a1.pop(); a1.pop(); a1Items = getObject(a1, graphLookup).gfx.length;
		//var i2 = a2.pop(); var a2Items = getObjects(a2, graphObject); a2.pop();
		// if the index is 0, and there are 5 items, then the gfx is 5-1-0
		// if the index is 2, ....................., then the gfx is 5-1-2
		//console.log(a1Items-i1);
	
		
		var a1Index = a1Items-i1
		//if a1Items = 2 .. that means theres a label and a free space
		//if a1Items = 3 .. then there is a label and 2 free spaces
		//if a1Items =4 .. then there is a label and 3 free spaces

		// in the future this is going to need to be refactored as PtrLinkCurve 
		// when more curve drawing tools are available....
		// for now this is ok, as its hardcoded to the ptrGfx class...
		a1 = a1.concat(["index", i1, "gfx", "ptr"]);
	
		var o1 = getObject(a1, graphLookup);
		//console.log("o1:::::"+a1);
		//console.log(o1);
		return o1;
		//var o2 = getObject(a2, graphObject);
	},
	
	"delete":function() {
		var pj = this.pj;
		var cj = this.cj;
		//console.log(this);
		snapSpace.prototype.updateSnapObject(pj, "curveLookup");				
		var path =  linkLookup[pj][cj];
		path.parentNode.removeChild(path);
		delete linkLookup[pj][cj];
	       	delete this;
		delete curveLookup[pj][cj];
		//console.log("*@$*@#$#@#@");
	},
	"draw": function() {
		g1 =  this.getGfx(this.o1);
		g2 = this.getGfx(this.o2);
		//console.log("g1:");
		//console.log(this.g1);
		//console.log(this.g2);
		//console.log("_______");
		var g1xy = this.getXY(g1, 4);
		var g2xy = this.getXY(g2, 4);
		//console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
		//console.log(g1xy);
		//console.log(g2xy);
		// x1/y1 / x2/y2 should be 1/3'd on the x asis where the y is fixed
		var d = Math.abs((g1xy.x - g2xy.x) / 2);
		if (g1xy.x < g2xy.x) {
			var x0 = g1xy.x;
			var x1 = g1xy.x+d
			var x2 = g2xy.x-d;
			var x3 = g2xy.x;			
		}else {	
			var x0 = g2xy.x;
			var x1 = g1xy.x-d;
			var x2 = g2xy.x+d;
			var x3 = g1xy.x;
		}

		if (g1xy.y < g2xy.y) {
			var y0 = g1xy.y;
			var y1 = g1xy.y;
			var y2 = g2xy.y;
			var y3 = g2xy.y;	
		}else {	
			var y0 = g2xy.y;
			var y1 = g1xy.y;
			var y2 = g2xy.y;
			var y3 = g1xy.y;
		}
		// and within same element...
		if (g1xy.x == g2xy.x) {
			x1-=15
			x2-=15
		}

		if (g1xy.y == g2xy.y) {
			y1-=15
			y2-=15
		}

		//var d = "M150 0 L75 200 L225 200 Z";
		//instead of setting the height and width from scrollbars, it should be from
		//content instead (getMaxRegdItem) or something
		linkCurve.prototype.svg.setAttribute("height", snapSpace.prototype.maxY); 
		linkCurve.prototype.svg.setAttribute("width", snapSpace.prototype.maxX);
		var d = ["M", g1xy.x, g1xy.y,  "C", x1, y1, ",", x2, y2, ",", g2xy.x, g2xy.y]; 
		var p = linkLookup[this.pj][this.cj];
		//console.log(d);
		this.rect = {"div":p, "x": x0, "y": y0, "z": 1, "right":x3, "bottom":y3, "height":Math.abs(g1xy.y-g2xy.y), "width":Math.abs(g2xy.x-g1xy), "ptr":[this.pj, this.cj]};
		p.setAttribute("d", d.join(" "));
		p.style.fill = "none";
		p.style.stroke = "red";
		p.style.strokeWidth = "3";
		// get graphics content from graph object
	},
	"test":function() {
		this.rect.div.onclick = function() { alert() };
	},
	"untest":function() {
	       delete this.rect.div.onclick;	
	}
}

