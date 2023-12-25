import { WorkChain } from "../../../comm/util/WorkChain";
import { SelectParam } from "../SelectHandler";

/**
 * 連鎖
 * @summary 檢查是否達成連鎖
 */
export class ComboWork extends WorkChain {
    /**
     * 業務處理
     * @param param
     * @returns 繼續向下執行 
     */
    protected async business(param: SelectParam): Promise<boolean> {
        let len = param.changes.length;

        for (let i = 0; i < len; i++) {
            let pos = param.changes[i];

            if (param.model.isCrush(pos)) {
                cc.log("連鎖", pos);

                param.finished = false;
                param.load[param.load.length - 1].slack = 50;

                return true;
            }
        }

        param.finished = true;
        
        return true;
    }
}