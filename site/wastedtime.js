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
