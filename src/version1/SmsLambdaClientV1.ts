import { ConfigParams } from 'pip-services3-commons-nodex';
import { CommandableLambdaClient } from 'pip-services3-aws-nodex';

import { SmsMessageV1 } from './SmsMessageV1';
import { SmsRecipientV1 } from './SmsRecipientV1';
import { ISmsClientV1 } from './ISmsClientV1';

export class SmsLambdaClientV1 extends CommandableLambdaClient implements ISmsClientV1 {
    private _defaultParameters: ConfigParams;

    constructor(config?: any) {
        super('sms');

        let thisConfig = ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null) this.configure(thisConfig);
    }

    public async sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams): Promise<void> {
        parameters = this._defaultParameters.override(parameters);

        let timing = this.instrument(correlationId, 'sms.send_message');

        try {
            await this.callCommand(
                'send_message',
                correlationId,
                {
                    message: message,
                    parameters: parameters
                }
            );
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
            await this.callCommand(
                'send_message_to_recipient',
                correlationId,
                {
                    recipient: recipient,
                    message: message,
                    parameters: parameters
                }
            );
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
            await this.callCommand(
                'send_message_to_recipients',
                correlationId,
                {
                    recipients: recipients,
                    message: message,
                    parameters: parameters
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}
