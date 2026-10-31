---
title: Client Setup
section: mcp
---

# Client Setup

This page shows how to connect the most common MCP clients to `/mcp/business`. The server speaks
Streamable HTTP with a bearer token, so any client that supports HTTP MCP works; stdio-only clients need a
small bridge.

Before you start, create a credential with the abilities the assistant needs and note its secret.

## Values you need

| Value | Example | Where to get it |
| --- | --- | --- |
| Base URL | `https://app.example.com` | Your deployment URL |
| MCP endpoint | `/mcp/business` | Fixed path |
| Token | `12\|abc...` | Settings > API integrations |
| Branch | `4` | Store > Branches, or `/api/v2/context` |

## Streamable HTTP clients

Clients that understand remote MCP servers usually accept a URL plus headers:

```json
{
  "mcpServers": {
    "layatanahi": {
      "url": "https://app.example.com/mcp/business",
      "headers": {
        "Authorization": "Bearer 12|your-secret",
        "X-Business-Branch": "4"
      }
    }
  }
}
```

Some editors use `servers` instead of `mcpServers`, or a UI form with separate fields for URL and headers.
The values are the same: the endpoint URL, the bearer token and the optional branch header.

Keep the configuration file out of version control, or reference an environment variable such as
`${LAYATANAHI_TOKEN}` if the client supports interpolation.

## Stdio-only clients

Desktop clients that launch a local process need a bridge that forwards stdio to HTTP. The widely used
`mcp-remote` bridge does this:

```json
{
  "mcpServers": {
    "layatanahi": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://app.example.com/mcp/business",
        "--header",
        "Authorization: Bearer ${LAYATANAHI_TOKEN}",
        "--header",
        "X-Business-Branch: 4"
      ],
      "env": {
        "LAYATANAHI_TOKEN": "12|your-secret"
      }
    }
  }
}
```

The bridge keeps the session identifier and forwards JSON-RPC messages. If your client supports remote
HTTP natively, prefer that over the bridge.

## Environment-specific notes

| Environment | Note |
| --- | --- |
| Local development | Use the local sandbox at `/mcp/business/test`; no token or quota is required |
| Staging | Use a staging credential, never production data |
| Production | HTTPS only; rotate the credential on a schedule |
| Behind a proxy | Disable response buffering for the MCP path |

The local sandbox exists only when the application runs with `APP_DEBUG=true` in `local` or `testing`. It
is bound to business `#1` and grants business-wide reads.

## Verifying the connection

1. Ask the client to list tools. You should see `products`, `stock`, `purchases`, `orders` and `sales`.
2. Call `products` with `per_page: 1`. A result confirms authentication.
3. Call `sales` without `branch_id` on a multi-branch credential. A `branch_required` error confirms that
   branch enforcement is active.
4. Call a tool whose ability you did not grant. It should fail; if it succeeds, the credential is
   over-scoped.

## Debugging locally

```bash
php artisan mcp:inspector
```

The inspector lists tools and lets you call them with typed arguments. It is the fastest way to separate a
client configuration problem from a server problem.

You can also probe the endpoint with a minimal JSON-RPC call:

```bash
curl -s https://app.example.com/mcp/business \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

## Token hygiene

- Use a distinct credential per client or device.
- Store the token in the client's secret store, not in prompts or screenshots.
- Revoke the credential when the client is retired.
- Rotate after a suspected leak; the old token fails immediately.
- Review `last_used_at` to confirm the client is the one using the credential.

## Related pages

- [MCP Server](/docs/mcp/server)
- [MCP Authentication](/docs/mcp/authentication)
- [MCP Troubleshooting](/docs/mcp/troubleshooting)
- [API Keys & Scopes](/docs/api/api-key)
