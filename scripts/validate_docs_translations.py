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
            untranslated = False
            if en_path.exists():
                untranslated = text.strip() == en_path.read_text(encoding='utf-8').strip()
            if cjk or glu or untranslated:
                problems += 1
                flags = []
                if untranslated:
                    flags.append('UNTRANSLATED(identical to en)')
                if cjk:
                    flags.append(f'CJK({len(cjk)}): ' + ' | '.join(repr(c) for c in cjk[:3]))
                if glu:
                    flags.append(f'GLUED({len(glu)}): ' + ' | '.join(repr(c) for c in glu[:3]))
                print(f'[{lang}] {rel}: ' + ' ; '.join(flags))
    if problems == 0:
        print('OK - no issues found')
    else:
        print(f'\n{problems} file(s) with potential issues')
    return 0

if __name__ == '__main__':
    sys.exit(main())
