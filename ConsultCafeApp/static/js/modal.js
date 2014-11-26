function Modal(){
	var modalId;
	var saved = false;
	
	this.openModal = function(source) {
		if (saved && modalId === source.id) {
			return;
		}
		
		saved = false;
		modalId = source.id;
		var hierarchy = modalId.split(':');
		var category = hierarchy[0];
		var subCategory = hierarchy[1];
		var data = modalData[category][subCategory];
		var checkboxes = [];
		var modalContent = $('#checkboxmodalcontent');
		modalContent.empty();
		
		for (var i = 0 ; i < data.length ; i++) {
			var checkbox = checkBoxSample.replace(/LABEL/g, data[i].name);
			var isChecked = data[i].checked ? 'checked="true"' : ' ';
			checkbox = checkbox.replace(/CHECKED/g, isChecked);
			checkboxes.push($(checkbox));
		}
		
		modalContent.append(checkboxes);
	}
	
	this.submitModal = function() {
		saved = true;
		var hierarchy = modalId.split(':');
		var category = hierarchy[0];
		var subCategory = hierarchy[1];
		var data = modalData[category][subCategory];
		var modalContent = $('#checkboxmodalcontent');
		var checkboxes = modalContent.find('input');
		
		for (var  i = 0 ; i < checkboxes.length ; i++) {
			data[i].checked = checkboxes[i].checked;
		}

		resto.query(modalData['restaurant'], function() {

		});
		
		$('#menumodal').modal('hide');
	}
	
	var modalData = {
		restaurant: {
			type: [
				{
					name: 'pub',
					checked: false
				},
				{
					name: 'restaurant',
					checked: false
				},
				{
					name: 'anticafe',
					checked: false
				}
			],
			kitchen: [
				{
					name: 'european',
					checked: false
				},
				{
					name: 'chinese',
					checked: false
				},
				{
					name: 'sweet',
					checked: false
				}
			]
		}
	}
	
	var checkBoxSample = '<div><label style="padding: 8px;">LABEL</label><input type="checkbox" value="LABEL" CHECKED /></div>';
};