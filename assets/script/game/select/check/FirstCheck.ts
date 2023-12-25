import { WorkChain } from "../../../comm/util/WorkChain";
import { TileSelect } from "../../act/TileSelect";
import { GridCmd } from "../../mvc/GridCmd";
import { CheckParam } from "../SelectHandler";

/**
 * 初選檢查
 */
export class FirstCheck extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        if (param.from) {
            return true;
        }

        cc.log("初選", param.to.tile.id);

        param.load.push(new GridCmd().add(param.to.tile, new TileSelect(true)));

        param.from = param.to;
        param.to = null;

        return false;
    }
}
