from pathlib import Path
from pygments import highlight
from pygments.lexers.javascript import TypeScriptLexer
from pygments.formatters import HtmlFormatter

p_in = Path('userscript_docs/README.md')
p_out = Path('pakkujs/page/userscript_editor.html')

marker_begin = '<!-- DOC-GEN: BEGIN-TYPE-DEF -->'
marker_end = '<!-- DOC-GEN: END-TYPE-DEF -->'

### read input

t_in = p_in.read_text(encoding='utf-8')
assert marker_begin in t_in
t_in = t_in.partition(marker_begin)[2]
assert marker_end in t_in
t_in = t_in.partition(marker_end)[0]

assert '```typescript' in t_in
t_in = t_in.partition('```typescript')[2]
assert '```' in t_in
t_in = t_in.partition('```')[0]

t_in = t_in.strip()

### do highlight

formatter = HtmlFormatter(cssclass='typedef-hl')
html = highlight(t_in, TypeScriptLexer(), formatter).strip()
css = formatter.get_style_defs().strip()
out = f'<style>{css}</style>\n{html}'

### write output

t_out = p_out.read_text(encoding='utf-8')
assert marker_begin in t_out
t_before, _, t_out = t_out.partition(marker_begin)
assert marker_end in t_out
t_out, _, t_after = t_out.partition(marker_end)

t_out = f'{t_before}{marker_begin}\n{out}\n{marker_end}{t_after}'
p_out.write_text(t_out, encoding='utf-8')

print('done')