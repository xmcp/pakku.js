// used for firefox

console.log('pakku: inject xhr hook');
let sc = document.createElement('script');
sc.src = chrome.runtime.getURL('/assets/xhr_hook.js');
document.documentElement.appendChild(sc);