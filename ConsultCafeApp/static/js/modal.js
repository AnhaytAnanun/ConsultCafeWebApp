function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Modal(){
	var modalId;
	var saved = false;
	
	this.openModal = function(source) {
		if (saved && modalId === source.id) {
			return;
		}
		if(source.id === 'inforeq')
		{
			var appendables = [];
			modalContent = $('#infomodalcontent');
			modalContent.empty();
			var dataKeys = Object.keys(heatMap.heatMapOptions);
			for(var i = 0 ; i < dataKeys.length ; i++)
			{
				var curObj = heatMap.heatMapOptions[dataKeys[i]];
				var curObjKeys = Object.keys(curObj);
				for(var j = 0 ; j < curObjKeys.length ; j++)
				{
					var curStr = '';
					var curSubMenu = curObj[curObjKeys[j]];
					for(var k = 0 ; k < curSubMenu.length ; k++)
					{
						if(curSubMenu[k].checked)
						{
						    if(curStr.length > 0)
								curStr += ', ';
							curStr += capitalizeFirstLetter(curSubMenu[k].name);
						}
					}
					if(curStr.length > 0)
					{
						appendables.push(infoSample.replace(/TEXT/g, capitalizeFirstLetter(dataKeys[i]) + ' ' + capitalizeFirstLetter(curObjKeys[j]) + ': ' + curStr));
					}
				}
			}
			modalContent.append(appendables);
			return;
		}
		saved = false;
		modalId = source.id;
		var hierarchy = modalId.split(':');
		var category = hierarchy[0];
		var subCategory = hierarchy[1];
		var data;
		try {
			data = heatMap.heatMapOptions[category][subCategory];
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
		catch (err){
			data = notSoHeatMap.heatMapOptions[category][subCategory];
			var radios = [];
			var modalContent = $('#radiomodalcontent');
			modalContent.empty();
			
			var cnt = 0;
			for (var i = 0 ; i < data.length ; i++) {
				if(data[i].checked) {
					if(cnt > 0)
						data[i].checked = 0;
					else
						cnt++;
				}
			}
			for (var i = 0 ; i < data.length ; i++) {
				var isChecked = data[i].checked ? ' checked ' : ' ';
				var radio = $('<div><label style="padding: 8px;">'+data[i].name+'</label>' + '<input type="radio" name="myForm"' + isChecked + '/></div>');
				radio.appendTo(modalContent);
			}
		}
	}
	
	this.submitModal = function() {
		saved = true;
		var hierarchy = modalId.split(':');
		var category = hierarchy[0];
		var subCategory = hierarchy[1];
		try {
			var data = heatMap.heatMapOptions[category][subCategory];
			var modalContent = $('#checkboxmodalcontent');
			var checkboxes = modalContent.find('input');
			var areAllUnchecked = true;

			for (var i = 0 ; i < checkboxes.length ; i++) {
				if (checkboxes[i].checked) {
					areAllUnchecked = false;
				}
			}

			if (areAllUnchecked) {
				alert('You must check at least one option!');
				return;
			}
			
			for (var  i = 0 ; i < checkboxes.length ; i++) {
				data[i].checked = checkboxes[i].checked;
			}

			heatMap.reset(data);
		}
		catch (err) {
			var data = notSoHeatMap.heatMapOptions[category][subCategory];
			var modalContent = $('#radiomodalcontent');
			var radios = modalContent.find('input');
			var areAllUnchecked = true;

			for (var i = 0 ; i < radios.length ; i++) {
				if (radios[i].checked) {
					areAllUnchecked = false;
					myStruct[subCategory]=data[i].name;
				}
			}

			if (areAllUnchecked) {
				alert('You must check at least one option!');
				return;
			}
			
			for (var  i = 0 ; i < radios.length ; i++) {
				data[i].checked = radios[i].checked;
			}
			//notSoHeatMap.reset(data);
		}
		$('#menumodal').modal('hide');
	}
	this.setModalContent = function (source, data) {
		var curScores = JSON.parse(data);
		for(var key in curScores) {
		}
	};
	var checkBoxSample = '<div><label style="padding: 8px;">LABEL</label><input type="checkbox" value="LABEL" CHECKED /></div>';
	var radioSample = '<div><label style="padding: 8px;">LABEL</label><input type="radio" value="LABEL" CHECKED /></div>'
	var infoSample = '<div><p>TEXT</p></div>'
};