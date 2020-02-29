#ifndef certs_h
#define certs_h

// Amazon's root CA. This should be the same for everyone.
const char AWS_CERT_CA[] = "-----BEGIN CERTIFICATE-----\n" \
"MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF\n" \
"ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6\n" \
"b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL\n" \
"MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv\n" \
"b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj\n" \
"ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM\n" \
"9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw\n" \
"IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6\n" \
"VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L\n" \
"93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm\n" \
"jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC\n" \
"AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA\n" \
"A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI\n" \
"U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs\n" \
"N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv\n" \
"o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU\n" \
"5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy\n" \
"rqXRfboQnoZsG4q5WTP468SQvvG5\n" \
"-----END CERTIFICATE-----\n";

// The private key for your device
const char AWS_CERT_PRIVATE[] = "-----BEGIN RSA PRIVATE KEY-----\n" \
"MIIEpAIBAAKCAQEAo7F0e5CnOzZIIpddOZ+a0AKDmmG3kHiig/pFS63RVVndMUaF\n" \
"4l3mCzGPLboj5r8TY6KBjMDaC5ip3BrMt1nSNmOSDPKEGPBHnIjMqtuQLMb5lBNd\n" \
"R6PrTAdDRd5eC5vikzTDrSt93ce9OCa8fDZq0N4zOp1pR4WpsYQmXGD9WS0Pfzq0\n" \
"XVUXTNkOD6mb1A4cHD/5diz1dPQvJunaGVxZQVr0PSoe6D5zKIJEpVsmKOs9A08y\n" \
"/N423ynojevWV/NLESznCI6Vw3g1QGTIRF7SubYuvo+XsltjvmXXh9Q6ne+/i/PE\n" \
"jYdYKkuoSZsFSnGe6L6ZkXEuQ3KZCIIwFtXlVQIDAQABAoIBADH6Fu827eflHcb5\n" \
"4aubMB/79IQo+2tveWbD/W4qpnPhmOfXeT7wnjCis+0pHJbxlZDg5566rpfFx258\n" \
"/C2qjcSvR8MONAiNK7/+AEbV/EG/iimMc/lQcaFnwkFNr/bpZBa/kFKJqccRmZLQ\n" \
"ONHPp3MXtBpcPu1oQLQC/ddMgW09GLG7QbMbFQxPilItdwBtQLH0qsxR3lsDj2Cp\n" \
"tpt0z8HuHQRViTTOU6GYWVStAno1QX09NWaLRl5L5JgSfat9OL8ARcM3QDqmYyEu\n" \
"MNkwQ6XZv8gEwjfMnEDy9Mw7Die0WtoIw1JKrjHhvH66Dal8CJ8FmkLMooZ5X90S\n" \
"RnOzrwECgYEAzpvVXZysb/sbCRvxec9Ye2gBt2hNDFx7rY6/M603P49HhW2hAjlo\n" \
"wLayDnO5yUMpyuZLK44qOoFeUafhanUbftHHVeVlwSQRp8UIEGD40L9hlfaXjuEH\n" \
......................................................................
"-----END RSA PRIVATE KEY-----\n";

// The certificate for your device
const char AWS_CERT_CRT[] = "-----BEGIN CERTIFICATE-----\n" \
"MIIDWjCCAkKgAwIBAgIVANtS3JIS+1kgl8pY9ZxGFxnn5oqKMA0GCSqGSIb3DQEB\n" \
"CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t\n" \
"IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yMDAyMjkxODI3\n" \
"MTNaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh\n" \
"dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCjsXR7kKc7Nkgil105\n" \
......................................................................
"-----END CERTIFICATE-----\n";

#endif
