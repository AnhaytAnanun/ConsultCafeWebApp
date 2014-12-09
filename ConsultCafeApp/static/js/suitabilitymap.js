var rects = [];
var googleRects = [];
var scores = [12, 0, 11, 4, 5, 8, 3, 2, 9.99];

function displaySuitabilityMap(map) {
	var bounds = map.getBounds();
	var res = 100.;
	
	var startx = bounds.getNorthEast().lng();
	var stepx= (bounds.getSouthWest().lng() - startx)/res;
	var starty = bounds.getNorthEast().lat();
	var stepy= (bounds.getSouthWest().lat() - starty)/res;
	
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
				strokeWeight: 3,
				fillColor: 'rgb(242,78,67)',
				fillOpacity: (0.5 * Math.random() )
			});
			googleRects.push(squarePol);
			squarePol.setMap(map);
		}
	}
	rects.length = 0;
}
function hideSuitabilityMap(map) {
	for(var i = 0; i<googleRects.length; i++)
		googleRects[i].setMap(null);
	googleRects.length = 0;
	var bounds = map.getBounds();
	
};