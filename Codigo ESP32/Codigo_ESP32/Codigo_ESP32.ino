#include "certs.h"
#include <WiFiClientSecure.h>
#include <Pushbutton.h>
#include <Adafruit_NeoPixel.h>
#include <MQTTClient.h>
#include "WiFi.h"
#include <Adafruit_Fingerprint.h>
  
#define RXD2 16
#define TXD2 17

bool flag =1;

// Wifi credentials
const char *WIFI_SSID = "sbc_hackathon";
const char *WIFI_PASSWORD = "#sbcHack2";

// The name of the device. This MUST match up with the name defined in the AWS console
#define DEVICE_NAME "Finger"
#define SUB_DEVICE_NAME "Subfinger"

// The MQTTT endpoint for the device (unique for each AWS account but shared amongst devices within the account)
#define AWS_IOT_ENDPOINT "##############.iot.us-east-1.amazonaws.com"

// The MQTT topic that this device should publish to
#define AWS_IOT_TOPIC "$aws/things/" DEVICE_NAME "/shadow/update"
#define AWS_IOT_TOPIC_STATUS "$aws/things/" DEVICE_NAME "S/shadow/update"
#define AWS_IOT_SUB_TOPIC "$aws/things/" SUB_DEVICE_NAME "/shadow/update"

Adafruit_Fingerprint finger = Adafruit_Fingerprint(&Serial2);
WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);

char* string2char(String command){
   if(command.length()!=0){
       char *p = const_cast<char*>(command.c_str());
       return p;
   }
}

void connectToWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  // Only try 15 times to connect to the WiFi
  int retries = 0;
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
  }
}

void connectToAWS()
{
  // Configure WiFiClientSecure to use the AWS certificates we generated
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Connect to the MQTT broker on the AWS endpoint we defined earlier
  client.begin(AWS_IOT_ENDPOINT, 8883, net);
  client.onMessage(messageReceived);

  // Try to connect to AWS and count how many times we retried.

  while (!client.connect(DEVICE_NAME)) {
    delay(100);
  }

  // Make sure that we did indeed successfully connect to the MQTT broker
  // If not we just end the function and wait for the next loop.
  if(!client.connected()){
    return;
  }

  // If we land here, we have successfully connected to AWS!
  // And we can subscribe to topics and send messages.
  client.subscribe(AWS_IOT_SUB_TOPIC);
}

void messageReceived(String &topic, String &payload) {
  Serial.println(payload.substring(0, 5));
  if(payload.substring(0, 5) == "Check")
  {
    bool m = check(payload.substring(5, 6).toInt());
    if(m)
  {
    client.publish(AWS_IOT_TOPIC,"Confirm");
  }
  else
  {
    client.publish(AWS_IOT_TOPIC,"Not Confirm");
  }
  }
}

void connect() {
  connectToWiFi();
  connectToAWS();
}

void setup() {
  pinMode(13,OUTPUT);
  digitalWrite(13,HIGH);
  Serial.begin(9600);
  Serial2.begin(115200, SERIAL_8N1, RXD2, TXD2);
  finger.begin(57600);
    delay(5);
  if (finger.verifyPassword()) {
    Serial.println("Found fingerprint sensor!");
  } else {
    Serial.println("Did not find fingerprint sensor :(");
    while (1) { delay(1); }
  }
  finger.getTemplateCount();
  Serial.print("Sensor contains "); Serial.print(finger.templateCount); Serial.println(" templates");
  connect();
  client.publish(AWS_IOT_TOPIC_STATUS,"Connected");
  digitalWrite(13,LOW);
}

void loop() {
  client.loop();
  delay(10);  // <- fixes some issues with WiFi stability
  if (!client.connected()) {
  digitalWrite(5,HIGH);
  connect();
  digitalWrite(5,LOW);
  }
  
}

uint8_t getFingerprintID() {
  uint8_t p = finger.getImage();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image taken");
      break;
    case FINGERPRINT_NOFINGER:
      Serial.println("No finger detected");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_IMAGEFAIL:
      Serial.println("Imaging error");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }

  // OK success!

  p = finger.image2Tz();
  switch (p) {
    case FINGERPRINT_OK:
      Serial.println("Image converted");
      break;
    case FINGERPRINT_IMAGEMESS:
      Serial.println("Image too messy");
      return p;
    case FINGERPRINT_PACKETRECIEVEERR:
      Serial.println("Communication error");
      return p;
    case FINGERPRINT_FEATUREFAIL:
      Serial.println("Could not find fingerprint features");
      return p;
    case FINGERPRINT_INVALIDIMAGE:
      Serial.println("Could not find fingerprint features");
      return p;
    default:
      Serial.println("Unknown error");
      return p;
  }
  
  // OK converted!
  p = finger.fingerFastSearch();
  if (p == FINGERPRINT_OK) {
    Serial.println("Found a print match!");
  } else if (p == FINGERPRINT_PACKETRECIEVEERR) {
    Serial.println("Communication error");
    return p;
  } else if (p == FINGERPRINT_NOTFOUND) {
    Serial.println("Did not find a match");
    return p;
  } else {
    Serial.println("Unknown error");
    return p;
  }   
  
  // found a match!
  Serial.print("Found ID #"); Serial.print(finger.fingerID); 
  Serial.print(" with confidence of "); Serial.println(finger.confidence); 

  return finger.fingerID;
}

bool check (int fingersd)
{
  int tick1=millis();
  int tick2=tick1;
  while(1)
  {
  if((tick2-tick1)<10000)
  {
    int rea = getFingerprintIDez(fingersd);
    delay(50);            //don't ned to run this at full speed.
    tick2=millis();
    if(rea!=(-1))
    {
      return 1;
    }
  }
  else
  {
   return 0;  
  }
  }        
}

// returns -1 if failed, otherwise returns ID #
int getFingerprintIDez(int fingers) {
  uint8_t p = finger.getImage();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.image2Tz();
  if (p != FINGERPRINT_OK)  return -1;

  p = finger.fingerFastSearch();
  if (p != FINGERPRINT_OK)  return -1;
  
  // found a match!
  Serial.print("Found ID #"); 
  Serial.print(finger.fingerID); 
  Serial.print(" with confidence of "); 
  Serial.println(finger.confidence);
  if(finger.fingerID==fingers and finger.confidence>60)
  {
    return finger.fingerID; 
  }
  return -1;
}
