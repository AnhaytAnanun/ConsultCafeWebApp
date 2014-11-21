var republicSquareCenter = {
	lat: 40.177766,
	lng: 44.512570
}

var initMap = function(mapId) {
	var mapOptions = {
          	center: republicSquareCenter,
          	zoom: 16,
          	streetViewControl: false
    };
	return new google.maps.Map(document.getElementById(mapId), mapOptions);
}