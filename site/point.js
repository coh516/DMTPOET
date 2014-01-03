
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


	this.node = getObject(this.ptr, graphLookup)

	var nextPtrs = this.pathList[this.ptr];

	console.log(nextPtrs);
	console.log("============cool beanz====================");

	this.superGroup = graph.prototype['..'](this.node.ptr);

	this.setTypeNodes(this.ptr);
	var i =0;
	this.variables = [];
	for (ptrs in nextPtrs) {
		
		var tpg = programs[this.programName];
		function pt() { };

		pt.prototype = Object.create(point.prototype);
		mixin(pt.prototype, programComponents.prototype);
		mixin(pt.prototype, tpg.prototype);
		pt.constructor = point.prototype.constructor

		this.children[i] = new pt({"id":mkguid(), "parentId":this.id, "childNumber":i, "ptr":ptrs, "pathList":this.pathList});
		i++;
	}
}


point.prototype.pointLookup = {};

point.prototype = {
	get priorNode() {
		return pointLookup[this.parentId];
	},

	"getNextSibling":function() {
		var siblingId = pointLookup[point.parentId].child_ids[this.childNumber+1];
		if (pointLookup[siblingId]) return pointLookup[siblingId];
		else return undefined;
	},

	"getPriorSibling":function() {
		var siblingId = pointLookup[point.parentId].child_ids[this.childNumber-1];
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
	}
}

function programComponents() { 

}

programComponents.prototype = {
	/*
	"process":function() {
		if (this.isRoot) {
			this.getPhrase();	
		}
		if (this.isProgram)  {
			this[this.node.value](point);	

		}else {
			this.handleValueNode(point);
		}
	},

	"processChildren":function() {
		for (var i =0; i < this.children.length; p++)  {
			var g = point[i];
			g.parentId = p.id;
			g.process();
		}
	},

	"onCondition":function() {
		this.processChildren();
	},

	"hasContext":function() {
		var o = this.getContext();
		if (o)
			return (o.id == this.node.id) 
		return false
	},

	"getLastBranch":function() {
		var p = this.priorNode;
		while (p) {
			if (p.node.id == this.node.id) {
				return p;
			}
			p = p.priorNode;
		}
		return false;
	},
	*/
	/*
	"getSubBranches":function() {
		var id = this.id;
		var stopRecurse = undefined;
		var nodes = {};
		//nodes["push"] = {};
		nodes = {};

		var recurse = function(m, itemsArray, switched) {
			for (var i =0 ; i < m.children.length; i++) {
				var x = m.children[i];

				if (x.setsData() && x.node.id == id) {
					nodes[itemsArray.join()] = itemsArray;
					//} else {
					//	nodes['push'][itemsArray.join()] = itemsArray;
					//}
				}
			var ca = copyArray(itemsArray);
				ca.push(x.id);
				if (id != x.node.id) switched = true
				this(m, ca, switched);
			}
		}
		recurse(this, [this.id], false);
		return nodes;//['pull'];
	},
	*/
	/*
	"getPullers":function() {
		return getNextBranch()['pull'];
	},
	"getPushers":function() {
		return getNextBranch()['push'];
	},
	*/

	"setsData":function() { (this.nextPoint.node.type['root'] || !this.nextPoint.children) },

	"setPhraseDelimiters":function() {
		//var p = this.priorNode;
		var nodes=[];
		//while (p) {
		var phrases = this.phrases = [];
		//var phrases = this.phrases;
		var lastItems = [];

		function recurse(p, ogp) {

			//var pl = ptrList[ptrList.length-1];

			//var p = pointLookup[ptrList[pl.id]]
			
			if (p.node.type['root'] || !p.children) {
				var cloneList = cloneObject(ptrList);
				//if (p.node.type['root']) var poppy = cloneList.pop();
				if (!ogp.levels) ogp.levels = [];
				//ogp.phrases.endPoints.push(p.id);
				
				//if (!p.children) {
				if (p.priorNode && p.children)
					p.priorNode.phraseEnd = true;
				
				if (p.children)
					p.phraseBegin = true;

				else p.phraseEnd = true;

				
				if (p.phraseBegin)
					p.namespace = {};

				//} else {
				//	p.phraseBegin = true;
				//	p.phraseEnd = true;
					//lastItems.push(this);
				//
				//}
			}

			for (var i=0; i < p.children.length; i++) {
				//var ca = cloneObject(ptrList);
				//ca.push(p.children[i]);
				if (p.phraseBegin) {
					//p.children[i].endPoints = [];
					//p.children[i].phraseBegin = true; 
					ogp = p.children[i];
				}
				var pcp = copyArray(p.children[i].node.ptr);
				pcp.pop(); pcp.pop();
				pcp = getNamespace();
				if (!ogp.levels[pcp.join()])  {
					ogp.levelCount[pcp.join()] = 0;
					ogp.levels[pcp.join()] = [];
					//namespace for UI is analogous at grid location
					//this.getNamespace(); // instad of pcpc ......
					if (!ogp.namespace[pcp.join()]) ogp.namespace[pcp.join()] = graph.getValueHierarchy(pcp);
				}

				ogp.levels[pcp].push(p.children[i].id);
				p.children[i].phraseBeginPoint = ogp.id;
				this(p.children[i], ogp)
				//p.phraseBegin = true;
			}
		}
		this.endPoints = [];
		//this.phraseBegin = true;
		this.recurse(this, this);
		return lastItems;
		//return phrases;
	},


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


	// realize tht branch objects share the same node ids
	/*
	"setContextRoutes":function(phrase) {
		var pulls = [];
		var pushes = [];
		for (var i=0; i < phrase.length; i++) {
			if (i > 0) {
				if (phrase[i].hasOwnProperty('rootName'))
					if (phrase[points.length-1].node.id == phrase[i].node.id)
						
						
						//pulls data

			}
		}	
	},
	*/
	/*
	"getContext":function() {
		var p = this.priorNode;
		while (p) {
			if (p.isContext) {
				return p;
			}	
			p = p.priorNode;
		}
		return undefined;
	},
	"getSubLinks":function() {
		var id = this.node.id;
		var connections = [];
		var recurse = function(point) {
		
			var p = point.getNextBranch();
			if (p.node.id == id)
				connections.push(p);
			else this(p);
		}
		recurse(this.getNextBranch())                            
		return connections;

	},
	"iterationsPerContext":function() {
		

	},
	"hasLastBranch":function() {


	},
	"getLoops":function() {
		var paths = pathLookup[this.node.id];
		this.pullsData = [];
		this.pushesData = [];
		for (var i =0; i < paths.length; i++) {
			var path = paths[i];
			if (path[path.length-1].id == this.node.id) {
				this.pullsData.push(path)
			}else this.pushesData.push(path);
		}
	},

	// to be called from the begining of the phrase
	"setNextContext":function() {
		// search for element and set flag 
		this.recurse = function(point) {
			for (var i = 0; i < point.children.length; i ++) {
				var o = point.children[i];
				if (!o.isRoot && o.rootName != this.rootName) {
					o.getLoops();// = true; //setContext();// = true;
				}else this(o);
			}
		}
		this.recurse(this);
	},

	
	"handleValueNode":function() {
		//var inputObject = this.lastPoint.value;
		// should be able to seperate root node from program node
		 this.isRoot = false;
		 // get params
		 //
		 //
		 //



		 if (this.hasContext()) {
			 // or last node is rootNode (in a root graph search)
			 // deal with that situation later
			 // currently not supporting root graphs
			 var tp = this.getLastBranch();
			 if(!tp) {
				 this.isRoot = true;
				 this.value = this.node.toJSON();
				 var subLinks = this.getSubLinks();
				 this.numSubLinks = subLinks.length;
				 this.subIterations = 0;
				 this.onCondition();
				
				 // default process children

				 //this.condition();
				 //
				 //dataLayer.createDocument(onCondition, this); // should store a reference to the document in this.storedDocument or smth
				 //
				 //either 1) iterate documents or 2) create document
				 //
				 //}
		 	}
			 else {
				 //this.priorNode.value
				 var c = this.getContext();
				 var o = getObject(this.ptr, graphLookup);
				 var a = [];
				 while (o.ptr.join() != c.ptr.join()) {
					 a.push(o.value);
					 a.push(o.ptr[o.ptr.length-1]);
					 var o = graph.prototype['..'](o.node.ptr);
				 }
				 a.reverse();
				 
				 var thisNode = getObject(a, c.value);
				 thisNode.value = this.priorNode.value;
				 tp.subIterations++;
				 if (tp.subIterations == tp.numSubLinks)
					 this['onIterationComplete']();
				 else this.onCondition();
				 //get up parent nodes 
				 //this.createChildNode();
				 //this.condition();
			 }
		 // create layer proper to what's needed
		 // if last node 
		}
		else {
			if(o)  if (o.types['program'] && o.value == this.programName)   this.isRoot = true;
			if (this.isRoot) {

				 var tp = this.getLastBranch();
				 if(!tp) {
				// find all 

				 }



				this['getRootValueNode']();
			
			// create iteration loop 
			// iterate through all the connections 
																
			} else {
				this['getValueNode']();	
			// 
			//
			//
			//		}
			//}
			}

                   //this.getContext().completedChildren++;
		   //	if (this.hasOwnProperty ("valueHandler")) {
		   //	this.valueHandler();
		}
	},
	"valueHandler":function() {
		//this.doSomethingUsefull.......
		if (this.hasContext()) {
			//this code needs to be swapped out for a proper ptr['..']()
			var o = graph.prototype['..'](this.node.ptr);
			
			// should be able to seperate root node from program node
			if(o) {
				if (o.types['program'] && o.value == this.programName)
					this.createRootNode();
			}
			else this.createChildNode();
		}	
	}
	*/ 
	/*
	"getPriorNodesWith":function(testFunction) {
		var p = this.priorNode;
		while (p) {
			if (p.isContext) {
				return p;
			}	b
			p = p.priorNode;
		}
		return false;
	},

	"getNextNodesWith":function(testFunction) {
		
	},
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
		var hier = graph.getValuePtr(this.nodePtr);
		var hl = hier.length-1;
		if (this.node[types]["root"]) {
	//	if (hier[hl] == "UI") {
			if (this.phraseBegin)
				ptrProgs[this.id] = new UIProgram(this.id, graph(graphLookup[this.node.ptr[0]]).toJSON());
		}
		// check namespace
		if (contains(hier, {'contains':{'vals':['row'], 'contains':{'vals':['label', 'dropdown', 'button']}}})) {
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
