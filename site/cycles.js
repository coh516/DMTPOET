myforeignstring = function(e) {
    return JSON.stringify ( [e.id , e.ptr , e.index ] );
}

dfs = function ( foreign, current, visited ) {
    if ( visited.length > 20 ) {
        console.log("too much recursion!");
        return;
    }

    if ( visited.indexOf(current) > 0 ) {
	console.log(current);
        return true;
    }

    if ( foreign.hasOwnProperty(current)) {
        for ( var i = 0 ; i < foreign[current].length ; i++) {
            // don't go right back
            var next = myforeignstring(foreign[current][i]);
            if ( visited[visited.length-1] === next ) {
                continue;
            }
            var rc = dfs ( foreign, next, visited.concat(current) ) ;
            if (rc === true) {
                return rc;
            }
        }
    }
    return false;
}


cyclecheck = function ( foreign ) {
    for ( var f in foreign ) {
        for ( var x in foreign[f] ) {
            var rc = dfs ( foreign, myforeignstring(foreign[f][x]), [] );
            if (rc === true) {
                return rc;
            }
        }
    }
    return false;
}

