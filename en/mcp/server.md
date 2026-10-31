---
title: MCP Server
section: mcp
---

# MCP Server

The business MCP server is registered under the name **Business Api Server** and describes itself as
read-only business data tools restricted to the authenticated employee's live business and branch
permissions.

It is exposed over **Streamable HTTP** at a single POST endpoint.

## Endpoint

```http
POST /mcp/business
Authorization: Bearer <integration-token>
Content-Type: application/json
Accept: application/json, text/event-stream
X-Business-Branch: 4
```

| Property | Value |
| --- | --- |
| Method | `POST` only |
| Path | `/mcp/business` |
| Transport | Streamable HTTP |
| Protocol | JSON-RPC 2.0 |
| Session header | `MCP-Session-Id` |
| Authentication | Sanctum bearer token from a business credential |

`GET` and `DELETE` on the endpoint return `405` with an `Allow: POST` header. That is part of the
transport contract, not an error in your client.

## Handshake

A client starts with an `initialize` request, then lists tools and calls them:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2025-06-18",
    "capabilities": {},
    "clientInfo": { "name": "example-client", "version": "1.0.0" }
  }
}
```

The response includes the server name, version, protocol version and instructions. The client should then
send `notifications/initialized` and use the `MCP-Session-Id` returned by the server on subsequent
requests when the transport requires it.

## Discovering tools

```json
{ "jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {} }
```

The result lists the five tools with their JSON schemas and descriptions. A client should build its tool
menu from this response rather than hard-coding names.

## Calling a tool

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "sales",
    "arguments": {
      "from": "2026-10-01",
      "to": "2026-10-31",
      "per_page": 25,
      "branch_id": 4
    }
  }
}
```

The result contains the same payload as the matching HTTP endpoint, including `data`, `links` and `meta`
for lists. Detail calls accept `id` and return the document with items and payments.

## Branch selection

The target branch can be supplied in three places, in priority order:

1. The `X-Business-Branch` header.
2. The `branch_id` tool argument.
3. The request parameters.

Use the tool argument when a single conversation may reference several branches; use the header when the
whole client is pinned to one branch.

## Server components

| Component | Count | Notes |
| --- | --- | --- |
| Tools | 5 | Products, stock, purchases, orders, sales |
| Resources | 0 | Not exposed |
| Prompts | 0 | Not exposed |

The server has no static resources or prompt templates. Everything is a tool call with validated
arguments.

## Local sandbox

In `local` and `testing` environments with `APP_DEBUG` enabled, two additional endpoints are registered:

| Path | Purpose |
| --- | --- |
| `/mcp/test` | Sandbox bound to business `#1` |
| `/mcp/business/test` | Alias of the same sandbox |

The sandbox skips credentials, quota and audit charging, and grants business-wide read access to the test
business. It returns `404` outside local/testing. Never enable it in production.

## Debugging with the inspector

```bash
php artisan mcp:inspector
```

The inspector lets you list tools, inspect schemas and call them against a local server without wiring a
full AI client.

## Operating notes

- The MCP endpoint shares the burst limiter and quota with API v2; a tool call costs one request.
- Every call is recorded in the credential's request events with the endpoint name.
- The server does not stream partial results; a tool returns one response.
- Long result sets must be paged with `page` and `per_page`.
- The server never accepts write arguments, even if a client sends them; unsupported properties are
  ignored by validation.

## Related pages

- [MCP Authentication](/docs/mcp/authentication)
- [MCP Tools](/docs/mcp/tools)
- [Client Setup](/docs/mcp/client-setup)
- [MCP Troubleshooting](/docs/mcp/troubleshooting)
