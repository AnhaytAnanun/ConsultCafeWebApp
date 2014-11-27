function DrawingControl() {
	this.init = function(map) {
		var drawingManager = new google.maps.drawing.DrawingManager({
		    drawingMode: google.maps.drawing.OverlayType.MARKER,
		    drawingControl: true,
		    drawingControlOptions: {
		      	position: google.maps.ControlPosition.TOP_CENTER,
		      	drawingModes: [
			        google.maps.drawing.OverlayType.POLYGON,
		      	]
		    },
		    markerOptions: {
		    	icon: 'images/beachflag.png'
		    },
		    circleOptions: {
			    fillColor: '#ffff00',
			    fillOpacity: 1,
			    strokeWeight: 5,
			    clickable: false,
			    editable: true,
			    zIndex: 1
		    }
		});
		drawingManager.setMap(map);
	}
}