	this.point = function (obj) {
		this.obj = {};
		for (var g in obj) {
			this[g] = obj[g];
			this["obj"][g] = obj[g];
		}
		this.getNext = function() {
			// should sort point order
			return this.next;
			
		}
		this.getParent = function() {
			return this.parent;
		}
		
		this.getNeighbors = function() {
			return this.neighbors;
		}
		this.us = function() {
			return o2us(this.obj);
		}
	}
	
	
	this.vectorGraph = function() {
		var dg = self.getIndexedForwardPaths();
		var hg = self.getForwardPaths();
		
		this.points = {};
		
		for (var g in dg){
			this.points[g] = new self.point(s2o(g))
			this.points[g].points = this.points;
			this.points[g].y = idLookUp[s2o(g.id)].obj.__.yabs
			this.points[g].graph = this;
			//need to set y axis
		}
		for (var g in dg)
			for(var p in dg[g]){
				var tp = this.points[this.dg[g][p]];
				
				if (!tp["parent"])
					tp["parent"] = []
				tp["parent"].push(this.points[g]);
				
				if (!tp["neighbors"])
					tp["neighbors"] = [];
				
				for (var u in hg[tp.us()])
					tp["neighbors"].push(tp.us()[u]); // needs to order based on y axis
				
				if (!tp["next"])
					tp["next"] = [];
				
				if (dg.hasOwnProperty(p))
					for (var x in dg[p])
						tp["next"].push(this.points[dg][p][x])
					
			}
		
	}
