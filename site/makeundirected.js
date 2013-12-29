isEmpty = function (ob) {
	for(var i in ob) 
		if(ob.hasOwnProperty(i))
			return false;
return true;
}
	
		
makeundirected_str = function ( foreign ) {
    var extension = {};
    // deep copy of foreign
    for ( var m in foreign ) {
        extension[m] = [];
        for ( var n in foreign[m] ) {
            extension[m].push(foreign[m][n]);
        }
    }  

    // pointing backwards
    for ( var m in foreign ) {
        for ( var n in foreign[m] ) {
            var ostr = foreign[m][n];
            if ( ! extension.hasOwnProperty(ostr) ) {
                extension[ostr] = [];
            }
            var unstr = m;
            extension[ostr].push(unstr);
        }
    } 
    return extension;
};

s2us = function(s) {
	var p = s2o(s);
	return JSON.stringify([p.id, p.ptr]);
}

us2o = function(e) {
	var b = JSON.parse(e)
	return {"id":b[0], "ptr":b[1]};
}
o2us = function(p) {
	return JSON.stringify([p.id, p.ptr]);
}
o2uo = function(o) {
	return {"id":o.id, "ptr":o.ptr}
}
a2p = function(a) {
	var s = ""; 
	for (var g in a) {
		s += "[\""+a[g]+"\"]";
	}
	return s;
	
}

o2s = function(e) {
    if (e.index === undefined)
    	return o2us(e)
	return JSON.stringify ( [e.id , e.ptr , e.index] ); 
}

s2o = function(e) {
    var x = JSON.parse(e);
    
    if (x[2] === undefined)
    	return s2us(e)
    return {
        id : x[0],
        ptr : x[1],
        index : x[2]
    }   
}
cloneObject = function(o) {
	return JSON.parse(JSON.stringify(o));
}

ptrUnsplit = function (ptr) {
	var s = "";
	for (var v in ptr)
		s+='["'+ptr[v]+'"]';
	return s;
}

setObjStr = function(obj, ptr) {
	console.log("__________________________________________________________________")
	var ss = '["'+JSON.stringify(ptr[0])+'"]';
	console.log(ss)
	
	for (var f = 1; f < ptr.length; f++) {
		//console.log(obj+""+ss);
		//eval(obj);
		//console.log("test....")
		if (!eval(obj+""+ss)) {
			ss += '["'+JSON.stringify(ptr[f])+'"]';
			eval (obj+ss+"= {}")
		}									
	}	
	
}

setObj = function(obj, ptr) {
	console.log("__________________________________________________________________")
	var ss = '["'+ptr[0]+'"]';
	console.log(ss)
	
	for (var f = 1; f < ptr.length; f++) {
		//console.log(obj+""+ss);
		//eval(obj);
		//console.log("test....")
		if (!eval(obj+""+ss)) {
			ss += '["'+ptr[f]+'"]';
			eval (obj+ss+"= {}")
		}									
	}
}

ptrSplit = function (ptrs) {
	var rcarray = []; 
	ptrs = ptrs.substr(2,ptrs.length);
	ptrs = ptrs.substr(0,ptrs.length-2);
	rcarray = ptrs.split('"]["');
	return rcarray;
}

makeundirected = function ( foreign ) {
    var extension = {};
    // deep copy of foreign
    for ( var m in foreign ) {
        extension[m] = [];
        for ( var n in foreign[m] ) {
            extension[m].push(foreign[m][n]);
        }
    }  

    // pointing backwards
    for ( var m in foreign ) {
        for ( var n in foreign[m] ) {
            var ostr = myforeignstring(foreign[m][n]);
            if ( ! extension.hasOwnProperty(ostr) ) {
                extension[myforeignstring(ostr)] = [];
            }
            var unstr = {};
            unstr.id =JSON.parse(m)[0];
            unstr.ptr =JSON.parse(m)[1];
            unstr.index =JSON.parse(m)[2];
            extension[ostr].push(unstr);
        }
    }  
    return extension;
}

// for mongo
/*
if ( typeof exports !== typeof undefined ) {
	exports.makeundirected = makeundirected;
	//exports.makeundirected_str = makeundirected_str;
}
*/
myforeignstring = function(e) {
	return JSON.stringify ( [e.id , e.ptr , e.index ] ); 
}

