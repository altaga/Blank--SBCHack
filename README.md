
# Blank-SBCHack

<img src= "https://fincluye.s3.amazonaws.com/palpei.png">

## Hacemos que todos tengan el poder de hacer pagos rápidas y eficaces, por medio de una plataforma inteligente que se integra a lo que ya existe, haciendo que las marcas brinden una experiencia única

### Concepto

El projecto consta de 3 principales componentes que forman una plataforma.


- Un kiosko de pago biometrico wireless y contactless, que utiliza la huella del usuario como medio de pago.

Link: https://sbc-cajero.s3.amazonaws.com/index.html

- Plataforma Webapp que facilita pagos mediante el telefono sin necesidad de pasar por una fila.

Link: https://sbc-movil.s3.amazonaws.com/index.html

- Sistema de pagos contactless basado en CoDi (QR) para realizar los escaneos de productos

## Materiales ultilizados

### Hardware

- Nvidia Jetson Nano (Una Raspberry pi 3 o 4 puede ser suficiente): https://developer.nvidia.com/embedded/jetson-nano-developer-kit
<img src="https://developer.nvidia.com/sites/default/files/akamai/embedded/images/jetsonNano/JetsonNano-DevKit_Front-Top_Right_trimmed.jpg" width="400"/>

- Pantalla Touch o monitor via HDMI:https://www.mimomonitors.com/pages/using-mimo-with-raspberry-pi?gclid=Cj0KCQiA1-3yBRCmARIsAN7B4H3b29sKT4aqI-yz4isnFv-wVygWl-dis6__BwlydWI2HfpoW7k6hDIaAiH6EALw_wcB

<img src="https://cdn.shopify.com/s/files/1/0026/7132/files/Mimo-Pi-Working_grande.jpg?413" width="400"/>

- Sensor de huella: 
https://makersportal.com/blog/2019/6/9/arduino-optical-fingerprint-sensor-as608

<img src="https://images.squarespace-cdn.com/content/v1/59b037304c0dbfb092fbe894/1560115730429-HZBI8GWJLUJ9BK246Z4W/ke17ZwdGBToddI8pDm48kFdj1LU3QXNrC7XCDJRXSjl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1US_GH6w34F4AbXQYP1mTMh6WZrJMPe9RIQ00FIMO_YvQxJ-BQGo94klLBA8TVf45lA/fingerprint_scanner_arduino_banner.jpg?format=2500w" width="400"/>

- Esp32: 
https://github.com/espressif/arduino-esp32

<img src="https://raw.githubusercontent.com/espressif/arduino-esp32/master/docs/esp32_pinmap.png" width="400"/>

- Camara web Logitech: https://www.amazon.com/Logitech-Laptop-Webcam-Design-360-Degree/dp/B004YW7WCY

<img src="https://images-na.ssl-images-amazon.com/images/I/91SNDNgjSiL._AC_SL1500_.jpg" width= "400"/>

- Bateria de Litio : https://www.adafruit.com/product/258

<img src="https://cdn-shop.adafruit.com/1200x900/258-00.jpg" width="400"/>

- Tarjeta de Red o Dongle USB: https://www.amazon.com/Cudy-600Mbps-Adapter-Wireless-Desktop/dp/B07FR95KBG/ref=sr_1_1_sspa?keywords=wifi+dongle&qid=1583079118&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyOU5HT1JZTFpYQVJKJmVuY3J5cHRlZElkPUEwMjg5Njc5MlVGNzNSWUUzT0xEWSZlbmNyeXB0ZWRBZElkPUExMDI3NzE5MTVJTEpFRzJMTVdaSiZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=

<img src="https://images-na.ssl-images-amazon.com/images/I/61J3dkTXWyL._AC_SL1200_.jpg" width="400"/>

### Software 

- Servicios AWS: EC2, S3, Core IoT, Dynamo db, cognito: https://aws.amazon.com/ 
- React JS: https://reactjs.org/
- NodeJS: https://nodejs.org/en/
- Cybersource API en EC2 server (Python): https://developer.cybersource.com/api-reference-assets/index.html

## Esquema de funcionamiento:

<img src="https://fincluye.s3.amazonaws.com/Diagramadealtonivel.png">

Empezando desde el Backend, estamos utilizado los servicios de AWS, particularmente cognito para comunicar las distintas fases del proyecto. Tenemos dos principales "cosas" en cuanto a hardware se trata, la aplicacion movil, y por otro lado el kioko de autopago que trabaja en tandem con con el sensor de huella. La arquitectura esta basada en usar las APIs de CyberSource para correr los principales servicion y como frontend tenemos una progresive Webapp realizada en React para evitar el uso de una aplicacion móvil que mejora la adopción del usuario.


## Algoritmo de implementacion

1.- Ensamble del Hardware siguiendo la documentación proporcionada en cada fuente anteriormente.
2.- Correr una python virtual machine que sirve como backend para .

## Fotos de la implementacion real

<img src="https://i.ibb.co/ThwM9bL/20200301-102409.jpg">








