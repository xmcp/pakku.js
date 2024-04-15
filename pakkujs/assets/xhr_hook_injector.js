(()=>{ // wrap in iife to avoid name conflict with content_script.js
    console.log('pakku: inject xhr hook');
    let sc = document.createElement('script');
    sc.src = chrome.runtime.getURL('/generated/xhr_hook.js');
    document.documentElement.appendChild(sc);
})();