import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { SmsController } from 'service-sms-node';
import { SmsDirectClientV1 } from '../../src/version1/SmsDirectClientV1';
import { SmsClientFixtureV1 } from './SmsClientFixtureV1';

suite('SmsDirectClientV1', ()=> {
    let client: SmsDirectClientV1;
    let fixture: SmsClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let controller = new SmsController();
        controller.configure(new ConfigParams());

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-sms', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new SmsDirectClientV1();
        client.setReferences(references);

        fixture = new SmsClientFixtureV1(client);

        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
    });

    test('Send Sms to Address', async () => {
        await fixture.testSendSmsToAddress();
    });

    test('Send Sms to Recipients', async () => {
        await fixture.testSendSmsToRecipients();
    });

});
