// need to 1/e->pi ratio for uid marker 
var rect = {"height":0, "width":0, "x":0, "y":0}

function htmlRenderer() {
}
//graphics = {}; 
htmlRenderer.prototype = {
	"setElement":function(uid, id) {
		
		if (!graphLookup[id].el) {
			graphLookup[id].el = document.createElement("ul"); //global canvas object
			var appendEl = true;
		}
		var el = graphics[id].el; // this may or may not be the best way of doing it.. it might actually be faster to rerender the bounded elements
		var uid = graphLookup[id].universeid;
	//	console.log(uid
		var type = models[uid].type;
		el.width = 400;
		el.height = 400;
		el.style.position = "absolute";
		el.setAttribute("class", type+"UL");
		// = {"position":"absolute", "left":0, "top":0};
		var model = graphLookup[id];

		var lz = gfx.prototype.lastz+1;
		if (!lz) lz = 0;

		if (!model.loc) {
			model.loc = {"x":0, "y":0, "z":lz};
		} else if (!model.loc.z)  
			model.loc.z = lz;
		
		gfx.prototype.lastz = model.loc.z;
		el.style.zIndex = model.loc.z;//ng;
		//this.zIndex = ng;
		//var model = graphLookup[id];
		if (model["hidden"])
			el.style.display = "none"
		if(appendEl)
			document.body.appendChild(el);
	//	alert('test');
	},

	// needs a 'reg' only function.. rebuilding the 
	// thing makes it lose some of the attributes regarding graphics 
	// states
	//
	//
	"delDomRefs":function(ar){
		var o = getObject(ar, graphLookup);
		delete o.tableDiv;
		delete o.tableRow;
		//o.
	},
	
	"mkPtrImgs":function(id, cb) {

		//delete graphics[id];
		//graphics[id] = {};

		// need to clean out the remaining tableRow and tableDivs 
		delete graphLookup[id].tableDiv; delete graphLookup[id].tableRow;
		graphLookup[id].recurseItems(htmlRenderer.prototype.delDomRefs)
		var tl = graphLookup[id]["item"];
		gfxLookup[id].cnt = 0;
		gfxLookup[id].imgCount = 0;
		this.countPtrImgs(id, [id, "item"], 0);
		//
		//console.log(">>>>>>>>> meow"+this.cnt);
		//return;
		// keep it official, static prototype callz
		//
		graphics[id].el.innerHTML = "";
		htmlRenderer.prototype.recursePtrImgs(id, [id, "item"], 0, Object.create(rect), cb, [id, "item"]);
		//var ma = Object.getOwnPropertyNames(tl);
		//},
	},

	"countPtrImgs":function(id, tla, x) {
		//var images = [];
		//var count = 0;
		var tl = getObject(tla, graphLookup);
		var tll = tl.length;
		var tpl = 0;
		for (var y=0; y < tl.length; y++) {
			var tlg = tl[y];
			var tlc = copyArray(tla);
			tlc.push(y);
			gfxLookup[id].cnt++;
			if (tlg["item"]) {
				//  this.cnt++;	
				tlc.push("item");
				htmlRenderer.prototype.countPtrImgs(id, tlc, x+1);
			}
			//else break;
		}
		//	console.log(gfxLookup[id].cnt);
		//	return tpl;
	},


	// really should use a reverse decorator that traces into the last node, then
	// recurses back out
	"recursePtrImgs":function(id, tla, x, rect, cb) {
		//var images = [];
		var count = 0;
		var tl = getObject(tla, graphLookup);
		var tll = tl.length;
	//	gfxLookup[id].cnt;
		var el = graphics[id].el
		el.style.top = graphLookup[id].loc.y+"px";
		el.style.left = graphLookup[id].loc.x+"px";

		for (var y=0; y < tl.length; y++) {
			var tlg = tl[y];
			var cta = copyArray(tla);
			cta.push(y);
		

			//if (!ok)
			// rl is really confusing, "rect" should be nested inside the cta+["item"];
			//
 			var rl = htmlRenderer.prototype.mkPtrImg(id, cta, x, y, rect, cb);
		
			//fix me
			//var s = getObject(ar, graphics);
			var hide = tlg.hideChildren;
			
			
			if (tlg["item"] && !hide) {
			//	ar2.push("item");
				cta.push("item");
			 	htmlRenderer.prototype.recursePtrImgs(id, cta, x+1, rl, cb)
			}
		}
		delete el;
	},

	"_reindex":function(tl, id) {
		//alert(id);
		for (var y=0; y < tl.length; y++) {
			for (var idx =0; idx < tl[y]['index'].length; idx++) {
				var group = tl[y]['index'][idx]['gfx']
			//console.log("yooo");
			//for (var d =0; d < group.length; d++) {i
				//cons
				//ole.log("testinnnnnn");
				var gdg = group;
				var div = group.div;
				var pos = getElPos(div);
				var w = div.offsetWidth;
				var h = div.offsetHeight;
				gdg.height = h; gdg.width = w; gdg.z = graphLookup[id].loc.z; gdg.x = pos.x; gdg.y = pos.y; gdg.right = w+pos.x; gdg.bottom = h+pos.y;
				//console.log(gdg);
				snapSpace.prototype.regObject(gdg.ptr, "graphLookup");
			}
			var group = tl[y]['gfx'];

			var gdg = group;
			var div = group.div;
			var pos = getElPos(div);
			var w = div.offsetWidth;
			var h = div.offsetHeight;
			gdg.height = h; gdg.width = w; gdg.z = graphLookup[id].loc.z; gdg.x = pos.x; gdg.y = pos.y; gdg.right = w+pos.x; gdg.bottom = h+pos.y;
			//console.log(gdg);
			snapSpace.prototype.regObject(gdg.ptr, "graphLookup");
			delete div;
			if (tl[y]["item"])
				htmlRenderer.prototype._reindex(tl[y]["item"], id)
		}
	},
	"reindex":function(id) {
		//console.log("breakpoint");
		htmlRenderer.prototype._reindex(graphics[id]["item"], id);
	},

	"getLayoutType":function(ptra) {
		//return;
		var pc = copyArray(ptra);
		var pcl = pc.length-1;
		for (var i = pcl; i >=0; i--) {
			var g = getObject(pc, graphLookup).layout
			if (g) return g;
			pc.pop(); 
		}
		return false;
	},

	// tlg looks to be leaking memory, use ptra instead 
	"mkPtrImg":function(id, tlga, x, y, rect, cb) {

		var ptra = tlga; 	
		var tlg = getObject(tlga, graphLookup);


		var linkHeight = this.linkHeight;

		//var thisIndex = tlg["index"];
		var text = tlg["value"]
	//	console.log(tlg);

		var model = graphLookup[id];
		var images = [];
		var pptr = copyArray(ptra);
		pptr.pop();pptr.pop();
		var el = getObject(pptr, graphLookup).el;
	//	console.log(pptr+"   << pptr");
		var cta = copyArray(ptra);
		
		cta.pop(); cta.pop();
	//	console.log(cta +" <<<<<< cta");
		var po = getObject(cta, graphLookup);
		//var lt = htmlRenderer.prototype.getLayoutType(tlga);
		
		var freshtable = po.layout == "grid" && !po.tableDiv;
		
		var ft = false;
	//	console.log("cta....");
	//	console.log(po);
		if (freshtable) {
			ft = true;
		//	console.log("grizzle grizzle");
		//	console.log(po);
		//	console.log("&^^^");
		//	console.log(tlg);

			//	alert("grizzle");
			//	alert("griddla");
			var label = document.createElement('div');

			label.setAttribute("gridtable","table");
			
			var row = document.createElement("div");
			
			row.setAttribute("gridtable","row");
			po.tableDiv = label;//c1; // = {"parentTable": c1}; //layout; // should just have parentTable (row is useless)
			
			tlg.tableRow = row;
			label.appendChild(row);

			//throw('xxxxx');
			el.appendChild(label);
			el = row;
			//li.appendChild(label);
			//layout needs to nest
			//return {"rect":rect, "layout":layout}	
			//li = row;	
			var setGrid = {"tableDiv": label, "tableRow":row}
		//	alert("abc");
		}

		var newRow = false;
		
		if (po.layout == "grid" && po.tableDiv && !ft) { // && !po.tableRow && !tlg.tableRow) {
		//	console.log("-------------------fresh");
			var row = document.createElement("div");
			row.setAttribute("gridtable", "row");
			li = po.tableDiv; //getObject(pot.tableDiv, graphLookup);
			li.appendChild(row);
			li = row;
			el = row;
			newRow = row;
			tlg.tableRow = row;//c1;
		}

		//if (tlg.tabletGRow)
		//	var prow = tlg.tableRow; //getObject(tlg.tableRow, graphLookup);

	
		if (po.tableRow)
			var prow = po.tableRow; //getObject(po.tableRow, graphLookup);

	
		var o = htmlRenderer.prototype.getLayoutType(cta);
		//alert(o);
		if (prow && o == "grid") {
			//alert('test');
		//	console.log("------ooo------");
			//console.log(layout);
			var pro = prow; //layout.parentRow;
		//	throw('xxxx');
			//var pro = getObject(prow, graphLookup);
			var cell = document.createElement("span")
			cell.setAttribute("gridtable", "cell");
			var ul = document.createElement("ul");
			ul.setAttribute("class", "ptrUL"); // fix
		//	console.log("parentRow"+prow);
			//console.log(pro);
			pro.appendChild(cell);
			cell.appendChild(ul);
			el = cell;
			//alert('test.....');
		}
		tlg.gfx = [];

		var loc = graphLookup[ptra[0]].loc;
		var zi = graphLookup[ptra[0]].loc.z;
		if (zi == undefined || zi == NaN) {   
			var zi = gfx.prototype.topz+1;
			if ( zi == undefined || zi != NaN) {
				zi = 0; //wtf?
				//gfx.prototype.topz = 0
			}
		}
		gfx.prototype.topz = zi;
		// get parentNode?
		var type = models[graphLookup[id].universeid].type;
		var links = 0;
		
		if (tlg.index) {
			til = tlg.index.length-1;
			var tit = tlg.index[til];
			if (tit.children.length > 0 || tit.parents.length > 0)
				links = tlg.index.length+1;
			else links = tlg.index.length;
		} else links = 1;
		var tof; // = layout;
		
		// should have something like 'usesPtrLinks' .. uggh .. dirty code.
		for (var i = links-1; i >=0; i--) {// links; i++) {
			//if (!tlg.index) return;
			if (!tlg.index)
				graphLookup[id].addIndex(ptra);

			else if (!tlg.index[i])
				graphLookup[id].addIndex(ptra);
			//alert('etst');
			
			var li =  document.createElement("li");	
			li.setAttribute("class", type+"LinksLI");

			if (x == 0) li.style.marginLeft = "0px"; // calculate indent from small box

			// if needed to create an options for the index, use this..
			// although -- the line-renderer code needs to change first cuz it's too hard to select stuff
			//   this option should come in later, as well, the ability to declare delimiters explicitely 
			//
			/*
			var c = document.createElement("span");
			//	console.log("yooo");	
			c.setAttribute(type+"indexOptions", "unselected");
			
			// if the css attribute doesnt exist, we should assume
			// that this whole case doesnt apply.......
			li.appendChild(c);
			*/
			var d = document.createElement("span");
			//	console.log("yooo");	
			d.setAttribute(type+"index", "unselected")
			li.appendChild(d);


			el.appendChild(li);
			//console.log(li);
			var cw = d.offsetWidth;
			var ch = d.offsetHeight;
			//var ow = ow ? ow : x*cw;
			//var ptr = ptra.join();
			var ptr = copyArray(ptra);
			var ptrs = ptr.join();
			var pos = getElPos(d);
			//		console.log(pos);
			//		use rational index positions instead 
			var ll = i;
			ptr = ptr.concat(["index", ll, "gfx"]);
			//	console.log("posss-----------------------------------");
			var o = {"type":"index", "index":i, "height":ch, "width":cw, "x":pos.x, "y":pos.y, "z":zi, "right": cw+pos.x, "bottom":ch+pos.y, "graphptr":{"id":id,  'value':tlg["value"], "index":i}, "ptr":ptr, "div":d}
			rect.y+=ch;
			//	console.log(ptra);
		//	console.log(tlg['index']);
		//	console.log("------------------ll:  "+ll);
			tlg['index'][ll]["gfx"] = o;
			//	console.log(graphics);
			//console.log("-_________________________ptr");
			//console.log(ptr);	
			snapSpace.prototype.regObject(ptr, "graphLookup");
			//	console.log(tlg);
			//grid.regObject(ptrs);
			//	buffer.fillRect(0,i*10, 10, 10);
		}
	
		var show = !tlg.hideChildren; //true;
		// if this style is grid, then 
		var li = document.createElement("li");
		li.setAttribute("class", type+"LI");

		el.appendChild(li);

		ptt = show ? "unselected" : "hidechildren";
		//alert("test111");


		// if this was part of a prior row, and there are no more rows, make a new column

		label = document.createElement("span");

		li.appendChild(label);

		// check to see if we are in a prior grid 

		label.setAttribute(type+"label", ptt);
		
		if (!tlg.hideItem) 
			label.innerText = text;

		//hopefully this is all that's required....
		//console.log(text);
		//console.log("____________________%%**^^");
		if (x == 0) {
			li.style.marginLeft = "0px"; 
		}
	//	label.style.marginLeft = ow+"px";
		//rect.y+=label.offsetHeight;
		var loh = label.offsetHeight;
		var low = label.offsetWidth;
		var ptr= copyArray(ptra);
		ptr = ptr.concat(["gfx"]);
		var ptrs = ptra.join();
		var pos = getElPos(label);
		var ps = [];
		for (var i = 0; i < ptr.length; i+=2) {
			ps.push[ptr[i]];
		}
		var o = {"visible":true, "type":"label", "height":loh, "right":low+pos.x, "width":low, "x":pos.x, "y":pos.y, "z": zi, "bottom":loh+pos.y, "ptr":ptr, "div":label, "ptrString":ps.join()};
		tlg["gfx"]= o;
		rect.y+=loh;


		labelHeight = label.offsetHeight;

		
	
		var csstype = models[graphLookup[id].universeid].type;

		tlg["el"] = li;
		snapSpace.prototype.regObject(ptr, "graphLookup");
		//console.log(tlg);	
		//not sure where else to put it at the moment
		if (tlg.types) {
			for (var type in  tlg.types) {
				//tlg['tye]
				//alert("yoo");
				var t = tlg.types[type];
				tlg.gfx.div.setAttribute(csstype+type, t ? "label": false);

				tlg.el.setAttribute(csstype+type, t ? "section":false); // not really sure about this one...
			}
		}

		delete label;
		delete el;
		delete li;
		delete c;
		return rect
		//return {"rect":rect, "layout":layout};
		//	}		
	},



	"moveGfx":function(id) {
		console.log(id);
		var t = graphLookup[id].loc;
		var canvas = graphics[id].el;
		//console.log("moving...."+this.id);
		canvas.style.top = t.y+"px";
		canvas.style.left = t.x+"px";
		canvas.style.zIndex = t.z;
		//alert("tst...");
		//console.log(t.z);
	},
	"hide":function(id) {
		// graphics / models/graph ....  => graphLookup
		// gfxLookup =>gfx+models link... 
		var t = graphics[id].hidden = true;
		var c = graphics[id].el.style.display = "none";
	},
	"show":function(id) {
		var t = graphics[id].hidden = false;
		var c = graphics[id].el.style.display = "";
		
	}

}
//extend(ptrRenderer, htmlRenderer);
//orthanormal subsurface scattering....
