var objects = [
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/5cd8a53a808a2afd381190675b87718b5f587a6d_m.jpg',
		w: 300,
		h: 424
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/e419204d1001617ea7623a101e18af0b641db0ac_m.jpg',
		w: 392,
		h: 480
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/a4d1cff9c12c66cda4325f634e8c0e6322456b76_m.jpg',
		w: 470,
		h: 343
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/a394eeb4bdde078f619db664b39f0fcefcfea9a7_m.gif',
		w: 300,
		h: 169
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/66b83aad68d93fb91449791a33eab71dd37b017b_m.gif',
		w: 480,
		h: 416
	},
	{
		t: 3,
		url: 'http://okfoc.us',
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/3ccd430666b4136100fca0918f7d3c4a48f96b61_m.jpg',
		w: 480,
		h: 313
	},
	{
		t: 1,
		url: 'http://i.vimeocdn.com/video/466515858_640.jpg',
		vis: 'vimeo',
		vid: 88165433,
		w: 480,
		h: 313
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/5a2987cf54012d87885e287a8d17214f073112d5_m.png',
		w: 477,
		h: 480
	},
	{
		t: 2,
		url: 'spotify:track:6xagz13sWrDCcRtVxxopGk'
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/5df1cf7789854c6ec97d6465ac44c18e0da11350_m.jpg',
		w: 335,
		h: 480
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/54c7e7d372746c461d4bafe46d665b6c6d07458c_m.jpg',
		w: 480,
		h: 344
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/587a9947d1c2222abda22322653eb18d498ac392_m.jpg',
		w: 321,
		h: 480
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/10af9436fe2eea3b8a7f54b7567de89b11622bc0_m.jpg',
		w: 401,
		h: 480
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/d525ca4a4bd41da44c2ad8f6b632cb9d383d4cbc_m.jpg',
		w: 371,
		h: 480
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/ca8e739ce4dcb2beb07ff0df0a6631684a64c9e9_m.jpg',
		w: 361,
		h: 480
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/88e823ff4d52e2d152347ac7ba120ad9e79e6840_m.jpg',
		w: 480,
		h: 294
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/4c67c26d0aaa8488eda191676d14192f0e1265a6_m.jpg',
		w: 385,
		h: 480
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/f39cbb434ccdcc4739936edf3943e4023088d1a1_m.jpg',
		w: 384,
		h: 480
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/619a33f478a382b7ba06fb79704dc0974fc77e36_m.jpg',
		w: 480,
		h: 320
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/4d99729f1d9816e7ea3f2124732d77368478c9af_m.jpg',
		w: 480,
		h: 353
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/1bf798f4baee65162e4f18b51ff0b78739f6a953_m.jpg',
		w: 352,
		h: 480
	}
]; // 0 image, 1 video, 2 audio, 3 link

var Rows = function(settings){
	this.rows = [];
	this.addedObjects = 0;
	for (set in settings) this[set] = settings[set];
	console.log(':::::::::: START ::::::::::')
	this.rows.push(new Row(this));
}
var Row = function(parent){
	console.log('---> Add row ['+parent.rows.length+']');
	this.parent = parent;
	this.element = $('<div class="row" />').css({ 'position' : 'relative', 'overflow' : 'hidden'}).appendTo(parent.element);
	var lastRow = false;
	this.objects = [];
	var fits = [];
	var fitsNormalized = [];
	var objectsWidth = 0;
	var objCount = 0;
	var addedObjects = this.parent.addedObjects;
	while(objectsWidth < this.element.width()){
		var obj = this.parent.objects[addedObjects];
		switch(obj.t) {
		case 2:
			objectsWidth +=this.parent.rowHeight / 1.32;
			break;
		case 3:
			objectsWidth += this.parent.rowHeight;
			break;
		default:
			aspectRatio = obj.h / obj.w;
			objectsWidth += this.parent.rowHeight / aspectRatio;
		}
		fits.push(((this.element.width() - this.parent.gutter * objCount) / objectsWidth).toFixed(2));
		fitsNormalized.push(Math.abs(1 - (this.element.width() - this.parent.gutter*objCount) / objectsWidth));
		if(addedObjects < this.parent.objects.length - 1){
			addedObjects++;
			objCount++;
		}else{
			lastRow = true;
			break;
		}
	}
	if(!lastRow){
		var closestIndex = fitsNormalized.indexOf(Math.min.apply(Math, fitsNormalized));
		if(closestIndex !== fitsNormalized.length - 1) addedObjects--;
		console.log('     Scaling to fit n objects: [' + fits.toString() + '] -> Minimum scale index ('+closestIndex+')');
		this.element.css({
			'height' : this.parent.rowHeight * (fits[closestIndex])
		})
		this.addObjectIndex = (parseInt(this.parent.addedObjects) + parseInt(closestIndex));
		console.log('     Add objects to row: From ' + this.parent.addedObjects + ' to ' + this.addObjectIndex);
	}else{
		console.log('     This is the last row, do not scale');
		var closestIndex = this.parent.objects.length;
		this.element.css({
			'height' : this.parent.rowHeight
		})
		this.addObjectIndex = closestIndex;
		console.log('     Add object: ' + this.parent.addedObjects );
	}
	var countTo = this.addObjectIndex + 1;
	if(lastRow) countTo = this.addObjectIndex;
	for(i=this.parent.addedObjects; i< countTo; i++){
		var obj = this.parent.objects[i];
		switch(obj.t) {
		case 0:
			this.objects.push(new ImageObj(this,obj));
			break;
		case 1:
			this.objects.push(new VideoObj(this,obj));
			break;
		case 2:
			this.objects.push(new AudioObj(this,obj));
			break;
		case 3:
			this.objects.push(new LinkObj(this,obj));
			break;
		}
	}
	this.objects.forEach(function(object) {
		var o = object.element;
		if(o.prev().length) {
			o.css({
				'position' : 'absolute',
				'top' : 0,
				'left' : o.prev().position().left + o.prev().width() + parent.gutter
			})
		}
	});
	if(!lastRow){
		this.element.css({ 'margin-bottom' : this.parent.gutter });
		// this.element.find('.object:last').css({
		// 	'left' : 'auto',
		// 	'right' : 0
		// });
		this.parent.addedObjects = this.addObjectIndex + 1;
		this.parent.rows.push(new Row(this.parent));
		//this.parent.rows.push(new Row(this.parent));
	}else{
		console.log(':::::::::: END ::::::::::');
		console.log(parent)
	}
}
var AudioObj = function(parent,obj){
	this.element = $('<div class="object audio" />')
	.css({
		'width' : parent.element.height() / 1.32,
		'height' : parent.element.height()
	})
	.appendTo(parent.element);
	var widget = $('<iframe src="https://embed.spotify.com/?uri='+obj.url+'" width="'+this.element.width()+'" height="'+this.element.height()+'" frameborder="0" allowtransparency="true"></iframe>').appendTo(this.element)
}
var LinkObj = function(parent,obj){
	this.element = $('<div class="object link" />')
	.html(obj.url)
	.css({
		'background' : '#fcde39 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkY1QjVDQkUyRDMwQjExRTM4QjdBQzhFNUFFMDc5QTUwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNDM0EzODE2RDM1QjExRTM4QjdBQzhFNUFFMDc5QTUwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjVCNUNCRTBEMzBCMTFFMzhCN0FDOEU1QUUwNzlBNTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjVCNUNCRTFEMzBCMTFFMzhCN0FDOEU1QUUwNzlBNTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5fkGO4AAAAeElEQVR42qTMuQ2AMBAFUViTQUDkAqiAiK4JqYOWMBISwqz3+hNN9PrzmDqsNGTCiWXbCSfGeSWcKE84EVQqIqL8CbfCEj6lRTgUgbAqMmFSVEJXLISiGAlJsRNNxUXwipdglABRKzHio4SJV0GIRwGJW8GJ0iXAAHuuIO76lEkaAAAAAElFTkSuQmCC) bottom right no-repeat',
		'color' : '#00F',
		'text-decoration' : 'underline',
		'width' :  Math.ceil(parent.element.height()),
		'height' :  Math.ceil(parent.element.height())
	})
	.appendTo(parent.element);
}
var ImageObj = function(parent,obj){
	var self = this;
	this.element = $('<div class="object image" />')
	.css({

		'width' :  Math.ceil(parent.element.height() / (obj.h/obj.w)),
		'height' :  Math.ceil(parent.element.height())
	})
	.appendTo(parent.element);
	$('<img src="'+obj.url+'" width="100%" height="100%" />').appendTo(this.element);
}
var VideoObj = function(parent,obj){
	var self = this;
	this.element = $('<div class="object video" />')
	.css({
		'position' : 'relative',
		'width' :  Math.ceil(parent.element.height() / (obj.h/obj.w)),
		'height' :  Math.ceil(parent.element.height())
	})
	.appendTo(parent.element);
	$('<img src="'+obj.url+'" width="100%" height="100%" />').appendTo(this.element);
	$('<a href="javascript:void(0)" />')
	.css({
		'display' : 'block',
		'background' : 'url(https://d2b1xqaw2ss8na.cloudfront.net/static/img/spb_sprite.png)',
		'background-position' : '-2px -135px',
		'width' : 29,
		'height': 29,
		'position': 'absolute',
		'left': '50%',
		'top': '50%',
		'margin-left' : -15,
		'margin-top' : -15
	})
	.appendTo(this.element)
}
var settings = {
	element : $('#container'),
	rowHeight : 120,
	gutter : 5,
	objects : objects
}
var rows = new Rows(settings);
$(window).bind('resize', function(){
		
	})
