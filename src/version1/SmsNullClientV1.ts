import { ConfigParams } from 'pip-services3-commons-nodex';

import { ISmsClientV1 } from './ISmsClientV1';
import { SmsMessageV1 } from './SmsMessageV1';
import { SmsRecipientV1 } from './SmsRecipientV1';

export class SmsNullClientV1 implements ISmsClientV1 {

    public sendMessage(correlationId: string, message: SmsMessageV1, parameters: ConfigParams): Promise<void> {
        return null;
    }

    public sendMessageToRecipient(correlationId: string, recipient: SmsRecipientV1,
        message: SmsMessageV1, parameters: ConfigParams): Promise<void> {
        return null;
    }

    public sendMessageToRecipients(correlationId: string, recipients: SmsRecipientV1[],
        message: SmsMessageV1, parameters: ConfigParams): Promise<void> {
        return null;
    }

}