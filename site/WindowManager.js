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
		graph['gfx']['windowmanager'].hasIndex = false;
		g.build();
		 graphLookup[graph.id]['gfx']['windowmanager'].layout = 'grid';
		 graphLookup[graph.id]['item'][0]['gfx']['windowmanager'].hideItem = true;
	//	 graphLookup[graph.id]['item'][0]['item'][0]['gfx']['windowmanager'].hideItem = true;
		 
		 //a quick lookup system like wm['x'][0]['f'][0]['pivot'] would be ok
	//	 var [graph.id]['item'][0]['item'][1]['gfx']['windowmanager'].join()
		 
		g.rebuild();		
		events['windowmanager'] = new staticEvents;
		PtrGfx.prototype.baseElement = graphLookup[graph.id]['item'][0]['item'][0]['gfx']['windowmanager'].el;
		console.log("xx");
		//fixme
		renderedWindowElement = graphLookup[graph.id]['item'][0]['item'][2]['gfx']['windowmanager'].el

		//nodeEvents[graph.id, 'item' , 1, 'gfx', 'windowmanager'] = function
	},
	"showDesign":function() {

	},
	"showRender":function() {

	}
}


