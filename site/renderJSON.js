function renderJSON(e) {
	// walk JSON .. should use proper iterator.. its at work. so is my phone
	var y = 0;
	var height = 10;
	this.recurse = function(o, y, pt) {
		var self = this;
		for (var g in o)  {
			if (typeof o[g] === 'object') {
				var pta = clone(pt); 
				pta.push(g)
			//	console.log("__:"+o[g]);
				console.log(y+"<begin>"+JSON.stringify(pta))
				var th = self.recurse(o[g], y+=10, pta);
				console.log(th+"<end>"+JSON.stringify(pta))
			}
		}
		return y;
	}
	this.recurse(e, 0, []);
}
renderJSON({"hello":{"hello":{"hello":"hello"}}})
