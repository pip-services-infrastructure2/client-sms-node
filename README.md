# Sms Delivery Microservice Client SDK for Node.js / ES2017

This is a Node.js client SDK for [service-sms](https://github.com/pip-services-infrastructure2/service-sms-node) microservice.
It provides an easy to use abstraction over communication protocols:

* HTTP client
* Seneca client (see http://www.senecajs.org)
* Direct client for monolythic deployments
* Null client to be used in testing

In addition to the microservice functionality the client SDK supports message templates 
that can be configured by client user. 

<a name="links"></a> Quick Links:

* [Development Guide](doc/Development.md)
* [API Version 1](doc/NodeClientApiV1.md)

## Install

Add dependency to the client SDK into **package.json** file of your project
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

Then install the dependency using **npm** tool
```bash
# Install new dependencies
npm install

# Update already installed dependencies
npm update
```

## Use

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('client-sms-node');
```

Define client configuration parameters.

```javascript
// Client configuration
var config = {
    parameters: {
        server_url: 'http://localhost:3000',
        client_url: 'http://localhost:8000',
        client_name: 'PipServices Sample',
        welcome_message: 'Congratulations with your signup in <%= clientName %>!',
        signature: 'Sincerely, <%= clientName %> Team'
    },
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
let client = sdk.SmsHttpClient(config);

// Connect to the microservice
try {
    await client.open(null);
    // Work with the microservice
    ...
}
catch (err) {
    console.error('Connection to the microservice failed');
    console.error(err);
}
```

Now the client is ready to perform operations
```javascript
// Send sms message to address
await client.sendMessage(
    null,
    { 
        to: '+12343455633',
        text: 'This is a test message. Please, ignore it'
    },
    null
);
```

```javascript
// Send sms message to users
await client.sendMessageToRecipients(
    null,
    [
        { id: '123', phone: '+12343455633' },
        { id: '321', phone: '+12343434633' }
    ],
    { 
        text: 'This is a test message. Please, ignore it'
    },
    null
);
```

Now you can send a message using the handlebars templates.
Client will automatically load their content and parse.

```javascript
// Send sms message to address using template
await client.sendMessage(
    null,
    { 
        to: 'somebody@somewhere.com',
        text: 'Today is {{ today }}'
    },
    {
        today: new Date.toISOString()
    }
);
```

## Acknowledgements

This client SDK was created and currently maintained by *Sergey Seroukhov*.

