"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const SmsNullClientV1_1 = require("../version1/SmsNullClientV1");
const SmsDirectClientV1_1 = require("../version1/SmsDirectClientV1");
const SmsHttpClientV1_1 = require("../version1/SmsHttpClientV1");
class SmsClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(SmsClientFactory.NullClientV1Descriptor, SmsNullClientV1_1.SmsNullClientV1);
        this.registerAsType(SmsClientFactory.DirectClientV1Descriptor, SmsDirectClientV1_1.SmsDirectClientV1);
        this.registerAsType(SmsClientFactory.HttpClientV1Descriptor, SmsHttpClientV1_1.SmsHttpClientV1);
    }
}
exports.SmsClientFactory = SmsClientFactory;
SmsClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sms', 'factory', 'default', 'default', '1.0');
SmsClientFactory.NullClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sms', 'client', 'null', 'default', '1.0');
SmsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sms', 'client', 'direct', 'default', '1.0');
SmsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sms', 'client', 'http', 'default', '1.0');
//# sourceMappingURL=SmsClientFactory.js.map