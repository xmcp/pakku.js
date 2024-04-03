import {get_config} from "./config";

export async function reset_dnr_status() {
    let config = await get_config();

    // reset status of danmu-update-blocker
    if(config.BREAK_UPDATE) {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
            enableRulesetIds: ['danmu-update-blocker'],
        });
        console.log('pakku update blocker: enabled dnr ruleset');
    } else {
        await chrome.declarativeNetRequest.updateEnabledRulesets({
            disableRulesetIds: ['danmu-update-blocker'],
        });
        console.log('pakku update blocker: disabled dnr ruleset');
    }
}