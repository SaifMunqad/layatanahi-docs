---
title: فروش‌ها
section: api
---

# فروش‌ها

`GET /api/v2/sales` فاکتورهای فروش صادرشده توسط تجارت را برمی‌گرداند، و `GET /api/v2/sales/{id}` یک فروش را با فاکتور، مشتری، اقلام و پرداخت‌هایش برمی‌گرداند.

## اجازه

| الزام | مقدار |
| --- | --- |
| صلاحیت | `sales:read` |
| اجازه صفحه | `sale.sales.read` |
| رفتار شعبه | سطح کل تجارت یا شعبه‌فیلترشده |

## پارامترهای کوئری

| پارامتر | نوع | پیش‌فرض | یادداشت |
| --- | --- | --- | --- |
| `from` | date | — | شروع شامل دوره فروش |
| `to` | date | — | پایان شامل؛ باید برابر یا بعد از `from` باشد |
| `language_code` | string | App locale | نام محصولات در اقلام |
| `page` | integer ≥ 1 | 1 | شماره صفحه |
| `per_page` | integer 1–100 | 25 | اندازه صفحه |
| `id` | integer ≥ 1 | — | به‌جای فهرست، یک فروش را در `data` برمی‌گرداند |

## درخواست فهرست

```bash
curl -s "https://app.example.com/api/v2/sales?from=2026-10-01&to=2026-10-31&per_page=50" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

## پاسخ فهرست

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

## درخواست جزئیات

```bash
curl -s "https://app.example.com/api/v2/sales/9012" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

## پاسخ جزئیات

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

## فیلدها

| فیلد | معنا |
| --- | --- |
| `status`, `status_id` | برچسب وضعیت تجارت و شناسه آن |
| `is_editable`, `is_deletable` | آیا سیستم مبدأ هنوز ممکن است سند را تغییر دهد |
| `invoice` | مجموع‌ها، تخفیف، مالیات، ارز و یادداشت‌ها |
| `branch` | شعبه صادرکننده فروش |
| `customer` | مشتری دریافت‌کننده وقتی گیرنده یک مشتری است؛ `null` برای فروش‌های بین‌شعبه‌ای |
| `items` | اقلام با مقدار، قیمت واحد و مجموع |
| `payments` | پرداخت‌های ثبت‌شده علیه فاکتور |

برای فروشی که گیرنده‌اش شعبه دیگری است، `customer` برابر `null` است. برای مغایرت‌گیری حرکات بین‌شعبه‌ای از `business_branch_id` و نقاط پایانی سفارش استفاده کنید.

## تخفیف‌ها و مجموع‌ها

`total_amount` مجموع اقلام قبل از تنظیمات است. `grand_total` همان چیزی است که مشتری بدهکار است: اقلام، به‌اضافه مالیات و مبلغ‌های متفرقه، منهای تخفیف. `paid_amount` آنچه وصول شده است. باقی‌مانده `grand_total - paid_amount` است.

## رکوردهای غایب

یک فروش بیرون از دامنه شعبه دیدنی، یا یک فروش حذف‌شده، `404` برمی‌گرداند:

```json
{ "error": { "error": "not_found", "message": "Sale not found." } }
```

## استفاده‌های رایج

| استفاده | روش |
| --- | --- |
| عواید روزانه | `from` و `to` امروز را درخواست کنید، `grand_total` را جمع بزنید |
| حساب‌های دریافتنی | بر اساس دوره فهرست کنید، `grand_total - paid_amount` را محاسبه نمایید |
| تاریخچه مشتری | فهرست را با `customer_name` فیلتر کنید، سپس جزئیات بگیرید |
| اکسپورت حسابداری | همه فروش‌های یک دوره را صفحه‌به‌صفحه بخوانید و خطوط فاکتور و اقلام را ذخیره کنید |

## محدودیت‌ها

- فقط‌خواندنی: هیچ ایجاد، ویرایش، پرداخت، حذف یا مرجوعی فروش ممکن نیست.
- فقط فروش‌های صادرشده توسط یک شعبه دیدنی برگردانده می‌شوند.
- مبلغ‌ها به ارز فاکتور و بدون تبدیل برگردانده می‌شوند.
- مرجوعی‌ها به‌عنوان منبع جداگانه افشا نمی‌شوند؛ فقط در رابط وب ظاهر می‌شوند.

## صفحات مرتبط

- [خریدها](/docs/api/purchases)
- [سفارش‌ها](/docs/api/orders)
- [فهرست فروش](/docs/business/sale/listing)
- [صفحه‌بندی و فیلترها](/docs/api/pagination)
