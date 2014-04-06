function isArray(obj) {
	return Array.isArray(obj);

}



function postJSON(data, callback, packet) {
	postUp(JSON.stringify(data), callback, packet);
}

function postUp(data, callback, packet) {
	this.callback = callback;
	this.packet = packet;
	this.request = new XMLHttpRequest();
	this.request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200 || window.location.href.indexOf("http") == -1) {
				callback(request.responseText,packet);
			} else {
				console.log("internal error");
			}
		}
	}
	this.request.open("POST", "post", true)
	this.request.setRequestHeader("Content-type", "application/json")

	this.request.send(data);
}

function copyArray(a) {
	//return;
	var g= [];
	for (var i=0; i < a.length; i++) {
		g.push(a[i]);
	}
	return g;
}



function getObject(ptrList, o, debug) {
	var j = ptrList.length;

	for (var i = 0; i < j; i++) {
		if (typeof ptrList[i] === 'string')
			var pi = ptrList[i].replace(/\"/g, "");
		else 
			var pi = ptrList[i];
		var z = o; 
		if (debug) {
		console.log(pi+"____"+i);
		console.log(o[pi]);
		}
		if (o[pi] === undefined) {
	
			throw('match object error with '+ptrList.join());
			return z;
		}		
		o = o[pi]
	}
	return o;
}

function getPos(e) {
	if (!document.body) return;

		return {x:e.clientX+e.view.scrollX, y:e.clientY+e.view.scrollY}
	


}

function mixin(from, to) {
	for (var g in from) {
			to[g] = from[g];
	}
}

function setObject(ptrList, o, val) {
	var j = ptrList.length;

	for (var i = 0; i < j; i++) {
		if (typeof ptrList[i] === 'string') {
			var type = {};
			var pi = ptrList[i].replace(/\"/g, "");
		}
		else  {
			var type = [];
			var pi = ptrList[i];
		}
		var z = o; 

		if (o[pi] === undefined) {
			o[pi] = type;
		}		
		o = o[pi]
	}
	return o;
}

function cloneObj(obj) {
	return JSON.parse(JSON.stringify(obj));

}
var cloneObject = cloneObj;


function getObjs(obj, fv) {
	var ar = [];
	for (var key in obj) 
		if (key == fv)
			ar.push[obj[key]];
	return ar;
}

function arrayHas(a, v) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] == v) return true;
	}
	return false;
}


function getStyle(selector) {
	var ss = document.styleSheets;
	for (var i =0; i < ss.length; i++) {
		var sic = ss[i]['cssRules']; 
		for (var j = 0; j < sic.length; j++) {
			if (sic[j].cssText.indexOf(selector) > 0)
				return sic[j].style
		}
	} 
}


function mkguid() {
	var S4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4()
			+ S4() + S4());
}

function getElPos(obj) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while(obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return {"x":curleft, "y":curtop}
}

function loadScripts(filenames, callback) {
	var files = 0;
//	should make a json loader like {"file1":["file2",{"f1":["file3"]}]} to manage dependcies
//	and load asyncronlously .. bit of a pain in the ass.. save 4 a rainy day
	function load() {
		var key = Object.keys(filenames[files])[0];
		var script = loadFile(key, filenames[files][key])

		script.onload = function() { 
			files++;
		       console.log(files+" "+filenames.length);	
		       	
			if (files == filenames.length) callback();
			else load();
		}

	}
	load();	
//	}
}
function loadFile(filename, doc) {
	var pattern = /\.js$/i;
	var script;
	if (filename.match(pattern))
		script = loadJS(filename, doc);
	else 
	       	script = loadCSS(filename, doc);

	doc.getElementsByTagName('head')[0].appendChild(script);
	return script;

}

function loadJS(filename, doc) {
	var script = doc.createElement("script");
	script.setAttribute("src", filenames[files]);
	return script;
}
function loadCSS(filename, doc) {
	var script = doc.createElement('link');
	script.setAttribute('href', filename)
	script.setAttribute('rel', 'stylesheet')
	script.setAttribute('type', 'text/css');
	return script;
}


function mergeJson(objAr) {
	var newObj = {};
	for (var i=0; i < objAr; i++) {
		if (typeof objAr[i] === 'string')
			objAr[i] = [objAr[i]];

		if (Array.isArray(objAr[i])) {
			newObj = [];
		}
	}
	var notObj = {};
	// to be a real json merger, obj needs to be an array so it can compare the placement of the index of the elements
	var _recurse=function(obj, no) {
		for (var key in obj) {					
			if (typeof obj[key]  !== 'object') {
				if (Array.isArray(no[key])) {
					no[key].push(obj[key])
				}
				else
				//	if (no[key])
				//		no[key] = [no[key]].concat(obj[key]);
				//	else 
						no[key] = obj[key];
				continue;
			}


			if (!no.hasOwnProperty(key)) {
				if (Array.isArray(obj[key]))
					no[key] = [];
				else no[key] = {};
			}//else 
			//	if (Array.isArray(obj[key]) && typeof no[key] == 'object')
			//		no[key] = [ no[key] ]
					
			if (Array.isArray(obj[key])) {

				for (var i =0; i < obj[key].length; i++) {
					
					if (Array.isArray(obj[key][i])) {
						if (!no[key].hasOwnProperty(i))
							no[key][i] = [];
						_recurse(obj[key][i], no[key][i])
					}else
				
					if (typeof obj[key][i] === 'object') {
						if (!no[key].hasOwnProperty(i))
							no[key][i] = {};
						_recurse(obj[key][i], no[key][i])
					}
					
					if (typeof obj[key][i] !== 'object') 
						       	no[key].push(obj[key][i]);
					
					
				}
			}
			else  _recurse(obj[key], no[key]);
		}
	
	}

	for (var i=0; i < objAr.length; i++) 
		_recurse(objAr[i], newObj);

	return newObj;
}

