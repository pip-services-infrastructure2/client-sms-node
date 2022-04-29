import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { SmsNullClientV1 } from '../version1/SmsNullClientV1';
import { SmsDirectClientV1 } from '../version1/SmsDirectClientV1';
import { SmsHttpClientV1 } from '../version1/SmsHttpClientV1';

export class SmsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-sms', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('service-sms', 'client', 'null', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-sms', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('service-sms', 'client', 'http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(SmsClientFactory.NullClientV1Descriptor, SmsNullClientV1);
		this.registerAsType(SmsClientFactory.DirectClientV1Descriptor, SmsDirectClientV1);
		this.registerAsType(SmsClientFactory.HttpClientV1Descriptor, SmsHttpClientV1);
	}
	
}
