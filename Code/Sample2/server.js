const express = require('express');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');
const router = express.Router();
app.use(express.static(__dirname + '/layout'));

app.set('views', __dirname + '/layout/pages');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/ManageSchedules',function(req,res){
  res.sendFile(path.join(__dirname+'/layout/pages/ManageSchedules.html'));
});

router.get('/MonitorUsers',function(req,res){
  res.sendFile(path.join(__dirname+'/layout/pages/MonitorUsers.html'));
});
router.get('/ImportData',function(req,res){
  res.sendFile(path.join(__dirname+'/layout/pages/ImportData.html'));
});
router.get('/UserList',function(req,res){
  res.sendFile(path.join(__dirname+'/layout/pages/UserList.html'));
});
router.get('/UserLayout',function(req,res){
  res.sendFile(path.join(__dirname+'/layout/pages/UserLayout.html'));
});
router.get('/Notify/:groupId',function(req,res){
  var groupId = req.params.groupId;
  res.render(path.join(__dirname+'/layout/pages/TakeAction.html'), {groupId: groupId});
});

//add the router
app.use('/', router);
app.listen(port || 3000);

console.log('Running at Port 3000');