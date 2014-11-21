function HeatMap() {
	this.generate = function(map) {
		var resto = new Resto();
		resto.query({}, function(data) {
			var coords = [];
			var heatmapVisual;

			for (var i = data.length - 1 ; i >= 0 ; i--) {
				var latLng = extractLatLng(data[i].fields.location);
				coords[i] = new google.maps.LatLng(latLng.lat, latLng.lng);
			}

			coords = new google.maps.MVCArray(coords);
			heatmapVisual = new google.maps.visualization.HeatmapLayer({
				data: coords,
				radius: getNewRadius(map, 100)
			});
			google.maps.event.addListener(map, 'zoom_changed', function () {
             	heatmapVisual.setOptions({
             		radius: getNewRadius(map, 100)
             	});
          	});
          	heatmapVisual.setMap(map);
		});
	}

	function extractLatLng(point) {
		point = point.substr(5, point.length).split(' ');
		var longitude = point[1];
		longitude = longitude.substr(1, longitude.length - 1);
		var lattitude = point[2];
		lattitude = lattitude.substr(0, lattitude.length - 2);

		return {lat: lattitude, lng: longitude};
	}

	function getNewRadius(map, desiredRadiusPerPointInMeters) {		  
      	var numTiles = 1 << map.getZoom();
	    var center = map.getCenter();
	    var moved = google.maps.geometry.spherical.computeOffset(center, 10000, 90); /*1000 meters to the right*/
	    var projection = new MercatorProjection();
	    var initCoord = projection.fromLatLngToPoint(center);
	    var endCoord = projection.fromLatLngToPoint(moved);
	    var initPoint = new google.maps.Point(
            initCoord.x * numTiles,
            initCoord.y * numTiles);
        var endPoint = new google.maps.Point(
            endCoord.x * numTiles,
            endCoord.y * numTiles);
        var pixelsPerMeter = (Math.abs(initPoint.x - endPoint.x)) / 10000.0;
        var totalPixelSize = Math.floor(desiredRadiusPerPointInMeters * pixelsPerMeter);

        return totalPixelSize;
    }
}