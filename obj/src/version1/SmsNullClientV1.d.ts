import { ConfigParams } from 'pip-services3-commons-nodex';
import { ISmsClientV1 } from './ISmsClientV1';
import { SmsMessageV1 } from './SmsMessageV1';
import { SmsRecipientV1 } from './SmsRecipientV1';
export declare class SmsNullClientV1 implements ISmsClientV1 {
    sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1, message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
    sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[], message: SmsMessageV1, parameters: ConfigParams): Promise<void>;
}
