import shutil
import os
import re
import json
os.chdir('..')

moz_re=re.compile(r'\/\*for-firefox:(.*?)\*\/',re.DOTALL)

if os.path.isdir('moz-build/pakkujs'):
    shutil.rmtree('moz-build/pakkujs')

def tamper(s):
    return moz_re.sub(r'\1',s)

def change_manifest(s):
    obj=json.loads(s)
    del obj['content_security_policy']
    obj['content_scripts']=[
        {'matches': ['*://*.bilibili.com/*'], 'js': ['assets/script_injector.js'], 'run_at': 'document_end', 'all_frames': True}
    ]
    obj['permissions']+=obj['optional_permissions']
    obj['permissions']+=['*://biliquery.typcn.com/*']
    return json.dumps(obj,ensure_ascii=False,indent=4)

for path,dirs,fns in os.walk('pakkujs'):
    newpath=os.path.join('moz-build',path)
    os.mkdir(newpath)
    for fn in fns:
        if fn=='manifest.json':
            with open(os.path.join(path,fn),'r',encoding='utf-8') as f:
                content=change_manifest(f.read())
            with open(os.path.join(newpath,fn),'w',encoding='utf-8') as f:
                f.write(content)
            continue
    
        name,ext=os.path.splitext(fn)
        if '%s.for-firefox%s'%(name,ext) in fns:
            continue
        if name.endswith('.for-firefox'):
            name=name[:-12]
        
        if ext=='.js':
            with open(os.path.join(path,fn),'r',encoding='utf-8') as f:
                content=tamper(f.read())
            with open(os.path.join(newpath,'%s%s'%(name,ext)),'w',encoding='utf-8') as f:
                f.write(content)
            
        else:
            shutil.copyfile(os.path.join(path,fn),os.path.join(newpath,'%s%s'%(name,ext)))