function UIRenderer(ptr) {
	
}

// need to align the css params with this...
// this is meant to eventually replace html renderer
// or rather, make a new htmlRenderer a base class and then put this ontop of it
// renderElement...... 

UIRenderer.prototype =  {
	"setElement":function(gfxRoot) {
		var ptrRoot = gfxRoot.rootPtr;
		//var go = getObject(ptrRoot, graphLookup);
		// needs to be referenced by id...
		if (!gfxRoot.el) {
			gfxRoot.el = document.createElement("ul"); //primary internal node
			var appendEl = true;
		}
		var el = gfxRoot.el; // this may or may not be the best way of doing it.. it might actually be faster to rerender the bounded elements
		//var uid = graphLookup[id].universeid;
	//	console.log(uid
		var type = type; //models[uid].type;
		el.width = 400;
		el.height = 400;
		el.style.position = "absolute";
		el.setAttribute("class", type+"UL");
		// = {"position":"absolute", "left":0, "top":0};
	//	var model = graphLookup[ptr[0]];


		// should be gfxTypeLookup[lastz+1];
		// should be in gfx
		
		var lz = gfx.prototype.lastz+1;
		if (!lz) lz = 0;

		
		if (!gfxRoot.loc) {
			gfxRoot.loc = {"x":0, "y":0, "z":lz};
		} else if (!gfxRoot.loc.z)  
			gfxRoot.loc.z = lz;
		

		gfx.prototype.lastz = gfxRoot.loc.z;
		


		// might not be correct
		el.style.zIndex = gfxRoot.z; // should be set prior to calling this function
		//this.zIndex = ng;
		//var model = graphLookup[id];
		if (gfxRoot["hidden"]) {
			el.style.display = "none"
		}
		if(appendEl) {
//			console.log(id);
			gfxRoot['baseElement'].appendChild(el);
		}
	},
	"build":function() {
	},
	"rebuild":function() {
	},
	"reindex":function() {

	},
	"mkPtrImgs":function(gfxRoot) {
		this.createDom(gfxRoot);
	},
	"hide":function() {
	},
	"show":function() {
	},
	"moveTo":function() {

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
	// should require index then .......
	"createDom":function(gfxRoot) {
		//console.log(gfxRoot);
		var ptr = gfxRoot.rootPtr;
		// need to create a seperate dom renderer plugin for this..
		//this.namespace = this.obj2JSON();
		this.tableNode = document.createElement("div");
		document.body.appendChild(this.tableNode);
		this.tableNode.setAttribute("class", "UIRootTable");
		//var dialogs = getObjs(this.namespace, "dialog");
		//console.log(this.ptr);

		// store references in idLookup of id... 
		
	     	// ptr
		//
		// if this is not an indexed element, ... dont need the superGruop
		var ca = copyArray(gfxRoot.rootPtr);
		if (ptr[ptr.length-2] == 'index') { ca.pop(); ca.pop(); }
		var ar = graph.prototype.getPtrValue(ca, 'dialog');
		
                //objref
		this.tableNode.style.position = "absolute";
		this.tableNode.style.zIndex = "20000";

		//this.bringToTop();
		

		for (var i=0; i < ar.length; i++) 
			this.evaluateDialog(ar[i]);

	},

	"evaluateDialog":function(dialogPtr) {
		var view = graph.prototype.getPtrValue(dialogPtr, "view");
		console.log("debugging....");
		console.log(view);
		var grid = graph.prototype.getPtrValue(view[0], "grid");
		console.log("...");


		if (grid) {
			var rows = graph.prototype.getPtrValue(dialogPtr, "row");
			var rowNode = document.createElement("div");
			this.tableNode.appendChild(rowNode);
			rowNode.setAttribute("class", "UItableRow");
			this.evaluateRows(rows, rowNode);
		}
	},
	"evaluateRows":function(rows, rowNode) {
		//this.tableRow
		console.log("-------------#######-=-----------");
		console.log(rows);
	//	var row = rows[i];
		for (var i =0 ; i < rows.length; i++) {
			var row = getObject(rows[i], graphLookup);
			console.log(row);
			console.log("---------------");	
			for (var j=0; j < row['item'].length; j++) {
				var rowItem = row['item'][j];
				console.log(rowItem);
				var item = rowItem.value;
				var rowNode = document.createElement("ul");
				rowNode.setAttribute("class", "UIULCell");
				//var ul = document.createElement("ul");

				var li = document.createElement("li");
				li.setAttribute("class", "UILICell");
				rowNode.appendChild(li);
				this.drawElement(item, rowNode, li, rowItem)
				
					//li.innerText = row[items];
			}
		}
	},
	"moveGfx":function(gfxRoot) {
//		console.log(id);
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




