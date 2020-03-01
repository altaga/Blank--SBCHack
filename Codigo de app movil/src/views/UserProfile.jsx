/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { Grid, Row, Col, Table} from "react-bootstrap";
import './reset.css';
import 'react-credit-cards/es/styles-compiled.css';
import { css } from 'glamor';
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import QrReader from 'react-qr-reader'
import Button from '@material-ui/core/Button';



var id="2";
var total2=0;
const rule = css({
  width: "100%",
  padding: "12px 20px",
  margin: "8px 0",
  boxSizing: "border-box",
  border: "2px solid #00b5e4",
  borderRadius: "4px"
});
var name;
var mqttClient;

var cart = {
"item":[]
}

var datamem;
var AWS = require('aws-sdk');
var AWSIoTData = require('aws-iot-device-sdk');
var AWSConfiguration = require('./aws-configuration.js');

//var clinic = "Example Hospital 1"

console.log('Loaded AWS SDK for JavaScript and AWS IoT SDK for Node.js');

//
// Remember our message history here.
//
var messageHistory = '';

var refresh = 0;
var confirm = 0;

//
// Create a client id to use when connecting to AWS IoT.
//
var clientId = 'mqtt-explorer-' + (Math.floor((Math.random() * 100000) + 1));

//
// Initialize our configuration.
//
AWS.config.region = AWSConfiguration.region;

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
   IdentityPoolId: AWSConfiguration.poolId
});

//
// Create the AWS IoT device object.  Note that the credentials must be 
// initialized with empty strings; when we successfully authenticate to
// the Cognito Identity Pool, the credentials will be dynamically updated.
//
mqttClient = AWSIoTData.device({
   //
   // Set the AWS region we will operate in.
   //
   region: AWS.config.region,
   //
   ////Set the AWS IoT Host Endpoint
   host:AWSConfiguration.host,
   //
   // Use the clientId created earlier.
   //
   clientId: clientId,
   //
   // Connect via secure WebSocket
   //
   protocol: 'wss',
   //
   // Set the maximum reconnect time to 8 seconds; this is a browser application
   // so we don't want to leave the user waiting too long for reconnection after
   // re-connecting to the network/re-opening their laptop/etc...
   //
   maximumReconnectTimeMs: 1000,
   //
   // Enable console debugging information (optional)
   //
   debug: true,
   //
   // IMPORTANT: the AWS access key ID, secret key, and sesion token must be 
   // initialized with empty strings.
   //
   accessKeyId: '',
   secretKey: '',
   sessionToken: ''
});

//
// Attempt to authenticate to the Cognito Identity Pool.  Note that this
// example only supports use of a pool which allows unauthenticated 
// identities.
//
var cognitoIdentity = new AWS.CognitoIdentity();
AWS.config.credentials.get(function(err, data) {
   if (!err) {
      console.log('retrieved identity: ' + AWS.config.credentials.identityId);
      var params = {
         IdentityId: AWS.config.credentials.identityId
      };
      cognitoIdentity.getCredentialsForIdentity(params, function(err, data) {
         if (!err) {
            //
            // Update our latest AWS credentials; the MQTT client will use these
            // during its next reconnect attempt.
            //
            mqttClient.updateWebSocketCredentials(data.Credentials.AccessKeyId,
               data.Credentials.SecretKey,
               data.Credentials.SessionToken);
         } else {
            console.log('error retrieving credentials: ' + err);
            alert('error retrieving credentials: ' + err);
         }
      });
   } else {
      console.log('error retrieving identity:' + err);
   }
});

  

  window.mqttClientConnectHandler = function() 
  {
    console.clear();
    console.log('connect');
    mqttClient.subscribe("$aws/things/Finger/shadow/update");
    mqttClient.subscribe("/Pago");
  }
  
  //
  // Reconnect handler; update div visibility.
  //
  
  
  window.mqttClientReconnectHandler = function() {
    console.log('reconnect : times : ' + refresh.toString());  
  };
  
  window.mqttClientMessageHandler = function(topic, payload) {
    console.log('message: ' + topic + ':' + payload.toString());
    if(topic == "/Pago")
    {
      if(payload.toString() == "AUTHORIZED")
      {
        var docClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});
        var params = {
          ExpressionAttributeValues: {
           ":v1": {
             S: id
            }
          }, 
          KeyConditionExpression: "FingerId = :v1", 
          TableName: "SBC"
         };
         docClient.query(params, function(err, data) {
          if (err) {
              console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
          } else {
              console.log(data.Items[0]);
              var display=(parseInt(data.Items[0]["Bal"]['S'])-total2).toString();
              var vis = (parseInt(data.Items[0]["Visitas"]['S'])+1).toString();
              params = {
              TableName: "SBC",
              Item: {
                  "Bal":{S: display},
                  "Card": {S:data.Items[0]["Card"]['S']},
                  "cvv": {S:data.Items[0]["cvv"]['S']},
                  "Direccion": {S:data.Items[0]["Direccion"]['S']},
                  "Edad":  {S:data.Items[0]["Edad"]['S']},
                  "Fecha": {S:data.Items[0]["Fecha"]['S']},
                  "FingerId": {S:data.Items[0]["FingerId"]['S']},
                  "Fname": {S:data.Items[0]["Fname"]['S']},
                  "Genero":{S:data.Items[0]["Genero"]['S']},
                  "Link": {S:data.Items[0]["Link"]['S']},
                  "m":{S:data.Items[0]["m"]['S']},
                  "Refere":{S: data.Items[0]["Refere"]['S']},
                  "Status": {S:data.Items[0]["Status"]['S']},
                  "y": {S:data.Items[0]["y"]['S']},
                  "Visitas":{S:vis}
              }
              };

                            
                    // Call DynamoDB to add the item to the table
                    docClient.putItem(params, function(err, data1) {
                      if (err) {
                        console.log("Error", err);
                      } else {
                        console.log("Success", data1);
                          // Your application has indicated there's an error

                      }
                  
                    })

              

             var params2 = {
                TableName: "SBC_Productos",
                Item: {
                    "Refere":{S: data.Items[0]["Refere"]['S']},
                    "Visita": {S:vis},
                    "Items": {S:JSON.stringify(cart)}
                }
                };
            
              // Call DynamoDB to add the item to the table
              docClient.putItem(params2, function(err, data) {
                if (err) {
                  console.log("Error", err);
                } else {
                  
                  const coas=(
                    <StatsCard
                        bigIcon={<i className="fa fa-money" />}
                        statsText={"Transaccion Realizada con Exito, tu nuevo saldo es"}
                        statsValue={"$"+display}
                        style={{width: '100%',marginTop:'10px' }}
                      />
                  
                    );
                    const coas2=(
                      <div />
                     );
                  
                  
                    ReactDOM.render(coas,document.getElementById('price'))
                    ReactDOM.render(coas2,document.getElementById('price2'))
                    window.setTimeout(function(){
          
                      // Move to a new location or you can do something else
                      window.location.href = "https://sbc-movil.s3.amazonaws.com/index.html";
  
                  }, 10000);
                }
              })







          }
      });

    
     

      }
      else
      {

      }
    }

  };
  
  mqttClient.on('connect', window.mqttClientConnectHandler);
  mqttClient.on('reconnect', window.mqttClientReconnectHandler);
  mqttClient.on('message', window.mqttClientMessageHandler);
  mqttClient.on('close', function() {
    console.log('close');
  });
  mqttClient.on('offline', function() {
    console.log('offline');
  });
  mqttClient.on('error', function(error) {
    console.log('error', error);
  });
  

class UserProfile extends Component {

  constructor (props) {
    super(props);
    this.state = {
    };
    this.imageNumber = 0;
  }

  handleError = err => {
    console.error(err)
  }

  handleClick = () => {
    var total=0;
    var i;
for (i = 0; i < cart["item"].length; i++) {
  total = total + parseFloat(cart["item"][i]["price"])
 }
 var docClient = new AWS.DynamoDB({apiVersion: '2012-08-10'});
 var params = {
   ExpressionAttributeValues: {
    ":v1": {
      S: id
     }
   }, 
   KeyConditionExpression: "FingerId = :v1", 
   TableName: "SBC"
  };
  docClient.query(params, function(err, data) {
   if (err) {
       console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
   } else {
       console.log(data.Items[0]);
       var total=0;
       var i;
       for (i = 0; i < cart["item"].length; i++) {
         total = total + parseFloat(cart["item"][i]["price"])
         total2=total
       }
       if(parseInt(data.Items[0]["Bal"]['S'])>total)
     {
       console.log("Si tiene Suficiente Saldo")
       var send = '{"card":"'+ data.Items[0]["Card"]['S']+'","cvv":"'+ data.Items[0]["cvv"]['S']+'","datey":"'+ data.Items[0]["y"]['S']+'","datem":"'+ data.Items[0]["m"]['S']+'","mon":"'+ total.toString()+'"}';
       console.log(send)
       mqttClient.publish("/Process", send);
     }
     else{
       alert("No tiene Suficiente Saldo")
     }


   }
});

  }


  handleScan = data => {
    if (data) {
    if(data == datamem)
    {
      // Nothing
}
else{
  datamem=data
  console.log(data)
  cart["item"][cart["item"].length]=JSON.parse(data)
  var i;
  for (i = 0; i < cart["item"].length; i++) {
    const coas=(
      <StatsCard
          bigIcon={<i className={cart["item"][i]["image"]} />}
          statsText={cart["item"][i]["name"]}
          statsValue={"$"+cart["item"][i]["price"]}
          statsIconText={cart["item"][i]["des"]}
        />
      );
      ReactDOM.render(coas,document.getElementById('Carrito'+(i+1).toString()))
        }
        
  var total=0;
  for (i = 0; i < cart["item"].length; i++) {
    total = total + parseFloat(cart["item"][i]["price"])
   }
   const coas=(
    <StatsCard
        bigIcon={<i className="fa fa-money" />}
        statsText={"Total"}
        statsValue={"$"+total.toString()}
        style={{width: '100%',marginTop:'10px' }}
      />
  
    );
    const coas2=(
      <Button variant="contained" color="primary" fullWidth={true} size="large" onClick={this.handleClick}>
       Click me
     </Button>
     );
  
  
    ReactDOM.render(coas,document.getElementById('price'))
    ReactDOM.render(coas2,document.getElementById('price2'))
}
}
}
  

  myChangeHandler = (event) => {
    if(event.target.name==="name")
    {
      name = event.target.value;
    }

  }
  componentDidMount(){
    const coasas=(
      <img src="https://i.ibb.co/SVbPykr/fin.png" className="img-fluid" alt="" />
    );
    ReactDOM.render(coasas,document.getElementById('Carrito1'))
      }
  
  render() {
    return (
      
<div className="content" style={{backgroundColor: "rgb(247,247,248)"}}>
<div style={{paddingRight:"50px",padding:"20px"}}>
{
//<img src={Images} alt="Smiley face"  style={{ float: "right",borderRadius: "120px 20px 120px 20px",boxShadow: "20px 30px 25px #888888",width:"40%"}}/>
}
</div> 


<Grid container spacing={6}>
<Row id="ins">
<Col lg={4} sm={12}>
      <QrReader
  delay={100}
  resolution={600}
  onError={this.handleError}
  onScan={this.handleScan}
  style={{width: '100%' }}/>
  </Col>
  <Col lg={3} sm={6} id="Carrito1" />
  <Col lg={3} sm={6} id="Carrito2" />
  <Col lg={3} sm={6} id="Carrito3" />
  <Col lg={3} sm={6} id="Carrito4" />
  <Col lg={3} sm={6} id="Carrito5" />
  <Col lg={3} sm={6} id="Carrito6" />
  <Col lg={3} sm={6} id="Carrito7" />
  <Col lg={3} sm={6} id="Carrito8" />
  <Col lg={3} sm={6} id="Carrito9" />
  <Col lg={3} sm={6} id="Carrito10" />
  <Col lg={3} sm={6} id="Carrito11" />
  <Col lg={3} sm={6} id="Carrito12" />
  <Col lg={3} sm={6} id="Carrito13" />
  <Col lg={3} sm={6} id="Carrito14" />
  <Col lg={3} sm={6} id="Carrito15" />
  <Col lg={3} sm={6} id="Carrito16" />
  <Col lg={3} sm={6} id="Carrito17" />
  <Col lg={3} sm={6} id="Carrito18" />
</Row> 
<Row >
<p />
<p />
<p />
<p />
<p />
<p />
<Col id="price" lg={9} sm={6}  />

</Row>  
<Row>

<Col id="price2" /> 
</Row>    
</Grid>
 


      </div>
    );
  }
}

export default UserProfile;