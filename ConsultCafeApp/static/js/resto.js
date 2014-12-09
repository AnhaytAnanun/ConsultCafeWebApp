function Resto() {
	var restoQuery = 'http://localhost:8000/api/resto/';

	this.query = function(queryData, callback) {
		console.log(queryData);
		$.get(restoQuery, queryData, function(data) {
			callback(data);
		});
	}
}

function PeopleLocs() {
	var peopleQuery = 'http://localhost:8000/api/personLocs/';

	this.query = function(queryData, callback) {
		console.log(queryData);
		$.get(peopleQuery, queryData, function(data) {
			callback(data);
		});
	}
}