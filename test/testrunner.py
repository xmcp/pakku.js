from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import os
import time
from xml.dom.minidom import parseString

print('== initializing selenium')

opt=Options()
opt.add_argument('load-extension=%s'%os.path.abspath('../pakkujs'))
opt.add_argument('--no-default-browser-check')
opt.add_argument('--user-agent=xmcp_pakku_test_runner, like Gecko and Mozilla/5.0')
opt.add_argument('--no-first-run')
b=webdriver.Chrome('driver/chromedriver',chrome_options=opt)

print('== chrome launched. waiting for pakku.js to be installed')

time.sleep(5)

print('== finding pakkujs')

b.get('http://_get_pakkujs_options_page.bilibili.com/_xmcp_used_for_travis_ci')
opt_url=b.title
if not opt_url.startswith('chrome-extension://'):
    raise RuntimeError('! bad opt_url: '+opt_url)

print('== ok. pakku.js page:',opt_url)

def goto_options():
    if b.current_url!=opt_url:
        print(' == will redirect to options page:',b.current_url)
        b.get(opt_url)

def update_settings(k,v):
    print('== update settings %r %r'%(k,v))
    goto_options()
    b.execute_script('localStorage[%r]=%r'%(k,v))
    b.execute_script('''
        chrome.runtime.getBackgroundPage(function(page){
            page.loadconfig();
        });
    ''')

def get_source():
    return b.execute_script('return document.getElementById("webkit-xml-viewer-source-xml").innerHTML')

def wait_title(timeout):
    for _ in range(timeout*10):
        if b.title:
            return b.title
        time.sleep(.1)
    raise RuntimeError('js not keeping up')
    
def set_global_switch(val):
    goto_options()
    b.execute_script('''
        document.title='';
        (function(val){
            chrome.runtime.getBackgroundPage(function(page){
                page.set_global_switch(val);
                document.title='ok';
            });
        })(arguments[0]);
    ''',val)
    wait_title(5)

def parse_string(s,timeout=5):
    goto_options()
    b.execute_script('''
        document.title='';
        console.log(arguments);
        (function(str){
            chrome.runtime.getBackgroundPage(function(page){
                document.title=page.parse_string(str);
            });
        })(arguments[0]);
    ''',s)
    dom=parseString(wait_title(timeout))
    return dom.getElementsByTagName('d')

def parse_ajax(url,timeout=30):
    b.execute_script('''
        document.title='';
        console.log(arguments);
        (function(url){
            var xhr=new XMLHttpRequest;
            xhr.open('get',url);
            xhr.addEventListener('load',function() {
                document.title=this.response;
            });
            xhr.send();
        })(arguments[0]);
    ''',url)
    return wait_title(timeout)