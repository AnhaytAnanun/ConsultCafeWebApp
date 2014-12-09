$(function() {
	var csrftoken = $.cookie('csrftoken');
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});
	requestPeople();
	table = $('#people_table');
});

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

var peopleQueryUrl = 'http://localhost:8000/api/person/';
var peopleEditUrl = 'http://localhost:8000/api/person/:id/'

var table;

function requestPeople() {
	$.get(peopleQueryUrl, {}, function(data) {
		for (var i = 0 ; i < data.length ; i++) {
			var entry = data[i]['fields'];
			var id = data[i]['pk'];

			var row = createRow(entry, id);
			table.append(row);
		}

		var row = createRow({
			age: 'age',
			sex: 'sex',
			busType: 'busType',
			kitchen: 'kitchen'
		}, 'new');
		table.append(row);
    });
}

function createRow(entry, id) {
	var row = $('<tr></tr>').attr({id: 'tr_' + id});
	var cellArray = [];

	cellArray.push($('<td><input type="text" value="' + id + '"></td>').attr({id: 'username_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.age + '"></td>').attr({id: 'age_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.sex + '"></td>').attr({id: 'sex_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.busType + '"></td>').attr({id: 'busType_' + id}));
	cellArray.push($('<td><input type="text" value="' + entry.kitchen + '"></td>').attr({id: 'kitchen_' + id}));
	
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
		username: $('#username_' + id + ' :input').val(),
		age: $('#age_' + id + ' :input').val(),
		sex: $('#sex_' + id + ' :input').val(),
		busType: $('#busType_' + id + ' :input').val(),
		kitchen: $('#kitchen_' + id + ' :input').val(),
		username: $('#username_' + id + ' :input').val()
	};

	$.ajax({
		url: peopleEditUrl.replace(':id', id),
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
		url: peopleEditUrl.replace(':id', id),
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
		username: $('#username_new :input').val(),
		age: $('#age_new :input').val(),
		sex: $('#sex_new :input').val(),
		busType: $('#busType_new :input').val(),
		kitchen: $('#kitchen_new :input').val(),
		username: $('#username_new :input').val(),
		token: Math.floor(Math.random() * 100000000000)
	};

	$.ajax({
		url: peopleQueryUrl,
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