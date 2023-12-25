import { WorkChain } from "../../../comm/util/WorkChain";
import { FOUR_DIR, SAME_POS, TilePos } from "../../../define/GridDefine";
import { TileGroup } from "../../../define/TileDefine";
import { TileCd } from "../../act/TileCd";
import { TileSwap } from "../../act/TileSwap";
import { GridCmd } from "../../mvc/GridCmd";
import { TileModel } from "../../mvc/model/TileModel";
import { SelectParam } from "../SelectHandler";

/**
 * 敵人移動
 */
export class EnemyWalk extends WorkChain {
    //
    private _param: SelectParam = null;

    //
    private _cmd: GridCmd = null;

    // 上一動位置
    private _last: TilePos = null;

    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        this._param = param;
        param.enemyAtks = [];

        let atkers = Array.from(param.model.enemies);
        atkers = atkers.filter(atk => { return atk.cd <= 0 });
        atkers.forEach(atker => this.walk(param.model.getTileById(atker.id)), this);

        return true;
    }

    /**
     * 開始行走
     * @param tile 
     */
    private walk(tile: TileModel): void {
        this._last = tile.pos;
        this._cmd = new GridCmd();

        // 行動力為每回可移動步數
        for (let i = 0; i < tile.dex; i++) {
            if (this.contacted(tile.pos, tile)) {
                break;
            }

            this.step(tile);
        }

        // 冷卻
        this._cmd.add(tile, new TileCd());
        this._param.skip.push(tile.id);
    }

    /**
     * 是否已與玩家接觸
     * @param center 
     * @param atker 
     */
    private contacted(center: TilePos, atker: TileModel): boolean {
        let ay = Object.values(FOUR_DIR);
        let len = ay.length

        for (let i = 0; i < len; i++) {
            let pos = { x: center.x + ay[i].x, y: center.y + ay[i].y };
            let tile = this._param.model.getTile(pos);

            if (tile && tile.group == TileGroup.Player) {
                this._param.atkers.push(atker);
                this._param.enemyAtks.push(atker.id);
                return true;
            }
        }

        return false;
    }

    /**
     * 移動所需消耗
     * @param from 起點
     * @param to 終點
     */
    private cost(from: TilePos, to: TilePos): number {
        let tile = this._param.model.getTile(from);

        if (tile && tile.group == TileGroup.Norm && tile.id >= 0) {
            return Math.abs(to.x - from.x) + Math.abs(to.y - from.y);
        }

        return Number.MAX_SAFE_INTEGER;
    }

    /**
     * 步進
     * @param tile 
     */
    private step(tile: TileModel): void {
        let ay = Object.values(FOUR_DIR);
        let len = ay.length;
        let to = tile.pos;
        let min = Number.MAX_SAFE_INTEGER;

        // 四向搜尋消耗最少的未置
        for (let i = 0; i < len; i++) {
            let temp = { x: tile.pos.x + ay[i].x, y: tile.pos.y + ay[i].y };

            // 禁止走回頭路
            if (this._last && SAME_POS(this._last, temp)) {
                continue;
            }

            // 走向玩家的消耗
            let cost = this.cost(temp, this._param.model.player.pos);

            if (min > cost) {
                min = cost;
                to = temp;
            }
        }

        // 可移動
        if (SAME_POS(tile.pos, to) == false) {
            this._last = tile.pos;
            this.swap(tile.pos, to);
        }
    }

    /**
     * 互換
     * @param from 起點
     * @param to 終點
     */
    private swap(from: TilePos, to: TilePos): void {
        let fromTile = this._param.model.getTile(from);
        let toTile = this._param.model.getTile(to);

        cc.log("行走", fromTile.id, from, to);

        this._cmd.add(fromTile, new TileSwap(to));
        this._cmd.add(toTile, new TileSwap(from));
        this._cmd.pass(0.5);

        this._param.load.push(this._cmd);

        this._param.model.setTile(from, toTile);
        this._param.model.setTile(to, fromTile);
    }
}
