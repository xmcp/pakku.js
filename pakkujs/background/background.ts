import {reset_dnr_status} from "./danmu_update_blocker";
import {get_config, save_config} from "./config";

chrome.runtime.onInstalled.addListener(async (details)=>{
    await reset_dnr_status();

    if(details.reason==='install') {
        await chrome.tabs.create({url: chrome.runtime.getURL('page/options.html')});
    }

    if(details.reason==='update') {
        console.log('config: try to migrate');
        let config = await get_config();
        await save_config(config);
    }
});