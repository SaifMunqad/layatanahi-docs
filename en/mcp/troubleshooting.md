---
title: MCP Troubleshooting
section: mcp
---

# MCP Troubleshooting

Most MCP failures are configuration problems, not server faults. Work from the outside in: confirm the
endpoint, then the token, then the ability, then the branch.

## Quick diagnosis

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Client cannot connect | Wrong URL or network blocked | Use `https://<host>/mcp/business`, allow egress |
| `404` on `/mcp/test` | Sandbox disabled | It only exists in local/testing with debug |
| `405` on GET | Transport is POST-only | Do not probe with a browser address bar |
| `401` | Missing, wrong or revoked token | Re-copy the secret from Settings |
| `403 api_ability_denied` | Ability or live permission missing | Grant ability and page permission |
| `403 branch_scope_denied` | Branch outside scope | Use a granted branch |
| `422 branch_required` | Multi-branch credential without branch | Send `branch_id` or header |
| `429` | Burst or quota | Honour `Retry-After` |
| No tools listed | Handshake failed | Check `Accept` and the JSON-RPC response |
| Empty results | Branch or filters exclude everything | Widen branch or date range |

## Authentication failures

### 401 integration_credential_required

No token reached the server, or the token is not an integration token.

- Confirm the header is `Authorization: Bearer <token>`, including the word `Bearer`.
- Confirm the client is not stripping headers when bridging stdout to HTTP.
- Confirm you are calling `/mcp/business`, not `/api/v2`.

### 401 integration_credential_invalid

The credential was revoked, the business is inactive, or the token belongs to a different user than the
credential.

- Check the credential status in Settings.
- Confirm the business subscription and status are active.
- Rotate the credential if unsure; rotation always produces a valid token.

### 403 integration_membership_inactive

The employee was fired or their membership was removed. Create a credential for an active employee; there
is no way to revive the old one.

## Authorisation failures

### 403 api_ability_denied

The credential lacks the ability, or the employee's role no longer grants the page behind it.

1. Open Settings and confirm the ability is checked on the credential.
2. Open the employee's access page and confirm the page permission is granted.
3. Reload the client; the failure is evaluated per request, so a new attempt after fixing is enough.

### 403 branch_scope_denied

The requested branch is not in the credential's granted set, or does not belong to the business.

- Read `branch_scope.allowed_branch_ids` from `/api/v2/context`.
- Use one of those ids, or remove the branch argument to use the default.
- Do not retry other ids hoping one succeeds; that is logged as a scope denial.

### 422 branch_required

The credential is limited to several branches and the call named none. Send `branch_id` in the tool
arguments or `X-Business-Branch` in the client configuration.

## Rate limit failures

### 429 api_burst_limit_exceeded

More than 60 requests in a minute from one credential. Wait for `Retry-After`, then reduce the request
rate. An assistant that loops on tool calls can hit this quickly.

### 429 api_quota_exceeded

The daily or monthly allowance is exhausted. Read `scope`, `period`, `limit`, `used` and `reset_at` from
the body. Options:

- Wait for the reset time.
- Reduce polling frequency or page size.
- Ask an administrator about a higher plan.
- Split integrations across owners if quota isolation matters.

## Transport problems

| Problem | Explanation | Fix |
| --- | --- | --- |
| 405 on GET or DELETE | The server accepts POST only | Use an MCP client, not a browser |
| Connection closes early | Proxy buffering or timeout | Disable buffering for the MCP path |
| Session errors | `MCP-Session-Id` not forwarded | Use a client that manages sessions, or a bridge |
| HTML instead of JSON | Missing `Accept: application/json` | Add the header |
| Works locally, fails in production | Sandbox vs real credential | Use a production credential |

## Tool results that look wrong

- **Empty list**: the branch has no data in the requested period, or the credential is scoped to another
  branch.
- **`Purchase not found`**: the id is outside the visible scope or the document is deleted.
- **Amounts look like strings**: parse them as decimals; JSON numbers may be rendered as strings by some
  clients.
- **Product names in the wrong language**: pass `language_code`; the default follows the application
  locale.

## Confirming the server is healthy

1. `GET /api/v2/health` returns `{"data":{"status":"ok"}}`.
2. `GET /api/v2/context` with the same token returns the scope and quota.
3. `tools/list` returns five tools.
4. A `products` call with `per_page: 1` returns a row.

If step 2 works and step 4 fails, the problem is the tool arguments, not the connection.

## When to contact support

- The context endpoint succeeds but every tool fails with `403` after permissions were verified.
- A tool returns data from a branch outside the granted scope.
- Quota usage increases without requests.
- The server returns `500` consistently for one tool.

Include the credential name (never the token), the timestamp, the tool name, the arguments and the
returned error code.

## Related pages

- [MCP Server](/docs/mcp/server)
- [MCP Authentication](/docs/mcp/authentication)
- [Errors](/docs/api/errors)
- [Rate Limits & Quotas](/docs/api/rate-limits)
