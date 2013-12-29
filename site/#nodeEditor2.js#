/*
 * TODO: 
 *
 */


var speedup = false;

if ( speedup )  {
	console = {};
	console.log = function(e) {};
}


var rootObjects = [];
var idLookUp = {};
var stage
var debugbla = false;
var allForeign = {};

var directedGraph = {};

function guid() {
	var S4 = function () {
	   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}

   	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


s2o = function(e) {
    var x = JSON.parse(e);
    return {
        id : x[0],
        ptr : x[1],
        index : x[2]
    }
}



// need to do a better job of setting the prototypes for constants
// probably should use a better prototypical inheritance model that takes
// advantage of getPrototypeOf and Object.create..
// instead of inherit/reinherit .. (which doesnt maintain the prototype chain)
// to instantiate an object, do Object.create(new layer(bl), dragLayer)

// function linePoints


function ptrSplit(ptrs) {
	var rcarray = []; 
	ptrs = ptrs.substr(2,ptrs.length);
	ptrs = ptrs.substr(0,ptrs.length-2);
	rcarray = ptrs.split('"]["');
	return rcarray;
}

function ptrJoin(ptarr) {
	return '["' + ptarr.join('"]["') + '"]';
	
}

function layer(bl) {
	this.layer = new Kinetic.Layer();
	// alert ("test..");
	stage.add(this.layer);
	var self = this;
	// alert ("test...3");
	for ( var opt in bl) {
		switch (opt) {
		case "stage":
			bl[opt].add(this.layer);
			this.stage = bl[opt];
			break;
		case "x":
			this.layer.setX(bl[opt]);
			break;
		case "y":
			this.layer.setY(bl[opt]);
			break;
		}
	}

	this.remove = function() {
		//
		// self.layer.clear();
		//

		self.layer.suicide();
	}
}

inherit(layer, dragLayer);
function dragLayer(bl) {
	reinherit(dragLayer, this);
	this.superConstructor(bl)
	this.layer.draggable(true)
}

var initStage;
initializeStage = function() {

	this.stage = new Kinetic.Stage({
		container : "container",
		width : 1800,
		height : 1000
	});
	stage = this.stage;
	var self = this;
	initStage = self; // make global
	//if (!linesLayer.layer) {
		linesLayer.layer = new Kinetic.Layer();
		stage.add(linesLayer.layer);
	//}
	// stage.add(l.layer);
	// var l2 = new caseLayer({stage:self.stage, x:300, y:50});
	// var l3 = new dbLayer(self);
	// l.layer.setY(100);
	// l.layer.setX(100);

	// l2.layer.setY(100);
	// l2.layer.setX(300);

	// l3.layer.setY(100);
	// l3.layer.setX(400);
	// var l = new dbLayer({stage:self.stage, x:10, y:50});

	var buttonLayer = new Kinetic.Layer({
		draggable : false
	});
	stage.add(buttonLayer);

	var btn2 = new button({
		text : "aggregateCaseObject",
		hier : buttonLayer
	});

	var btn3 = new button({
		text : "toJSON",
		hier : buttonLayer,
		x: 0,
		y: 30
	});

	var btn4 = new button({
		text : "fromJSON",
		hier : buttonLayer,
		x: 90,
		y: 30
	});

	var aliases = new button({
		text : "Click to Load",
		hier : buttonLayer,
		x: 0,
		y: 130
	});
	
	var btn5 = new inputBox2({
			x: 0, 
			y: 60,
			text: "blahblah",
			layer: buttonLayer
			//hier: buttonLayer,
			//obj:{
			//	"right_click_me" : {}
			//}
		});

	var btn6 = new button({
			x: 0, 
			y: 90,
			text: "execute (store first)",
			hier : buttonLayer,
			layer: buttonLayer
		});
	
	var btn7 = new button({
		x: 200, 
		y: 90,
		text: "evaluateRoot",
		hier : buttonLayer,
	//	layer: buttonLayer
	});
	
	//aggregateCaseObjects for now.......
	// be more dynamic in the futchizzle
	getRootPaths = function() {
		var paths = [];
		this.getRootPath = function(tb, lb, str) {
			var gtb = directedGraph[tb];
			for (var i in gtb) {
				var tbi = gtb[i];
				if ( lb != tbi ) {
					var ns = str+tbi;
					objType = idLookUp[s2o(tbi).id].obj.__.nodeType//tbi.parent.root.obj.__.nodeType;

					if (objType == "aggregateCaseObject") {
						paths.push(ns);
					}
					else {
						this.getRootPath(tbi, tb, ns)
					}
				}
			}
		}
		
		for (var i in rootObjects) {
			for (var g in rootObjects[i].links)
				this.getRootPath(rootObjects[i].links[g].box2str(), false, rootObjects[i].links[g].box2str())
		}
			
		return paths;
	} 
	
	btn7.group.on("click", function () {
		// 
		console.log(getRootPaths());
			//this.getRootPath(rootObjects[i]., false, "");
		//	return cycles;		
		
	});
	//var dbItem = new rootGraphItem(o);
		
		//dbItem.id = guid();			
	//btn5.sRender();\
	//btn5.dboObject = {}
	//btn5.dboObject.layer = buttonLayer;
	btn5.group.setY(60);
	buttonLayer.add(btn5.group)

	btn5.resizeTextOutline();



	// var cl = new dbLayer({stage:self.stage, x:10, y:50})

	btn6.group.on("click", function () {
		postUp(JSON.stringify({
			type: "execute"
		}), function(e) {
			console.log("btn6:");
			console.log(JSON.parse(e));
		});
	});

	btn2.group.on("click", function() {
		postUp(JSON.stringify({
			"aggregate" : "data"
		}), self.handleReturn)
	})
	this.handleReturn = function(a) {
		// var l = new dbLayer({stage:self.stage, x:10, y:50});
		var cl = new dbLayer({
			stage : stage,
			x : 10,
			y : 50,
			obj : JSON.parse(a)
		})
	}


	function iterSmallBoxes(ro) {
		var visited = [];
		if  ( ro.hasOwnProperty("links") ) {
			for ( var j = 0;  j < ro.links.length ; j++) {
				if (ro.links[j].linkedBoxes) {
					for ( var k = 0 ; k < ro.links[j].linkedBoxes.length; k++ ) {
						//for ( var l = 0 ; l < ro.links[j].linkedBoxes[k].length; l++ ) {
						visited = iterLinks ( ro.links[j].linkedBoxes[k], []);
					}
				}
			}
		}
		return visited;

		}
	function postVisited(visited, alias, allFor) {
		// nothing to do here
		if (visited.length === 0) {
			window.alert("Nothing to serialize - was a root node picked?");
			return;
		}

		console.log("visited:");
		console.log(visited);

		var submission = {
			"data" : visited,
			"foreign": allFor,
			"type" : "serializing"
		}

		if (alias != undefined ) {
			submission.alias = alias;
		}


		postUp(JSON.stringify(submission), function(){})


		this.handleReturn = function(a) {
			// var l = new dbLayer({stage:self.stage, x:10, y:50});
			var cl = new dbLayer({
				stage : stage,
				obj : JSON.parse(a)
			})
			//console.log("Returning..");
		}



	}


	function iterLinks(o, visited) {
		var serial = {};
		serial.obj = o.label.root.obj;

		serial['__'] = {
                        'id' : o.label.root.id,
                        'xabs' : o.getAbs()['x'],
                        'yabs' : o.getAbs()['y'],
                }

		if ( o.label.hasOwnProperty('isRootNode') ) {
			serial['__']['isRootNode'] = o.label.isRootNode();

		}

		if ( o.label.hasOwnProperty('isProgramNode') ) {
			serial['__']['isProgramNode'] = o.label.isProgramNode();
		}

		//console.log("We store:");
		//console.log(serial);

		for ( var i = 0; i < visited.length ; i++) {
			//if ( JSON.stringify(visited[i]) === JSON.stringify(j))
			if ( visited[i]['__']['id'] === serial['__']['id'])
				return visited;
		}
		visited.push(serial);

		var jstring = JSON.stringify(j)
		for ( var i = 0; i < o.label.links.length ; i++) {
			//iterLinks(o.label.links[i], visited );
			if (!o.label.links[i].linkedBoxes)
				break;

			for ( var j = 0 ; j < o.label.links[i].linkedBoxes.length; j++ ) {
				//console.log(o.label.links[i].linkedBoxes[j]);
				visited = iterLinks ( o.label.links[i].linkedBoxes[j], visited);
			}
		}
		
		// iterate through child labels
		
		o.label.root.traverseWith(function(e) {
				var ptr = e.listLabel.getObjectPointer();
				eval ("serial.obj"+ ptr +"['__'] = {}");
				//eval ("serial.obj"+ ptr +"['__']['links'] = o.label.links.length");
				//console.log("serial.obj"+ ptr +"['links'] = o.label.links.length");
				//console.log(e.listLabel);
				var foreign_ids = [];
				for ( var j = 0 ; j < e.listLabel.container.links.length ; j++ ) {
					//console.log(e.listLabel.container.links[j]);
					if (! e.listLabel.container.links[j].hasOwnProperty("linkedBoxes")) {
						continue;
					}
					for ( var k = 0 ;
				       	      k < e.listLabel.container.links[j].linkedBoxes.length ;
					      k ++) {
						var from = {};
						from.id = e.listLabel.container.root.id;
						from.ptr = ptr;
						from.index = e.listLabel.container.links[j].index;
						//var fromstring = JSON.stringify(from.id +";"+ from.ptr+";" + from.index);
						var fromstring = JSON.stringify([from.id, from.ptr, from.index]);
						
						var to = {};

						to.id = e.listLabel.container.links[j].linkedBoxes[k].parent.root.id;

						to.ptr = e.listLabel.container.links[j].linkedBoxes[k].label.listLabel.getObjectPointer();
						to.index = e.listLabel.container.links[j].linkedBoxes[k].index;
						//var tostring = JSON.stringify(to.id + ";"+ to.ptr +";" + to.index);
						var tostring = JSON.stringify([to.id, to.ptr, to.index]);



						if (allForeign[fromstring] === undefined)
							allForeign[fromstring] = [];

						var ok = true;
						for (f in allForeign[fromstring] ) {
							//if(JSON.stringify(allForeign[fromstring][f]) == JSON.stringify(to)) {
							if(allForeign[fromstring][f] == tostring) {
								ok = false;
							}
						}
						if (ok) {
							var dupe = false;
							if(allForeign.hasOwnProperty(tostring)) {
								for ( var x=0; x < allForeign[tostring].length; x++) {
									//if ( JSON.stringify([allForeign[tostring][x].id, allForeign[tostring][x].ptr, allForeign[tostring][x].index]) === fromstring ) {
									if ( allForeign[tostring][x] === fromstring ) {
										dupe = true;
									}
								}
							}
							if(!dupe)
								//allForeign[fromstring].push(to);
								allForeign[fromstring].push(tostring);
						}
					}
				}
		})
		return visited;
		
	}


	fillAllForeign = function( e ) {
		allForeign = {};
		var submit = [];
		for(var i = 0; i < rootObjects.length; i++ ) {
			rootObjects[i].root.traverseWith(
			function(e){
				var xx = iterSmallBoxes(e);
				if (xx.length > 0) {
					submit = submit.concat(xx);
				}
			});
		}
		return submit;
	}

	btn3.group.on("click", function() {
		// for each rootObject
		var submit = fillAllForeign();
		var getName = btn5.text.getText();
		var alias = undefined;
		if (getName !== "blahblah" ) {
			console.log("Name: " + getName);
			alias = getName;
		}

		postVisited(submit, alias, allForeign);
		
	})

	btn4.group.on("click", function() {
		var postme = { "type" : "getSerialized"};

		var getName = btn5.text.getText();
		if ( getName !== "blahblah" ) {
			postme['alias'] = getName;
		}
		postUp(JSON.stringify( postme ), self.gsReturn)
		
	})

	aliases.group.on("click", function() {
		var postme = { "type" : "getAliases"};
		postUp(JSON.stringify( postme ), self.aliasReturn);

	});

	self.aliasReturn = function ( ee ) {
		var printStr = "";
		var als = JSON.parse(ee);
		var unique = {};
		// Dear future Seth - if you want to make a list of revisions to pick from
		// this is the spot to insert the code
		for ( var x in als ) {
			var add = als[x].alias;
			unique[add] = {
				'__': {
					"id" : als[x]["_id"],
				}
			};
		}

		console.log(unique);

		var cl = new rootContextItem({
			//stage : stage,
			x : 0,
			y : 130 + aliases.height,
			obj : unique,
			callback : this.handleAliasLoad,
			//caller : this.rightClickGraphItem
			})
		cl.mRender();

		//aliases.rename(printStr);
	}

	self.handleAliasLoad = function ( e ) {
		var id = e.container.root.obj[e.container.text]["__"].id;
		//console.log("I have been clicked!: " + e.container.text + " id: " + id);
		var postme = {
			type : "getSerialized",
			_id : id
			};
		postUp(JSON.stringify( postme ), self.gsReturn)
		e.container.root.remove();
	}


	self.updateMax = function (max, id, ptr, index ) {
		if (! max.hasOwnProperty(id + ";" + ptr)) {
			max[id + ";" + ptr] = 0;
		}
		max[id + ";" + ptr] = max[id + ";" + ptr] < index ? index : max[id + ";" + ptr];
		return max;
	}

	
	self.setObjMax = function(from, to) {
	//	console.log("Entering setobjmax");
		console.log("idLookUp[from.id].obj" + from.ptr + "['__']");
		
		var evoo = eval ("idLookUp[from.id].obj" + from.ptr + "['__']"); // = maxIndex");
		if (!evoo.hasOwnProperty("linkBoxIdx")) {
			eval("idLookUp[from.id].obj" + from.ptr + "['__']['linkBoxIdx'] = []")
		}
		
		var ox = eval("idLookUp[from.id].obj" + from.ptr + "['__']['linkBoxIdx']");
		console.log(ox +" <ox!!!!!!!!!!!!!!!!!!!!!!!!!!!xxcutttaaa");
		//eval("idLookUp[from.id].obj" + from.ptr + "['__']['linkBoxIdx'][from.index].
		if (!ox[from.index])
			eval("idLookUp[from.id].obj" + from.ptr + "['__']['linkBoxIdx'][from.index] = []")
		eval("idLookUp[from.id].obj" + from.ptr + "['__']['linkBoxIdx'][from.index].push(cloneObject(to))");// = from.index")
	}
	
	
	self.mkLinks = function (foreign) {
		var maxIndex = {};
		for ( var i in foreign ) {
			var from = s2o(i);
			for ( t in foreign[i] ) {
				var to = foreign[i][t];
				// only required for "new" allforeign
				if ( typeof to === typeof "" ) {
					to = s2o(foreign[i][t]);
				}
				self.setObjMax(from, to);
				self.setObjMax(to, from);
		 	}
		}
	}

	self.recreate = function (e) {
		for( var i = 0; i < e.data.length ; i++ ) {
			var o = e.data[i]; 
			o.x = o['__']['xabs'];
			o.y = o['__']['yabs']-22;
			var id = o['__']['id'];
			//o.id = o['__']['id'];
			o.root = o['__']['isRootNode']; 
			o.obj.__.id  = id; 
			
			var dbItem = new rootGraphItem(o);
			//dbItem.sRender();

			idLookUp[o['__']['id']] = dbItem;

			// PLEASE KEEP - NEED TO FIX
			//if ( o['__']['isRootNode'] === true ) {
			//	dbItem.listContainer.listItems[0].mkRootNode();
			//}
			// WHEN THIS IS FIXED - ADD ALSO isPROGRAMNODE (Michael)
		}


		var drawcache = {};

		self.mkLinks(e.foreign);

		for (var i in idLookUp)
			idLookUp[i].mRender();
		
		return;
	}

	self.gsReturn = function (e) {
		var oo = JSON.parse(e);
		self.recreate(oo);
	}




	document.body.addEventListener('contextmenu', function(e) {
		e.preventDefault();
	}, false);

	stage.content.addEventListener('mouseup', function(evt) {
		if (self.initted) {
			// surpress error if "remove" was chosen
			try {
				self.initted.remove();
			} catch (e) {
			}
			delete self.initted;
		} else

		if (evt.which == "3") {
			/*
			 * if (self.initted) { self.initted.remove(); delete self.initted; }
			 */
			// self.initted = true;
			// alert("tessss")
			self.initted = rightClickStage();
			self.initted.initStage = self;
			evt.stopImmediatePropagation();
		}
	}, false);
	buttonLayer.draw();
	// alert("hi");
}

// init stage bullshit should go here

function stageHandler(o) {

}

var button = function(o) {
	var ib = new textBox(o)
	this.buttonShape = ib;
	// alert("hiii");
	// alert(o.layer);
	// o.layer.add(ib.group);
	this.ib = ib;
	
	// alert(ib.group);
	this.group = ib.group;
	// alert("y0000");

	// stage.add(o.layer) //ib.group);
	// o.layer.add(ib.text);
	o.hier.add(ib.group);
	ib.resizeTextOutline();
	this.layer = o.hier;
	// ib.setWidth(40);
	self = this;
	
	this.rename = function(text) {
		ib.text.setText(text);
		ib.itemText = text;
		ib.modifyBoxWidth();
		this.layer.draw();			
	}
	
	this.height = self.buttonShape.height;

	this.setY = function(y) {
		self.buttonShape.setY(y);
	}

	this.getY = function() {
		return self.buttonShape.getY();
	}

	this.getX = function() {
		return self.buttonShape.getX();
	}

	this.setX = function(x) {
		self.buttonShape.setX(x);
	}
	
	/*
	this.setClick = function(func) {
		self.group.on("mousedown", func);
	}
	*/

	if ( o.hasOwnProperty('x')) {
		this.setX(o['x']);
	}

	if ( o.hasOwnProperty('y')) {
		this.setY(o['y']);
	}
}

function buildDBObject(obj, dbo, layer) {
	for ( var b in obj) {
		var d = dbo.insertListItem(b);
		var g = 0;
		/*
		 * for (var i in obj[b]) g++; if (g > 0) { console.log('test..'); var e =
		 * d.addListContainer(); //buildDBObject(obj[b], e); //e.setClipping(); }
		 * else { //d.setClipping();
		 * //console.log("SCCOPJSLDKFJLSDKFJLSDKFJLDSKFJDLSKFJDLSKFJDSLKFJDSLFKJDSLFKJSDFL!!!!!") }
		 */
	}
}

function dbLayer(bl) {
	// reinherit(dbLayer, this)
	// this.superConstructor(bl)
	// instead of 'bl' should use a variable object
	// var self = this;
	//	console.log("cattttsss!!!!");

	// this.layer.on("dragmove", tester);

	// console.log(JSON.stringify(bl.obj))
	// console.log(JSON.stringify(doThing(bl.obj)))
	bl.obj["caseObject"] = {};
	
	for (var g in bl.obj) {
		if (g != "__" && g != "caseObject") {
			bl.obj["caseObject"][g] = cloneObject(bl.obj[g])
			delete bl.obj[g]
		}
	}
	
	if (!bl.obj.__)
		bl.obj.__ = {};
	if (!bl.obj.__.id)
		bl.obj.__.id = guid();
	
	console.log(bl.obj)
	var dbo = new rootDBItem(bl);
	
	dbo.obj.__.nodeType = "aggregateCaseObject"
	
	dbo.objType = "aggregateCaseObject";
	//dbo.id = guid();
	
	// console.log(bl.obj);
	// buildDBObject(bl.obj, dbo.listContainer);

	// dbo.listContainer.setClipping();
	/*
	 * dbo.listContainer.insertListItem();
	 * 
	 * var li = dbo.listContainer.insertListItem(); var lc =
	 * li.addListContainer(); lc.insertListItem(); lc.insertListItem();
	 * //lc.insertListItem(); var h = lc.insertListItem(); var ilc =
	 * h.addListContainer(); ilc.insertListItem("test"); ilc.insertListItem();
	 * ilc.insertListItem(); //ilc.insertListItem();
	 * 
	 * //lc.setClipping(); //ilc.insertListItem();
	 * 
	 * var b = dbo.listContainer.insertListItem();
	 * 
	 * var bc = b.addListContainer(); bc.insertListItem(); bc.insertListItem();
	 * //ilc.setClipping(); //lc.insertListItem();
	 * //dbo.listContainer.insertListItem(); //dbo.listContainer.setClipping();
	 * 
	 * //li.hideListContainer(); //b.hideListContainer()
	 * //h.hideListContainer();
	 * 
	 */

	dbo.mRender();
}

/*
 * o.container.parent.insertListItem("acid"+o.container.index,
 * parseInt(o.container.index)); o.container.layer.draw(); this.remove(); break;
 * case "after": o.container.parent.insertListItem("acid"+o.container.index,
 * parseInt(o.container.index)+1);
 * 
 */



function rightClickGraphItem(o) {
	var pos = stage.getMousePosition();


	var obj = {
			"Rename" : {},
			"Remove" : {},
			"Add Sibling" : {
				"before" : {},
				"after" : {}
			},
			"Add Child" : {},
			"Change Type" : {
				"Root" : {},
				"Program" : {},
				"Normal" : {}
			}
		};


	var cl = new rootContextItem({
		caller : o,// .dbObject.root,
		callback : function(x) {
			var gp = x.getPath(x.container);
			switch (gp[0]) {

			case "Change Type":
				o.container.root.obj.__.nodeType = gp[1];

				switch (gp[1]) {
					case "Program":
						if ( o.container.isRootNode() ) {
							o.container.unmkRootNode();
						}
						if ( ! o.container.isProgramNode() ) {
							o.container.mkProgramNode();
						}
						break
					case "Root":
						if ( o.container.isProgramNode() ) {
							o.container.unmkProgramNode();
						}
						if ( ! o.container.isRootNode() ) {
							o.container.mkRootNode();
						}
						break
					case "Normal":
						if ( o.container.isProgramNode() ) {
							o.container.unmkProgramNode();
						}
						if ( o.container.isRootNode() ) {
							o.container.unmkRootNode();
						}
						break;
				}

				if (gp[1]) {
					this.remove();
					break;
				}
				else {
					x.addRemoveContainer();
					x.container.layer.draw();
					break;
				}
				break;
			case "Add Sibling":
				switch (gp[1]) {
				case "before":
					// this.insertListItem = function(text, before)
					var a = o.getObjectArray();
					// alert(a);
					a.pop();
					// alert(a);			console.log(o.container.root.obj);
					var nm = "acid" + parseInt(o.container.parent.listItems.length);
					o.setObjectArray(a, nm);
					// o.parent.addObject(o.container.parent.listItems.length);
					o.container.parent.insertListItem(nm, parseInt(o.container.index));
					o.container.layer.draw();
										
					/*
					evt = document.createEvent("Event");
					evt.initEvent("dragmove",true,true);
					
					//console.log(o)
						o.container.root.layer._handleEvents("dragmove", evt)
					*/
					
					//o.container.redrawLinkBoxes();
					this.remove();
					break;
				case "after":
					var a = o.getObjectArray();
					// alert(a);
					a.pop();
					var nm = "acid"	+ parseInt(o.container.parent.listItems.length);
					o.setObjectArray(a, nm);

					// o.container.parent.addObject(o.container.parent.listItems.length);
					o.container.parent.insertListItem(nm, parseInt(o.container.index) + 1);
					o.container.layer.draw();
					this.remove();
					break;
				}
				if (gp[1])
					break;
				else {
					x.addRemoveContainer();
					x.container.layer.draw();
					break;
				}

			case "Add Child":
//				console.log(o);
				if (o.container.listContainer)
					break;
//				console.log(o.container.root.obj);
//				console.log("^acid");
				var lc = o.container.addListContainer();
				var oc = (o.container.root.obj);

				// update object via pointer instead...
				// var g = o.getObjectPointer();
				// alert(g);
				// console.log("--------------------------------------------------------");
				
				var n = o.addObject("acid");
				
				// console.log(n);
				// console.log(g);
				/*
				 * if (o.container.hiddenListContainer) { delete
				 * o.container.hiddenListContainer; o.show = false; }
				 */
				
				o.show = false;
				o.addRemoveContainer();
				var f = this;

				// lc.insertListItem("acid");
				// o.container.addExpander();
				// o.container.layer.draw();
				o.textOutline.setFill("pink");
				o.dbObject.layer.draw();

				this.remove();

				break;

			// deal with this later
			case "Remove":
//				console.log("++++++++239092340932");
				var ptr = o.getObjectPointer();
//				console.log(ptr)
				// delete o.container.root.obj;
				eval("delete o.container.root.obj" + ptr);
				// this.caller.dbObject.root.remove();
//				console.log("----- 44444 -----");
				try {
					o.container.parent.parent.listLabel.textOutline.setFill("lightgray");
				} catch (e) {
				}
				o.deleteObject( );
				o.remove();

				this.remove();
				// o.container.root.obj = {"right_click_m":{}}
				break;

			case "Rename":
				if (o.fresh) {
					o.fresh = false;
					// console.log("fart on your head"+o.text)
//					console.log(o.dbObject.text);
					o.text.setText("");

					// // self.text = car;
					o.modifyBoxWidth();
					o.dbObject.layer.draw();
				}

				o.rename();
				
				
				this.remove();
				// console.log(o);
				break;
			//
			}

			//		console.log(gp);
			o.container.root.traverseWith(function(e) {e.setLinkBoxes(); linesLayer.render()})

		},
		stage : stage,
		x : pos.x,
		y : pos.y,
		'obj': obj
	})


	cl.mRender();
	return cl;
}

function rightClickStage() {
	var pos = stage.getMousePosition();
	var cl = new rootContextItem({
		stage : stage,
		x : pos.x,
		y : pos.y,
		obj : {
			"new collection" : {}
		}
	})
	cl.mRender();
	return cl;
}

inherit(rootListItem, rootDBItem)
function rootDBItem(bl) {
	reinherit(rootDBItem, this);
	this.superConstructor(bl);
	var self = this;

	this.addListContainer = function() {
		this.listContainer = new DBListContainer(self);
		this.layer.add(this.listContainer.group);
		return this.listContainer;
	}
	this.listContainer = this.addListContainer();
}

inherit(rootListItem, rootContextItem)
function rootContextItem(bl) {
	reinherit(rootContextItem, this);
	this.superConstructor(bl);
	var self = this;
	this.callback = bl.callback;
	this.caller = bl.caller;
	this.addListContainer = function() {
		this.listContainer = new contextListContainer(self);
		this.layer.add(this.listContainer.group);
//		console.log('tesssssssssssar')
		return this.listContainer;
	}
	this.listContainer = this.addListContainer();
}

inherit(rootListItem, rootGraphItem)
function rootGraphItem(bl) {
	reinherit(rootGraphItem, this);
	this.superConstructor(bl);
	if (!this.obj.__)
		this.obj.__ = {};
	var self = this;

	this.addListContainer = function(hidden) {
		this.listContainer = new graphListContainer(self);
		this.layer.add(this.listContainer.group);
		// alert("test2");
		// this.listContainer.parent = this;
		// console.log('tesssssssssssar')
		return this.listContainer;
	}
	this.listContainer = this.addListContainer();
}

function ohc(o) {
	var ok = false;
	for ( var i in o) {
		if ( i != "__" ) {
			//if (o[i].linkBoxIdx) {
			//	console.log(o[i]);
				ok = true;
				break;
		}
		
	}
	//console.log("ok: "+ok);
	return ok
}

inherit(dragLayer, rootListItem)
function rootListItem(bl) {
	reinherit(rootListItem, this);
	this.superConstructor(bl);
	this.hier = this.layer;
	this.root = this;
	this.levels = [];
	this.obj = bl.obj;
	if (this.obj.__)
		if (this.obj.__.id)
			this.id = this.obj.__.id;
		
	this.useListConnector = bl.useListConnector;
	var self = this;

	this.listContainers = [];

	// this.itemLayer = new Kinetic.Layer({draggable: false});

	this.handleReturn = function(a) {
		
		console.log(a);
		
	}

	this.addListContainer = function(hidden) {
		if (hidden) console.log("varrriii");;

		this.listContainer = new listContainer(self);
		// alert("test1");
		this.layer.add(this.listContainer.group);
		// alrt("test2");
		// this.listContainer.parent = this;
		//	console.log('tesssssssssssar');
		return this.listContainer;
	}

	this.serialize = function() 
	{
		console.log(this.obj)
		console.log("We are serializing..");
		//to serialize: i need
		// get id for each collection
		// the root obj
		// the xy of the obj
		// the array of links
		// 
	}
	
	
	this.getListItemFromPointer = function(ptr) {
		return this.getListItemFromPointer_(ptrSplit(ptr))
	}
	
	this.getListItemFromPointer_ = function(ptr, lc) {
		if (!lc) lc = this;
	//	console.log(ptr.toString() + "<<<<");
	//	console.log(lc);
		if (lc.listContainer) {
			//console.log(lc.listContainer);
			var gr = ptr[0]; 
			//console.log(gr);
			ptr.splice(0, 1);
			//console.log(lc.listContainer);
			//console.log(gr);
			if ( lc.listContainer.hasOwnProperty('listItems') ) {
				for ( var o in  lc.listContainer.listItems) {
				//	console.log('m00');
					var n = lc.listContainer.listItems[o];
					//console.log(n.text + "<<" + gr);
					if (n.text == gr) {
						if (ptr.length == 0) {
							//console.log("success!")
							//console.log(n)
							return n;
						}
						else
							var g = this.getListItemFromPointer_(ptr, n)
					}						
				}
			}
		}
		return g;
	}
	
	this.traverseWith = function(f, lc) {
		if (!lc) lc = this;
		if (lc.listContainer)
		for ( var o in  lc.listContainer.listItems) {	
			var n = lc.listContainer.listItems[o];
			f(n)
			this.traverseWith(f, n)
		}
	}
	

	this.drawFirstColumn = function() {
//		console.log(bl.obj);
		// alert('test');
		var ogn = false; 
		for ( var o in this.obj) {
			var n = this.listContainer.insertListItem(o);
			if (!ogn) ogn = n;
			if (ohc(this.obj[o]) && n) {
				//console.log("xx");
				//console.log(this.obj[o]);
				n.listLabel.container.listLabel.textOutline.setFill("pink");
			}
//			console.log("__status__");
//			console.log(n);
		}
		//alert(this.root.obj.__.nodeType);
		try {
			if (this.root.obj.__.nodeType == "Root") {
				ogn.mkRootNode();	
			}
			if (this.root.obj.__.nodeType == "Program") {
				ogn.mkProgramNode();	
			}
		} catch (e) {}
	}
	/*
	this.renderKids = function(lc) {
		if (!lc) lc = this;
		//console.log(ptr.toString() + "<<<<");
		//console.log(lc);
		if (lc.listContainer) {
			//console.log(lc.listContainer);
			var gr = ptr[0]; 
			//console.log(gr);
			ptr.splice(0, 1);
			console.log(lc.listContainer);
			//console.log(gr);
			if ( lc.listContainer.hasOwnProperty('listItems') ) {
		
		
		
		try {
			self.addRemoveContainer()
		}catche(e) { };	
	}
	*/
	
	this.sRender = function() {
		// this.multiRender = false;
		this.drawFirstColumn();
		this.listContainer.setClipping();
		this.layer.draw();
	}

	this.mRender = function() {
		this.drawFirstColumn();

		this.root.multiRender = true;
//		console.log(this.levels);

		var g = this.levels.length - 1;
		// console.log(
		//for (g; g >= 0; g--) {
			for ( var i = 0; i < this.levels[0].length; i++) {
				// console.log(this.levels[g]);
				this.levels[0][i].setClipping();
			}
		//}
		var x = this.levels.length;
		/*
		 * for (var g = 0; g < x; g++) { for (var i=0; i <
		 * this.levels[g].length; i++) { if (this.levels[g][i].parent instanceof
		 * listItem) this.levels[g][i].parent.hideListContainer(); } }
		 */
		// alert("test");
		this.layer.draw();
		//console.log(this.levels[0][0].text)
		//console.log(this.levels[0][0].root.obj)

		var j = this.levels[0][0];
	//	j.listItems[0].listLabel.addRemoveContainer();
		
		var obj = this.levels[0][0].root.obj;
		
		
		//console.log()
		//console.log(j.text)
		// 
		function numLevels (obj) {
			
			
		}
		
		if (numLevels(obj)) {
			//addremovelistcontainer
			
		}
		//var i = 0;           
		//Kinetic.Layer.prototype.dontDraw = true;
		//this.traverseWith(function(e) { e.listLabel.addRemoveContainer(true)})
		//Kinetic.Layer.prototype.dontDraw = false;


	}

	this.setClippingRect = function() {

	}
	// this.listContainer = this.addListContainer();
}
/*
 * this.insertContextItem = function(text) { self.text = text; var li = new
 * contextListItem(self); this.insertItem(text, li); }
 * 
 * this.insertListItem = function(text) { self.text = text; var li = new
 * listItem(self); this.insertItem(text, li); }
 * 
 * this.insertDBListItem = function(text, item) { self.text = text; var li = new
 * listItem(self); li.addLinkConnector(); console.log(text + "insert db<<<<<")
 * this.insertItem(text, li); }
 */
// var listElementSizes
inherit(listContainer, graphListContainer)
function graphListContainer(bl) {
	reinherit(graphListContainer, this);
	this.superConstructor(bl);
	var self = this;

	this.insertListItem = function(text, before) {
		if (text == "__") {
			return false;
		}
		self.text = text;
	
		self.idx = before ? before : this.listItems ? this.listItems.length : 0;
		
		//console.log(self.idx + " <<<<<<") 
		var li = new graphListItem(self);
		var g = eval ("this.root.obj" + li.listLabel.getObjectPointer())
		//li.addLinkConnector();
		this.insertItem(text, li, parseInt(before));
		li.drawBoxesFromObj();
		return li;
	}
}

inherit(listContainer, contextListContainer)
function contextListContainer(bl) {
	reinherit(contextListContainer, this);
	this.superConstructor(bl);
	var self = this;

	this.insertListItem = function(text) {
		self.text = text;
		var li = new contextListItem(self);
		this.insertItem(text, li);
		return li;

	}
}

inherit(listContainer, DBListContainer)
function DBListContainer(bl) {
	reinherit(DBListContainer, this);
	this.superConstructor(bl);
	var self = this;

	this.insertListItem = function(text) {
		self.text = text;
		var li = new DBListItem(self);
		//li.addLinkConnector();
		this.insertItem(text, li);
		return li;

	}
}
function listContainer(parent) {
	reinherit(listContainer, this);

	this.layer = parent.layer;
	this.parent = parent;
	var self = this;
	this.containerSize = 581;
	this.listItems = [];
	this.root = parent.root;

	this.resized = false;
	this.scrollbar = false;

	this.renderListItems = function(a) {
	}

	// wronggg/??
	this.insertListItem = function(text) {
		
		self.text = text;
		var li = new contextListItem(self);
		this.insertItem(text, li);
	}
	this.redrawLinks = function(clippingRect) {
		this.root.traverseWith(function(e) {e.setLinkBoxes(); linesLayer.render()})
		
		//this.layer.draw();
		//for (var i in
		// cycle through listItems, check their global Lengths
		//console.log(this);
			
		
	}
	
	this.isListContainer = true;
	this.setClippingRect = function(a) {
		var rect = new Kinetic.Rect({
			x : 0,
			y : 0, // ib.height+g, //0,
			// //-(this.height*(this.children.length-1))-mib.height,
			width : 200,
			height : 100, // this.containerSize,
			// fill: "black",
			strokeWidth : 1
		});
		// f.listContainer.height = n;

		var dbo = {
			hOffset : 0,
			windowHeight : self.containerSize,
			contentHeight : self.getHeight(),
			layer : self.parent.layer,
			scrollContent : self.content,
			handleMove : function(clippingRect) {
				//console.log("test");
				if (self.redrawLinks)
					self.redrawLinks(clippingRect);
				
			}
		}
		var sb = new scrollbar(dbo);
		if (!this.scrollbar) {
			sb.group.setX(-10);
			this.scrollbar = sb;
			// alert('test..');
			this.group.setClippingRect({
				x : -10,
				y : 0,
				width : 600,
				height : this.containerSize
			})
			// this.group.add(rect)
			this.group.add(sb.group)
		}
		// if (this.clippingRect)
		// this.group.remove(this.clippingRect);
		// this.clippingRect = rect;
	}

	this.setScrollbarHeight = function() {
		// var dbo = {hOffset:0, windowHeight:self.containerSize,
		// contentHeight:self.getHeight(), layer:self.parent.layer,
		// scrollContent:self.content}
		// console.log(">>>mickyyyy"+self.getHeight());
		// this.scrollbar.setBarHeight(dbo)
	}

	this.getParentListContainer = function() {
		// console.log(this.parent.parent)
		// if (this.parent.p)
		return this.parent.listContainer;
		// else return false;
	}

	// this.scrollGroup = new Kinetic.Group();
	this.content = new Kinetic.Group();
	this.group = new Kinetic.Group();
	this.group.add(this.content);

	this.hier = this.group;

	/*
	 * this.insertContextItem = function(text) { self.text = text; var li = new
	 * contextListItem(self); this.insertItem(text, li); }
	 * 
	 * this.insertListItem = function(text) { self.text = text; var li = new
	 * listItem(self); this.insertItem(text, li); }
	 * 
	 * this.insertDBListItem = function(text, item) { self.text = text; var li =
	 * new listItem(self); li.addLinkConnector(); console.log(text + "insert db<<<<<")
	 * this.insertItem(text, li); }
	 */
	/*
	 * li.index = self.listItems.length;
	 * 
	 * 
	 * this.listItems.splice(1,0," // rather than push, splice in......
	 * 
	 * this.listItems.push(li); this.content.add(li.group); var heights = 0;
	 * 
	 * if (this.listItems.length - 2 >= 0) { // console.log(li.height); var last =
	 * this.listItems[this.listItems.length - 2]; var lh = last.getHeight();
	 * li.setY(last.getY() + lh); heights += lh; console.log(last.getY() + lh) }
	 */

	this.insertItem = function(text, li, before) {

		//console.log("----::::--" + before + " " + this.listItems.length);
		var ok = (before !== undefined && parseInt(before) < this.listItems.length);
		if (ok) {
		//	console.log("pimppppp");
			li.index = before;
			var last = this.listItems[before];

			this.listItems.splice(before, 0, li);
			// re-index
			// console.log("hiiiiiiimeow");
			for ( var i in this.listItems)
				this.listItems[i].index = i;
			//console.log(this.listItems)
		} else {
			var last = this.listItems[this.listItems.length - 1];
			li.index = self.listItems.length;
			this.listItems.push(li);
			if (last) {
				/*
				 * console.log("----------grrerrr") var diff = last.getHeight() -
				 * li.getHeight(); li.setY(last.getY());
				 * this.setItemsBack(parseInt(before)+1, last.getHeight() -
				 * last.contentHeight() + last.getY()); //
				 * this.setItemsBack(parseInt(before)+1, li.getHeight() -
				 * last.getHeight() + last.getY() );
				 */
			}
		}
		// rather than push, splice in......

		// this.listItems.push(li);
		this.content.add(li.group);
		var heights = 0;
	//	console.log("-00 " + li.getY())
		if (this.listItems.length - 2 >= 0) {
		//	console.log("-- wtf this sucks...");
			// console.log(li.height);
			if (ok) {
				// console.log("teeeeeee1111111111")
				
				var lh = last.getHeight();
						
				// this.listItems[0].setY("130");
				 /*
				 * g.setItems(f.index + 1, f.getHeight() - f.contentHeight() +
				 * f.getY());
				 */
				
				var diff = last.getHeight() - li.getHeight();
				
				//  var diff = 0;
				
				li.setY(last.getY() - diff + last.getContainerHeight());
				
				
				// console.log("difffffffyyyyyyyy: " + diff)
				// this.pushItemsDown(parseInt(before)+1, li.getHeight());
				
				
				this.setItemsBack(parseInt(before) + 1, last.getHeight() - last.contentHeight() + last.getY() - diff);
				
				// this.setItemsBack(parseInt(before)+1, li.getHeight()
				// last.getHeight() + last.getY());
				// this.pushItemsDown(before+1, li.getHeight());
				//console.log('testr45456...');
				// todo::
				// use proper pushdown that recurses through hierarchal nodes
				
			} else {
				
				//console.log("24234234teeeeeee___+++")
				// alert('coh')
				
				//var diff = 0;
				
				// last.getHeight() - li.getHeight();
				// li.setY(last.getY()-diff);
				var lh = last.getHeight();
				var diff =  last.getContainerHeight();
				li.setY(last.getY() + li.getHeight() + diff);
				
				this.setItemsBack(before + 1, last.getHeight() - last.contentHeight() + last.getY());
				// console.log("---max the cat get well soon---");
			}
			// ....push down....//
			heights += lh;
		//	console.log(last.getY() + lh)
		}

		return li;
	}

	this.setClipping = function() {
		var f = this; // g.getParentListContainer();
		// console.log(f.getParentListContainer().parent)
		var i = 0;

		// console.log('test')
		// should be a function...
		var n = this.getHeight(); // this.getHeight();
	//	console.log(">>>" + n)
		if (n > this.containerSize) {
			this.setClippingRect(n);
			this.setScrollbarHeight();
			// console.log(f.getHeight())
		}
		/*
		 * while(f.parent) { //take out when finished / it works //if (++i >=
		 * 15) break // needs to reset the scrollbar heights..... f= f.parent;
		 * if (f instanceof listContainer) { console.log(f); n=f.getHeight(); if
		 * (n > this.containerSize) f.setClippingRect(n);
		 * //console.log(">>>"+n); f.setScrollbarHeight() } }
		 */

	}

	// requires: {windowHeight:0, contentHeight:0, layer:layer}

	this.setScrollbars = function() {
		// requires: {windowHeight:0, contentHeight:0, layer:layer,
		// scrollContent:node}
		// alert("rap nigga");
		// alert(this.containerSize);
		// need to add a scrollbar group, then attach the scrollcontent ontop of
		// that
		var dbo = {
			hOffset : this.getY(),
			windowHeight : this.containerSize,
			contentHeight : this.getHeight(),
			layer : self.parent.layer,
			scrollContent : self.hier
		}
		// var sb = new scrollbar(dbo);

		// this.group.add(sb.group)
		// this.scrollbar = sb;
	}

	this.setListContainerSize = function(a) {
		this.listContainerSize = a;
	}

	this.show = function(a) {

	}

	this.hide = function(a) {

	}

	this.setY = function(y) {
		self.group.setY(y)
	}
	this.getY = function(x) {
		return self.group.getY();
	}
	this.setX = function(x) {
		self.group.setX(x)

	}
	this.pushItemsDown = function(index, amt) {
		//console.log(self.listItems.length + "<<< index:" + index);
		for ( var i = index; i < self.listItems.length; i++) {
			//console.log("^^^" + i + "^^^");
			var si = self.listItems[i];
			var y = si.getY() + amt; // self.listContainerSize;
			si.setY(y);
		}
	}

	this.resetItems = function(index) {
		if (index < self.listItems.length)
			var offset = self.listItems[index].getY()
					- self.listItems[index].contentHeight();

	//	console.log(self.listItems[index].getY() + "<rest"
//				+ self.listItems[index].contentHeight())
		// else offset = 0;
		for ( var i = index; i < self.listItems.length; i++) {
			var si = self.listItems[i];
			var y = si.getY() - offset; // self.listContainerSize;
			si.setY(y);
		}
	}

	// this.setAndPull
	
	 /*
	 * this.itemSetBack = function(index, amt) {
	 * 		
	 * }
	 */
	
	this.setItemsBack = function(index, amt) {

		var f = this;
		// try {
		f.setItems(parseInt(index), amt);
		// } catch (e) { }
		while (f.parent) {
			
			// take out when finished / it works
			// if (++i >= 15) break
			// needs to reset the scrollbar heights.....
			
			g = f.parent;
			if (g.isListContainer) {
				//			console.log('rubbbish')
				g.setItems(parseInt(f.index) + 1, f.getHeight()
						- f.contentHeight() + f.getY());

				var dbo = {
					hOffset : 0,
					windowHeight : g.containerSize,
					contentHeight : g.getHeight(),
					layer : g.layer,
					scrollContent : g.content
				}
				if (g.scrollbar) {
		//			console.log(dbo.contentHeight + " <> " + dbo.windowHeight);
					if (dbo.contentHeight < dbo.windowHeight) {
						g.scrollbar.group.hide();// = false;
					} else
						g.scrollbar.group.show();
					g.scrollbar.setBarHeight(dbo);
				}
			}
			f = g;
		}

	}

	this.setItems = function(index, amt, box) {
		var offset = 0;
		if (index < self.listItems.length)
			var offset = self.listItems[index].getY()
					- self.listItems[index].contentHeight();
		else {
	//		console.log("out of fucking bounds!!!!!! ... " + index + " "
	//				+ self.listItems.length)
			return;
		}

		// else offset = 0;insta
	//	console.log(self.listItems[index].getY() + " -- "+ self.listItems[index].contentHeight() + " " + offset + " "+ amt)
		// else offset = 0;
		for ( var i = index; i < self.listItems.length; i++) {
			var si = self.listItems[i];
			var q = 0;
			//if (box)
				//ofset+=10;
			var y = si.getY() - offset + amt;
			// self.listContainerSize;
			si.setY(y);
			
			/*
			var n = 0;
			for (var i =0; i < si.links.length; i++) {
				console.log(i);
				console.log(si.links[i])
				si.links[i].setY(n);
				n+=10;
			}
			//*/
		
		}
	}

	this.pullItemsUp = function(index, amt) {
		for ( var i = index; i < self.listItems.length; i++) {
			var si = self.listItems[i];
			var y = si.getY() - amt; // self.listContainerSize;
			si.setY(y);
		}
	}

	this.getContainerHeight = function() {
		var n = 0;
		for ( var i = 0; i < this.listItems.length; i++) {
			n += this.listItems[i].getHeight();

			var lic = this.listItems[i].listContainer;
			if (lic)
				if (lic.getHeight() > this.containerSize)
					n += this.containerSize;
		}
		return n;
	}

	this.reindex = function() {
		for ( var i = 0; i < this.listItems.length; i++) {
			this.listItems[i].index = i;
		}
	}

	this.getHeight = function() {
		var n = 0;
		for ( var i = 0; i < this.listItems.length; i++) {
			n += this.listItems[i].getHeight();
		}
		return n;
	}

	this.level = -1;
	var f = this;
	while (f.parent) {
		// take out when finished / it works
		// if (++i >= 15) break
		// needs to reset the scrollbar heights.....
		if (f.isListContainer) {
			this.level++;
		}
		f = f.parent;
	}

	if (!this.root.levels[this.level])
		this.root.levels[this.level] = [];
	// if this.level)
	this.root.levels[this.level].push(this);
}
/*
 * inherit(listItem, dbListItem) function dbListItem(parent) { }
 */

inherit(baseListItem, graphListItem);
function graphListItem(bl) {
	reinherit(graphListItem, this);
	this.superConstructor(bl);
	var self = this;
	self.listLabel = new graphLabel(self);
	this.listLabel.group.setY(this.lch);
	this.group.add(this.listLabel.group);
	//this.listLabel.group.setY(this.lch)

	this.root.objType = "node"; // node | root | program
	this.listLabel.resizeTextOutline();
	this.index = bl.idx; 
	this.addListContainer = function(hidden) {
		//console.log("chicken"+hidden);
		var glc = new graphListContainer(this);
		glc.setX(10);
		glc.setY(self.listLabel.height);
		//if (!hidden) {
			this.listContainer = glc

		//} else {
		//	this.hiddenListContainer = glc
		//}
		
		this.group.add(glc.group)
		return glc;
	}

	this.remove = function() {
		var h = this.getHeight();
		var y = this.getY();

		if (this.listContainer) {
			delete this.listContainer;
			this.group.remove(this.listContainer.group);
		}
		//console.log(this.group);
		this.group.removeChildren();
		//console.log("trapozaoid");
		// this.group.remove(this.listLabel.group);
		//console.log(this.group);
		this.layer.draw();
	//	console.log(">>>>>" + this.index);
	//	console.log(this.parent);
		var ti = this.index;
	//	console.log(this);
		this.parent.listItems.splice(this.index, 1);
		this.parent.reindex();
		if (this.parent.listItems.length == 0) {
			// var tpp = this.parent.parent;//.listContainer
			if (this.parent.parent.group) {
				this.parent.parent.group.remove(this.parent.parent.listContainer.group);
				
				delete this.parent.parent.listContainer;
				delete this.parent.parent.hiddenListContainer;
				// alert("test...");
				// this.textOutline.setFill("pink");
	
				if (this.parent.parent instanceof rootGraphItem) {
					this.root.remove();
				}
			}

		}
		// alert (ti+" "+h);
		// this.setItemsBack(parseInt(before)+1, last.getHeight() -
		// last.contentHeight() + last.getY());
		// self.parent.setItems(ti, 0 - this.contentHeight() + y);//
		// containerSize);
		self.parent.setItemsBack(ti, 0 - this.contentHeight() + y);// containerSize);
		self.layer.draw();

	}


	this.isRootNode = function () {
		return this.root.objType === "root" ? true : false;
	}

	this.isProgramNode = function () {
		return this.root.objType === "program" ? true : false;
	}

	this.mkRootNode = function () {
		this.listLabel.textOutline.setFill("lightblue");
		this.layer.draw();
		
		this.root.objType = "root";
		rootObjects.push(this);
	}

	this.mkProgramNode = function () {
		this.listLabel.textOutline.setFill("lightgreen");
		this.layer.draw();
		this.root.objType = "program";
	}

	this.unmkProgramNode = function () {
		this.listLabel.textOutline.setFill("lightgray");
		this.layer.draw();
		this.root.objType = "node";
	}

	this.unmkRootNode = function () {
		this.listLabel.textOutline.setFill("lightgray");
		this.layer.draw();
		this.root.objType = "node";
		var i = 0;
		while ( i < rootObjects.length) {
			if (rootObjects[i] == this) {
				rootObjects.splice(i,1);
				break;
			}
			i++;
		}
	}
	//this.drawBoxesFromObj();

}

inherit(baseListItem, contextListItem);
function contextListItem(bl) {
	reinherit(contextListItem, this);
	// alert("---");
	// alert(contextListItem.prototype.constructor);
	this.superConstructor(bl);
	var self = this;
	self.listLabel = new contextLabel(self);
	this.group.add(this.listLabel.group);
	this.listLabel.resizeTextOutline();
}

/*
 * inherit(listItem, DBListItem); function DBListItem(parent) {
 * //reinherit(DBListItem, this); //alert("---");
 * //alert(contextListItem.prototype.constructor);
 * this.superConstructor(parent); //var self = this; self.listLabel = new
 * DBListLabel(self); this.group.add(this.listLabel.group);
 * this.listLabel.resizeTextOutline(); }
 */

inherit(baseListItem, DBListItem);
function DBListItem(parent) {

	reinherit(DBListItem, this);
	// alert("Helllllooo")

	this.superConstructor(parent);
	var self = this;
	// console.log("king tubby")
	self.listLabel = new DBListLabel(self);

	this.group.add(self.listLabel.group);

	this.listLabel.group.setY(this.lch)
	this.listLabel.resizeTextOutline();

	this.addListContainer = function(hidden) {
		// alert('xxxx');
		// this.showListContainer();yeah man
		// return;
		// self.parent.pushItemsDown(this.index+1, this.getHeight());

		this.listContainer = new DBListContainer(this)
		this.listContainer.setX(10);
		this.listContainer.setY(self.contentHeight())
		// if (hidden) {
		// this.hiddenListContainer = listContainer;
		// } else {
		// this.listContainer = listContainer
		this.group.add(this.listContainer.group)
		// }
		// self.parent.pushItemsDown(this.index+1, 2);
		return this.listContainer;
		// listContainer.parent = this;
	}
	this.drawBoxesFromObj();

}

function baseListItem(parent) {
	this.parent = parent;
	this.layer = parent.layer;
	var self = this;
	this.root = parent.root;
	this.links = [];
	// this.baseItem = parent;
	self.text = parent.text;
	this.group = new Kinetic.Group();
//	console.log(parent);
	parent.hier.add(this.group);
	this.lch = linkConnector.dims.height + linkConnector.dims.stroke;

	// var tester = function() {console.log("-------"); ll.redraw();};

	// this.layer.on("dragend", tester);
	// this.layer.on("dragmove", tester);
	// var tester = function() {ll.redraw();};
	// this.layer.on("dragend", tester);

	this.setListLabelText = function(a) {
		self.listLabel.text = a;
	}
	
	
	this.setLinesFromObj = function() {
	//var log (typeOf self)
		//for (var i in self) console.log(i)
		//if (self.listLabel)
		//console.log(this.listLabel.getObjectPointer());
		var g = eval ("this.root.obj" + this.listLabel.getObjectPointer());
		//console.log(this.root.obj);
		var it = false;
	//	//console.log(g);
	//	console.log(g);
		if (g.hasOwnProperty("__")) {
			if (g.__.hasOwnProperty("linkBoxIdx")) {
				for (i =0; i < g.__.linkBoxIdx.length; i ++) {
					it = true;

					var pta = g.__.linkBoxIdx[i];

					var oo = idLookUp[pta.id].getListItemFromPointer(pta.ptr);
					
					if (oo) {
						console.log("whistle....");
						lp.selectBox(self.links[i], true);
						lp.selectBox(oo.links[pta.index], true);
					}
				}
			}
		} 
		this.redrawLinkBoxes();		
	}
	
	
	this.traverseSubElements = function(f, lc) {
		if (!lc) lc = this;
		if (lc.listContainer)
		for ( var o in  lc.listContainer.listItems) {	
			var n = lc.listContainer.listItems[o];
			f(n)
			this.traverseSubElements(f, n)
		}
	}
	
	this.hideLinks = function() {
		this.hideLinks_ = function (lc) {
			console.log("cat..")
			for (var i in lc.listItems) {
			for (var l in lc.listItems[i].links) {
				
				//if (lc.listItems[i].link[l].ll)
				var link = lc.listItems[i].links[l];
				if (link.linkedBoxes) {
					for (var f in link.linkedBoxes) {
						var lf = link.linkedBoxes[f];
						for (var g in lf.ll.length) {
							console.log('miaimi');
							var ll = link.linkedBoxes[f].ll[g];
							ll.clearLine();
						}
					}
				}
				if (link.fl) {
					console.log(link.fl)
					for (var f in link.fl) {
						console.log(f)
						var lf = link.fl[f];
						lf.clearLine();
						//link.removeLineFromClick(lf, true);
					}					
					
				}
				
				if (link.ll) {
					console.log(link.ll)
					for (var f in link.ll) {
						console.log(f)
						var lf = link.ll[f];
						lf.clearLine();
						//link.removeLineFromClick(lf, true);
					}					
					
				}
				if (lc.listItems[i].listContainer)
					this.hideLinks_(lc.listItems[i].listContainer)
			}
		}
		linesLayer.render();					
			
		}
		this.hideLinks_(this.listContainer);
		this.traverseSubElements(function(e) { if (e.listContainer) {
				self.hideLinks_(e.listContainer);
				e.listContainer.isHidden = true;
				}
			})
		

			//this.hideLinks_(this.listContainer);
	}
	
	
	
	this.removeLinks = function() {
		return this.removeLinks_(this.listContainer);
	}
	this.removeLinks_ = function (lc) {
		//console.log(this)
		//console.log("0-0")
		for (var i in lc.listItems) {
			for (var l in lc.listItems[i].links) {
				
				//if (lc.listItems[i].link[l].ll)
				var link = lc.listItems[i].links[l];
				if (link.linkedBoxes) {
					for (var f in link.linkedBoxes) {
						var lf = link.linkedBoxes[f];
						for (var g in lf.ll.length) {
							//console.log('miaimi');
							var ll = link.linkedBoxes[f].ll[g];
							lf.removeLineFromClick(ll.line, true);
						}
					}
				}
				
				if (link.ll) {
					for (var f in link.ll) {
						var lf = link.ll[f];
						link.removeLineFromClick(lf, true);
					}					
					
				}
				
				if (lc.listItems[i].listContainer)
					this.removeLinks_(lc.listItems[i].listContainer)
			}

		}
		linesLayer.render();		

	}
	
	this.drawBoxesFromObj = function() {
		//var log (typeOf self)
		//for (var i in self) console.log(i)
		//if (self.listLabel)
		//console.log(this.listLabel.getObjectPointer());
		var g = eval ("this.root.obj" + this.listLabel.getObjectPointer());
		//console.log(this.root.obj);
		var it = false;
		//console.log(g);
		if (g.hasOwnProperty("__")) {
			if (g.__.hasOwnProperty("linkBoxIdx")) {
				for (i =0; i < g.__.linkBoxIdx.length; i ++) {
					it = true;
					//console.log('corn on the fucking cob');
					var lc = this.addLinkConnector();
					for (var j=0; j < g.__.linkBoxIdx[i].length; j++) {
						//console.log(g.__.linkBoxIdx);
						var pta = g.__.linkBoxIdx[i][j];
						//for (var i =0; i < pta.length; i++) {
						//console.log(pta);
						//console.log("m00")
						//console.log(pta[i].id)
						var oo = idLookUp[pta.id].getListItemFromPointer(pta.ptr);
					
						//console.log(pta.ptr);
						//console.log(this.listLabel.getObjectPointer())
						//console.log(this.root.obj)
						//console.log("_-_-_-_-_-_-")
						
						if (oo) {
							console.log("connecting...")
							lp.selectBox(lc, true);
							//console.log(oo.links[g.__.to.index]);
							lp.selectBox(oo.links[pta.index], true);
						}
					}
					
					//if (idLookUp[g.__.to.id]
					// = maxIndex");
				}
			}
		} 
		//if (!it) {
			this.addLinkConnector();
			this.redrawLinkBoxes();
		//}
		
	}
	
	this.setLinkBoxes = function() {
		for (var v in self.links) {
			var link = self.links[v];
			//link.handleDragMove();
			link.drawLine();
		}
		//linesLayer.render();
	}
	
	this.redrawLinkBoxes = function() {
		for (var v in self.links) {
			var link = self.links[v];
			//link.handleDragMove();
			console.log(link);
			link.drawLine()
		}
		linesLayer.render();
	}
	
	this.addLinkConnector = function(test) {
		//console.log("american dreams die fast");
		if (!this.root.allLinks)
			this.root.allLinks = [];
		
		var lc = new linkConnector(self);
		//this.root.allLinks.push(lc);
		
		lc.parent = self;
		lc.index = self.links.length;
		// alert(self.getHeight+" "+lc + " " + self)
		var g = self.getHeight();
		// lc.setY(0);
		// not gonna work with children... use similar technique as ...
		// whatever.. lets see

		this.parent.pushItemsDown(parseInt(this.index), this.lch)

		this.group.add(lc.box);
		
		if (self.links.length > 0) {
			var lg = self.links[self.links.length - 1];
			lc.box.setY(lg.box.getY() - 10);
			this.layer.draw();
			//	ll.redraw();
		}
		self.links.push(lc);
		//alert("test")
		return lc;
	}

	this.addExpander = function() {

		var ex = new linkExpander();
		this.group.add(ex.box);
		self.listLabel.setX(10);
		ex.box.setY(10);


		this.layer.draw();
	}

	
	this.removeLinkConnector = function(index) {

		
		//console.log(self.links[index]);
		
		//if (self.links[index].hasOwnProperty("ll"))
		//	console.log(self.links[index].ll)
		
			
		//if (self.links[index].ll.length == 0) {
		this.group.remove(self.links[index].box);
		this.layer.draw();
		self.links.splice(index, 1);

		for ( var i = index; i < self.links.length; i++)
			self.links[i].index = i;

		
		this.parent.pullItemsUp(this.index, 10);

		this.setContainerSpace();
		//console.log("max")
		
		var x = 0;
		
		for (var i = 0; i < self.links.length; i++) {
			//console.log(self.links[i].box.getY())
			self.links[i].setY(x)
			x-=10;
		}
			
			//this.setItemsBack(this.index, -this.getY() - this.contentHeight(), true);
			//	}
			 
			
		//	this.parent.setItemsBack(this.index, -this.getY() - this.contentHeight(), true);
			
		this.root.traverseWith(function(e) {e.setLinkBoxes(); linesLayer.render()})
		
		this.layer.draw();
		
		/*
		 *  } this.parent.pullItemsUp(this.index, this.lch);
		 * this.arrangeGroup();
		*/
	}
	
	this.getContainerHeight = function() {
		if (this.listContainer) {
			var h2 = this.listContainer.getHeight()
			if (this.root.multiRender && h2 > this.listContainer.containerSize)
				return this.listContainer.containerSize;// (h2 <

			else
				return this.listContainer.getHeight();
		}
		return 0;
	}

	this.getHeight = function() {
		var h = this.contentHeight(); // self.links.length*(linkConnector.dims.height+linkConnector.dims.stroke)+self.listLabel.height;

		if (this.listContainer) {
			var h2 = this.listContainer.getHeight()
			if (this.root.multiRender && h2 > this.listContainer.containerSize && !this.root.hasScrollbar) {
				//this.root.hasScrollbar = true;

				h += this.listContainer.containerSize;// (h2 <
			}
			// this.listContainer.containerSize)
			// ? h2 :
			// this.listContainer.containerSize;
			else
				h += this.listContainer.getHeight();
			// h += this.listContainer.getHeight();
		}
		return h;
	}

	this.contentHeight = function() {
		return self.links.length
				* (linkConnector.dims.height + linkConnector.dims.stroke)
				+ self.listLabel.height;
	}

	this.removeListContainer = function() {
		// alert('hii1');
		self.parent.pullItemsUp(this.index + 1, this.getHeight());// containerSize);
		// this.listContainer = new listContainer(this)
		// this.listContainer.setX(10);
		// this.listContainer.setY(self.contentHeight())
		// alert('hii2');
//		console.log(this.parent.getHeight() + "micky1")

		this.group.remove(this.listContainer.group)
		delete this.listContainer;
//		console.log(this.parent.getHeight() + "micky2")
		this.parent.setClipping();
		var dbo = {
			hOffset : 0,
			windowHeight : self.parent.containerSize,
			contentHeight : self.parent.getHeight(),
			layer : self.parent.layer,
			scrollContent : self.parent.content
		}
		// console.log(">>>mickyyyy"+self.getHeight());
		this.parent.scrollbar.setBarHeight(dbo)
		// change content heights of prior group collections...
		// return this.listContainer;
	}

	this.hideListContainer = function() {
//		console.log("hiding list containerS")
		this.group.remove(this.listContainer.group);
		this.hiddenListContainer = this.listContainer;
		this.hiddenListContainer.isHidden = true;
		delete this.listContainer;
		var f = this;
		// return;

		while (f.parent) {

			g = f.parent;
			if (g.isListContainer) {

				g.setItems(parseInt(f.index) + 1, f.getHeight()
						- f.contentHeight() + f.getY());
//				console.log(f.getY() + "()" + f.getHeight());
				// g.setClipping(); //maybe put it back? i dunno what this
				// does...
//				console.log(f.getHeight())
				// return;

				var dbo = {
					hOffset : 0,
					windowHeight : g.containerSize,
					contentHeight : g.getHeight(),
					layer : g.layer,
					scrollContent : g.content
				}
				if (g.scrollbar) {
//					console.log(dbo.contentHeight + " <> " + dbo.windowHeight);
					if (dbo.contentHeight < dbo.windowHeight) {
						g.scrollbar.group.hide();
						g.content.setY(0);
					} else
						g.scrollbar.group.show()
					g.scrollbar.setBarHeight(dbo);
				}
			}
			f = g;
		}
	}

	this.visibleContainer = true;

	this.showListContainer = function() {

		this.listContainer = this.hiddenListContainer;
		this.listContainer.isHidden = false;

		this.group.add(this.listContainer.group);

		var f = this;

		while (f.parent) {
			// take out when finished / it works
			// if (++i >= 15) break
			// needs to reset the scrollbar heights.....
			g = f.parent;
			if (g.isListContainer) {
				g.setItems(parseInt(f.index) + 1, f.getHeight()
						- f.contentHeight() + f.getY());

				var dbo = {
					hOffset : 0,
					windowHeight : g.containerSize,
					contentHeight : g.getHeight(),
					layer : g.layer,
					scrollContent : g.content
				}
				if (g.scrollbar) {
					if (dbo.contentHeight < dbo.windowHeight) {
						g.scrollbar.group.hide();// = false;
					} else
						g.scrollbar.group.show();
					g.scrollbar.setBarHeight(dbo);
				}
			}
			f = g;
		}
	}

	this.setContainerSpace = function(diffItem) {
		var f = this;
		// g.setItems(f.index+1, f.getHeight());

		while (f.parent) {

			g = f.parent;
			if (g.isListContainer) {
				


				g.setItems(parseInt(f.index) + 1, f.getHeight()
						- f.contentHeight() + f.getY());

				var dbo = {
					hOffset : 0,
					windowHeight : g.containerSize,
					contentHeight : g.getHeight(),
					layer : g.layer,
					scrollContent : g.content
				}
				
				if (g.scrollbar) {
					if (dbo.contentHeight < dbo.windowHeight) {
						g.scrollbar.group.hide();// = false;
					} else
						g.scrollbar.group.show();
					g.scrollbar.setBarHeight(dbo);
				}
			}
			f = g;
		}
	}

	this.addListContainer = function(hidden) {
		// alert('xxxx');
		// this.showListContainer();yeah man
		// return;

		// self.parent.pushItemsDown(this.index+1, this.getHeight());
		this.listContainer = new listContainer(this)
		this.listContainer.setX(10);
		this.listContainer.setY(self.contentHeight())
		// if (hidden) {
		// this.hiddenListContainer = listContainer;
		// } else {
		// this.listContainer = listContainer
		this.group.add(this.listContainer.group)
		// }
		// self.parent.pushItemsDown(this.index+1, 2);
		return this.listContainer;
		// listContainer.parent = this;
	}

	this.setX = function(x) {
		this.group.setX(x)
	}

	this.setY = function(y) {
		// this.listLabel.setY(y);
		this.group.setY(y);
	}

	this.getY = function() {
		return this.group.getY();
	}

	this.getNext = function(e) {
		this.parent.listItems[this.index + 1]
	}

	this.arrangeGroup = function() {
		var g = 0;
		var gh;
		for ( var i in self.links) {
			g++;
			var ii = self.links[i];
			gh = g * ii.height
			ii.setY(gh);
		}
		self.listLabel.setY(gh);
	}

}

linkConnector.dims = {
	height : 10,
	stroke : 1
};

inherit(lineBox, linkConnector);
function linkConnector(dbo) {

	this.superConstructor(dbo);
	var self = this;
	this.remove = function() {
		dbo.removeLinkConnector(this.index);
		// pull items up
	}
}

function linePoints() {

	this.selectionChain = [];
	var self = this;
	this.clear = function() {
		this.curBox.selected = false;
		this.lastBox.selected = false;
		delete this.curBox;
		delete this.lastBox;
	}
	this.untoggleBoxes = function () {
		this.curBox.untoggle();
		this.lastBox.untoggle();	
	}

	this.getCycles = function() {
		var cycles = false;
		var j = 0;
		for (var i in directedGraph) 
			j += directedGraph[i].length;
		
		var d = 0;
		this.getRootPath = function(tb, lb, cb1, cb2) {
			console.log(d + " " + j);
			if ( d++ > j) {
				console.log("something went wrong.......");
				cycles =  true;
				return;
			}
				
			var tbl = directedGraph[tb];
			for (var i in tbl) {
				var tbi = tbl[i];
				if ( lb != tbi) {
					if (cb1 == tbi || cb2 == tbi) {
						cycles = true;
						return;
					}else
						if (!cycles)  {
							this.getRootPath(tbi, tb, cb1, cb2);
						}
				} else console.log(lb);
			}
		}
		
		this.getRootPath(this.lastBox.box2str(), this.curBox.box2str(), this.curBox.box2str(), this.lastBox.box2str());
		//return false; // Michael
		return cycles;		
	}
	
	
	this.selectBox = function(box, og) {
		box.toggle();

		if (box.selected) {
			if (box.ll) {
				delete this.lastBox;
			} else {
				//this.untoggleBoxes();
				this.curBox.untoggle();
				//box.untoggle();
				//console.log("vvv");
				box.selected = false;
				delete this.curBox;
				delete this.lastBox;

				console.log("m00cat")
				return;
			}
		}
		
		if (this.curBox)
			this.lastBox = this.curBox;
		this.curBox = box;
		box.selected = true
		//console.log(this.curBox+" "+this.lastBox)
		if (this.lastBox)
			if (this.lastBox.selected && this.curBox.selected) {
				// this.setLine();
				//we need a way to not add to directed graph when opening up stuff...
				//console.log(og);
				var curstr = this.curBox.box2str();
				var laststr = this.lastBox.box2str();

				if ( ! directedGraph.hasOwnProperty(curstr)) {
					directedGraph[curstr] = [];
				}
				if ( ! directedGraph.hasOwnProperty(laststr)) {
					directedGraph[laststr] = [];
				}

				directedGraph[curstr].push(myforeignstring({
					id: this.lastBox.label.root.id,
					ptr: this.lastBox.label.listLabel.getObjectPointer(),
					index: this.lastBox.index
				}));

				
				directedGraph[laststr].push(myforeignstring({
					id: this.curBox.label.root.id,
					ptr: this.curBox.label.listLabel.getObjectPointer(),
					index: this.curBox.index
				}));
				
				//console.log(this.getCycles() + "<<<");

				
			//	var ck = cyclecheck ( directedGraph );
				
				if (this.getCycles()) {
					console.log("Cycle detected");
					directedGraph[laststr].pop();
					directedGraph[curstr].pop();
					// FIXME: set colors back to red
				//	console.log("Fixme here");
					this.untoggleBoxes();

				} else {				
					if (this.curBox.label.root.id != this.lastBox.label.root.id) {
						this.lastBox.setLinked(this.curBox, og);
						this.curBox.setLinked(this.lastBox, og);
					} else {
						this.untoggleBoxes();
						console.log("same-collection link detected")
					}
					
				}

				this.clear();
			} 
	}

	// this.points = [];
}
var lp = new linePoints(); // Object.create(linePoints.prototype);
// linesLayer.globalLineLayer = new Kinetic.Layer();

// inherit(layer, linesLayer);
linesLayer.render = function() {
		if (linesLayer.layer)
			linesLayer.layer.draw();
}

function linesLayer(bl) {
	// reinherit(linesLayer, this);
	// this.superConstructor(parent);
	
	
	this.thisBox = bl.thisBox;
	this.thatBox = bl.thatBox;

	var self = this;

	
	this.linkTo = function(link) {
		this.link = link;
	}

	this.clearLine = function() {
		if (this.line) {
			linesLayer.layer.remove(this.line);
			delete this.line;
		}
	} 

	this.setLineColor = function() {
		if (this.line.over) {
			this.line.setFill("pink");
			this.line.over = false;
		} else {
			this.line.over = true;
			this.line.setFill("green");
		//	this.line.setY(2)
		}
		
	}
//	
	
	this.addLine = function(obj) {
		if (this.line)
			linesLayer.layer.remove(this.line)

			
		var newLine = new Kinetic.Polygon({
			fill : "red",
			strokeWidth : 0,
			lineCap : "round",
			lineJoin : "round",
			dashArray : [ 29, 20, 0, 20 ]
		});
		
		var stroke = 2;
	
		obj.thisPoint.x += 5; // center it more realistically better
		obj.thisPoint.y += 5;
		obj.thatPoint.x += 5;
		obj.thatPoint.y += 5;
		
		var a = (obj.thatPoint.x - obj.thisPoint.x) 
		var b = (obj.thatPoint.y - obj.thisPoint.y) 
		var c = Math.sqrt(a*a + b*b);
		ld = linkConnector.dims.height / 2;
		
		var theta =  Math.atan2(obj.thatPoint.x - obj.thisPoint.x, obj.thatPoint.y - obj.thisPoint.y)
		var mct = Math.cos(theta);
		var mst = Math.sin(-theta)
		
			var x1 = (obj.thisPoint.x)*mct - (obj.thisPoint.y)*mst;
			var ogx1 = x1 - obj.thisPoint.x;
			x1 -=ogx1 
			
			var y1 = (obj.thisPoint.x)*mst + (obj.thisPoint.y)*mct
			var ogy1 = y1 - obj.thisPoint.y;
			y1 -=ogy1;
			
			var x2 =(obj.thisPoint.x)*mct - (obj.thisPoint.y + c)*mst
			var ogx2 = x2 - obj.thisPoint.x;
			x2-=ogx1;
			
			var y2 = (obj.thisPoint.x)*mst + (obj.thisPoint.y + c)*mct
			var ogy2 = y2 - obj.thisPoint.y + c;
			y2-=ogy1;
			
			var x3 = (obj.thisPoint.x + stroke)*mct - (obj.thisPoint.y + c)*mst
			var ogx3 = x3 - obj.thisPoint.x + stroke
			x3-=ogx1;
			
			var y3 =  (obj.thisPoint.x + stroke)*mst + (obj.thisPoint.y + c)*mct		
			var ogy3 = y3 - obj.thisPoint.y+c;
			y3-=ogy1;
			
			var x4 = (obj.thisPoint.x + stroke)*mct - (obj.thisPoint.y)*mst
			var ogx4 = x4 - obj.thisPoint.x + stroke;
			x4-=ogx1;
			
			var y4 = (obj.thisPoint.x + stroke)*mst + (obj.thisPoint.y)*mct
			var ogy4 = y4 - obj.thisPoint.y;
			y4-=ogy1;
		
		
		var linePoints = [ {
			x : x1,
			y : y1
		}, {
			x : x2,
			y : y2
		},
		{
			x : x3,
			y : y3	
		},
		
		{
			x : x4,
			y : y4
			
		}
		
		];
		
		newLine.setPoints(linePoints);
		this.line = newLine;
		linesLayer.layer.add(this.line);

		linesLayer.layer.draw();

		return this;

	}

}

function lineBox(dbo) {
	this.layer = dbo.layer
	var self = this;
	this.label = dbo;
	var height = linkConnector.dims.height; // 10;
	var strokeWidth = linkConnector.dims.stroke; // 1;
	this.box = new Kinetic.Group();
	// this.id = Math.random();
	
	
	
	this.box2 = new Kinetic.Rect({
		width : 10,
		height : height,
		name : "green",
		fill : "blue",
		stroke : "green",
		strokeWidth : strokeWidth
	});
	this.lastColor = "blue";
	this.setToDefaultColor = function() {
		this.box2.setFill("blue");
	}
	this.setToLinkedColor = function () {
		this.box2.setFill("red")
	}
	this.setToSelectedColor = function () {
		this.box2.setFill("yellow")
	}
	
	
	this.box2.on("mouseover", function() {self.box2.setStroke("pink"); self.layer.draw()})
	this.box2.on("mouseout", function() {self.box2.setStroke("blue"); self.layer.draw()})
	
	var selfBox = self.box2;
	this.box.add(this.box2)
	this.height = height + strokeWidth;
	this.box.clicked = false;

	this. box2str = function ( e ) {
		return JSON.stringify ( [ this.label.root.id,
					this.label.listLabel.getObjectPointer(),
					this.index] );
	}

	
	
	this.untoggle = function() {
		console.log(this.lastColor);
		self.box2.setFill(this.lastColor);
		this.layer.draw();
	} 
		
	this.toggle = function(selfBox) {
		self.box2.clicked = !self.box2.clicked;
		//var 
		var fc = (self.box2.attrs.fill)
		//console.log("looog");
		if (fc != "yellow")
			this.lastColor = self.box2.attrs.fill;

		self.box2.setFill("yellow");
		self.box2.setStroke('green');
		// lp.selectBox(self);
		self.layer.draw();
	}
	
	this.unsetToggle = function(selfBox) {
		//self.box2.clicked = false;
		self.box2.setFill('red');
		self.box2.setStroke('green');
	//	self.layer.draw();
	}

	this.unselect = function() {
		// this.toggle();
	}

	this.select = function() {
		// this.toggle();
	}

	this.box.on("mousedown", function() {
		lp.selectBox(self);
	})
	this.layer.on("dragmove", function() {self.handleDragMove()}) // elf.ll.update({"this":}));

	this.drawIn = function(ll) {
		for ( var l in ll) {

				if (ll[l].thatBox.label.listLabel.container.parent.isHidden || ll[l].thisBox.label.listLabel.container.parent.isHidden)
					continue;
				
			var al = ll[l].addLine({
				"thisPoint" : ll[l].thisBox.getAbs(),
				"thatPoint" : ll[l].thatBox.getAbs()
			});
			linesLayer.render();
			al.line.ll = self;
			al.line.al = al;

			al.line.on("mouseover", function(e) {
				// al changes value based on scope
				//if (al.line) {
					e.shape.setFill("pink"); 
					linesLayer.render()}
				//}
			)
			al.line.on("mouseout", function(e) {
				//if (al.line) {
					e.shape.setFill("red"); 
					linesLayer.render()}
				//}
			)
			
			al.line.on("click", function(e) {
				e.shape.al.thisBox.removeForeignLink(e.shape.al);
				e.shape.al.thisBox.removeLineFromClick(e.shape.al);
				linesLayer.render(); 
			})
		}		
	}
	
	this.hasHiddenParents = function (f) {
		//var f = this;
		// try {
		// } catch (e) { }
		while (f.parent) {
		// take out when finished / it works
		// if (++i >= 15) break
		// needs to reset the scrollbar heights.....
			if (f.isListContainer) {
				//this.level++;
				if (f.isHidden)
					return true;
			}
			f = f.parent;
		}
		return false;
	}
	
	this.drawLine = function() {
		
		// console.log(self.ll)
		// if (self.linkedBox) {
		// self.linkedBox.ll.layer.remove(self.linkedBox.ll.line)
		// clear the lines connecting to this
		var ok = true;
		var boxes = [];

		if (self.fl) {
				self.drawIn(self.fl);

		}
	
		for ( var l in self.ll) {
				//self.ll[l].clearLine();
				//if (self.ll[l]
				//console.log(self.ll[l]);
				//console.log("1^1^1^");
				
				
				if (self.ll[l].thisBox.label.listLabel.container.parent.isHidden || self.ll[l].thatBox.label.listLabel.container.parent.isHidden) 
					continue

				var al = self.ll[l].addLine({
					"thisPoint" : self.getAbs(),
					"thatPoint" : self.ll[l].thatBox.getAbs()
				});
				al.line.al = al;
				linesLayer.render();
				
				al.line.on("mouseover", function(e) {
					//if (e.shape.line) {
						e.shape.setFill("pink"); 
						linesLayer.render()}
					//}
				)
				al.line.on("mouseout", function(e) {
					//if (al.line) {
						e.shape.setFill("red"); 
						linesLayer.render()}
					//}
				)
				al.line.on("click", function(e) {
					e.shape.al.thisBox.removeForeignLink(e.shape.al)
					e.shape.al.thisBox.removeLineFromClick(e.shape.al);
					linesLayer.render(); 
				})
			}
	}
	

	
	

	
	
	
	



	this.removeForeignLink = function(line) {
		var curstr = line.thisBox.box2str();
		var laststr = line.thatBox.box2str();
		//console.log("xxxx")
		if ( directedGraph.hasOwnProperty(laststr) ) {
			for ( var i in directedGraph[laststr]) {
				console.log(directedGraph[laststr][i])
				console.log( line.thisBox.label.root.id + " " +line.thisBox.label.listLabel.getObjectPointer())
				if (    directedGraph[laststr][i].id === line.thisBox.label.root.id &&
					directedGraph[laststr][i].ptr === line.thisBox.label.listLabel.getObjectPointer() &&
					directedGraph[laststr][i].index === line.thisBox.index ) {
				//		console.log("laksdjflkajfdslkj")
						directedGraph[laststr].splice(i,1);
					}


			}

		}
		if ( directedGraph.hasOwnProperty(curstr) ) {
			for ( var i in directedGraph[curstr]) {

				if (    directedGraph[curstr][i].id === line.thatBox.label.root.id &&
					directedGraph[curstr][i].ptr === line.thatBox.label.listLabel.getObjectPointer() &&
					directedGraph[curstr][i].index === line.thatBox.index ) {


						directedGraph[curstr].splice(i,1);
					}


			}

		}
	}
		
	this.removeLineFromClick = function(line, rb) {
		//this.removeForeignLink(line)
		for (var e in line.thisBox.ll) {
			if (line.thisBox.ll[e] == line) {
				line.thisBox.ll.splice(e,1)
				
				var fll = true;
				if (line.thisBox.hasOwnProperty("fl"))
					var fll = line.thisBox.fl.length == 0 ? true : false;
				
				
				if (line.thisBox.ll.length == 0 && fll && !rb) {
					line.thisBox.remove();
				}
				
				
				
				for (var q =0; q < line.thisBox.linkedBoxes.length; q++) {
					//console.log(line.thisBox.linkedBoxes[q]);
					//console.log(line.thisBox)
					if (line.thisBox.linkedBoxes[q] == line.thatBox) {
						line.thisBox.linkedBoxes.splice(q, 1);
						//console.log("i am here as thisBox")
					}
				}
							
			}
		}
		
		
		
		for (var e in line.thatBox.fl) {
			if (line.thatBox.fl[e] == line) {
				line.thatBox.fl.splice(e, 1) 
				
				var fll = true;
				if (line.thatBox.hasOwnProperty("ll"))
					var fll = line.thatBox.ll.length == 0 ? true : false;
				
				
				if (line.thatBox.fl.length == 0 && fll && !rb) {
					line.thatBox.remove();
				}
				
			//	console.log(line.thatBox.linkedBoxes.length + " < thatBox");

				for (var q =0; q < line.thatBox.linkedBoxes.length; q++) {
				//	console.log(line.thatBox.linkedBoxes[q]);
					//console.log(line.thatBox);
					if (line.thatBox.linkedBoxes[q] == line.thisBox) {
						line.thatBox.linkedBoxes.splice(q, 1);
						//console.log("i am here as that box..")
					}
					
				}
				
				
			}
		}
		

		
		line.clearLine();
		

	}
	
	this.handleDragMove = function(e) {
		this.drawLine()
		linesLayer.render();
		
	}
	
	//this.handleDragMove = handleDragMove;
	// var tester = function() {ll.redraw();};
	// this.box.on("dragend", self.handleDragMove);

	this.redrawLinkBoxes = function() {
		for (var v in self.label.links) {
			//console.log("lablLInk");
			//console.log(self.label.links[v]);
			var link = self.label.links[v];
			link.drawLine();
		}
		linesLayer.render();
	}
	
	this.setLinked = function(linkedBox, og) { // called from ll object

		if (!this.linkedBoxes)
			this.linkedBoxes = [];

		
		
		
		this.linkedBoxes.push(linkedBox)
		var self = this;
		
		if (!this.ll) {
			this.ll = [];
		}
		
		var llayer = null
		var isLinked = false
		var lb =false;
		for (var i in linkedBox.ll) {
			if (linkedBox.ll[i].thatBox == self) {
				// should use box2.setSelected
				linkedBox.ll[i].thatBox.box2.setFill("red");
				if (!this.fl)
					this.fl = [];
				
				this.fl.push(linkedBox.ll[i])
				
				
				//lb = linkedBox.ll[i];
				isLinked = true;
				break;
			}
		}
		
		if (!isLinked) {		
			var llayer = new linesLayer({
				"thisBox" : self,
				"thatBox" : linkedBox
			});
			this.ll.push(llayer);
		}
		
		this.box2.setFill("red");
		if (!this.underLC) {
			if (!og) {
				this.underLC = self.label.addLinkConnector();
			}
			
			//this.redrawLinkBoxes();
			
		}
		this.redrawLinkBoxes();

		
		this.label.setContainerSpace();
		this.label.layer.draw();


	}


	this.connectLine = function() {
		self.link
	}
	this.setX = function(x) {
		this.box.setX(x);

	}
	this.getAbs = function() {
		return this.box.getAbsolutePosition();
	}
	this.setY = function(y) {
		this.box.setY(y);
	}


	this.getX = function() {
		return this.box.getX();

	}
	this.getY = function() {
		return this.box.getY();

	}


	var xp = this;

	if (!lineBox.childBoxes)
		lineBox.childBoxes = [];

	lineBox.childBoxes.push(this.box);
}

linkExpander.dims = {
	height : 20,
	stroke : 1,
	width : 10,
};

function linkExpander(o) {
	// this.layer = o.layer
	var self = this;
	var height = linkConnector.dims.height; // 10;
	var strokeWidth = linkConnector.dims.stroke; // 1;
	this.box = new Kinetic.Rect({
		width : linkExpander.dims.width,
		height : linkExpander.dims.height,
		name : "le",
		fill : "brown",
		stroke : "black",
		strokeWidth : linkExpander.dims.stroke
	});
	// this.height = height + strokeWidth;
}

inherit(listLabel, contextLabel)
function contextLabel(o) {
	reinherit(contextLabel, this);
	this.superConstructor(o);
	this.container = o;
	var self = this;
	o.layer.draggable(false);

	this.textOutline.on("mouseup", function(evt) {
		evt.stopImmediatePropagation();
	})

	this.getPath = function(o) {
		return this.RgetPath(o, []).reverse();
	}

	this.RgetPath = function(o, t) {

		t.push(o.text);

		if (o.parent)
			if (o.parent.parent)
				if (o.parent.parent.text)
					t = this.RgetPath(o.parent.parent, t)

		return t;
	}
	this.textOutline.on("dblclick", function(evt) {
		evt.preventDefault();
	})
	this.textOutline.on("mousedown", function(evt) {
		// if (evt.which==3) {
		// alert("test")
		if (o.root.callback) {
			o.root.callback(self);// .getPath(o))
		}
		// var g = self.getPath(o);

		switch (self.dbObject.text) {
		case "new collection":
			// alert("hiii")
			// do something
			// generate blank db object
			// with the ability to rename it...
			// create new layer...
			// delete prior one..
			var pos = stage.getMousePosition();
			o.x = (pos.x);
			o.y = (pos.y);
			
			
			o.obj = {
				"__":{"id":guid()},
				"right_click_me" : {}
			}
			var dbItem = new rootGraphItem(o);
			
			//dbItem.id = guid();			
			dbItem.mRender();

			delete self.dbObject.root.initStage.initted;

			self.dbObject.layer.suicide();
			break;
		}
		// evt.stopPropagation()
		evt.stopImmediatePropagation();
		// alert('hi')
		return;
	});
}

inherit(listLabel, graphLabel)
function graphLabel(o) {
	reinherit(graphLabel, this);
	this.superConstructor(o);
	this.container = o;
	var self = this;
	this.fresh = true;

	this.textOutline.on("mouseup", function(evt) {
		if (evt.which == 3) {

			if (initStage.initted) {
				initStage.initted.remove();
				delete self.initted;
			}

			initStage.initted = rightClickGraphItem(self);
			evt.stopImmediatePropagation();
			// initStage.initted = self.container.root;
			return;
		}
	})

	this.textOutline.on("mousedown", function(evt) {
		if (evt.which == 3) {
			// alert("DMT")
			o.layer.draggable(false);
		} else
			o.layer.draggable(true);
		// evt.stopPropagation()
		evt.stopImmediatePropagation();
		return;
	});

	self.textOutline.on("dblclick", function(evt) {
		self.addRemoveContainer();
		self.container.layer.draw();
		// alert('test...');
		// self.dboPtr.addDBO();
		// alert(self.dboPtr.order)
	});
}

inherit(listLabel, DBListLabel)
function DBListLabel(o) {
	reinherit(DBListLabel, this);
	this.superConstructor(o);
	this.container = o;
	var self = this;
	self.textOutline.on("click", function(evt) {
		self.addRemoveContainer();
		self.container.layer.draw();
		// alert('test...');
		// self.dboPtr.addDBO();
		// alert(self.dboPtr.order)
	});
}

function cloneObject(o) {
	return JSON.parse(JSON.stringify(o));
}


inherit(labelBox, listLabel)
function listLabel(o) {
	reinherit(listLabel, this);

	// alert(o);
	this.superConstructor(o);
	// alert(this.height);
	this.container = o;
	var self = this;

	/*
	 * this.textOutline.on("mousedown", function(evt) { // if (evt.which==3) {
	 * evt.stopImmediatePropagation(); return; });
	 */

	this.addObject = function(v) {
		var p = this.getObjectPointer();
		// var b = o.root.obj;
		// console.log("o.root.obj" + p + "[\""+v+"\"] = {}");
		//console.log(o.root.obj);
		eval("o.root.obj" + p + "[\"" + v + "\"] = {}");
		return o.root.obj;
	}

	this.setObjectArray = function(a, v) {
		var p = "";
		for ( var i = 0; i < a.length; i++)
			p += a[i];

		eval("o.root.obj" + p + "[\"" + v + "\"] = {}");

	}
	
	

	this.renameForeignLinks = function(line) {
		
		
		console.log("Line:");
		console.log(line);
		return;
		
		var curstr = line.thisBox.box2str();
		var laststr = line.thatBox.box2str();
		//console.log("xxxx")
		if ( directedGraph.hasOwnProperty(laststr) ) {
			for ( var i in directedGraph[laststr]) {
				console.log(directedGraph[laststr][i])
				console.log( line.thisBox.label.root.id + " " +line.thisBox.label.listLabel.getObjectPointer())
				if (    directedGraph[laststr][i].id === line.thisBox.label.root.id &&
					directedGraph[laststr][i].ptr === line.thisBox.label.listLabel.getObjectPointer() &&
					directedGraph[laststr][i].index === line.thisBox.index ) {
				//		console.log("laksdjflkajfdslkj")
						directedGraph[laststr][i].ptr 
					}


			}

		}
		if ( directedGraph.hasOwnProperty(curstr) ) {
			for ( var i in directedGraph[curstr]) {

				if (    directedGraph[curstr][i].id === line.thatBox.label.root.id &&
					directedGraph[curstr][i].ptr === line.thatBox.label.listLabel.getObjectPointer() &&
					directedGraph[curstr][i].index === line.thatBox.index ) {


						directedGraph[curstr].splice(i,1);
					}


			}

		}
	}

	this.isdependent = function( haystack, needle ) {
		var ptrdependent = function ( haystack, needle ) {
			var hsa = ptrSplit(haystack),
			    na =  ptrSplit(needle);
			for ( var i = 0; i < hsa.length && i < na.length ; i++ ) {
				if ( hsa[i] !== na[i] ) {
					return false;
				} else if ( i + 1 === na.length ) {
					return true;
				}
			}
		}

		var hso = s2o(haystack),
		    no  = s2o(needle);

		if ( hso.id === no.id && ptrdependent(hso.ptr, no.ptr) ) {
			return true;
		}
		return false;
	}
	
	this.deleteObject= function( ) {
		console.log("called");

		var oldObjStr = myforeignstring ({
			id: self.container.root.id,
			ptr: oldPtr,
			index: 0
		});

		for ( var i in directedGraph ) {
			if ( this.isdependent ( i, oldObjStr)) {
				console.log("also deleting: " + i);
				dependants.push(i);
			}
		}



	}

	this.renameObject = function(newName) {

		function renameobjptr(str, newPtr) {
			var o = s2o(str);
			newPtr +=  o.ptr.slice(oldPtr.length, o.ptr.length);
			return newPtr;
		}

		var oldPtr = this.getObjectPointer();
		
		if (newName == o.text) 
			return;
		var oga = this.getObjPointer(this.container, []).reverse();
		//var a = oga.reverse();
		//var g = n;
		//var d = a.pop();
		var p = "";
		for ( var i = 0; i < oga.length-1; i++)
			p += oga[i];
		
		var zz = "";
		for ( var i = 0; i < oga.length; i++)
			zz += oga[i];
	
		
		var g = eval("o.root.obj"+zz);
		var f = cloneObject(g);
		eval("o.root.obj" + p + "." + newName + " = f");
		
	
		eval("delete o.root.obj"+ zz);
		o.text = newName;
		
		var newPtr = this.getObjectPointer();
		
		var oldObjStr = myforeignstring ({
			id: self.container.root.id,
			ptr: oldPtr,
			index: 0
		});
		
		
		var renameme = [];
		
		var newdgraph = {};
		var dependants = [];
		for ( var i in directedGraph ) {
			if ( this.isdependent ( i, oldObjStr)) {
				// delete (i) and rename with newPtr
				console.log("Renaming from: " + i);
				dependants.push(i);
			}
		}

		function renamelinks(newdgraph, i, dependants, newPtr ) {
			var rc = [];
			for ( var x in directedGraph[i] ) {
				var pushme = "";
				console.log(directedGraph[i][x]);
				if (dependants.indexOf(directedGraph[i][x]) > -1) {
					//console.log("hit");
					var xnewptrstring = renameobjptr(directedGraph[i][x], newPtr);
					var xnewstr=myforeignstring({id:s2o(directedGraph[i][x]).id, ptr:xnewptrstring,index: s2o(directedGraph[i][x]).index });

					pushme = xnewstr;
				} else {
					pushme = directedGraph[i][x];
				}
				rc.push(pushme);
			}
			return rc;
		}

		for ( var i in directedGraph) {
			var index = dependants.indexOf(i);
			if ( index > -1 ) {
				var newptrstring = renameobjptr(i, newPtr);
				var newstr=myforeignstring({id:s2o(i).id, ptr:newptrstring,index: s2o(i).index });
				newdgraph[newstr] = renamelinks(newdgraph, i, dependants, newPtr);

			} else {
				newdgraph[i] = renamelinks(newdgraph, i, dependants, newPtr);
			}
		}
		directedGraph = newdgraph;
		
	}

	this.getObjectArray = function() {
		var n = this.getObjPointer(this.container, []).reverse();
		return n;
	}
	
	this.arrayToPointer = function(ar) {
		var p = "";
		for ( var i = 0; i < ar.length; i++)
			p += ar[i];
		return p;
	}

	this.getObjectPointer = function() {
		var n = this.getObjPointer(this.container, []).reverse();
		var p = "";
		for ( var i = 0; i < n.length; i++)
			p += n[i];
		return p;
	}
	
	
	this.getObjArray = function() {
		return this._getObjArray(this.container, []).reverse();	
	}
	
	this._getObjArray = function(o, t) {

		t.push(o.text);

		if (o.parent)
			if (o.parent.parent)
				if (o.parent.parent.text)
					t = this._getObjArray(o.parent.parent, t)

		return t;
	}	
	

	this.getObjPointer = function(o, t) {

		t.push("[\"" + o.text + "\"]");

		if (o.parent)
			if (o.parent.parent)
				if (o.parent.parent.text)
					t = this.getObjPointer(o.parent.parent, t)

		return t;
	}

	this.remove = function() {
		// alert("try");
		this.container.remove();

	}

	this.getObjFromPointer = function() {
		// return;
		var gp = o.root.obj;
		var g = this.getObjPointer(this.container, []);
		g.reverse();
		var p = "";
		for ( var i = 0; i < g.length; i++)
			p += g[i];
		return eval("gp" + p)
	}

	// need to make a proper object wrapper, put o.obj, and o.functions..
	// (o.getChild(name)) ..({this.
	this.addRemoveContainer = function(hidden) {
		if (!self.show) {
			// alert("t1111");
			if (!self.container.hiddenListContainer) {
				// alert("test...2222");
				// this.addListContainer

				var g = this.getObjFromPointer(o);
				var c = 0;
				var lc = false;
				var ft = false;
				for ( var e in g) {
					if (!lc) {
						// ft = 10
						// alert('test');
						//if (hidden) console.log("test...");
						var lc = self.container.addListContainer(hidden);
					}
					// if (self.container.root instanceof rootDBItem)
					// lc.insertDBListItem(e)
					// else
					var f = lc.insertListItem(e);
					ft = e;
					if (ohc(g[o])) {
						f.listLabel.container.listLabel.textOutline.setFill("pink");
					}
					
					//self.container.hiddenListContainer = self.container.listContainer;
					//delete self.container.listContainer;
					// break;
					//if (!nd)
					//	self.container.layer.draw();

					// alert("test");
				}
				// self.parent.pushItemsDown(this.index+1, this.getHeight());

				if (lc) {
					if (self.container.root.multiRender && !self.container.root.hasScrollbar) {
						lc.setClipping();
						self.container.root.hasScrollbar = true
					}
					// /if (ft)
					// if (ft != "acid")
					lc.parent.setContainerSpace()
					// self.container.layer.draw();
					// self.container.parent.pushItemsDown(self.container.index+1,
					// self.container.getHeight());//setContainerSpace();
					// lc.setClipping();
					// self.container.root.render();

				}
				// make new subObject
				// step out fo the object, reverse the path and then research
				// using the obj
			} else {

				self.container.showListContainer();
				//if (!nd)
				//	self.container.layer.draw();

				for (var i =0; i < self.container.listContainer.listItems.length; i++) {
					self.container.listContainer.listItems[i].setLinesFromObj();
				}
				
				self.container.traverseSubElements( function(e) { 
					e.parent.isHidden = false;
					e.setLinesFromObj();
				})
				
				

				
				
				// o.layer.draw();
			}
			
			self.container.traverseSubElements(function(e) { if (e.listContainer) {
				//self.hideLinks_(e.listContainer);
				e.listContainer.isHidden = false;
				}
			})
			
			self.show = true; // false;

		} else {
			
			self.container.hideLinks();
			//self.container.traverseSubElements(if ())
				
			self.container.hideListContainer();
			self.show = false;
			//if (!nd)
			self.container.layer.draw();

			// o.layer.draw();

		}
	}
}



var scrollbar = function(o) {
	// alert(JSON.stringify(dbo));
	this.group = new Kinetic.Group();
	var self = this;
	this.dbo = o;
	this.outline = new Kinetic.Rect({
		x : 0,
		y : 0,
		width : 10,
		height : this.dbo.windowHeight,
		// fill: "black",
		strokeWidth : 1
	});

	this.setBarHeight = function(o) {
		if (!o)
			var dbo = this.dbo;
		else
			dbo = o;
		this.dbo.contentHeight = dbo.contentHeight;
		this.dbo.windowHeight = dbo.windowHeight;
		var foh = dbo.windowHeight * (dbo.windowHeight / dbo.contentHeight);
		foh = (foh > dbo.windowHeight) ? dbo.windowHeight : foh
		this.bar.setHeight(foh);
		// this.bar.setY(0);
		// this.bar.setX(0);
		// var th = self.outline.getHeight()- self.bar.getHeight();

		// self.dbo.scrollContent.setY(0);
		// //self.dbo.contentHeight-self.dbo.windowHeight + self.dbo.hOffset);
		// self.dbo.scrollContent.setY(self.dbo.hOffset)
		
		self.dbo.layer.draw();
	}

	this.bar = new Kinetic.Rect({
		width : 10,
		height : 10,
		strokeWidth : 1,
		fill : "navy"
	});

	this.scrolling = false;
	this.bar.on("mouseover", function() {
		self.bar.setFill("purple");
		self.dbo.layer.draw();
		self.onBar = true;
	})
	this.bar.on("mouseout", function() {
		self.bar.setFill("navy");
		self.dbo.layer.draw();
		self.onBar = false;

	})
	this.bar.on("mousedown", function() {
		// dbo.layer.draw();
		self.onBar = true;

		self.yoOffset = self.bar.getY() - stage.getMousePosition().y;
		self.hBottom = -self.bar.getAbsolutePosition().y - self.yoOffset;
		self.hTop = self.outline.getHeight() - self.bar.getHeight();
		+self.bar.getAbsolutePosition().y + self.yoOffset;

		self.dbo.layer.draggable(false);
		stage.getDOM().addEventListener('mousemove', handleMouseMove, true);
		stage.getDOM().addEventListener('mouseup', handleMouseUp, true);
	})

	var handleMouseMove = function(evt) {
		var pos = stage.getUserPosition(evt).y + self.yoOffset;

		var th = self.outline.getHeight() - self.bar.getHeight();

		if (pos < 0)
			pos = 0;
		if (pos > th)
			pos = th;
		self.bar.setY(pos);
		// if (!dbo.hOffset) dbo.hOffset = 0;
		if (!pos || !th)
			self.dbo.scrollContent.setY(self.dbo.hOffset)
		else
			self.dbo.scrollContent.setY((-pos / th)
					* (self.dbo.contentHeight - self.dbo.windowHeight)
					+ self.dbo.hOffset);
		self.dbo.layer.draw();
		self.dbo.handleMove();
	};

	var handleMouseUp = function(evt) {
		self.dbo.layer.draggable(true);
		stage.getDOM().removeEventListener('mousemove', handleMouseMove, true);
		stage.getDOM().removeEventListener('mouseup', handleMouseMove, true);
	}

	this.setBarHeight();
	this.group.add(this.outline);
	this.group.add(this.bar);
}

function textBox(dbo) {
	this.dbObject = dbo; //[0];
	var fontSize = 14;
	var padding = 3;
	var strokeWidth = 1;
	this.text = new Kinetic.Text({
		x : padding,
		y : 0,
		stroke : "#333",
		strokeWidth : strokeWidth,
		fill : "#fff",
		text : dbo.text ? dbo.text : "double_click",
		fontSize : fontSize,
		fontFamily : "times",
		textFill : "#000",
		// padding: padding,
		align : "left",
	});
	this.textOutline = new Kinetic.Rect({
		x : 0,
		width : 0,
		height : this.height,
		name : "red",
		fill : "lightgray",
		stroke : "black",
		strokeWidth : strokeWidth
	});
	this.group = new Kinetic.Group();
	this.group.add(this.textOutline);

	this.group.add(this.text);
	// alert(JSON.stringify(this.text.getTextSize()));
	// alert(this.text.textHeight);
	// this.height = this.text.textHeight; //fontSize+padding+strokeWidth;

	// this.text.setY(this.height);

	// alert(this.height);
	var self = this;

	this.getTextHeight = function() {
		// self.dbObject.layer._draw();
		return self.text.getTextSize();
	}

	this.setSizeWithMin = function(w) {
		// self.dbObject.layer._draw();
		var width = self.text.getTextWidth() + (padding * 2) + strokeWidth;
		var aw = (width > w) ? width : w;

		self.textOutline.setWidth(aw);
	}

	this.setWidth = function(w) {
		// self.dbObject.layer._draw();
		self.height = self.text.getTextHeight() + (padding * 2) + strokeWidth + 1;
		self.text.setY(padding + .5 + (strokeWidth / 2));
		self.textOutline.setHeight(this.height);

		self.width = w;
		self.textOutline.setWidth(w);
		
		// self.group..setClipping
		
		self.group.setClippingRect({
			y : 0,
			x : 0,
			width : self.width,
			height : self.height
		});

		self.dbObject.layer.draw();
	}

	this.resizeTextOutline = function(o) {
		// alert("testtt22222t");
		// self.dbObject.layer._draw(); // removed by michael
		self.width = self.text.getTextWidth() + (padding * 2) + strokeWidth;
		// alert("testtt22222t");

		self.textOutline.setWidth(this.width);
		self.height = self.text.getTextHeight() + (padding * 2) + strokeWidth + 1;
		self.text.setY(padding + .5 + (strokeWidth / 2));
		self.textOutline.setHeight(this.height);
	}

	// this.text
	// textOutline.text

	this.modifyBoxWidth = function() {
		self.resizeTextOutline();
		// self.dbo.layer.draw();
		// this.textOutline.setWidth(this.width);
	}

	this.childBoxes = [];

	this.getX = function() {
		return self.group.getX();
	}

	this.getY = function() {
		return self.group.getY();
	}

	this.setX = function(o) {
		self.group.setX(o);
	}

	this.setY = function(o) {
		self.group.setY(o);
	}

	this.unsetMemberInput = function() {
		for ( var i = 0; i < self.childBoxes.length; i++) {
			var o = self.childBoxes[i];
			o.setStroke("blue");
		}
	}
}

inherit(labelBox, inputBox2)
function inputBox2(o) {
	
	reinherit(inputBox2, this);
	this.superConstructor(o);
	var self = this;	
	var ok = false;
	self.textOutline.on("click", function(e) {
			
			//ok = true;
		//self.setText("");
		// self.adjustX()
		// this.wi dth = text.getTextWidth();
		if (!ok ) {
			self.text.setText("");
			//self.text = ""; 
	
			self.modifyBoxWidth();
			self.dbObject.layer.draw();
			self.itemText =  "";
		}
		self.rename(true)

		ok = true;
	});
	
	
	
	
	this.write = function(evt) {
		evt.preventDefault();
		evt.stopImmediatePropagation();
		// alert(evt.keyCode);
		var shift = 16, backspace = 8, enter = 13;
		switch (evt.keyCode) {
		case shift:
			shiftKey = true;
			return;
			break;
		case enter:
			var car = self.text.getText();
			self.handleClick();
			break;

		case backspace:

			break;

		default:

			var e = evt.keyCode;
			var ee = String.fromCharCode(e);// .apply(String, someChars);
			if (e.shiftKey)
				ee = ee.toUpperCase();
			var assigned = self.text.getText() + ee;
			var car = assigned;
			break;

		}

		self.text.setText(car);

		self.modifyBoxWidth();
		self.dbObject.layer.draw();
		self.itemText = car;
	}
	
	
}


inherit(textBox, labelBox);
function labelBox(o) {
	reinherit(labelBox, this);
	this.superConstructor(o);
	var self = this;
	// alert(padding);
	this.textOutline.on("mouseover", function() {
		document.body.style.cursor = "pointer";
		self.mouseOut = false;
	});

	this.textOutline.on("mouseout", function() {
		self.mouseOut = true;
		document.body.style.cursor = "default";
	});
	var text = this.text
	
	this.doRename = function(evt) {
		if (evt.keyCode == 8) {
			evt.preventDefault();
			var t = text.getText();
			car = t.substr(0, t.length - 1);
			text.setText(car);
			self.itemText = car;
			// rename last node
			//self.renameObject = car;
			// self.text = car;
			self.modifyBoxWidth();
			self.dbObject.layer.draw();
		}

	}
	
	this.handleClick = function(evt) {
		window.removeEventListener('keypress', self.write, true);
		window.removeEventListener('keyup', self.resetModifiers, true);
		self.textOutline.setStroke("black");
		window.removeEventListener('keydown', self.doRename, true);
		stage.getDOM().removeEventListener('click', self.handleClick, true);
		self.dbObject.layer.draw();
		//FIXME!!!!!!!!!!!
		//console.log("possible fixme!!!");
		//console.log(o.listLabel.itemText);
		//Sconsole.log(self);
		try {
		self.renameObject(self.itemText);
		} catch(e) { }
	}
	
	this.rename = function(click) {
		//self.superfresh = true; 
		// alert(text.attrs.text)
		window.addEventListener('keydown', self.doRename, true);

		window.addEventListener('keypress', self.write, true);
		window.addEventListener('keyup', self.resetModifiers, true);
		self.textOutline.setStroke("red");

		self.dbObject.layer.draw();
		if (!click)
			stage.getDOM().addEventListener('click', self.handleClick, true);
		else 
			stage.getDOM().addEventListener('mouseup', self.handleClick, true);

	};

	var shiftKey = false;

	this.resetModifiers = function(evt) {
		switch (evt.keyCode) {
		case 16:
			shiftKey = false;
			break;
		}
	}

	this.write = function(evt) {
		evt.preventDefault();
		evt.stopImmediatePropagation();
		// alert(evt.keyCode);
		var shift = 16, backspace = 8, enter = 13;
		switch (evt.keyCode) {
		case shift:
			shiftKey = true;
			return;
			break;
		case enter:
			var car = text.getText();
			self.handleClick();
			break;

		case backspace:
		//	var t = text.getText();
		//	var car = t.substr(0, t.length - 1); // +car);
			// alert(car);
			break;

		default:
			// var car = String.fromCharCode(parseInt(evt.keyIdentifier, 16));
			// var g = evt.keyIdentifier.substr(2); //">>>"+
			// var e = parseInt(g, 16);
			var e = evt.keyCode;
			var ee = String.fromCharCode(e);// .apply(String, someChars);
			if (e.shiftKey)
				ee = ee.toUpperCase();
			var assigned = text.getText() + ee;
			if (assigned.match("^[a-zA-Z][a-zA-Z0-9_]*$")  != null ) {
				var car = assigned;
				break;
			}
			var car = text.getText();
			break;

		}

		text.setText(car);
		// self.adjustX()
		// this.width = text.getTextWidth();
		self.modifyBoxWidth();
		self.dbObject.layer.draw();
		self.itemText = car;
	}

	/*
	 * stage.getDOM().addEventListener('dblclick',function(evt) { //if
	 * (dbo.mouseOut) //alert('test'); })
	 */

}

inherit(textBox, inputBox);
function inputBox() {
	this.superConstructor(arguments[0]);

	// var tb = new textBox(args);
	var self = this;
	// alert(padding);
	this.textOutline.on("mouseover", function() {
		document.body.style.cursor = "pointer";
		self.mouseOut = false;
	});

	this.textOutline.on("mouseout", function() {
		self.mouseOut = true;
		document.body.style.cursor = "default";
	});

	stage.getDOM().addEventListener('click', function(evt) {
		if (self.mouseOut) {
			// alert("xxxx");
			window.removeEventListener('keydown', self.write, true);
			window.addEventListener('keyup', self.resetModifiers, true);
			self.textOutline.setStroke("black");
			self.dbObject.layer.draw();
		}
	}, true);

	stage.getDOM().addEventListener('dblclick', function(evt) {
		// if (dbo.mouseOut)
		// alert('test');
	})

	this.textOutline.on("dblclick", function() {
		// alert(text.attrs.text)
		window.addEventListener('keydown', self.write, true);
		window.addEventListener('keyup', self.resetModifiers, true);
		self.textOutline.setStroke("red");
		self.dbObject.layer.draw();
	});

	var shiftKey = false;

	this.resetModifiers = function(evt) {
		switch (evt.keyCode) {
		case 16:
			shiftKey = false;
			break;
		}
	}

	var text = this.text;

	this.write = function(evt) {
		evt.preventDefault();
		evt.stopImmediatePropagation();
		// alert(evt.keyCode);
		var shift = 16, backspace = 8;
		switch (evt.keyCode) {
		case shift:
			shiftKey = true;
			return;
			break;

		case backspace:
	//		var t = text.getText();
	//		car = t.substr(0, t.length - 1); // +car);
			// alert(car);
			break;

		default:
			var car = String.fromCharCode(evt.keyCode);
			if (!shiftKey)
				var car = car.toLowerCase();
			var car = text.getText() + car
			break;

		}

		text.setText(car);
		// self.adjustX()
		// this.width = text.getTextWidth();
		self.modifyBoxWidth();
		self.dbObject.layer.draw();

	}

};

window.onload = function() {
	initializeStage();

}

function postUp(data, callback, packet) {
	this.callback = callback;
	this.packet = packet;
	this.request = new XMLHttpRequest();
	this.request.onreadystatechange = function() {// new ajaxRequest()
		if (request.readyState == 4) {
			if (request.status == 200
					|| window.location.href.indexOf("http") == -1) {
				// alert(callback);
				callback(request.responseText, packet);
				// document.getElementById("result").innerHTML=mypostrequest.responseText
			} else {
				alert("An error has occured making the request")
			}
		}
	}
	this.request.open("POST", "post", true)
	this.request.setRequestHeader("Content-type", "application/json");

	this.request.send(data)
}

function reinherit(obj1, obj2) {
	if (obj1.prototype.superConstructor != obj2.superConstructor) {
		obj2.superConstructor = obj1.prototype.superConstructor;
	}
}
function inherit(parent, child) {
	// i'd really like to keep the constructors in arrays
	// so i can call super 
	if (child.prototype.superConstructor == undefined) {
		child.prototype.superConstructor = parent.prototype.constructor;
		child.prototype.parentObj = parent;

	}
}

