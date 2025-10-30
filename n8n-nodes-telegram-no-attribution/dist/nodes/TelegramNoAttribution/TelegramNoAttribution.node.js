"use strict";
/*
 * Community node: Telegram (No Attribution)
 *
 * Wraps the core Telegram node while forcing the attribution toggle off
 * and preventing the footer from being appended automatically.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramNoAttribution = void 0;
const Telegram_node_1 = require("n8n-nodes-base/dist/nodes/Telegram/Telegram.node");
const telegramGeneric = require('n8n-nodes-base/dist/nodes/Telegram/GenericFunctions.js');
if (!telegramGeneric.__noAttributionPatched) {
    const originalAddAdditionalFields = telegramGeneric.addAdditionalFields;
    telegramGeneric.addAdditionalFields = function (body, index, nodeVersion, instanceId) {
        const additionalFields = (this.getNodeParameter('additionalFields', index, {}) || {});
        if (additionalFields.appendAttribution === undefined) {
            additionalFields.appendAttribution = false;
        }
        return originalAddAdditionalFields.call(this, body, index, nodeVersion, instanceId);
    };
    telegramGeneric.__noAttributionPatched = true;
}
const deepClone = (value) => JSON.parse(JSON.stringify(value));
class TelegramNoAttribution extends Telegram_node_1.Telegram {
    constructor() {
        var _a, _b;
        super();
        const description = deepClone(this.description);
        description.displayName = 'Telegram (No Attribution)';
        description.name = 'telegramNoAttribution';
        description.description = 'Send Telegram messages without the default n8n attribution footer.';
        description.defaults = {
            ...description.defaults,
            name: 'Telegram (No Attribution)',
        };
        description.subtitle = (_b = (_a = description.subtitle) === null || _a === void 0 ? void 0 : _a.replace('Telegram', 'Telegram (No Attribution)')) !== null && _b !== void 0 ? _b : description.subtitle;
        const additionalFieldsProperty = description.properties.find((property) => property.name === 'additionalFields');
        if (additionalFieldsProperty && Array.isArray(additionalFieldsProperty.options)) {
            const appendAttributionOption = additionalFieldsProperty.options.find((option) => option.name === 'appendAttribution');
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
exports.TelegramNoAttribution = TelegramNoAttribution;
