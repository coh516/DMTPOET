var http = require('http'),
    session = require('sesh'),
    url = require("url"),
    dal = require("../data_access_layer/dal"),
    static = require('node-static'),
    mongo = require('../data_access_layer/node_modules/mongodb'),
    utils = require('./site/utils')

	
session.magicSession(main, 6789); //.listen(9876);
var file =  new(static.Server)('./site');

var BSON = mongo.BSONPure;

// move this somewhere else.. 
function setupFileServer(request, response) {
	request.addListener('end', function () {
		file.serve(request, response, function(err, result) {
			if (err) {
				console.log("error"+request.url+" "+err.message);
			}
	        });
        }).resume();
}

function cloneObject(o) {
	return JSON.parse(JSON.stringify(o));
}


function main() {
	console.log("test...");
	var self = this;
	if (this.get) {

	//	console.log(this.request, this.response);
		setupFileServer(this.request, this.response);
	}
	else //{
	if (this.post) {
	//	try {
			var data= JSON.parse(this.post['/post']);
		console.log(data);
	//	}
	}

}


/* server started */  
console.log('DMT listening on port 9876');
