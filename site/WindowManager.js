function WindowManager() {
	var uni = new universe();
	this.uniID = uni.id;
	this.setup();
}

WindowManager.prototype = {
// i guess for the time being.. just draw a square in the upper left hand corner
// one window 
//
	"setup":function() {
		// element should be id'... 
		this.element = document.createElement("div");
		this.uni = new universe(); // no need to typecast the universe
		this.mkTabs();
	},


	"mkTabs":function() {
		var o = {"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"editor"}]}, {"label":[{"text":"stage"}]}]}]}};
	
		var gid = this.uni.addGraph();
		graphLookup[gid].setFromJSON(o);
		// this might need some refactoring down the road...
		//
		// the gfx phase should be a node which gets directed from the Point phase.....
		var gf = new gfx("WindowManager", [gid], UIRenderer, document.body);
		gf.build();
		gf.moveTo(0, 0);
		
		

		// need to link the code handler through the point traverser
		//
	}
	
}


