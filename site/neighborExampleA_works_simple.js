if ( typeof console === typeof undefined ) {
    console = {};
    console.log = print;
}

s2o = function(e) {
    var x = JSON.parse(e);
    return {
        id : x[0],
        ptr : x[1],
        index : x[2]
    }   
}




// program type "root" added

// BEGIN CODE COPIED FROM CYCLES.JS 
myforeignstring = function(e) {
    return JSON.stringify ( [e.id , e.ptr , e.index ] ); 
}
// END CODE COPIED FROM CYCLES.JS 


var types = {};
types["010de0ff-788f-d9b8-3c41-53bb5f48e325"] = "program";
types["09fb542e-b327-c07d-4a1c-d4d9a73e4ab0"] = "program";
types["0b7a1f70-3f93-aade-b95a-8517d223f172"] = "normal";
types["85ba6ff3-f93f-586e-1bca-e356825d8047"] = "root";
types["cf269a5f-7dd5-0a32-49b1-a6e427ed21d6"] = "normal";
types["d570fc0f-81c7-b2bc-22f1-6c0c63afb771"] = "program";
types["eaf80ac1-10a0-a992-49de-143f30de9c92"] = "normal";
types["fd8e7494-ce71-985e-0a89-38bc610b5d42"] = "aggregateCaseObj";
types["fe8a06a2-0e27-1915-2b24-4ba489200460"] = "normal";


var directedGraph ={
    "[\"0b7a1f70-3f93-aade-b95a-8517d223f172\",\"[\\\"c\\\"]\",0]": [{
        "id": "85ba6ff3-f93f-586e-1bca-e356825d8047",
        "ptr": "[\"a\"]",
        "index": 1
    }, {
        "id": "eaf80ac1-10a0-a992-49de-143f30de9c92",
        "ptr": "[\"e\"]",
        "index": 0
    }],
    "[\"85ba6ff3-f93f-586e-1bca-e356825d8047\",\"[\\\"a\\\"]\",1]": [{
        "id": "0b7a1f70-3f93-aade-b95a-8517d223f172",
        "ptr": "[\"c\"]",
        "index": 0
    }],
    "[\"0b7a1f70-3f93-aade-b95a-8517d223f172\",\"[\\\"c\\\"]\",1]": [{
        "id": "cf269a5f-7dd5-0a32-49b1-a6e427ed21d6",
        "ptr": "[\"b\"]",
        "index": 0
    }, {
        "id": "fe8a06a2-0e27-1915-2b24-4ba489200460",
        "ptr": "[\"d\"]",
        "index": 0
    }, {
        "id": "d570fc0f-81c7-b2bc-22f1-6c0c63afb771",
        "ptr": "[\"function1\"]",
        "index": 0
    }],
    "[\"cf269a5f-7dd5-0a32-49b1-a6e427ed21d6\",\"[\\\"b\\\"]\",0]": [{
        "id": "0b7a1f70-3f93-aade-b95a-8517d223f172",
        "ptr": "[\"c\"]",
        "index": 1
    }, {
        "id": "85ba6ff3-f93f-586e-1bca-e356825d8047",
        "ptr": "[\"a\"]",
        "index": 0
    }],
    "[\"85ba6ff3-f93f-586e-1bca-e356825d8047\",\"[\\\"a\\\"]\",0]": [{
        "id": "cf269a5f-7dd5-0a32-49b1-a6e427ed21d6",
        "ptr": "[\"b\"]",
        "index": 0
    }],
    "[\"eaf80ac1-10a0-a992-49de-143f30de9c92\",\"[\\\"e\\\"]\",0]": [{
        "id": "0b7a1f70-3f93-aade-b95a-8517d223f172",
        "ptr": "[\"c\"]",
        "index": 0
    }, {
        "id": "010de0ff-788f-d9b8-3c41-53bb5f48e325",
        "ptr": "[\"program3\"]",
        "index": 0
    }],
    "[\"010de0ff-788f-d9b8-3c41-53bb5f48e325\",\"[\\\"program3\\\"]\",0]": [{
        "id": "eaf80ac1-10a0-a992-49de-143f30de9c92",
        "ptr": "[\"e\"]",
        "index": 0
    }, {
        "id": "fd8e7494-ce71-985e-0a89-38bc610b5d42",
        "ptr": "[\"DJType\"]",
        "index": 0
    }],
    "[\"fd8e7494-ce71-985e-0a89-38bc610b5d42\",\"[\\\"DJType\\\"]\",0]": [{
        "id": "010de0ff-788f-d9b8-3c41-53bb5f48e325",
        "ptr": "[\"program3\"]",
        "index": 0
    }],
    "[\"fe8a06a2-0e27-1915-2b24-4ba489200460\",\"[\\\"d\\\"]\",0]": [{
        "id": "0b7a1f70-3f93-aade-b95a-8517d223f172",
        "ptr": "[\"c\"]",
        "index": 1
    }, {
        "id": "09fb542e-b327-c07d-4a1c-d4d9a73e4ab0",
        "ptr": "[\"function2\"]",
        "index": 0
    }],
    "[\"fd8e7494-ce71-985e-0a89-38bc610b5d42\",\"[\\\"title\\\"]\",0]": [{
        "id": "09fb542e-b327-c07d-4a1c-d4d9a73e4ab0",
        "ptr": "[\"function2\"]",
        "index": 0
    }],
    "[\"09fb542e-b327-c07d-4a1c-d4d9a73e4ab0\",\"[\\\"function2\\\"]\",0]": [{
        "id": "fd8e7494-ce71-985e-0a89-38bc610b5d42",
        "ptr": "[\"title\"]",
        "index": 0
    }, {
        "id": "fe8a06a2-0e27-1915-2b24-4ba489200460",
        "ptr": "[\"d\"]",
        "index": 0
    }],
    "[\"fd8e7494-ce71-985e-0a89-38bc610b5d42\",\"[\\\"matterNumber\\\"]\",0]": [{
        "id": "d570fc0f-81c7-b2bc-22f1-6c0c63afb771",
        "ptr": "[\"function1\"]",
        "index": 0
    }],
    "[\"d570fc0f-81c7-b2bc-22f1-6c0c63afb771\",\"[\\\"function1\\\"]\",0]": [{
        "id": "fd8e7494-ce71-985e-0a89-38bc610b5d42",
        "ptr": "[\"matterNumber\"]",
        "index": 0
    }, {
        "id": "0b7a1f70-3f93-aade-b95a-8517d223f172",
        "ptr": "[\"c\"]",
        "index": 1
    }]
}; 
var ind = [];

ind.push([
	{ptr:'\[\"a\"\]', type:"root", id:''},
	{type:"normal", ptr:'\[\"b\"\]', id:''},
	{ptr:'[\"c\"]', id:"", type:"normal"},
	{ptr:'\[\"d\"\]', id:"", type:"normal"},
	{ptr:'\[\"function2\"\]', type:"program", id:""}, 
	{ptr:'\[\"title\"\]', id:"", type:'aggregateCaseObj'}
]);

ind.push([
	{ptr:'\[\"a\"\]', type:"root", id:''},
	{type:"normal", ptr:'\[\"b\"\]', id:''},
	{ptr:'[\"c\"]', id:"", type:"normal"}, 
	{ptr:'\[\"function1\"\]', type:"program", id:""},
	{ptr:'\[\"matterNumber\"\]', type:'aggregateCaseObj', id:""}
]);


ind.push([
	{ptr:'\[\"a\"\]', type:"root", id:''},
	{type:"normal", ptr:'\[\"b\"\]', id:''},
	{ptr:'[\"c\"]', id:"", type:"normal"},
	{ptr:'[\"e"]', id:"", type:"normal"},
	{ptr:'\[\"program3\"\]', type:'program', id:""},
	{ptr:'\[\"DJType\"\]', type:'aggregateCaseObj', id:""}
]);

for ( var i = 0; i < ind.length ; i++ ) {
	for ( var j in ind[i] ) {
		//console.log(ind[i][j].type);
	}
}


function getRootNodesFromDG (dg) {
    var rcstrs = [];
    for ( var x in directedGraph ) {
        for ( var y in directedGraph[x]) {
            if ( "root" === types[directedGraph[x][y].id]) {
                rcstrs.push(myforeignstring(directedGraph[x][y]));
            }
        }
    }
    return rcstrs;
}




tree_contains = function (visited, contains) {
	if ( typeof visited === typeof [] && visited.indexOf(contains) != -1) {
		return true;
	}

	for ( var i = 0; i < visited.length; i++ ) {
		if ( typeof visited[i] === typeof [] ) {
			//for ( var j in visited[i] ) {
			var rc = tree_contains(visited[i], contains)
				if (rc === true) {
					return true;
				}
			//}
		}
	}
	return false;
}

rootfollow = [];

// we *know* when this graph is cycle free
gdfs = function( graph, current, visited) {
	var curstr = current;
	visited.push(curstr);


    // one links back to origin, one forward
    console.log(curstr);
	if ( graph[curstr].length <= 2 ) {
        for ( var x in graph[curstr] ) {
            var next = graph[curstr][x];
            if ( ! tree_contains(visited, next) ) {
                visited = gdfs(graph, next, visited);
            }
        }

	} else {
        for ( var x in graph[curstr] ) {
            var next = graph[curstr][x];
		    if ( rootfollow.indexOf(current) == -1) {
                rootfollow.push( current);
            }
        }
	}
	return visited;
}

function assert (e ) {
	if(!e) {
		console.log("NO");
	}	
}

function tree_contains_test() {
	assert ( tree_contains([1,2,3,4], 4));
	assert (! tree_contains([1,2,3,4], 5));
	assert ( tree_contains([1,2,3,[4]], 3));
	assert ( tree_contains([1,2,3,[4]], 4));
	assert ( tree_contains([1,2,3,[4,5]], 5));
	assert ( tree_contains([1,2,3,[[4],[5]]], 4));
	assert ( tree_contains([1,2,3,[[4],[5]]], 5));
}


tree_contains_test();

// prune all nodes from "visited", except rootfollow
// visited is array of arrays
function prunenodes ( graph, visited) {

    var vv = [];
    for ( var x in visited ) {
        for ( var y in visited[x]) {
            if ( vv.indexOf(visited[x][y]) === -1 && rootfollow.indexOf(visited[x][y]) === -1 ) {
                vv.push(visited[x][y]);
            }
        }
    }

    //console.log("XXXXXXXXX");
    //console.log(JSON.stringify(vv));
    //console.log("XXXXXXXXX");

    var newgraph = {};
    for ( var i in graph ) {
        if ( vv.indexOf(i) == -1 ) {
            newgraph[i] = [];
        } else {
            //console.log("Else: " + i + vv.indexOf(i));
        }
    }


    for ( var x in newgraph ) {
        for ( var y in graph[x] ) {
            if ( vv.indexOf(graph[x][y]) === -1) {
                //console.log("push(" + graph[x][y]);
                newgraph[x].push(graph[x][y]);
            }
        }

    }
    //console.log("----------");
    //console.log(JSON.stringify(graph));
    //console.log("----------");
    //console.log("newgraph");
    //console.log(JSON.stringify(newgraph));
    //console.log("----------");


    return newgraph;

}

function process_rest(graphNG) {
    var rss = [];
    for ( var i in graphNG ) {
        if ( types[s2o(i).id] === "normal" && graphNG[i].length %2 === 1 ) {
            console.log("CANDIDATE");
            rss.push(i);
        }
    }
    return iterate ( graphNG, rss );
}

function iterate(graph, rootstrs ) {
	console.log("iterating root boxes");
	// for all root boxes
    var allvisited = [];
	for ( var i = 0; i < rootstrs.length ; i++ ) {
        console.log("rootstrs[i]");
        console.log(rootstrs[i]);
        for ( var j = 0; j < graph[rootstrs[i]].length ; j++ ) {
            console.log("\nRoot:");
            var visited = [rootstrs[i]];
            visited = gdfs(graph, graph[rootstrs[i]][j], visited );
            for ( var yy = 0; yy < visited.length ; yy++) {
                console.log(visited[yy]);
            }
        }
        allvisited.push(visited);
	}

    var graphNG = prunenodes(graph, allvisited);
    var rf = rootfollow;
    rootfollow = [];
    if ( rf.length > 0 ) {
        allvisited = allvisited.concat(iterate(graphNG, rf));
    } else if ( JSON.stringify(graphNG).length > JSON.stringify("{}").length ) {
        // we should pick nodes which are -endpoints- (not aggregators, number of neighbors uneven
        allvisited = allvisited.concat(process_rest(graphNG));
    }
    return allvisited;
}

function dgraph_dgraphprime(dgraph) {
    var dgraphPrime = {}; 
    for ( var i in dgraph) {
        dgraphPrime[i] = []; 
        for ( var j in dgraph[i] ) { 
            dgraphPrime[i].push(myforeignstring(dgraph[i][j]));
        }   
    }   
    return dgraphPrime;
}

var dgprime = dgraph_dgraphprime(directedGraph);
var rootstrs = getRootNodesFromDG(dgprime);


var vvv = iterate(dgprime, rootstrs);


console.log("----------");
console.log(JSON.stringify(vvv));

