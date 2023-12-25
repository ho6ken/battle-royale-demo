import { WorkChain } from "../../../comm/util/WorkChain";
import { GRID_COL, GRID_ROW, TilePos } from "../../../define/GridDefine";
import { TileSlip } from "../../act/TileSlip";
import { GridCmd } from "../../mvc/GridCmd";
import { TileModel } from "../../mvc/model/TileModel";
import { SelectParam } from "../SelectHandler";
import { DropWork } from "./DropWork";
import { StuffWork } from "./StuffWork";

/**
 * 側滑
 */
export class SlipWork extends WorkChain {
    //
    private _param: SelectParam = null;

    // 側滑後處理
    private _process: WorkChain = null;

    /**
     * 
     */
    constructor() {
        super();

        this._process = new DropWork();
        this._process.push(new StuffWork());
    }

    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        this._param = param;

        for (let y = 0; y < GRID_ROW; y++) {
            for (let x = 0; x < GRID_COL; x++) {
                let begin = { x: x, y: y };
                let tile = param.model.getTile(begin);

                if (tile == null || tile.hold) {
                    continue;
                }

                let right = this.searchR(begin);

                // 第一動向右下
                if (right.length > 0) {
                    this.slip(tile, right);
                    await this._process.execute(param, x);

                    continue;
                }

                let left = this.searchL(begin);

                // 第一動向左下
                if (left.length > 0) {
                    this.slip(tile, left);
                    await this._process.execute(param, x);

                    continue;
                }
            }
        }

        return true;
    }

    /**
     * 路徑搜尋
     * @param pos 
     * @summary 右下
     */
    private searchR(pos: TilePos): TilePos[] {
        return this.search({ x: pos.x + 1, y: pos.y - 1 });
    }

    /**
     * 路徑搜尋
     * @param pos 
     * @summary 左下
     */
    private searchL(pos: TilePos): TilePos[] {
        return this.search({ x: pos.x - 1, y: pos.y - 1 });
    }

    /**
     * 路徑搜尋
     * @param pos 
     */
    private search(pos: TilePos): TilePos[] {
        let path = [];

        if (pos.x < 0 || pos.x >= GRID_COL || pos.y < 0 || pos.y >= GRID_ROW) {
            return path;
        }

        let tile = this._param.model.getTile(pos);

        if (tile == null) {
            path.push(pos);

            let right = this.searchR(pos);

            // 下一動向右下
            if (right && right.length > 0) {
                path = path.concat(right);
                return path;
            }

            let left = this.searchL(pos);

            // 下一動向左下
            if (left && left.length > 0) {
                path = path.concat(left);
                return path;
            }
        }

        return path;
    }

    /**
     * 側滑
     * @param tile 
     * @param path 
     */
    private slip(tile: TileModel, path: TilePos[]): void {
        let cmd = new GridCmd();
        cmd.add(tile, new TileSlip(path));

        let begin = tile.pos;
        let end = path[path.length - 1];

        // 交換
        this._param.model.setTile(end, tile);
        this._param.model.setTile(begin, null);
        this._param.changes.push(end);

        cc.log("側滑", tile.id, end, path);

        this._param.load.push(cmd);
    }
}
