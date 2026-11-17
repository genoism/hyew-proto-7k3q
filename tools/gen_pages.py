import re,os
FONTS='''  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Frank+Ruhl+Libre:wght@400;500;700;900&family=IBM+Plex+Sans+Condensed:wght@400;500&display=swap" rel="stylesheet">'''
def page(title,key,base,main,scripts,extra_head=''):
    sc=''.join(f'  <script src="{base}js/{s}"></script>\n' for s in scripts)
    return f'''<!doctype html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
{FONTS}
  <link rel="stylesheet" href="{base}css/styles.css">{extra_head}
</head>
<body data-page="{key}" data-base="{base}" data-search="below">
  <div id="site-header"></div>
  <main id="main">
{main}
  </main>
  <div id="site-footer"></div>
{sc}</body>
</html>
'''
common=['data.js','glossary.js','site.js']
# placeholder pages in pages/
for f in os.listdir('pages'):
    s=open('pages/'+f).read()
    key=f[:-5]
    if key=='haskamos':
        out='''<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=../haskamos.html"><link rel="canonical" href="../haskamos.html"><title>Haskamos</title></head><body><a href="../haskamos.html">Haskamos</a></body></html>\n'''
        open('pages/'+f,'w').write(out); continue
    m=re.search(r'<div class="soon">.*?</div>',s,re.S)
    soon=m.group(0) if m else '<div class="soon"></div>'
    title=re.search(r'<title>(.*?)</title>',s).group(1)
    open('pages/'+f,'w').write(page(title,key,'../','    <div class="wrap">\n      '+soon+'\n    </div>',common))
W='    <div class="wrap" id="page-body"></div>'
open('parsha-sheets.html','w').write(page('Parsha Sheets — Have You Ever Wondered','parsha-sheets','',W,common+['sheets.js']))
open('parsha.html','w').write(page('Parsha — Have You Ever Wondered','parsha','',W,common+['sheets.js']))
open('sheet.html','w').write(page('Parsha Sheet — Have You Ever Wondered','sheet','',W,common+['sheets.js','glossary-ui.js']))
open('haskamos.html','w').write(page('Haskamos — Have You Ever Wondered','haskamos','',open('tools/haskamos.main.html').read(),common))
