function Resto() {
	var restoQuery = 'http://localhost:8000/api/resto/';

	this.query = function(queryData, callback) {
		console.log(queryData);
		$.get(restoQuery, queryData, function(data) {
			callback(data);
		});
	}
}