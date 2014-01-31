/*
(c) 2004 -> 2014, 4thTemple
Seth Tenenbaum
development
*/
var graphLookup = {};
var graphics = graphLookup;
var utype = {};
var models = {}
var universes = {};
var lookups = {};
var ptrLookup = {};
lookups["graphLookup"] = graphLookup;

//setPtrIndex should create an 'indexedGraph'
// there should only be one universe.
/*
function universe(type) {
	//this.id = mkguid();
	//models[this.id] = {"graph":{}};//, "type":type};
	//if (!universes[type]) universes[type] = [];
	//universes[type].push(this);
}
universe.prototype = {
	"addGraph":function(JSON) { 
		//var gid = mkguid(); // graph id
		var type = models[this.id].type;
		var ng = new graph(this.id);
		objLookup = ng.object
		var gid = ng.id;
		//graphLookup[gid] = ng;
		var mtg = models[this.id]["graph"]
		//if (!mtg)  {
		//	models[this.id]["graph"] = {}	
		//}
		mtg[gid] = ng;
		//ng.universeid = this.id
		//models[this.id]["graph"]["id"][gid] = ng;
		//models[this.id]["graph"][gid]  = ng;
			
		graphLookup[gid] = ng; //models[this.id]["graph"]["id"][gid] //models[this.id]["graph"]["id"][gid];
		
		//	ng.objects = graphLookup[gid];
		//	ng.setFromJSON(JSON);
			
		return gid;
	},
	"getByType":function(type) {

	},
	"load":function(data) {
		models = data;
	},
	"serialize":function(graphId) {
		graphLookup[graphId] 
	}
	//models[guid] = {};
}

*/


function Graph() {
	this.id = mkguid();
	this.object = {};
	graphLookup[this.id] = this;
	//models[id]  = this;
	//var thisGraph = models[uuid]["graph"];
	//thisGraph[this.id] = {"id":{}}
	//this.object = 
	this.ptr = {};



}


var lit = [];
// this class obviosly needs some refactoring ... 
// the ptr nodes should be a class of their own....
// uuid'd with a lookup ..
//

Graph.prototype = {
	
	//todo

	// should use ptrLookup[ptr] to link to the objects to the prototype
	// ptr's shouldn't really be arrays, they should be objects wrapped around a pointer object

	"objects":{},  //["id"][id]["ptr"][ptr]["index"][index]["prop"]/["children"]/["parents"]
	// get ptr
	//
	"switchType":function(ptr,type) {
		var o = getObject(ptr, graphLookup);
		if (!o.types) o.types = {};
		o.types[type] = !o.types[type];
	},
	
	"getPtrs":function(x, ptrArray, j, results, first) {
		//// what if
		var i = 0;
		for (var g in x) {
			var xg = x[g];
			var hasChildArrays = false;

			if (!first && Array.isArray(x) && typeof xg == 'object' ) { 
				lit.push("array");
				ca = copyArray(ptrArray);
				this.getPtrs(xg, ca, i, results, true);	
				lit.pop();
			}else

			if ( Array.isArray(xg)) {
				ca = copyArray(ptrArray);

				if (!Array.isArray(x)) {
					var ji =  (lit[lit.length-1] == "array") ? j+i : j;
					ca.push(ji, g);
				}
				
				lit.push("array");
				this.getPtrs(xg, ca, i, results, true);
				lit.pop();
				hasChildArrays = true;
			}else
			if ( typeof xg === 'object' ) {
				//updatePtrString
				//console.log(JSON.stringify(xg));
				ca = copyArray(ptrArray);

				if (!Array.isArray(x)) {
				//	console.log("was array");
				//	the problem here is that the array might be of index0 and not been initialized yet...
					var ji =  (lit[lit.length-1] == "array") ? j+i : i;
				//	console.log(ptrArray);
					ca.push(ji, g);
				//	console.log("ptr pushing..."+g+"    ..."+lit.join())
					var doPop = true;
					lit.push("object");
				} 
				//console.log("is object");
				this.getPtrs(xg, ca, i, results, true);
				if (doPop) { lit.pop(); doPop = false }

			}else 
			if ( typeof xg === 'string' ) {
				var ptl = ptrArray.length;
			//	console.log("is string");

				ca = copyArray(ptrArray);

				if (!Array.isArray(x)) {
					//console.log(hasChildArrays);
					var ji =  (lit[lit.length-1] == "array" ) ? j+i : i;
				//	console.log("ptr pusing..."+g+" ..."+lit.join());
					ca.push(ji, g);
					ca.push(0, xg);		
				}
				else ca.push(i, xg);
				results.push(ca);
			}
			//first = false;
			if ( Array.isArray(xg) && Array.isArray(x))
				i+=xg.length;
			else
			i++;
		}
		//console.log("__________________________________REZULTZ__________________________");
		//console.log(results);
	},
	// should use the object from ptr, not the actual ptr....
	// object should have a refernece to the ptr
	// should put 'getter' functions instead of graphics data
	// should keep this area just text and arrays of text
	
	"_toJSON": function(ptr) {
		var o = getObject(ptr, graphLookup);
		var a = [];
		if (o["item"])
		for (var i = 0; i < o["item"].length; i++) {
			var item = o["item"][i];
			var pc = ptr.concat(["item",i]);
			var b = {};
			if (item["item"].length) {
				val = Graph.prototype._toJSON(pc);
				 b[item.value] = val;
			}
			else 
				b = item.value;
	
			a.push(b);
		}

		return a;
	},
	"toJSON": function(ptr) {
		if (!ptr) var ptr = [this.id];
		
		return Graph.prototype._toJSON(ptr);
	},

	// rebuilding to standardize the gfx ptr 
	"setFromJSON": function(obj) {
		// this should use the same model as the graphics
		//
		// recurse through object,
		var a = [];
		//	console.log(obj);
		this.getPtrs(obj, [], 0, a);
		var nobj = [];
		//console.log(a);
		//console.log("^ hea");
		for (var i =0; i < a.length; i ++) {
			obj = nobj;
			for (var j =0 ; j < a[i].length; j+=2) {
				var value = a[i][j];
				if (!obj[value])
					obj[value] = {"item":[]}
				obj[value].value = a[i][j+1];
			//	if (b)
			//		obj[value].index = [{"parents":[], "children":[]}]
				obj = obj[value]["item"];
				var lv = value;			
			}
		}
		this["item"] = nobj;
		this.recurseItems(function(ptr, obj) {
		 ////      ptrLookup[obj.ptr.join()] = new ptr(obj); // begin caching the ptr object 
		       obj.ptr = ptr 
		},[this.id, "item"])
	
	},
	"_setPtrIndex":function(o,b) {
		for (var y=0; y < o.length; y++) {
	
			if (!b && o[y].hasOwnProperty("index")) {
				delete o[y].index;
			}
			if (o[y]["item"])
				this._setPtrIndex(o[y]["item"], b);
		}
	},
	"addIndex":function(ptr) {
	
 
		var o = getObject(ptr, graphLookup);
		if (o.index === undefined) o.index = [];
		o.index.push ({"parents":[], "children":[]});
	},
	"setPtrIndex":function(b) {
		this._setPtrIndex(this["item"], b);
		this.indexPtr = true;
	},
	//this should be in gfx
	//does not bewlong here ...

	"getLabels":function(ptr) {
		//assumes we're not in the gfx node
		var a = copyArray(ptr);
		var c = []
		//	alert('test');
		while (a.length > 2) {
			var o = getObject(a, graphLookup);
			var val = o.value;
		
			//c.splice(0, 0, o.ptr);
			
			c.push(val);
			//var a = copyArray(ptr);
			a.pop(); a.pop();
		}
		return c.reverse();
	},
	// connect is where the index should be built in
	// move this to a subclass later
	// bullshit code
	/*
	"linksToRoot":function(ptr) {
		var id = ptr[0];
	
		if (graphLookup[id].type == "root")
			return ptr;
		else {
			var o = getObject(ptr, graphLookup);
			var g = false;
			
			// should only collect id's at this stage... 
			// from the id, recurse through the subnodes
			var list = graphLookup[id].getItemList();
		//	console.log("**** mamamama");
		//	console.log(list);
			for (var i=0; i < list.length; i++) { 	
		//		console.log(list[i]);
				var lia = copyArray(list[i]);
				lia.push("index");
				var liao = getObject(lia, graphLookup);
				for (idx = 0; i < liao.length; i++) {
					//lia.push(i);
					//console.log(lia);
					//console.log("fight!");
					var lio = liao[i] //getObject(lia, graphLookup);
					if (lio.parents)
					for (var lpa = 0; lpa < lio.parents.length; lpa++) {
						v = Graph.prototype.linksToRoot(lio.parents[lpa])
						//v = Graph.prototype.linksToRoot(lia[i]);
					//	console.log("------zoopie de pesce----");	
					//	if (v) console.log("treeeeeeeeeeeeeeez");
						if (!g && v) {
							g = v;
							break;
						}
					}
					lia.pop();
					if (g) break;
				}
				if (g) break;
			}
			return g;
			// recurse through 
		}
		
		// check node route 
		// for each node, check children..........
	},
	*/
	// similar to linksToRoot but only allows connections to be made that intersect through the link-index nodes strictly
	//
	//
	// 
	//
	/* 
	"linksToRoot2":function(ptr, lastPtr, initPtr) {
		var o = getObject(ptr, graphLookup);
		var g = false;
		var id = ptr[0];
		if (!initPtr) initPtr = ptr;
		if (graphLookup[id].root)
			return ptr;


		// apply type management


		// need to do some type of modularity to apply different rules based on the types of nodes...

		var v = false;
		if (o.children)
			for (var lpa = 0; lpa < o.children.length; lpa++) {
				//alert("test....");
				//var lpt = lastPtr;
				var lpj = o.children[lpa].join();
				var lpt = lastPtr;
				if (lpt)
					lpt == lastPtr.join();
					
				if (!lpt) {
					alert(lpj+" <> "+initPtr.join());
					if (lpj == initPtr.join()) {
						alert("test..");
						return true;
					}
					v = Graph.prototype.linksToRoot2(o.children[lpa], ptr, initPtr)
				} 
				if (v)
				return v;		
				if (!g && v) {
					g = v;
					break;
				}
			}	

		if (o.parents)
			for (var lpa = 0; lpa < o.parents.length; lpa++) {
				//alert("test....");
				var lpj = o.parents[lpa].join();
				//var lpt = lastPtr;
				var lpt = lastPtr;
				if (lpt)
					ptr == lastPtr.join();
					
				if (!lpt) {
					alert(lpj+" <> "+initPtr.join())
					if (lpj == initPtr.join()) {
						alert("test..");
						return true;
					}
					v = Graph.prototype.linksToRoot2(o.parents[lpa], ptr, initPtr)
				} 
					//v = Graph.prototype.linksToRoot(lia[i]);
					//	console.log("------zoopie de pesce----");
					//	if (v) console.log("treeeeeeeeeeeeeeez");
				if ( v ) return v;
			

			}

		// checkIfParen


		


		return g;
	},
	*/
	//if graph circles, should iterate through all children at the node point to indicate 'do not recurse'
	"isCircular":function (ptr, lastPtr, initPtr) {
		var o = getObject(ptr, graphLookup);
		var v = false;
		var g = false;
		if (o.children)
			for (var lpa = 0; lpa < o.children.length; lpa++) {
				//alert("test....");
				//var lpt = lastPtr;
				var lpj = o.children[lpa].join();
				//var lpt = lastPtr;
				//if (lpt)
				var lpt =  lpj == lastPtr.join();
				if (v) return v;
				if (lpj != lastPtr.join()) {
				//	alert(lpj+" <> "+initPtr.join());
					if (lpj == initPtr.join()) {
					//	alert("test..");
						return true;
					}
					v = Graph.prototype.isCircular(o.children[lpa], ptr, initPtr)
				//	if (v) return v;
				} 
				
				//return v;	
			}
		if (v) return v;
		if (o.parents)
			for (var lpa = 0; lpa < o.parents.length; lpa++) {
				//alert("test....");
				//var lpt = lastPtr;
				var lpj = o.parents[lpa].join();
				//var lpt = lastPtr;
				//if (lpt)
				var lpt = lpj == lastPtr.join();
				if (v) return v;
				if (lpj != lastPtr.join()) {
				//	alert(lpj+" <> "+initPtr.join());
					if (lpj == initPtr.join()) {
					//	alert("test..");
						return true;
					}
					v = Graph.prototype.isCircular(o.parents[lpa], ptr, initPtr)
				//	if (v) return v;
				}
				//return 	 v;
			}
		return v;		
	},
	// this should convert circular links to forward links in the process....
	// goes forward by removing backlinks
	// thank you michael weissbacher for showing me the best way to store this is as a 2d array
	"getPaths":function(ptr) {
		var pathList = {};

		this.recurse = function(ptr, visits) {
			var o = getObject(ptr, graphLookup);
	
			var x = ptr.join();	
			var pl = [];
			if (pathList[x]) 
				pl = pathList[x];
			else
				pathList[x] = pl;
			
			
			var cp = [ 'children', 'parents' ];
			for (var i =0; i < cp.length; i++) {
				var cop = cp[i];
				
				for (var lpa = 0; lpa < o[cop].length; lpa++) {
					console.log("test....children");
					var lpt = o[cop][lpa];
					var lpj = lpt.join();
					var db = false;
					for (var j=0; j < visits.length; j++) {
						var v = visits[j];
						if (lpj == v) {
							var db = true;
							break;
						}
					}
					if (db) continue;

					var v2 = copyArray(visits);
					v2.push(lpj);
				//	var val = getObject(lpt, graphLookup).gfx.graphptr.value;
					var bad = false;
					for (var k=0; k < pl.length; k++)
						if (pl[k] == lpj)
							bad = true;
					if (!bad) 
						pl.push(copyArray(lpt));

					this.recurse(lpt, copyArray(v2))
				}
			}
		
		}
		//var paths = [];
		//var ptrz = {};
		//visits[ptr] = true;
		//var pathList = {};

		var ptr2 = copyArray(ptr);
	//	ptr2.pop();
		ptr2.push('index');
		var po = getObject(ptr2, graphLookup);
		//var ptrGraph = {};
		//var visits = {};
		for (var i = 0; i < po.length; i++) {
			//var m = {};	
			//m[ptr.join] = {};
			var j = this.recurse(ptr2.concat([i]), [ptr2.concat([i]).join()]);
			console.log(j);
		}
		
		return pathList;
	},

	"connect":function(n1, n2) {
		var p = getObject(n1, graphLookup);
		var c = getObject(n2, graphLookup);


		c["parents"].push(n1);
		p["children"].push(n2);
		
		/*
		if(Graph.prototype.isCircular(n1, n2, n2)) {
			c["parents"].pop();
			p["children"].pop();
		//	alert("test...");
			return false;
		}
		*/
	//	alert("test..");
	//	alert(Graph.prototype.isCircular(n2, n1, n1, n2));
		
		

		return {"p":n1, "c":n2};
	},
	//wasted time.. awaiting cleanup
	"getParentNode":function(ptr) {
		var cptr = copyArray(ptr);

	
		while (cptr.length > 0) {

			var o = getObject(cptr, graphLookup);
			if (o.types['program'])
				return o; 
			cptr.pop();
			cptr.pop();
		} 

	},
	


	// helper functions should be mixed in at add item
	"iterateChildren":function() {

	},


 	"connect_dep":function(n1, n2) {
	
		var p = getObject(n1, graphLookup);
		var c = getObject(n2, graphLookup);
	

		c["parents"].push(n1);
		p["children"].push(n2);

		Graph.prototype.isCircular(n1, n2);
		

		return {"p":n1, "c":n2};

	},
	// this returns an array of [clean] ptrArrays
	"_getItemList":function(item) {
	//	console.log("test test test test............................................"+item);
		Graph.prototype.itemListArray.push(item);	
	},
	"getItemListFromPtr":function(ptr) {
		Graph.prototype.itemListArray = [];
		var to = getObject(ptr, graphLookup);
		//console.log(ptr);
		//console.log(to);
		//console.log("___________ptr from getItemListFromPtr____________________");	
		//console.log("to::::");
		//console.log(to);
		graphLookup[this.id]._recurseItems(to, ptr, Graph.prototype._getItemList);
		return Graph.prototype.itemListArray;
	},
	"getItemList":function(ptr) {
		if (ptr) return this.getItemListFromPtr(ptr);
		Graph.prototype.itemListArray = [];
		graphLookup[this.id].recurseItems(Graph.prototype._getItemList)
		return Graph.prototype.itemListArray;	
	},
	"_recurseItems":function(tl, a, f, props, propsArr) {
		//alert(id);
		
		for (var y=0; y < tl.length; y++) {
			if (tl[y]["item"]) {
				var b = copyArray(a);
				
				/*
				aggregator code
				.......... ....

				if (props) {
					if (!propsArr) propsArr = [];
					else
					var jp = JSON.parse(JSON.stringify(propsArr));
					for (var i = 0; i < props.length; i++) {
						if (tl[y].hasOwnProperty(props[i])) {
							if (!jp[props[i]]) propsArr[props[i]] = []
							jp[props[i]].push(tl[y][props[i]]);
						}
					}
				*/

				b.push(y);
				var stop = f(b, tl[y], propsArr);
				var c = copyArray(b);
				c.push("item");
				if (!stop) 
				Graph.prototype._recurseItems(tl[y]["item"], c, f, props, propsArr)
			}
		}
	},
	"recurseItems":function(f, ptr, props) {

		var obj; // should be from pointLookup... 
		if (ptr) Graph.prototype._recurseItems(getObject(ptr, graphLookup), ptr, f, props)
		else
			Graph.prototype._recurseItems(graphLookup[this.id]["item"], [this.id, "item"], f, props)
	},
	// all this copyArray shit is slow, for a future 
	// upgrade, i should enforce all ptr's are copied from origin

	// c -> object .. ca -> child/parent to search for
	"removeType":function(c, match, type, f) {
		var o = getObject(c, graphLookup);
		//alert(ca.join());
		//alert(type);
		for (var i =0; i < o[type].length; i++) {
			if(o[type][i].join() == match.join()) {
				o[type].splice(i, 1)
				
			}
		}			
	},

	// use keywords addSibling, removeItem, addChild 
	// iff op == "delLink" you need to pass an object which specifies the child item to delete specifically {"parent":ptr, "match":child} (or vice versa) }
	"changePtr":function(ptr, op, f) {
		//alert(op);

		var pl = ptr;
		var idv = ptr[ptr.length-1];
		var ptrc = copyArray(ptr);
		
	//	if (op == "addSibling" || op == "removeItem")  {
			pl = ptrc;
			pl.pop();
		//if (op == "addChild") pl.pop();
	//	}
		if (op == "addChild") idv =-1;

		//alert(pl);
		var gil = graphLookup[this.id].getItemList(pl);
		console.log(pl);
		console.log("gil....");
		console.log(gil);
		// op=="delLink" to be handled seperately
		for (var i =0; i < gil.length; i++) {
			var gp = gil[i];	 
			var gpj = gp.join();
			//console.log("gil test: "+gp[gp.length-1]+"   idv:"+idv );
		//	alert(gp[gp.length-1]+" "+idv);
			var deleteThis = (gp[gp.length-1] == idv && (op == "removeItem" ))
			//if (deleteThis) alert("deleteThis");
			if ( gp[gp.length-1] > idv  || deleteThis) {
				
				if (op == "addChild") {
					var gog = copyArray(gil[i])
					var go = getObject(gog, graphLookup);
						
				}

				if (op == "addSibling") {
					var gog = copyArray(gil[i]);
					var go = getObject(gog, graphLookup);
				}
				if (op == "removeItem") {
					//alert("test_r1");
					var gog = copyArray(gil[i]);
					var go = getObject(gog, graphLookup);
				}

				//console.log(go);
				for (var idx = 0; idx < go.index.length; idx++) {
					var gpc = gp.concat("index", idx).join();
					var p = go.index[idx].parents;
					// >> in the same level 
					var goi = go.index[idx];
				//	alert("test...");
					for (var pi =0; pi < p.length; pi++) {
						var po = getObject(p[pi], graphLookup);

						for (var c = 0; c < po.children.length; c++) {

							//alert("kronkik");
							var poc = copyArray(po.children[c]);
						//	var gt = copyArray(gil[i]);
						//	console.log(po.children[c].join() +" tac<0>cat "+gt);
						//	alert(po.children[c].join()+" "+gpc);
							if (po.children[c].join() == gpc) {
								var oc = copyArray(po.children[c]);
								if (op == "addChild") {
									//alert(po.children[c][1]);
									var poc2 = po.children[c];
									poc2[poc2.length-3]++;
								}
								if (op == "addSibling") {
									var pc = po.children[c].length-3;
										po.children[c][pc]++;
								}
								if (op == "removeItem") {
								//	alert("test ri1");
									if (deleteThis) {
									//	alert("test1");
										var cp = po.children[c];
									//	console.log(cp);
									//	console.log("<<<<<<<---lkj");
										po.children.splice(c, 1);

									} else {
										var pc = po.children[c].length-3;
										po.children[c][pc]--;
									}
									//} else po.children.splice(c, 1);
								}

								
								console.log("testing old parents.......");
								if(f)
								f({"oldParent":p[pi], "newParent":po.children[c]});
							}
						}
					}
					var c = go.index[idx].children;
					
					//console.log(po.children[c].join() +" tac<0>cat "+gt);
					
					for (var ci = 0; ci < c.length; ci++) {
						var co = getObject(c[ci], graphLookup) 
						for (var p = 0; p < co.parents.length; p++) {
							var cop = copyArray(co.parents[p]);
						//	alert('tewst');
							
							var gt = copyArray(gil[i]);
						
							if ( (co.parents[p].join() == gp.concat("index", idx).join())) {
							
								if (op == "addChild") {
							
									var cop2 = co.parents[p];
									cop2[cop2.length-3]++;
								}
								if (op == "addSibling") {
										var cp3 = co.parents[p].length-3;
										co.parents[p][cp3]++;
								}
								if (op == "removeItem") {
								//	alert("test.2..");
									if (deleteThis) {
									//	alert("test2");
										co.parents.splice(c, 1);
									} else {
										var pc = co.parents[p].length-3;
										co.parents[p][pc]--;
									}
								}
							
								if (f)
							       	f({"oldParent":c[ci], "oldChild": cop, "newChild":co.parents[p]});
							}
						}
					}
				}
			
			}
			var index = getObject(gp, graphLookup).index;
		
		}
	},

	"deleteNode":function(ptr, f) {
		//console.log("delete node ptr: "+ptr);
		this.changePtr(ptr, "removeItem", f)
		var a = copyArray(ptr);		
		var index = a.pop();
		var o = getObject(a, graphLookup);
		o.splice(index, 1);
		//console.log(o);
	},
	"removeParent":function(c, pa, f) {
	//	alert(ca);
		this.removeType(c, pa, "parents", f);

	},
	// c is the pointer to the parent node, ca is the child node
	"removeLink":function(pa, ca, f) {
		//alert(ca);
		this.removeType(pa, ca, "children", f);
		this.removeType(ca, pa, "parents", f);
		
	},

	"addChild":function(ptr, value, linkHandler) {


		var go = getObject(ptr, graphLookup);

		if (go.item[0]) 
			this.changePtr(ptr.concat(['item', 0]),  "addChild", linkHandler); 

		var index = ptr[ptr.length-1];

		var lbl = getObject(ptr, graphLookup);

		lbl.item.splice(0, 0,  {'item':[], 'value':value, 'ptr':ptr})
		
		var ptrc = copyArray (ptr);

		var idx = ptr[ptr.length];

		// now all the pointer elements need to be refactored
		//
	},

	"addSibling":function(ptr, value, linkHandler) {
		//console.log("add sibling ptr----------------->");
		//console.log(ptr);
		
		this.changePtr(ptr, "addSibling", linkHandler);

		var a = copyArray(ptr);
		//a.pop();a.pop();
		var index = a[a.length-1];
		a.pop();
		var lbl = getObject(a, graphLookup);
		lbl.splice(index+1, 0, {'item':[], 'value':value, 'ptr':a})
		//console.log("----------------meow");
	},


	"renamePtr":function(ptr, value) {

		var lbl = getObject(ptr, graphLookup);
		//alert(value);
		lbl.value = value;	
	},


	"showAll":function(id) {
		var ptr = this["ptr"];
		var pl = ptr.length;
		for (var g in ptr)  {
			var ptr = this["ptr"][g];
			ptr["props"]["visible"] = true;
		}
	},
	// most of this code has no real purpose...
	// most of what i code gets thrown out
	// trial, error, re-engineer
	"getItemArray":function(ptr, type) {
		var n = getObject(ptr, graphLookup);
		var hier = [n.type];
		var x = [];
		while (n = graph['..'](n.ptr)) {
			var v = getObject(n.ptr, graphLookup).type;
			x.push(v);
		}
		return x.reverse();

	},
	"getForwardValueUntil":function(id, attr, val, type, arr) {
		var o = graphLookup[id];
		type = 'ptr';
		
		for (var i =0; i < o.items.length; i++) {
			// assumes o[i][attr] is a string.. 
			if (o[i][attr] == val) {
				if (!type)
				arr.push(o[i][type]);
				return;
			}
			else arr.push(o[i][type]);
			var o = o[items][i];
		}
	},
	// reverse functions
	"getItemHierarchy":function(ptr, type) {
		var n = getObject(ptr, graphLookup);
		var hier = [n.type];
		var x = {};
		while (n = graph['..'](n.ptr)) {
			var v = getObject(n.ptr, graphLookup).type;
			x[v] = {};
			x = x[v];
		}
		return x;
	},
	"getValueOrder":function(ptr) {
		var n = getObject(ptr, graphLookup);
		var hier = [n.value];
		var x = [];
		var p2 = copyArray(ptr);
		while (p2.length > 0) {
			p2.pop();p2.pop();
			var v = getObject(p2, graphLookup).value;
			x.push(v);
		}
		return x.reverse();
	},
	"getValueHierarchy":function(ptr) {
		var n = getObject(ptr, graphLookup);
		var hier = [n.value];
		var x = {};
		while (n = Graph.prototype['..'](n.ptr)) {
			var v = getObject(n.ptr, graphLookup).value;
			x[v] = {};
			x = x[v];
		}
		return x;
	},
	"..":function(ptr) {
		//ptrs objects should be cached with a ptrObject class ... 
		var o = copyArray(ptr);
		if (o.length >=2) {
			o.pop();o.pop();
			return getObject(o, graphLookup);
		} else return false;
	},
	"setXY":function(id, x,y) {
		this["loc"].x = x;
		this["loc"].y = y;// = {"x":x, "y":y};
	},
	"setZ":function(id, z) {
		this["loc"].z = z;
	},
	"setXYZ":function(id, x,y,z) {
		this["loc"] = {"x":x, "y":y, "z":z}
	},

	"setDraggable":function(id, bool) {
		this["draggable"] = bool;
	},
	// this stuff shouldn't be here -- cleo the cat said so
	"showChildren":function(obj) {
		this["ptr"][obj.ptr]["props"]["visible"] = true;
	},

	"hideChildren":function(obj) {
	//	console.log("tgfjsdbg");
	//	console.log(obj);
		this["ptr"][obj.ptr]["props"]["visible"] = false;		
	},
		
	"showObject":function() {
		this["hidden"] = false;
	},
	"hideObject":function() {
		this["hidden"] = true;
	},

		// let's do some work on the actual application layer and get back to the lable branching...
	"branchLabel":function(lblstr) {
		// cut label items out
		// create new ones
		
	},
	"getPtrValue":function(ptr, val) {
		var obj = getObject(ptr, graphLookup);
		var ar = [];
		console.log("#####");
		console.log(ptr);
		for (var i = 0; i < obj['item'].length; i++) {
			console.log(obj['item'][i]);
			if (obj['item'][i].value == val)
				ar.push(obj['item'][i].ptr);

		}
		return ar;

	}
	/*
	"getLoc":function(ptr, ar) {
		var o = getObject(ptr, graphLookup);
		//var item = o['item'];
		var oi = 0;
		var finished= false;
		this.recurse = function(item) {
			for (var i = 0; i < item.length; i++) {
				if (item[i].value == ar[oi]) {
					oi++;
					if (ar.length == oi-1) {
						finished = item.ptr;
						return;
					}
					this.recurse(item[i]['item']);
				}
				if (oi ==0)
				this.recurse(item[i]['item']);
			}
		}
		this.recurse(o['item']);
		return finished;
	}
	*/
		// reduce the actualy child/parent hash now
}

function getGraphObject(p) {
	return getObject(p, graphLookup);
}

