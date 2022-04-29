# Client API (version 1) <br/> Sms Delivery Microservices Client SDK for Node.js

Node.js client API for Sms delivery microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [SmsMessageV1 class](#class1)
* [SmsRecipientV1 class](#class2)
* [ISmsClientV1 interface](#interface)
    - [sendMessage()](#operation1)
    - [sendMessageToRecipient()](#operation2)
    - [sendMessageToRecipient()](#operation3)
* [SmsHttpClientV1 class](#client_http)
* [SmsSenecaClientV1 class](#client_seneca)
* [SmsDirectClientV1 class](#client_direct)
* [SmsNullClientV1 class](#client_null)
* [Message Templates](#templates)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "client-sms-node": "^1.0.*",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('client-sms-node');

// Client configuration
var config = {
    parameters: {
        server_url: 'http://localhost:3000',
        client_url: 'http://localhost:8000',
        client_name: 'PipServices Sample',
        welcome_message: 'Congratulations with your signup in {{ clientName }}!',
        signature: 'Sincerely, {{ clientName }} Team'
    }
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8005
    }
};

// Create the client instance
var client = sdk.SmsHttpClientV1(config);

// Open client connection to the microservice
await client.open(null);
    
console.log('Opened connection');
        
// Send sms message to address
try {
    await client.sendMessage(
        null,
        { 
            to: '+1234546345',
            text: 'This is a test message. Please, ignore it'
        },
        null
    );
    console.log('Sms message was successfully sent');
} catch (err) {
    console.error(err);
}
    
// Send sms message to address using template
try {
    await client.sendMessage(
        null,
        { 
            to: '+12342367',
            text: '{{ welcome_message }}'
        },
        {
            user_name: 'Somebody',
            today: new Date.toISOString()
        }
    );
    console.log('Sms message was successfully sent');
} catch (err) {
    console.error(err);
}
```

## Data types

### <a name="class1"></a> SmsMessageV1 class

Message object with sender and recipient addresses, subject and content

**Properties:**
    - to: string or [string] - one or several addresses of message recipient
    - from: string - (optional) sender address
    - text: string - (optional) message plain text body 

### <a name="class2"></a> SmsRecipientV1 class

Recipient properties. If some properties are not set, the service
tries to restore them from sms settings.

**Properties:**
- id: string - unique user id
- name: string - (optional) user full name
- phone: string - (optional) primary user sms
- language: string - (optional) user preferred language

## <a name="interface"></a> ISmsClientV1 interface

If you are using Typescript, you can use ISmsClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ISmsClient interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ISmsClientV1 {
    sendMessage(correlationId, message, parameters);
    sendMessageToRecipient(correlationId, recipient, message, parameters);
    sendMessageToRecipients(correlationId, recipients, message, parameters);
}
```

### <a name="operation1"></a> sendMessage(correlationId, message, parameters)

Sends sms message to specified address or addresses

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- message: SmsMessageV1 - message to be sent
- parameters: Object - (optional) template parameters

### <a name="operation2"></a> sendMessageToRecipient(correlationId, recipient, message, parameters)

Sends sms message to specified recipient

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- recipient: SmsRecipientV1 - recipient properties, including id
- message: SmsMessageV1 - message to be sent
- parameters: Object - (optional) template parameters

### <a name="operation3"></a> sendMessageToRecipients(correlationId, recipients, message, parameters)

Sends sms message to multiple recipients

**Arguments:**
- correlationId: string - id that uniquely identifies transaction
- recipients: SmsRecipientV1[] - array of recipient properties, including id
- message: SmsMessageV1 - message to be sent
- parameters: Object - (optional) template parameters

## <a name="client_http"></a> SmsHttpClientV1 class

SmsHttpClientV1 is a client that implements HTTPprotocol

```javascript
class SmsHttpClientV1 extends CommandableHttpClient implements ISmsClientV1 {
    constructor(config?: any);
    setReferences(refs);
    open(correlationId);
    close(correlationId);
    sendMessage(correlationId, message, parameters);
    sendMessageToRecipient(correlationId, recipient, message, parameters);
    sendMessageToRecipients(correlationId, recipients, message, parameters);
}
```

**Constructor config properties:** 
- parameters: Object - (optional) default parameters to augment content passed in each request
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> SmsSenecaClientV1 class

SmsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class SmsSenecaClientV1 extends CommandableSenecaClient implements ISmsClientV1 {
    constructor(config?: any);        
    setReferences(refs);
    open(correlationId);
    close(correlationId);
    sendMessage(correlationId, message, parameters);
    sendMessageToRecipient(correlationId, recipient, message, parameters);
    sendMessageToRecipients(correlationId, recipients, message, parameters);
}
```

**Constructor config properties:** 
- parameters: Object - (optional) default parameters to augment content passed in each request
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - protocol: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> SmsDirectClientV1 class

SmsDirectClientV1 is a client that calls controller from the same container.
It is intended to be used in monolythic deployments.

```javascript
class SmsDirectClientV1 extends DirectClient implements ISmsClientV1 {
    constructor();
    setReferences(refs);
    open(correlationId);
    close(correlationId);
    sendMessage(correlationId, message, parameters);
    sendMessageToRecipient(correlationId, recipient, subscription, message, parameters);
    sendMessageToRecipients(correlationId, recipients, subscription, message, parameters);
}
```

## <a name="client_null"></a> SmsNullClientV1 class

SmsNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class SmsNullClientV1 implements ISmsClientV1 {
    constructor();
    sendMessage(correlationId, message, parameters);
    sendMessageToRecipient(correlationId, recipient, message, parameters);
    sendMessageToRecipients(correlationId, recipients, message, parameters);
}
```

## <a name="templates"></a> Message Templates

Templates using handlebars format can be assigned corresponding message properties.
Inside, it shall use {{ content_prop }} syntax to include properties from **parameters** argument.

Example of the html template
```html
Dear {{ name }},
<p/>
{{ welcome_message }}
<p/>
To continue, please, verify your sms address. Your verification code is {{ code }}.
<p/>
Click on the 
<a href="{{ client_url }}/#/verify_phone?server_url={{ server_url }}&sms={{ sms }}&code={{ code }}">link</a>
to complete verification procedure
<p/>
---<br/>
{{ signature }}
```