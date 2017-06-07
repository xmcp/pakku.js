#coding=utf-8
import testrunner as runner
from xml.dom.minidom import *
import json

def demo(fn):
    with open('demo/%s.xml'%fn,'r',encoding='utf-8') as f:
        return f.read()

print('== reset settings')
runner.update_settings('DANMU_FUZZ','off')
runner.update_settings('ENLARGE','off')
runner.update_settings('PROC_TYPE7','off')
runner.update_settings('REMOVE_SEEK','off')
runner.update_settings('TRIM_ENDING','off')
runner.update_settings('TRIM_SPACE','off')
runner.update_settings('TAOLUS','[]')
runner.update_settings('WHITELIST','[]')
runner.update_settings('THRESHOLD','20')

# ignored tests: FLASH_NOTIF POPUP_BADGE TRIM_ENDING TRIM_SPACE

print('!= test hook')

runner.b.get('http://comment.bilibili.com/1.xml')
assert not runner.b.current_url.startswith('data:')

print('!= test global switch')

runner.set_global_switch(False)
runner.b.get('http://comment.bilibili.com/1.debug.xml')
assert not runner.b.current_url.startswith('data:')

runner.set_global_switch(True)
runner.b.get('http://comment.bilibili.com/1.debug.xml')
assert runner.b.current_url.startswith('data:')

print('!= test xml format')

src=runner.get_source()
dom=parseString(src)

assert len(dom.childNodes)==1
assert dom.childNodes[0].tagName=='i'
danmu=dom.getElementsByTagName('d')[0]
assert len(danmu.getAttribute('p').split(','))>3
assert len(danmu.childNodes)==1
assert isinstance(danmu.childNodes[0],Text)

print('!= test encoding')

danmus=runner.parse_string(demo('unicode'))
assert len(danmus)==1
assert danmus[0].childNodes[0].data=='testｔｅｓｔ[]【】'

print('!= test danmu mark')

runner.update_settings('DANMU_MARK','off')
assert runner.parse_string(demo('unicode_2'))[0].childNodes[0].data=='testｔｅｓｔ[]【】'
runner.update_settings('DANMU_MARK','prefix')
assert runner.parse_string(demo('unicode_2'))[0].childNodes[0].data=='[x2] testｔｅｓｔ[]【】'
runner.update_settings('DANMU_MARK','suffix')
assert runner.parse_string(demo('unicode_2'))[0].childNodes[0].data=='testｔｅｓｔ[]【】 [x2]'

print('!= test enlarge')

runner.update_settings('ENLARGE','off')
assert runner.parse_string(demo('unicode_2'))[0].getAttribute('p').split(',')[2]=='25'
assert runner.parse_string(demo('unicode_100'))[0].getAttribute('p').split(',')[2]=='25'
runner.update_settings('ENLARGE','on')
assert runner.parse_string(demo('unicode_2'))[0].getAttribute('p').split(',')[2]=='25'
assert runner.parse_string(demo('unicode_100'))[0].getAttribute('p').split(',')[2]=='50'

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
assert 'Player.seek(' not in danmus[0].childNodes[0].data

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
assert '[x2]' in danmus[0].childNodes[0].data

print('!= test special danmu json')

danmus=runner.parse_string(demo('special_json_2'))
assert len(danmus)==1
assert danmus[0].getAttribute('p').split(',')[1]=='7' # type == special_danmu
special_obj=json.loads(danmus[0].childNodes[0].data)
assert '[x2]' in special_obj[4]

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

print('!= test taolus')

runner.update_settings('TAOLUS','[]')
assert len(runner.parse_string(demo('taolu_test')))==3
runner.update_settings('TAOLUS','[["taolu(\\\\d+)","bingo"]]')
assert len(runner.parse_string(demo('taolu_test')))==2

print('!= test whitelist')

runner.update_settings('WHITELIST','[["^.*ｔｅｓｔ.*$",""]]')
assert len(runner.parse_string(demo('unicode_2')))==2
runner.update_settings('WHITELIST','[]')
assert len(runner.parse_string(demo('unicode_2')))==1

print('!= test danmu fuzz')

runner.update_settings('DANMU_FUZZ','on')
assert len(runner.parse_string(demo('edit_distance')))==1
assert len(runner.parse_string(demo('edit_distance_short')))==2
runner.update_settings('DANMU_FUZZ','off')
assert len(runner.parse_string(demo('edit_distance')))==2 # as our edit_distance is buggy
assert len(runner.parse_string(demo('edit_distance_short')))==2

print('== well done! exitting...')
runner.b.quit()