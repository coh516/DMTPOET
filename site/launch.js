
// copyright 4thTemple

// this test case is really wrong
// the ui builder really should be consisting of node partial templates that loop into a UI


function mkLoadGraph() {
	var gids = []; 
	var gojs = [];
	var mids = [];
	var jobjects = [
		{"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"load graph"}]}, {"dropdown":["text", '_id']}, {"button":[{"type":"handleMouseClick"}, {"text":"submit"}]}]},
		{"row":[{"label":[{"text":"save"}]}, {"inputbox":[{"text":"enterSomeText"}]}, {"button":[{"text":"enter text"},{"type":"handleMouseClick"}]}]}]}},
		{"MONGO":{"database":[{"name":"internals"},{"collection":[{"name":"dialogs"},{"object":["_id", "name", "graph", 'timestamp']}]}]}},
		["drawPtrGraph"],
		{"mapReduce":[{'map':"greatest"}, 'packet']},
		["timeStamp"],
		{"serializeUniverse":"ptr"}//
		//{"find":{'name':'/./'}}
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
		console.log("---------------------------------------------------------");
		console.log(typedGraphs.ptr.length);
		}
	var uiroot2 = [gids[0].id, 'item', 0, 'index', 1];
	var uiroot3 = [gids[0].id, 'item', 0, 'index', 2];
	
	var uiroot = [gids[0].id, 'item', 0, 'index', 0];
	var uibtn = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 2, 'item', 0, 'item', 0, 'index', 0];
	var uidrptxt = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'index', 0];
	var uidrpid = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 1, 'index', 0];
	var uidrpid2 = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 1, 'index', 1];

	var o = getObject([gids[0].id, 'item', 0, 'item', 0], graphLookup);
	// probably better way of doing this...
	o.gfx.ptr.layout = "grid";
	mids[0].rebuild();

	mids[0].moveTo(450, 20, 100);
	mids[1].moveTo(0, 20);	
	mids[2].moveTo(150, 400);
	mids[3].moveTo(270, 220);
	mids[3].rebuild();
	mids[4].moveTo(150, 450);
	mids[5].moveTo(200, 500);
	mids[5].rebuild();
	mids[4].rebuild();

	var dbdlg = [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'index', 0];

	var dbname = [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 1, 'index', 0];
	var dbname2 = [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 1, 'index', 1];
	
	var dbid1=  [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'index', 0];
	var dbid2 =  [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'index', 1];
	
	var dbgraph = [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 2, 'index', 0];
	var dbgraph2 = [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 2, 'index', 1];
	
	var dbts = [gids[1].id,'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 3, 'index', 0]
	var dbts2 = [gids[1].id,'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 3, 'index', 1]
		
	var su = [gids[2].id, 'item', 0, 'index', 0];

	var dbDialog = [gids[1].id, 'item', 0, 'item', 0, 'item', 0];

	var ftbase = [gids[3].id, 'item', 0, 'index', 0];
	var ftrval = [gids[3].id, 'item', 0, 'item',0, 'index', 0];
	var ftrpkt = [gids[3].id, 'item', 0, 'item', 1, 'index', 0];
	var ftrpkt2 = [gids[3].id, 'item', 0, 'item', 1, 'index', 1];
	var ftrgr = [gids[3].id, 'item', 0, 'item', 0, 'item', 0, 'index', 0];


	var saveClick = [gids[0].id, 'item', 0, 'item', 0, 'item', 2, 'item', 2, 'item', 1, 'item', 0, 'index', 0];
	var saveText = [gids[0].id, 'item', 0, 'item', 0, 'item', 2, 'item', 1, 'item', 0, 'index', 0];
	var uisub = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 2, 'item', 0, 'item', 0, 'index', 0];
	var uitext = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'item', 0, 'index', 0];
	var timestamp = [gids[4].id, 'item', 0, 'index', 0];
	var su2 = [gids[5].id, 'item', 0, 'item', 0, 'index', 0];

	console.log(typedGraphs);
//	return;
//	var rxd = [gids[4].id, 'item', 0, 'index', 0];

	//Graph.prototype.switchType('program', dbDialog);		

	//**
	// i shouldnt be calling this directly, I should be calling the Graph.prototype.connect
	// there is an inheritant issue with the way the link curve is handled.
	// linkCurve needs to be part of the htmlRenderer 
	// because of that, it can't render the graph directly..... 
	//Graph.prototype.switchType('program', [gids[3].id, 'item', 0]);
	// apparently there is a problem adding graph items to the next slot......
		
	PtrGfx.prototype.connect(uiroot, uibtn);
	PtrGfx.prototype.connect(uiroot2, dbid1);
	PtrGfx.prototype.connect(uiroot2, dbname);
	PtrGfx.prototype.connect(uiroot2, dbts);
	//Graph.prototype.connect(ftbase, dbts);
	//Graph.prototype.connect(ftbase, dbname);
	//Graph.prototype.connect(dbid1, uidrpid);
	//Graph.prototype.connect(dbdlg, dbid1);
	//Graph.prototype.connect(dbdlg, dbname);
	//Graph.prototype.connect(ftrval, uidrptxt);
	PtrGfx.prototype.connect(dbid1, ftrpkt);
	PtrGfx.prototype.connect(dbname, ftrpkt2);
	PtrGfx.prototype.connect(dbname, ftrval);
	PtrGfx.prototype.connect(ftrpkt2, uidrptxt);
	PtrGfx.prototype.connect(ftrpkt, uidrpid);
	
	PtrGfx.prototype.connect(dbts, ftrgr);
	PtrGfx.prototype.connect(uibtn, uidrpid2);
	PtrGfx.prototype.connect(uidrpid2, dbid2);
	PtrGfx.prototype.connect(dbid2, dbgraph);
	PtrGfx.prototype.connect(dbgraph, su);
	PtrGfx.prototype.connect(uiroot3, saveClick);
	PtrGfx.prototype.connect(saveClick, saveText);

	PtrGfx.prototype.connect(saveText, dbname2);
	PtrGfx.prototype.connect(saveClick, timestamp);
	PtrGfx.prototype.connect(timestamp, dbts2);
	PtrGfx.prototype.connect(saveClick, su2);
	PtrGfx.prototype.connect(su2, dbgraph2)

//	Point.prototype.traverseProgram([gids[0].id, 'item', 0]);

}



function mkSaveButton() {
	var gids = []; 
	var gojs = [];
	var mids = [];
	var jobjects = [
	//{"UI":{"save/load dialogue":[{"row":{"label":[{"text":"save"}, {"events":"onClick"}]}}, {"row":{"label":[{"text":"load"}, {"events":"onClick"}]}}]}},
	//
			
		
	    	
	    		{"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"save"}]}, {"inputbox":[{"text":"enterSomeText"}]}, {"button":[{"text":"enter text"},{"type":"onSubmit"}]}]}]}},
	    		{"MONGO":{"database":[{"name":"internals"},{"collection":[{"name":"dialogs"},{"object":["_id", "name", "graph", 'timestamp']}]}]}},
			["timeStamp"],
			{"serializeUniverse":"ptr"}//,


		//	["acid1"],["acid2"],["acid3"],["acid4"],["acid5"],["acid6"]

	    ];
	for (var i =0; i < jobjects.length; i++ ) {
		gids[i] = new Graph('program'); //uni.addGraph();
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

	//	 display saveAs
	/*
		var gf = mkGraph({"id":gids[i].id});
	        mids.push(gf);	
		gf.build();
		gojs.push(gf);
	*/	
	}
	///* display saveAs
//	mids[0].moveTo(450, 20, 100);
//	mids[2].moveTo(200, 20);	
//	mids[3].moveTo(200, 300);
	//*/
/*
	mids[4].moveTo(650, 500);
	mids[5].moveTo(580, 450);
	mids[6].moveTo(510, 480);
	mids[7].moveTo(510, 350);
	mids[8].moveTo(450, 350);
	mids[9].moveTo(450, 400);
*/

	var uiroot = [gids[0].id, 'item', 0, 'index', 0];



	var dbdlg = [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'index', 0];

	var dbname = [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 1, 'index', 0];
	var dbid1=  [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'index', 0];
	var dbid2 =  [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'index', 1];
	
	var dbgraph = [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 2, 'index', 0];
	var dbts = [gids[1].id,'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 3, 'index', 0]
	var uisub = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 2, 'item', 0, 'item', 0, 'index', 0];
	var uitext = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'item', 0, 'index', 0];
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
	var o = getObject([gids[0].id, 'item', 0, 'item', 0], graphLookup);

//	o.gfx.ptr.layout = "grid"
///* display saveAs

	console.log(o);
	mids[0].rebuild();  //rebuild might need to be fixed to just 'build'
//	o.gfx.ptr.layout = "list";
//	mids[0].rebuild();
//	mids[0].rebuild();
// needs a modern selector interface
	
	mids[1].rebuild();
//	*/
//	var dbDialog = [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'gfx', 'ptr'];
	var dbDialog = [gids[1].id, 'item', 0, 'item', 0, 'item', 0];
	Graph.prototype.switchType('program', dbDialog);
		

	Graph.prototype.connect(uiroot, uisub);
	Graph.prototype.connect(uisub, uitext);
	Graph.prototype.connect(uitext, dbname);
	Graph.prototype.connect(uisub, timestamp);
	Graph.prototype.connect(timestamp, dbts);
	Graph.prototype.connect(uisub, su);
	Graph.prototype.connect(su, dbgraph);
	
/*
	Graph.prototype.connect(a1, a2);

	Graph.prototype.connect(a2, a3);
	Graph.prototype.connect(a2, a4);
	Graph.prototype.connect(a4, a5);
	Graph.prototype.connect(a3, a6);
	Graph.prototype.connect(a3, a4);
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

	setupCanvas(function() { 
	  //      mkSaveButton() 
		mkLoadGraph()
	});
}

//launch();
