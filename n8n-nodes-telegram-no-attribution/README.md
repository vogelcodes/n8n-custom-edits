# n8n-nodes-telegram-no-attribution

Community node that wraps the official Telegram node but disables the _“This message was sent automatically with n8n”_ footer. The implementation reuses the upstream node so you keep parity with new features while opting out of the marketing attribution.

## Features

- Identical operations and parameters to the native Telegram node
- Attribution toggle defaults to **off** and never forces the footer automatically
- Works with existing Telegram credentials

## Installation

1. Build the package:

   ```bash
   pnpm install
   pnpm build
   ```

2. In your n8n instance (desktop, CLI, or cloud self-hosted), install the community package. For self-hosted deployments you can mount the `dist` folder or publish the package to a registry and install it via the UI/CLI:

   ```bash
   n8n install n8n-nodes-telegram-no-attribution
   ```

3. Restart n8n. A new node called **Telegram (No Attribution)** will appear.

## Usage Notes

- Drop the node into existing workflows as a drop-in replacement for the native Telegram node.
- The `Append n8n Attribution` toggle remains available in case you want to re-enable the footer for specific messages.
- The patch that keeps the footer off is applied once when the node is loaded; no runtime environment variables are necessary.

## Updating

- The community node piggybacks on `n8n-nodes-base`. Update the `n8n-nodes-base`, `n8n-core`, and `n8n-workflow` versions in `package.json` whenever you upgrade your n8n installation, rebuild, and publish/install the new version.

## License

This package wraps code distributed under the [Sustainable Use License](https://github.com/n8n-io/n8n/blob/master/LICENSE.md). Verify that your intended usage is compatible with that license and your n8n deployment.
