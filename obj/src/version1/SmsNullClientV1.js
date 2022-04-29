"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsNullClientV1 = void 0;
class SmsNullClientV1 {
    sendMessage(correlationId, message, parameters) {
        return null;
    }
    sendMessageToRecipient(correlationId, recipient, message, parameters) {
        return null;
    }
    sendMessageToRecipients(correlationId, recipients, message, parameters) {
        return null;
    }
}
exports.SmsNullClientV1 = SmsNullClientV1;
//# sourceMappingURL=SmsNullClientV1.js.map