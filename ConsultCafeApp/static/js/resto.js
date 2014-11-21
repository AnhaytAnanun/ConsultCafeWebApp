function Resto() {
	var restoQuery = 'http://localhost:8000/api/resto';

	this.query = function(queryData, callback) {
		$.get(restoQuery, queryData, function(data) {
			callback(data);
		});
	}
}