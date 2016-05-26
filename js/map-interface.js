//require Place object to be used with creating new addresses.
var Place = require("./../js/Place.js").Place;
var Map = require("./../js/Map.js").Map;

$( document ).ready(function() {

  //automatically initialize map at the location of Epicodus in Portland, OR
  var newMap = new Map("400 SW 6th Ave #800, Portland, OR 97204");
  newMap.initialize();
  newMap.codeAddress();

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
      var newMap = new Map(address);
	    newMap.initialize();
	    newMap.codeAddress();
	  });
  });
});
