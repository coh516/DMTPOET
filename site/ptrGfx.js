function PtrGfx()  {}

PtrGfx.prototype = Object.create(Gfx.prototype);

PtrGfx.prototype.connect = function(c1, c2) {
		//graph function provides direction (s2c,s1c) same thing
		//var v1= getObject(c1,graphLookup).ptr.value
	//	var v2 =  getObject(c2,graphLookup).ptr.value
	//	console.log("connecting..."+c1+" "+v1+"  ..  "+c2+" "+v2); 
		//console.log(c1);
		//console.log(c2);
		pt = Graph.prototype.connect(c1, c2);
		//this.drawLinks(c1, c2); // doesnt matter which one we give it
		//this.rebuild();
	
		//linkCurve.prototype.refactor(c1, c2);
		if (!pt) return;
		gfxLookup['type']['ptr'][c1[0]].rebuild();

		gfxLookup['type']['ptr'][c2[0]].rebuild();
		// add another index to the graph 

		linkCurve.prototype.drawCurves(c1);
		linkCurve.prototype.drawCurves(c2);
}

PtrGfx.prototype.drawCurves = function() {
		//console.log("test..."); 
	//	this.graphId;
		linkCurve.prototype.drawCurves([this.graphId]);
		// not sure if the lineCurve should be with the renderer
	}

PtrGfx.prototype._rebuild = function() {
	this.drawCurves();

}
PtrGfx.prototype._moveCanvas = function() {
	this.drawCurves();

}

function mkPtrGfx(obj) { 
	var g = new PtrGfx();
	
	g.create({"type":"ptr", "ptr":[obj.id], "renderer":htmlRenderer});
	return g;
}
