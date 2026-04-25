// ==UserScript==
// @name         显示弹幕发送年份并进行筛选
// @namespace    http://tampermonkey.net/
// @version      2026-04-25
// @description  在弹幕列表旁边显示每年各有多少条弹幕，且可以仅显示特定年份的弹幕。此程序作为pakku外部用户脚本功能的简单演示，实现很粗糙，不建议直接使用。
// @author       xmcp
// @match        https://www.bilibili.com/video/*
// @icon         http://bilibili.com/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

// ↑ 注意到 @run-at document-end，这是因为我们要在弹幕列表旁边插入UI。只要在pakku开始处理弹幕前注册用户脚本都能生效。
// 改成document-start或者document-body会更稳定一点，但是插入UI的部分就需要通过代码等待播放器加载完再进行。

let filtered_year = new URLSearchParams(location.search).get('filtered_year');
if(filtered_year)
    filtered_year = parseInt(filtered_year, 10);

// 这一部分内容将注册为pakku用户脚本，在pakku的环境中执行
let pakku_script = `
// 可以通过这种方式传递参数，由于pakku会缓存弹幕处理结果，修改参数只有切换视频或刷新页面后才能生效
let filtered_year = ${JSON.stringify(filtered_year)};

let count_per_year = {};
let count_total = 0;
let count_deleted = 0;

// pakku处理弹幕之前的回调函数，记录每个弹幕的发送年份，并根据参数进行筛选
tweak_before_pakku((chunk)=>{
    chunk.objs = chunk.objs.filter((d)=>{
        let year = new Date(d.sendtime * 1000).getFullYear();
        count_per_year[year] = (count_per_year[year] || 0) + 1;

        count_total++;

        if(filtered_year && filtered_year!==year) {
            count_deleted++;
            return false;
        }

        return true;
    });
});

// pakku全部处理完成的回调函数，向页面发送DOM事件来报告统计结果，当然也可以选择在tweak_before_pakku里就发送部分统计结果
on_pakku_welldone(()=>{
    emit_dom_event('histogram_recv', {
        'total': count_total,
        'deleted': count_deleted,
        'histogram': count_per_year,
    });
});
`;

// 通过这种方式注册pakku用户脚本
let script_elem = document.createElement('script');
script_elem.type = 'text/x-pakku-userscript';
script_elem.textContent = pakku_script;
document.documentElement.appendChild(script_elem); // 必须直接放在<html>下，不能放在<head>或者<body>下，不然pakku读不到

// 把自己的UI插入到弹幕列表的上面
let panel_elem = document.createElement('div');
panel_elem.innerHTML = `
<div style="pointer-events: initial; background-color: yellow; margin-bottom: 1em">
    <p class="histogram-text" style="white-space: pre-wrap">No Data</p>
    <p>
        仅显示此年弹幕：
        <input class="histogram-filter-input" type="number" value="" style="width: 60px">
        <button type="button" class="histogram-filter-apply">应用</button>
    </p>
</div>
`;
document.querySelector('#danmukuBox').insertAdjacentElement('beforebegin', panel_elem);

let histogram_text = panel_elem.querySelector('.histogram-text');
let histogram_filter_input = panel_elem.querySelector('.histogram-filter-input');
let histogram_filter_apply = panel_elem.querySelector('.histogram-filter-apply');

histogram_filter_input.value = filtered_year;

// 点击应用按钮时刷新页面，当前筛选参数将作为URL参数传递给刷新后的自己
histogram_filter_apply.addEventListener('click', ()=>{
    let search = new URLSearchParams(location.search);
    if(histogram_filter_input.value)
        search.set('filtered_year', ''+histogram_filter_input.value);
    else
        search.delete('filtered_year');
    location.assign('?'+search);
});

// 监听pakku用户脚本完成时发送的DOM事件，更新UI
document.documentElement.addEventListener('histogram_recv', (e)=>{
    histogram_text.textContent = Object.entries(e.detail.histogram).map(([k, v]) => `${k}年：${v}条`).join('\n');
    histogram_text.textContent += `\n已去除弹幕数量：${e.detail.deleted} / ${e.detail.total}`;
});
