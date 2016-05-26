exports.Map = function(address) {
	this.address = address;
}

//variables for map functions below.
var geocoder;
var map;
var panorama;

//initialize function gets map ready, sets to panorama view.
exports.Map.prototype.initialize = function() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  panorama = new google.maps.StreetViewPanorama(document.getElementById("map"), mapOptions);
}

//codeAddress takes user address and converts to latlang coordinates, finishes map.
exports.Map.prototype.codeAddress = function() {
	console.log(this.address);
  geocoder.geocode( { 'address': this.address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      panorama.setPosition(results[0].geometry.location);
      panorama = new google.maps.StreetViewPanorama({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
