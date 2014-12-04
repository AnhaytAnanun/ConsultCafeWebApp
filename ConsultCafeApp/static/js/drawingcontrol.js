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

function computeIt() {
	if(curPolygon == null)
		return;
	stopPolygon();
	var backendString = curPolygon.getPath().getArray().toString();
};

function suggestMenu() {
	if(curPolygon == null) {
		// No polygon selected
		return;
	}
	stopPolygon();
	var backendString = curPolygon.getPath().getArray().toString();
	//get suggestions from the server side and then append to the current modal
}		