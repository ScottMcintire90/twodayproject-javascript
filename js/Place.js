exports.Place = function(title, address){
	this.title = title;
	this.address = address;
}

exports.Place.prototype.getTitle = function(){
	return this.title;
}

exports.Place.prototype.getAddress = function(){
	return this.address;
}