function ptrRenderer() {
}

ptrRenderer.prototype = {

	"setElement":function(id) { 
		graphics[id].canvas = document.createElement("canvas"); //global canvas object
		var canvas = graphics[id].canvas; // this may or may not be the best way of doing it.. it might actually be faster to rerender the bounded elements
		canvas.width = 400;
		canvas.height = 400;
		canvas.style.position = "absolute";

		// = {"position":"absolute", "left":0, "top":0};
		var model = graphLookup[id];
		canvas.style.zIndex = graphLookup[id].loc.z;//ng;
		//this.zIndex = ng;

		if (model["hidden"])
			canvas.style.display = "none"
				canvas.style.border = "none";
		document.body.appendChild(canvas);
	},

	"mkPtrImgs":function(id, cb) {
		var tl = graphics[id]["item"];
		gfxLookup[id].cnt = 0;
		gfxLookup[id].imgCount = 0;
		this.countPtrImgs(id, tl, 0);
		//console.log(">>>>>>>>> meow"+this.cnt);
		//return;
		ptrRenderer.prototype.recursePtrImgs(id, tl, 0, cb);
		//var ma = Object.getOwnPropertyNames(tl);
		//},
	},

	"countPtrImgs":function(id, tl, x) {
		//var images = [];
		//var count = 0;
		var tll = tl.length;
		var tpl = 0;
		for (var y=0; y < tl.length; y++) {
			var tlg = tl[y];
			
			gfxLookup[id].cnt++;
			if (tlg["item"]) {
			//	this.cnt++;		
					ptrRenderer.prototype.countPtrImgs(id, tlg["item"], x+1);
			}
			//else break;
		}
		console.log(gfxLookup[id].cnt);
		//return tpl;
	},

	"recursePtrImgs":function(id, tl, x, cb) {
		//var images = [];
		var count = 0;
		var tll = tl.length;
		for (var y=0; y < tl.length; y++) {
			var tlg = tl[y];
			//console.log("_______");
			//console.log(tlg);
			//apparently something is wrong and it doesnt put the graphics in properly
 			 ptrRenderer.prototype.mkPtrImg(id, tlg, x, y,  cb);	
			if (tlg["item"])
			 ptrRenderer.prototype.recursePtrImgs(id, tlg["item"], x+1, cb);
		}
	},

	// reduce loading time by avoiding "canvas" creations....
	"mkPtrImg":function(id, tlg, x, y,  cb) {
		var linkHeight = this.linkHeight;
	//	for (var j = 0; j < ptrs.length; j++) {
		//var ma = Object.getOwnPropertyNames(tlg);

		//should make a hybrid 'div/span' and 'canvas' image 
		var c = document.createElement("canvas");
		var buffer = c.getContext("2d");
		c.width = 600 // set to max size of canvas
		//pa.push(tl[g]);
		var thisIndex = tlg["index"];
		var text = tlg["ptrNode"]

		//var pa = ptrSplit( ptrList)
		//var text = pa.pop();

		//draw text first
		// get text //
		// should use <span> instead 

		var fontFamily = "Times", fontSize = 20,fontStyle="normal";
		var rectHeight = Math.ceil(fontSize+fontSize/3);
		var centerPos = 2+fontSize/2

		buffer.font = fontStyle + " " + fontSize + "pt " + fontFamily;
		buffer.textBaseline = "middle";

		var m = buffer.measureText(text);
	//	c.width = m.width;
	//	c.height = rectHeight;
		//console.log(centerPos);
	// this should be do once only type shit
		var fp = buffer.measureText("f");
		
		//draw links
		var links = tlg["totalLinks"];
		if (!links) links = 0;
		var model = graphLookup[id];
		if (model.hasLinks) {

			links++;

			//should check for selection status and redraw state
			buffer.fillStyle = 'blue';
			for (var i = 0; i < links; i++) {
				buffer.fillRect(0,i*10, 10, 10);	
			}
			buffer.fill();
		}

		// should be replaced by html elements to take advantage of css
		buffer.rect(0, links*10, m.width+fp.width/3, rectHeight);
		buffer.fillStyle = 'lightgray';
		buffer.fill();
		buffer.fillStyle = 'black';
		buffer.fillText(text, 0, centerPos+(links*10));
		// this part should be an html element rendered into the canvas

		//}

// drawLinks
	//	buffer.rect(0,0,

		var img = new Image();
		//console.log(this.model);
		//console.log("SIOJDFSIOJDSOFIJSDF())++()()**()");
		var pil = ptrRenderer.prototype.ptrImgLoader.bind({id:id, cb:cb})
		img.onload = pil;

		/*
		img.onload = function() { // this code will leak
				var imgCount = gfxLookup[id].imgCount;
				console.log("laughy taphy");
				gfxLookup[id].imgCount++
				console.log(gfxLookup[id].imgCount+" "+gfxLookup[id].cnt);
				if (this.imgCount == this.cnt) {
					gfxLookup[id].drawAll(cb);
				}
			}
		*/


		img.src = c.toDataURL();
		//console.log("tlg................................");
		//console.log(tlg);
	
		//console.log("x :" +x);
		// there is something wrong with this ... plz fix
		//var x = tlg.ptr.length
		// this needs to have info regarding the link elements
		var image = {
			"linkHeight":10, "links":links, "rectHeight": rectHeight, "height":rectHeight+(links*10), "x":x*fontSize/2, "img":img, "width":m.width}
		tlg["gfx"] = image;
		return image;
		//	}
	},
	// go through image array and 
	"re":function(id, it, y, pt, context) {
		var itl = it.length;
		for (var i = 0; i < itl; i++) {
			var ptr = copyArray(pt);

			var item = it[i];
			//	ptr.push(i);
			var visible = item.visible;
			//	console.log(item);
			ptr.push(i);//+="['"+i+"']";

			//console.log(ptr+"<<::_"+item.ptr+"___::>>"+i);
			//console.log(item);

			//				console.log(y);
			//	console.log(item);
			item.gfx.y = y;
			// also take into consideration the local variables 
			// need to make sure y is top
			//console.log(item.gfx.x+" <NINININININNINEENENENEN> "+y);
			context.drawImage(item.gfx.img, item.gfx.x, Math.ceil(y));
			//console.log(ptr+"<<<"); // bug -- wrong ptr 
			//console.log(item.gfx)
			//},

			//console.log(ptr);
			gfx.prototype.register(copyArray(ptr));
			// get ptr 
			//register each image
			// set the 

			y+=item.gfx.height;

			if (visible) {
				//ptr.push("item");

				//var a= copyArray(ptr);	
				if (item["item"]) {
					var a = copyArray(ptr);
					a.push('item');
					y =  ptrRenderer.prototype.re(id, item["item"], y, a, context);
				}
				//	else break;
			}
		}
		return y;	
	},
	"ptrImgLoader":function() {
		/*
			anonymous function used to be used with 'bind' to avoid memory leakers from clsures
		*/

		var id = this.id; // gotten from bind
		var cb = this.cb;
		var imgCount = gfxLookup[id].imgCount; // gotten from some previous called function
		gfxLookup[id].imgCount++
	//	console.log(gfxLookup[id].imgCount+" "+gfxLookup[id].cnt);
		//console.log(this.model);
		//console.log("*(************************)*");
		if (gfxLookup[id].imgCount == gfxLookup[id].cnt) {
		//	console.log(gfxLookup[id].imgCount+" <<<");
		//	console.log(gfxLookup[id].cnt);
			ptrRenderer.prototype.drawAll(id, cb);
		}
	},
	"drawAll":function(id, cb) {
		var id = id;
		//console.log(id + " <<<<<<<");
		
		// create buffer canvas, draw image components to that

		var c = document.createElement("canvas");
		c.height = 400;
		c.width = 400;
		var context = c.getContext("2d");
		var it = graphics[id]["item"];//this.indexedModel["item"]
		var itl = it.length;
		var cury = 0;
		var curx= 0;
		// draw linearly each table and put in place,
		// update the looper 
		var lastItem = [];
		var lastI = [];
		var hasLastItem = false;
	  	var i = 0;
		var broken = false;

		//return;
		//console.log("____________________.....");
		//console.log(it);
		// this is to stop memory leakage
		ptrRenderer.prototype.re(id, it, 0, [id,'item'], context)
		var gid = graphics[id]
		gid.rendered = new Image();
		var gidr = gid.rendered;
		gidr.onload = function() { if (cb) { cb() } };
		gidr.src = c.toDataURL();
	},
	"putToScreen":function() {
		/*
			anonymous function used to be used with 'bind' to avoid memory leakers from clsures
		*/
	//	console.log("Loooooooooooooooooooooooooooooooooooooooog");
//		console.log(this);
		var canvas = graphics[this.id].canvas;
		var context = canvas.getContext("2d"); //canvas is a global object
		//var img = this.buffer;
		// shoudl probably glue multiple canvases together 
		context.clearRect(0, 0, 400, 400); // really should only clear the areas affecting the system
		//context.fillStyle = 'lightgray';
		//context.fill();
		//	console.log(img)
		var gti = graphics[this.id];
		//console.log(this.model+" "+this.guid+" "+this.uid+" "+this.id);
		//var tsig = this.model["loc"];
		var img = gti.rendered;
		//var yx = tsig ? tsig : {"x":0, "y":0};
		//console.log(gti.model.loc);
		context.drawImage(img, 0, 0) //gti.model.loc.x, gti.model.loc.y);
		imageData = context.getImageData(0,0,400,400);
		//this.moveCanvas();
		canvas.style.top = gti.model.loc.y+"px";
		canvas.style.left = gti.model.loc.x+"px";
		//	console.log(imageData);
		//	console.log("TRIPOLOEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
		//console.log(i++);
	}
}


