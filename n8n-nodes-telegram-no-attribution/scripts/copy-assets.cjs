#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const assets = [
	{
		source: path.join(projectRoot, 'nodes', 'TelegramNoAttribution', 'telegram.svg'),
		destination: path.join(
			projectRoot,
			'dist',
			'nodes',
			'TelegramNoAttribution',
			'telegram.svg',
		),
	},
];

for (const asset of assets) {
	if (!fs.existsSync(asset.source)) {
		console.warn(`[copy-assets] Source file missing: ${asset.source}`);
		continue;
	}

	fs.mkdirSync(path.dirname(asset.destination), { recursive: true });
	fs.copyFileSync(asset.source, asset.destination);
	console.log(`[copy-assets] Copied ${asset.source} -> ${asset.destination}`);
}
