function windowHandler = {

}

windowHandler.prototype = {
// i guess for the time being.. just draw a square in the upper left hand corner
// one window 
	"mkTabs":function() {
		var o = this.buildUI({"UI":{"dialog":[{"view":"grid"},{"row":[{"label":[{"text":"editor"}]}, {"label":[{"text":"stage"}]}]}]}});
	
		var uni = new universe('windowManager');
		var obj = uni.addGraph();
		obj.setFromJSON(o);
		var gf = new gfx(uni.id, obj, UIRenderer);
		// need to link the code handler through the point traverser


	}
	

}


