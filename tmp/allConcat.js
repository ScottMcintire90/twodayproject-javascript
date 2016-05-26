//require Place object to be used with creating new addresses.
var Place = require("./../js/Place.js").Place;

$( document ).ready(function() {

  //click function that adds view to list.
  $('#newView').click(function(){
  	var title = $('#title').val();
  	var address = $('#address').val();
  	$('#title').val("");
  	$('#address').val("");
  	var newPlace = new Place(title, address);

    //adds view to list with button and id with value of its address.
  	$('#addView').append("<li><button class='location' type='click' id=" + "'" + newPlace.getAddress() + "'" + ">" + newPlace.getTitle() + "</button></li>");

    //click listener for which address was clicked, initializes map and converts address to latlang.
  	$('.location').last().click(function() {
	    var address = $(this).attr("id");
	    initialize();
	    codeAddress(address);
	  });
  });

  //automatically initialize map at the location of Epicodus in Portland, OR
  initialize();
  codeAddress("400 SW 6th Ave #800, Portland, OR 97204")
});

//variables for map functions below.
var geocoder;
var map;
var panorama;

//initialize function gets map ready, sets to panorama view.
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  panorama = new google.maps.StreetViewPanorama(document.getElementById("map"), mapOptions);
}

//codeAddress takes user address and converts to latlang coordinates, finishes map.
function codeAddress(address) {
  geocoder.geocode( { 'address': address}, function(results, status) {
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
