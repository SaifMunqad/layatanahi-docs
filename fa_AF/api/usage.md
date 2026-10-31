---
title: شروع سریع
section: api
---

# شروع سریع

این صفحه یک اعتبارنامه را در کوتاه‌ترین مسیر از ایجاد تا یک درخواست موفق اول می‌رساند. فرض می‌کند شما به **تنظیمات > یکپارچه‌سازی‌های API** و دست‌کم یک شعبه فعال دسترسی دارید.

## 1. اعتبارنامه را بسازید

1. **تنظیمات > یکپارچه‌سازی‌های API** را باز کنید و **ایجاد** را برگزینید.
2. آن را به نام سیستمی که استفاده می‌کند نام‌گذاری کنید، برای مثال `Reporting sync`.
3. برای شروع `products:read` و `sales:read` را انتخاب کنید.
4. برای یک یکپارچه‌سازی گزارش‌گیری آن را در سطح کل تجارت نگه دارید، یا برای یک ابزار محلی یک شعبه واحد را انتخاب کنید.
5. ذخیره کنید و راز را کپی نمایید. دوباره نمایش داده نخواهد شد.

## 2. راز را ذخیره کنید

```bash
export LAYATANAHI_TOKEN="12|your-secret-value"
export LAYATANAHI_BASE="https://app.example.com"
```

هرگز توکن را commit نکنید. در محیط تولید از مخزن راز پلتفرم خود استفاده کنید.

## 3. context را بررسی کنید

نقطه پایانی context تأیید می‌کند اعتبارنامه به چه کسی تعلق دارد، کدام شعبه‌ها را می‌تواند بخواند و چقدر سهمیه باقی مانده است.

```bash
curl -s "$LAYATANAHI_BASE/api/v2/context" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

```json
{
  "data": {
    "business": { "id": 7, "code": "layatanahi-main" },
    "employee": { "id": 42, "user_id": 19, "role_scope": "admin" },
    "branch_scope": { "allowed_branch_ids": [3, 4], "resolved_branch_id": null },
    "quota": {
      "plan": "free",
      "multiplier": 1,
      "timezone": "Asia/Kabul",
      "user": {
        "day": { "used": 1, "limit": 200, "remaining": 199, "reset_at": "..." },
        "month": { "used": 1, "limit": 2000, "remaining": 1999, "reset_at": "..." }
      }
    }
  }
}
```

هنگام عیب‌یابی همیشه اول این را بخوانید: یک دامنه `manager` با چند شعبه یعنی باید `X-Business-Branch` را بفرستید.

## 4. محصولات را بخوانید

```bash
curl -s "$LAYATANAHI_BASE/api/v2/products?search=iphone&per_page=10&language_code=en" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

```json
{
  "data": [
    {
      "id": 128,
      "code": "APL-IP15",
      "product_model": "iPhone 15",
      "product_name": "iPhone 15"
    }
  ],
  "links": { "first": "...", "last": "...", "prev": null, "next": null },
  "meta": { "current_page": 1, "per_page": 10, "total": 1 }
}
```

محصولات فقط وقتی برگردانده می‌شوند که دست‌کم یک شعبه دیدنی برای آن‌ها موجودی داشته باشد.

## 5. موجودی یک شعبه را بخوانید

```bash
curl -s "$LAYATANAHI_BASE/api/v2/stock?per_page=25" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

هر رشته یک رکورد موجودی است: شعبه، محصول، SKU، دسترس‌پذیر، دریافت‌شده، رزورشده، وضعیت availability و تاریخ انقضا.

## 6. فروش‌ها را برای یک دوره بخوانید

```bash
curl -s "$LAYATANAHI_BASE/api/v2/sales?from=2026-10-01&to=2026-10-31&per_page=50" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

با استفاده از `id` برگشتی، یک فروش را با اقلام و پرداخت‌هایش بگیرید:

```bash
curl -s "$LAYATANAHI_BASE/api/v2/sales/9012" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

## 7. جزئیات یک خرید را بخوانید

```bash
curl -s "$LAYATANAHI_BASE/api/v2/purchases/451" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

پاسخ‌های جزئیات شامل فاکتور، شعبه، تأمین‌کننده یا مشتری، اقلام و پرداخت‌ها هستند.

## پارامترهای مشترک

| پارامتر | اعمال می‌شود بر | یادداشت |
| --- | --- | --- |
| `page` | همه فهرست‌ها | از 1 شروع می‌شود |
| `per_page` | همه فهرست‌ها | 1–100، پیش‌فرض 25 |
| `language_code` | محصولات، موجودی، خریدها، فروش‌ها | کود دو حرفی، اختیاریاً با یک منطقه |
| `search` | محصولات | با کوک، مدل یا نام ترجمه‌شده مطابق می‌شود |
| `from`، `to` | خریدها، سفارش‌ها، فروش‌ها | شامل `YYYY-MM-DD` |
| `status` | سفارش‌ها | یکی از وضعیت‌های پشتیبانی‌شده سفارش |

## مدیریت شکست‌ها

```json
{
  "error": {
    "code": "api_ability_denied",
    "message": "This credential is not permitted to perform the requested operation."
  }
}
```

- `401`: توکن را درست کنید.
- `403`: صلاحیت یا دامنه شعبه را درست کنید.
- `422`: شعبه را بفرستید، یا یک تاریخ را اصلاح کنید.
- `429`: منتظر `Retry-After` بمانید، سپس با backoff دوباره تلاش کنید.

## قدم‌های بعد

- [مرجع نقاط پایانی](/docs/api/reference)
- [صفحه‌بندی و فیلترها](/docs/api/pagination)
- [خطاها](/docs/api/errors)
- [نمای کلی MCP](/docs/mcp/overview)
