# Model Context Protocol (MCP) in FormGuard

FormGuard support for MCP allows you to connect your account directly to AI agents (Cursor, VSCode, Windsurf).

## Features

- **Inventory**: List all forms and metadata.
- **Lifecycle**: Create and delete forms programmatically.
- **Configuration**: Update webhooks, public pages, and auto-responders.
- **Data Access**: Fetch recent submissions and AI insights.

## Available Tools

| Tool                     | Description                  | Key Arguments                                |
| ------------------------ | ---------------------------- | -------------------------------------------- |
| `list_forms`             | List all account forms       | -                                            |
| `create_form`            | Create a new form            | `name`                                       |
| `delete_form`            | Permanently delete a form    | `endpointId`                                 |
| `update_form_settings`   | Configure form behavior      | `endpointId`, `webhookUrl`, `isPublic`, etc. |
| `get_form_details`       | View full form configuration | `endpointId`                                 |
| `get_recent_submissions` | Fetch latest form data       | `endpointId`, `limit`                        |
| `get_ai_insights`        | Retrieve AI analysis summary | `endpointId`                                 |

## Setup Instructions

### 1. Generate an API Key

Visit the [MCP Dashboard](https://formguard.strivio.world/dashboard/mcp) to create a key.

### 2. Configure Your AI Agent

#### Cursor / VSCode

1. Go to **Settings** > **MCP**.
2. Add a new **SSE** server.
3. **URL**: `https://formguard.strivio.world/api/mcp`
4. **Header**: `x-api-key: YOUR_KEY`

## Example Commands for AI

- "Create a new form named 'Product Feedback'."
- "Enable the public page for my 'Waitlist' form."
- "Set the Discord webhook for the 'Contact' form to `https://discord.com/api/webhooks/...`."
- "Show me the AI insights summary for form `xyz123`."

## Security

Revoke keys instantly from the dashboard if compromised. MCP provides full write access to your forms.
