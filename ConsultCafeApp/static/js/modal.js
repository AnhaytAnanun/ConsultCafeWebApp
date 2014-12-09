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
		
		$('#menumodal').modal('hide');
	}

	this.setModalContent = function (data) {
		var names = [];
		var vals = [[], [], [], []];
		var subkeys = [];

		for (var key in data) {
			names.push(key);
			
			var i = 0;

			subkeys = [];

			for (var subkey in data[key]) {
				vals[i].push(data[key][subkey]);
				subkeys.push(subkey);
				i++;
			}
		}

		for (var i = 0 ; i < vals.length ; i = i + 3) {
			var max = Math.max.apply(Math, vals[i]);

			for (var j = 0 ; j < vals[i].length ; j++) {
				vals[i][j] = vals[i][j] / max * 100
			}
		}

		for (var i = 0 ; i < subkeys.length ; i++) {
			subkey = subkeys[i];

			var chart = {
			    labels: names,
			    datasets: [
			        {
			            label: subkey,
			            fillColor: "rgba(220,220,220,0.5)",
			            strokeColor: "rgba(220,220,220,0.8)",
			            highlightFill: "rgba(220,220,220,0.75)",
			            highlightStroke: "rgba(220,220,220,1)",
			            data: vals[i]
			        }
			    ]
			};

			var ctx = document.getElementById(subkey).getContext("2d")
			var barChart = new Chart(ctx).Bar(chart);
		}
	};
	
	var checkBoxSample = '<div><label style="padding: 8px;">LABEL</label><input type="checkbox" value="LABEL" CHECKED /></div>';
	var infoSample = '<div><p>TEXT</p></div>'
};