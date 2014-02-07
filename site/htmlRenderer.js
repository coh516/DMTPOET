// if i ever get another type of renderer in there, it will be easier to pull apart

var rect = {"height":0, "width":0, "x":0, "y":0}

function htmlRenderer() {
}
//graphics = {}; 
htmlRenderer.prototype = {
	"setElement":function(gfxRoot) {
		
		var ptrRoot = gfxRoot.rootPtr;
		var go = getObject(ptrRoot, graphLookup);
		if (!gfxRoot.el) {
			gfxRoot.el = document.createElement("ul"); //primary internal node
			var appendEl = true;
		}
		var el = gfxRoot.el;
		var type = gfxRoot.type;
		el.width = 400;
		el.height = 400;
		el.style.position = "absolute"; // gfxRoot.hasBaseElement ? "relative" : "absolute";
//		el.style.position = "absolute";
		el.setAttribute("class", type+"UL");
			
		var lz = Gfx.prototype.lastz+1;
		if (!lz) lz = 0;

		
		if (!gfxRoot.loc) {
			gfxRoot.loc = {"x":0, "y":0, "z":lz};
		} else if (!gfxRoot.loc.z)  
			gfxRoot.loc.z = lz;
		// might not be correct
		el.style.zIndex = gfxRoot.z; // should be set prior to calling this function
		//this.zIndex = ng;
		//var model = graphLookup[id];
		if (gfxRoot["hidden"]) {
			gfxRoot.el.style.display = "none"
		}
		if(appendEl) {
		//	console.log(id);
			gfxRoot['baseElement'].appendChild(el);
		}
	},

	"delDomRefs":function(ar){
		var o = getObject(ar, graphLookup);
	},
	// should be ptr instead...
	"mkPtrImgs":function(gfxRoot, cb) {
		var ptrRoot = gfxRoot.rootPtr;
		var ptrRootItemArray = ptrRoot.concat(['item']);
		objPtr = getObject(ptrRoot, graphLookup);


		Graph.prototype.recurseItems(htmlRenderer.prototype.delDomRefs, ptrRoot)

		gfxRoot.el.innerHTML = "";
	//	uu//console.log(gfxRoot.layout);
		var r = {"rect":Object.create(rect), "lastNode":gfxRoot.el, "lastNodeType":gfxRoot.layout}
	
		htmlRenderer.prototype.recursePtrImgs(gfxRoot, ptrRootItemArray, 0, r, cb, ptrRootItemArray);
	},
/*
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
*/

	// really should use a reverse decorator that traces into the last node, then
	// recurses back out
	// i think the type is unneeded, has no purpose other than complicated things
	//perhaps i could break this code into the mkptrimg code 
	"_reindex":function(tl, gfxRoot) {
		//alert(id);
		var id = gfxRoot.rootPtr;
		//console.log(id);
		for (var y=0; y < tl.length; y++) {
			//console.log(tl);
			if (gfxLookup[gfxRoot.gfxId].hasIndex !== false)	

			for (var idx =0; idx < tl[y]['index'].length; idx++) {
				var group = tl[y]['index'][idx]['gfx'][gfxRoot.type]
		
				var gdg = group;
				var div = group.div;
				var pos = getElPos(div);
				var w = div.offsetWidth;
				var h = div.offsetHeight;

				gdg.height = h; gdg.width = w; gdg.z = gfxRoot.loc.z; gdg.x = pos.x; gdg.y = pos.y; gdg.right = w+pos.x; gdg.bottom = h+pos.y;
				//console.log(gdg);
				snapSpace.prototype.regObject(gdg.ptr, "graphLookup", nodeEvents);
			}
			var group = tl[y]['gfx'][gfxRoot.type];
			//console.log(tl[y]);
			var gdg = group;
			var div = group.div;
			if (!div) continue;
			var pos = getElPos(div);
			var w = div.offsetWidth;
			var h = div.offsetHeight;
			gdg.height = h; gdg.width = w; gdg.z = gfxRoot.loc.z; gdg.x = pos.x; gdg.y = pos.y; gdg.right = w+pos.x; gdg.bottom = h+pos.y;
			//console.log(gdg);
			snapSpace.prototype.regObject(gdg.ptr, "graphLookup");
			delete div;
			if (tl[y]["item"])
				htmlRenderer.prototype._reindex(tl[y]["item"], gfxRoot)
		}
	},
	"reindex":function(rootGfx) {
;
		htmlRenderer.prototype._reindex(getObject(rootGfx.rootPtr.concat(["item"]), graphLookup), rootGfx);
	},

	"getLayoutType":function(ptra, type) {
		//return;
		var pc = copyArray(ptra);
		var pcl = pc.length-1;
		for (var i = pcl; i >=0; i--) {
			var g = getObject(pc, graphLookup)
			//console.log(g);
			if (g['gfx']) {
				if (g['gfx'][type].layout) {
				
					return g['gfx'][type].layout;
				}
			}

			pc.pop(); 
		}
		return false;
	},


	
	
	"recursePtrImgs":function(gfxRoot, tla, x, rect, cb) {
		//var images = [];
		var count = 0;
		var tl = getObject(tla, graphLookup);
		var tll = tl.length;
		var el = gfxRoot.el
		el.style.top = gfxRoot.loc.y+"px";
		el.style.left = gfxRoot.loc.x+"px";

		for (var y=0; y < tl.length; y++) {
			var tlg = tl[y];
			var cta = copyArray(tla);
			cta.push(y);
		

 			var rl = htmlRenderer.prototype.mkPtrImg(cta, x, y, rect.rect, gfxRoot, rect.lastNode, rect.lastNodeType, cb);
		
			//fix me
			var hide = tlg.hideChildren;
			
			
			if (tlg["item"] && !hide) {
			//	ar2.push("item");
				cta.push("item");
			 	htmlRenderer.prototype.recursePtrImgs(gfxRoot, cta, x+1, rl, cb)
			}
		}
		delete el;
	}, 



	// need to figure out a way to chunk this into smaller pieces
	"mkPtrImg":function(itemPtr, x, y, rect, gfxRoot, lastNode, lastNodeType, cb) {

		var tlg = getObject(itemPtr, graphLookup);
		var text = tlg["value"];
		if (!tlg['gfx']) tlg['gfx'] = {};
		if (!tlg['gfx'][gfxRoot.type]) tlg['gfx'][gfxRoot.type] = {};

		var gfo = tlg['gfx'][gfxRoot.type];		
		var el = lastNode;
		var id = itemPtr[0];
				

		var linkHeight = this.linkHeight;

		var text = tlg["value"]
	//	console.log(tlg);


	//make table if the layout is grid
		if (lastNodeType == "grid") {
		//	console.log("------------------------------------- ");	
			var row = document.createElement("ul");
			
			row.setAttribute("gridtable","row");
			gfo.tableDiv = el;//table;//c1; // = {"parentTable": c1}; //layout; // should just have parentTable (row is useless)
			
			gfo.tableRow = row;
			el.appendChild(row);

			el.appendChild(row);
			el = row;
			var _lastNode = row;
			_lastNodeType = 'row';
		}


		if (lastNodeType == "row") {

			var cell = document.createElement("ul")
			cell.setAttribute("gridtable", "cell");

			el.appendChild(cell);
			el = cell;
			var _lastNodeType = "cell";

		}
		if (!tlg.gfx) tlg.gfx = {};

		var loc = gfxRoot.loc;
		var zi = gfxRoot.loc.z;
		if (zi == undefined || zi == NaN) {   
			var zi = Gfx.prototype.topz+1;
			if ( zi == undefined || zi != NaN) {
				zi = 0; //wtf?
			}
		}
		Gfx.prototype.topz = zi;
		// get parentNode?
		var type = gfxRoot.type;
		var links = 0;
	
		if (tlg.index) {
			til = tlg.index.length-1;
			var tit = tlg.index[til];
			if (tit.children.length > 0 || tit.parents.length > 0)
				links = tlg.index.length+1;
			else links = tlg.index.length;
		} else links = 1;
		var tof; // = layout;
	
		var ul = document.createElement("ul");

		el.appendChild(ul);
		ul.setAttribute("class", type+"ContainerUL");	
		el = ul;
		// should have something like 'usesPtrLinks' .. uggh .. dirty code.
		//console.log(gfxRoot.hasIndex);
		if (gfxLookup[gfxRoot.gfxId].hasIndex !== false)	
		for (var i = links-1; i >=0; i--) {// links; i++) {
			//if (!tlg.index) return;
			//sketchy
			if (!tlg.index)
				graphLookup[id].addIndex(itemPtr);

			else if (!tlg.index[i])
				graphLookup[id].addIndex(itemPtr);
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

			var pos = getElPos(d);
					//console.log(pos);
			//		use rational index positions instead 
			var ll = i;
			ptr = itemPtr.concat(["index", ll, "gfx", gfxRoot.type]);
			//	console.log("posss-----------------------------------");
			var o = { "type":"index", "index":i, "height":ch, "width":cw, "x":pos.x, "y":pos.y, "z":zi, "right": cw+pos.x, "bottom":ch+pos.y, "graphptr":{"id":id,  'value':tlg["value"], "index":i}, "ptr":ptr, "div":d, "cssType":gfxRoot.type, "gfxRoot":gfxRoot.rootPtr.concat(['gfx', gfxRoot.type]), "gfxId":gfxRoot.gfxId, "nodeRoot":itemPtr, "indexRoot":itemPtr.concat(["index", ll])}
			rect.y+=ch;

			if (!tlg['index'][ll]["gfx"]) tlg['index'][ll]['gfx'] = {};
			tlg['index'][ll]["gfx"][gfxRoot.type] = o;
			//	console.log(graphics);
			//console.log("-_________________________ptr");
			//console.log(ptr);	
			snapSpace.prototype.regObject(ptr, "graphLookup");

		}
	
		var show = !tlg.hideChildren; //true;
		// if this style is grid, then 
		//
		//
		ptt = show ? "unselected" : "hidechildren";



		var li = document.createElement("li"); // should be ul if has children
		li.setAttribute("class", type+"LI");



		ul.appendChild(li);

		label = document.createElement("span");

		//console.log(tlg)
		if (!tlg["gfx"][gfxRoot.type].hideItem)
			li.appendChild(label);

		// check to see if we are in a prior grid 

		label.setAttribute(type+"label", ptt);
	
		// should have an area here to append inner nodes


		label.innerText = text;

		if (x == 0) {
			li.style.marginLeft = "0px"; 
		}

		var loh = label.offsetHeight;
		var low = label.offsetWidth;
		var ptr= copyArray(itemPtr);
		ptra = ptr.concat(["gfx", gfxRoot.type]);

		var pos = getElPos(label);
		var ps = [];
		for (var i = 0; i < ptr.length; i+=2) {
			ps.push[ptr[i]];
		}
		var layout = gfo.layout;
		var o = {"layout":gfo.layout, "hideItem":gfo.hideItem, "visible":true, "type":"label", "height":loh, "right":low+pos.x, "width":low, "x":pos.x, "y":pos.y, "z": zi, "bottom":loh+pos.y, "ptr":ptra, "div":label, "ptrString":ps.join(), "cssType":gfxRoot.type, "gfxRoot":gfxRoot.rootPtr.concat(['gfx', gfxRoot.type]), "gfxId":gfxRoot.gfxId, "nodeRoot":ptr, "el":ul};

		//tlg["gfx"][gfxRoot.type]
		//for (var g = 

		tlg["gfx"][gfxRoot.type] = o;
		//gfo = o;
		rect.y+=loh;


		labelHeight = label.offsetHeight;
	
		var csstype = gfxRoot.type;
		//if (!tlg['gfx']) tlg['gfx'] = {};
		//if (!tlg['gfx'][gfxRoot.type]) tlg['gfx'][gfxRoot.type] = {};
		gfo["el"] = li;
		//console.log(ptr);
		//console.log(gfxRoot);
		snapSpace.prototype.regObject(ptra, "graphLookup", nodeEvents);
		//console.log(tlg);	
		//not sure where else to put it at the moment
		if (tlg.types) {
			for (var type in  tlg.types) {
				//tlg['tye]
				//alert("yoo");
				var t = tlg.types[type];
				gfo.div.setAttribute(csstype+type, t ? "label": false);

				gfo.el.setAttribute(csstype+type, t ? "section":false); // not really sure about this one...
			}
		}
		if (!_lastNodeType) _lastNodeType = "list";
		if (gfo.layout == 'grid') {
			var table = document.createElement('div');
			table.setAttribute("gridtable","table");
			_lastNode = table;
			_lastNodeType = 'grid';
			li.appendChild(table);
		}
		if (!_lastNode) _lastNode = ul;
		delete label;
		delete el;
		delete li;
		delete c;
		return {"rect":rect, "lastNode":_lastNode, "lastNodeType":_lastNodeType};
		
	},



	"moveGfx":function(gfxRoot) {
		//console.log(id);
		var t = gfxRoot.loc;
		var canvas = gfxRoot.el;
		//console.log("moving...."+this.id);
		canvas.style.top = t.y+"px";
		canvas.style.left = t.x+"px";
		canvas.style.zIndex = t.z;
		//alert("tst...");
		//console.log(t.z);
	},
	"hide":function(gfxRoot) {
		// graphics / models/graph ....  => graphLookup
		// gfxLookup =>gfx+models link... 
		var t = gfxRoot.hidden = true;
		var c = gfxRoot.el.style.display = "none";
	},
	"show":function(gfxRoot) {
		var t = gfxRoot.hidden = false;
		var c = gfxRoot.el.style.display = "";
		
	}

}
//extend(ptrRenderer, htmlRenderer);
//orthanormal subsurface scattering....
