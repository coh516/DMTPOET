// All copyright to www.4thtemple.com
// mongodb lib docs at:
// https://github.com/christkv/node-mongodb-native

var
    MongoClient = require('mongodb').MongoClient,
    Db = require('mongodb').Db,
    Server = require('mongodb').Server;
    mongoip = "127.0.0.1",
    mongoport = 27017,
    serveroptions = {w : 1},
   BSON = require('mongodb').BSONPure;
   

exports.mapReduce = function(e, callback) {
  if (!e.hasOwnProperty("db") || !e.hasOwnProperty("collection")) {
    	    console.log(JSON.stringify(e));
    	    //callback('false');
        //return {rc: false, msg: "No type provided"};
    }
    //var indices = e.indices;
    //delete e.;
  //  console.log(JSON.stringify(e.packet));
	// since i can't actually store the values of 'e' in the function, apparently, i need build a function from strings.
	// potential security risk with e.mapBy and e.reduceBy .. could put a strange function in there..
	
	var mf = "function() {"
	       mf+="var packet = ["
		for (var i=0; i < e.packet.length; i++) {
			var comma = (i != e.packet.length-1) ? ", " : ""; 
			var key = Object.keys(e.packet[i])[0];
			mf+="{\""+key+'\":this.'+e.packet[i][key]+"}"+comma;
		}
		mf+="];";
	//	mf+="var mapBy ="+e.mapBy+"; var reduceBy="+e.reduceBy+";" 
	mf+='emit (this.'+e.mapBy+", {reduceBy:this."+e.reduceBy+", 'packet':packet});}"
	eval("var mapFunction = mf");

//	var mapFunction = function() { emit (this.name, {"reduceBy":'greatest', "packet":[this._id]})}
	//var reduceFunction =
	/* 
	var rf = 'function(map, values) {'
		var type = e.reduceType;
		if (type == "grestest") {
			rf+="return values.sort(function(a,b) {return a.reduceBy-b.reduceBy})}";
		}
	
	//eval("var reduceFunction = rf"); // reduceFunction.prototype.test = "12342354";
	*/
	if (e.reduceType == 'greatest')
	var reduceFunction = function(map, values) { return {"value":values.sort(function(a,b) {return a.reduceBy-b.reduceBy})[0]}};

    var client = new MongoClient(new Server(mongoip, 27017)),

        mapReduce = function (err, collection) {
                    collection.mapReduce(
			mapFunction, 
			reduceFunction, 
			{out:{ inline : 1}}, 
			function(err, results) {
				if (err) {
				console.log(JSON.stringify(results));
				console.log(err);
				console.log("----error---------------");
				}
                    		//    console.log("tree");
                   // console.log(e);
		   		callback(JSON.stringify(results));
		   
                       		client.close();
		   // 
                    		//callback(JSON.stringify(results));
				//calls++;
                    		//	console.log(calls + "<<");
                       		// res = results;
                        	//console.log(results);
				return;
                       	 //return results;
                        
                    	}
		);
        };
  //      console.log(e);
  //	var e = e;

      client.open(function(err, p_client) {
	    console.log("client opening...");
	    var db1 = client.db(e.db);
            // this is the collection we go for
           // console.log("_____"+e.collection);
            db1.collection(e.collection, mapReduce);
            });

 
}
 

exports.findData = function(e, callback) {
	//console.log("trakkkkk");
   // if (!tof) { callback(false); return }
  // var calls = 0;
   console.log("--------------");
   console.log(JSON.stringify(e));
    if (!e.hasOwnProperty("db") || !e.hasOwnProperty("collection")) {
    	    console.log("no");
    	    callback(false);
        //return {rc: false, msg: "No type provided"};
    }
    //return;
    //var indices = e.indices;
    //delete e.;
    if (e.query.hasOwnProperty('_id')) {
	   e.query['_id'] = new BSON.ObjectID(e.query._id); 
	   console.log(e.query);
    }
    var client = new MongoClient(new Server(mongoip, 27017))

        doGet = function (err, collection) {
        		console.log(e.query);
                    collection.find(e.query).toArray(function(err, results ) {
                    		//    console.log("tree");
                   // console.log(e);
		   	//callback("test");
                    	callback(JSON.stringify(results));
                    	//calls++;
                    //	console.log(calls + "<<");
                       // res = results;
                        //console.log(results);
                        client.close();
			return;
                        //return results;
                        
                    });
        };
  //      console.log(e);
      client.open(function(err, p_client) {
	    console.log("client opening...");
	    var db1 = client.db(e.db);
            // this is the collection we go for
           // console.log("_____"+e.collection);
            db1.collection(e.collection, doGet);
            });
}


exports.storeData = function(e, cb) {
    console.log("------------------------");
    if (!e.hasOwnProperty("db") || !e.hasOwnProperty("collection")) {
	    console.log("no");
	    cb(false);
    //return {rc: false, msg: "No type provided"};
    }
    
    var client = new MongoClient(new Server(mongoip, 27017))

    
    var doInsert = function (err, collection) {
    	   // console.log(err);
            collection.insert(e['document'], function(err, docs) {
            	//console.log(err)
                    if(err) {
                        //console.log(err);
                        client.close();
                        cb ('fail');
                        return;
                    }else {
                    	//console.log(e);
                    	cb('complete');
                    	client.close();
                    	return;
                    }
            });
    };
    
    client.open(function(err, p_client) {
	    console.log("client opening...");
	    var db1 = client.db(e.db);
            // this is the collection we go for
           // console.log("_____"+e.collection);
            db1.collection(e.collection, doInsert);
            });
   // return {rc: true};
}


