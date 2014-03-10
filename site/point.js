
// meant to be a wrapper around the graph functions with iterator
// should be iterator and evaluatableIterator 
//
// there needs to a way of caching the ptr subnodes
//
var pointLookup = {}
// should be arrays
var programs  = {"UI":UIClass, "MONGO":DBClass, "serializeUniverse":UniverseClass, "timeStamp":DateClass, "drawPtrGraph":GraphRenderer, "mapReduce":FilteredObject, 'mapReduce':DBClass};

// *** todo ***
// generic objects getClassPrototype.  for example, mapReduce  following a DBClass should be tied to the DB, but if its after an Array class, it should be part of the Array object.
// this would be for things like, after a FIND, and there's a map reduction from the collection, from the returned Array.
// im sure there are other instances where this would be necessary. This would allow a level of polymorphism that might be really cool. 
// 
// The DB should be indexed differently, DB->[dbName]->collection->[collectionName] 


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

	this.label = getGraphObject(this.superGroup).value;



	this.variables = [];
	
	// if theres no parentId, assume this to be the initial point
	this.children = [];
//	this.values = [];

	//var nodeTypes = {"program":programComponents.prototype, "value":valueComponents.prototype};

	var pp = copyArray(this.ptr);
	var a1 = getObject([pp[0], pp[1], pp[2]], graphLookup);
	this.programName = a1.value;
	if (!programs[this.programName])
		this.programType = 'Object';
	else
		this.programType = this.programName;
	
	tpg = programs[this.programType];
	//console.log(this.programName);
	mixin(tpg.prototype, this)	
	
	//var a1 = getObject([pp[0], pp[1], pp[2]], graphLookup);
	//nodeName = a1.value;
//	pp.pop();
//	pp.pop();

	// in the future, program variables should automatically be detected by seperate linkage patch
	var pp = copyArray(this.superGroup);
//	this.programVar = {};
	/*
	while (pp.length > 0 ) {
		var ppo = getObject(pp, graphLookup);
		if (ppo.hasOwnProperty('types'))
		if (ppo.types['waits']) {
				//console.log("=========================*****");
				this.programVar = ppo.ptr;
				break;
		}
		pp.pop();
		pp.pop();
	}
	*/
	this.programVar = this.ptrId;

}


Point.prototype.pointLookup = {};

Point.prototype = {
	get superNode() { return getObject(this.superGroup, graphLookup) },

	"setBeginPhrase": function() {

		this.phraseBegin = true;
		//console.log(this.ptr);
		this.phraseVars = {};
		//mixin(Phrase.prototype, this);
	},
	"isLastNode":function() {
		if (!this.children.length)
			return true;
		for (var i =0; i < this.children.length; i++) {
			if (!this.children[i].isRoot)
				return false;
		}
		return true;

	},
	"getGraphFunction":function() {
		return graphObjLookup[this.ptr[0]];

	},
	"getBaseNode": function(){
		var rootPtr = [this.ptr[0], this.ptr[1], this.ptr[2]];
		return getGraphObject(rootPtr);
	},
	"getBaseValue":function() {
		return this.getBaseNode().value;
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
		/console.log(this.superGroup);
		this.evaluatePhrase();
	},
	*/
	"getPriorNode":function(){
		if (this.parentId != this.id)
			return pointLookup[this.parentId];
		else return undefined
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

	"getFirstNamedItem":function(val) {
		var pz = [];
		for (var i=0; i < this.ptr.length; i++) {
			pz.push(this.ptr[i]);
			var o = getGraphObject(pz);
			if (o.value == val)
				return o;
		}
	},
	"isWithin":function(val) {
		var go = this.getFirstNamedItem(val); //this.containedWithin('object')
		if (go)
			return (go.ptr.length < this.ptr.length)
		return false;
	},
	"obj2JSON":function() {
		return graph.prototype.toJSON(this.ptr[0]);

	},
	
	"_next":function() {
		//alert("test from _");
		console.log("yo this is the shit");
		var o = pointLookup[this.id]
		o.next();

	},
	
	"next":function() {
		console.log("----------9876");
		for (var i =0; i < this.children.length; i++) {
			pointLookup[this.children[i]].step();
		}
	},
	"step":function() {
		var rootPoint = pointLookup[this.rootPointID];
		console.log("test.....");
	//	console.log(this);	
		if (this.programVar) {
			//alert(this.programVar);
			// get programIndex 
			console.log("**************");	
		    	var pi = this.programVarIndex;//programIndex()	
			if (!pi) pi = 0;
			console.log(graphLookup[this.programVar])	
			var popped = rootPoint.phraseVars[this.programVar][pi].pop();
			rootPoint.poppedPhraseVars[this.programVar][pi].push(popped);

			//console.log(popped +" "+ this.id);
			//ppv.push(popped);
			//var 
			//if (!rootPoint.poppedPhraseVars[this.programVar])
			//	rootPoint
			//alert(rootPoint.phraseVars[this.programVar].length);
			//console.log("one lovr!!!");
			//console.log(rootPoint.phraseVars[this.programVar]);
			if (rootPoint.phraseVars[this.programVar][pi].length == 0) {
				console.log(rootPoint.poppedPhraseVars[this.programVar][pi]);
				console.log("000000000000000000");
				//alert("ja");
				//console.log("jah.... rastafari");
				rootPoint.phraseVars[this.programVar][pi] = copyArray( rootPoint.poppedPhraseVars[this.programVar][pi])
				
				//rootPoint.poppedPhraseVars[this.programVar]
				var pv = rootPoint['phraseVars'][this.programVar][pi];
				this.evaluate(rootPoint.phraseVars[this.programVar][pi]);
				rootPoint.poppedPhraseVars[this.programVar][pi] = [];
					
			}

		}

		else {
			//console.log(getGraphObject(this.ptr));
			this.evaluate();	
		}
	},
	"memberOf":function(a) {
		return Graph.prototype.climbToValue(this.superGroup, a);
	},
	"programIndex":function() {
		//var pt = this;
		var index = -1;
		//var priorNode = pt.getPriorNode();
		//var cur = this.getPriorNode();
		var cur = this;
		// test to see if this is actually a freshie
		//if (cur.programVar && last.programVar) 
		//	return -1;
		
		while (cur){
			var iz = false;
			if (cur.programVar) { // && last.programVar) {
				index++;
				iz=true;
			}
			//console.log(last.programName);
			//if (cur.isRoot) break;
			//var last = cur;
			var cur = cur.getPriorNode();
			// this totally doesnt make any sense... but it fits the paradizzle 
			//if (!iz && !cur && last.programVar)
			//	index++;
			//if (!cur) return index;
			
		}
		return index;
	}//,
	//"programParam":



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
//	pt.nextPhrases = [];
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
		// use progz cuz z is cooler than s
		var recurse = function(pID, rpID, progz) {


			var rootPoint = pointLookup[rpID];

			var po = pointLookup[pID];
			po.rootPointID = rpID;
			//console.log (rpID);
			var ponode = po.superNode; //getObject(po.ptr, graphLookup);
				
			// this might need to be stored in a phraseLookup[rootPointID]
			//if (rootPoint.programVars)
		//	if (!rootPoint.phraseVars)
		//		rootPoint.phraseVars
		//		gfxLookup[this.linkedGfxId].setInputBox(_rowItem.ptr);
			//console.log(rootPoint.phraseVars);
			//programVar needs to be changed to ptrId .. which all objects have..
			//all objects should have this property
			//remove the need to type sub programs

			if (ponode.types)
			if (ponode.types['root']) {
			//	alert("test");
				po.setBeginPhrase();
				rpID = po.id;
				//console.log(ponode);
				//console.log("----------------");
				var isRoot = true;
			}
			if (po.programVar) {
				//console.log(po.id);
				if (!rootPoint.phraseVars[po.programVar]) {
					// need to traverse back to the last time this subject was en route
					rootPoint.phraseVars[po.programVar] = [];
					
					// need to patch the current stage of the phrase var.......
					// phraseVarStages
					if (!rootPoint.poppedPhraseVars)
						rootPoint.poppedPhraseVars = {}; 
					rootPoint.poppedPhraseVars[po.programVar] = [];
				}
				// programIndex sucks, it's so fucking slow... compound slowness...
				if (!progz.hasOwnProperty(po.programVar)) 
					progz[po.programVar] = 0;
				else progz[po.programVar]++;

				var pi = progz[po.programVar];//po.programIndex();

				var pia = rootPoint.poppedPhraseVars[po.programVar];
				var ppp = rootPoint.phraseVars[po.programVar];
				//console.log(getGraphObject(po.programVar).value);
				//console.log(ppp);
				po.programVarIndex = pi;
				if (!pia[pi]) {
					pia[pi] = [];
					ppp[pi] = [];
				}
				ppp[pi].push(pID);
				//console.log(pi+"  <tractor trailor"+pID+"  >>"+po.label);

				//rootPoint.phraseVars[po.programVar][pi].push(pID);
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
				var zp = {};
				for (var g in progz) zp[g] = progz[g];
				recurse(np.id, rpID, zp);

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
	
		recurse(this.rootPoint.id, this.rootPoint.id, {});
		//console.log("-----------------------evaluting");
//		this.rootPoint.evaluate();
		//console.log(this.rootPoint);
		this.rootPoint.evaluate();
		//this.renderPhrase();

	},

}

// Template much include onFunction and onParamete
// this is just for shits and giggles i guess...
// the real version needs to create children and link them
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
	"addUIEvent":function(ptr, type, obj) {
		if (!ptrEvents[ptr.join()]) ptrEvents[ptr.join()] = {};
		// setting type here might have been unnessary
		ptrEvents[ptr.join()][type] = obj;
	},

	// this needs to be moved to the UIRenderer class....
	"evaluate":function(vals) {

		// only at the phrase begin stage should this ever draw a ui
		if (!this.phraseBegin) {
		       // shoulnd't be done this way.. should look to see if there is already an instance of this object 	
		       // UILookup[nodeID] would be better 
			var pi = pointLookup[this.parentId]
			var pa = getObject(this.superGroup, graphLookup); 
			// needs to trace up until it finds a UI object
			var rootPoint = pointLookup[this.rootNodeId];
			//console.log("------");
			//console.log(this);
			var li = this.superGroup;// i hate that i can't do li.climbToValue .. need to work on that..
			var memberOf = Graph.prototype.climbToValue(li,['button', 'inputbox', 'label', 'dropdown']);
		       	//console.log(li);
			//return;
			//this should only be triggered when the object is on the client side...
			// the way im looking to do that is check that it directly decsended from UI
			// or that it came from an event
			console.log("------oo------");
			//console.log(">> whoo"+this.getPriorNode());
			console.log(this.getPriorNode());
			// vals should be standard...
			// should use vals rather than this.getPriorNode.... 
			// somehow there are multiple objects being registered...	
			for (var i=0; i < vals.length; i++) {
				var vp = pointLookup[vals[i]];
				var pn = vp.getPriorNode();
				emitData = !vp.isLastNode();//   ((!pn.hasOwnProperty('value') || pn.hasOwnProperty('selectsData')) && !pn.hasOwnProperty('setsData'))
				//if (pn.hasOwnProperty('setsData')) emitData = false;
				switch (memberOf.val) {

					case "button":
						//	nodeEvents[li.
						//alert('test');
						//console.log(this.ptr[0]);
						//console.log(memberOf.ptr);
						//console.log(getGraphObject[memberOf.ptr]);
						var glp = this.getLinkedPtr(memberOf.ptr);
						//console.log(glp.concat(['gfx', 'point']).join());
						// fix this to actually correspond to the proper area
					//	alert("test.............");
						console.log(glp+" <<<<<<<<<<<<<<<<<<<<<<<<<@#$@@#$@#!$@!#$@!#$@!#$@!#$@!#$!@#$@!#$!@#$!@#$!@$!@#$!@#$!@#$!@#$@!#$@!#$@!#$@!#$#!@$E!@#$!@$#!$$#@$!@#");
						console.log(glp);
					//	var z = getGraphObject(glp.concat(['gfx', 'point']));
						//console.log(glp);	
						//						glp.pop();glp.pop();
					//	console.log(z.gfxId)
						ptrEvents[glp.concat(['gfx', 'point']).join()]= {'handleMouseClick': this._next.bind({"id":this.id})};
						//this.addUIEvent(glp.concat(['gfx', 'point']), 'handleMouseClick', this._next.bind({"id":this.id}));
						break;
					case "inputbox":	
						console.log(memberOf.ptr);
							console.log("--------------=");
						var glp = this.getLinkedPtr(memberOf.ptr);
						//console.log(glp);
						glp = glp.concat(['gfx', 'point']);
						console.log(glp);
						var z = getGraphObject(glp);
						//console.log(glp);	
						//						glp.pop();glp.pop();
						console.log(z.gfxId);
							// sort of dumb, I need the gfxId from the hardcoded point... 
						//
						console.log(graphLookup[z.gfxId]);
						vp.value =  gfxLookup[z.gfxId].getValue(glp);////pa.renderUI.domNode.value;
						vp.next();
						break;
					case "dropdown":
					//	alert("test");
						if (!emitData) {
							// should populate the sub node...
							//vp.values.push(vp.getPriorNode().value

							var glp = this.getLinkedPtr(memberOf.ptr);
							//console.log(glp);
							//glp = glp.concat(['gfx', 'point']);
							console.log(glp);
							var obj = getGraphObject(glp);
							// shoud get number of dropdowns to test whether or not to rebuild
							// if all fulfilled......rebuild
							
							
							if (!obj.values) obj.values = []; // should be initted somewhere else			
							// needs some more work when dealing with other paradigms
							//if (vp.label == 'text') {
							// need to iterate through the values, and coordinate it with the id's....
							var values = vp.getPriorNode().value;
							getGraphObject(vp.superGroup).values = values;
							// values need to pushed to their corrosponding parent node
							for (var j=0; j < values.length; j++) {
								var o;
								if (!obj.values[j]) obj.values[j] = {};
								if (vp.label == 'text') {
									console.log("---------------xxx=--");
									obj.values[j]['text'] = values[j];
								}
								/*
								else
								if (!obj.values[j].ptr) {
									//var o = {}
									//if (values[j] != 'text') {
										//o["ptr"] = vp.ptr;//values[j];	
										obj.values[j]["ptr"] = [JSON.stringify(vp.ptr)]
									//}
								}
								else
									obj.values[j]['ptr'].push(JSON.stringify(vp.ptr));
								*/					
	
							}
							console.log(obj.values);
							var z = glp.concat(['gfx', 'point']);
							var gfxObj = getGraphObject(z);
							console.log(gfxObj);
							// should store and rebuild all	
							gfxLookup[gfxObj.gfxId].rebuild();
							//}
						} else {
						//	console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!--------------=");
							var glp = this.getLinkedPtr(memberOf.ptr);
							//console.log(glp);
							glp = glp.concat(['gfx', 'point']);
						//	console.log(glp);
							var z = getGraphObject(glp);
							//console.log(glp);	
							//glp.pop();glp.pop();
						//	console.log(z.gfxId);
							// sort of dumb, I need the gfxId from the hardcoded point... 
							//
							//console.log(graphLookup[z.gfxId]);
							var ogp = this.getLinkedPtr(memberOf.ptr);
							va =  gfxLookup[z.gfxId].getDropdownIndex(ogp);
						//	console.log("va: "+va);
						//	console.log(vp.label+": "+getGraphObject(vp.superGroup).values[va]);
							vp.value = getGraphObject(vp.superGroup).values[va];

							//console.log(va);
							//var ptrs = JSON.parse(JSON.parse(va.getAttribute('ptr')));
							//for (var k = 0 k < ptrs.length; k++) {
							//	var pt = pointLookup[ptrs];
							//	pt.next();
							//}
							vp.next();
						}	

						//	alert("test..");
						break;
				}
			}
			//var c = this.getNextChild();
			//	alert("evaluaiting..");
			//console.log(c);
			//c.evaluate()


			//			}
	}else { // imply  {"GFX":{"renderer":"WindowManager"}}
		// for the most part, this should work...
			// it should duplicate the graph and use a modified renderer
			var sg = getGraphObject(this.superGroup);
			if (sg.point)
			if (sg.point.built) {
				this.next();
				return;
			}
		//	this.createDom();
			//var json =  graphObjLookup[this.ptrId].toJSON();
			//console.log(JSON.stringify(json));
			var graph = new Graph();
			//graph.setFromJSON(["Dialog"]);
		//	alert("psycho!");
			var g = new Gfx({"type":"point", "ptr":[graph.id], "renderer":htmlRenderer, "baseElement":frame2.contentDocument.body});
		//	gfxLookup[g.id].initNodes(); // sets up graph with gfx.point
		//	console.log(graphLookup[g.id]);
			g.hasIndex = false;	
			//g.build();		// not right!

		//	console.log(graphLookup[graph.id]);	
			this.linkedGfxId = g.id
			//this.node.ptr
			this.linkedGraphId = graph.id;
			/*
			var go = getGraphObject(this.ptr);
			if (!go['points']) go['points'] = {};
			if (!go['points'][thisid] = {};
			var gop = go['points'][thisid];
			gop['linkedGfxId'] = g.id;
			gop['linkedGraphId'] = graph.id;
			*/
			//
		//	return;
			events['point'] = staticEvents.prototype;
			
			this.createDom();
			g.build();
			if (!sg.point) sg.point = {"built":true}
			else sg.point.built = true;
		this.next();

			// the parent objects should have a pointIndex layer that connects to the point item child items.

		}
	},
	// this is stupid, there should be a bi-directional linked nodes...
	// requires more thought.. this is too hacked.
	"getLinkedPtr":function(ptr) { 
		//var _ptr = copyArray(ptr);
		
		//_ptr[0] = pointLookup[this.rootPointID].linkedGraphId;
		console.log(getGraphObject(this.ptr));
		return getGraphObject(ptr).point.linkedPtr;
	},
	"getLinkedNode":function(ptr) {
		return getGraphObject(this.getLinkedPtr(ptr));
	},
	// this is a much better way of rendering rather than htmlrenderer
	"initGfx":function(obj) {
		var o = getGraphObject(obj);
		if (!o['gfx']) o.gfx = {};
		o.gfx.point = {};
	},
	"createDom":function() {

		var ar = Graph.prototype.getPtrValue(this.superGroup, 'dialog');
		
//		console.log(this.getLinkedNode(this.superGroup));
		//this.getLinkedNode(this.superGroup)['gfx']['point'].hideItem = true;
		
//		console.log(this.getLInkedPtr(this.superGroup));
		for (var i=0; i < ar.length; i++) 
			this.evaluateDialog(ar[i]);

	},

	/* more code to throw out */

	"evaluateDialog":function(dialogPtr) {
		//this.getLinkedNode(dialogPtr)['gfx']['point'].hideItem = true;
		// this is stupid, 'row' represents row.	
		var view = Graph.prototype.getPtrValue(dialogPtr, "view");
		var grid = Graph.prototype.getPtrValue(view[0], "grid");
		//view[0].gfx.point.hideItem = true;	
		//gfxLookup[this.linkedGfxId].
		//http://imagecache5d.allposters.com/watermarker/8-850-SDTY000Z.jpg
		//this.getLinkedNode(view[0])['gfx']['point'].hideItem = true;
		//gfxLookup[this.linkedGfxId].hideChildren(this.getLinkedPtr(view[0]));
		var _dialog = Graph.prototype.appendChild([this.linkedGraphId], 'dialog');
		//.console.log(_dialog);
		this.initGfx(_dialog.ptr);
		_dialog.gfx.point.hideItem = true;
		var o = getGraphObject(dialogPtr);
		if (!o.point) o.point = {};
		//var go = getGraphObject[this.graphId,'item'];
		o.point.linkedPtr = _dialog.ptr;//[this.graphId,'item', go.length-1];
	
		

		if (grid) {
			var rows = Graph.prototype.getPtrValue(dialogPtr, 'row');
		
//			var n = Graph.prototype.getPtrValue(ri, 'rows');
			
			gfxLookup[this.linkedGfxId].setGridLayout(_dialog.ptr);
			//console.log(this.linkedGraphId);
			//gfxLookup[this.linkedGfxId].setGridLayout(this.getLinkedPtr(dialogPtr));
			//console.log(this.getLinkedNode(dialogPtr));
		//	gfxLookup[this.linkedGfxId].rebuild();
		//	return;
		//	{"view":"grid"}
			this.evaluateRows(rows, _dialog);
		}
	},
	"evaluateRows":function(rows, _dialog) {
		//console.log(rows)
		// should draw a new row ... the copy, paste, hide needs to be updated..
		for (var i =0 ; i < rows.length; i++) {
			var _row = Graph.prototype.appendChild(_dialog.ptr, 'row');
			//var ga = [this.graphId, 'item', 0, 'item'];
			//var  gl = getGraphObject(ga).length;
			//console.log(_row);
			this.initGfx(_row.ptr);  
			//o.gfx.point.hidenItem = true;
			//rows[i]['point'] = {"linkedNode":
			_row['gfx']['point'].hideItem = true;	
			//console.log(this.getLinkedNode(rows[i]));
			var ro = getObject(rows[i], graphLookup);
			//var ro = getObject(rows[i]);
			if (!ro.point) ro.point= {};
			ro.point.linkedPtr = _row.ptr; 
			// it should use the standard index model and make unhide


			for (var j=0; j < ro['item'].length; j++) {
				var rowItem = ro['item'][j];

				this.drawElement(rowItem, _row)
					//li.innerText = row[items];
			}
		}
	
	},

	"drawElement":function(rowItem, _row) {
	//	ptrObject.renderedUI = {};
		//return;
		gfxLookup[this.linkedGfxId];// this.getLinkedNode(ptrObject.ptr)['gfx']['point'].hideItem = true;
		//ptrObject.ptr
		//ptrObject.renderedUI.item = item;
		//var ri = this.getLinkedPtr(rowItem.ptr);
		//
		var ri = rowItem.ptr;
		var _rowItem = Graph.prototype.appendChild(_row.ptr, 'rowItem');
		this.initGfx(_rowItem.ptr);
		var rig = getGraphObject(ri);
		if (!rig.point) rig.point = {};
		rig.point.linkedPtr = _rowItem.ptr;
			// once again, this should be part of the standard index model
		//console.log("yo yo yo");	
		switch(rowItem.value) {
			case 'label':
				//var o = this.getLinkedPtr(rowItem);
				//gfxLookup[this.linkedGfxId];
				//the id shouldnt be there...
				//var go = Graph.prototype.appendChild([this.graphId,'item',0], 'row');
				
				var n = Graph.prototype.getPtrValue(ri, 'text');
				var txt = getGraphObject(n[0]).item[0].value;
					
				_rowItem.value = txt;
				//var p1 = rowItem.ptr[0] 
				//var val = graph.prototype.getPtrValue(ptrObject.ptr, "text");
				//
			//	ptrObject.renderedUI.linkedPtrGfx = ptrObject.renderedUI;
				////domNode = li;

			break;
			case 'dropdown':
				var n = Graph.prototype.getPtrValue(ri, 'text');
				gfxLookup[this.linkedGfxId].setType(_rowItem.ptr, 'dropdown');
					
				//add values from child nodes
				//Graph.prototype.addValueArray(ri, 'text')	


			break;
			case 'inputbox':
				//this.getLinkedNode(dialogPtr)['gfx']['point']. = true;
				var n = Graph.prototype.getPtrValue(ri, 'text');
				//console.log(n);
				gfxLookup[this.linkedGfxId].setInputBox(_rowItem.ptr);
				var txt = getGraphObject(n[0]).item[0].value;
				_rowItem.value = txt;
			//	gfxLookup[this.linkedGfxId].rebuild();

				//ri.value = n[0].item[0].value
				//rowItem.value = n.item[0]
				//this.getLinkedPtr(n.item[0].ptr
				//gfxLookup[this.linkedGfxId].mkInputBox(_rowItem.gfx.point);

				// need to fix this so it returns a pointer back to the graph prototype
				// so i can do dialog.getVal('row').getVal('text');
				gfxLookup[this.linkedGfxId].setInputBox(_rowItem.ptr);
				

				
				/*	
				var ib = document.createElement("input");
				li.appendChild(ib);
				ib.setAttribute("class", "UIInputCell");
				ptrObject.renderedUI.domNode = ib;
				ptrObject.renderedUI.type = "text";
				*/
			break;
			case 'button':
			//	gfxLookup[this.linkedGfxId].mkButton(ri);
				var n = Graph.prototype.getPtrValue(ri, 'text');
				try { 
					var txt = getGraphObject(n[0]).item[0].value;			
					_rowItem.value = txt;
				}catch(e){};

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
//		gfxLookup[this.linkedGfxId].hideChildren(_rowItem.ptr);

	}


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

	"evaluate":function() {
		this.timeStamp();
	},

	"timeStamp":function() {
		//this.direction = this.inheritDirection(); //"push";
		//;// point.nextPoint;// = "set"; // setting data dispatches data to be set by another function
		this.value = new Date().getTime();

		//this.onCondition();
	
		//onComplete
		this.next();

	}
}

function UniverseClass() {
}

UniverseClass.prototype =  {

	"cloneNodes":function(type) {
	       	var arr = [];	
		//console.log(type);
		
		var ga = typedGraphs[type];
		for (var i = 0; i < ga.length; i++) {
			var g = new Graph(type+'copy');
			graphObjLookup[ga[i]].cloneTo(g.id); // this shouldn't be part of the graph object
			var o = {};
			o[g.id] = graphLookup[g.id];

			arr.push(o);
		}

		//console.log(arr);
		return arr;

	},


	"evaluate":function(){
		var a = this.memberOf(['serializeUniverse']);
		//console.log(a);
		switch (a.val) {
			case "serializeUniverse":
			       //console.log("---------------------------ooooo---");

		       		//console.log(this.ptr);	       
				var val = getGraphObject(this.superGroup).value;
				//console.log(getGraphObject(this.superGroup));
				//console.log(val);
				this.value = this.cloneNodes(val);
				break;
				//this.value =  
			//}
		}
		// goals:
		// serialize all portions of the application 
		// load up the entire setting ...
		// require no object instantiation 
		this.next();
		
	},
	"serializePtrGraph":function(point) {
		this.direction = this.inheritDirection();
		this.value = graphLookup;
		//this.onCondition();
	//}
	}
}
function GenericObject() {

}

GenericObject.prototype = {
	"evaluate":function(){
		// need to return the object, 
		//this.value = graphObjLookup[this.ptrId].toJSON(0, this.superGroup);
		console.log(this.getPriorNode.value)
		console.log("EOF")
	}
}

function FilteredObject() {


}

FilteredObject.prototype = {
	"evaluate":function() {
		console.log("yo, i'm filtering the last part, ill street shit")

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
	"getDB":function() {
		// should memberOf
		// there are also issues with variable db's... need to use 'if (values)' else, use first child.. actually, most getters should be this way
		/*
		var x = copyArray(this.superGroup);
		var m = x.length;
		for (var i = m; i >5; i--) {
			x.pop();
		}
		console.log(x);
		*/
		var o = this.getFirstNamedItem("database")
		//var db = [this.ptr[0], this.ptr[1], this.ptr[2], this.ptr[3], this.ptr[4]];
		//var dbo = getGraphObject(db);
		// need to make a simplified selector interface (getFirstChild.findChildren.climbToValue.forEach)
		console.log(o.ptr);
		if (!o) { console.log("errror!!!!!!!"); return; };		
		var val = Graph.prototype.getPtrValue(o.ptr, "name")[0];
		val = getGraphObject(val.concat(['item', 0])).value;
	//	alert(val);
		//console.log(val);
		//console.log(getGraphObject(val).value);
	       	return val;///getGraphObject(val).value;
		//return getGraphObject(x).value;
	},

	"getCollection":function() {
		/*
		// should memberOf .. 
		// var x = copyArray(this.superGroup);
		var m = x.length;
		var values = [];
		for (var i = m; i >7; i--) {
			x.pop();
		}
		return getGraphObject(x).value;	
		*/
	
		//var c = [this.ptr[0], this.ptr[1], this.ptr[2], this.ptr[3], this.ptr[4], this.ptr[5], this.ptr[6]];
		//var dbo = getGraphObject(db);
		// need to make a simplified selector interface (getFirstChild.findChildren.climbToValue.forEach)
		var o= this.getFirstNamedItem("collection");
		if (!o) { console.log("errror!!!!!!!"); return; };
		var val  = Graph.prototype.getPtrValue(o.ptr, "name")[0];
		val = getGraphObject(val.concat(['item', 0])).value;
		
	       	return val;//getGraphObject(val).value;
	},
	"getObject":function() {
		var x = copyArray(this.superGroup);
		var m = x.length;
		var values = [];
		values.push(getGraphObject(x).value);
	
		while (x.length >9) {
			x.pop();
			x.pop();
			values.push(getGraphObject(x).value);
		}

		var rv = values.reverse();
		var x = {};
		var z = x;
		var p;
		for (var i =0 ; i < rv.length; i++) {
			x[rv[i]] = {};
			p = x;
			x = x[rv[i]];

		}
		return {"obj":z, "lastObj":p, "lastKey":rv[rv.length-1]};

	},
	"doInsert":function(vals) {

		var db = {"db":this.getDB(), "collection":this.getCollection()}
	//	console.log(db);
	//	return;
		//dbo[
		var oa = [];
		for (var i = 0; i < vals.length; i++) {
			var pv = pointLookup[vals[i]].getPriorNode().value
			var o = pointLookup[vals[i]].getObject();
			o.lastObj[o.lastKey] = pv;
			oa.push({"document":o.obj});
		}
		oa.push(db);
		var merged = mergeJson(oa);
		
		console.log(merged);
		postJSON({"storeData":merged}, this.onComplete);

	},
	"getData":function(vals){
		// should be able to recognize regex commands
		console.log(vals);
	},
	"onComplete":function(text) {
		console.log(text)
	},
	// this just allows a singular callback ...
	// should do the finalize stage on the back end ...  
	"getMapReduceDataCallback":function(data) { 
		// need to 'unmap' the values back to the module
		var pt = pointLookup[this.id];
		var dj = JSON.parse(data);
		//var pa = dj.value.packet;
		// need to finalize the object and merge the values...
		var packetHash = {};
		for (var i=0; i < dj.length; i++) {
			//alert("yo");
			console.log(dj[i].value);
			var pa;
			if (dj[i].value.value)
				pa = dj[i].value.value.packet;
			else pa = dj[i].value.packet; // if singular
		        console.log(pa);	
			for (var j=0; j < pa.length; j++) {
				var pt = Object.keys(pa[j])[0];
				var val = pa[j][pt];
				var plp = pointLookup[pt];
				if (!plp.value) plp.value = [];
				plp.value.push(val);
				console.log(plp);
				packetHash[pt] = pointLookup[pt];
			//	pointLookup[pt].next();
			}
		}
		for (var o in packetHash) {
			packetHash[o].next();
		}

		//pt.next();
	},
	"getFindDataCallback":function(data) {
		//console.log(data);
		
		for (var i=0; i <  this.vals.length; i++) {
			var p = pointLookup[this.vals[i]];
			p.value = JSON.parse(data);
			//console.log(this.data);
			console.log(p.value);
			console.log("******************************************************");
			p.next();
		}
	},

	"evaluate":function(vals) {
		//console.log(vals);
		//alert("test..");
		// get operation ... 
		// should have support for regex look behinds too
		// need a way to describe the actions available in determining the selection method

		/*
		 * should use find:[{"value":{"match":'value'}], ['packet']};
		 * which get wired from 
		 *
		if (this.getBaseValue() == 'find') {
			var value =  this.getGraphFunction().toObj()['find'];
			console.log(this.value);
			var db = this.getPriorNode().value;
			db["query"] = value
			var cb = this.getDataCallback.bind({"pointId":this.id});
			postJSON({"findData":db}, cb);
			
			//this.next();
			return;
		}
		// this requires a better find
		*/
		
		// going to apply the same pattern to find and get as well...	


		if (this.programName == 'find') {
			// iterate through 'values'
			// do find ...........
			// need to use this for dealing with and, or and other logical operators
			
		}

		if (this.programName == 'mapReduce') {
			// iterate throgh 'values'
			// use the db and collection from [0]
			//console.log("yooooooooooooooooooooo");	
			var firstVal = pointLookup[vals[0]].getPriorNode();
			var db = firstVal.value.db
			var collection = firstVal.value.collection; 
			var packet = [];
			for (var i =0; i < vals.length; i++) {

				var value = pointLookup[vals[i]].getPriorNode().value.objName;
				pl = pointLookup[vals[i]];
				var label = Graph.prototype.getLabels(pl.superGroup);
				switch (label.join()) {
				      	case 'mapReduce,map':
						var mapBy = value;
						break;
					// should be 'map,greatest'
					case 'mapReduce,map,greatest':
						var reduceBy = value;
						var reduceType = 'greatest'
				       		break;
					case 'mapReduce,packet':
						var x = {};
						x[vals[i]]=value;
						packet.push(x);
						break;
				}

				//if (poingtLookup[				
				// get next node's for query
			}
			console.log("db  "+db+"   "+collection);
			console.log(reduceBy);
			console.log(reduceType);
			console.log(packet);	

			
			postJSON({"mapReduce":{'db':db, 'collection':collection, 'mapBy':mapBy, 'packet':packet, 'reduceType':reduceType, 'reduceBy':reduceBy}}, this.getMapReduceDataCallback);
			

			// generate map function ?
			

		}
		// should use:: check if this label's position is the first instance of 'object'
		// this.getFirstNamedItem("object").ptr.length == this.ptr.length 
		if (this.superGroup.length == 7) {
			// if building an object from other variables...
			this.value = {"db":this.getDB(), "collection":this.label}
			return;
			/*
			//	alert("test..");
		//
			var firstChild = pointLookup[pointLookup[this.children[0]].id];
			// iterate through entire collection...
			if ((pointLookup[this.children[0]].ptrId == this.ptrId) && pointLookup[this.children[0]].superGroup.length > 7) {
		var val = getGraphObject(name[0].concat(['item', 0])).value;
				// do a forEach
				//postJSON("getData":{"collection":this.getCollection(), "db":this.getDB(), "find":''});
			}
			console.log(firstChild.programName);
			//var firstChild.programName
			if (firstChild.programName == 'find' || ) {
				// set next parameter to be a find program
//				firstChild.setProgramType
				//this.next();

				return;	
			}
			console.log(this.label);
		//	alert("test...")
			// same as db[this.label].find() 
			return;	
			*/
		}
		// these tests should be configurable through external linkage
		// should check if this chain contains 'object'
		//var go = this.getFirstNamedItem("object"); //isWithin('object')
		//if (go)
		if (this.isWithin("object")) {
		//if (this.getFirstNamedItem("object")) {
			// construct all the odd ways to define a save or insert or get...

			var iln = false;
			var saves = false;
			var looksUp = false;
			var findObj = {};
		//	var ors = [];
			for (var i=0; i < vals.length; i++) {
				var vp = pointLookup[vals[i]];
				if (pointLookup[vals[i]].isLastNode()) {
					//alert(pointLookup[vals[i]].isLastNode());
					//alert('test');
					iln = true;
					break;
				}else {
					
					var k = vp.children;
				//	console.log("<> <> <> ");
					var calledData = {};
				
					for (var j =0; j < k.length; j++) {
					//	console.log(pointLookup[k[j]].programName);
						var kid = pointLookup[k[j]];
						if (kid.programName == 'mapReduce') {
							var data = vp;//pointLookup[vals[i]];
							if (calledData[vals[i]])
								continue

							calledData[vals[i]] = true;
							looksUp = true;
						//	console.log(" this is intended for MapReduce: "+data.label);
							// map reduce should query the actual field? unless a polymorphic example appears..
							// perhaps the mapReduce could also get a generic 'DB:.. Collection:.. 
							// regardless, just set these variables here
							// maybe the object name could be variable..
						//	console.log(vals[i]);
						//	console.log("@@@@@@@@@@@@@@@@@@@@");
						//	console.log(vals.length+" <<<");
							data.value = {"db":this.getDB(), "collection":this.getCollection(), "objName":data.label}
							data.next();
							//return;
						}else
						if (kid.programName == 'find') {
							looksUp = true;
						//	console.log(".. this is intended to find");
							
							data.value = {"db":this.getDB(), "collection":this.getCollection(), "objName":data.label}
							data.next();							
							//return;
						}//else
						//if (kid.isWithin("object") && kid.ptrId == vp.ptrId)
								

					}
					if (pointLookup[vals[i]].getPriorNode().programName == 'store') {
						saves = true;
						break;
					}
					// if updating by id, then use doSave
				}
			}
			if ((iln || saves) && !looksUp) {
				// this should actually take the remainder of the links.. not disqualify all of them...
				//	alert(this.label);
				this.doInsert(vals);
			}
			else {
				//looksup is a poor choice for a variable name, because it's not that it doesnt look up, it just means that it infers the lookup
				if (!looksUp) {
					var doFind = false;
					for (var i=0; i < vals.length; i++) {
						var vp = pointLookup[vals[i]];
						// if prior node already has the document ... select this variable name from the document already gotten.. 
						if (vp.getPriorNode().ptrId == vp.ptrId) {
							var vpv = vp.getPriorNode().value;
							console.log(vpv);
							for (var j =0; j < vpv.length; j++) { 
								vp.value = (vpv[j][vp.label])
								vp.next();
							}
								
								console.log("-----------------------------------------");
						}else {

							if (vals.length == 1) {
								doFind = true;
								var o = {};
								var vp = pointLookup[vals[0]];
								o[vp.label] = vp.getPriorNode().value;
								findObj = o;
								console.log(vp.label);
								console.log("============================");
							}
							else {
								doFind = true;
								findObj['$and'] = [];
								//ands.push
								//	for (var i=0; i < vals.length; i++) {
								var vp = pointLookup[vals[i]];
								console.log("finding data based on prior object")
									// if more than one object, use 'and' keyword
									var o = {};
								o[vp.label] = vp.getPriorNode().value;

								findObj['$and'].push(o);

							}
						}
					}
				//}
				// if last node
				if(doFind) {				
					var gf = this.getFindDataCallback.bind({"vals":vals});
					postJSON({"find":{'db':this.getDB(), 'collection':this.getCollection(), 'query':findObj}}, gf);//this.getFindDataCallback);
				}
				//look back to see what this is supposed to do
				// if last caller was a generic object, do the find..
				// if the last caller was db objet, do a foreach over the last object, making sure each call is 
				// consistent
				// if the last object was a non db program, do a find

				//this.getData(vals);
				}
			}
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

function GraphRenderer() {}

GraphRenderer.prototype =  {
	"evaluate":function() {
		var graph = this.getPriorNode().value;
		console.log(graph);

	}

}


Point.prototype.traverseProgram = function(ptr) {
	//console.log(ptr);
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

	//console.log(o);
//	return;
	for (var i = 0 ; i < o.index.length; i++) {
	//	alert(o.ptr.join());
		//console.log("system "+ i);
		var oc = copyArray(o.ptr);
		oc = oc.concat(['index', i]);
		//console.log(oc);	
		var lo = (getGraphObject(oc))
		//console.log(o);
		//console.log(oc);
		if (lo.children.length || lo.parents.length) {

			var sys = new System(oc, pathList);
			sys.begin();
		}
		//pt.evaluatePhrase();
	}
	if (delRoot) delete o.types.root;
}


	//	var val = getGraphObject(name[0].concat(['item', 0])).value;
