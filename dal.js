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
 


exports.getData = function(e, callback) {
	//console.log("trakkkkk");
   // if (!tof) { callback(false); return }
  // var calls = 0;
    if (!e.hasOwnProperty("db") || !e.hasOwnProperty("collection") || !e.query) {
    	    console.log("no");
    	    callback(false);
        //return {rc: false, msg: "No type provided"};
    }
    //var indices = e.indices;
    //delete e.;
    var client = new MongoClient(e.db, new Server(mongoip, 27017)),
        test = function (err, collection) {
        	//	console.log("hi ");
                    collection.find(e.query).toArray(function(err, results ) {
                    		//    console.log("tree");
                   // console.log(e);
                    	callback(results, e);
                    	//calls++;
                    //	console.log(calls + "<<");
                       // res = results;
                        //console.log(results);
                        client.close();
                        //return results;
                        
                    });
        };
  //      console.log(e);
    client.open(function(err, p_client) {
            client.collection(e.collection, test);
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


