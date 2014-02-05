
// meant to be a wrapper around the graph functions with iterator
// should be iterator and evaluatableIterator 
//
// there needs to a way of caching the ptr subnodes
//
var pointLookup = {}
var programs  = {"UI":UIClass, "DB":DBClass, "serializeUniverse":UniverseClass, "timeStamp":DateClass};

function Point(options){ 

//	this.nodePtr = copyArray(ptr);
//	this.nodePtr.pop();this.nodePtr.pop();
	this.ptr = options.ptr;
	this.ptrId = this.ptr[0];
	this.childNumber = options.childNumber;
	this.id =  mkguid();
	this.parentId = options.parentId;
	//this.pathList = options.pathList;

	pointLookup[this.id] = this;
//	pointLookup[parentId] = this;
	

	//console.log("============cool beanz====================");

	
	// assume no parent = origin
	if (!this.parentId) {
		this.origin = this.id;
	}

	var pl = pointLookup[this.parentId];
	if (pl)
	pl.children[this.childNumber] = this.id;
	
	//console.log(this.ptr);	
	var p2 = copyArray(this.ptr);
	p2.pop();p2.pop();
	this.superGroup = p2; //getObject(p2, graphLookup);

	this.label = this.superGroup.value;



	this.variables = [];
	
	// if theres no parentId, assume this to be the initial point
	this.children = [];


	//var nodeTypes = {"program":programComponents.prototype, "value":valueComponents.prototype};

	var pp = copyArray(this.ptr);
	var a1 = getObject([pp[0], pp[1], pp[2]], graphLookup);
	this.programName = a1.value;

	var tpg = programs[this.programName];
	mixin(tpg.prototype, this)	
	
	//var a1 = getObject([pp[0], pp[1], pp[2]], graphLookup);
	//nodeName = a1.value;
	pp.pop();
	pp.pop();

	// in the future, program variables should automatically be detected by seperate linkage patch
	//
//	this.programVars = {};
	while (pp.length > 0 ) {
		var ppo = getObject(pp, graphLookup);
		if (ppo.hasOwnProperty('types'))
		if (ppo.types['program']) {
				this.programVars = ppo;
				break;
		}
		pp.pop();
		pp.pop();
	}

}


Point.prototype.pointLookup = {};

Point.prototype = {
	get superNode() { return getObject(this.superGroup, graphLookup) },

	"setBeginPhrase": function() {

		this.phraseBegin = true;
		console.log(this.ptr);
		this.phraseVars = {};
		//mixin(Phrase.prototype, this);
	},

	"getRootNode": function(){
		var rootPtr = [this.ptr[0], this.ptr[1], this.ptr[2]];
	},

	// used for detecting discontinuity...
	//  not sure this should ever be used, if dealing with a huge program, this would be slow as shit
	/*
	"isConnected": function(ptr){
		var test = ptr;
		var isConnected = false;
		this.recurse = function(point) {
			if (isConnected) return true;
			for (var i = 0; i < this.pathList[point].length; i++) {
				for (var j = 0; j < this.pathList[point].length; j++) {
					if (this.pathList[point][j] == test) {
						isConnected=true
						return true;
					}else this.recurse(this.pathList[point][j]);
				}
			}
		}

		var point = pointLookup[this.origin];
		this.recurse(point);
		return isConnected;

	},
	*/
	/*
	"getNextNodes": {
		return this.pathList[this.ptr]
	},
	*/
	/*
	"evaluate": function(){
		//this.initPhrase();
		console.log(this.superGroup);
		this.evaluatePhrase();
	},
	*/
	"getPriorNode":function(){
		return pointLookup[this.parentId];
	},

	"getNextSibling":function() {
		var siblingId = pointLookup[this.parentId].children[this.childNumber+1];
		if (pointLookup[siblingId]) return pointLookup[siblingId];
		else return undefined;
	},

	"getPriorSibling":function() {
		var siblingId = pointLookup[this.parentId].children[this.childNumber-1];
		if (pointLookup[siblingId]) return pointLookup[siblingId];
		else return undefined;
	},
		

	"getNextChild":function() {
		if (!this.curChild) this.curChild = 0;
		else this.curChild++;
		return pointLookup[this.children[this.curChild]];

	},
	"getPriorChild":function() {
		if (this.curChild > 0)
			return pointLookup[this.children[--this.curChild]];
		else return false; // maybe throw error in the future
		
	},


	"obj2JSON":function() {
		return graph.prototype.toJSON(this.ptr[0]);

	},
	
	"_next":function(pointId) {
		var o = pointLookup[pointId]
		o.next();

	},
	
	"next":function() {
		for (var i =0; i < this.children.length; i++) {
			pointLookup[this.children[i]].step();
		}
	},
	"step":function() {
		var rootPoint = pointLookup[this.rootPointID];
		
		if (this.programVar) {

			if (!rootPoint.phraseVars.programVar)			
				rootPoint.phraseVars[this.programVar] =  rootPoint.phraseVars[this.programVar].length;
			else 
				rootPoint.phraseVars[this.programVar]--;

			if (rootPoint.phraseVars[this.programVar] == 0) {
				var pv = rootPoint['phraseVars'][this.programVar];
				this.evaluate( rootPoint['phraseVars'][this.programVar]);
			}

		}
		else this.evaluate();	
	}

}
// perhaps a 'lookup' bass class should be defined
systemLookup = {};
function System(ptr, pathList) { 
	this.pathList = pathList;
	this.rootPtr = ptr;
//	//alert(this.rootPtr);
//	pt.setBeginPhrase();
	//this.evaluatePhrase();
	this.traversedNodes = {};
	pt.nextPhrases = [];
	this.endPhrases = [];
	this.beginPhrases = [];
	this.id = mkguid();

	systemLookup[this.id] = this;
//	this.phrases = [];
// 	need to build a phrase hash...
}

System.prototype = {


	"setsData":function() { (this.nextPoint.node.type['root'] || !this.nextPoint.children) },
	//rootPhrase
	"begin":function() {

		//this.hasTraversed = false
	
		//rootPhrase = this;
		var pathList = this.pathList;
		var parents = {};

		var recurse = function(pID, rpID) {


			var rootPoint = pointLookup[rpID];

			var po = pointLookup[pID];
			po.rootPointID = rpID;
			console.log (rpID);
			var ponode = po.superNode; //getObject(po.ptr, graphLookup);
				
			// this might need to be stored in a phraseLookup[rootPointID]
			//if (rootPoint.programVars)
		//	if (!rootPoint.phraseVars)
		//		rootPoint.phraseVars

			if (po.programVar)
			if (!rootPoint.phraseVars[po.programVar]) {
				rootPoint.phraseVars[po.programVar] = [];
				rootPoint.phraseVars[po.programVar].push(pId);
			}
			
			if (ponode.types)
			if (ponode.types['root']) {

				po.setBeginPhrase();
				rpID = po.id;
				console.log(ponode);
				console.log("----------------");
				var isRoot = true;
			}

		

			if (isRoot || po.children.length == 0 && rpID != pID) {
				
					if (po.parentId) {
						pointLookup[po.parentId].phraseEnd = true;
				}
			} 
			

			for (var i =0 ; i < pathList[po.ptr].length; i++) {
				
				var np = new Point({"ptr":pathList[po.ptr][i], "parentId":pID, "childNumber":i});
				//console.log(.children);
				//console.log("^%%^^^%%%^^%%%%%^");
				recurse(np.id, rpID);

			}
			/*

			for (var i =0 ; i < po.children.length; i++) {
				if (i > 0) { 

					///this.traversals++;
					//this.hasTraversed = true;
					//for (var g in this) console.log(g);
					//

					recurse(po.children[i], pr);
				}
			}
			*/
			/* // doing 
			parents[po.parentId]--;
			if (parents[po.parentId])
				delete parents[po.parentId]
			if (!Object.keys(parents))
			*/	

		}

		this.rootPoint = new Point({"ptr":this.rootPtr, "childNumber":0, "pathList":pathList});
	
		recurse(this.rootPoint.id, this.rootPoint.id);
		console.log("-----------------------evaluting");
//		this.rootPoint.evaluate();
		console.log(this.rootPoint);
		this.rootPoint.evaluate();
		//this.renderPhrase();

	},

}

// Template much include onFunction and onParameter
function UIClass() {
};

//  UIClass.prototype = Object.create(baseProgram.prototype);
// use the UI class fro UIRenderer ..
UIClass.prototype = {
	"getNameSpace":function() {
		//need to look back to find 'grid' location
		
	},
	"mouseClickCallback":function(ptr) {
		// iterate through the next pieces...
		

	},


	// this needs to be moved to the UIRenderer class....
	"evaluate":function() {

		// only at the phrase begin stage should this ever draw a ui
		if (!this.phraseBegin) { 
			var pi = pointLookup[this.parentId]
			var pa = getObject(this.superGroup, graphLookup); 
			// needs to trace up until it finds a UI object
			var rootPoint = pointLookup[this.rootNodeId];
			console.log("------");
			console.log(this);
			var li = this.getLinkedPtr(this.superGroup);
			var memberOf = Graph.prototype.climbToValue(li,['button', 'input', 'label']);
		       console.log(memberOf);	
			switch (memberOf) {
				case "button":
					pa.renderedUI.domNode.onClick = this._next.bind(this.id);
					break;
				case "input":
					this.value = pa.renderUI.domNode.value;
					break;
			}
			var c = this.getNextChild();
			//	alert("evaluaiting..");
			console.log(c);
			c.evaluate()


//			}
		}else { // imply  {"GFX":{"renderer":"WindowManager"}}
			// for the most part, this should work...
			// it should duplicate the graph and use a modified renderer
		
		//	this.createDom();
			var json =  graphLookup[this.ptrId].toJSON();
			//console.log(JSON.stringify(json));
			var graph = new Graph();
			graph.setFromJSON(json);
			var g = new Gfx({"type":"point", "ptr":[graph.id], "renderer":htmlRenderer, "baseElement":frame2.contentDocument.body});
			gfxLookup[g.id].initNodes(); // sets up graph with gfx.point
		//	console.log(graphLookup[g.id]);
			g.hasIndex = false;	
			//g.build();		// not right!

		//	console.log(graphLookup[graph.id]);	
			this.linkedGfxId = g.id
			//this.node.ptr
			this.linkedGraphId = graph.id;
			this.createDom();
			g.build();
			this.next();
		}
	},
	"getLinkedPtr":function(ptr) { 
		var _ptr = copyArray(ptr);

		_ptr[0] = pointLookup[this.rootPointID].linkedGraphId;
		return _ptr;
	},
	"getLinkedNode":function(ptr) {
		return getGraphObject(this.getLinkedPtr(ptr));
	},
	// this is a much better way of rendering rather than htmlrenderer
	"createDom":function() {

		var ar = Graph.prototype.getPtrValue(this.superGroup, 'dialog');
//		console.log(this.getLinkedNode(this.superGroup));
		this.getLinkedNode(this.superGroup)['gfx']['point'].hideItem = true;
		
//		console.log(this.getLInkedPtr(this.superGroup));
		for (var i=0; i < ar.length; i++) 
			this.evaluateDialog(ar[i]);

	},

	/* more code to throw out */

	"evaluateDialog":function(dialogPtr) {
		this.getLinkedNode(dialogPtr)['gfx']['point'].hideItem = true;
		
		var view = Graph.prototype.getPtrValue(dialogPtr, "view");
		var grid = Graph.prototype.getPtrValue(view[0], "grid");
		//view[0].gfx.point.hideItem = true;	
		//gfxLookup[this.linkedGfxId].
		
		this.getLinkedNode(view[0])['gfx']['point'].hideItem = true;
		gfxLookup[this.linkedGfxId].hideChildren(this.getLinkedPtr(view[0]));
		

		if (grid) {
			var rows = Graph.prototype.getPtrValue(dialogPtr, "row");
			
			gfxLookup[this.linkedGfxId].setGridLayout(this.getLinkedPtr(dialogPtr));
			//console.log(this.getLinkedNode(dialogPtr));
			gfxLookup[this.linkedGfxId].rebuild();
		//	return;
			this.evaluateRows(rows);
		}
	},
	"evaluateRows":function(rows) {
		//console.log(rows)
		for (var i =0 ; i < rows.length; i++) {
			this.getLinkedNode(rows[i])['gfx']['point'].hideItem = true;	
			//console.log(this.getLinkedNode(rows[i]));
			var row = getObject(rows[i], graphLookup);
		
			for (var j=0; j < row['item'].length; j++) {
				var rowItem = row['item'][j];

				this.drawElement(rowItem)
					//li.innerText = row[items];
			}
		}
	
	},

	"drawElement":function(rowItem) {
	//	ptrObject.renderedUI = {};
		//return;
		gfxLookup[this.linkedGfxId];// this.getLinkedNode(ptrObject.ptr)['gfx']['point'].hideItem = true;
		//ptrObject.ptr
		//ptrObject.renderedUI.item = item;
		var ri = this.getLinkedPtr(rowItem.ptr);
		//
			
		switch(rowItem.value) {
			case 'label':
				//var o = this.getLinkedPtr(rowItem);
				//gfxLookup[this.linkedGfxId];
				//the id shouldnt be there...
				var p1 = rowItem.ptr[0] 
				gfxLookup[this.linkedGfxId].hideChildren(ri);				
				//var val = graph.prototype.getPtrValue(ptrObject.ptr, "text");
				//
			//	ptrObject.renderedUI.linkedPtrGfx = ptrObject.renderedUI;
				////domNode = li;

			break;
			case 'inputbox':
				//this.getLinkedNode(dialogPtr)['gfx']['point']. = true;
				gfxLookup[this.linkedGfxId].mkInputBox(ri);

				gfxLookup[this.linkedGfxId].hideChildren(ri);
				/*	
				var ib = document.createElement("input");
				li.appendChild(ib);
				ib.setAttribute("class", "UIInputCell");
				ptrObject.renderedUI.domNode = ib;
				ptrObject.renderedUI.type = "text";
				*/
			break;
			case 'button':
				gfxLookup[this.linkedGfxId].mkButton(ri);			
				gfxLookup[this.linkedGfxId].hideChildren(ri);


			//	var val = graph.prototype.getPtrValue(ptrObject.ptr, "text");	
				/*
				li.innerText = 'text';
				ptrObject.renderedUI.domNode = li;
				ptrObject.renderedUI.type = "onSubmit";
				*/
				//this.point
				//getObject(item, graphLookup);

			break;
		}
	},


	/*
		var hier = graph.prototype.getValueOrder(this.nodePtr);
		console.log("hier: "+hier);

		var view = graph.prototype.getLoc(this.node.ptr, ['dialog', 'view']);
		if (view) {
			if (graph.prototype.getLoc(view, ['grid']))
				this.renderGrid();
			if (graph.prototype.getLoc(view, ['list']))
				this.renderList();
		}

	},
	*/

}


function DateClass() {
}

DateClass.prototype = {
	"timeStamp":function(point, callback) {
		//this.direction = this.inheritDirection(); //"push";
		//;// point.nextPoint;// = "set"; // setting data dispatches data to be set by another function
		this.value = new Date().toString();

		//this.onCondition();
	
		//onComplete
		next();

	}
}

function UniverseClass() {
}

UniverseClass.prototype =  {
	"serializePtrGraph":function(point) {
		this.direction = this.inheritDirection();
		this.value = graphLookup;
		//this.onCondition();
	//}
		next();
	}
}



function DBClass() {

}

DBClass.prototype = {
	/*
	"getVariable":function() {	
	},
	*/
	/*
	"evaluateNode":function(pcj) {
		var p = pointLookup[this.phraseBeginPoint];
		//var pp 
		//p.node.ptr.pop().pop();
		//
		//a better way to express more complex namespaces is to route the vectors through the desired parent node
		var nsc = item.namespace[pcj];
		var items = p.phraseBeginPoint.levels[pcj];
		for (var i =0; i < items.length; i++) {
			var item = pointLookup(items[i]);
			if (item.priorNode.node.id != item.node.id) {
				//might also be a foreach from the priorNode
				if (item.priorNode.variable) {
					var p = item.getValuePtr(item.node.ptr);
					p.pop();
					var o = getObject(p, nsc);
					o[item.value] = item.priorNode.variable;
				} else 
					// return all values associated with that node
				{
					
				}
				//getValueHierarchy(item.node.ptr);
				//item.priorNode.variable
			}else {
				if (item.nextNode.node.id != item.node.id) {
					var p = item.getValuePtr(item.node.ptr);
					p.pop();
					var o = getObject(p, nsc);
					this.variable = o[item.value];
					
					//this.variable = 
					// return variable
				}
			}
		}

	
	},
	*/

	"evaluate":function(points) {
		var obj = {};
		for (var i =0; i < points.length; i++) {
			var pt = points[i];
			var po = getObject(pt.ptr);
			
			dbName = ptr.ptr[pt.ptr[0]][pt.ptr[1]][pt.ptr[2]];
			obj[dbName] = {}
			collectionName =  ptr.ptr[pt.ptr[0]][pt.ptr[1]][pt.ptr[2]][pt.ptr[3]][pt.ptr[4]][pt.ptr[5]];
			if (!obj[dbName][collectionName]) obj[dbName][collectionName] = {};
			objName =  ptr.ptr[pt.ptr[0]][pt.ptr[1]][pt.ptr[2]][pt.ptr[3]][pt.ptr[4]][pt.ptr[5]][pt.ptr[6]][pt.ptr[7]]
			if (!obj[dbName][collectionName][objName]) obj[dbName][collectionName][objName] = [];
			//should look back ....
			obj[dbName][collectionName][objName].push(parentLookup[this.parentId].value);
			// should be good for now ...
			pt.node.database = pointLookup[this.parentId].value;
		}
	//	for (var o in obj) {
		console.log("here we go...");
		postUp({"storeData":obj});
	//		dal.saveData(obj[o]);
	//	}


		/*
		if ((this.ptr.length-2/2) == 3) {

			

		}
		*/

	},
	"onIterationComplete":function() {
		if (this.hasContext()) {
			dbLayer.saveData(this.getContext().value, this.onCondition)
		}
	},
	"getRootValueNode":function() {
		// create a loop from here to the next context change
		storedData                                                                           	
	},
	"getValueNode":function() {
		
	}
}


Point.prototype.traverseProgram = function(ptr) {
	console.log(ptr);
	var pathList = Graph.prototype.getPaths(ptr);

	var o = getGraphObject(ptr);
	var delRoot = false;

	// do this a bit cleaner for deliniating phrases
	if (!o.types) {
		o.types = {"root":true};
		delRoot = true;
	}
	if (!o.types.root) {
		o.types.root = true;
		delRoot = true;
	}

	console.log(o);
//	return;
	for (var i = 0 ; i < o.index.length; i++) {
	//	alert(o.ptr.join());
		var oc = copyArray(o.ptr);
		oc = oc.concat(['index', i]);
		//console.log(oc);	
		var lo = (getGraphObject(oc))
		//console.log(o);
		if (lo.children.length || lo.parents.length) {

			var sys = new System(oc, pathList);
			sys.begin();
		}
		//pt.evaluatePhrase();
	}
	if (delRoot) delete o.types.root;
}


