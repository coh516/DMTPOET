
// meant to be a wrapper around the graph functions with iterator
//
// there needs to a way of caching the ptr subnodes
//
var pointLookup = {}
// should be arrays
// there's no real reason why classnames should be relinked
var programs  = {"UI":UIClass, "MONGO":DBClass, "serializeUniverse":UniverseClass, "timeStamp":DateClass, "drawPtrGraph":GraphRenderer, "mapReduce":FilteredObject, 'mapReduce':DBClass};


// evaluate should have event listeners for 'onPromiseFullfilled' and 'onTraversed' functions 
// right now it just waits for the fulfilment stage and calls the method ...... 
//
// the other solution is to make an evaluator class...
// the benefit of an evaluator class is it pushes the deferment to its own scope

// *** todo ***
// generic objects getClassPrototype.  for example, mapReduce  following a DBClass should be tied to the DB, but if its after an Array class, it should be part of the Array object.
// this would be for things like, after a FIND, and there's a map reduction from the collection, from the returned Array.
// im sure there are other instances where this would be necessary. This would allow a level of polymorphism that might be really cool. 
// 


function Point(options){ 


	this.ptr = options.ptr;
	this.ptrId = this.ptr[0];
	this.childNumber = options.childNumber;
	this.id =  mkguid();
	console.log(options);
	this.systemId = options.systemId;
	this.parentId = options.parentId;

	pointLookup[this.id] = this;
	


	
	// assume no parent = origin
	if (!this.parentId) {
		this.origin = this.id;
	}

	var pl = pointLookup[this.parentId];
	if (pl)
	pl.children[this.childNumber] = this.id;
	
	var p2 = copyArray(this.ptr);
	p2.pop();p2.pop();
	this.superGroup = p2;;

	this.label = getGraphObject(this.superGroup).value;



	this.variables = [];
	
	this.children = [];


	var pp = copyArray(this.ptr);
	var a1 = getObject([pp[0], pp[1], pp[2]], graphLookup);
	this.programName = a1.value;
	if (!programs[this.programName])
		this.programType = 'Object';
	else
		this.programType = this.programName;
	
	tpg = programs[this.programType];
	//instead of using 'mixin' should just extend the prototype object
	//then call the getPrototypeOf to access the next area up on the 
	//proto chain....  
	mixin(tpg.prototype, this)	

	var pp = copyArray(this.superGroup);

	this.programVar = this.ptrId;

}


Point.prototype.pointLookup = {};

Point.prototype = {
	get superNode() { return getObject(this.superGroup, graphLookup) },

	"setBeginPhrase": function() {

		this.phraseBegin = true;
		this.phraseVars = {};
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
		var go = this.getFirstNamedItem(val);
		if (go)
			return (go.ptr.length < this.ptr.length)
		return false;
	},
	"obj2JSON":function() {
		return graph.prototype.toJSON(this.ptr[0]);

	},
	
	"_next":function() {
		var o = pointLookup[this.id]
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
		
		    	var pi = this.programVarIndex;
			if (!pi) pi = 0;
			console.log(graphLookup[this.programVar])	
			var popped = rootPoint.phraseVars[this.programVar][pi].pop();
			rootPoint.poppedPhraseVars[this.programVar][pi].push(popped);

			if (rootPoint.phraseVars[this.programVar][pi].length == 0) {
			
				rootPoint.phraseVars[this.programVar][pi] = copyArray( rootPoint.poppedPhraseVars[this.programVar][pi])
				
				var pv = rootPoint['phraseVars'][this.programVar][pi];
				this.evaluate(rootPoint.phraseVars[this.programVar][pi]);
				rootPoint.poppedPhraseVars[this.programVar][pi] = [];
					
			}

		}

		else {
			this.evaluate();	
		}
	},
	"memberOf":function(a) {
		return Graph.prototype.climbToValue(this.superGroup, a);
	},
	"getSystemObject":function(ptr) {
		
		var spc = systemLookup[this.systemId].systemPtrCache;
		console.log(spc);
		if (!spc[ptr]) {

			spc[ptr] = {};
		}
		return spc[ptr];
		//return p;
			

	},

	//cached ptr getters/setters
	"getPtr":function(ptr, vari) {
	},
	"setPtr":function(ptr, vari) {

	},

	"programIndex":function() {
		return;
	
	}



}
// perhaps a 'lookup' bass class should be defined
systemLookup = {};
function System(ptr, pathList) { 
	this.pathList = pathList;
	this.rootPtr = ptr;

	this.traversedNodes = {};
	this.endPhrases = [];
	this.beginPhrases = [];
	this.id = mkguid();

	systemLookup[this.id] = this;
	this.visitedNodes = {};

}

System.prototype = {


	"setsData":function() { (this.nextPoint.node.type['root'] || !this.nextPoint.children) },
	"begin":function() {

		var pathList = this.pathList;
		var parents = {};
		var visitedNodes = this.visitedNodes;
		var systemId = this.id;
		var recurse = function(pID, rpID, progz) {


			var rootPoint = pointLookup[rpID];

			var po = pointLookup[pID];
			po.rootPointID = rpID;
			var ponode = po.superNode;
				
		

			if (ponode.types)
			if (ponode.types['root']) {
				po.setBeginPhrase();
				rpID = po.id;
			
				var isRoot = true;
			}
			if (po.programVar) {
				if (!rootPoint.phraseVars[po.programVar]) {
					rootPoint.phraseVars[po.programVar] = [];
					
				
					if (!rootPoint.poppedPhraseVars)
						rootPoint.poppedPhraseVars = {}; 
					rootPoint.poppedPhraseVars[po.programVar] = [];
				}
				if (!progz.hasOwnProperty(po.programVar)) 
					progz[po.programVar] = 0;
				else progz[po.programVar]++;

				var pi = progz[po.programVar];;

				var pia = rootPoint.poppedPhraseVars[po.programVar];
				var ppp = rootPoint.phraseVars[po.programVar];
			
				po.programVarIndex = pi;
				if (!pia[pi]) {
					pia[pi] = [];
					ppp[pi] = [];
				}
				ppp[pi].push(pID);
			
			}
		
		

			if (isRoot || po.children.length == 0 && rpID != pID) {
				
					if (po.parentId) {
						pointLookup[po.parentId].phraseEnd = true;
				}
			} 
			

			for (var i =0 ; i < pathList[po.ptr].length; i++) {
				var np = new Point({"ptr":pathList[po.ptr][i], "parentId":pID, "childNumber":i, "systemId":systemId});
			
				var zp = {};
				for (var g in progz) zp[g] = progz[g];
				recurse(np.id, rpID, zp);

			}
		

		}

		this.rootPoint = new Point({"ptr":this.rootPtr, "childNumber":0, "pathList":pathList, "systemId":systemId});
	
		recurse(this.rootPoint.id, this.rootPoint.id, {});
	
		this.rootPoint.evaluate();

	},

}

function UIClass() {
};

//  UIClass.prototype = Object.create(baseProgram.prototype);
// use the UI class fro UIRenderer ..
UIClass.prototype = {
	"systemInit":function() {
		// used to clean up the shit....

	},

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

	"evaluate":function(vals) {

		if (!this.phraseBegin) {
		      
			var pi = pointLookup[this.parentId]
			var pa = getObject(this.superGroup, graphLookup); 
			var rootPoint = pointLookup[this.rootNodeId];
		
			var li = this.superGroup;
			var memberOf = Graph.prototype.climbToValue(li,['button', 'inputbox', 'label', 'dropdown']);
		      
			for (var i=0; i < vals.length; i++) {
				var vp = pointLookup[vals[i]];
				var pn = vp.getPriorNode();
				emitData = !vp.isLastNode();
				switch (memberOf.val) {

					case "button":
					
						var glp = this.getLinkedPtr(memberOf.ptr);
					
				
						ptrEvents[glp.concat(['gfx', 'point']).join()]= {'handleMouseClick': this._next.bind({"id":this.id})};
						break;
					case "inputbox":	
					
					
						var oglp =  this.getLinkedPtr(memberOf.ptr);
						var glp = oglp.concat(['gfx', 'point']);
						var z = getGraphObject(glp);
					
					
						vp.value =  gfxLookup[z.gfxId].getValue(oglp);
						vp.next();
						break;
					case "dropdown":
						if (!emitData) {
						

							var glp = this.getLinkedPtr(memberOf.ptr);
						
							var obj = getGraphObject(glp);
						
							
							
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
									obj.values[j]['text'] = values[j];
								}
								
	
							}
							var z = glp.concat(['gfx', 'point']);
							var gfxObj = getGraphObject(z);
							gfxLookup[gfxObj.gfxId].rebuild();
						
						} else {
							var glp = this.getLinkedPtr(memberOf.ptr);
							glp = glp.concat(['gfx', 'point']);
							var z = getGraphObject(glp);
						
							var ogp = this.getLinkedPtr(memberOf.ptr);
							va =  gfxLookup[z.gfxId].getDropdownIndex(ogp);
					
							vp.value = getGraphObject(vp.superGroup).values[va];

					
							vp.next();
						}	

						break;
				}
			}
		
	}else { 
			var sg = this.getSystemObject(this.superGroup);
			var sgo
			if (sgo = this.getSystemObject(this.superGroup))
			if (sgo.pointVars)
			if (sgo.pointVars.built) {
				this.next();
				return;
			}
	
			var graph = new Graph();
		
			var g = new Gfx({"type":"point", "ptr":[graph.id], "renderer":htmlRenderer, "baseElement":frame2.contentDocument.body});
	
			g.hasIndex = false;	
		
			this.linkedGfxId = g.id
			this.linkedGraphId = graph.id;
		
			events['point'] = staticEvents.prototype;
			
			this.createDom();
			g.build();
			// should use a 'setSystemVar' function
			
			if (!sgo.pointVars)
				sg.pointVars = {};
			sgo.pointVars.built = true;

		
		this.next();

			// the parent objects should have a pointIndex layer that connects to the point item child items.

		}
	},
	// this is stupid, there should be a bi-directional linked nodes...
	// requires more thought.. this is too hacked.
	"getLinkedPtr":function(ptr) { 
	
		console.log(getGraphObject(this.ptr));
		
		return this.getSystemObject(ptr).point.linkedPtr;
	},
	"getLinkedNode":function(ptr) {
		return getGraphObject(this.getLinkedPtr(ptr));
	},
	"initGfx":function(obj) {
		var o = getGraphObject(obj);
		if (!o['gfx']) o.gfx = {};
		o.gfx.point = {};
	},
	"createDom":function() {

		var ar = Graph.prototype.getPtrValue(this.superGroup, 'dialog');
		

		for (var i=0; i < ar.length; i++) 
			this.evaluateDialog(ar[i]);

	},

	/* more code to throw out */

	"evaluateDialog":function(dialogPtr) {
		
		var view = Graph.prototype.getPtrValue(dialogPtr, "view");
		var grid = Graph.prototype.getPtrValue(view[0], "grid");
	
		var _dialog = Graph.prototype.appendChild([this.linkedGraphId], 'dialog');
		this.initGfx(_dialog.ptr);
		_dialog.gfx.point.hideItem = true;
		var so = this.getSystemObject(dialogPtr);
		if (!so.point) so.point = {};
		so.point.linkedPtr = _dialog.ptr;
		

		if (grid) {
			var rows = Graph.prototype.getPtrValue(dialogPtr, 'row');
			
			gfxLookup[this.linkedGfxId].setGridLayout(_dialog.ptr);
	
			this.evaluateRows(rows, _dialog);
		}
	},
	"evaluateRows":function(rows, _dialog) {
		// should draw a new row ... the copy, paste, hide needs to be updated..
		for (var i =0 ; i < rows.length; i++) {
			var _row = Graph.prototype.appendChild(_dialog.ptr, 'row');
		
			this.initGfx(_row.ptr);  
		
			_row['gfx']['point'].hideItem = true;	
			var ro = getObject(rows[i], graphLookup);
			var so = this.getSystemObject(rows[i]);
			if (!so.point) so.point = {};
			// should have a setSystemVariable function
			so.point.linkedPtr = _row.ptr; 
		
			for (var j=0; j < ro['item'].length; j++) {
				var rowItem = ro['item'][j];
				console.log(rowItem);
				this.drawElement(rowItem, _row)
			}
		}
	
	},

	"drawElement":function(rowItem, _row) {

		gfxLookup[this.linkedGfxId];

		var ri = rowItem.ptr;
		var _rowItem = Graph.prototype.appendChild(_row.ptr, 'rowItem');
		this.initGfx(_rowItem.ptr);
		var rig = this.getSystemObject(ri);
		if (!rig.point) rig.point = {};
		rig.point.linkedPtr = _rowItem.ptr;
		
		switch(rowItem.value) {
			case 'label':
			
				var n = Graph.prototype.getPtrValue(ri, 'text');
				
				var txt = getGraphObject(n[0]).item[0].value;
					
				_rowItem.value = txt;
			

			break;
			case 'dropdown':
				var n = Graph.prototype.getPtrValue(ri, 'text');
				gfxLookup[this.linkedGfxId].setType(_rowItem.ptr, 'dropdown');
					
			


			break;
			case 'inputbox':
				var n = Graph.prototype.getPtrValue(ri, 'text');
				gfxLookup[this.linkedGfxId].setInputBox(_rowItem.ptr);
				var txt = getGraphObject(n[0]).item[0].value;
				_rowItem.value = txt;

				gfxLookup[this.linkedGfxId].setInputBox(_rowItem.ptr);
				

			break;
			case 'button':
				var n = Graph.prototype.getPtrValue(ri, 'text');
				try { 
					var txt = getGraphObject(n[0]).item[0].value;			
					_rowItem.value = txt;
				}catch(e){};


			break;
		}

	}

}


function DateClass() {
}

DateClass.prototype = {

	"evaluate":function() {
		this.timeStamp();
	},

	"timeStamp":function() {
	
		this.value = new Date().getTime();

	
		this.next();

	}
}

function UniverseClass() {
}

UniverseClass.prototype =  {

	"cloneNodes":function(type) {
	       	var arr = [];	
		
		var ga = typedGraphs[type];
		for (var i = 0; i < ga.length; i++) {
			var out = {};
			var gai = ga[i];
		
			out[gai] = Graph.prototype.cloneTo(gai); // this shouldn't be part of the graph object
			console.log(out);	
			arr.push(out);
		}

		return arr;

	},


	"evaluate":function(){
		var a = this.memberOf(['serializeUniverse']);
		switch (a.val) {
			case "serializeUniverse":
	       
				var val = getGraphObject(this.superGroup).value;

				this.value = this.cloneNodes(val);
				console.log(this.value);
				break;
		}
	
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

	"getDB":function() {

		var o = this.getFirstNamedItem("database")

		console.log(o.ptr);
		if (!o) { console.log("errror!!!!!!!"); return; };		
		var val = Graph.prototype.getPtrValue(o.ptr, "name")[0];
		val = getGraphObject(val.concat(['item', 0])).value;

	       	return val;
	},

	"getCollection":function() {

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
		
		var o = this.getFirstNamedItem("object")	
		
		while (x.length > o.ptr.length+2) {
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
	// should be handled and simplified from the backend
	"getMapReduceDataCallback":function(data) { 
		var pt = pointLookup[this.id];
		var dj = JSON.parse(data);
		// need to finalize the object and merge the values...
		var packetHash = {};
		console.log(dj);
		for (var i=0; i < dj.length; i++) {
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
			}
		}
		for (var o in packetHash) {
			packetHash[o].next();
		}

	},
	"getFindDataCallback":function(data) {
		
		for (var i=0; i <  this.vals.length; i++) {
			var p = pointLookup[this.vals[i]];
			p.value = JSON.parse(data);

			p.next();
		}
	},

	"evaluate":function(vals) {



		if (this.programName == 'find') {
			// iterate through 'values'
			// do find ...........
			// need to use this for dealing with and, or and other logical operators
			
		}

		if (this.programName == 'mapReduce') {
	
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

			}
	

			
			postJSON({"mapReduce":{'db':db, 'collection':collection, 'mapBy':mapBy, 'packet':packet, 'reduceType':reduceType, 'reduceBy':reduceBy}}, this.getMapReduceDataCallback);
			

			// generate map function ?
			

		}

		if (this.superGroup.length == 7) {
			// if building an object from other variables...
			this.value = {"db":this.getDB(), "collection":this.label}
			return;

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

							data.value = {"db":this.getDB(), "collection":this.getCollection(), "objName":data.label}
							data.next();
							//return;
						}else
						if (kid.programName == 'find') {
							looksUp = true;
							
							data.value = {"db":this.getDB(), "collection":this.getCollection(), "objName":data.label}
							data.next();							
						}
								

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
	// draw and connect....
	"evaluate":function() {
		var graph = this.getPriorNode().value;
		var ids = [];
		console.log(graph);
		//return;
		for (var i=0; i < graph.length; i++) {
			//console.log(JSON.parse(o));
			var o = graph[i];
			var id = Object.keys(o)[0];
	
			var g = new Graph("ptr", id);
		       	graphObjLookup[id] = g;
			graphLookup[id] = o[id];
			var gf = mkPtrGfx({"id":id});

			gf.build();
			
			
			ids.push(id);
		}
		for (var i=0; i < ids.length; i++) {
			console.log(graphObjLookup[ids[i]]);
			graphObjLookup[ids[i]].recurseItems(linkCurve.prototype._drawCurve);
		}			

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
	//return;
	//need to clean out the pathList from System variables
	//console.log(pathList);
	//console.log("=----------==----------------------------------------=")
	//return;


	// rather than actually store the system variables directly in the object,
	// could use a seperate object to store variables in .... and create a systemObject
	
	//var systemObject = {};
	var systemPtrCache = {};
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
		//	sys.systemObject = systemObject;
			sys.systemPtrCache = systemPtrCache;
			sys.begin();
		}
		//pt.evaluatePhrase();
	}
	if (delRoot) delete o.types.root;
}


	//	var val = getGraphObject(name[0].concat(['item', 0])).value;
