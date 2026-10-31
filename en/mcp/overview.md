---
title: MCP Overview
section: mcp
---

# MCP Overview

The Model Context Protocol (MCP) lets an AI client — Claude Desktop, Cursor, an IDE agent or a custom
assistant — call tools on a server in a structured way. Layatanahi exposes a read-only MCP server so an
assistant can answer questions about your business without screen scraping or copy-paste.

The server is not a second API. It uses the same business data, the same integration credentials, the same
abilities, the same branch scope and the same quota as `/api/v2`.

## What the server offers

| Capability | Detail |
| --- | --- |
| Tools | Products, stock, purchases, orders, sales |
| Resources | None |
| Prompts | None |
| Transport | Streamable HTTP |
| Direction | Read-only |
| Authentication | Business integration bearer token |

Every tool returns the same data as the matching HTTP endpoint, including pagination metadata. There is no
write tool, so an assistant cannot create a sale, change a price or pay a bill.

## Why use MCP instead of raw HTTP

| Aspect | MCP | Raw HTTP |
| --- | --- | --- |
| Discovery | The client lists tools and their schemas | You read the docs and build requests |
| Arguments | JSON schema per tool, validated by the server | Manual query parameters |
| Integration effort | Configure a URL and a token | Write a client |
| Guardrails | Tool descriptions and schemas constrain the model | The model can call any URL |

MCP is the better choice when the consumer is an LLM. Use HTTP when the consumer is a deterministic
program.

## Architecture

```text
AI client
   │  POST /mcp/business   (JSON-RPC over Streamable HTTP)
   ▼
BusinessApiServer
   ├── products tool  ─┐
   ├── stock tool      │
   ├── purchases tool  ├──► BusinessApiReadService ──► business data
   ├── orders tool     │
   └── sales tool     ─┘
   ▲
   └── credential, live permissions, branch scope, quota
```

The credential pipeline runs before any tool executes: membership, ability, branch resolution, burst limit
and quota are all checked exactly as they are for an HTTP request.

## The five tools

| Tool | Ability | Reads |
| --- | --- | --- |
| `products` | `products:read` | Catalog with search |
| `stock` | `stock:read` | Stock rows per branch |
| `purchases` | `purchases:read` | Purchase list and detail |
| `orders` | `orders:read` | Inter-branch orders |
| `sales` | `sales:read` | Sale list and detail |

Tool names are derived from the server registration and are listed by `tools/list`. See
[MCP Tools](/docs/mcp/tools) for schemas and examples.

## What the assistant can and cannot do

| Can | Cannot |
| --- | --- |
| Search the catalog | Create or edit products |
| Report stock per branch | Adjust, transfer or merge stock |
| Summarise purchases, orders and sales | Pay, return or delete documents |
| Fetch one document with line items | Read accounts, salaries or roles |
| Respect the user's branch scope | Escape to another business |

## Scope and safety

- The server derives everything from the credential. There is no "admin mode" argument.
- Branch scope is enforced before the tool runs; a tool call cannot widen it.
- Permissions are re-checked per request, so a demoted employee loses access immediately.
- Results are limited to the business that owns the credential.
- The local sandbox endpoints exist only in local and testing environments with debug enabled.

## Requirements

| Requirement | Detail |
| --- | --- |
| Business | Active, with at least one branch |
| Credential | Created in Settings with the abilities the client needs |
| Client | Supports MCP Streamable HTTP, or a stdio bridge |
| Network | HTTPS access to the application from the client host |

## Where to go next

| Goal | Page |
| --- | --- |
| Understand the endpoint | [MCP Server](/docs/mcp/server) |
| Configure the token and branch | [MCP Authentication](/docs/mcp/authentication) |
| Read tool schemas | [MCP Tools](/docs/mcp/tools) |
| Connect a client | [Client Setup](/docs/mcp/client-setup) |
| Fix an error | [Troubleshooting](/docs/mcp/troubleshooting) |

## Related pages

- [API Overview](/docs/api/overview)
- [API Keys & Scopes](/docs/api/api-key)
- [MCP Tools](/docs/mcp/tools)
- [MCP Client Setup](/docs/mcp/client-setup)
