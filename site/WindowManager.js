

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

WindowManager.prototype = {


	"setup":function(ptrStuff) {
	
		var graph = new Graph();
		graph.hasIndex = false;

		graph.setFromJSON({"x":["l","pivot", "r"]});	
		var g= new Gfx({"type":"windowmanager", "ptr":[graph.id], "renderer":htmlRenderer});
		g.hasIndex = false;
		g.build();
		 graphLookup[graph.id]['gfx']['windowmanager'].layout = 'grid';
		 graphLookup[graph.id]['item'][0]['gfx']['windowmanager'].hideItem = true;

		pivot = graphLookup[graph.id]['item'][0]['item'][1]['gfx']['windowmanager'].el
		g.build();
		pivot.style.width = '14px'
		var grid0 = new snapSpace();
		grid0.setupHandlers(window);
		events['windowmanager'] = staticEvents.prototype;
		ptrEvents[[graph.id,'item',0,'item',1,'gfx','windowmanager'].join()] = {"handleMouseDown":function() {
			console.log("testing");
		}}
		
		var fd1 = graphLookup[graph.id]['item'][0]['item'][0]['gfx']['windowmanager'].el;
		frame = document.createElement("iframe");
	
		var resizeFrame = function() {
			// memory leaks
			
			var pvt = graphLookup[graph.id]['item'][0]['item'][1]['gfx']['windowmanager'].el.offsetWidth;
			//requires update to just node offsets..
			var r = getSBSize(window);
			if (!this.type)
				var w = (window.innerWidth-pvt)/3
			else
				var w = window.innerWidth-pvt-((window.innerWidth-pvt)/3)

			var h = window.innerHeight-this.frame.offsetTop+window.scrollY;//-r[0];
			this.frame.height = h;
		
			this.frame.width = w-r[1];
			gfxLookup[g.id].reindex();
			
		}

		var resizePivot = function() {


		}
		
		var rf = resizeFrame.bind({'frame':frame, "type":1});
		fd1.appendChild(frame);	

		var grid1 = new snapSpace();
		grid1.setupHandlers(frame.contentWindow);


	
		frame2 = document.createElement("iframe");
		
		var fd2 = graphLookup[graph.id]['item'][0]['item'][2]['gfx']['windowmanager'].el
		fd2.appendChild(frame2);
		frame2.contentDocument.body.onmousedown="return;";

		renderedWindowElement = frame2;
	
		loadScripts([{"rendered.css":frame2.contentDocument},{"graph.css":frame.contentDocument}], function() {

			frame.contentDocument.body.onmousedown="return;";
			PtrGfx.prototype.baseElement = frame.contentDocument.body;	
			rf();
			ptrStuff();


		

			var grid2 = new snapSpace();
			grid2.setupHandlers(frame2.contentWindow);
		})

		var rf2 = resizeFrame.bind({'frame':frame2, "type":0});
		rf2();

		window.onresize = function() { rf(), rf2() }
	
		window.onscroll = window.onresize;

	}
}


