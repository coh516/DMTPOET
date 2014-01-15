function uiRenderer(ptr) {
	
}

uiRenderer.prototype =  {
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
	"build":function() {
	},
	"rebuild":function() {
	},
	"reindex":function() {

	},
	"mkPtrImgs":function() {
		this.createDom();
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
	"createDom":function() {
		// need to create a seperate dom renderer plugin for this..
		//this.namespace = this.obj2JSON();
		this.tablenode = document.createElement("div");

		this.tablenode.setAttribute("class", "UIRootTable");
		//var dialogs = getObjs(this.namespace, "dialog");
		var ar = graph.prototype.getPtrValue(this.ptr, 'dialog');
		for (var i=0; i < ar.length; i++) 
			evaluateDialog(ar[i]);

	},

	"evaluateDialog":function(dialogPtr) {
		var view = graph.prototype.getPtrValue(dialogPtr, "view");
		var grid = graph.prototype.getPtrValue(view, "grid");
		
		if (grid) {
			var rows = graph.prototype.getPtrValue(dialogPtr, "row");
			var rowNode = document.createElement("div");
			this.tablenode.addChild(rownode);
			rowNode.setAttribute("class", "UItableRow");
			this.evaluateRows(rows, rowNode);
		}
	},
	"evaluateRows":function(rows, rowNode) {
		//this.tableRow
		for (var i=0; i < rows['item'].length; i++) {
			var item = rows['item'][i].value;
			var rowNode = document.createElement("ul");
			rowNode.setAttribute("class", "UIULCell");
			//var ul = document.createElement("ul");
			
			var li = document.createElement("li");
			li.setAttribute("class", "UILICell");
			rowNode.appendChild(li);
			this.drawELement(item, rowNode, li)
			//li.innerText = row[items];
		}
		var c = this.getNextChild();
		c.evaluate();
	},

	"drawElements":function(item, node, li) {
		switch(item) {
			case 'label':
				var val = graph.prototype.getPtrValue(item, "text");
				//var text = row[items]['text']
				li.innerText = val;
				item.renderedUI = {};
				item.renderedUI.domNode = li;
			break;
			case 'inputbox':
				var ib = document.createElement("input");
				li.appendChild(ib);
				ib.setAttribute("class", "UIInputCell");
				item.renderedUI = {};
				item.renderedUI.domNode = ib;
			break;
			case 'button':
				var val = graph.prototype.getPtrValue(item, "text");			
				li.innerText = text;
				item.renderedUI = {};
				item.renderedUI.domNode = li;
				//this.point
				//getObject(item, graphLookup);

			break;
		}
	}
}




