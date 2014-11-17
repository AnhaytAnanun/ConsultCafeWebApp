$(function() {
	var csrftoken = $.cookie('csrftoken');
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});
	requestRestos();
	table = $('#restos_table');
});

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

var restosQueryUrl = 'http://localhost:8000/api/resto';
var restosEditUrl = 'http://localhost:8000/api/resto/:id'

var table;

function requestRestos() {
	$.get(restosQueryUrl, {}, function(data) {
		for (var i = 0 ; i < data.length ; i++) {
			var entry = data[i]['fields'];
			var id = data[i]['pk'];

			var row = createRow(entry, id);
			table.append(row);
		}

		var row = createRow({
			name: 'name',
			type: 'type',
			location: 'POINT (longitude lattitude)',
			customers: 'customers',
			wages: 'wages',
			rent: 'rent',
			income: 'income',
			area: 'area'
		}, 'new');
		table.append(row);
    });
}

function createRow(entry, id) {
	var row = $('<tr></tr>').attr({id: 'tr_' + id});
	var cellArray = [];

	cellArray.push($('<td>' + id + '</td>').attr({id: 'id_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.name + '"></td>').attr({id: 'name_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.type + '"></td>').attr({id: 'type_' + id}));

	var point = entry.location;
	var point = point.substr(5, point.length).split(' ');
	var longitude = point[1];
	longitude = longitude.substr(1, longitude.length - 1);
	var lattitude = point[2];
	lattitude = lattitude.substr(0, lattitude.length - 2);
	cellArray.push($('<td><input type="text" value="' + longitude + '"></td>').attr({id: 'longitude_' + id}));
	cellArray.push($('<td><input type="text" value="' + lattitude + '"></td>').attr({id: 'lattitude_' + id}));	

	cellArray.push($('<td><input type="text" value="' + entry.customers + '"></td>').attr({id: 'customers_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.wages + '"></td>').attr({id: 'wages_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.rent + '"></td>').attr({id: 'rent_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.income + '"></td>').attr({id: 'income_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.area + '"></td>').attr({id: 'area_' + id}));
	
	var created = entry.created && entry.created.replace('T', ' ');
	var updated = entry.created && entry.updated.replace('T', ' ');
	cellArray.push($('<td>' + created + '</td>').attr({id: 'created_' + id}));
	cellArray.push($('<td>' + updated + '</td>').attr({id: 'updated_' + id}));

	if (id !== 'new') {
		cellArray.push($('<td><button onclick="saveChanges(' + id + ')">save</button></td>').attr({id: id}));
		cellArray.push($('<td><button onclick="removeEntry(' + id + ')">remove</button></td>').attr({id: id}));
	} else {
		cellArray.push($('<td><button onclick="saveNew()">create</button></td>'));
	}

	row.append(cellArray);
	
	return row;
}

function saveChanges(id) {
	var data = {
		name: $('#name_' + id + ' :input').val(),
		type: $('#type_' + id + ' :input').val(),
		longitude: $('#longitude_' + id + ' :input').val(),
		lattitude: $('#lattitude_' + id + ' :input').val(),
		customers: $('#customers_' + id + ' :input').val(),
		wages: $('#wages_' + id + ' :input').val(),
		rent: $('#rent_' + id + ' :input').val(),
		income: $('#income_' + id + ' :input').val(),
		area: $('#area_' + id + ' :input').val()
	};

	$.ajax({
		url: restosEditUrl.replace(':id', id),
		type: 'PUT',
		data: data,
		success: function(data) {
			alert('update succeed');
		},
		error: function(err) {
			alert('update failed');
		}
	});
}

function removeEntry(id) {
	$.ajax({
		url: restosEditUrl.replace(':id', id),
		type: 'DELETE',
		success: function(data) {
			$('#tr_' + id).remove();
		},
		error: function(err) {
			alert('remove failed');
		}
	});
}

function saveNew() {
	var data = {
		name: $('#name_new :input').val(),
		type: $('#type_new :input').val(),
		longitude: $('#longitude_new :input').val(),
		lattitude: $('#lattitude_new :input').val(),
		customers: $('#customers_new :input').val(),
		wages: $('#wages_new :input').val(),
		rent: $('#rent_new :input').val(),
		income: $('#income_new :input').val(),
		area: $('#area_new :input').val()
	};

	$.ajax({
		url: restosQueryUrl + '/',
		type: 'POST',
		data: data,
		success: function(data) {
			data = JSON.parse(data);
			var row = createRow(data[0].fields, data[0].pk);
			$('#tr_new').before(row);
		},
		error: function(err) {
			alert('create failed');
		}
	});
}