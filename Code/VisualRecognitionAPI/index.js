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

const classifyParams = {
  url: 'https://timesofindia.indiatimes.com/thumb/msid-74765725,width-1200,height-900,resizemode-4/.jpg',
  classifierIds: ['DefaultCustomModel_405792540'],
};

visualRecognition.classify(classifyParams)
  .then(response => {
    const classifiedImages = response.result;
    console.log(JSON.stringify(classifiedImages, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  });
