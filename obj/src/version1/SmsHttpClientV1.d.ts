import { ConfigParams } from 'pip-services3-commons-nodex';
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';
import { SmsMessageV1 } from './SmsMessageV1';
import { SmsRecipientV1 } from './SmsRecipientV1';
import { ISmsClientV1 } from './ISmsClientV1';
export declare class SmsHttpClientV1 extends CommandableHttpClient implements ISmsClientV1 {
    private _defaultParameters;
    constructor(config?: any);
    sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1, message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[], message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
}
