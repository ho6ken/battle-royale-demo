import { FOR_COL_ROW } from "../../../define/GridDefine";
import { WorkChain } from "../../../comm/util/WorkChain";
import { SelectParam } from "../SelectHandler";
import { TileModel } from "../../mvc/model/TileModel";

/**
 * 還原
 * @summary 開始前重置成初始狀態
 */
export class ResetWork extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        FOR_COL_ROW(pos => {
            let tile = <TileModel>param.model.getTile(pos);
            tile && tile.clear();
        });

        return true;
    }
}
