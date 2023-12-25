import { WorkChain } from "../../../comm/util/WorkChain";
import { TileGroup } from "../../../define/TileDefine";
import { TileSelect } from "../../act/TileSelect";
import { GridCmd } from "../../mvc/GridCmd";
import { CheckParam } from "../SelectHandler";

/**
 * 複選檢查
 */
export class SecondCheck extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        let cmd = new GridCmd();
        let offset = Math.abs(param.to.pos.x - param.from.pos.x) + Math.abs(param.to.pos.y - param.from.pos.y);

        // 一般棋種需四向互換, 玩家則可任意移動
        if (offset == 1 || param.from.tile.group == TileGroup.Player) {
            cc.log("複選", param.to.tile.id);

            cmd.add(param.from.tile, new TileSelect(false));
            cmd.add(param.to.tile, new TileSelect(false));

            param.load.push(cmd);

            return true;
        }
        // 互換失敗
        else {
            cc.log("重選", param.to.tile.id);

            cmd.add(param.from.tile, new TileSelect(false));
            cmd.add(param.to.tile, new TileSelect(true));

            param.from = param.to;
            param.to = null;

            param.load.push(cmd);

            return false;
        }
    }
}
