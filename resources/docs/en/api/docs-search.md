# Docs Search API

The Docs Search API is the authenticated endpoint used to browse the published documentation catalog. It provides a predictable three-step flow: list sections, list pages in a section, and retrieve one page's content.

## Endpoint

```http
POST /api/docs/query
```

The endpoint is protected by the application's `auth` middleware and limited to 60 requests per minute per client by the `throttle:60,1` middleware. Send requests with the same authentication mechanism used by the rest of the application API.

## What it is used for

Use this API when a client needs documentation data from the server rather than from the bundled Markdown files. Typical consumers include:

- Documentation search and navigation clients.
- Mobile or desktop applications that display the same documentation catalog.
- Administrative or integration tools that need to discover published pages.
- Server-rendered or cached documentation indexes.

The API only exposes records where `published` is `true`. Draft sections and pages are never returned.

## Request format

Every request is a JSON `POST` request with an `action` property. `section_id` is required for `pages` and `page`; `page_id` is additionally required for `page`.

### List sections

```json
{
  "action": "sections"
}
```

### List pages in a section

```json
{
  "action": "pages",
  "section_id": 1
}
```

### Retrieve one page

```json
{
  "action": "page",
  "section_id": 1,
  "page_id": 12
}
```

## Response structures

### Sections response

```json
{
  "data": [
    {
      "id": 1,
      "title": "API",
      "slug": "api"
    }
  ]
}
```

Sections are ordered by `sort_order`. The response intentionally returns only `id`, `title`, and `slug`.

### Pages response

```json
{
  "data": [
    {
      "id": 12,
      "section_id": 1,
      "title": "Authentication",
      "slug": "authentication"
    }
  ]
}
```

Pages are filtered by `section_id`, restricted to published pages, and ordered by `sort_order`.

### Page response

```json
{
  "data": {
    "id": 12,
    "section": {
      "id": 1,
      "title": "API",
      "slug": "api"
    },
    "title": "Authentication",
    "slug": "authentication",
    "content": "# Authentication\n\nDocumentation content...",
    "updated_at": "2026-01-01T12:00:00.000000Z"
  }
}
```

The `content` value contains the complete stored Markdown document. The `section` object is included so a client can render breadcrumbs without another request.

## Recommended client flow

1. Call `sections` and store the returned section IDs.
2. Call `pages` when the user opens a section.
3. Call `page` only when the user opens a page, or cache the result for offline use.
4. Use `updated_at` to determine whether a cached page needs refreshing.

This approach avoids downloading every document when the client only needs the navigation tree.

## Validation and errors

The request validator accepts only `sections`, `pages`, and `page` as actions.

| Condition | Result |
| --- | --- |
| Missing `action` | Validation error (`422`) |
| Unknown `action` | Validation error (`422`) |
| Missing `section_id` for `pages` or `page` | Validation error (`422`) |
| Missing `page_id` for `page` | Validation error (`422`) |
| Unknown section ID | Validation error (`422`) |
| Unknown page ID | Validation error (`422`) |
| Page does not belong to the supplied section | Not found (`404`) |
| Page or section is unpublished | It is excluded; a direct page lookup returns `404` |
| Missing authentication | Authentication response from the `auth` middleware |
| More than 60 requests in one minute | Rate-limit response from the throttle middleware |

Always send the `section_id` that owns a page. This relationship is checked during page retrieval and prevents a valid page ID from being used with an unrelated section.

## Managing documentation data

Documentation is stored in two related database tables represented by the `DocSection` and `DocPage` models.

### Section structure

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | integer | Primary key used by API requests |
| `title` | string | Display name |
| `slug` | string | Stable URL or client identifier |
| `sort_order` | integer | Navigation order |
| `published` | boolean | Controls public API visibility |

### Page structure

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | integer | Primary key used by API requests |
| `section_id` | integer | Parent section foreign key |
| `title` | string | Display name |
| `slug` | string | Stable page identifier |
| `content` | text | Markdown document body |
| `sort_order` | integer | Order within the section |
| `published` | boolean | Controls public API visibility |
| `updated_at` | timestamp | Cache invalidation and synchronization marker |

To publish a new page, create it under the correct section, assign its title and unique slug, store valid Markdown in `content`, set its `sort_order`, and set `published` to `true`. To hide a page without deleting it, set `published` to `false`.

## cURL example

```bash
curl -X POST https://example.test/api/docs/query \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -d '{"action":"pages","section_id":1}'
```

## Implementation map

| Responsibility | Location |
| --- | --- |
| Route | `routes/web.php` |
| Controller | `app/Http/Controllers/Docs/DocumentationQueryController.php` |
| Validation | `app/Http/Requests/Docs/DocumentationQueryRequest.php` |
| Section model | `app/Models/DocSection.php` |
| Page model | `app/Models/DocPage.php` |
| Frontend route helper | `resources/js/routes/api/docs/index.ts` |

The frontend helper is generated for the `POST /api/docs/query` route and can be used by TypeScript clients instead of hard-coding the endpoint URL.
