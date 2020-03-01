import React, { Component } from 'react';
import Camera, { IMAGE_TYPES } from './lib';
import './reset.css';

function dataURItoData (dataURI) {
  let byteString = atob(dataURI.split(',')[1]);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return ia;
}

function downloadImageFile (dataUri, imageNumber) {
  let blob = dataURItoData(dataUri);
  var AWS = require('aws-sdk');
      var AWSConfiguration = require('./aws-configuration.js');
      AWS.config.region = AWSConfiguration.region;
  
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
         IdentityPoolId: AWSConfiguration.poolId
      });
  
      var cognitoIdentity = new AWS.CognitoIdentity();
      AWS.config.credentials.get(function(err, data) {
        if (!err) {
        console.log('retrieved identity: ' + AWS.config.credentials.identityId);
        var params = {
           IdentityId: AWS.config.credentials.identityId
        };
        cognitoIdentity.getCredentialsForIdentity(params, function(err, data) {
           if (!err) {
  
           } else {
              console.log('error retrieving credentials: ' + err);
              alert('error retrieving credentials: ' + err);
           }
        });
     } else {
        console.log('error retrieving identity:' + err);
     }
  });
  
  var s3 = new AWS.S3();
  
  function uploadFile() {
      // Read content from the file
  
      // Setting up S3 upload parameters
      const params = {
          Bucket: "fincluye",
          Key: 'img.jpg', // File name you want to save as in S3
          Body: blob
      };
  
      // Uploading files to the bucket
      s3.upload(params, function(err, data) {
          if (err) {
              throw err;
          }
          console.log(`File uploaded successfully. ${data.Location}`);
      });
  };
  uploadFile()
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      age: null,
    };
    this.imageNumber = 0;
  }
  onTakePhoto (dataUri) {
    downloadImageFile(dataUri, this.imageNumber);
    this.imageNumber += 1;
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render () {
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          imageType={IMAGE_TYPES.PNG}
        />
        <form>
      <h1>Hello {this.state.username} {this.state.age}</h1>
      <p>Enter your name:</p>
      <input
        type='text'
        name='username'
        onChange={this.myChangeHandler}
      />
      <p>Enter your age:</p>
      <input
        type='text'
        name='age'
        onChange={this.myChangeHandler}
      />
      </form>
      </div>
    );
  }
}

export default App;
