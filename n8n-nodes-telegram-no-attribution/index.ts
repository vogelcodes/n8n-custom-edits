import type { INodeType } from 'n8n-workflow';

import { TelegramNoAttribution } from './nodes/TelegramNoAttribution/TelegramNoAttribution.node';

export const nodes: Array<new () => INodeType> = [TelegramNoAttribution];

export const credentials = [];
