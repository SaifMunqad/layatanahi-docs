---
title: پېرودونه
section: api
---

# پېرودونه

`GET /api/v2/purchases` هغه د پېرود بلونه راوړي چې سوداګري یې ترلاسه کړي دي، او
`GET /api/v2/purchases/{id}` یو پېرود د خپل بل، عرضه‌کوونکي، کرښو او تادیو سره راوړي.

## صلاحیت

| اړتیا | ارزښت |
| --- | --- |
| وړتیا | `purchases:read` |
| د پاڼې صلاحیت | `purchase.purchases.read` |
| د څانګې چلند | د ټولې سوداګرۍ یا په څانګه فلټر شوی |

## د پوښتنې پارامترونه

| پارامتر | ډول | ډیفالټ | یادښتونه |
| --- | --- | --- | --- |
| `from` | date | — | د پېرود د مودې شامل پیل |
| `to` | date | — | شامل پای؛ باید له `from` سره مساوي یا وروسته وي |
| `language_code` | string | د اپلیکېشن محل | د محصول نومونه په کرښو کې |
| `page` | integer ≥ 1 | 1 | د پاڼې شمېره |
| `per_page` | integer 1–100 | 25 | د پاڼې کچه |
| `id` | integer ≥ 1 | — | د لیست پر ځای یو پېرود په `data` کې راوړي |

## د لیست غوښتنه

```bash
curl -s "https://app.example.com/api/v2/purchases?from=2026-10-01&to=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

## د لیست ځواب

```json
{
  "data": [
    {
      "id": 451,
      "business_branch_id": 4,
      "invoice_number": "PUR-2026-0451",
      "grand_total": 42000.0,
      "paid_amount": 20000.0,
      "currency": "AFN",
      "supplier_name": "Kabul Electronics",
      "status": "Completed",
      "status_id": 10,
      "purchase_datetime": "2026-10-21 10:14:00",
      "created_at": "2026-10-21 10:14:02"
    }
  ],
  "meta": { "current_page": 1, "last_page": 1, "per_page": 25, "total": 1 }
}
```

## د تفصیل غوښتنه

```bash
curl -s "https://app.example.com/api/v2/purchases/451" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

## د تفصیل ځواب

```json
{
  "data": {
    "id": 451,
    "status": "Completed",
    "is_editable": false,
    "is_deletable": false,
    "created_at": "2026-10-21 10:14:02",
    "invoice": {
      "id": 8801,
      "invoice_number": "PUR-2026-0451",
      "total_amount": 42000.0,
      "tax_amount": 0.0,
      "discount_amount": 0.0,
      "miscellaneous_amount": 500.0,
      "grand_total": 42500.0,
      "paid_amount": 20000.0,
      "due_date": "2026-11-20",
      "currency": { "code": "AFN", "symbol": "؋" },
      "notes": null
    },
    "branch": { "id": 4, "username": "kabul-main", "name": "Kabul Main" },
    "supplier": { "id": 12, "name": "Kabul Electronics", "phone": "+93700000000", "email": null },
    "items": [
      {
        "id": 9901,
        "product_code": "NET-0042",
        "product_name": "Router AX3000",
        "sku": "AX3000-BLK",
        "quantity": 20.0,
        "unit_price": 2100.0,
        "total_price": 42000.0,
        "comment": null
      }
    ],
    "payments": [
      {
        "id": 771,
        "amount": 20000.0,
        "payment_date": "2026-10-21",
        "payment_status": "completed",
        "account": "Kabul Cash"
      }
    ]
  }
}
```

## فیلډونه

| فیلډ | معنا |
| --- | --- |
| `status`, `status_id` | د سوداګریز حالت لیبل او عددیز پېژندونکی |
| `is_editable`, `is_deletable` | د سند د تړلو نښې، ګټرې دي چې پوه شئ سرچینه سیسټم لا هم بدلون کولای شي که نه |
| `invoice` | ټولګې، اسعاره، د تادیې نېټه او یادښتونه |
| `branch` | هغه څانګه چې پېرود یې ترلاسه کړی |
| `supplier` | د عرضه‌کوونکي پېژندنه کله چې مقابل لوری عرضه‌کوونکی وي |
| `items` | کرښې د مقدار، واحد بیې او ټولګې سره |
| `payments` | هغه تادیې چې پر بل ثبت شوې دي |

مبالغې د عددونو په توګه د بل په اسعارو کې راځي؛ `currency.code` هغه وپېژني. هیڅ د تبادلې محاسبه نه
کېږي.

## نه‌شتون ریکارډونه

هغه پېرود چې د لید وړ څانګې له ساحې بهر وي، یا ړنګ شوی پېرود وي، `404` راوړي:

```json
{ "error": { "error": "not_found", "message": "Purchase not found." } }
```

دا تړلې (nested) بڼه ته پام وکړئ: بهر کیلي `error` ده او دننه څیز هم د کوډ لپاره `error` کاروي.

## معمول کارونې حالات

| کارونه | لاره |
| --- | --- |
| د پورونو عمر (ageing) | په موده لیست کړئ، `grand_total - paid_amount` محاسبه کړئ |
| د عرضه‌کوونکي صورتحساب | په نېټه فلټر کړئ، د `supplier_name` له مخې ګروپ کړئ |
| د کرښې کچې پرتله‌کول | د هغو پېرودونو تفصیل وغواړئ چې د نه‌سمېدونکو په توګه نښه شوي |
| د ERP همغږي | په `created_at` پوښل (poll) وکړئ، د پېرود `id` وساتئ |

## محدودیتونه

- یوازې لوستل: د پېرود جوړول، سمون، تادیه یا راګرځېدنه نشي کېدای.
- یوازې هغه بلونه راځي چې یوه ښکارېدونکې څانګه یې ترلاسه کړي.
- د پېرود فرمایشونه جلا سرچینه ده؛ وګورئ [فرمایشونه](/docs/api/orders).
- د بیې لګښت معلومات یوازې د پېرود له سندونو څخه ښکاري، نه د ذخیرې له ننوتنې.

## اړوندې پاڼې

- [چټک پیل](/docs/api/usage)
- [فرمایشونه](/docs/api/orders)
- [پلورونه](/docs/api/sales)
- [تېروتنې](/docs/api/errors)
