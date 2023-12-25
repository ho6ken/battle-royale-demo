import { WorkChain } from "../../../comm/util/WorkChain";
import { TileGroup } from "../../../define/TileDefine";
import { TileSwap } from "../../act/TileSwap";
import { GridCmd } from "../../mvc/GridCmd";
import { CheckParam } from "../SelectHandler";

/**
 * 互換檢查
 */
export class SwapCheck extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        let group = param.from.tile.group;

        // 只處理指定棋種互換
        if (group == TileGroup.Norm || group == TileGroup.Skill) {
            this.swap(param);

            let res = param.model.isCrush(param.from.pos);
            res ||= param.model.isCrush(param.to.pos); 
    
            // 消除失敗
            if (res == false) {
                cc.log("失敗", param.from.tile.id, param.to.tile.id); 
    
                this.swap(param);
    
                param.from = null;
                param.to = null;
    
                return false;
            }
        }

        return true;
    }

    /**
     * 互換
     * @param param 
     */
    private swap(param: CheckParam): void {
        cc.log("互換", param.from.tile.id, param.to.tile.id);

        let cmd = new GridCmd();
        cmd.add(param.from.tile, new TileSwap(param.to.pos));
        cmd.add(param.to.tile, new TileSwap(param.from.pos));
        param.load.push(cmd);

        param.model.setTile(param.from.pos, param.to.tile);
        param.model.setTile(param.to.pos, param.from.tile);

        let temp = param.from.pos;
        param.from.pos = param.to.pos;
        param.to.pos = temp;
    }
}