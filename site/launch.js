
// copyright 4thTemple

// this test case is really wrong
// the ui builder really should be consisting of node partial templates that loop into a UI


function mkLoadGraph() {
	var gids = []; 
	var gojs = [];
	var mids = [];
	var jobjects = [
		{"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"save as"}]}, {"dropdown":["text", '_id']}, {"button":[{"type":"handleMouseClick"}]}]}]}},
		{"DB":{"internals":{"dialogs":["_id", "name", "graph"]}}},
		["drawPtrGraph"]
	];
	for (var i =0; i < jobjects.length; i++ ) {
		gids[i] = new Graph('ptr'); //uni.addGraph();
		// var json = {"UI":{"save/load dialogue":[{"label":[{"text":"save"}, {"events":"onClick"}]}, {"label":[{"text":"load"}, {"events":"onClick"}]}]}}
		//
		var json = jobjects[i];
		//var json = {"UI":{"save menu":["save", "load"]}}
		
		/*
		var json = {"UI":{"save/load dialogue":["save", "load"]}}
		var json = {"UI":{"save/load dialogue":["save", "load"]}}
		*/
		//	universes['ptr', uni.id, 
		gids[i].setFromJSON(json, true);

		var gf = mkPtrGfx({"id":gids[i].id});
	        mids.push(gf);	
		gf.build();
		gojs.push(gf);
	}
	var uiroot = [gids[0].id, 'item', 0, 'index', 0];
	var uibtn = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 2, 'item', 0, 'item', 0, 'index', 0];
	var uidrptxt = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'index', 0];
	var uidrpid = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 1, 'index', 0];

	var o = getObject([gids[0].id, 'item', 0, 'item', 0], graphLookup);
	// probably better way of doing this...
	o.gfx.ptr.layout = "grid";
	mids[0].rebuild();

	mids[0].moveTo(250, 20, 100);
	mids[1].moveTo(0, 20);	
	mids[2].moveTo(0, 300);


	var dbname = [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'item', 1, 'index', 0];
	var dbid =  [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'item', 0, 'index', 0];
	var dbgraph = [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'item', 2, 'index', 0];

	var su = [gids[2].id, 'item', 0, 'index', 0];

	var dbDialog = [gids[1].id, 'item', 0, 'item', 0, 'item', 0];
	Graph.prototype.switchType('program', dbDialog);		

	PtrGfx.prototype.connect(uiroot, uibtn);
	PtrGfx.prototype.connect(uibtn, uidrptxt);
	PtrGfx.prototype.connect(uidrptxt, dbname);
	PtrGfx.prototype.connect(dbname, uidrpid);
	PtrGfx.prototype.connect(uidrpid, dbid);




}



function mkSaveButton() {
	var gids = []; 
	var gojs = [];
	var mids = [];
	var jobjects = [
	//{"UI":{"save/load dialogue":[{"row":{"label":[{"text":"save"}, {"events":"onClick"}]}}, {"row":{"label":[{"text":"load"}, {"events":"onClick"}]}}]}},
	//
			
		
	    		{"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"save as"}]}, {"inputbox":[{"text":"enterSomeText"}]}, {"button":[{"type":"handleMouseClick"}]}]}]}},
	    	//	{"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"load"}]}, {"inputbox":[{"text":"enterSomeText"}]}, {"button":[{"type":"onSubmit"}]}]}]}},
	    		{"DB":{"internals":{"dialogs":["name", "timestamp", "graph"]}}},
			["timeStamp"],
			{"serializeUniverse":"ptr"}//,


		//	["acid1"],["acid2"],["acid3"],["acid4"],["acid5"],["acid6"]

	    ];
	for (var i =0; i < jobjects.length; i++ ) {
		gids[i] = new Graph('ptr'); //uni.addGraph();
		// var json = {"UI":{"save/load dialogue":[{"label":[{"text":"save"}, {"events":"onClick"}]}, {"label":[{"text":"load"}, {"events":"onClick"}]}]}}
		//
		var json = jobjects[i];
		//var json = {"UI":{"save menu":["save", "load"]}}
		
		/*
		var json = {"UI":{"save/load dialogue":["save", "load"]}}
		var json = {"UI":{"save/load dialogue":["save", "load"]}}
		*/
	//	universes['ptr', uni.id, 
		gids[i].setFromJSON(json, true);

		/* display saveAs
		var gf = mkPtrGfx({"id":gids[i].id});
	        mids.push(gf);	
		gf.build();
		gojs.push(gf);
		*/
	}
	/* display saveAs
	mids[0].moveTo(450, 20, 100);
	mids[2].moveTo(200, 20);	
	mids[3].moveTo(200, 300);
	*/
/*
	mids[4].moveTo(650, 500);
	mids[5].moveTo(580, 450);
	mids[6].moveTo(510, 480);
	mids[7].moveTo(510, 350);
	mids[8].moveTo(450, 350);
	mids[9].moveTo(450, 400);
*/

	var uiroot = [gids[0].id, 'item', 0, 'index', 0];
	var uisub = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 2, 'item', 0, 'item', 0, 'index', 0];
	var uitext = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'item', 0, 'index', 0];


	var dbname = [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'item', 0, 'index', 0];
	var dbtimestamp =  [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'item', 1, 'index', 0];
	var dbgraph = [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'item', 2, 'index', 0];

	var timestamp = [gids[2].id, 'item', 0, 'index', 0];
	var su = [gids[3].id, 'item', 0, 'item', 0, 'index', 0];

/*
	var a1 = [gids[4].id, 'item', 0, 'index', 0];
	var a2 = [gids[5].id, 'item', 0, 'index', 0];
	var a3 = [gids[6].id, 'item', 0, 'index', 0];
	var a4 = [gids[7].id, 'item', 0, 'index', 0];
	var a5 = [gids[8].id, 'item', 0, 'index', 0];
	var a6 = [gids[9].id, 'item', 0, 'index', 0];
//	var a7 = [gids[10], 'item', 0, 'index', 0];
*/	

/* display saveAs
	var o = getObject([gids[0].id, 'item', 0, 'item', 0], graphLookup);

	o.gfx.ptr.layout = "grid";
	console.log(o);
	mids[0].rebuild();  //rebuild might need to be fixed to just 'build'
//	o.gfx.ptr.layout = "list";
//	mids[0].rebuild();
//	mids[0].rebuild();
// needs a modern selector interface
	
	mids[1].rebuild();
	*/
//	var dbDialog = [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'gfx', 'ptr'];
	var dbDialog = [gids[1].id, 'item', 0, 'item', 0, 'item', 0];
	Graph.prototype.switchType('program', dbDialog);
		

	Graph.prototype.connect(uiroot, uisub);
	Graph.prototype.connect(uisub, uitext);
	Graph.prototype.connect(uitext, dbname);
	Graph.prototype.connect(uisub, timestamp);
	Graph.prototype.connect(timestamp, dbtimestamp);
	Graph.prototype.connect(uisub, su);
	Graph.prototype.connect(su, dbgraph);
	
/*
	PtrGfx.prototype.connect(a1, a2);

	PtrGfx.prototype.connect(a2, a3);
	PtrGfx.prototype.connect(a2, a4);
	PtrGfx.prototype.connect(a4, a5);
	PtrGfx.prototype.connect(a3, a6);
	PtrGfx.prototype.connect(a3, a4);
*/
	Point.prototype.traverseProgram([gids[0].id, 'item', 0]);


//	mids[0].rebuild();

}

function setupCanvas(cb) {

	var wm = new WindowManager();

	wm.setup(function(){

		stageMenu.setup(); // >> this needs to be called from WindowManager
		console.log(this);

		//stageMenu.baseNode
		// should be ptrGfx.prototype.setupLinkCurve and ptrGfx.prototype.setupContextMenu

		//	ptrGfx.prototype.baseElement = stageMenu.baseElement;
		events['ptr'] = nodeEvents;
		linkCurve.prototype.setup(frame.contentWindow);       	
		contextMenu.setup();
		cb();
		
	});
	//	saveMenu.setup();
	
	

}

function loadGlobals() {
	typedGraphs = {};
	gfxLookup = {};//{"type":{}, "id":{}}; // object references by id
	lookups = {};
	lookups["gfxLookup"] = gfxLookup;
	events = {};
	graphLookup = {};
	graphObjLookup = {};
	lookups["graphLookup"] = graphLookup
	snapGrids = {};
	/*
	lookups = window.parent.window.lookups;
	Graph = window.parent.window.Graph;
	graphLookup = window.parent.window.graphLookup;
	gfxLookup = window.parent.window.gfxLookup;
	events = window.parent.window.events;
	renderedWindowElement = window.parent.window.renderedWindowElement.contentDocument.body;
	graphics = graphLookup; // probably this should be a subset from gfxLookup // this is the completed image  
	*/

	
	//var gfxLookup = {"type":{}, "id":{}}; // object references by id
	//var events = {}
	//lookups["gfxLookup"] = gfxLookup;
	//gfxCounter = {};
}


function launch() {
	loadGlobals();

	setupCanvas(function() { mkSaveButton(), mkLoadGraph()});
}

//launch();
