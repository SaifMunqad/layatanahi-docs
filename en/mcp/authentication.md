---
title: MCP Authentication
section: mcp
---

# MCP Authentication

MCP clients authenticate with the same **business integration credential** as the HTTP API. There is no
separate MCP key, no OAuth flow and no per-client account.

The credential determines the business, the employee, the abilities, the branches and the quota.

## Creating a credential for MCP

1. Open **Settings > API integrations**.
2. Create a credential named after the client, for example `Claude Desktop`.
3. Select the abilities the assistant needs. For general business questions, select all five reads.
4. Choose business-wide, or restrict to the branch the assistant should see.
5. Copy the secret into the client configuration.

A client that should only answer sales questions needs only `sales:read`. Granting everything "just in
case" widens what the assistant can reveal.

## Configuring the client

| Setting | Value |
| --- | --- |
| URL | `https://<app-host>/mcp/business` |
| Header | `Authorization: Bearer <token>` |
| Header | `Accept: application/json, text/event-stream` |
| Header | `Content-Type: application/json` |
| Optional header | `X-Business-Branch: <branch-id>` |

Store the token in the client's secret field or an environment variable. Do not paste it into a prompt,
a chat message or a shared configuration file.

## Ability mapping

| Ability | Tool | Page permission required |
| --- | --- | --- |
| `products:read` | `products` | `inventory.products.read` |
| `stock:read` | `stock` | `inventory.branches.read` |
| `purchases:read` | `purchases` | `purchase.purchases.read` |
| `orders:read` | `orders` | `sale.orders.read` |
| `sales:read` | `sales` | `sale.sales.read` |

A tool call fails when the ability is not on the credential **or** the employee's live role no longer grants
the page. Both checks are required, exactly as in the HTTP API.

## Live re-verification

Every MCP request re-checks:

1. The credential is active and belongs to the token's user.
2. The business exists and is active.
3. The user still has an employee membership in the business.
4. The employee still holds the permission behind the tool's ability.
5. The requested branch is inside the credential's scope.

If an employee is fired, transferred or demoted, the next tool call fails. There is nothing to revoke
manually beyond the credential itself.

## Branch scope in conversations

| Credential scope | Behaviour |
| --- | --- |
| Business-wide | May read every active branch; can pass `branch_id` to narrow |
| One branch granted | Branch resolved automatically; `branch_id` optional |
| Several branches granted | `branch_id` or `X-Business-Branch` is required |

Because an assistant may ask about a branch you did not intend, pin the header to the branch the client
should use. That makes the scope explicit and avoids a `422 branch_required` in the middle of a
conversation.

## Revocation and rotation

| Action | Effect on the MCP client |
| --- | --- |
| Rotate | The client must be updated with the new secret; the old token stops working |
| Revoke | Every tool call fails with `401` until a new credential is configured |
| Ability change | The affected tools fail; the others continue to work |
| Branch scope change | Out-of-scope tool calls fail with `403` |

Plan rotations during a maintenance window; there is no grace period where both secrets work.

## Security guidance

- Use a dedicated credential per AI client, never a shared one.
- Grant only the abilities needed for the assistant's purpose.
- Restrict to the smallest branch set that makes sense.
- Keep the token in the client's secret store, not in a prompt template.
- Review `last_used_at` and the request events regularly.
- Revoke the credential when a laptop, container or client profile is retired.

## Related pages

- [MCP Server](/docs/mcp/server)
- [API Keys & Scopes](/docs/api/api-key)
- [Authentication](/docs/api/authentication)
- [MCP Troubleshooting](/docs/mcp/troubleshooting)
