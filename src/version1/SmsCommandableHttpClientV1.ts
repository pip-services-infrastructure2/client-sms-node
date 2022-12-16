import { ConfigParams } from 'pip-services3-commons-nodex';

import { CommandableHttpClient } from 'pip-services3-rpc-nodex';

import { SmsMessageV1 } from './SmsMessageV1';
import { SmsRecipientV1 } from './SmsRecipientV1';
import { ISmsClientV1 } from './ISmsClientV1';

export class SmsCommandableHttpClientV1 extends CommandableHttpClient implements ISmsClientV1 {
    private _defaultParameters: ConfigParams;

    constructor(config?: any) {
        super('v1/sms');

        let thisConfig = ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null) this.configure(thisConfig);
    }

    public async sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams): Promise<void> {
        parameters = this._defaultParameters.override(parameters);

        await this.callCommand(
            'send_message',
            correlationId,
            {
                message: message,
                parameters: parameters
            }
        );
    }

    public async sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1,
        message: SmsMessageV1, parameters: ConfigParams): Promise<void> {
        parameters = this._defaultParameters.override(parameters);
        
        await this.callCommand(
            'send_message_to_recipient',
            correlationId,
            {
                recipient: recipient,
                message: message,
                parameters: parameters
            }
        );
    }

    public async sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[],
        message: SmsMessageV1, parameters: ConfigParams): Promise<void> {

        parameters = this._defaultParameters.override(parameters);
        await this.callCommand(
            'send_message_to_recipients',
            correlationId,
            {
                recipients: recipients,
                message: message,
                parameters: parameters
            }
        );
    }
}
