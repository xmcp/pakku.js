#coding=utf-8
import testrunner as runner
from xml.dom.minidom import *
import json
import time

EXAMPLE_DANMAKU='https://api.bilibili.com/x/v1/dm/list.so?oid=3262388'

def demo(fn):
    with open('demo/%s.xml'%fn,'r',encoding='utf-8') as f:
        return f.read()

print('== reset settings')
runner.update_settings('MAX_DIST','0')
runner.update_settings('MAX_COSINE','1000')
runner.update_settings('PROC_TYPE7','on')
runner.update_settings('PROC_TYPE4','on')
runner.update_settings('PROC_POOL1','on')
runner.update_settings('TRIM_ENDING','off')
runner.update_settings('TRIM_SPACE','off')
runner.update_settings('TRIM_WIDTH','off')
runner.update_settings('DANMU_SUBSCRIPT','off')
runner.update_settings('FORCELIST','[]')
runner.update_settings('WHITELIST','[]')
runner.update_settings('THRESHOLD','20')
runner.update_settings('MARK_THRESHOLD','1')
runner.update_settings('HIDE_THRESHOLD','0')
runner.update_settings('SCROLL_THRESHOLD','0')
runner.update_settings('AUTO_DANMU_LIST','on')
runner.update_settings('TRIM_PINYIN','off')

# not tested: POPUP_BADGE

print('!= test injected ui')
runner.update_settings('FORCELIST','[["^.*$","pakku_test_str"]]')
runner.update_settings('TOOLTIP','on')
runner.update_settings('FLUCTLIGHT','on')
runner.b.get('https://www.bilibili.com/video/av314')
for _ in range(60):
    try:
        runner.b.find_element_by_css_selector('.danmaku-info-row')
    except:
        time.sleep(.5)
    else:
        break

time.sleep(1)

assert 'pakku_test_str' in runner.b.find_element_by_css_selector('.danmaku-info-row:nth-child(4)').text
assert runner.b.find_element_by_css_selector('.__pakku_injected')
assert runner.b.find_element_by_css_selector('.bilibili-player .pakku-panel')
assert runner.b.find_element_by_css_selector('.bilibili-player .bilibili-player-video-control canvas')

# this test is temporarily disabled
# http://link.acg.tv/forum.php?mod=viewthread&tid=13249
'''
print('!= test reload')
runner.b.execute_script('fetch("https://_xmcp_pakku_internal_test_domain.bilibili.com/change_taolus_and_reload")')
time.sleep(3)
assert 'pakku_another_str' in runner.b.find_element_by_css_selector('.bilibili-player .danmaku-info-row:first-child').text
assert len(runner.b.find_elements_by_css_selector('.bilibili-player .bilibili-player-video-progress canvas'))==1
'''

runner.update_settings('FORCELIST','[]')

print('!= test ajax hook')

runner.set_global_switch(False)
runner.b.get('http://www.bilibili.com/favicon.ico')
time.sleep(.5) # wait for ajax hook
assert '[x' not in runner.parse_ajax(EXAMPLE_DANMAKU)

runner.set_global_switch(True)
runner.b.get('http://www.bilibili.com/favicon.ico')
time.sleep(.5) # wait for ajax hook
assert '[x' in runner.parse_ajax(EXAMPLE_DANMAKU)
assert '[x' not in runner.parse_ajax(EXAMPLE_DANMAKU+'?pakku_test')

print('!= test working')

danmus=runner.parse_string(demo('unicode'))
assert len(danmus)==1
assert danmus[0].childNodes[0].data=='testｔｅｓｔ[]【】'
assert len(runner.parse_string(demo('different_100')))==100

print('!= test danmu mark')

runner.update_settings('DANMU_MARK','off')
assert runner.parse_string(demo('unicode_2'))[0].childNodes[0].data=='testｔｅｓｔ[]【】'
runner.update_settings('DANMU_MARK','suffix')
assert runner.parse_string(demo('unicode_2'))[0].childNodes[0].data=='testｔｅｓｔ[]【】[x2]'
runner.update_settings('DANMU_MARK','prefix')
assert runner.parse_string(demo('unicode_2'))[0].childNodes[0].data=='[x2]testｔｅｓｔ[]【】'

print('!= test enlarge')

runner.update_settings('ENLARGE','on')
assert runner.parse_string(demo('unicode_2'))[0].getAttribute('p').split(',')[2]=='25'
assert runner.parse_string(demo('unicode_25'))[0].getAttribute('p').split(',')[2]=='50'
runner.update_settings('ENLARGE','off')
assert runner.parse_string(demo('unicode_2'))[0].getAttribute('p').split(',')[2]=='25'
assert runner.parse_string(demo('unicode_25'))[0].getAttribute('p').split(',')[2]=='25'

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

print('!= test scroll threshold')

runner.update_settings('SCROLL_THRESHOLD',50)
assert runner.parse_string(demo('top'))[0].getAttribute('p').split(',')[1]=='1'
assert runner.parse_string(demo('bottom_2'))[0].getAttribute('p').split(',')[1]=='1'
runner.update_settings('SCROLL_THRESHOLD',1000)
assert runner.parse_string(demo('top'))[0].getAttribute('p').split(',')[1]=='5'
assert runner.parse_string(demo('bottom_2'))[0].getAttribute('p').split(',')[1]=='4'
runner.update_settings('SCROLL_THRESHOLD',0)
assert runner.parse_string(demo('top'))[0].getAttribute('p').split(',')[1]=='5'
assert runner.parse_string(demo('bottom_2'))[0].getAttribute('p').split(',')[1]=='4'

print('!= test code danmu')

assert len(runner.parse_string(demo('bas_2')))==2
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

print('!= test bottom danmu')
runner.update_settings('PROC_TYPE4','off')
assert len(runner.parse_string(demo('bottom_2')))==2
runner.update_settings('PROC_TYPE4','on')
assert len(runner.parse_string(demo('bottom_2')))==1

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
assert danmus[0].childNodes[0].data=='[x2]testｔｅｓｔ[]【】'

print('!= test special danmu json')

danmus=runner.parse_string(demo('special_json_2'))
assert len(danmus)==1
assert danmus[0].getAttribute('p').split(',')[1]=='7' # type == special_danmu
special_obj=json.loads(danmus[0].childNodes[0].data)
assert special_obj[4]=='[x2]testｔｅｓｔ[]【】'

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
danmus=runner.parse_string(demo('unicode_25'))
assert len(danmus)==1
assert '[x' in danmus[0].childNodes[0].data
runner.update_settings('MARK_THRESHOLD','25')
danmus=runner.parse_string(demo('unicode_25'))
assert len(danmus)==1
assert '[x' not in danmus[0].childNodes[0].data
runner.update_settings('MARK_THRESHOLD','1')
danmus=runner.parse_string(demo('unicode_2'))
assert len(danmus)==1
assert '[x' in danmus[0].childNodes[0].data

print('!= test taolus')

runner.update_settings('FORCELIST','[]')
assert len(runner.parse_string(demo('taolu_test')))==3
runner.update_settings('FORCELIST','[[".*","foo"]]')
assert 'foo' not in runner.parse_string(demo('unicode'))[0].childNodes[0].data
runner.update_settings('FORCELIST','[["taolu(\\\\d+)","bingo"]]')
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

print('!= test danmu subscript')
runner.update_settings('DANMU_SUBSCRIPT','on')
danmus=runner.parse_string(demo('unicode_2'))
assert danmus[0].childNodes[0].data=='₍₂₎testｔｅｓｔ[]【】'
runner.update_settings('DANMU_SUBSCRIPT','off')
danmus=runner.parse_string(demo('unicode_2'))
assert danmus[0].childNodes[0].data=='[x2]testｔｅｓｔ[]【】'

print('!= test hide threshold')
runner.update_settings('HIDE_THRESHOLD',10)
assert len(runner.parse_string(demo('unicode_10_and_1')))==2
runner.update_settings('HIDE_THRESHOLD',9)
assert len(runner.parse_string(demo('unicode_10_and_1')))==1
runner.update_settings('HIDE_THRESHOLD',0)
assert len(runner.parse_string(demo('unicode_10_and_1')))==2

print('!= test trim pinyin')
runner.update_settings('MAX_DIST','5')
runner.update_settings('TRIM_PINYIN','on')
assert len(runner.parse_string(demo('pinyin_2')))==1
runner.update_settings('MAX_DIST','4')
assert len(runner.parse_string(demo('pinyin_2')))==2
runner.update_settings('TRIM_PINYIN','off')
runner.update_settings('MAX_DIST','5')
assert len(runner.parse_string(demo('pinyin_2')))==2
runner.update_settings('TRIM_PINYIN','on')

print('!= test exception')

runner.update_settings('MAX_DIST','5')
runner.update_settings('MAX_COSINE','60')
assert len(runner.parse_string(demo('production')))<=300

print('== well done! exitting...')
runner.b.quit()