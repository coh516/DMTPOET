function PtrGfx()  {}

PtrGfx.prototype = Object.create(Gfx.prototype);
PtrGfx.prototype.connect = function(c1, c2) {

		var pt = Graph.prototype.connect(c1, c2);

		if (!pt) return;

		var c1o = getGraphObject(c1)
		var graphId1 = c1o.gfx.ptr.gfxId;
		var c2o = getGraphObject(c2);
		var graphId2 = c2o.gfx.ptr.gfxId;


		gfxLookup[graphId1].rebuild();
		gfxLookup[graphId2].rebuild();
		// add another index to the graph 

		linkCurve.prototype.drawCurves(c1);
}

PtrGfx.prototype.drawCurves = function() {
	
		linkCurve.prototype.drawCurves([this.graphId]);
		// not sure if the lineCurve should be with the renderer
	}

PtrGfx.prototype.rebuild = function() {
	// should modify with Object.getPrototypeOf(this).rebuild()
	// http://ejohn.org/blog/objectgetprototypeof/
	this.build();
		this.reindex();
		handlerData.offset = false;
// this should actually rebuild the graph, then rebuild the lines	
		return;

}
PtrGfx.prototype._rebuild = function() {

}
PtrGfx.prototype._moveCanvas = function() {
	this.drawCurves();

}
// this needs to be handled from the html renderer
PtrGfx.prototype.setNodeType = function(rect, type) {

	var o = getGraphObject(rect.nodeRoot);
	/*
	if (!o.types) o.types = {}
	*/
	o.types[type] = !o.types[type]
	gfxLookup[rect.gfxId].rebuild();

	
}


function mkPtrGfx(obj) { 
	var g = new PtrGfx();

	var baseElement;
	if (!g.baseElement) baseElement = document.body; else baseElement = g.baseElement;
	g.create({"type":"ptr", "ptr":[obj.id], "renderer":htmlRenderer, "baseElement":baseElement});
	return g;
}
