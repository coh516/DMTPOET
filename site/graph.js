/*
(c) 2004 -> 2014, 4thTemple
Seth Tenenbaum
development
*/

function Graph(type, id) {
	if (!id)
		this.id = mkguid();
	else this.id = id;

	this.object = {};
	graphLookup[this.id] = {};
	if (!typedGraphs[type]) typedGraphs[type] = []
		typedGraphs[type].push(this.id);

	graphObjLookup[this.id] = this;
	if (type) graphLookup[this.id]['typedGraph'] = type; 
	this.ptr = {};

}


var lit = [];


Graph.prototype = {
	


	"objects":{}, 
	"switchType":function(ptr,type) {
		var o = getObject(ptr, graphLookup);
		if (!o.types) o.types = {};
		o.types[type] = !o.types[type];
	},
	
	"getPtrs":function(x, ptrArray, j, results, first) {
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
			
				ca = copyArray(ptrArray);

				if (!Array.isArray(x)) {
				//	the problem here is that the array might be of index0 and not been initialized yet...
					var ji =  (lit[lit.length-1] == "array") ? j+i : i;
					ca.push(ji, g);
					var doPop = true;
					lit.push("object");
				} 
				this.getPtrs(xg, ca, i, results, true);
				if (doPop) { lit.pop(); doPop = false }

			}else 
			if ( typeof xg === 'string' ) {
				var ptl = ptrArray.length;

				ca = copyArray(ptrArray);

				if (!Array.isArray(x)) {
					var ji =  (lit[lit.length-1] == "array" ) ? j+i : i;
					ca.push(ji, g);
					ca.push(0, xg);		
				}
				else ca.push(i, xg);
				results.push(ca);
			}
			if ( Array.isArray(xg) && Array.isArray(x))
				i+=xg.length;
			else
			i++;
		}
	
	},

	
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
	
		var a = [];
		this.getPtrs(obj, [], 0, a);
		var nobj = [];
	
		for (var i =0; i < a.length; i ++) {
			obj = nobj;
			for (var j =0 ; j < a[i].length; j+=2) {
				var value = a[i][j];
				if (!obj[value])
					obj[value] = {"item":[]}
				obj[value].value = a[i][j+1];
		
				obj = obj[value]["item"];
				var lv = value;			
			}
		}
		// need to start refactoring the data object from the graph function
		graphLookup[this.id]["item"] = nobj;
		this.recurseItems(function(ptr, obj) {
		       obj.ptr = ptr;
		       if (mkIndex) {
		       		obj.index = [];
				obj.index.push ({"parents":[], "children":[]});
		       }	
		},[this.id, "item"])
	
	},
	"cloneTo":function(nid,out) {
		
		var _clone = function(item, item2) {
			for (var key in item) {
			
				if (typeof item[key] !== 'object')
					item2[key] = item[key];
				if (Array.isArray(item[key]))
					item2[key] = [];
				else if (typeof item[key] === 'object' && !item[key].nodeType)
					item2[key] = {};

				if (typeof item[key] === 'object' && item[key] != undefined && !item[key].nodeType) {
			;	
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
	//does not belong here ...

	"getLabels":function(ptr) {
		var a = copyArray(ptr);
		var c = []
		while (a.length > 2) {
			var o = getObject(a, graphLookup);
			var val = o.value;
		
			
			c.push(val);
			a.pop(); a.pop();
		}
		return c.reverse();
	},

	"isCircular":function (ptr, lastPtr, initPtr) {
		var o = getObject(ptr, graphLookup);
		var v = false;
		var g = false;
		if (o.children)
			for (var lpa = 0; lpa < o.children.length; lpa++) {
			
				var lpj = o.children[lpa].join();
			
				var lpt =  lpj == lastPtr.join();
				if (v) return v;
				if (lpj != lastPtr.join()) {
					if (lpj == initPtr.join()) {
						return true;
					}
					v = Graph.prototype.isCircular(o.children[lpa], ptr, initPtr)
				} 
				
			}
		if (v) return v;
		if (o.parents)
			for (var lpa = 0; lpa < o.parents.length; lpa++) {
			
				var lpj = o.parents[lpa].join();
			
				var lpt = lpj == lastPtr.join();
				if (v) return v;
				if (lpj != lastPtr.join()) {
					if (lpj == initPtr.join()) {
						return true;
					}
					v = Graph.prototype.isCircular(o.parents[lpa], ptr, initPtr)
				}
			}
		return v;		
	},
	// this should convert circular links to forward links in the process....
	// goes forward by removing backlinks
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
	

		var ptr2 = copyArray(ptr);
		ptr2.push('index');
		var po = getObject(ptr2, graphLookup);
	
		for (var i = 0; i < po.length; i++) {
		
			var j = this.recurse(ptr2.concat([i]), [ptr2.concat([i]).join()]);
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
		Graph.prototype.itemListArray.push(item);	
	},
	"getItemListFromPtr":function(ptr) {
		Graph.prototype.itemListArray = [];
		var to = getObject(ptr, graphLookup);
	
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

	"removeType":function(c, match, type, f) {
		var o = getObject(c, graphLookup);
	
		for (var i =0; i < o[type].length; i++) {
			if(o[type][i].join() == match.join()) {
				o[type].splice(i, 1)
				
			}
		}			
	},


	

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
			pl = ptrc;
			pl.pop();
		if (op == "addChild") idv =-1;

		var gil = graphObjLookup[this.id].getItemList(pl);
	
		for (var i =0; i < gil.length; i++) {
			var gp = gil[i];	 
			var gpj = gp.join();
		
			ptrc2.join()
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
					var gog = copyArray(gil[i]);
					var go = getObject(gog, graphLookup);
				}
			
				for (var idx = 0; idx < go.index.length; idx++) {
					var gpc = gp.concat("index", idx).join();
					var p = go.index[idx].parents;
					var goi = go.index[idx];
					for (var pi =0; pi < p.length; pi++) {
						var po = getObject(p[pi], graphLookup);
						for (var c = 0; c < po.children.length; c++) {
							var poc = copyArray(po.children[c]);
					
							if (po.children[c].join() == gpc) {
								var oc = copyArray(po.children[c]);
						
								var obj = {};
								obj.obj = po.children[c];

								if (op=="removeItem" && gp == ptr.join()) {
									obj.deleteThis = po.children;
									obj.idx = c;
								}
							
								obj.f = ({"op":op, "oldParent":p[pi], "oldChild":poc, "newParent":po.children[c]})
								efs.push(obj);
							}
						}
					}
					var c = go.index[idx].children;
					
					for (var ci = 0; ci < c.length; ci++) {
						var co = getObject(c[ci], graphLookup);
						
						for (var p = 0; p < co.parents.length; p++) {
							var cop = copyArray(co.parents[p]);
							
							var gt = copyArray(gil[i]);
							if ( (co.parents[p].join() == gp.concat("index", idx).join())) {
								var oc = copyArray(co.parents[p]);
													
								var obj = {};
								obj.obj = co.parents[p];
								if (op == "removeItem" && gp == ptr.join()) {
									obj.deleteThis = co.parents
									obj.idx = p;
								}
							
								obj.f = {"op":op, "oldParent":c[ci], "oldChild": cop, "newChild":co.parents[p]}
								efs.push(obj);
							}
						}
					}
				}
			
			}
			var index = getObject(gp, graphLookup).index;
		
		}
	
		if (op == "addChild" || op == "addSibling") {

			var dupes = [];
		
			for (var i=0; i < efs.length; i++) {
				var isDupe = false;
				for (var j =0; j < dupes.length; j++)
				       if (efs[i].obj == dupes[j])
				       		isDupe = true;
		 		if (isDupe) continue;		
			
				var o = efs[i].obj;
		       		o[ptr.length-1]++;

				f(efs[i].f)
				dupes.push(efs[i].obj);
				
			}
		}


	},

	
	// this has to be handled uniquely because of the backward relinking  
	"handleDelete":function(ptr, f) {

		//alert(op);
		var efs = [];
		var pl = ptr;
		var idv = ptr[ptr.length-1];

		var ptrc = copyArray(ptr);
		var ptrc2 = copyArray(ptr);
		ptrc2.pop();	
			pl = ptrc;
			pl.pop();
	
		var id = ptr[0];
		var gil = graphObjLookup[id].getItemList(pl);

		var deleteList = [];
		var reduceList = []
		for (var i =0; i < gil.length; i++) {
			var gp = gil[i];	 
			var gpj = gp.join();

			var t1, t2;
			if ((ptr.length <= gp.length )) {
				if ( (t1=(gp[ptr.length-1] == idv)) || (t2=(gp[ptr.length-1] > idv)) ) {
					if (t1) list = deleteList;
					if (t2) list = reduceList;

					var go = getGraphObject(gp);
					for (var idx = go.index.length-1; idx >= 0; idx--) { // go.index.length; idx++) {
						var gpc = gp.concat("index", idx);
				
						var p = go.index[idx].parents;
						// >> in the same level 
						var goi = go.index[idx];

						var c = go.index[idx].children;
						for (var x=0; x < p.length; x++) {
							list.push ({"parent":p[x], "child":gpc, "type":"child"});
						}

						for (var x=0; x < c.length; x++) {
							list.push({"parent":gpc, "child":c[x], "type":"parent"})
						}
					}
				}
			}
		}

		var endPoints = {};
		var ids = {};
	
		var indexes = {};
		for (var i=0; i< deleteList.length; i++) {
	
				if (deleteList[i].type == "parent") {
					var o = getGraphObject(deleteList[i].child)
						if (deleteList[i].child[0] != deleteList[i].parent[0])
						ids[deleteList[i].child] = deleteList[i].child;
						
					for (var x =0; x < o.parents.length; x++) {
						if (o.parents[x].join() == deleteList[i].parent.join()) {
						
							var ca = copyArray(o.parents[x]);
							ca.pop();
							if (!endPoints[ca])
								endPoints[ca] = true;
							o.parents.splice(x, 1);
						}
					}

				}

				if (deleteList[i].type == "child") {
					var o = getGraphObject(deleteList[i].parent)
						if (deleteList[i].child[0] != deleteList[i].parent[0])
						ids[deleteList[i].parent] = deleteList[i].parent;
					for (var x =0; x < o.children.length; x++) {
						if (o.children[x].join() == deleteList[i].child.join()) {
						
							var ca = copyArray(o.children[x]);
							ca.pop();
							if (!endPoints[ca])
								endPoints[ca] = true;
							o.children.splice(x, 1);
						}
					}		
				}

		}
		// make unindexed list
		for (var id in ids) {
			var ca = copyArray(ids[id]);
			ca.pop();
			indexes[ca.join()] = ca;
		}


		for (var i=0; i < reduceList.length; i++) {
	
			if (reduceList[i].type == "parent") {
				var o = getGraphObject(reduceList[i].child)
				if (reduceList[i].child[0] != reduceList[i].parent[0])
				ids[reduceList[i].child] = reduceList[i].child;
				for (var x =0; x < o.parents.length; x++) {
					if (o.parents[x].join() == reduceList[i].parent.join()) {
					
						var ca = copyArray(o.parents[x]);
						ca.pop();
						if (!endPoints[ca])
							endPoints[ca] = true;
						o.parents[x][ptr.length-1]--;
					}
				}

			}

			if (reduceList[i].type == "child") {
				var o = getGraphObject(reduceList[i].parent)
				if (reduceList[i].child[0] != reduceList[i].parent[0])
				ids[reduceList[i].parent] = reduceList[i].parent;
				for (var x =0; x < o.children.length; x++) {
					if (o.children[x].join() == reduceList[i].child.join()) {
					
						var ca = copyArray(o.children[x]);
						ca.pop();
						if (!endPoints[ca])
							endPoints[ca] = true;
						o.children[x][ptr.length-1]--;
					}
				}		
			}

		
		}
		// this should be part of the return ids...
		for (var i=0; i < reduceList.length; i++)
			f({"oldParent":reduceList[i].parent});
		for (var i=0; i < deleteList.length; i++)
			f({"oldParent":deleteList[i].parent});
			
		
		return ids;
		
	},
	

	"deleteNode":function(ptr, f) {
		//console.log("delete node ptr: "+ptr);
		var an = Graph.prototype.handleDelete(ptr, f)
		var a = copyArray(ptr);		
		var index = a.pop();
		var o = getObject(a, graphLookup);
		o.splice(index, 1);
		return an;
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
