import { FOR_ROW_COL, GRID_ROW } from "../../../define/GridDefine";
import { TileFall } from "../../act/TileFall";
import { TileWait } from "../../act/TileWait";
import { GridCmd } from "../../mvc/GridCmd";
import { WorkChain } from "../../../comm/util/WorkChain";
import { SelectParam } from "../SelectHandler";

/**
 * 掉落
 * @summary 將盤內剩餘棋子往下方空位移動
 */
export class DropWork extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @param col 對指定的列做處理
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam, col?: number): Promise<boolean> {
        let cmd = new GridCmd();

        FOR_ROW_COL(end => {
            // 測滑使用
            if (col && col != end.x) {
                return;
            }

            // 目標是既存空位
            if (param.model.getTile(end)) {
                return;
            }

            // 尋找盤內可掉落物
            for (let i = end.y; i < GRID_ROW; i++) {
                let begin = { x: end.x, y: i };
                let tile = param.model.getTile(begin);

                if (tile) {
                    // 遇禁落物
                    if (tile.hold) {
                        return;
                    }

                    cc.log("掉落", tile.id, tile.type, end);

                    // 交換
                    param.model.setTile(end, tile);
                    param.model.setTile(begin, null);

                    cmd.add(tile, new TileWait(0.1));
                    cmd.add(tile, new TileFall(end));

                    param.changes.push(end);
                    param.load.push(cmd);

                    return;
                }
            }
        });

        return true;
    }
}
