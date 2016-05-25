$( document ).ready(function() {
	initAutocomplete();
  $('#locateUser').click(locateUser);
  
});


function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.5231, lng: -122.6765},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
































// //google maps functions
// function locateUser() {
//   // If the browser supports the Geolocation API
//   if (navigator.geolocation){
//     var positionOptions = {
//       enableHighAccuracy: true,
//       timeout: 10 * 1000 // 10 seconds
//     };
//     navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
//   }
//   else {
//     alert("Your browser doesn't support the Geolocation API");
//   }
// }

// // this is the success callback from telling the navigator (your browser) to get the current user's position
// // we do this on line 13 above. We pass in a function to call on success, a function to call on error, and some options to tell the geolocation api how we want it to run.
// // on successfully locating the user, geolocationSuccess() gets called automatically, and it is passed the user's position as an argument.
// // on error, geolocationError is called.


// function geolocationSuccess(position) {
//   // here we take the `position` object returned by the geolocation api
//   // and turn it into google maps LatLng object by calling the google.maps.LatLng constructor function
//   // it 2 arguments: one for latitude, one for longitude.
//   // You could refactor this section to pass google maps your own coordinates rather than using geolocation for the user's current location.
//   // But you must use coordinates to use this method.
//   var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

//   var myOptions = {
//     zoom : 16,
//     center : userLatLng,
//     mapTypeId : google.maps.MapTypeId.ROADMAP
//   };
//   // Draw the map - you have to use 'getElementById' here.
//   var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
//   // Place the marker
//   new google.maps.Marker({
//     map: mapObject,
//     position: userLatLng
//   });
// }

// function geolocationError(positionError) {
//   alert(positionError);
// }

