
// meant to be a wrapper around the graph functions with iterator
// should be iterator and evaluatableIterator 
//
// there needs to a way of caching the ptr subnodes
//
var pointLookup = {}

function point(options){ 

	this.nodePtr = copyArray(ptr);
	this.nodePtr.pop();this.nodePtr.pop();
	this.ptr = options.ptr;
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
	
	var pp = this.ptr;
	var a1 = getObject([pp[0], pp[1], pp[2]], graphLookup);
	nodeName = a1.value;
	if (a1.types['program'])
		this.programName = nodeName;


	for (var i =0 ; i < nextPtrs.length; i++) {
		console.log("-----xxxx-----");	
		//var tpg = programs[this.programName];
		//function pt() { };

		//pt.prototype = Object.create(point.prototype);
	//	mixin(pt.prototype, programComponents.prototype);
	//	mixin(pt.prototype, tpg.prototype);
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
		
	"getJSON":function() {
		return graphLookup[this.id].toJSON(this.ptr);
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

}

function Phrase(pt) { 
	this.rootPoint = pt;
	this.evaluatePhrase();
}

Phrase.prototype = {


	"setsData":function() { (this.nextPoint.node.type['root'] || !this.nextPoint.children) },
	//rootPhrase
	"evaluatePhrase":function() {

		this.hasTraversed = false
	
		//rootPhrase = this;


		function recurse(p) {
			if (this.traversedNodes[p]){
				this.traversals--;
			}else this.traversedNodes[p] = true;
			
			if (p.programName) {
				var programNodeId = p.node.ptr[0];
				if (!this.programVars[programNodeId])
					this.programVars[programNodeId] = [];
				this.programVars[programNodeId].push(p.id);
			}

			if (p.node.types)	
			if ((p.node.types['root'] || p.children.length == 0) && !hasTraversed) {
				//p.phraseBegin = true
				p.setBeginPhrase();
				//var rootItem = p;

				// not sure about this .. because the phrase might be part of a greater phrase....
				// need to play around with this 
				if (this.hasTraversed)
					pointLookup[p.parentId].phraseEnd = true;
				//if (rootPhrase) { 
				if (this.hasTraversed) {
					this.traversals--;
			        	this.rootPhrase.nextPhrases.push(p.id);
			
					if (this.traversals == 0) {
						// iterations > 0 and also next childrent arent all roots ..
						// if there's just one item in the linkage, this strategy will break
						// rootPhrase.renderPhrase({"});
						this.completed = true;
						//rootPhrase.nextPhrases = nextPhrases
					}

					// need to re-evaluate the phrase if the phrase hasn't completed
				}
					
				

			} 
			if (!this.completed)
			for (var i =0 ; i < p.children.length; i++) {
				if (i > 0) { 
					this.traversals++
					this.hasTraversed = true;
					//for (var g in this) console.log(g);
					this.recurse(p.children[i], p)
				}
			}
		}
	
		this.recurse(this, this);
		//this.renderPhrase();

	},
	"renderPhrase":function() {
		var point = this.rootPoint;
		this.recurse = function() {

			point.evaluateNode();
			for (var c in point.children) {
				point.children[c].evaluateNode();

			}
		}
		this.recurse(point);
		
		//this.evaluateNode();

	},
	/*
	"processPhrase":function(pb) {
		
		var brk = false;
		var levels = {};
		function recurse(item) {
			if (item.phraseEnd)
				brk = true;
			if (brk) return;

			for (var child in item.children) {
				var pc = child.node.ptr;
				pc.pop();pc.pop();
				var pcj = pc.join();
				var co = child.phraseBeginPoint;
				if (arrayHas(co.levels[pcj], child.id)) {
					co.levelCount[pcj]++;
				}
				
				if (co.levelCount[pcj] == co.levels[pcj].length) {
					child.evaluateNode(pcj);
				}
				// might need some more work on other various types of node configuration that require waiting
			}
		}
		pb.levels = levels;
	}
	*/




}


// Template much include onFunction and onParameter
function UIClass() {};

//  UIClass.prototype = Object.create(baseProgram.prototype);

UIClass.prototype = {
	"getNameSpace":function() {
		//need to look back to find 'grid' location
		
	},
	"mouseClickCallback":function(ptr) {
		// iterate through the next pieces...
		

	},


	"evaluateNode":function(pcj) {
		var hier = graph.prototype.getValueOrder(this.nodePtr);
		console.log("hier: "+hier);
		var x = contains(hier, {'row':{'label':[{'text':'save as'}, {'inputbox':'text'}, {'button':'type'}]}});

		console.log("x:"+x);

		return;



		var hl = hier.length-1;
		if (this.node.types)
		if (this.node['types']["root"]) {
	//	if (hier[hl] == "UI") {
		//	if (this.phraseBegin)
		//		this.ptrProgs[this.id] = new UIProgram(this.id, graph(graphLookup[this.node.ptr[0]]).toJSON());
		}
		// check namespace
		if (contains(hier, {'row':{'label':[{'text':'save as'}, {'inputbox':'text'}, {'button':'type'}]}})) {
		//if (contains(hier, {'contains':{'vals':['row'], 'contains':{'vals':['label', 'inputbox', 'button']}}})) {
			if (this.superGroup.value == 'text') {
				if (!this.phraseEnd) {
					
					var ptr = this.node.ptr;
					//var o = getObject(ptr,this.uiprog);
					//o.callback = UI.dispatchValue;
					//this.uiprog.setEvent(
					//
					//
					//
					switch (this.superGroup.value) {
						case "text":
							this.variable = this.node.ptr;
							break;
						case "type":
							this.variable = this.node.ptr;
							break;
					}
	
					/*

					if (this.superGroup.value == 'text') {
						//this.getLastValue();b
						//var a = copyArray(this.node.ptr);
						this.variable = this.node.ptr
					}
					if (this.sueprGroup.value == 'type') {

					}
					*/
				}
				if (this.phraseEnd) {
					var ptr = this.node.ptr;

					if (this.superGroup.value == 'text') {
						//this.getLastValue();b
						//var a = copyArray(this.node.ptr);
						var o = getObject(this.node.ptr, graphLookup);
						ptrProgs[this.id].copyChild(this.node.ptr);
					}
				}
			}

			if (this.superGroup.value == 'type' && !this.phraseEnd) {
				if (this.node.value == "onSubmit") {
					//var o = getObject(p2, graphLookup);
					//for serialization concerns might need to turn the joins into jsonifieds 
					var prog = ptrProgs[this.id];
					a[0] = prog.gid;
					var btn = getObject(a, graphLookup);
					ptrProgs[this.id].setEvent("handleMouseClick", 'exact', a, this.mouseClickCallback);

					//o.registerEvents('callback'); // i'd like it i
				}
				//uiObject
			}
		}
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
	"getIsoDate":function(point, callback) {
		this.direction = this.inheritDirection(); //"push";
		//;// point.nextPoint;// = "set"; // setting data dispatches data to be set by another function
		this.iterValue = {"program":{"Numbers":new Date().toString()}}
		this.onCondition();
	}
}

function UniverseClass() {
}

UniverseClass.prototype =  {
	"serializePtrGraph":function(point) {
		this.direction = this.inheritDirection();
		this.value = {"serializedPtrGraph":{"serializedStuff":"codeNotComplete"}}
		this.onCondition();
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
		dbLayer.query(nsc);

		

		//p.levels--;

		//if (p.levels == 0)
		//	getDBItem();



		// search the tree upward to find the common tree
		/*
		if (!this.phraseEnd) {
			

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

var pathsLookup;
var programs  = {"UI":UIClass, "DB":DBClass, "Universe":UniverseClass, "Date":DateClass};
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
