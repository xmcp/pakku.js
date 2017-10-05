#coding=utf-8
import testrunner as runner
from xml.dom.minidom import *
import json
import time

def demo(fn):
    with open('demo/%s.xml'%fn,'r',encoding='utf-8') as f:
        return f.read()

print('== reset settings')
runner.update_settings('MAX_DIST','0')
runner.update_settings('MAX_COSINE','1000')
runner.update_settings('PROC_TYPE7','off')
runner.update_settings('TRIM_ENDING','off')
runner.update_settings('TRIM_SPACE','off')
runner.update_settings('TRIM_WIDTH','off')
runner.update_settings('TAOLUS','[]')
runner.update_settings('WHITELIST','[]')
runner.update_settings('THRESHOLD','20')
runner.update_settings('MARK_THRESHOLD','1')

# not tested: FLASH_NOTIF POPUP_BADGE

print('!= test webrequest hook')

runner.set_global_switch(False)
runner.b.get('http://comment.bilibili.com/1.xml?debug')
assert not runner.b.current_url.startswith('data:')

runner.set_global_switch(True)
runner.b.get('http://comment.bilibili.com/1.xml?debug')
assert runner.b.current_url.startswith('data:')
runner.b.get('http://comment.bilibili.com/1.xml')
assert not runner.b.current_url.startswith('data:')

print('!= test xml format')

src=runner.get_source()
dom=parseString(src)

assert len(dom.childNodes)==1
assert dom.childNodes[0].tagName=='i'
danmu=dom.getElementsByTagName('d')[0]
assert len(danmu.getAttribute('p').split(','))>3
assert len(danmu.childNodes)==1
assert isinstance(danmu.childNodes[0],Text)

print('!= test ajax hook')

runner.set_global_switch(False)
runner.b.get('http://www.bilibili.com/favicon.ico')
time.sleep(.5) # wait for ajax hook
assert '[x' not in runner.parse_ajax('//comment.bilibili.com/1.xml')

runner.set_global_switch(True)
runner.b.get('http://www.bilibili.com/favicon.ico')
time.sleep(.5) # wait for ajax hook
assert '[x' in runner.parse_ajax('//comment.bilibili.com/1.xml')
assert '[x' not in runner.parse_ajax('http://comment.bilibili.com/1.xml?pakku_test')

print('!= test working')

danmus=runner.parse_string(demo('unicode'))
assert len(danmus)==1
assert danmus[0].childNodes[0].data=='testｔｅｓｔ[]【】'
assert len(runner.parse_string(demo('different_100')))==100

print('!= test danmu mark')

runner.update_settings('DANMU_MARK','off')
assert runner.parse_string(demo('unicode_2'))[0].childNodes[0].data=='testｔｅｓｔ[]【】'
runner.update_settings('DANMU_MARK','suffix')
assert runner.parse_string(demo('unicode_2'))[0].childNodes[0].data=='testｔｅｓｔ[]【】 [x2]'
runner.update_settings('DANMU_MARK','prefix')
assert runner.parse_string(demo('unicode_2'))[0].childNodes[0].data=='[x2] testｔｅｓｔ[]【】'

print('!= test enlarge')

runner.update_settings('ENLARGE','on')
assert runner.parse_string(demo('unicode_2'))[0].getAttribute('p').split(',')[2]=='25'
assert runner.parse_string(demo('unicode_100'))[0].getAttribute('p').split(',')[2]=='50'
runner.update_settings('ENLARGE','off')
assert runner.parse_string(demo('unicode_2'))[0].getAttribute('p').split(',')[2]=='25'
assert runner.parse_string(demo('unicode_100'))[0].getAttribute('p').split(',')[2]=='25'

print('!= test shrink')

runner.update_settings('SHRINK','on')
danmus=runner.parse_string(demo('different_2'))
assert len(danmus)==2
assert danmus[0].getAttribute('p').split(',')[2]=='25'
danmus=runner.parse_string(demo('different_100'))
assert len(danmus)==100
assert int(danmus[0].getAttribute('p').split(',')[2])<25
runner.update_settings('SHRINK','off')
assert runner.parse_string(demo('different_2'))[0].getAttribute('p').split(',')[2]=='25'
assert runner.parse_string(demo('different_100'))[0].getAttribute('p').split(',')[2]=='25'

print('!= test code danmu')

runner.update_settings('REMOVE_SEEK','off')
danmus=runner.parse_string(demo('code_seek_2'))
assert len(danmus)==2
assert danmus[0].getAttribute('p').split(',')[1]=='8' # type == code_danmu
assert danmus[0].childNodes[0].data=='Player.seek(0)'
runner.update_settings('REMOVE_SEEK','on')
danmus=runner.parse_string(demo('code_seek_2'))
assert len(danmus)==2
assert danmus[0].getAttribute('p').split(',')[1]=='8' # type == code_danmu
assert danmus[0].childNodes[0].data.startswith('/*!')

print('!= test special danmu')

runner.update_settings('PROC_TYPE7','off')
danmus=runner.parse_string(demo('special_2'))
assert len(danmus)==2
assert danmus[0].getAttribute('p').split(',')[1]=='7' # type == special_danmu
assert danmus[0].childNodes[0].data=='testｔｅｓｔ[]【】'

runner.update_settings('PROC_TYPE7','on')
danmus=runner.parse_string(demo('special_2'))
assert len(danmus)==1
assert danmus[0].getAttribute('p').split(',')[1]=='7' # type == special_danmu
assert danmus[0].childNodes[0].data=='[x2] testｔｅｓｔ[]【】'

print('!= test special danmu json')

danmus=runner.parse_string(demo('special_json_2'))
assert len(danmus)==1
assert danmus[0].getAttribute('p').split(',')[1]=='7' # type == special_danmu
special_obj=json.loads(danmus[0].childNodes[0].data)
assert special_obj[4]=='[x2] testｔｅｓｔ[]【】'

danmus=runner.parse_string(demo('special_json'))
assert len(danmus)==1
assert danmus[0].getAttribute('p').split(',')[1]=='7' # type == special_danmu
special_obj=json.loads(danmus[0].childNodes[0].data)
assert special_obj[4]=='testｔｅｓｔ[]【】'


print('!= test threshold')

runner.update_settings('THRESHOLD','1')
danmus=runner.parse_string(demo('delta10'))
assert len(danmus)==2
assert '[x' not in danmus[0].childNodes[0].data
assert '[x' not in danmus[1].childNodes[0].data

runner.update_settings('THRESHOLD','20')
danmus=runner.parse_string(demo('delta10'))
assert len(danmus)==1
assert '[x2]' in danmus[0].childNodes[0].data

print('!= test mark threshold')

runner.update_settings('MARK_THRESHOLD','2')
danmus=runner.parse_string(demo('unicode_2'))
assert len(danmus)==1
assert '[x' not in danmus[0].childNodes[0].data
danmus=runner.parse_string(demo('unicode_100'))
assert len(danmus)==1
assert '[x' in danmus[0].childNodes[0].data
runner.update_settings('MARK_THRESHOLD','100')
danmus=runner.parse_string(demo('unicode_100'))
assert len(danmus)==1
assert '[x' not in danmus[0].childNodes[0].data
runner.update_settings('MARK_THRESHOLD','1')
danmus=runner.parse_string(demo('unicode_2'))
assert len(danmus)==1
assert '[x' in danmus[0].childNodes[0].data

print('!= test taolus')

runner.update_settings('TAOLUS','[]')
assert len(runner.parse_string(demo('taolu_test')))==3
runner.update_settings('TAOLUS','[[".*","foo"]]')
assert 'foo' not in runner.parse_string(demo('unicode'))[0].childNodes[0].data
runner.update_settings('TAOLUS','[["taolu(\\\\d+)","bingo"]]')
assert len(runner.parse_string(demo('taolu_test')))==2

print('!= test whitelist')

runner.update_settings('WHITELIST','[["^.*ｔｅｓｔ.*$",""]]')
assert len(runner.parse_string(demo('unicode_2')))==2
runner.update_settings('WHITELIST','[]')
assert len(runner.parse_string(demo('unicode_2')))==1

print('!= test edit distance')

runner.update_settings('MAX_DIST','5')
assert len(runner.parse_string(demo('edit_distance')))==1
assert len(runner.parse_string(demo('edit_distance_short_true')))==1
assert len(runner.parse_string(demo('edit_distance_short_false')))==2
runner.update_settings('MAX_DIST','0')
assert len(runner.parse_string(demo('edit_distance')))==2 # as our edit_distance is buggy
assert len(runner.parse_string(demo('edit_distance_short_true')))==2
assert len(runner.parse_string(demo('edit_distance_short_false')))==2

print('!= test cosine distance')

runner.update_settings('MAX_COSINE','30')
assert len(runner.parse_string(demo('cosine_distance')))==1
runner.update_settings('MAX_COSINE','99')
assert len(runner.parse_string(demo('cosine_distance')))==2
runner.update_settings('MAX_COSINE','1000')
assert len(runner.parse_string(demo('cosine_distance')))==3

print('!= test trim ending')
runner.update_settings('TRIM_ENDING','on')
assert len(runner.parse_string(demo('trim_ending')))==3
runner.update_settings('TRIM_ENDING','off')
assert len(runner.parse_string(demo('trim_ending')))==6

print('!= test trim space')
runner.update_settings('TRIM_SPACE','on')
assert len(runner.parse_string(demo('trim_space')))==2
runner.update_settings('TRIM_SPACE','off')
assert len(runner.parse_string(demo('trim_space')))==6

print('!= test trim width')
runner.update_settings('TRIM_WIDTH','on')
assert len(runner.parse_string(demo('trim_width')))==3
runner.update_settings('TRIM_WIDTH','off')
assert len(runner.parse_string(demo('trim_width')))==6


print('!= test exception')

assert len(runner.parse_string(demo('production')))<=18000

print('== well done! exitting...')
runner.b.quit()