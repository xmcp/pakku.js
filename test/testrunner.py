from selenium import webdriver
import os
import time
from xml.dom.minidom import parseString

print('== initializing selenium')

opt=webdriver.ChromeOptions()
opt.add_argument('--load-extension=%s'%os.path.abspath('../dist/C'))
opt.add_argument('--user-agent=xmcp_pakku_test_runner Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36')
b=webdriver.Chrome('driver/chromedriver',chrome_options=opt)

print('== chrome launched. waiting for pakku.js to be installed')

time.sleep(5)

print('== finding pakkujs')

#b.switch_to.window(b.window_handles[1])
opt_url=b.title
if not opt_url.startswith('chrome-extension://'):
    b.switch_to.window(b.window_handles[1])
    time.sleep(.25)
    opt_url=b.title
    if not opt_url.startswith('chrome-extension://'):
        raise RuntimeError('! bad opt_url: '+opt_url)

print('== ok. pakku.js page:',opt_url)

def goto_options():
    if b.current_url!=opt_url:
        print(' == will redirect to options page:',b.current_url[:500])
        b.get(opt_url)

def update_settings(k,v):
    print('== update settings %r %r'%(k,v))
    goto_options()
    b.execute_script('localStorage[%r]=%r; return null;'%(k,v))
    b.execute_script('''
        chrome.runtime.getBackgroundPage(function(page){
            page.loadconfig();
        });
        return null;
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
        return null;
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
        return null;
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
        return null;
    ''',url)
    return wait_title(timeout)