import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { SmsController } from 'service-sms-node';
import { SmsHttpServiceV1 } from 'service-sms-node';

import { SmsHttpClientV1 } from '../../src/version1/SmsHttpClientV1';
import { SmsClientFixtureV1 } from './SmsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SmsHttpClientV1', ()=> {
    let service: SmsHttpServiceV1;
    let client: SmsHttpClientV1;
    let fixture: SmsClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let controller = new SmsController();
        controller.configure(new ConfigParams());

        service = new SmsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-sms', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-sms', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new SmsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new SmsClientFixtureV1(client);

        await service.open(null);
        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('Send Sms to Address', async () => {
        await fixture.testSendSmsToAddress();
    });

    test('Send Sms to Recipients', async () => {
        await fixture.testSendSmsToRecipients();
    });

});
