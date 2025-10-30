/*
 * Community node: Telegram (No Attribution)
 *
 * Wraps the core Telegram node while forcing the attribution toggle off
 * and preventing the footer from being appended automatically.
 */

import type {
	IDataObject,
	IExecuteFunctions,
	INodeProperties,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { Telegram as BaseTelegram } from 'n8n-nodes-base/dist/nodes/Telegram/Telegram.node';

type AddAdditionalFieldsFn = (
	this: IExecuteFunctions,
	body: IDataObject,
	index: number,
	nodeVersion?: number,
	instanceId?: string,
) => void;

const telegramGeneric = require('n8n-nodes-base/dist/nodes/Telegram/GenericFunctions.js') as {
	addAdditionalFields: AddAdditionalFieldsFn;
};

if (!(telegramGeneric as IDataObject).__noAttributionPatched) {
	const originalAddAdditionalFields = telegramGeneric.addAdditionalFields;

	telegramGeneric.addAdditionalFields = function (this: IExecuteFunctions, body, index, nodeVersion, instanceId) {
		const additionalFields = (this.getNodeParameter('additionalFields', index, {}) || {}) as IDataObject;

		if (additionalFields.appendAttribution === undefined) {
			additionalFields.appendAttribution = false;
		}

		return originalAddAdditionalFields.call(this, body, index, nodeVersion, instanceId);
	} as AddAdditionalFieldsFn;

	(telegramGeneric as IDataObject).__noAttributionPatched = true;
}

const deepClone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

export class TelegramNoAttribution extends BaseTelegram implements INodeType {
	constructor() {
		super();

		const description = deepClone(this.description) as INodeTypeDescription;

		description.displayName = 'Telegram (No Attribution)';
		description.name = 'telegramNoAttribution';
		description.description = 'Send Telegram messages without the default n8n attribution footer.';
		description.defaults = {
			...description.defaults,
			name: 'Telegram (No Attribution)',
		};
		description.subtitle = description.subtitle?.replace('Telegram', 'Telegram (No Attribution)') ?? description.subtitle;

		const additionalFieldsProperty = description.properties.find(
			(property) => property.name === 'additionalFields',
		) as INodeProperties | undefined;

		if (additionalFieldsProperty && Array.isArray(additionalFieldsProperty.options)) {
			const appendAttributionOption = additionalFieldsProperty.options.find(
				(option) => (option as INodeProperties).name === 'appendAttribution',
			) as INodeProperties | undefined;

			if (appendAttributionOption) {
				appendAttributionOption.default = false;
				appendAttributionOption.displayName = 'Append n8n Attribution (default: off)';
				appendAttributionOption.description =
					'Whether to append the default n8n attribution footer. Disabled by default in this community node.';
			}
		}

		this.description = description;
	}
}
