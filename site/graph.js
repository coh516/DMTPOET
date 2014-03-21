/*
(c) 2004 -> 2014, 4thTemple
Seth Tenenbaum
development
*/


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

// perhaps graphObjLookup should be graphFunctionLookup
//
function Graph(type, id) {
	if (!id)
		this.id = mkguid();
	else this.id = id;

	this.object = {};
	graphLookup[this.id] = {};//this;
	if (!typedGraphs[type]) typedGraphs[type] = []
		typedGraphs[type].push(this.id);
	//models[id]  = this;
	//var thisGraph = models[uuid]["graph"];
	//thisGraph[this.id] = {"id":{}}
	//graphDataLookup[this.id] = {};
	//this.data = graphDataLookup[this.id];
	//
	graphObjLookup[this.id] = this;
	if (type) graphLookup[this.id]['typedGraph'] = type; 
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
	
	"_toJSON": function(ptr, test) {
		var o = getObject(ptr, graphLookup);
		var a = [];
		var out = null;
		var lv = false;
		var le = null;
		if (o["item"])
		for (var i = 0; i < o["item"].length; i++) {
			var item = o["item"][i];
			var pc = ptr.concat(["item",i]);
			var b = {};

			lv = false;

			if (test) {
				// needs debugging.....
				console.log(JSON.stringify(test));
				console.log(JSON.stringify(pc));
				if (JSON.stringify(test) == JSON.stringify(pc))
					lv = true;
			}
			if (item["item"].length) {
				val = Graph.prototype._toJSON(pc, test).val;
				 b[item.value] = val;
				 if (lv) {
					 out = val;// b[item.value];
					 le = null;
				 }
			}
			else { 
				b = item.value;
				if (lv) {
					out = a;
					le = a.length-1;
				}
			}
	
			a.push(b);

			
		
		}

		return {'val':a, 'pointer':out, 'lastElement':le};
	},
	"toJSON": function(ptr, test) {
		if (!ptr) var ptr = [this.id];
		
		return Graph.prototype._toJSON(ptr, test);
	},


	"toObj": function(ptr, test) {
		if (!ptr) ptr = [this.id];
		var o = getGraphObject(ptr);

		var _toObj = function(obj, test, nobj, n2, lv) {
			
			var item = obj['item'];
			for (var i=0; i < item.length; i++) {
			
				var gwan = false;
				if (item[i]) {
					if (item[i]['item']) {
						if (item[i]['item'].length)
						gwan = true;
					}
				}
				if (gwan) {
					var p = {};
					var nn = nobj;
					nobj[item[i].value] = p;
					_toObj(item[i], test, p, nn, item[i].value);
				} else {
					n2[lv] = item[i].value;
				}
				       	

			}
		}
		var nobj = {};
		_toObj(o, test, nobj);
		return nobj;
	},


	// rebuilding to standardize the gfx ptr 
	"setFromJSON": function(obj, mkIndex) {
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
		// need to start refactoring the data object from the graph function
		graphLookup[this.id]["item"] = nobj;
		this.recurseItems(function(ptr, obj) {
		 ////      ptrLookup[obj.ptr.join()] = new ptr(obj); // begin caching the ptr object 
		       obj.ptr = ptr;
		       if (mkIndex) {
			//	this.addIndex(ptr);
		       		obj.index = [];
				obj.index.push ({"parents":[], "children":[]});
		       }	
		},[this.id, "item"])
	
	},
	"cloneTo":function(nid,out) {
		
		var _clone = function(item, item2) {
			//console.log(item);
			for (var key in item) {
				//console.log("key: "+key);
				//if (!item[key]) console.log(item);
	
				if (typeof item[key] !== 'object')
					item2[key] = item[key];
				if (Array.isArray(item[key]))
					item2[key] = [];
				else if (typeof item[key] === 'object' && !item[key].nodeType)
					item2[key] = {};

				if (typeof item[key] === 'object' && item[key] != undefined && !item[key].nodeType) {
				//	console.log("traversing into key "+ key);
					//console.log(item[key]);	
					_clone(item[key], item2[key]);
				}
			}
		}
		var out = {};
		_clone(graphLookup[nid], out);
		return out;
	

	},
	"switchType":function(type, ptr) {
	       var o = getGraphObject(ptr);	
		if (!o['types'])
			o['types'] = {};
		o['types'][type] = !o['types'][type];
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
	// really need to cache the ptr's....
	"ensureIndex":function(ptr) {
		var a = copyArray(ptr);
		var idx = a.pop();a.pop();
		var o = getObject(a, graphLookup);
		if (o.index === undefined) o.index = [];
		if (!o.index[idx])
			o.index[idx] = {"parents":[], "children":[]};
	},
	"setPtrIndex":function(b) {
		this._setPtrIndex(graphLookup["item"], b);
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
					//console.log("test....children");
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
			//console.log(j);
		}
		
		return pathList;
	},

	"connect":function(n1, n2) {
	
		Graph.prototype.ensureIndex(n1);
		Graph.prototype.ensureIndex(n2);
		
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
		graphObjLookup[this.id]._recurseItems(to, ptr, Graph.prototype._getItemList);
		return Graph.prototype.itemListArray;
	},
	"getItemList":function(ptr) {
		if (ptr) return this.getItemListFromPtr(ptr);
		Graph.prototype.itemListArray = [];
		graphObjLookup[this.id].recurseItems(Graph.prototype._getItemList)
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
	//
	//
	

	

	"changePtr":function(ptr, op, f) {
		//alert(op);
		var efs = [];
		var pl = ptr;
		var idv = ptr[ptr.length-1];
		if (op == "addSibling")
			idv++;
		var ptrc = copyArray(ptr);
		var ptrc2 = copyArray(ptr);
		ptrc2.pop();	
	//	if (op == "addSibling" || op == "removeItem")  {
			pl = ptrc;
			pl.pop();
		//if (op == "addChild") pl.pop();
	//	}
		if (op == "addChild") idv =-1;

		//alert(pl);
		var gil = graphObjLookup[this.id].getItemList(pl);
		console.log(pl);
		console.log("gil....");
		console.log(gil);
		// op=="delLink" to be handled seperately
		for (var i =0; i < gil.length; i++) {
			var gp = gil[i];	 
			var gpj = gp.join();
			//console.log("gil test: "+gp[gp.length-1]+"   idv:"+idv );
		//	alert(gp[gp.length-1]+" "+idv);
			//var deleteThis = (gp[gp.length-1] == idv && (op == "removeItem" ))
			//if (deleteThis) alert("deleteThis");
			//
			ptrc2.join()
			console.log(ptr.join()+" "+gp.join());
			if ((ptr.length <= gp.length )) {
				if (gp[ptr.length-1] < idv) {
					console.log(gp[ptr.length-1] +" "+idv);
					continue;
				}
				
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
				console.log("white cat!");
				console.log(go);
				for (var idx = 0; idx < go.index.length; idx++) {
					var gpc = gp.concat("index", idx).join();
					var p = go.index[idx].parents;
					// >> in the same level 
					var goi = go.index[idx];
					//alert("test...");
					console.log("LEVEL 1");
					for (var pi =0; pi < p.length; pi++) {
						var po = getObject(p[pi], graphLookup);
					//	console.log("*******************************************************************");
						for (var c = 0; c < po.children.length; c++) {
							//alert("kronkik");
							var poc = copyArray(po.children[c]);
						//	var gt = copyArray(gil[i]);
						//	console.log(po.children[c].join() +" tac<0>cat "+gt);
							console.log(po.children[c].join()+" "+gpc);
							// need to add chile first, then patch gpc
							if (po.children[c].join() == gpc) {
								var oc = copyArray(po.children[c]);
								console.log("___________________________")
								console.log(JSON.stringify(oc));
								var obj = {};
								obj.obj = po.children[c];

								if (op=="removeItem" && gp == ptr.join()) {
									obj.deleteThis = po.children;
									obj.idx = c;
								}
								/*
								
								if (op == "addChild") {
									//alert(po.children[c][1]);
									var poc2 = po.children[c];
									console.log(ptr);
									// need to fix this to the actual array pointer .. this is wrong!
								//	console.log("**********************************************#################################");
									//oc[ptr.length-1]++;
									//efs.push(poc2)
									obj.obj =  po.children[c];
									
								}
								if (op == "addSibling") {
									//var pc = po.children[c].length-3;
									//efs.push(po.children[c]);
									obj.obj =  po.children[c];

									//	po.children[c][pc]++;
								}
								if (op == "removeItem") {
								//	alert("test ri1");
									obj.obj = po.children[c];
									
									if (deleteThis) {
									//	alert("test1");
									//	var cp = po.children[c];
									//	console.log(cp);
									//	console.log("<<<<<<<---lkj");
									//	po.children.splice(c, 1);
										obj.deleteThis = true;
										obj.parentObject = po.children;
										obj.itemNumber = c;
										obj.type = 'child';
										
									} else {
									//	var pc = po.children[c].length-3;
									//	po.children[c][pc]--;
										
									}
									*/
									//} else po.children.splice(c, 1);
								//}

								
								console.log("testing old parents.......");
								//if(f)
								//f({"oldParent":p[pi], "oldChild":poc, "newParent":oc});
								obj.f = ({"oldParent":p[pi], "oldChild":poc, "newParent":po.children[c]})
								efs.push(obj);
							}
						}
					}
					var c = go.index[idx].children;
					
					//console.log(po.children[c].join() +" tac<0>cat "+gt);
					console.log("level 2!");
					for (var ci = 0; ci < c.length; ci++) {
						var co = getObject(c[ci], graphLookup);
					//	console.log("*******************************************************************");
						
						for (var p = 0; p < co.parents.length; p++) {
							var cop = copyArray(co.parents[p]);
						//	alert('tewst');
							
							var gt = copyArray(gil[i]);
							console.log(co.parents[p].join() +" "+gp.join());	
							if ( (co.parents[p].join() == gp.concat("index", idx).join())) {
								var oc = copyArray(co.parents[p]);
								console.log("___________________");
								console.log(JSON.stringify(oc));								
								var obj = {};
								obj.obj = co.parents[p];
								if (op == "removeItem" && gp == ptr.join()) {
									obj.deleteThis = co.parents
									obj.idx = p;
								}
								/*

								if (op == "addChild") {
									//console.log("**********************************************#################################");
							
									//var cop2 = co.parents[p];
									//oc[ptr.length-1]++;
									obj.obj = co.parents[p]; //cop2; 
									//efs.push(co.parents[p])
								}
								if (op == "addSibling") {
									obj.obj = co.parents[p];
									//	var cp3 = co.parents[p].length-3;
									//	co.parents[p][cp3]++;
									//oc[ptr.length-1]++;
								//	efs.push(co.parents[p]);
								}
								if (op == "removeItem") {
								//	alert("test.2..");
									obj.obj = co.parents[p];
									if (deleteThis) {
										obj.deleteThis = true;
										obj.parentObject = co.parents;
										obj.itemNumber = c;
										obj.type = 'parent';
										
									//	alert("test2");
									//	co.parents.splice(c, 1);
									} else {
									//	var pc = co.parents[p].length-3;
									//	co.parents[p][pc]--;
									}
								}
								*/
								//maybe returning this thing is smarter to do..	
								//if (f)
								//f({"oldParent":c[ci], "oldChild": cop, "newChild":oc});
								obj.f = {"oldParent":c[ci], "oldChild": cop, "newChild":co.parents[p]}
								efs.push(obj);
							}
						}
					}
				}
			
			}
			var index = getObject(gp, graphLookup).index;
		
		}
		//alert('test');
		console.log(efs);
		console.log("=========================================");
		if (op == "addChild" || op == "addSibling") {

			var dupes = [];
		
			for (var i=0; i < efs.length; i++) {
				var isDupe = false;
				for (var j =0; j < dupes.length; j++)
				       if (efs[i].obj == dupes[j])
				       		isDupe = true;
		 		if (isDupe) continue;		
					//if (dupes[efs[i].obj.join()]) continue;						
				//console.log("----------------zip");
				//if (efs[i].edited) continue;
				var o = efs[i].obj;
		       		o[ptr.length-1]++;

				f(efs[i].f)
				dupes.push(efs[i].obj);
				
			}
		}
		//return;
		if (op == "removeItem") {
			var dupes = [];
		
		
			for (var i=0; i < efs.length; i++) {
				var isDupe = false;
				if (p = efs[i].deleteThis) {
				//	alert('test...');
					p.splice( efs[i].idx, 1);
				}



				for (var j =0; j < dupes.length; j++)
				       if (efs[i].obj == dupes[j])
				       		isDupe = true;
		 		if (isDupe) continue;		
					//if (dupes[efs[i].obj.join()]) continue;						
				//console.log("----------------zip");
				//if (efs[i].edited) continue;
				
				var o = efs[i].obj;
		       		o[ptr.length-1]--;

				f(efs[i].f)
				dupes.push(efs[i].obj);
				
			}
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
	"addValueArray":function(ptr, array) {
		var a = graphObjLookup[ptr];
		a.values = array;
	},
	"appendChild":function(ptr, value, linkedHandler) {
		if (ptr.length == 1) {
			
			var g = graphLookup[ptr[0]];
			if (!g.item) 
				g.item = [{"value":value, "item":[], "ptr":[ptr[0], 'item', 0]}]
			else g.item.push({"value":value, "item":[], "ptr":[ptr[0], 'item', g.item.length]})
			return g.item[g.item.length-1];
		}
		var a = copyArray(ptr);
		//a.pop();a.pop();
		//var index = a.length-1;
		//a.pop();
		var lbl = getObject(a, graphLookup);
		lbl.item.push({'item':[], 'value':value, 'ptr':a.concat(['item', lbl.item.length])})
		return lbl.item[lbl.item.length-1];

		
	},
	//really insertChildAtBegining
	"addChild":function(ptr, value, linkHandler) {

		var go = getObject(ptr, graphLookup);
		if (go.item)
		if (go.item[0]) 
			efs = this.changePtr(ptr.concat(['item', 0]),  "addChild", linkHandler); 
		else go.item = [];
		//return;
		var index = ptr[ptr.length-1];

		var lbl = getObject(ptr, graphLookup);

		lbl.item.splice(0, 0,  {'item':[], 'value':value, 'ptr':ptr.concat(['item', 0])})
		
		var ptrc = copyArray (ptr);

	//	var idx = ptr[ptr.length];

	//	console.log(getGraphObject(ptr));
	//	for (var i=0; i < efs.length; i++) linkHandler(efs[i]);

		// now all the pointer elements need to be refactored
		//
	},

	"addSibling":function(ptr, value, linkHandler) {
		//console.log("add sibling ptr----------------->");
		//console.log(ptr);
		

		var a = copyArray(ptr);
		//a.pop();a.pop();
		this.changePtr(ptr, "addSibling", linkHandler);		
		var index = a.pop();//[a.length-1];
		var lbl = getObject(a, graphLookup);
		a.push(index+1);		
		//a.push(index+1);	
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
		//console.log("#####");
		//console.log(ptr);
		for (var i = 0; i < obj['item'].length; i++) {
		//	console.log(obj['item'][i]);
			if (obj['item'][i].value == val)
				ar.push(obj['item'][i].ptr);

		}
		return ar;

	},
	"climbToValue":function(ptr, vals) {
		var ca = copyArray(ptr);		
		while (ca.length > 0) {
			var cav = getGraphObject(ca).value;
		        for (var i=0; i < vals.length;i++)
				if (cav == vals[i]) return {"ptr":ca, "val":cav}
			ca.pop();ca.pop();
		}
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
	function getGraphObject(p) {
		return getObject(p, graphLookup);
	}				if (oi ==0)
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
GP = Graph.prototype
