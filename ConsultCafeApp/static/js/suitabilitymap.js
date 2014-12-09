var googleRects = [];
var scores = [];

function displaySuitabilityMap(map) {
	if(googleRects.length > 0)
		return;
	var bounds = map.getBounds();
	var res = 50.;
	
	var startx = bounds.getNorthEast().lng();
	var stepx= (bounds.getSouthWest().lng() - startx)/res;
	var starty = bounds.getNorthEast().lat();
	var stepy= (bounds.getSouthWest().lat() - starty)/res;
	
	var rects = [];
	
	for(var i=0;i<res;i++){
		for(var j=0;j<res;j++){
			var rect = [
				new google.maps.LatLng(starty + stepy*i, startx+j*stepx),
				new google.maps.LatLng(starty + stepy*i, startx+j*stepx +stepx),
				new google.maps.LatLng(starty + stepy*(1+i), startx+j*stepx + stepx),
				new google.maps.LatLng(starty + stepy*(i+1), startx+j*stepx ),
				new google.maps.LatLng(starty + stepy*i, startx+j*stepx)
			];
			rects.push(rect);
		};
	};
	//get scores from backend
	var maxscore = Math.max.apply(Math, scores);
	var k=0;
	for(var i=0; i<res; i++){
		for(var j=0; j<res; j++, k++)
		{
			var squarePol = new google.maps.Polygon({
				paths: rects[k],
				strokeOpacity: 0,
				strokeWeight: 1,
				fillColor: 'rgb(244,69,57)',
				fillOpacity: (0.7 * Math.random() )
			});
			googleRects.push(squarePol);
			squarePol.setMap(map);
		}
	}
}
function hideSuitabilityMap(map) {
	for(var i = 0; i<googleRects.length; i++)
		googleRects[i].setMap(null);
	googleRects.length = 0;
	scores.length = 0;
	var bounds = map.getBounds();
	
};