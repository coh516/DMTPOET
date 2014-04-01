
// copyright 4thTemple



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
	];
	for (var i =0; i < jobjects.length; i++ ) {
		gids[i] = new Graph('ptr'); //uni.addGraph();

		var json = jobjects[i];
 
		gids[i].setFromJSON(json, true);

		var gf = mkPtrGfx({"id":gids[i].id});
	        mids.push(gf);	
		gf.build();
		gojs.push(gf);
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

	    		{"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"save"}]}, {"inputbox":[{"text":"enterSomeText"}]}, {"button":[{"text":"enter text"},{"type":"handleMouseClick"}]}]}]}},
	    		{"MONGO":{"database":[{"name":"internals"},{"collection":[{"name":"dialogs"},{"object":["_id", "name", "graph", 'timestamp']}]}]}},
			["timeStamp"],
			{"serializeUniverse":"ptr"}//,


	    ];
	for (var i =0; i < jobjects.length; i++ ) {
		gids[i] = new Graph('program'); //uni.addGraph();

		var json = jobjects[i];
 
		gids[i].setFromJSON(json, true);

	//	 display saveAs
	
		var gf = mkPtrGfx({"id":gids[i].id});
	        mids.push(gf);	
		gf.build();
		gojs.push(gf);
		
	}
	mids[0].moveTo(450, 20, 100);
	mids[2].moveTo(200, 20);	
	mids[3].moveTo(200, 300);




	var uiroot = [gids[0].id, 'item', 0, 'index', 0];



	var dbdlg = [gids[1].id, 'item', 0, 'item', 0, 'item', 0, 'index', 0];

	var dbname = [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 1, 'index', 0];
	var dbid1=  [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'index', 0];
	var dbid2 =  [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'index', 1];
	
	var dbgraph = [gids[1].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 2, 'index', 0];
	var dbts = [gids[1].id,'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 3, 'index', 0]
	var uisub = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 2, 'item', 1, 'item', 0, 'index', 0];
	var uitext = [gids[0].id, 'item', 0, 'item', 0, 'item', 1, 'item', 1, 'item', 0, 'item', 0, 'index', 0];
	var timestamp = [gids[2].id, 'item', 0, 'index', 0];
	var su = [gids[3].id, 'item', 0, 'item', 0, 'index', 0];


	var o = getObject([gids[0].id, 'item', 0, 'item', 0], graphLookup);


	mids[0].rebuild(); 

	
	mids[1].rebuild();

	var dbDialog = [gids[1].id, 'item', 0, 'item', 0, 'item', 0];
		

	PtrGfx.prototype.connect(uiroot, uisub);
	PtrGfx.prototype.connect(uisub, uitext);
	PtrGfx.prototype.connect(uitext, dbname);
	PtrGfx.prototype.connect(uisub, timestamp);
	PtrGfx.prototype.connect(timestamp, dbts);
	PtrGfx.prototype.connect(uisub, su);
	PtrGfx.prototype.connect(su, dbgraph);
	
//	Point.prototype.traverseProgram([gids[0].id, 'item', 0]);


//	mids[0].rebuild();

}

function setupCanvas(cb) {

	var wm = new WindowManager();

	wm.setup(function(){

		stageMenu.setup(); 

		events['ptr'] = nodeEvents;
		linkCurve.prototype.setup(frame.contentWindow);       	
		contextMenu.setup();
		cb();
		
	});
	
	

}

function loadGlobals() {
	typedGraphs = {};
	gfxLookup = {};
	lookups = {};
	lookups["gfxLookup"] = gfxLookup;
	events = {};
	graphLookup = {};
	graphObjLookup = {};
	lookups["graphLookup"] = graphLookup
	snapGrids = {};

}


function launch() {
	loadGlobals();

	setupCanvas(function() { 
	//      mkSaveButton(); 
		mkLoadGraph()
	});
}

//launch();
