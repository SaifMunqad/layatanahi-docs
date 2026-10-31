---
title: د کلاینت ترتیبات
section: mcp
---

# د کلاینت ترتیبات

دا پاڼه ښیي چې تر ټولو عام MCP کلاینتونه څنګه `/mcp/business` سره ونښلول شي. سرور د Streamable HTTP له لارې او د bearer token سره خبرې کوي، نو هر کلاینت چې HTTP ملاتړ کوي کار کوي؛ یوازې-stdio کلاینتونه کوچنۍ پلې (bridge) ته اړتیا لري.

مخکې له دې چې پیل کړئ، د هغه وړتیاوو سره اعتبارنامه جوړه کړئ چې مرستیال یې ته اړتیا لري او پټ کوډ یې یاد یادښت کړئ.

## هغه ارزښتونه چې درته اړین دي

| ارزښت | مثال | له کومه یې ترلاسه کوئ |
| --- | --- | --- |
| بنسټیز URL | `https://app.example.com` | ستاسو د ځای پر ځای کولو (deployment) URL |
| د MCP پای ټکی | `/mcp/business` | ثابت لاره |
| Token | `12\|abc...` | ترتیبات > د API ادغامونه |
| څانګه | `4` | پلورنځی > څانګې، یا `/api/v2/context` |

## د Streamable HTTP کلاینتونه

کلاینتونه چې لرې (remote) MCP سرورونه پوهېږي، معمولاً URL سره سرلیکونه مني:

```json
{
  "mcpServers": {
    "layatanahi": {
      "url": "https://app.example.com/mcp/business",
      "headers": {
        "Authorization": "Bearer 12|your-secret",
        "X-Business-Branch": "4"
      }
    }
  }
}
```

ځینې سمولنګکي د `mcpServers` پر ځای `servers` کاروي، یا د URL او سرلیکونو لپاره جلا ساحې لرونکی UI فورم ورکوي. ارزښتونه هماغه دي: د پای ټکي URL، bearer token او اختیاري د څانګې سرلیک.

د ترتیب فایل د بڼې کنټرول (version control) څخه بهر وساتئ، یا که کلاینت متحولونه مني، د `${LAYATANAHI_TOKEN}` په څېر د چاپیریال متحول ته اشاره وکړئ.

## یوازې-stdio کلاینتونه

ډیسټاپ کلاینتونه چې محلي پروسیس پیلوي، هغې پلې ته اړتیا لري چې stdio HTTP ته لېږدوي. کارول شوې `mcp-remote` پله دا کار کوي:

```json
{
  "mcpServers": {
    "layatanahi": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://app.example.com/mcp/business",
        "--header",
        "Authorization: Bearer ${LAYATANAHI_TOKEN}",
        "--header",
        "X-Business-Branch: 4"
      ],
      "env": {
        "LAYATANAHI_TOKEN": "12|your-secret"
      }
    }
  }
}
```

پله د ناستې پیژندنه (session identifier) ساتي او JSON-RPC پیغامونه لېږدوي. که ستاسو کلاینت لرې HTTP په اصلي (native) ډول ملاتړ کوي، هغه د پلې پر ځای غوره ګڼئ.

## د چاپیریال اړوند یادښتونه

| چاپیریال | یادښت |
| --- | --- |
| محلي پراختیا | `/mcp/business/test` محلي سنډبکس وکاروئ؛ token یا کوټه نه غواړي |
| Staging | د staging اعتبارنامه وکاروئ، هېڅکله د production ډاټا نه |
| Production | یوازې HTTPS؛ اعتبارنامه په منظمو وختونو کې وڅرخوئ |
| له پراکسي تر شا | د MCP لپاره د ځواب بافربندي غیر فعاله کړئ |

محلي سنډبکس یوازې هغه وخت شتون لري چې اپلیکیشن په `local` یا `testing` کې د `APP_DEBUG=true` سره چلیږي. له سوداګرۍ `#1` سره نښلول شوی دی او د ټولې سوداګرۍ لوستل ورکوي.

## د اړیکې تایید

1. له کلاینت وغواړئ افزارونه لیست کړي. باید `products`، `stock`، `purchases`، `orders` او `sales` وګورئ.
2. `products` د `per_page: 1` سره وبولئ. پایله تصدیق تاییدوي.
3. په څو-څانګه اعتبارنامې `sales` د `branch_id` پرته وبولئ. `branch_required` تېروتنه تاییدوي چې د څانګې پلي کول فعال دي.
4. داسې افزار وبولئ چې وړتیا یې تاسو نه وي ورکړې. باید ناکام شي؛ که بریالی شي، اعتبارنامه له حد زیات سکوپ لري.

## محلي ډیبګ

```bash
php artisan mcp:inspector
```

inspector افزارونه لیست کوي او اجازه ورکوي چې د ټاکلي ډول آرګومانونو سره یې وبولئ. دا د کلاینت د ترتیب ستونزه د سرور له ستونزه څخه د جلا کولو چټکه لاره ده.

همدارنګه کولی شئ پای ټکی له یوې لږترو JSON-RPC غوښتنې سره وازمویئ:

```bash
curl -s https://app.example.com/mcp/business \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

## د token سم مدیریت

- د هر کلاینت یا وسیلې لپاره جلا اعتبارنامه وکاروئ.
- token د کلاینت په پټ ځای کې وساتئ، نه په پرامپټونو یا سکرین‌شېټونو کې.
- کله چې کلاینت له کاره لغوه شي، اعتبارنامه بېرته واخلئ.
- د افشا کېدو د شک وروسته یې څرخوئ؛ زوړ token سمدلاسه کار پریږدي.
- `last_used_at` وکتئ ترڅو ډاډمن شئ چې همدا کلاینت له دې اعتبارنامې کار اخلي.

## اړوندې پاڼې

- [د MCP سرور](/docs/mcp/server)
- [د MCP تصدیق](/docs/mcp/authentication)
- [د MCP ستونزه‌شکنی](/docs/mcp/troubleshooting)
- [د API کیلي او محدودې](/docs/api/api-key)
