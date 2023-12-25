import { WorkChain } from "../../../comm/util/WorkChain";
import { TileGroup } from "../../../define/TileDefine";
import { TileCd } from "../../act/TileCd";
import { TileMove } from "../../act/TileMove";
import { TileSkill } from "../../act/TileSkill";
import { GridCmd } from "../../mvc/GridCmd";
import { CheckParam } from "../SelectHandler";

/**
 * 移動檢查
 */
export class MoveCheck extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: CheckParam): Promise<boolean> {
        let fromPos = param.from.pos;
        let fromTile = param.from.tile;

        let toPos = param.to.pos;
        let toTile = param.to.tile;

        // 只處理初選玩家
        if (fromTile.group == TileGroup.Player) {
            let cmd = new GridCmd();
            let res = true;

            switch (toTile.group) {
                // 一般棋種互換位置
                case TileGroup.Norm: 
                    cc.log("移動", toTile.id, fromPos);

                    cmd.add(toTile, new TileMove(fromPos));
                    param.model.setTile(fromPos, toTile);

                    break;

                // 技能
                case TileGroup.Skill:
                    cc.log("技能", toTile.id, toTile.type);

                    cmd.add(toTile, new TileSkill(toTile.type));
                    param.model.setTile(fromPos, null);

                    break;

                // 其他種類錯誤處理
                default:
                    cc.error("錯誤的移動目標", fromTile.id, toTile.id); 

                    param.from = null;
                    param.to = null;
                    res = false;

                    break;
            }

            // 玩家移動
            if (res) {
                cc.log("移動", fromTile.id, toPos);

                cmd.add(fromTile, new TileMove(toPos));
                param.model.setTile(toPos, fromTile);

                // 冷卻
                cmd.add(fromTile, new TileCd());
                param.skip.push(fromTile.id);
            }

            param.load.push(cmd);

            return res;
        }

        return true;
    }
}