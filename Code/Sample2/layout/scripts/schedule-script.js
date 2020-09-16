jQuery(document).ready(function($){
	//createGrid();
	//console.log(jsonData);

	//localStorage.setItem('scheduleJsonData',JSON.stringify(scheduleJsonData));

	if(localStorage.length > 0) {
		$('#hdnSdate').val(localStorage.getItem("sdate"));
		$('#hdnEdate').val(localStorage.getItem("edate"));
		$('#hdnMaxNo').val(localStorage.getItem("maxno"));
		localStorage.clear();
	}
	
	var memberCount = jsonData.Sheet1.length;
	var maxChunkSize = $('#hdnMaxNo').val() || 10;
	var startDate = $('#hdnSdate').val() == "" ? new Date("2020-06-15") : new Date($('#hdnSdate').val());
	var endDate = $('#hdnEdate').val() == "" ? new Date("2020-06-18") : new Date($('#hdnEdate').val());

	//loadSavedGrid();
	getSplittedList(memberCount, maxChunkSize, startDate, endDate);

	$("a.gridAnc").on("click",function(e){
		localStorage.clear();
		localStorage.setItem(e.target.id, $("#hdn"+e.target.id.substring(3,5)).val());
		localStorage.setItem("isVirtual", $("#hdnIsVirtual"+e.target.id.substring(3,5)).val());
		localStorage.setItem("day", $("#hdnDay"+e.target.id.substring(3,4)).val());
		console.log(localStorage);
		//MyWindow=window.open('MemberList.html','MyWindow','width=600,height=300'); return false;
		myPopup("/UserList", "SSaPM", 1200, 700);
	});

});

var json1 = JSON.parse(localStorage.getItem('scheduleJsonData'));

function myPopup(myURL, title, myWidth, myHeight) {
   var left = (screen.width - myWidth) / 2;
   var top = (screen.height - myHeight) / 4;
   var myWindow = window.open(myURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + myWidth + ', height=' + myHeight + ', top=' + top + ', left=' + left);
}

function getSplittedList(memberCount, maxChunkSize, startDate, endDate){
	var Difference_In_Time = endDate.getTime() - startDate.getTime(); 
	var DaysToSchedule = Difference_In_Time / (1000 * 3600 * 24);
	var memberIds = getColumn("SerialNumber");
	var day = startDate;
	var tempChunk = memberIds;
	//var tempRemChunk = $(memberIds).not(tempChunk).get();

	const tmpl = $('#item_template').html()
  	const container = $('#app');

	if(memberCount >= maxChunkSize) {
		for (var i = 0; i <= DaysToSchedule + 1; i++) {
			if(i > 1)
				day.setDate(day.getDate() + 1);
			if(day.toDateString().indexOf("Sun") > -1){
				continue;
			}
			//var chunk = randValue(memberIds, maxChunkSize);
			//var remainingChunk = $(memberIds).not(chunk).get();
			//var chunk = tempList.length >= maxChunkSize ? randValue(tempList, maxChunkSize) : tempList.concat(randValue($(memberIds).not(tempList).get(), maxChunkSize - tempList.length));
			//var remainingChunk = $(tempList).not(chunk).get().length != 0 ? $(tempList).not(chunk).get() : $(memberIds).not(chunk).get();

			var chunk = tempChunk.length >= maxChunkSize ? randValue(tempChunk, maxChunkSize) : tempChunk.concat(randValue($(memberIds).not(chunk).get(), (maxChunkSize - tempChunk.length)));
			var remainingChunk = $(memberIds).not(chunk).get();

			var cStudents = getName(chunk);
			var cRStudents = getName(remainingChunk);

			tempChunk = tempChunk.length >= maxChunkSize ? $(tempChunk).not(chunk).get() : remainingChunk;

			for (var j = 0; j < 3; j++){ //Date Label, Group1, Group2
				if(i == 0) addItem(container, tmpl, '', i, j);
				else if(i > 0 && j == 0) addItem(container, tmpl, day.toDateString(), i, j);
				else if(i > 0 && j == 1) addItem(container, tmpl, truncate(cStudents.join(', '), 25), i, j, chunk);
				else if(i > 0 && j == 2) addItem(container, tmpl, truncate(cRStudents.join(', '), 40), i, j, remainingChunk);
				else addItem(container, tmpl)
			}
		}
	}
	else {
		alert("<b>Max. Student per Class</b> can not be more than total number of students");
		window.location="../pages/ImportData.html";
	}
}

function createGrid() {
  const tmpl = $('#item_template').html()
  const container = $('#app');
  
  for(let i=0; i<6; i++) { addItem(container, tmpl); }
  
  $('#add_el').click(() => {
    addItem(container, tmpl);
  })
  
  container.on('click', '.del_el', (e) => {
    $(e.target).closest('.item').remove();
  });
}

function addItem(container, template, content, rowIndex, columnIndex, obj) {
  let color = COLORS[_.random(COLORS.length - 1)];
  let num, htmlContent, dayHtml;
  let isIcon1 = false;
  let isIcon2 = false;
  let isIcon3 = false;
  let isList = content.indexOf(',') > -1 ? true : false;
  let isDate = !isList;
  let isVirtual = columnIndex == 2;
  let day = columnIndex == 0 ? content : "";

  if(rowIndex == 0) {
  	color = '#CCCCCC';
  	isIcon1 = columnIndex == 0 ? true : false;
  	isIcon2 = columnIndex == 1 ? true : false;
  	isIcon3 = columnIndex == 2 ? true : false;
  }
  else if (rowIndex > 0 && (columnIndex == 0 || columnIndex == 1 || columnIndex == 2)) {
  	num = content;
  }
  else {
  	num = _.random(10000);
  }

  //if(isList){
  	htmlContent = 
  	"<p><a href=\"#\" id=\"anc"+rowIndex.toString() + columnIndex.toString()+"\" class=\"gridAnc\" >"+ num +"</a>"+
  	"<input id=\"hdn"+rowIndex.toString() + columnIndex.toString()+"\" type=\"hidden\" value=\""+ obj +"\" />"+
  	"<input id=\"hdnIsVirtual"+rowIndex.toString() + columnIndex.toString()+"\" type=\"hidden\" value=\""+ isVirtual.toString() +"\" />"+
  	"</p>";
  //}
  dayHtml = "<input id=\"hdnDay"+rowIndex+"\" type=\"hidden\" value=\""+ day.toString() +"\" />";

  container.append(Mustache.render(template, { color, num, isIcon1, isIcon2, isIcon3, isList, isDate, htmlContent, dayHtml }));
}

function loadSavedGrid(){
	localStorage.setItem('scheduleJsonData',JSON.stringify(scheduleJsonData));
	const tmpl = $('#item_template').html()
  	const container = $('#app');

  	var savedRows = json1.Sheet1.length;
  	var dayList = getScheduleColumn("Day");
  	for (var i = 0; i < savedRows; i++) {
  		for (var j = 0; j < 3; j++) {
  			if(i == 0){
  				addItem(container, tmpl, '', i, j);
  			}
  			else if (i > 0) {
	  			if(j==0) addItem(container, tmpl, getScheduleRow("Day", dayList[i-1])[0].Day , i, j);
				if(j==1) addItem(container, tmpl, getScheduleRow("Day", dayList[i-1])[0].PhysicalMode , i, j);
				if(j==2) addItem(container, tmpl, getScheduleRow("Day", dayList[i-1])[0].VirtualMode , i, j);
			}
  		}
  	}
}

const COLORS = [
  '#EA4C89',
  '#3B5998',
  "#0E76A8",
  "#00ACEE",
  "#FF3F4A"
];

function truncate(input, trunLength) {
   if (input.length > trunLength)
      return input.substring(0,trunLength) + '...';
   else
      return input;
};

function getScheduleColumn(columnName){
  var results = [];
  for (var i=0 ; i < json1.Sheet1.length ; i++)
  {
      results.push(json1.Sheet1[i][columnName]);
  }
  return results;
}

function getScheduleRow(searchField, searchVal){
  var results = [];
  for (var i=0 ; i < json1.Sheet1.length ; i++)
  {
      if (json1.Sheet1[i][searchField] == searchVal) {
          results.push(json1.Sheet1[i]);
      }
  }
  return results;
}

