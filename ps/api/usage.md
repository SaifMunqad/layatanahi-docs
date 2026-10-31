---
title: چټک پیل
section: api
---

# چټک پیل

دا پاڼه یوه اعتبارنامه له جوړولو څخه تر دې چې لومړۍ غوښتنه مو کار پیل کړي په تر ټولو لنډه لاره
ورسي. فرضیه دا ده چې تاسو **ترتیبات > API ادغامونه** ته لاسرسی لرئ او لږ تر لږه یوه فعاله څانګه مو ده.

## 1. اعتبارنامه جوړه کړئ

1. **ترتیبات > API ادغامونه** پرانیزئ او **جوړول** وټاکئ.
2. هغه د هغه سیسټم په نوم ونوموئ چې ورته کاروي، د بېلګې په توګه `Reporting sync`.
3. د پیل لپاره `products:read` او `sales:read` وټاکئ.
4. د راپور ورکولو ادغام لپاره یې د ټولې سوداګرۍ وساتئ، یا د یوهې سیمه‌ییزې وسیلې لپاره یوه څانګه وټاکئ.
5. خوندي کړئ او پټ کوډ کاپی کړئ. هغه بیا هېڅکله نه ښودل کېږي.

## 2. پټ کوډ وساتئ

```bash
export LAYATANAHI_TOKEN="12|your-secret-value"
export LAYATANAHI_BASE="https://app.example.com"
```

ټوکن هېڅکله د سرچینو په مدیریت کې مه سپارئ (commit). په تولیدیز چاپېریال کې د خپلې پلیټ‌فارم د
پټو کلیدونو ذخیره وکاروئ.

## 3. چاپېریال (context) وګورئ

د چاپېریال ننوتنه تاییدوي چې اعتبارنامه چا پورې اړه لري، کومې څانګې یې کتلای شي او څومره کوټه پاتې ده.

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

د ستونزو په حل (debugging) کې تل لومړی دا وغواړئ: که `manager` ساحه څو څانګې وي، نو باید
`X-Business-Branch` ولېږئ.

## 4. محصولات ولولئ

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

محصوله یوازې هغه وخت راځي چې لږ تر لږه یوه ښکارېدونکې څانګه پکې ذخیره ولري.

## 5. د یوهې څانګې ذخیره ولولئ

```bash
curl -s "$LAYATANAHI_BASE/api/v2/stock?per_page=25" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

هره کرښه یوه د ذخیرې ریکارډ دی: څانګه، محصول، SKU، شته مقدار، ترلاسه شوی، خوندي شوی، د شتون حالت او
ختمېدو نېټه.

## 6. د یوهې مودې پلور ولولئ

```bash
curl -s "$LAYATANAHI_BASE/api/v2/sales?from=2026-10-01&to=2026-10-31&per_page=50" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

د راغلي `id` څخه کار واخلئ ترڅو یو پلور د هغه د کرښو او تادیو سره راوګړئ:

```bash
curl -s "$LAYATANAHI_BASE/api/v2/sales/9012" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

## 7. د پېرود تفصیل ولولئ

```bash
curl -s "$LAYATANAHI_BASE/api/v2/purchases/451" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

تفصیلي ځوابونه بل، څانګه، عرضه‌کوونکی یا پیرودونکی، کرښې او تادیې رانغاړي.

## ګډ پارامترونه

| پارامتر | پلي کېږي پر | یادښتونه |
| --- | --- | --- |
| `page` | ټول لیستونه | له 1 څخه پیل کېږي |
| `per_page` | ټول لیستونه | 1–100، ډیفالټ 25 |
| `language_code` | محصولات، ذخیره، پېرودونه، پلورونه | دوه‌توره کوډ، اختیاري د سیمې سره |
| `search` | محصولات | په کوډ، ماډل یا ژباړل شوي نوم سره سمون خوري |
| `from`, `to` | پېرودونه، فرمایشونه، پلورونه | شامل `YYYY-MM-DD` |
| `status` | فرمایشونه | د فرمایش یو له ملاتړ شوو حالتونو |

## د ناکامیو سره چلند

```json
{
  "error": {
    "code": "api_ability_denied",
    "message": "This credential is not permitted to perform the requested operation."
  }
}
```

- `401`: ټوکن سم کړئ.
- `403`: وړتیا یا د څانګې ساحه سم کړئ.
- `422`: څانګه ولېږئ، یا نېټه سمه کړئ.
- `429`: د `Retry-After` انتظار وکړئ، بیا د زیاتېدونکي انتظار (backoff) سره هڅه وکړئ.

## راتلونکي ګامونه

- [د ننوتنو مرجع](/docs/api/reference)
- [پاڼه‌بندي او فلټر](/docs/api/pagination)
- [تېروتنې](/docs/api/errors)
- [د MCP لنډه کتنه](/docs/mcp/overview)
