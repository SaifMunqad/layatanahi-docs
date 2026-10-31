---
title: خریدها
section: api
---

# خریدها

`GET /api/v2/purchases` فاکتورهای خرید دریافت‌شده توسط تجارت را برمی‌گرداند، و `GET /api/v2/purchases/{id}` یک خرید را با فاکتور، تأمین‌کننده، اقلام و پرداخت‌هایش برمی‌گرداند.

## اجازه

| الزام | مقدار |
| --- | --- |
| صلاحیت | `purchases:read` |
| اجازه صفحه | `purchase.purchases.read` |
| رفتار شعبه | سطح کل تجارت یا شعبه‌فیلترشده |

## پارامترهای کوئری

| پارامتر | نوع | پیش‌فرض | یادداشت |
| --- | --- | --- | --- |
| `from` | date | — | شروع شامل دوره خرید |
| `to` | date | — | پایان شامل؛ باید برابر یا بعد از `from` باشد |
| `language_code` | string | App locale | نام محصولات در اقلام |
| `page` | integer ≥ 1 | 1 | شماره صفحه |
| `per_page` | integer 1–100 | 25 | اندازه صفحه |
| `id` | integer ≥ 1 | — | به‌جای فهرست، یک خرید را در `data` برمی‌گرداند |

## درخواست فهرست

```bash
curl -s "https://app.example.com/api/v2/purchases?from=2026-10-01&to=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

## پاسخ فهرست

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

## درخواست جزئیات

```bash
curl -s "https://app.example.com/api/v2/purchases/451" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

## پاسخ جزئیات

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

## فیلدها

| فیلد | معنا |
| --- | --- |
| `status`, `status_id` | برچسب وضعیت تجارت و شناسه عددی آن |
| `is_editable`, `is_deletable` | علامت‌های قفل سند؛ مفید برای دانستن اینکه آیا سیستم مبدأ هنوز ممکن است تغییر کند |
| `invoice` | مجموع‌ها، ارز، سررسید و یادداشت‌ها |
| `branch` | شعبه دریافت‌کننده خرید |
| `supplier` | هویت تأمین‌کننده وقتی طرف مقابل یک تأمین‌کننده است |
| `items` | اقلام با مقدار، قیمت واحد و مجموع |
| `payments` | پرداخت‌های ثبت‌شده علیه فاکتور |

مبلغ‌ها به‌صورت عدد به ارز فاکتور برگردانده می‌شوند؛ `currency.code` آن را شناسایی می‌کند. هیچ تبدیلی انجام نمی‌شود.

## رکوردهای غایب

یک خرید بیرون از دامنه شعبه دیدنی، یا یک خرید حذف‌شده، `404` برمی‌گرداند:

```json
{ "error": { "error": "not_found", "message": "Purchase not found." } }
```

به شکل تودرتو توجه کنید: کلید بیرونی `error` است و شیء درونی هم `error` را به‌عنوان فیلد کود استفاده می‌کند.

## استفاده‌های رایج

| استفاده | روش |
| --- | --- |
| کهولت حساب‌های پرداختنی (ageing) | بر اساس دوره فهرست کنید، `grand_total - paid_amount` را محاسبه نمایید |
| صورت‌حساب تأمین‌کننده | با تاریخ فیلتر کنید، بر اساس `supplier_name` گروه‌بندی نمایید |
| مغایرت‌گیری سطح قلم | جزئیات خریدهای علامت‌زده به‌عنوان غیرقابل‌ویرایش را بگیرید |
| همگام‌سازی ERP | با `created_at` بپولید، `id` خرید را ذخیره کنید |

## محدودیت‌ها

- فقط‌خواندنی: هیچ ایجاد، ویرایش، پرداخت یا مرجوعی خرید ممکن نیست.
- فقط فاکتورهای دریافت‌شده توسط یک شعبه دیدنی برگردانده می‌شوند.
- سفارش‌های خرید منبع جداگانه‌ای هستند؛ به [سفارش‌ها](/docs/api/orders) مراجعه کنید.
- داده بهای تمام‌شده فقط از طریق اسناد خرید در دسترس است، نه از طریق نقطه پایانی موجودی.

## صفحات مرتبط

- [شروع سریع](/docs/api/usage)
- [سفارش‌ها](/docs/api/orders)
- [فروش‌ها](/docs/api/sales)
- [خطاها](/docs/api/errors)
