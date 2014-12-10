function HeatMap() {
	var heatmap;
	var peopleHeatMap;
	var radius = 100;
	var peopleRadius = 10;

	this.generate = function(map) {
		resto.query(generateRestoQuery(this.heatMapOptions['restaurant']), function(data) {
			var coords = [];

			for (var i = data.length - 1 ; i >= 0 ; i--) {
				var latLng = extractLatLng(data[i].fields.location);
				coords[i] = new google.maps.LatLng(latLng.lat, latLng.lng);
			}

			coords = new google.maps.MVCArray(coords);
			heatmap = new google.maps.visualization.HeatmapLayer({
				data: coords,
				radius: getNewRadius(map, radius)
			});
			google.maps.event.addListener(map, 'zoom_changed', function () {
             	heatmap.setOptions({
             		radius: getNewRadius(map, radius)
             	});
          	});
          	heatmap.setMap(map);
		});

		peoplelocs.query(generatePeopleQuery(this.heatMapOptions['people']), function(data) {
			var coords = [];

			for (var i = data.length - 1 ; i >= 0 ; i--) {
				var latLng = extractLatLng(data[i].fields.location);
				coords[i] = new google.maps.LatLng(latLng.lat, latLng.lng);
			}

			var gradient = [
			    'rgba(0, 255, 255, 0)',
			    'rgba(0, 255, 255, 1)',
			    'rgba(0, 191, 255, 1)',
			    'rgba(0, 127, 255, 1)',
			    'rgba(0, 63, 255, 1)',
			    'rgba(0, 0, 255, 1)',
			    'rgba(0, 0, 223, 1)',
			    'rgba(0, 0, 191, 1)',
			    'rgba(0, 0, 159, 1)',
			    'rgba(0, 0, 127, 1)',
			    'rgba(63, 0, 91, 1)',
			    'rgba(127, 0, 63, 1)',
			    'rgba(191, 0, 31, 1)',
			    'rgba(255, 0, 0, 1)'
		  	];

			coords = new google.maps.MVCArray(coords);
			peopleHeatMap = new google.maps.visualization.HeatmapLayer({
				data: coords,
				radius: getNewRadius(map, peopleRadius),
				gradient: gradient
			});
			google.maps.event.addListener(map, 'zoom_changed', function () {
             	peopleHeatMap.setOptions({
             		radius: getNewRadius(map, peopleRadius)
             	});
          	});
          	peopleHeatMap.setMap(map);
		});
	}

	this.reset = function() {
		resto.query(generateRestoQuery(this.heatMapOptions['restaurant']), function(data) {
			var coords = [];

			for (var i = data.length - 1 ; i >= 0 ; i--) {
				var latLng = extractLatLng(data[i].fields.location);
				coords[i] = new google.maps.LatLng(latLng.lat, latLng.lng);
			}

				coords = new google.maps.MVCArray(coords);

			heatmap.setOptions({
				data: coords
			});
		});
	}

	this.regenPeople = function() {
		dotheanimation();
    	peoplelocs.query(generatePeopleQuery(this.heatMapOptions['restaurant']), function(data) {
			var coords = [];

			for (var i = data.length - 1 ; i >= 0 ; i--) {
				var latLng = extractLatLng(data[i].fields.location);
				coords[i] = new google.maps.LatLng(latLng.lat, latLng.lng);
			}

				coords = new google.maps.MVCArray(coords);

			peopleHeatMap.setOptions({
				data: coords
			});
		});
		dotheanimation();
    }

	this.setRadius = function(rad) {
		radius = rad;
		heatmap.setOptions({
     		radius: getNewRadius(map, radius)
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

    function generateRestoQuery(data) {
    	var restoOptions = Object.keys(data);
		var restoQuery = {};

		for (var i = 0 ; i < restoOptions.length ; i++) {
			restoQuery[restoOptions[i]] = [];
			var subOptions = data[restoOptions[i]];

			for (var j = 0 ; j < subOptions.length ; j++) {
				var subOption = subOptions[j];

				if (subOption.checked) {
					restoQuery[restoOptions[i]].push(subOption.name);
				}
			}
		}

		return restoQuery;
    }

    function generatePeopleQuery(data) {
    	var sex = [];

		if ($('#isfemale')[0].checked) {
			sex.push(0);
		}
		if ($('#ismale')[0].checked) {
			sex.push(1);
		}

		return {
			minAge: $("#age-slider").slider( "values", 0),
			maxAge: $("#age-slider").slider( "values", 1),
			sex: sex
		};
    }

    this.heatMapOptions = {
		restaurant: {
			type: [
				{
					name: 'pub',
					checked: true
				},
				{
					name: 'restaurant',
					checked: true
				},
				{
					name: 'anticafe',
					checked: true
				}
			],
			kitchen: [
				{
					name: 'european',
					checked: true
				},
				{
					name: 'chinese',
					checked: true
				},
				{
					name: 'sweet',
					checked: true
				}
			]
		}
	}
}