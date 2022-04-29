"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsHttpClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SmsHttpClientV1 extends pip_services3_rpc_nodex_1.CommandableHttpClient {
    constructor(config) {
        super('v1/sms');
        let thisConfig = pip_services3_commons_nodex_1.ConfigParams.fromValue(config);
        this._defaultParameters = thisConfig.getSection('parameters');
        if (config != null)
            this.configure(thisConfig);
    }
    sendMessage(correlationId, message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            parameters = this._defaultParameters.override(parameters);
            let timing = this.instrument(correlationId, 'sms.send_message');
            try {
                yield this.callCommand('send_message', correlationId, {
                    message: message,
                    parameters: parameters
                });
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    sendMessageToRecipient(correlationId, recipient, message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            parameters = this._defaultParameters.override(parameters);
            let timing = this.instrument(correlationId, 'sms.send_message');
            try {
                yield this.callCommand('send_message_to_recipient', correlationId, {
                    recipient: recipient,
                    message: message,
                    parameters: parameters
                });
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    sendMessageToRecipients(correlationId, recipients, message, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            parameters = this._defaultParameters.override(parameters);
            let timing = this.instrument(correlationId, 'sms.send_message_to_recipients');
            try {
                yield this.callCommand('send_message_to_recipients', correlationId, {
                    recipients: recipients,
                    message: message,
                    parameters: parameters
                });
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
}
exports.SmsHttpClientV1 = SmsHttpClientV1;
//# sourceMappingURL=SmsHttpClientV1.js.map