jQuery(document).ready(function($){


	var idList = [];
	var Day = "";
	var isVirtual = "false";debugger;
	for (k = 0; k < window.localStorage.length; k++) {
	    key = window.localStorage.key(k);
	    if (key.slice(0,3) === "anc") {
	        idList = localStorage.getItem(localStorage.key(k)).split(',');
	    }
	    else if (key === "day") {
	    	Day = localStorage.getItem(localStorage.key(k));
	    }
	    else if (key === "isVirtual") {
	    	isVirtual = localStorage.getItem(localStorage.key(k));
	    }
	}
	localStorage.clear();

	$("#classType").text((isVirtual == "true" ? "Virtual Mode" : "Physical Mode") + " on " + Day);

	createMemberGrid(idList)

	$("#aNotify").on("click", function(){
		ConfirmDialog("Users notified successfully");
		$('.ui-dialog-titlebar').hide();
	});
});

function createMemberGrid(idList){
	const tmpl = $('#item_template').html()
  	const container = $('#app');

	//Paint Grid
	for (var i = 0; i < idList.length + 1; i++) { // +1 for Row Header
		for (var j = 0; j < 4; j++) { //Serial Number, Name, Phone Number, Email
			if(i == 0){
				if(j==0) addItem(container, tmpl, 'Roll No', i, j);
				if(j==1) addItem(container, tmpl, 'Name', i, j);
				if(j==2) addItem(container, tmpl, 'Phone No', i, j);
				if(j==3) addItem(container, tmpl, 'Email ID', i, j);
			}
			else if (i > 0) {
				if(j==0) addItem(container, tmpl, getRow("SerialNumber", idList[i-1])[0].SerialNumber , i, j);
				if(j==1) addItem(container, tmpl, getRow("SerialNumber", idList[i-1])[0].StudentName , i, j);
				if(j==2) addItem(container, tmpl, getRow("SerialNumber", idList[i-1])[0].PhoneNo , i, j);
				if(j==3) addItem(container, tmpl, getRow("SerialNumber", idList[i-1])[0].Email , i, j);
			}
		}
	}
}

function addItem(container, template, content, rowIndex, columnIndex, obj) {
  let color = rowIndex == 0 ? '#FF3F4A' : '#CCCCCC';
  let isFirstRow = rowIndex == 0;
  let num, htmlContent;
  let isIcon1 = false;
  let isIcon2 = false;
  let isIcon3 = false;
  let isList = content.indexOf(',') > -1 ? true : false;
  let isDate = !isList;

  num = content;

  container.append(Mustache.render(template, { color, num, isFirstRow }));
}

function ConfirmDialog(message) {
  $('<div id="comment"></div>').appendTo('body')
    .html('<div><h6>' + message + '</h6></div>')
    .dialog({
      modal: true,
      //title: 'Delete message',
      zIndex: 10000,
      autoOpen: true,
      width: 'auto',
      resizable: false,
      buttons: {
        ok: { id: 'btnYes', text: 'OK', click: function(){
            //window.location = "../pages/ManageSchedules.html";
            $(this).dialog("close"); 
        }}
      },
      close: function(event, ui) {
        $(this).remove();
      }
    });
};