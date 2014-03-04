var http = require('http'),
    session = require('sesh'),
    url = require("url"),
    dal = require("./dal"),
    static = require('node-static'),
    
    //mongo = require('mongodb'),
    
    utils = require('./site/utils')

	
session.magicSession(main, 6789); //.listen(9876);
var file =  new(static.Server)('./site');

//var BSON = mongo.BSONPure;

// move this somewhere else.. 
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

function storeData(data) {
	for (var db in data['storeData']) {
		var dbo = {};
		dbo['db'] = db;
		for (var collection in db) {
			dbo['collection'] = collection;
			dbo['document'] = db['collection'];
		}
		dal.storeData(data);	
	}
}


function main() {
//	console.log("test...");
	//var self = this;
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
	else //{
	if (this.post) {
	//	try {
		var data= JSON.parse(this.post['/post']);
		// most likely will change
		// controller
		if (data['storeData']) {
		//	console.log(JSON.stringify(data));
			dal.storeData(data['storeData'],  this.spit);
		}
		if (data['findData']) {
			dal.getData(data['findData'], this.spit);

		}
		if (data['mapReduce']) {
			console.log(JSON.stringify(data));
			dal.mapReduce(data['mapReduce'], this.spit);
		}	
		// create some type of renderId string, use that string then to wait for a get of that name
		console.log(data);
	//	}
	}

}


/* server started */  
console.log('DMT POET listening on port 6789');
