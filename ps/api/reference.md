---
title: د ننوتنو مرجع
section: api
---

# د ننوتنو مرجع

دا پاڼه هر ملاتړ شوی v2 ننوتنه، هغه وړتیا چې ورته اړتیا لري، او هغه پارامترونه چې مني لیست کوي. ټولې
لارې ستاسو د اپلیکېشن د URL نسبي دي او یوه بېرر ټوکن غواړي.

## ننوتنې

| میتود | لار | وړتیا | پایله |
| --- | --- | --- | --- |
| GET | `/api/v2/context` | هره سمه اعتبارنامه | اعتبارنامه، د رول ساحه، څانګې او کوټه |
| GET | `/api/v2/products` | `products:read` | پاڼه‌بندي شوی د محصولاتو کټالوګ |
| GET | `/api/v2/stock` | `stock:read` | پاڼه‌بندي شوې د ذخیرې کرښې |
| GET | `/api/v2/purchases` | `purchases:read` | پاڼه‌بندي شوي پېرودونه |
| GET | `/api/v2/purchases/{id}` | `purchases:read` | یو پېرود د کرښو او تادیو سره |
| GET | `/api/v2/orders` | `orders:read` | پاڼه‌بندي شوي فرمایشونه |
| GET | `/api/v2/sales` | `sales:read` | پاڼه‌بندي شوي پلورونه |
| GET | `/api/v2/sales/{id}` | `sales:read` | یو پلور د کرښو او تادیو سره |
| GET | `/api/v2/health` | هېڅ | د خدمت روغتیا (پرته له اعتبارنامې) |

`/api/v2/health` د اعتبارنامې له پروسې بهر دی او `{"data":{"status":"ok"}}` راوړي. د دې څخه د
دوامداری د کتنې لپاره کار واخلئ، نه د تصدیق هویت د ازموینو لپاره.

## ګډ د پوښتنې پارامترونه

| نوم | ډول | ډیفالټ | پلي کېږي پر |
| --- | --- | --- | --- |
| `page` | integer ≥ 1 | 1 | ټول د لیست ننوتنې |
| `per_page` | integer 1–100 | 25 | ټول د لیست ننوتنې |
| `language_code` | string | د اپلیکېشن محل | محصولات، ذخیره، پېرودونه، پلورونه |
| `from` | date `YYYY-MM-DD` | — | پېرودونه، فرمایشونه، پلورونه |
| `to` | date `YYYY-MM-DD`، اختیاري | — | پېرودونه، فرمایشونه، پلورونه |
| `status` | enum | — | فرمایشونه |
| `search` | string ≤ 100 | — | محصولات |

`from` او `to` دواړه شامل دي. `to` باید له `from` سره مساوي یا وروسته وي. ناسم ارزښتونه `422` د
د تصدیق (validation) payload سره رامنځته کوي.

## د ځوابونو لفافې

### لیست

```json
{
  "data": [ { "id": 1 } ],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 4,
    "per_page": 25,
    "path": "...",
    "to": 25,
    "total": 87
  }
}
```

### تفصیل

```json
{ "data": { "id": 451, "invoice": { }, "items": [], "payments": [] } }
```

### چاپېریال

```json
{
  "data": {
    "business": { "id": 7, "code": "..." },
    "employee": { "id": 42, "user_id": 19, "role_scope": "admin" },
    "branch_scope": { "allowed_branch_ids": [], "resolved_branch_id": null },
    "quota": { }
  }
}
```

### تېروتنه

```json
{ "error": { "code": "branch_scope_denied", "message": "..." } }
```

هغه تفصیلي ریکارډ چې شتون ونه لري `404` راوړي د دې بڼې سره `{"error":{"error":"not_found","message":"..."}}`.

## د حالت کوډونه

| کوډ | کله |
| --- | --- |
| 200 | بریالی لوستل |
| 401 | ورک، ناسم یا بېرته اخیستل شوې اعتبارنامه |
| 403 | وړتیا، ګډون یا د څانګې ساحه رد شوې |
| 404 | تفصیلي ریکارډ په لید وړ ساحه کې نشته |
| 422 | ناسم فلټر، یا باید یوه څانګه وټاکل شي |
| 429 | د فج یا کوټې حد ته رسیدلی |
| 500 | د سرور غیر منتظره تېروتنه |

## د فیلډونو لنډیز

| سرچینه | فیلډونه |
| --- | --- |
| Product | `id`, `code`, `product_model`, `product_name` |
| Stock | `id`, `business_branch_id`, `product_id`, `product_code`, `product_model`, `product_name`, `sku`, `available_quantity`, `received_quantity`, `reserved_quantity`, `is_available`, `expiry_date` |
| Purchase list | `id`, `business_branch_id`, `invoice_number`, `grand_total`, `paid_amount`, `currency`, `supplier_name`, `status`, `status_id`, `purchase_datetime`, `created_at` |
| Sale list | `id`, `business_branch_id`, `invoice_number`, `grand_total`, `paid_amount`, `currency`, `customer_name`, `status`, `status_id`, `created_at` |
| Order list | `id`, `business_branch_id`, `order_number`, `tracking_number`, `status`, `invoice_number`, `grand_total`, `paid_amount`, `created_at` |
| Detail | `id`, `status`, `is_editable`, `is_deletable`, `created_at`, `invoice`, `branch`, `supplier` or `customer`, `items`, `payments` |

## سرلیکونه

| سرلیک | اړین | موخه |
| --- | --- | --- |
| `Authorization` | هو | `Bearer <token>` |
| `Accept` | سپارښتنه شوې | `application/json` وکاروئ |
| `X-Business-Branch` | مشروط | هدف څانګه کله چې څو څانګې ورکړل شوې وي |
| `MCP-Session-Id` | یوازې MCP | د MCP د لیږد لپاره د غونډې دوام |

## نه‌ملاتړ شوي عملونه

API یوازې د لوستلو دی. لاندې شيان په عمدي ډول شتون نلري: د پېرود، پلور، فرمایشونو، محصولاتو یا ذخیرې
جوړول یا سمون؛ تادیې؛ راګرځېدنې؛ د کارکوونکو یا رولونو اداره؛ د ترتیباتو بدلونونه.

## اړوندې پاڼې

- [محصولات](/docs/api/products)
- [ذخیره](/docs/api/stocks)
- [پېرودونه](/docs/api/purchases)
- [فرمایشونه](/docs/api/orders)
- [پلورونه](/docs/api/sales)
