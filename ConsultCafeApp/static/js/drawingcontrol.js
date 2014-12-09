function stopPolygon() {
	drawingManager.setDrawingMode(null);
};
function clearAll() {
	stopPolygon();
	if(curPolygon != null) {
		curPolygon.setMap(null);
		curPolygon = null;
	}
};
function startPolygon() {
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
};

function makeBackendstring(pointsArray) {
	var backendString = "POLYGON(( ";
	for(var i = 0; i < pointsArray.length ; i++) {
		backendString = backendString.concat(pointsArray[i].lng().toString(),' ',pointsArray[i].lat().toString(),", ");
	}
	backendString = backendString.concat(pointsArray[0].lng().toString(),' ', pointsArray[0].lat().toString(),"))");
	return backendString;
}

function computeIt() {
	if(curPolygon == null)
		return;
	stopPolygon();
	var backendString = makeBackendstring(curPolygon.getPath().getArray());

	$.get('http://localhost:8000/api/loctobus', {
		polygon: backendString,
		minAge: $("#slider-range").slider( "values", 0),
		maxAge: $("#slider-range").slider( "values", 1),
		sex: [0, 1]
	}, function(data) {
		console.log(data);
	});
};

function suggestMenu() {
	if(curPolygon == null) {
		// No polygon selected
		return;
	}
	stopPolygon();

	var backendString = makeBackendstring(curPolygon.getPath().getArray());

	//get suggestions from the server side and then append to the current modal

}
