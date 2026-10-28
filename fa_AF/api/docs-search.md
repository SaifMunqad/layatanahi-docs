# API جستجوی مستندات

API جستجوی مستندات یک نقطهٔ پایانی احراز هویت‌شده برای مرور فهرست مستندات منتشرشده است. این API سه عملیات دارد: دریافت بخش‌ها، دریافت صفحات یک بخش و دریافت محتوای یک صفحه.

## نقطهٔ پایانی

```http
POST /api/docs/query
```

این نقطهٔ پایانی با میان‌افزار `auth` محافظت می‌شود و برای هر مشتری به ۶۰ درخواست در دقیقه با `throttle:60,1` محدود است. درخواست‌ها را با همان روش احراز هویت سایر APIهای برنامه ارسال کنید.

## کاربرد API

از این API زمانی استفاده کنید که یک مشتری به اطلاعات مستندات از سرور، به‌جای فایل‌های Markdown بستهٔ برنامه، نیاز دارد؛ مانند کلاینت‌های جستجو و پیمایش مستندات، برنامه‌های موبایل یا دسکتاپ، ابزارهای مدیریتی و فهرست‌های کش‌شده یا سمت‌سرور.

فقط رکوردهایی که `published` آن‌ها `true` است نمایش داده می‌شوند و بخش‌ها و صفحات پیش‌نویس هرگز برگردانده نمی‌شوند.

## قالب درخواست

هر درخواست یک `POST` با بدنهٔ JSON و ویژگی `action` است. برای عملیات `pages` و `page`، مقدار `section_id` الزامی است و برای `page` مقدار `page_id` نیز الزامی می‌باشد.

### دریافت بخش‌ها

```json
{"action":"sections"}
```

### دریافت صفحات یک بخش

```json
{"action":"pages","section_id":1}
```

### دریافت یک صفحه

```json
{"action":"page","section_id":1,"page_id":12}
```

## ساختار پاسخ‌ها

### پاسخ بخش‌ها

```json
{"data":[{"id":1,"title":"API","slug":"api"}]}
```

بخش‌ها بر اساس `sort_order` مرتب می‌شوند و فقط `id`، `title` و `slug` را شامل می‌شوند.

### پاسخ صفحات

```json
{"data":[{"id":12,"section_id":1,"title":"احراز هویت","slug":"authentication"}]}
```

صفحات بر اساس `section_id` فیلتر، فقط به صفحات منتشرشده محدود و بر اساس `sort_order` مرتب می‌شوند.

### پاسخ صفحه

```json
{"data":{"id":12,"section":{"id":1,"title":"API","slug":"api"},"title":"احراز هویت","slug":"authentication","content":"# احراز هویت\n\nمحتوای مستندات...","updated_at":"2026-01-01T12:00:00.000000Z"}}
```

مقدار `content` شامل کل سند Markdown ذخیره‌شده است. شیء `section` برای ساخت مسیر راهنما بدون درخواست اضافی ارائه می‌شود.

## روند پیشنهادی کلاینت

1. `sections` را فراخوانی و شناسهٔ بخش‌ها را ذخیره کنید.
2. هنگام باز کردن یک بخش، `pages` را فراخوانی کنید.
3. هنگام باز کردن صفحه، `page` را فراخوانی یا پاسخ آن را برای استفادهٔ آفلاین ذخیره کنید.
4. از `updated_at` برای تشخیص نیاز به تازه‌سازی کش استفاده کنید.

این روش از دریافت همهٔ اسناد زمانی که فقط درخت پیمایش لازم است جلوگیری می‌کند.

## اعتبارسنجی و خطاها

مقادیر مجاز `action` عبارت‌اند از `sections`، `pages` و `page`. نبودن `action`، شناسهٔ لازم یا وجود شناسهٔ نامعتبر باعث خطای اعتبارسنجی `422` می‌شود. ناسازگاری صفحه و بخش یا صفحهٔ منتشرنشده پاسخ `404` می‌دهد. احراز هویت ناموفق و عبور از ۶۰ درخواست در دقیقه توسط میان‌افزار مربوط مدیریت می‌شود.

همیشه `section_id` مالک صفحه را ارسال کنید؛ این رابطه هنگام دریافت صفحه بررسی می‌شود.

## مدیریت داده‌های مستندات

داده‌ها در دو جدول مرتبط و مدل‌های `DocSection` و `DocPage` ذخیره می‌شوند.

### ساختار بخش

| فیلد | نوع | کاربرد |
| --- | --- | --- |
| `id` | integer | شناسهٔ اصلی درخواست‌های API |
| `title` | string | نام نمایشی |
| `slug` | string | شناسهٔ پایدار |
| `sort_order` | integer | ترتیب نمایش |
| `published` | boolean | کنترل نمایش در API |

### ساختار صفحه

| فیلد | نوع | کاربرد |
| --- | --- | --- |
| `id` | integer | شناسهٔ اصلی |
| `section_id` | integer | شناسهٔ بخش والد |
| `title` | string | نام نمایشی |
| `slug` | string | شناسهٔ پایدار صفحه |
| `content` | text | محتوای Markdown |
| `sort_order` | integer | ترتیب در بخش |
| `published` | boolean | کنترل نمایش در API |
| `updated_at` | timestamp | همگام‌سازی و اعتبار کش |

برای انتشار صفحه، آن را در بخش درست ایجاد، عنوان و slug یکتا تعیین، Markdown معتبر ذخیره و `published` را `true` کنید. برای پنهان کردن صفحه بدون حذف، `published` را `false` قرار دهید.

## نمونهٔ cURL

```bash
curl -X POST https://example.test/api/docs/query \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -d '{"action":"pages","section_id":1}'
```

## نمونه‌های کلاینت

نمونه‌های زیر همان نقطهٔ پایانی را با Python، Node.js و PHP فراخوانی می‌کنند. مقدار `YOUR_TOKEN` را با توکن معتبر جایگزین کنید و در صورت نیاز `action` و شناسه‌ها را تغییر دهید.

### Python

```python
import requests

response = requests.post(
    'https://example.test/api/docs/query',
    headers={
        'Accept': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN',
    },
    json={'action': 'pages', 'section_id': 1},
)
response.raise_for_status()
print(response.json())
```

### Node.js

```javascript
const response = await fetch('https://example.test/api/docs/query', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ action: 'pages', section_id: 1 }),
});

if (!response.ok) throw new Error(`Request failed: ${response.status}`);
console.log(await response.json());
```

### PHP

```php
<?php

$ch = curl_init('https://example.test/api/docs/query');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'Authorization: Bearer YOUR_TOKEN',
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode(['action' => 'pages', 'section_id' => 1]),
    CURLOPT_RETURNTRANSFER => true,
]);

$response = curl_exec($ch);
if ($response === false) {
    throw new RuntimeException(curl_error($ch));
}
curl_close($ch);

print_r(json_decode($response, true));
```

## نقشهٔ پیاده‌سازی

| مسئولیت | مسیر |
| --- | --- |
| مسیر | `routes/web.php` |
| کنترلر | `app/Http/Controllers/Docs/DocumentationQueryController.php` |
| اعتبارسنجی | `app/Http/Requests/Docs/DocumentationQueryRequest.php` |
| مدل بخش | `app/Models/DocSection.php` |
| مدل صفحه | `app/Models/DocPage.php` |
| راهنمای مسیر فرانت‌اند | `resources/js/routes/api/docs/index.ts` |
