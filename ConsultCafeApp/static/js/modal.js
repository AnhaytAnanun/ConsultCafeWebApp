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
			var dataKeys = Object.keys(modalData);
			for(var i = 0 ; i < dataKeys.length ; i++)
			{
				var curObj = modalData[dataKeys[i]];
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
	var infoSample = '<div><p>TEXT</p></div>'
};