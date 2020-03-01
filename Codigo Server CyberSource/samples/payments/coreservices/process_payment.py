from CyberSource import *
import json
import os
from importlib.machinery import SourceFileLoader
import paho.mqtt.client as paho
import ssl

config_file = os.path.join(os.getcwd(), "data", "Configuration.py")
configuration = SourceFileLoader("module.name", config_file).load_module()

# Setup the credentials

EndPoint = "a1nic3lezioefw-ats.iot.us-east-1.amazonaws.com"
caPath = "samples/payments/coreservices/Certs/aws-iot-rootCA.crt"
certPath = "samples/payments/coreservices/Certs/ThingCert.cert.pem"
keyPath = "samples/payments/coreservices/Certs/PrivateCert.private.key"

cards=""
cvv=""
datey=""
datem=""
mon = ""
# Setup the callback functions

# This function trigger if the client connected
def on_connect(client, userdata, flags, rc):
    print("Connection returned result: " + str(rc) )
    #client.subscribe("#" , 1 ) # Wild Card

# This function trigger every time we receive a message from the platform
def on_message(client, userdata, msg):
    global cards
    global cvv
    global datey
    global datem
    global mon
    y = json.loads(msg.payload.decode())
    
    cards=str(y["card"])
    cvv=str(y["cvv"])
    datey=str(y["datey"])
    datem=str(y["datem"])
    mon=str(y["mon"])
    if(msg.topic=='/Process'):
        process_a_payment(False)
    print("topic: "+msg.topic)
    print("payload: "+str(msg.payload))
    
# This function trigger when we publish  
def on_publish(client, obj, mid):
    print("mid: " + str(mid))
    
# This function trigger when we subscribe to a new topic  
def on_subscribe(client, obj, mid, granted_qos):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))


# We prepare all callback functions and credentials.
mqttc = paho.Client()
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe
mqttc.tls_set(caPath, certfile=certPath, keyfile=keyPath, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)
mqttc.connect(EndPoint, 8883, keepalive=60)
rc = 0

# We subscribe to the topic we use to communicate from the Webapp to the Jetson
mqttc.subscribe('/Process')

# This variable is responsible for counting the number of cycles to take a photo every 30 seconds.


def process_a_payment(flag):
    global cards
    global cvv
    global datey
    global datem
    global mon
    print(cards)
    try:
        # Setting the json message body
        request = CreatePaymentRequest()
        client_reference = Ptsv2paymentsClientReferenceInformation()
        client_reference.code = "test_payment"
        request.client_reference_information = client_reference.__dict__

        processing_info = Ptsv2paymentsProcessingInformation()

        if flag:
            processing_info.capture = "true"

        request.processing_information = processing_info.__dict__

        aggregator_info = Ptsv2paymentsAggregatorInformation()
        sub_merchant = Ptsv2paymentsAggregatorInformationSubMerchant()
        sub_merchant.card_acceptor_id = "1234567890"
        sub_merchant.country = "US"
        sub_merchant.phone_number = "650-432-0000"
        sub_merchant.address1 = "900 Metro Center"
        sub_merchant.postal_code = "94404-2775"
        sub_merchant.locality = "Foster City"
        sub_merchant.name = "Visa Inc"
        sub_merchant.administrative_area = "CA"
        sub_merchant.region = "PEN"
        sub_merchant.email = "test@cybs.com"
        aggregator_info.sub_merchant = sub_merchant.__dict__
        aggregator_info.name = "V-Internatio"
        aggregator_info.aggregator_id = "123456789"
        request.aggregator_information = aggregator_info.__dict__

        order_information = Ptsv2paymentsOrderInformation()
        bill_to = Ptsv2paymentsOrderInformationBillTo()
        bill_to.country = "US"
        bill_to.last_name = "Doe"
        bill_to.address2 = "1 Market St"
        bill_to.address1 = "201 S. Division St."
        bill_to.postal_code = "48104-2201"
        bill_to.locality = "Ann Arbor"
        bill_to.administrative_area = "MI"
        bill_to.first_name = "John"
        bill_to.phone_number = "999999999"
        bill_to.district = "MI"
        bill_to.building_number = "123"
        bill_to.company = "Visa"
        bill_to.email = "test@cybs.com"

        amount_details = Ptsv2paymentsOrderInformationAmountDetails()
        amount_details.total_amount = mon
        amount_details.currency = "USD"

        order_information.bill_to = bill_to.__dict__
        order_information.amount_details = amount_details.__dict__

        payment_info = Ptsv2paymentsPaymentInformation()
        card = Ptsv2paymentsPaymentInformationCard()
        card.expiration_year = datey
        card.number = "5555555555554444"
        card.security_code = cvv
        card.expiration_month = datem
        card.type = "002"
        payment_info.card = card.__dict__
        request.payment_information = payment_info.__dict__

        request.order_information = order_information.__dict__

        message_body = json.dumps(request.__dict__)

        # Reading Merchant details from Configuration file
        config_obj = configuration.Configuration()
        details_dict1 = config_obj.get_configuration()
        payment_obj = PaymentsApi(details_dict1)
        return_data, status, body = payment_obj.create_payment(message_body)
        d=json.loads(body)
        mqttc.publish("/Pago",d["status"])
        return return_data
    except Exception as e:
        print("Exception when calling PaymentsApi->create_payment: %s\n" % e)


while rc == 0:
    rc = mqttc.loop()

print("rc: " + str(rc))



