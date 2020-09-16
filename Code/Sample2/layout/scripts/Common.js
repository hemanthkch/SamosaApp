
function randValue(list, selectCount) {
    var result = new Array(selectCount),
        len = list.length,
        taken = new Array(len);
    if (selectCount > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (selectCount--) {
        var x = Math.floor(Math.random() * len);
        result[selectCount] = list[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function getRow(searchField, searchVal){
  var results = [];
  for (var i=0 ; i < jsonData.Sheet1.length ; i++)
  {
      if (jsonData.Sheet1[i][searchField] == searchVal) {
          results.push(jsonData.Sheet1[i]);
      }
  }
  return results;
}


function getColumn(columnName){
  var results = [];
  for (var i=0 ; i < jsonData.Sheet1.length ; i++)
  {
      results.push(jsonData.Sheet1[i][columnName]);
  }
  return results;
}



function getName(obj){
  var list = [];
  for (var i = 0; i < obj.length; i++) {
    list.push(getRow("SerialNumber", obj[i])[0].StudentName);
  }
  return list;
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


//Notification Alert Box
var AlertBox = function(id, option) {
  this.show = function(msg) {
    if (msg === ''  || typeof msg === 'undefined' || msg === null) {
      throw '"msg parameter is empty"';
    }
    else {
      var alertArea = document.querySelector(id);
      var alertBox = document.createElement('DIV');
      var alertContent = document.createElement('DIV');
      var alertClose = document.createElement('A');
      var alertClass = this;
      alertContent.classList.add('alert-content');
      alertContent.innerText = msg;
      alertClose.classList.add('alert-close');
      alertClose.setAttribute('href', '#');
      alertBox.classList.add('alert-box');
      alertBox.appendChild(alertContent);
      if (!option.hideCloseButton || typeof option.hideCloseButton === 'undefined') {
        alertBox.appendChild(alertClose);
      }
      alertArea.appendChild(alertBox);
      alertClose.addEventListener('click', function(event) {
        event.preventDefault();
        alertClass.hide(alertBox);
      });
      if (!option.persistent) {
        var alertTimeout = setTimeout(function() {
          alertClass.hide(alertBox);
          clearTimeout(alertTimeout);
        }, option.closeTime);
      }
    }
  };

  this.hide = function(alertBox) {
    alertBox.classList.add('hide');
    var disperseTimeout = setTimeout(function() {
      alertBox.parentNode.removeChild(alertBox);
      clearTimeout(disperseTimeout);
    }, 500);
  };
};

var alertPersistent = document.querySelector('#alertPersistent');
var alertMessageBox = document.querySelector('#alertMessageBox');
var alertbox = new AlertBox('#alert-area', {
  closeTime: 5000,
  persistent: false,
  hideCloseButton: false
});
var alertboxPersistent = new AlertBox('#alert-area', {
  closeTime: 5000,
  persistent: true,
  hideCloseButton: false
});
var alertboxPersistent1 = new AlertBox('#alert-area', {
  closeTime: 5000,
  persistent: true,
  hideCloseButton: false
});
var alertboxPersistent2 = new AlertBox('#alert-area', {
  closeTime: 5000,
  persistent: true,
  hideCloseButton: false
});
var alertNoClose = new AlertBox('#alert-area', {
  closeTime: 5000,
  persistent: false,
  hideCloseButton: true
});



