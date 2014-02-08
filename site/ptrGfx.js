function PtrGfx()  {}

PtrGfx.prototype = Object.create(Gfx.prototype);

PtrGfx.prototype.connect = function(c1, c2) {

		pt = Graph.prototype.connect(c1, c2);

		if (!pt) return;

		var c1o = getGraphObject(c1)
		var graphId1 = c1o.gfx.ptr.gfxId;
		var c2o = getGraphObject(c2);
		var graphId2 = c2o.gfx.ptr.gfxId;


		gfxLookup[graphId1].rebuild();
		gfxLookup[graphId2].rebuild();
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
// this needs to be handled from the html renderer
PtrGfx.prototype.setNodeType = function(rect, type) {
//	var p = getGraphObject(this.lastRect.)
//	console.log("xxxxxxxxxxxxxxxxxxxxx");
	//console.log(o);
	//o.type = o.type == type ? "" : type;
	//o.type = "root";
	
	//console.log(rect.ptr);
	var o = getGraphObject(rect.nodeRoot);
	/*
	if (!o.types) o.types = {}
	*/
	o.types[type] = !o.types[type]
	gfxLookup[rect.gfxId].rebuild();
	/*
	var csstype = rect.cssType; 
	var t = o.types[type];
	rect.div.setAttribute(csstype+type, t ? "label": false);
	rect.el.setAttribute(csstype+type, t ? "section":false);
	*/
	
}


function mkPtrGfx(obj) { 
	var g = new PtrGfx();
	//this gets set from WindowManager
//	console.log(g.baseElement);
	var baseElement;
	//console.log(PtrGfx.prototype);
	if (!g.baseElement) baseElement = document.body; else baseElement = g.baseElement;
//	console.log(baseElement);
	g.create({"type":"ptr", "ptr":[obj.id], "renderer":htmlRenderer, "baseElement":baseElement});
	return g;
}
