var sessions = require('./session'),
    http     = require('http'),
    static = require('node-static'),
    url = require("url");


//var file =  new(static.Server)('./site');

  
exports.opts = exports.opts||{lifetime:604800};
//exports._i;

exports.session = function( request, response, callback){
  session = sessions.lookupOrCreate(request, exports.opts);
   response.setHeader('Set-Cookie', session.getSetCookieHeaderValue());

   request.session = session;
   request.sessionRoot = sessions.sessionRoot;
   
  if (callback) callback( request, response );
  
};
//var main;
var instances = {};
exports.magicSession = function(callback, port) {
  http.createServer = function () {
  	  
    // Create a new instance of a node HttpServer
    var orig = new http.Server(function(request, response){
    	 exports.session(request, response, function(request, response){
    	 	//callback.prototype.ins;
    	 	
    	 	main = Object.create(callback.prototype);
    	 	
    	 	rq = Object.create(base.prototype); //(request, response);
    	 	rq.main = main;
    	 	var idString = randomString();
    	 	instances[randomString()] = main; 
    	 	main.idString =  instances;
    	 	main.instances = instances;
    	 	//rq.main.ins = main;
    	 	//rq.main.singleton = main;
    	 	rq.constructor(request, response);
      });
    });
    return orig;
  };
  http.createServer().listen(port);
}


function base(req,res) {
	//this.self = this;
	//this.instances = {};

	var request = req, response = res, pathname = url.parse(request.url).pathname, post; // = this.post;   
        this.setupMainBaseClass = function() {
        	main.response = response;
 		main.request = request;
 		main.session = request.session;
 		main.sessionRoot = request.sessionRoot;
 		//main.ins = main;
 		//console.log("xxxxxvvv");
		main.spit = function(data) {
			this.response.writeHead(200, {'Content-Type': 'text/plain'});
			this.response.write(data);
			this.response.end();
		}
        }
 	
	this.callPost = function() {
		main.post = post;
	  //	main.base = this;
//	  	main.prototype.ins = main;
		main.constructor();
	}
	
       	this.parsePost = function(chunk) {
       		post[pathname] += chunk;
        }
        
        this.delegate = function() {
		switch (request.method) {
			
      		  case 'GET' :
      		  	main.get = request.url;
      		  //	main.base = this;
      		  	//instances
      		  	
			main.constructor();
                        break;
           
       		 case 'POST' :
       		 	 post = {};
       		 	 post[pathname] = "";
       		 	 request.addListener('data', this.parsePost);
                         request.addListener('end', this.callPost);
                        break;
                        
                }
                
        }
        this.setupMainBaseClass();
        this.delegate();
  };

  
  
function setupFileServer(request, response) {
	request.addListener('end', function () {
		file.serve(request, response);
	});
}

function randomString(bits){var chars,rand,i,ret
  if (!bits) bits = 64;
  chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  ret=''
  // in v8, Math.random() yields 32 pseudo-random bits (in spidermonkey it gives 53)
  while(bits > 0){
    rand=Math.floor(Math.random()*0x100000000) // 32-bit integer
    // base 64 means 6 bits per character, so we use the top 30 bits from rand to give 30/6=5 characters.
    for(i=26; i>0 && bits>0; i-=6, bits-=6) ret+=chars[0x3F & rand >>> i]}
  return ret}
