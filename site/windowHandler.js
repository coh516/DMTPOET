function WindowManager() {
	var uni = new universe('windowManager');
	this.uniID = uni.id;
	this.setup();
}

WindowManager.prototype = {
// i guess for the time being.. just draw a square in the upper left hand corner
// one window 
//
	"setup":function() {
		this.element = document.createElement("div");
		this.mkTabs();
	}


	"mkTabs":function() {
		var o = this.buildUI({"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"editor"}]}, {"label":[{"text":"stage"}]}]}]}});
	
		var obj = uni.addGraph();
		obj.setFromJSON(o);
		var gf = new gfx(uni.id, obj, UIRenderer, this.element);
		gf.moveTo(0, 0);
		gf.build();
		
		

		// need to link the code handler through the point traverser
		//
	}
	
}


