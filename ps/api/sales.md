---
title: پلورونه
section: api
---

# پلورونه

`GET /api/v2/sales` هغه د پلور بلونه راوړي چې سوداګري یې صادر کړي دي، او `GET /api/v2/sales/{id}` یو
پلور د خپل بل، پیرودونکي، کرښو او تادیو سره راوړي.

## صلاحیت

| اړتیا | ارزښت |
| --- | --- |
| وړتیا | `sales:read` |
| د پاڼې صلاحیت | `sale.sales.read` |
| د څانګې چلند | د ټولې سوداګرۍ یا په څانګه فلټر شوی |

## د پوښتنې پارامترونه

| پارامتر | ډول | ډیفالټ | یادښتونه |
| --- | --- | --- | --- |
| `from` | date | — | د پلور د مودې شامل پیل |
| `to` | date | — | شامل پای؛ باید له `from` سره مساوي یا وروسته وي |
| `language_code` | string | د اپلیکېشن محل | د محصول نومونه په کرښو کې |
| `page` | integer ≥ 1 | 1 | د پاڼې شمېره |
| `per_page` | integer 1–100 | 25 | د پاڼې کچه |
| `id` | integer ≥ 1 | — | د لیست پر ځای یو پلور په `data` کې راوړي |

## د لیست غوښتنه

```bash
curl -s "https://app.example.com/api/v2/sales?from=2026-10-01&to=2026-10-31&per_page=50" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

## د لیست ځواب

```json
{
  "data": [
    {
      "id": 9012,
      "business_branch_id": 4,
      "invoice_number": "SAL-2026-9012",
      "grand_total": 9800.0,
      "paid_amount": 9800.0,
      "currency": "AFN",
      "customer_name": "Ahmad Karimi",
      "status": "Completed",
      "status_id": 10,
      "created_at": "2026-10-26 16:41:09"
    }
  ],
  "meta": { "current_page": 1, "last_page": 1, "per_page": 50, "total": 1 }
}
```

## د تفصیل غوښتنه

```bash
curl -s "https://app.example.com/api/v2/sales/9012" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

## د تفصیل ځواب

```json
{
  "data": {
    "id": 9012,
    "status": "Completed",
    "is_editable": false,
    "is_deletable": false,
    "created_at": "2026-10-26 16:41:09",
    "invoice": {
      "id": 12045,
      "invoice_number": "SAL-2026-9012",
      "total_amount": 9800.0,
      "tax_amount": 0.0,
      "discount_amount": 200.0,
      "miscellaneous_amount": 0.0,
      "grand_total": 9600.0,
      "paid_amount": 9600.0,
      "due_date": null,
      "currency": { "code": "AFN", "symbol": "؋" },
      "notes": null
    },
    "branch": { "id": 4, "username": "kabul-main", "name": "Kabul Main" },
    "customer": {
      "id": 311,
      "first_name": "Ahmad",
      "last_name": "Karimi",
      "organization": null,
      "phone": "+93700000000",
      "email": null
    },
    "items": [
      {
        "id": 42011,
        "product_code": "NET-0042",
        "product_name": "Router AX3000",
        "sku": "AX3000-BLK",
        "quantity": 2.0,
        "unit_price": 4900.0,
        "total_price": 9800.0,
        "comment": null
      }
    ],
    "payments": [
      {
        "id": 8821,
        "amount": 9600.0,
        "payment_date": "2026-10-26",
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
| `status`, `status_id` | د سوداګریز حالت لیبل او پېژندونکی |
| `is_editable`, `is_deletable` | چې سرچینه سیسټم لا هم پر سند بدلون کولای شي که نه |
| `invoice` | ټولګې، تخفیف، مالیه، اسعاره او یادښتونه |
| `branch` | هغه څانګه چې پلور یې صادر کړی |
| `customer` | هغه پیرودونکی چې معامله ترلاسه کوي، کله چې اخیستونکی یې پیرودونکی وي؛ د څانګو ترمنځ پلورونو کې `null` |
| `items` | کرښې د مقدار، واحد بیې او ټولګې سره |
| `payments` | هغه تادیې چې پر بل ثبت شوې دي |

په هغه پلور کې چې اخیستونکی یې بله څانګه وي، `customer` خالي (`null`) دی. د څانګو ترمنځ د حرکتونو
د پرتله‌کولو لپاره `business_branch_id` او د فرمایشونو ننوتنې وکاروئ.

## تخفیفونه او ټولګې

`total_amount` د کرښو مجموعه ده مخکې له هر ډول تعدیل. `grand_total` هغه څه دي چې پیرودونکی یې پور لري:
کرښې، جمع د مالیې او نورو مبلغونو، منفي تخفیف. `paid_amount` هغه څه دي چې راټول شوي دي. پاتې پور
`grand_total - paid_amount` دی.

## نه‌شتون ریکارډونه

هغه پلور چې د لید وړ څانګې له ساحې بهر وي، یا ړنګ شوی پلور وي، `404` راوړي:

```json
{ "error": { "error": "not_found", "message": "Sale not found." } }
```

## معمول کارونې حالات

| کارونه | لاره |
| --- | --- |
| ورځنی عاید | د نن لپاره `from` او `to` وټاکئ، `grand_total` سره جمع کړئ |
| د ترلاسه کېدونکو پورونه | په موده لیست کړئ، `grand_total - paid_amount` محاسبه کړئ |
| د پیرودونکي تاریخچه | لیست د `customer_name` په واسطه فلټر کړئ، بیا تفصیلات راوګړئ |
| د حسابدارۍ صادرول | په یوه موده کې ټول پلورونه پاڼه‌په‌پاڼه وکړئ او د بل او کرښو سطرې وساتئ |

## محدودیتونه

- یوازې لوستل: د پلور جوړول، سمون، تادیه، ړنګول یا راګرځېدنه نشي کېدای.
- یوازې هغه پلورونه راځي چې یوه ښکارېدونکې څانګه یې صادر کړي وي.
- مبالغې د بل په اسعارو کې راځي، پرته له تبادلې.
- راګرځېدنې د جلا سرچینې په توګه نه خپرېږي؛ یوازې په ویب انټرفېس کې ښکاري.

## اړوندې پاڼې

- [پېرودونه](/docs/api/purchases)
- [فرمایشونه](/docs/api/orders)
- [د پلور لیست](/docs/business/sale/listing)
- [پاڼه‌بندي او فلټر](/docs/api/pagination)
