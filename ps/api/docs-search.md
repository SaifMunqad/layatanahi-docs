# د اسنادو د لټون API

د اسنادو د لټون API یوه تصدیق شوې نقطه ده چې د خپرو شوو اسنادو کتلاګ پرې لوستل کېږي. دا API درې عملیات لري: برخې لېستول، په یوه برخه کې پاڼې لېستول، او د یوې پاڼې منځپانګه ترلاسه کول.

## پای ټکی

```http
POST /api/docs/query
```

دا پای ټکی د `auth` منځګړي له لارې خوندي دی او د هر مراجع لپاره په یوه دقیقه کې ۶۰ غوښتنو ته د `throttle:60,1` له لارې محدود دی. غوښتنې د اپلېکېشن د نورو API ګانو په څېر د تصدیق له طریقې سره ولېږئ.

## د API کارونه

دا API هغه وخت وکاروئ چې یو مراجع د بسته شوو Markdown فایلونو پر ځای له سرور څخه د اسنادو معلومات غواړي؛ لکه د اسنادو د لټون او لارښود مراجعین، موبایل یا ډیسټاپ اپلېکېشنونه، اداري وسایل او د سرور یا زیرمه شوو اسنادو فهرستونه.

یوازې هغه ریکارډونه ښکاره کېږي چې `published` یې `true` وي. مسودې برخې او پاڼې نه ښودل کېږي.

## د غوښتنې بڼه

هره غوښتنه د JSON `POST` ده او `action` لري. د `pages` او `page` لپاره `section_id` اړین دی، او د `page` لپاره `page_id` هم اړین دی.

### برخې لېستل

```json
{"action":"sections"}
```

### د برخې پاڼې لېستل

```json
{"action":"pages","section_id":1}
```

### یوه پاڼه ترلاسه کول

```json
{"action":"page","section_id":1,"page_id":12}
```

## د ځواب جوړښتونه

### د برخو ځواب

```json
{"data":[{"id":1,"title":"API","slug":"api"}]}
```

برخې د `sort_order` له مخې ترتیبېږي او یوازې `id`، `title` او `slug` لري.

### د پاڼو ځواب

```json
{"data":[{"id":12,"section_id":1,"title":"تصدیق","slug":"authentication"}]}
```

پاڼې د `section_id` له مخې فلټرېږي، یوازې خپرې شوې پاڼې پکې شاملېږي او د `sort_order` له مخې ترتیبېږي.

### د پاڼې ځواب

```json
{"data":{"id":12,"section":{"id":1,"title":"API","slug":"api"},"title":"تصدیق","slug":"authentication","content":"# تصدیق\n\nد اسنادو منځپانګه...","updated_at":"2026-01-01T12:00:00.000000Z"}}
```

`content` د ذخیره شوي Markdown ټول سند لري. `section` د دې لپاره شاملېږي چې مراجع له اضافي غوښتنې پرته د لارې نښه جوړه کړي.

## د مراجع وړاندیز شوې لړۍ

1. `sections` وغواړئ او د برخو پېژندونکي وساتئ.
2. کله چې کارن یوه برخه پرانیزي، `pages` وغواړئ.
3. کله چې کارن یوه پاڼه پرانیزي، `page` وغواړئ یا یې د آفلاین کار لپاره زیرمه کړئ.
4. د زیرمه شوې پاڼې د نوي کولو لپاره `updated_at` وکاروئ.

په دې توګه هغه وخت ټول اسناد نه ښکته کېږي چې یوازې د لارښود ونه اړتیا وي.

## اعتبار او تېروتنې

د `action` منل شوي ارزښتونه `sections`، `pages` او `page` دي. د `action`، اړین پېژندونکي یا ناسم پېژندونکي نشتوالی د `422` اعتبار تېروتنه ورکوي. که پاڼه له ورکړل شوې برخې سره تړاو ونه لري یا خپره شوې نه وي، `404` ورکول کېږي. د تصدیق نشتوالی او په یوه دقیقه کې له ۶۰ زیاتو غوښتنو ته اړوند منځګړي ځواب ورکوي.

تل هغه `section_id` ولېږئ چې پاڼه ورسره تړاو لري؛ دا اړیکه د پاڼې د ترلاسه کولو پر مهال ارزول کېږي.

## د اسنادو د معلوماتو اداره

معلومات په دوو تړلو جدولونو او د `DocSection` او `DocPage` ماډلونو کې ساتل کېږي.

### د برخې جوړښت

| ډګر | ډول | موخه |
| --- | --- | --- |
| `id` | integer | د API غوښتنو اصلي پېژندونکی |
| `title` | string | ښودل کېدونکی نوم |
| `slug` | string | ثابت پېژندونکی |
| `sort_order` | integer | د ښودلو ترتیب |
| `published` | boolean | په API کې د ښکاره کېدو کنټرول |

### د پاڼې جوړښت

| ډګر | ډول | موخه |
| --- | --- | --- |
| `id` | integer | اصلي پېژندونکی |
| `section_id` | integer | د مور برخې پېژندونکی |
| `title` | string | ښودل کېدونکی نوم |
| `slug` | string | د پاڼې ثابت پېژندونکی |
| `content` | text | د Markdown منځپانګه |
| `sort_order` | integer | په برخه کې ترتیب |
| `published` | boolean | په API کې د ښکاره کېدو کنټرول |
| `updated_at` | timestamp | د زیرمې نوي کول او همغږي |

د نوې پاڼې د خپرولو لپاره یې په سمه برخه کې جوړه کړئ، سرلیک او ځانګړی slug ورکړئ، معتبر Markdown وساتئ او `published` په `true` کړئ. د حذفولو پرته د پټولو لپاره یې `published` په `false` کړئ.

## د cURL بېلګه

```bash
curl -X POST https://example.test/api/docs/query \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_TOKEN' \
  -d '{"action":"pages","section_id":1}'
```

## د مراجع بېلګې

لاندې بېلګې همدا پای ټکی په Python، Node.js او PHP کې کاروي. `YOUR_TOKEN` په معتبر API ټوکن بدل کړئ او د اړتیا له مخې `action` او پېژندونکي بدل کړئ.

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

## د پلي کولو نقشه

| مسؤلیت | ځای |
| --- | --- |
| مسیر | `routes/web.php` |
| کنټرولر | `app/Http/Controllers/Docs/DocumentationQueryController.php` |
| اعتبار | `app/Http/Requests/Docs/DocumentationQueryRequest.php` |
| د برخې ماډل | `app/Models/DocSection.php` |
| د پاڼې ماډل | `app/Models/DocPage.php` |
| د مخکینۍ برخې مسیر مرستیال | `resources/js/routes/api/docs/index.ts` |
