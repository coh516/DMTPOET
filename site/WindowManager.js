function setupGlobals() {
//;
}

function launch() {

//	setupGlobals();
//	var wm = new WindowManager(); wm.setup()
}


	function getSBSize(w) {
		var d = w.document, b = d.body, r = [ 0, 0 ], t;
		if (b) {
			t = d.createElement('div');
			t.style.cssText = 'position:absolute;overflow:scroll;top:-100px;left:-100px;width:100px;height:100px;';
			b.insertBefore(t, b.firstChild);
			r = [ t.offsetHeight - t.clientHeight, t.offsetWidth - t.clientWidth ];
			b.removeChild(t);
		}
		return r;
	}

function WindowManager() {

}
//WindowManager.prototype = Object.create(Gfx.prototype);
// need to clean this up
WindowManager.prototype = {
// i guess for the time being.. just draw a square in the upper left hand corner
// one window 

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
		pivot = graphLookup[graph.id]['item'][0]['item'][1]['gfx']['windowmanager'].el
		g.rebuild();
		pivot.style.width = '14px'
		
		events['windowmanager'] = new staticEvents;

		var fd = graphLookup[graph.id]['item'][0]['item'][0]['gfx']['windowmanager'].el;
		frame = document.createElement("iframe");
		//frame.onload = frameLoader;
		// shouldnt do it like this..	
		/*
		function frameLoader() { 
		c 
		
			
			loadScripts(["utils.js", "point.js", "linkCurve.js", "events.js", "htmlRenderer.js", "gfx.js", "ptrGfx.js", "contextmenu.js", "launch.js"], frame.contentDocument, function() { frame.contentWindow.launch() });
		
		} // need a way to load the documents into the content windows, generically...
		*/
		var resizeFrame = function() {
			var pvt = graphLookup[graph.id]['item'][0]['item'][1]['gfx']['windowmanager'].el.offsetWidth;
			var r = getSBSize(window);
			var w = (window.innerWidth-pvt)/2
			var h = window.innerHeight-this.frame.offsetTop+window.scrollY;//-r[0];
			this.frame.height = h;
		
			this.frame.width = w-r[1];

			//var h2  = window.document.body.scrollHeight - window.innerHeight;
			//this.frame.height -=h2;	
	//		alert(h2);
//			document.documentElement.scrollTop	
		}
		
	       //	oc.prototype = Object.create(resizeFrame);
		var rf = resizeFrame.bind({'frame':frame});
		fd.appendChild(frame);	

		var grid1 = new snapSpace();
		grid1.setupHandlers(frame.contentWindow);


		loadCSS("graph.css", frame.contentDocument);
		
		frame.contentDocument.body.onmousedown="return;";
		PtrGfx.prototype.baseElement = frame.contentDocument.body;	
		rf();
		//console.log(rf);
	


		frame2 = document.createElement("iframe");
		
		//frame2.onload = frameLoader;
		var fd = graphLookup[graph.id]['item'][0]['item'][2]['gfx']['windowmanager'].el//.appendChild(fd);

		fd.appendChild(frame2);
		frame2.contentDocument.body.onmousedown="return;";	
		
		loadCSS("rendered.css", frame2.contentDocument);
		
		var rf2 = resizeFrame.bind({'frame':frame2});
		rf2();
		window.onresize = function() { rf(), rf2() }
		window.onscroll = window.onresize;
		renderedWindowElement = frame2;
	
		console.log(frame.contentWindow);
		var grid2 = new snapSpace();
		grid2.setupHandlers(frame2.contentWindow);	
	//	PtrGfx.prototype.baseElement.appendChild(fd);




		//nodeEvents[graph.id, 'item' , 1, 'gfx', 'windowmanager'] = function
	},
	"showDesign":function() {

	},
	"showRender":function() {

	}
}


