#!/usr/bin/env python3
"""Validate translated doc files for common corruption patterns.

Flags:
  - CJK characters that slip into RTL text
  - Arabic/Hebrew-script letters glued directly to Latin letters
    (e.g. "ØªØ§ÛŠØ¯ide") which indicates a botched token splice
  - files still identical to the English source (untranslated)
"""
import re
import sys
import pathlib

ROOT = pathlib.Path('resources/docs')
AR = r'\u0620-\u064A\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\uFB50-\uFDFF\uFE70-\uFEFF'
CJK = r'\u3040-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uAC00-\uD7AF'

# Detect a run of Latin letters embedded *inside* an Arabic word with no
# spaces (Arabic-Latin-Arabic). This is the unambiguous signature of a
# botched token splice such as "\u062a\u0627\u06ccide". Legit loanword plurals like
# "agent\u0648\u0646\u0647" or "SKU\u0647\u0627" (Latin start + Arabic suffix) are intentionally NOT flagged.
def glued_hits(text):
    hits = []
    for m in re.finditer(rf'[{AR}][A-Za-z]+[{AR}]', text):
        s, e = m.span()
        hits.append(text[max(0, s-6):e+6])
    return hits

def cjk_hits(text):
    return [text[max(0, m.start()-8):m.end()+8] for m in re.finditer(CJK, text)]

# Legit Latin terms we intentionally keep in Latin script inside RTL prose.
WHITELIST = {
    'AI','B2B','B2C','SKU','API','URL','JSON','HTTP','HTTPS','Excel','PDF',
    'CRUD','CIT','BRT','VAT','AFN','USD','AGH','Hesab','Pay','HesabPay',
    'Google','Facebook','Login','Sign','In','Up','Cart','Checkout','Backup',
    'Audit','Log','Agile','Methodology','Testing','Dashboard','Vendor',
    'Vendors','Product','Products','Invoice','ID','IDs','Id','MRZ','TAC',
    'JWT','OAuth','SAML','SSO','MFA','OTP','Webhook','Webhooks','REST',
    'Endpoint','Endpoints','Param','Params','Query','Schema','Token','Rate',
    'Limit','Timeout','Email','e','Post','GET','PUT','DELETE','PATCH','PST',
    'README','UI','UX','SDK','CLI','CI','CD','SQL','NoSQL','Redis','Memcached',
    'S3','AWS','GCP','Azure','Docker','Kubernetes','Nginx','Apache','PHP',
    'Laravel','React','Vue','Node','Vite','Inertia','Octane','FrankenPHP',
    'MySQL','Postgres','PostgreSQL','SQLite','MongoDB','Elasticsearch',
    'Business','Intelligence','Data','Reports','Report','Tax','Taxes',
    'Purchases','Sales','Expenses','Inventory','Employees','Salaries',
    'Payments','Notifications','Confirmation','Transaction','Transactions',
    'Management','Settings','Profile','Orders','Shipment','Shipments',
    'Delivery','Support','Search','Discovery','Assistance','Purchase',
    'Review','Reviews','Rating','Ratings','Media','Model','Dimensions',
    'Materials','Specifications','Pricing','Quantity','Availability',
    'Variants','Variant','Category','Categories','Brand','Brands',
    'Barcode','Barcodes','Batch','Tracking','Warehouse','Branch','Branches',
    'Supplier','Suppliers','Customer','Customers','Merchant','Store','Stores',
    'Owner','Founder','Manager','CEO','Designer','Marketing','Agent','Agents',
    'Assistant','Natural','Language','Localization','Export','Download',
    'Account','Activity','Calendar','Reminder','Security','Preference',
    'Preferences','General','Income','Expense','Refund','Discount',
    'Total','Subtotal','Unit','Price','Prices','Date','Time','Status',
    'Error','Errors','Code','Codes','Message','Messages','Request','Requests',
    'Response','Responses','Field','Fields','Value','Values','Key','Keys',
    'Example','Examples','Note','Warning','Important','See','See','Table',
    'Tables','List','Lists','Page','Pages','Section','Sections','File','Files',
    'Name','Names','Type','Types','Number','Limit','Offset','Filter','Filters',
    'Sort','Order','Asc','Desc','true','false','null','None','Get','Set',
    'Create','Update','Delete','Read','Insert','Select','Where','And','Or',
    'string','integer','int','float','bool','boolean','array','object','text',
    'enabled','disabled','active','inactive','pending','completed','cancelled',
    'callback','queue','cron','jobs','cache','session','cookie','header',
    'headers','body','payload','signature','timestamp','checksum','hash',
    'login','logout','register','password','username','token','bearer',
    'scope','scopes','grant','revoke','auth','authentication','authorization',
    'endpoint','resource','resources','pagination','cursor','metadata',
}

def latin_hits(text):
    # Latin word tokens (2+ letters) that are not whitelisted, appearing
    # in a line that is otherwise RTL (contains Arabic script).
    hits = []
    for line in text.splitlines():
        if not re.search(rf'[{AR}]', line):
            continue
        for m in re.finditer(r'[A-Za-z][A-Za-z0-9/+_.-]{1,}', line):
            tok = m.group(0)
            base = tok.rstrip('.,)();!?")')
            if base in WHITELIST or base.lower() in {w.lower() for w in WHITELIST}:
                continue
            hits.append(base)
    return hits

def main():
    langs = ['ps', 'fa_AF']
    en_dir = ROOT / 'en'
    problems = 0
    for lang in langs:
        for path in sorted((ROOT / lang).rglob('*.md')):
            rel = path.relative_to(ROOT / lang)
            text = path.read_text(encoding='utf-8')
            en_path = en_dir / rel
            cjk = cjk_hits(text)
            glu = glued_hits(text)
            lat = latin_hits(text)
            untranslated = False
            if en_path.exists():
                en_text = en_path.read_text(encoding='utf-8').strip()
                if not en_text:
                    continue  # nothing to translate; empty placeholder page
                untranslated = text.strip() == en_text
            if cjk or glu or lat or untranslated:
                problems += 1
                flags = []
                if untranslated:
                    flags.append('UNTRANSLATED(identical to en)')
                if cjk:
                    flags.append(f'CJK({len(cjk)}): ' + ' | '.join(repr(c) for c in cjk[:3]))
                if glu:
                    flags.append(f'GLUED({len(glu)}): ' + ' | '.join(repr(c) for c in glu[:3]))
                if lat:
                    uniq = sorted(set(lat))
                    flags.append(f'LATIN?({len(uniq)}): ' + ', '.join(uniq[:12]))
                print(f'[{lang}] {rel}: ' + ' ; '.join(flags))
    if problems == 0:
        print('OK - no issues found')
    else:
        print(f'\n{problems} file(s) with potential issues')
    return 0

if __name__ == '__main__':
    sys.exit(main())
