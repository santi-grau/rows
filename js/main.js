var objects = [
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/10af9436fe2eea3b8a7f54b7567de89b11622bc0_m.jpg',
		w: 401,
		h: 480
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
		url: 'http://img.ffffound.com/static-data/assets/6/3ccd430666b4136100fca0918f7d3c4a48f96b61_m.jpg',
		vid: 12341234,
		w: 480,
		h: 313
	},
	{
		t: 0,
		url: 'http://img.ffffound.com/static-data/assets/6/09669248440e97705c37ddb82db18327307920f0_m.png',
		w: 480,
		h: 351
	},
	{
		t: 2,
		url: 'spotify:track:4bz7uB4edifWKJXSDxwHcs'
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
	}
]; // 0 image, 1 video, 2 audio, 3 link
var Rows = function(settings){
	this.rows = [];
	this.addedObjects = 0;
	for (set in settings) this[set] = settings[set];
	this._addRow();
	console.log(this)
}
Rows.prototype._addRow = function(){
	this.rows.push(new Row(this));
}
var Row = function(parent){
	this.parent = parent;
	this.element = $('<div class="row" />').appendTo(parent.element);
	this.objects = [];
	var fits = [];
	var fitsNormalized = [];
	var objectsWidth = 0;
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
		fits.push((this.element.width() - this.parent.gutter*addedObjects) / objectsWidth);
		fitsNormalized.push(Math.abs(1 - (this.element.width() - this.parent.gutter*addedObjects) / objectsWidth));
		addedObjects++;
	}
	console.log('Required scaling to objects until fit:');
	console.log(fits)
	var closestIndex = fitsNormalized.indexOf(Math.min.apply(Math, fitsNormalized));
	console.log("Closest scaling : " + closestIndex)
	this.element.css({
		'height' : this.parent.rowHeight * (fits[closestIndex])
	})
	this.addObjectIndex = closestIndex;
	console.log('Add objects to row ' + this.parent.rows.length + ': From ' + this.parent.addedObjects + ' to ' + this.addObjectIndex);
	for(i=this.parent.addedObjects; i<this.addObjectIndex + 1; i++){
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
	this.element.find('.object:last').css({
		'left' : 'auto',
		'right' : 0
	})
}
var AudioObj = function(parent,obj){
	this.element = $('<div class="object audio" />')
	.css({
		'background' : '#000',
		'width' : Math.ceil(parent.element.height() / 1.32),
		'height' : Math.ceil(parent.element.height())
	})
	.appendTo(parent.element);
}
var LinkObj = function(parent,obj){
	this.element = $('<div class="object link" />')
	.css({
		'background' : '#00F',
		'width' :  Math.ceil(parent.element.height()),
		'height' :  Math.ceil(parent.element.height())
	})
	.appendTo(parent.element);
}
var ImageObj = function(parent,obj){
	var self = this;
	this.element = $('<div class="object image" />')
	.css({
		'background' : '#FF0',
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
		'background' : '#0F0',
		'width' :  Math.ceil(parent.element.height() / (obj.h/obj.w)),
		'height' :  Math.ceil(parent.element.height())
	})
	.appendTo(parent.element);
	$('<img src="'+obj.url+'" width="100%" height="100%" />').appendTo(this.element);

}
var settings = {
	element : $('#container'),
	rowHeight : 180,
	gutter : 10,
	objects : objects
}
var rows = new Rows(settings);