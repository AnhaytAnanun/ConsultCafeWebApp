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

function computeIt(modalId) {
	stopPolygon();
	if(curPolygon == null)
		return;
	var backendString = makeBackendstring(curPolygon.getPath().getArray());
	var sex = [];

	if ($('#isfemale')[0].checked) {
		sex.push(0);
	}
	if ($('#ismale')[0].checked) {
		sex.push(1);
	}
	
	$.get('http://localhost:8000/api/loctobus', {
		polygon: backendString,
		minAge: $("#age-slider").slider( "values", 0),
		maxAge: $("#age-slider").slider( "values", 1),
		sex: sex
	}, function(data) {
		$(modalId).modal('show');
		modal.setModalContent(data);
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
