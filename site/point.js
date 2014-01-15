
// meant to be a wrapper around the graph functions with iterator
// should be iterator and evaluatableIterator 
//
// there needs to a way of caching the ptr subnodes
//
var pointLookup = {}
var programs  = {"UI":UIClass, "DB":DBClass, "serializeUniverse":UniverseClass, "timeStamp":DateClass};

function point(options){ 

	this.nodePtr = copyArray(ptr);
	this.nodePtr.pop();this.nodePtr.pop();
	this.ptr = options.ptr;
	this.ptrId = ptr[0];
	this.childNumber = options.childNumber;
	this.id = options.id;
	this.parentId = options.parentId;
	this.pathList = options.pathList;

	pointLookup[this.id] = this;

	console.log(this.ptr);
	console.log("-----------------------");
	this.node = getObject(this.ptr, graphLookup)

	var nextPtrs = this.pathList[this.ptr];
	console.log(this.ptr);
	console.log(this.pathList);
	console.log(nextPtrs);
	console.log("============cool beanz====================");

	
	// assume no parent = origin
	if (!this.parentId) {
		this.origin = this.id;
	}
	
	
	
	var p2 = copyArray(this.ptr);
	p2.pop();p2.pop();
	this.superGroup = getObject(p2, graphLookup);

	this.label = this.superGroup.value;



	this.variables = [];
	
	// if theres no parentId, assume this to be the initial point
	this.children = [];


	//var nodeTypes = {"program":programComponents.prototype, "value":valueComponents.prototype};

	var pp = copyArray(this.ptr);
	var a1 = getObject([pp[0], pp[1], pp[2]], graphLookup);
	this.programName = a1.value;

	var tpg = programs[this.programName];
	mixin(this.prototype, tpg.prototype)	
	
	//var a1 = getObject([pp[0], pp[1], pp[2]], graphLookup);
	//nodeName = a1.value;
	pp.pop();
	pp.pop();
	while (pp.length > 0 ) {
		var ppo = getObject(pp, graphLookup);
		if (ppo.types['program']) {
				this.programVariable = ppo;
				break;
		}
		ppo.pop();
		ppo.pop();
	}
;
	
	//function pt() { };

	//pt.prototype = Object.create(point.prototype);
	//mixin(pt.prototype, programComponents.prototype);
	
	for (var i =0 ; i < nextPtrs.length; i++) {
		console.log("-----xxxx-----");	
;
		//pt.constructor = point.prototype.constructor
		//
		
		console.log(nextPtrs);	
		this.children[i] = new point({"ptr":nextPtrs[i], "id":mkguid(), "parentId":this.id, "childNumber":i, "pathList":this.pathList, "origin":this.origin});
		i++;
	}

}


point.prototype.pointLookup = {};

point.prototype = {

	"setBeginPhrase": function() {
		//if (this.superGroup.types)	
		//	if (this.superGroup.types['program']) {
		this.phraseBegin = true;
		console.log(this.ptr);
		//this.isMixedIn = true;
		mixin(Phrase.prototype, this);
		//pt.constructor = point.prototype.constructor
	},

	"getRootNode": function(){
		var rootPtr = [this.ptr[0], this.ptr[1], this.ptr[2]];
	},

	// used for detecting discontinuity...
	//  not sure this should ever be used, if dealing with a huge program, this would be slow as shit
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
	/*
	"getNextNodes": {
		return this.pathList[this.ptr]
	},
	*/
	"evaluate": function(){
		//this.initPhrase();
		console.log(this.superGroup);
		//this.evaluatePhrase();
	},

	"getPriorNode":function(){
		return pointLookup[this.parentId];
	},

	"getNextSibling":function() {
		var siblingId = pointLookup[point.parentId].children[this.childNumber+1];
		if (pointLookup[siblingId]) return pointLookup[siblingId];
		else return undefined;
	},

	"getPriorSibling":function() {
		var siblingId = pointLookup[point.parentId].children[this.childNumber-1];
		if (pointLookup[siblingId]) return pointLookup[siblingId];
		else return undefined;
	},
		

	"getNextChild":function() {
		if (!this.curChild) this.curChild = 0;
		else this.curChild++;
		return this.children[this.curChild];

	},
	"getPriorChild":function() {
		if (this.curChild > 0)
			return this.children[--this.curChild];
		else return false; // maybe throw error in the future
		
	},

	/*
	"setProgramNodes":function() {
		var id = this.ptr[0];
		var ptr = this.ptr;
		this.isProgram = false;
		if (this.node.types)
			if (this.node.types['program']) {
				this.programName = this.node.value;
				this.isProgram = true;
			}

		var a = copyArray(ptr);
		var c = [];

		this.parentProgramNames = [];
		while (a.length > 2) {
			a.pop(); a.pop();
			var o = getObject(a, graphLookup);

			if (o.types['program']) {
				if (o.value != this.progs[this.progs.length-1]) {
					this.parentProgramNames.push(this.node.value);
					this.programName = o.node.value; //.push(o);
					this.isParam = true;
					//break;
				}
			}
		}
	},
	*/
	// more unneeded shit
	"setTypeNodes":function() {
		var id = this.ptr[0];
		var ptr = this.ptr;
		this.isProgram = false;
		if (this.node.types)
			if (this.node.types['root']) {
				this.rootName = this.node.value;
				this.isRoot = true;
				//this.isProgram = true;
			}

		var a = copyArray(ptr);
		var c = [];

		this.programs = [];
		while (a.length > 2) {
			//a.pop(); a.pop();
			var o = getObject(a, graphLookup);

			if (o.types['root']) {
				//if (o.value != this.progs[this.progs.length-1]) {
				this.rootName = o.node.value; //.push(o);
					//break;
				//}
			}
			if (o.types['program']) {
				this.programs.push(this.node.value);
			}
		}
	},
	"obj2JSON":function() {
		return graph.prototype.toJSON(this.ptr[0]);

	},
	"step":function() {
		var rootPoint = pointLookup[this.rootPointID];
		
		if (this.programVariable) {

			if (!rootPoint.traversedProgs)				
				rootPoint.traversedVars[this.programVariable] =  rootPoint['programVariables'][this.programVariable].length;
			else 
				rootPoint.traversedVars[this.programVariable]--;

			if (rootPoint.traversedVars[this.programVariable] == 0)
				var pv = rootPoint['programVariables'][this.programVariable];
			for (var i =0; i < pv.length; i++) {
				pointLookup[pv[i]]
				this.evaluate();
			}

		}
		else this.evaluate();	
	}

}

function System(pt) { 
	this.rootPoint = pt;
//	pt.setBeginPhrase();
	//this.evaluatePhrase();
	this.traversedNodes = {};
	pt.nextPhrases = [];
	//this.endPhrases = [];
	//pt.phraseBegin = true;
	//this.evaluatePhrase();
	//console.log(this.ptr);
	//this.isMixedIn = true;
	//mixin(Phrase.prototype, this);
	this.endPhrases = [];
	this.beginPhrases = [];
//	this.phrases = [];
// 	need to build a phrase hash...
}

//class named after Vivek's famous quote "the only good system is a sound system" ;
System.prototype = {


	"setsData":function() { (this.nextPoint.node.type['root'] || !this.nextPoint.children) },
	//rootPhrase
	"evaluate":function() {

		this.hasTraversed = false
	
		//rootPhrase = this;


		function recurse(p, pr) {
			if (this.traversedNodes[p]){
				this.traversals--;
			}else this.traversedNodes[p] = true;
			

			rootPoint = pointLookup[pr];


			//if (p.programName) {
				//var pnp = copyArray(p.node.ptr);
				//pnp.pop();
				//var programNodeId = pnp
				//need to climb up to find program node
				//.. a program node needs variables to conclude before executing
				//
				
				if (rootPoint.programVariable)
				if (!rootPoint.programVars[rootPoint.programVariable])
					rootPoint.programVars[rootPoint.programVariable] = [];
				rootPoint.programVars[rootPoint.programVariable].push(p.id);
			//}
			//
			
			//p.rootPhrase = pr;
			p.rootPointID = pr;
			if (p.node.types['root']) {
				//rootPoint.evprogs = [];
				p.traversedVars = {};				
				//new Phrase(pointLookup[pr.id]
				p.phraseBegin = true;
				var opr = pr;
				pr = p.id;
			}

			if (p.node.types)
			if ((p.node.types['root'] || p.children.length == 0) && !hasTraversed) {
				//p.phraseBegin = true
				p.setBeginPhrase();
				//var rootItem = p;
				// not sure about this .. because the phrase might be part of a greater phrase....
				// need to play around with this 
				if (this.hasTraversed) {
					pointLookup[p.parentId].phraseEnd = true;
					
					//this.endPhrases.push(p.parentId);
					//this.beginPhrases.push(p.id);
					//phrases[p.id] 
					//p.id;
					//if (rootPhrase) { 
					//if (this.hasTraversed) {
					
					this.traversals--;
			        	this.nextPhrases.push(p.id);
			
					if (this.traversals == 0) {
						// iterations > 0 and also next childrent arent all roots ..
						// if there's just one item in the linkage, this strategy will break
						// rootPhrase.renderPhrase({"});
						this.completed = true;
						//rootPhrase.nextPhrases = nextPhrases
					}//else {
					//	p.nextPhrase.push(new Phrase(pt));
					//}
					// need to re-evaluate the phrase if the phrase hasn't completed
				}
			} 
			if (!this.completed)
			for (var i =0 ; i < p.children.length; i++) {
				if (i > 0) { 
					this.traversals++;
					this.hasTraversed = true;
					//for (var g in this) console.log(g);
					//

					this.recurse(p.children[i], pr)
				}
			}
		}
	
		recurse(this);
		//this.renderPhrase();

	},
	// should be in a phrase class....
	// not sure the best way to organize this right now 
	// will refactor later when i figure out a better way to manage the phrases
	"render":function(pt) {
		//var pt = this.rootPoint;
		//
		//
		pt.evaluate();
		/*
		this.recurse = function(point) {
			//point.evaluateNode();
			for (var c in point.children) {
				var pc = point.children[c];
				pc.evaluateNode();
				if (!pc.phraseEnd)
					this.recurse(point);
				else {
					//not sure

				}
			}
		}
		*/
	//	point.evaluateNode();		
	//	this.recurse(pt);
		
		//this.evaluateNode();

	}
}


// Template much include onFunction and onParameter
function UIClass() {
};

//  UIClass.prototype = Object.create(baseProgram.prototype);

UIClass.prototype = {
	"getNameSpace":function() {
		//need to look back to find 'grid' location
		
	},
	"mouseClickCallback":function(ptr) {
		// iterate through the next pieces...
		

	},



	"evaluate":function() {

	//	this.


		//var pa = copyArray(this.ptr); //.pop().
		//pa.pop(); pa.pop();
		if (!this.phraseBegin) { 
			var pi = pointLookup[this.parentId]
			
			var rootPoint = pointLookup[this.rootNodeId];
			switch ( pa.renderedUI.type ) {

				case "button":
					pa.renderedUI.domNode.onClick = function() {
						for(var i =0 ; i < this.children.length; i++) {
							this.children[i].evaluate();			
							//if (this.children[i].programName == "UI")
							//node.onClick = UI.prototype.execute(this.children);
						}
					}
					break;
				case "input":

					break;
				


			}

			if (pa.renderedUI.type == "button") {
				pa.renderedUI.domNode.onClick = function() {
					for(var i =0 ; i < this.children.length; i++) {
						this.children[i].evaluate();			
						//if (this.children[i].programName == "UI")
						//node.onClick = UI.prototype.execute(this.children);
					}
				}
			} else {
				for(var i =0 ; i < this.children.length; i++) {
					this.children[i].evaluate();			
					//if (this.children[i].programName == "UI")
					//node.onClick = UI.prototype.execute(this.children);
				}
			}
		}
	

	},
	// this is a much better way of rendering rather than htmlrenderer
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
			this.drawELement(item, rowNode, li, ptrObject)
			//li.innerText = row[items];
		}
		var c = this.getNextChild();
		c.evaluate();
	},

	"drawElements":function(item, node, li, ptrObject) {
		ptrObject.renderedUI.item = item;
		switch(item) {
			case 'label':
				var val = graph.prototype.getPtrValue(item, "text");
				//var text = row[items]['text']
				li.innerText = val;
				ptrObject.renderedUI = {};
				ptrObject.renderedUI.domNode = li;
			break;
			case 'inputbox':
				var ib = document.createElement("input");
				li.appendChild(ib);
				ib.setAttribute("class", "UIInputCell");
				ptrObject.renderedUI = {};
				ptrObject.renderedUI.domNode = ib;
				ptrObject.renderedUI.type = "text";
				
			break;
			case 'button':
				var val = graph.prototype.getPtrValue(item, "text");			
				li.innerText = text;
				ptrObject.renderedUI = {};
				ptrObject.renderedUI.domNode = li;
				ptrObject.renderedUI.type = "onSubmit";
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
	"renderGrid":function() {



		var cellnode = document.creatElement("div");
		cellnode.setAttribute("class", "tableCell");

		document.body.appendChild(tablenode);
		tablenode.style.zIndex = zIndex.renderedApps;

		var row = graph.prototype.getLoc(this.node.ptr, ['dialog', 'row'])





	},

	"drawUI":function() {
		//var uni = new universe("rendered", true);
		//var node = graphLookup[this.id];
		//var json = point.JSON;
		//this.gid = uni.addGraph();
		//graphLookup[gid].setFromJSON(this.JSON);
		// might need to hash it...
	
		// this draws ui component 
		this.onCondition();
	}
}


function DateClass() {
}

DateClass.prototype = {
	"timeStamp":function(point, callback) {
		//this.direction = this.inheritDirection(); //"push";
		//;// point.nextPoint;// = "set"; // setting data dispatches data to be set by another function
		this.iterValue = new Date().toString();
		//this.onCondition();
	
		//onComplete
		for (var i =0; i < this.children.length; i++) {
			this.children[i].step();
		}
	}
}

function UniverseClass() {
}

UniverseClass.prototype =  {
	"serializePtrGraph":function(point) {
		this.direction = this.inheritDirection();
		this.value = {"serializedPtrGraph":{"serializedStuff":"codeNotComplete"}}
		this.onCondition();
	//}
		for (var i =0; i < this.children.length; i++) {
			this.children[i].step();
		}
}
}


/*
function getNextContext = { } 

getNextContext.prototype = {

	"getNextContext":function() { 
		this.recurse = function(point) {
			for (var i = 0; i < point.children.length; i ++) {
				var o = point.children[i];
				if (o.isContext) {
					o.isContext = true;
				}else this(o);
			}
		}

	}
}
*/


function setNextContext()  { }

setNextContext.prototype = {
	"setNextContext":function() {
		// search for element and set flag 
		this.recurse = function(point) {
			for (var i = 0; i < point.children.length; i ++) {
				var o = point.children[i];
				if (!o.isProgram) {
					o.setContext();// = true;
				}else this(o);
			}
		}
		this.recurse(this);
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

	"evaluate":function() {
		if ((this.ptr.length-2/2) == 3) {

			

		}

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

var pathsLookup;
var traverseProgram = function(ptr) {
	//var p2 = copyArray(ptr);
	var o = getObject(ptr, graphLookup);
	var cap = [];
	for (var i = 0; i < o.links.length; i++) {
		var link = o.links[i];


		cap.concat(link.children.concat(link.parents));
	}

	for (var i = 0; i < cap.length; i++) {
			var ctop = cap.gfx.bottom + cap.gfx.height;
			cap.push({'y':ctop, 'obj':cap[i]});
			//	o.gfx
			//	need to re-index the 'gfx' component
			//	it makes no sense as it currently is set
			//	the 'label' gfx shouldn't be mixed with the index gfx
	}
	cap.sort(function (a, b) {
		return (a.y <b.y)
	})
	
	return cap;
}


function getSubNodes(ptr) {
	return new selectInternodeDescendants(ptr).descendants;
	//return links;
}

function sortNodeLinks(items) {

	for (var i = 0; i < cap.length; i++) {
			var ctop = cap.gfx.bottom + cap.gfx.height;
			cap.push({'y':ctop, 'obj':cap[i]});
			//	o.gfx
			//	need to re-index the 'gfx' component
			//	it makes no sense as it currently is set
			//	the 'label' gfx shouldn't be mixed with the index gfx
	}
	cap.sort(function (a, b) {
		return (a.y < b.y)
	})
	var cappy = [];
	for (var i = 0; i < cap.length; i++) {
		cappy.push(cap[i].obj);
	}
	return cappy;
}


function selectInternodeDescendants(ptr) {
	this.descendants = [];
	graph.prototype.recurseItems(selectInternodeDescendants.prototype.getNextChild());
	
}


selectInternodeDescendants.prototype.getNextChild = function(ptr, obj) {
	for (var i = obj.index; i >=0 ;i--) {
		var link = obj[i];
		//if (link.parents[0].length || link.children[0].length)
			this.descendants.push(obj[i].children.concat(obj[i].parents));
		//return ptr;
	}
}



function getNextLinks(ptr, priorPtr) {
	this.ptr = ptr;
	var o = getObject (this.ptr, graphLookup);
	var cap = [];


	var a = o.children.concat(o.parents);

	for (var i = 0; i < o.length; i++) {
		
		if (a[i] != ptr) { 
			var o = getObject(a[i], graphLookup);
			var ctop = o.gfx.bottom + o.gfx.height;
			cap.push({'y':ctop, 'obj':o});
			//	o.gfx
			//	need to re-index the 'gfx' component
			//	it makes no sense as it currently is set
			//	the 'label' gfx shouldn't be mixed with the index gfx
		}
	}

	cap.sort(function (a, b) {
		return (a.gfx.y > b.gfx.y)
	})
	capy = [];
	var ly = cap[0].y;
	nc = [];
	for (var i = 0; i < cap.length; cap++) {

		var ct = capy[cap[i].y];

		if (ct === undefined) {
			capy[cap[i].y] = [cap[i].obj]
		}else capy[cap[i].y].push(cap[i].obj);

		if (ly != cap[i]) {
			capy[ly].sort(function(a,b) {
				return ( a.z > b.z );
			})
			nc.concat(capy[ly])	
		}
		ly = cap[i].y;
		// = cap[i];
	}

	return nc;
}



/*
 * the point should make the decision
var traverseProgramCallback = function(p) {
	var g = p.children;
	for (var i =0; i < p.children.length; p++)  {//while (p.hasNextPoint) {
		var p = point[i];
		//while (p.hasNextSibling) {
		//	d = point.nextSibling();
		traverseProgram(p);
	}
}
*/
/*V
point(thisPtr, lastPtr, sp, lastSp, lastLastPtr, lastLastSp) {
	

}
*/
