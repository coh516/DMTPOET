function ProgramNode() { }

ProgramNode.prototype = {
	/*
	"getInternodes":function(ptr) {
		var a = selectByLowestY(ptr);
		a.concat(this.selectNodesChildren(ptr));
	},
	*/
	//"selectNodesByChldren":function(ptr) {
					
	//}
	"getAllChildLinks":function(ptr) {
		var a = selectByLowestY(ptr);
		a.concat(this.getInternodes(ptr));
		return a;
	},

	"isChildOf":function(ptr) {
		//var o = getObject(ptr, graphLookup);
		return (linksToRoot2(ptr)) 

	},

	"getAllDescendants":function(ptr) {
		
	},

	"getEndpoints":function(ptr) {

	},
	"getInternodes":function(ptr) {
		var desc = new selectInternodeDescendants(ptr).descendants;
		return desc;
	}
//	"getParent":function


}
// might need to change this up to allow parent programs to change the way the DataNode searches for data
function DataNode() { }
DataNode.prototype = {
	"getAllLinkNodes":function(ptr) {
		var a = selectByLowestY(ptr);
		return a;
	},
	"getAllDescendants":function(ptr) {
		var a = selectByLowestY(ptr);
		a.concat(this.getInternodes(ptr));
		return a;
	},
	"setLastProgram":function(ptr) {
		
	}
	"getAllLinksFromLastProgram":function(ptr) {
		

	}

}


function evaluate() { }
evaluate.prototype = {
	"traverseChildren":function(ptr) {
		var nextChild;
		while(nextPoint = pt.nextPoint) {
			var sibling;
			while(nextSibling = nextPoint.nextSibling) {
				traverse(nextSibling)
			}
		}
	},
	"traverseRoot":function(id) {
		//var o = getObject(ptr, graphLookup);
		//o.types['program']
	},
	

	"walk":function(ptr) {
		var id = ptr[0];
		
		var a = copyArray(root);
		a.pop();

		var ao = getObject(a, graphLookup);

		// check to see if object is a function;
		var value;

		if (ao['types']['program'])
			progName = ao['types']['value'];
		
		progStack		

		var pt = new point(root, 0, selectByLowestY);
		traverse(pt);
	},

	"run":function() {

	}
}





function selectChildLinks(ptr) {
	this.ptr = ptr;
	var o = getObject (this.ptr, graphLookup);
	var cap = [];
	for (var i = 0; i < o.children.length; i++) {
		var ctop = o.children[i].gfx.bottom + o.children[i].gfx.height;
		cap.push({'y':ctop, 'obj':o.children[i]});
		//	o.gfx
		//	need to re-index the 'gfx' component
		//	it makes no sense as it currently is set
		//	the 'label' gfx shouldn't be mixed with the index gfx
	}

	cap.sort(function (a, b) {
		return (a.y > b.y)
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



var programManager = function () {
	//this.setupProgramStack();
	this.progStack = [];
}

programManager.prototype.defineProgram = function (name, programObject) {
	if (!this.programs)
		this.programs = {}
	this.programs[name] =  programObject;
}

programManager.prototype.getProgram = function(name) {
	if (this.programs[name]) 
		return this.programs[name]
	//else return selectByLowestY;
}


/*
programManager.prototype.setupProgramStack = function(progStackPtr, nodePtr) {
	//maybe put a check in there
	var uni = new universe("programs");
	var gid = uni.addGraph();
	this.gid = gid;
	this.uid = uni;
}
*/



var progMan = new programManager();

//progMan.addProgram("UI", UI);


// assume point extends programManager.... 
//['programNode']['dataNodes']
//['programNode']['programNode']['dataNodes']

function point(ptr, sp, ogProgStack) {

	// some type of array sorting function
	this.ptr = ptr;
	//this.nextPointFunction = nextPointFunction;
	this.sp = sp;
	//this.programs = programManager.prototype.programs
	this.pointLookup = point.prototype.pointLookup


	if (!this.pointLookup[ptr.join()])
		this.pointLookup[ptr.join()] = [];
		
	this.pointLookup[ptr.join()][this.sp] = this;

	// get the nextPointFunction
	
	var o = getObject(ptr, objLookup);


	if (o.types) if (o.types['program']) {
		var progStack = copyArray(ogProgStack);
		//progStack.push
	}

	this.nextPointFunction = progMan[o.value].prototype.getChldren;


	if (this.sp == 0)
		this.children = nextPointFunction(this.ptr);
	else this.children = this.pointLookup[ptr.join()][0];

	// check if program 
}

point.prototype.pointLookup = {};

//this.nextPointFunction might need to get updated based on a program 
point.prototype = {
	get nextSibling() {
		if (this.sp < pointArray.length-1) {
			var o = getObject(ptr, graphLookup);
			var pt = this.pointLookup[o.parents][0];
			if (!this.pointLookup[pt][this.sp+1])
				return new point(pt, this.sp+1);
			else return this.pointLookup[pt][this.sp+1];
		}
		else return undefined;
	},
	get priorSibling() {
		if (this.sp > 0) {
			var o = getObject(ptr, graphLookup);
			var pt = this.pointLookup[o.parents][0];
			if (!this.pointLookup[pt][this.sp-1])
				return new point(pt, this.sp-1);
			else return this.pointLookup[pt][this.sp-1];
		}
		else return undefined;
	},
	get nextPoint() {
		if (this.children[0])
			return	new point(this.children[0], 0);
		else return undefined;
		//return pointLookup[this.ptr.join()][this.sp];
	},
	get priorPoint() {
		var o = getObject(ptr, graphLookup);
		if (o.parents[0]) {
			var pt = this.pointLookup[o.parents[0]];
			return this.pointLookup[pt][0]
		} 
		else return undefined;
		//return new point(this.pointArray[this.sp], sp, this.nextPointFunction);
	},

	"deriveNextPointFunction":function() {
		// need to check current ptr

	},

	"updatePointArray":function() {
		this.pointLookup[this.ptr][0].children = this.nextPointFunction(ptr);
	}
	//"dotDot":'',
}


// obj['parentPtr']['sp'] = point;







