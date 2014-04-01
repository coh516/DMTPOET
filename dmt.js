var http = require('http'),
    session = require('sesh'),
    url = require("url"),
    dal = require("./dal"),
    static = require('node-static'),
 
    utils = require('./site/utils')

	
session.magicSession(main, 6789); //.listen(9876);
var file =  new(static.Server)('./site');

function setupFileServer(request, response) {
	request.addListener('end', function () {
		file.serve(request, response, function(err, result) {
			if (err) {
				console.log("error"+request.url+" "+err.message+" "+Date());
			}
	        });
        }).resume();
}



/*
function renderGraph(obj) {
 .. not sure this is appropriate at this time... 

}
*/

function main() {

	if (this.get) {

	//	console.log(this.request, this.response);
	//	console.log(this.get);
		/*
		var srequest = this.request.substring(1);
		for (var i = 0; i < evaluatedGraphs.length; i++) {
			if (evaluatedGraphs[i]] == this.srequest
				var ml = renderGraph(this.request.substring(1));
				this.response.writeHead(200, {'Content-Type': 'text/html'});
				this.response.write(ml);
				this.response.end();
		}else
		// save this for a later date....
		*/
		setupFileServer(this.request, this.response);
	}
	else 
	if (this.post) {

		var data= JSON.parse(this.post['/post']);
		// controller
		if (data['storeData']) {
	
			dal.storeData(data['storeData'],  this.spit);
		}
		if (data['find']) {
			dal.findData(data['find'], this.spit);

		}
		if (data['mapReduce']) {
			console.log(JSON.stringify(data));
			dal.mapReduce(data['mapReduce'], this.spit);
		}	
		// need to map out a renderId string to sync to a generated graph

	}

}


/* server started */  
console.log('DMT POET listening on port 6789');
