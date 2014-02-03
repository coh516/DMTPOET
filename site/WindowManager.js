function setupGlobals() {
	gfxLookup = {};//{"type":{}, "id":{}}; // object references by id
	lookups = {};
	lookups["gfxLookup"] = gfxLookup;
	events = {};
	graphLookup = {};
	lookups["graphLookup"] = graphLookup;
}

function launch() {

	setupGlobals();
	var wm = new WindowManager(); wm.setup()
}


function WindowManager() {

}
//WindowManager.prototype = Object.create(Gfx.prototype);

WindowManager.prototype = {
// i guess for the time being.. just draw a square in the upper left hand corner
// one window 
//
	"setup":function() {
		// element should be id'...
		//this.element = document.createElement("span");
//		this.uni = new universe(); // no need to typecast the universe
//		this.mkTabs()
	//	this.element.setAttribute("setAttribute",
		var graph = new Graph();
		//
		graph.hasIndex = false;

		// bug in the renderer doesnt allow the first element to be set as a grid.
		graph.setFromJSON({"x":["l","pivot", "r"]});	
		var g= new Gfx({"type":"windowmanager", "ptr":[graph.id], "renderer":htmlRenderer});
		g.hasIndex = false;
		g.build();
		 graphLookup[graph.id]['gfx']['windowmanager'].layout = 'grid';
		 graphLookup[graph.id]['item'][0]['gfx']['windowmanager'].hideItem = true;
	//	 graphLookup[graph.id]['item'][0]['item'][0]['gfx']['windowmanager'].hideItem = true;
		 
		 //a quick lookup system like wm['x'][0]['f'][0]['pivot'] would be ok
	//	 var [graph.id]['item'][0]['item'][1]['gfx']['windowmanager'].join()
		 
		g.rebuild();		
		events['windowmanager'] = new staticEvents;

		var fd = graphLookup[graph.id]['item'][0]['item'][0]['gfx']['windowmanager'].el;
		frame = document.createElement("iframe");
		frame.onload = function() { 
 
			frame.contentDocument.body.onmousedown="return;";
			
			loadCSS("graph.css", frame.contentDocument);
			loadScripts(["utils.js", "point.js", "linkCurve.js", "events.js", "htmlRenderer.js", "gfx.js", "ptrGfx.js", "contextmenu.js", "launch.js"], frame.contentDocument, function() { frame.contentWindow.launch() });
		
		}
		var resizeFrame = function() {
		//	alert("xxxx");
			//var st = this.frame.contentDocument.body.scrollTop;
			var w = window.innerWidth/ 2;
			var h = window.innerHeight-20;/// 2; i could get more scientific about it...
			this.frame.height = h;
			this.frame.width = w;
//			document.documentElement.scrollTop
			
		}
		var rf = resizeFrame.bind({'frame':frame});
		document.body.onresize = rf;
		document.body.onresize();
		console.log(rf);
		fd.appendChild(frame);
	


	//	var frame = document.createElement("iframe");
	//	var fd = frame.contentDocument.bod
		graphLookup[graph.id]['item'][0]['item'][2]['gfx']['windowmanager'].el//.appendChild(fd);



	//	PtrGfx.prototype.baseElement.appendChild(fd);




		//nodeEvents[graph.id, 'item' , 1, 'gfx', 'windowmanager'] = function
	},
	"showDesign":function() {

	},
	"showRender":function() {

	}
}


