import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';

import { ISmsClientV1 } from './ISmsClientV1';
import { SmsMessageV1 } from './SmsMessageV1';
import { SmsRecipientV1 } from './SmsRecipientV1';

//import { ISmsController } from 'service-sms-node';

export class SmsDirectClientV1 extends DirectClient<any> implements ISmsClientV1 {
    private _defaultParameters: ConfigParams;

    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("service-sms", "controller", "*", "*", "*"));

        let thisConfig = ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null) this.configure(thisConfig);
    }
    
    public async sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams): Promise<void> {
        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'sms.send_message');

        try {
            await this._controller.sendMessage(correlationId, message, parameters);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1,
        message: SmsMessageV1, parameters: ConfigParams): Promise<void> {
            
        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'sms.send_message_to_recipient');

        try {
            await this._controller.sendMessageToRecipient(correlationId, recipient, message, parameters);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[],
        message: SmsMessageV1, parameters: ConfigParams): Promise<void> {

        parameters = this._defaultParameters.override(parameters);
        let timing = this.instrument(correlationId, 'sms.send_message_to_recipients');

        try {
            await this._controller.sendMessageToRecipients(correlationId, recipients, message, parameters);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

}