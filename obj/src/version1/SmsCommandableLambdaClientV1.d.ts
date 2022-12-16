import { ConfigParams } from 'pip-services3-commons-nodex';
import { CommandableLambdaClient } from 'pip-services3-aws-nodex';
import { SmsMessageV1 } from './SmsMessageV1';
import { SmsRecipientV1 } from './SmsRecipientV1';
import { ISmsClientV1 } from './ISmsClientV1';
export declare class SmsCommandableLambdaClientV1 extends CommandableLambdaClient implements ISmsClientV1 {
    private _defaultParameters;
    constructor(config?: any);
    sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1, message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[], message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
}
