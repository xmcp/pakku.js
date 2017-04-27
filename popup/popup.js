/**
 *  Copyright (C) 2017 @xmcp
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

chrome.runtime.getBackgroundPage(function(bgpage) {
    var enabled=bgpage.GLOBAL_SWITCH;
    var btn=document.getElementById('switch');

    function setbtn() {
        btn.classList.add(enabled?'on':'off');
        btn.classList.remove(enabled?'off':'on');
        btn.textContent=enabled?'工作中':'休息中';
    }
    btn.addEventListener('click',function() {
        bgpage.GLOBAL_SWITCH=enabled=!enabled;
        chrome.browserAction.setBadgeText({
            text: enabled?'':'zzz'
        });
        setbtn();
    });
    setbtn();
});
