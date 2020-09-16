const express = require('express');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');
const router = express.Router();
const multer = require('multer');

const sizeOf = require('image-size');
const exphbs = require('express-handlebars');
const fs = require('fs');
const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  authenticator: new IamAuthenticator({
    apikey: '_FX4CKbE3rrqdtzGC5BfRholsnaubV1mQla0he69FKx5',
  }),
  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/f6419b01-e8b1-4d98-b51a-006ce524a035',
});

app.use(express.static(__dirname + '/layout'));
const upload = multer({ dest:__dirname + '/layout/uploads'});

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

app.post('/upload', upload.single('file'), (req, res) => {
	var fileName = req.file.filename;
	fs.rename(__dirname + '/layout/uploads/'+fileName, path.join(__dirname + '/layout/uploads/', fileName+'.png'), function(err) {
	    if (!err) {
	    	console.log(fileName);
	    }
	    else{
	    	console.log(err);
	    }
	  });  
	const classifyParams = {
	  url: 'http://localhost:3000/uploads/'+fileName+'.png',
	  classifierIds: ['DefaultCustomModel_405792540'],
	};

	visualRecognition.classify(classifyParams)
	  .then(response => {
	    const classifiedImages = response.result;
	    console.log(JSON.stringify(classifiedImages, null, 2));
	  })
	  .catch(err => {
	    console.log('error in visualRecognition module:', err);
	  });
  	return res.status(200).send(req.file);
});

//add the router
app.use('/', router);
app.listen(port || 3000);

console.log('Running at Port 3000');