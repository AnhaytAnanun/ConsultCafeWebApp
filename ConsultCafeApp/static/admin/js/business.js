$(function() {
	var csrftoken = $.cookie('csrftoken');
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});
	requestBusinesses();
	table = $('#businesses_table');
});

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

var businessesQueryUrl = 'http://localhost:8000/api/business/';
var businessesEditUrl = 'http://localhost:8000/api/business/:id/'

var table;

function requestBusinesses() {
	$.get(businessesQueryUrl, {}, function(data) {
		for (var i = 0 ; i < data.length ; i++) {
			var entry = data[i]['fields'];
			var id = data[i]['pk'];

			var row = createRow(entry, id);
			table.append(row);
		}

		var row = createRow({
			name: 'name',
			type: 'wage',
			income: 'income',
		}, 'new');
		table.append(row);
    });
}

function createRow(entry, id) {
	var row = $('<tr></tr>').attr({id: 'tr_' + id});
	var cellArray = [];

	cellArray.push($('<td><input type="text" value="' + id + '"></td>').attr({id: 'name_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.wage + '"></td>').attr({id: 'wage_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.income + '"></td>').attr({id: 'income_' + id}));
	
	var created = entry.created && entry.created.replace('T', ' ');
	var updated = entry.created && entry.updated.replace('T', ' ');
	cellArray.push($('<td>' + created + '</td>').attr({id: 'created_' + id}));
	cellArray.push($('<td>' + updated + '</td>').attr({id: 'updated_' + id}));

	if (id !== 'new') {
		cellArray.push($('<td><button onclick="saveChanges(\'' + id + '\')">save</button></td>').attr({id: id}));
		cellArray.push($('<td><button onclick="removeEntry(\'' + id + '\')">remove</button></td>').attr({id: id}));
	} else {
		cellArray.push($('<td><button onclick="saveNew()">create</button></td>'));
	}

	row.append(cellArray);
	
	return row;
}

function saveChanges(id) {
	var data = {
		name: $('#name_' + id + ' :input').val(),
		wage: $('#wage_' + id + ' :input').val(),
		income: $('#income_' + id + ' :input').val()
	};

	$.ajax({
		url: businessesEditUrl.replace(':id', id),
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
		url: businessesEditUrl.replace(':id', id),
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
		wage: $('#wage_new :input').val(),
		income: $('#income_new :input').val()
	};

	$.ajax({
		url: businessesQueryUrl,
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