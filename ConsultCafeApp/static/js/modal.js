function capitalizeFirstLetter(string)
{
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
				var curList = [];
				var curObj = heatMap.heatMapOptions[dataKeys[i]];
				var curObjKeys = Object.keys(curObj);
				for(var j = 0 ; j < curObjKeys.length ; j++)
				{
					var curSubMenu = curObj[curObjKeys[j]];
					for(var k = 0 ; k < curSubMenu.length ; k++)
					{
						if(curSubMenu[k].checked)
							curList.push(capitalizeFirstLetter(curObjKeys[j]) + ': ' + capitalizeFirstLetter(curSubMenu[k].name));
					}
				}
				for(var j = 0 ; j < curList.length ; j++)
				{
					appendables.push(infoSample.replace(/TEXT/g, capitalizeFirstLetter(dataKeys[i]) + ' ' + curList[j]));
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
		var data = heatMap.heatMapOptions[category][subCategory];
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
		var data = heatMap.heatMapOptions[category][subCategory];
		var modalContent = $('#checkboxmodalcontent');
		var checkboxes = modalContent.find('input');
		
		for (var  i = 0 ; i < checkboxes.length ; i++) {
			data[i].checked = checkboxes[i].checked;
		}

		heatMap.reset(data);
		
		$('#menumodal').modal('hide');
	}
	
	var checkBoxSample = '<div><label style="padding: 8px;">LABEL</label><input type="checkbox" value="LABEL" CHECKED /></div>';
	var infoSample = '<div><p>TEXT</p></div>'
};