var googleRects = [];
var scores = [];

function displaySuitabilityMap(map) {
	if(googleRects.length > 0)
		return;
	var bounds = map.getBounds();
	var res = 25;
	
	var startx = bounds.getNorthEast().lng();
	var stepx= (bounds.getSouthWest().lng() - startx)/res;
	var starty = bounds.getNorthEast().lat();
	var stepy= (bounds.getSouthWest().lat() - starty)/res;
	
	var rects = [];
	var polygons = [];
	
	for(var i=0;i<res;i++){
		for(var j=0;j<res;j++){
			var rect = [
				new google.maps.LatLng(starty + stepy*i, startx+j*stepx),
				new google.maps.LatLng(starty + stepy*i, startx+j*stepx +stepx),
				new google.maps.LatLng(starty + stepy*(1+i), startx+j*stepx + stepx),
				new google.maps.LatLng(starty + stepy*(i+1), startx+j*stepx ),
				new google.maps.LatLng(starty + stepy*i, startx+j*stepx)
			];
			var polygon = 'POLYGON((' + rect[0].lng() + ' ' + rect[0].lat() + ',' +
				+ rect[1].lng() + ' ' + ' ' + rect[1].lat() + ',' +
				+ rect[2].lng() + ' ' + rect[2].lat() + ',' +
				+ rect[3].lng() + ' ' + rect[3].lat() + ',' +
				+ rect[4].lng() + ' ' + rect[4].lat() + '))';
			rects.push(rect);
			polygons.push(polygon);
		};
	};

	$.get('http://localhost:8000/api/bustoloc', {
		polygons: polygons,
		business: 'pub',
		kitchen: 'european'
	}, function(scores) {
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
					fillOpacity: (0.7 * scores[k] / maxscore )
				});
				googleRects.push(squarePol);
				squarePol.setMap(map);
			}
		}
	});
}
function hideSuitabilityMap(map) {
	for(var i = 0; i<googleRects.length; i++)
		googleRects[i].setMap(null);
	googleRects.length = 0;
	scores.length = 0;
	var bounds = map.getBounds();
	
};