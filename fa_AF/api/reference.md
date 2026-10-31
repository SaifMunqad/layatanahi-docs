---
title: مرجع نقاط پایانی
section: api
---

# مرجع نقاط پایانی

این صفحه هر نقطه پایانی پشتیبانی‌شده v2، صلاحیت لازم آن و پارامترهای پذیرفتنی‌اش را فهرست می‌کند. همه مسیرها نسبت به URL برنامه شما نسبی هستند و یک توکن حامل لازم دارند.

## نقاط پایانی

| متد | مسیر | صلاحیت | نتیجه |
| --- | --- | --- | --- |
| GET | `/api/v2/context` | هر اعتبارنامه معتبر | اعتبارنامه، دامنه نقش، شعبه‌ها و سهمیه |
| GET | `/api/v2/products` | `products:read` | کاتالوگ محصولات صفحه‌بندی‌شده |
| GET | `/api/v2/stock` | `stock:read` | رشته‌های موجودی صفحه‌بندی‌شده |
| GET | `/api/v2/purchases` | `purchases:read` | خریدهای صفحه‌بندی‌شده |
| GET | `/api/v2/purchases/{id}` | `purchases:read` | یک خرید با اقلام و پرداخت‌ها |
| GET | `/api/v2/orders` | `orders:read` | سفارش‌های صفحه‌بندی‌شده |
| GET | `/api/v2/sales` | `sales:read` | فروش‌های صفحه‌بندی‌شده |
| GET | `/api/v2/sales/{id}` | `sales:read` | یک فروش با اقلام و پرداخت‌ها |
| GET | `/api/v2/health` | هیچ | سلامت خدمت (بدون اعتبارنامه) |

`/api/v2/health` بیرون از لوله اعتبارنامه است و `{"data":{"status":"ok"}}` را برمی‌گرداند. برای بررسی uptime از آن استفاده کنید، نه برای آزمون‌های احراز هویت.

## پارامترهای کوئری مشترک

| نام | نوع | پیش‌فرض | اعمال می‌شود بر |
| --- | --- | --- | --- |
| `page` | integer ≥ 1 | 1 | همه نقاط پایانی فهرست |
| `per_page` | integer 1–100 | 25 | همه نقاط پایانی فهرست |
| `language_code` | string | App locale | محصولات، موجودی، خریدها، فروش‌ها |
| `from` | date `YYYY-MM-DD` | — | خریدها، سفارش‌ها، فروش‌ها |
| `to` | date `YYYY-MM-DD`، اختیاری | — | خریدها، سفارش‌ها، فروش‌ها |
| `status` | enum | — | سفارش‌ها |
| `search` | string ≤ 100 | — | محصولات |

`from` و `to` شامل مرزها هستند. `to` باید برابر یا بعد از `from` باشد. مقدارهای نامعتبر `422` با بدنه اعتبارسنجی تولید می‌کنند.

## قالب‌های پاسخ

### فهرست

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

### جزئیات

```json
{ "data": { "id": 451, "invoice": { }, "items": [], "payments": [] } }
```

### context

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

### خطا

```json
{ "error": { "code": "branch_scope_denied", "message": "..." } }
```

یک رکورد جزئیات غایب `404` با شکل `{"error":{"error":"not_found","message":"..."}}` برمی‌گرداند.

## کودهای وضعیت

| کود | چه زمانی |
| --- | --- |
| 200 | خواندن موفق |
| 401 | اعتبارنامه غایب، نامعتبر یا بازپس‌گرفته‌شده |
| 403 | صلاحیت، عضویت یا دامنه شعبه رد شد |
| 404 | رکورد جزئیات داخل دامنه دیدنی یافت نشد |
| 422 | فیلتر نامعتبر، یا یک شعبه باید مشخص شود |
| 429 | حد هجومی یا سهمیه رسیده است |
| 500 | خطای غیرمنتظره سرور |

## خلاصه فیلدها

| منبع | فیلدها |
| --- | --- |
| Product | `id`, `code`, `product_model`, `product_name` |
| Stock | `id`, `business_branch_id`, `product_id`, `product_code`, `product_model`, `product_name`, `sku`, `available_quantity`, `received_quantity`, `reserved_quantity`, `is_available`, `expiry_date` |
| Purchase list | `id`, `business_branch_id`, `invoice_number`, `grand_total`, `paid_amount`, `currency`, `supplier_name`, `status`, `status_id`, `purchase_datetime`, `created_at` |
| Sale list | `id`, `business_branch_id`, `invoice_number`, `grand_total`, `paid_amount`, `currency`, `customer_name`, `status`, `status_id`, `created_at` |
| Order list | `id`, `business_branch_id`, `order_number`, `tracking_number`, `status`, `invoice_number`, `grand_total`, `paid_amount`, `created_at` |
| Detail | `id`, `status`, `is_editable`, `is_deletable`, `created_at`, `invoice`, `branch`, `supplier` یا `customer`, `items`, `payments` |

## هدرها

| هدر | الزامی | هدف |
| --- | --- | --- |
| `Authorization` | بله | `Bearer <token>` |
| `Accept` | توصیه‌شده | از `application/json` استفاده کنید |
| `X-Business-Branch` | مشروط | شعبه هدف وقتی چند شعبه اعطا شده |
| `MCP-Session-Id` | فقط MCP | تداوم نشست برای ترانسپورت MCP |

## عملیات‌های پشتیبانی‌نشده

API فقط‌خواندنی است. این‌ها عامدانه موجود نیستند: ایجاد یا ویرایش خریدها، فروش‌ها، سفارش‌ها، محصولات یا موجودی؛ پرداخت‌ها؛ مرجوعی‌ها؛ مدیریت کارمندان یا نقش‌ها؛ تغییرات تنظیمات.

## صفحات مرتبط

- [محصولات](/docs/api/products)
- [موجودی](/docs/api/stocks)
- [خریدها](/docs/api/purchases)
- [سفارش‌ها](/docs/api/orders)
- [فروش‌ها](/docs/api/sales)
