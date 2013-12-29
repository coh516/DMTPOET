var dg = {"[\"7f68ebe3-95db-1766-9efd-60a1e8f727b5\",\"[\\\"bbb\\\"]\",0]":[{"id":"26529bb5-c372-652b-62a8-354497855e56","ptr":"[\"aaa\"]","index":0}],"[\"26529bb5-c372-652b-62a8-354497855e56\",\"[\\\"aaa\\\"]\",0]":[{"id":"7f68ebe3-95db-1766-9efd-60a1e8f727b5","ptr":"[\"bbb\"]","index":0}],"[\"26529bb5-c372-652b-62a8-354497855e56\",\"[\\\"aaa\\\"][\\\"aba\\\"][\\\"acid1\\\"]\",0]":[{"id":"7f68ebe3-95db-1766-9efd-60a1e8f727b5","ptr":"[\"bbb\"][\"bab\"]","index":0}],"[\"7f68ebe3-95db-1766-9efd-60a1e8f727b5\",\"[\\\"bbb\\\"][\\\"bab\\\"]\",0]":[{"id":"26529bb5-c372-652b-62a8-354497855e56","ptr":"[\"aaa\"][\"aba\"][\"acid1\"]","index":0}]};


print = console.log;


// we want to rename:
var renamefrom = '[\"26529bb5-c372-652b-62a8-354497855e56","[\\\"aaa\\\"]",0]'


s2o = function(e) {
    var x = JSON.parse(e);
    return {
        id : x[0],
        ptr : x[1],
        index : x[2]
    }
}


function ptrSplit(ptrs) {
        var rcarray = [];
        ptrs = ptrs.substr(2,ptrs.length);
        ptrs = ptrs.substr(0,ptrs.length-2);
        rcarray = ptrs.split('"]["');
        return rcarray;
}



function isdependent( haystack, needle ) {
	var ptrdependent = function ( haystack, needle ) {
		var hsa = ptrSplit(haystack),
		    na =  ptrSplit(needle);
		for ( var i = 0; i < hsa.length && i < na.length ; i++ ) {
			if ( hsa[i] !== na[i] ) {
				return false;
			} else if ( i + 1 === na.length ) {
				return true;
			}
		}
	}


	var hso = s2o(haystack),
	    no  = s2o(needle);

	if ( hso.id === no.id && ptrdependent(hso.ptr, no.ptr) ) {
		return true;
	}
	return false;
}

for ( var i in dg ) {
	if ( isdependent ( i, renamefrom)) {
		print ("Depending: " + i);
	}
}



