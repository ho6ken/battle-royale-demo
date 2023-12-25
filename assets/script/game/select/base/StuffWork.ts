import { FOR_COL, GRID_ROW } from "../../../define/GridDefine";
import { TileFall } from "../../act/TileFall";
import { TileSpawn } from "../../act/TileSpawn";
import { WorkChain } from "../../../comm/util/WorkChain";
import { SelectParam } from "../SelectHandler";
import { TileModel } from "../../mvc/model/TileModel";
import { GridCmd } from "../../mvc/GridCmd";

/**
 * 填充
 * @summary 將盤內空位從盤外補上
 */
export class StuffWork extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @param col 對指定的列做處理
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam, col?: number): Promise<boolean> {
        let cmd = new GridCmd();
        param.load.push(cmd);        

        FOR_COL(x => {
            if (col && col != x) {
                return;
            }

            let count = 0;
            let top = 0;

            // 先找出最高的禁落物
            for (let i = GRID_ROW - 1; i >= 0; i--) {
                let pos = { x: x, y: i };
                let tile = param.model.getTile(pos);

                if (tile && tile.hold) {
                    top = i;
                    break;
                }
            }

            // 掉落物會被禁落物卡住
            for (let i = top; i < GRID_ROW; i++) {
                let end = { x: x, y: i };
                let space = param.model.getTile(end);

                // 尋找空位
                if (space == null) {
                    let tile = new TileModel();
                    param.model.setTile(end, tile);

                    // 種類與進場位置
                    tile.type = param.model.getRandType();
                    tile.entry = { x: x, y: GRID_ROW + count++ };

                    // 新棋盤外進盤內
                    cmd.add(tile, new TileSpawn());
                    cmd.add(tile, new TileFall(end));

                    param.changes.push(end);

                    cc.log("填補", tile.id, tile.type, end);

                    param.skip.push(tile.id);
                }
            }
        });

        return true;
    }
}
