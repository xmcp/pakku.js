import {Ingress, Egress} from '../protocol/interface';
import {AjaxResponse, int, LocalizedConfig} from '../core/types';
import {handle_task} from '../core/scheduler';
import {UserscriptWorker} from '../core/userscript';

export async function process_local(ingress: Ingress, egress: Egress, config: LocalizedConfig, tabid: int): Promise<AjaxResponse> {
    let perform = function(): Promise<AjaxResponse> {
        return new Promise((resolve) => {
            handle_task(ingress, egress, resolve, config, tabid as int);
        });
    };
    return await perform();
}

export async function userscript_sandbox(script: string): Promise<{error: string} | {error: null, total: int}> {
    let w = null;
    try {
        w = new UserscriptWorker(script);
        let tot_number = await w.init();
        return {error: null, total: tot_number};
    } catch(e: any) {
        return {error: `${e.message || '未知错误'}\n\n${e.stack}`};
    } finally {
        if(w)
            w.worker.terminate();
    }
}