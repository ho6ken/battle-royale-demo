import { RandUtil } from "../../../comm/util/RandUtil";
import { FOR_COL_ROW, FOR_ROW_COL, GRID_COL, GRID_ROW, TilePos } from "../../../define/GridDefine";
import { NORM_TILE, NULL_TILE, TileType } from "../../../define/TileDefine";
import { TileModel } from "./TileModel";

/**
 * 棋盤
 */
export class GridModelBase {
    // 棋子
    public tiles: TileModel[][] = [];

    /**
     * 
     */
    constructor() {
        FOR_ROW_COL(pos => {
            if (pos.y == 0) {
                this.tiles[pos.x] = [];
            }

            this.setTile(pos, new TileModel());
        });
    }

    /**
     * 清除
     */
    public clear(): void {
        FOR_COL_ROW(pos => this.tiles[pos.x][pos.y] = null);
        this.tiles = [];
    }

    /**
     * 取隨機棋種
     */
    public getRandType(): TileType {
        return RandUtil.randInt(NORM_TILE.max + 1, NORM_TILE.min);
    }

    /**
     * 檢查位置
     * @param pos 
     */
    public checkPos(pos: TilePos): boolean {
        return pos && pos.x >= 0 && pos.x < GRID_COL && pos.y >= 0 && pos.y < GRID_ROW;
    }

    /**
     * 取得棋子
     * @param pos 
     */
    public getTile(pos: TilePos): TileModel {
        return this.checkPos(pos) ? this.tiles[pos.x][pos.y] : NULL_TILE;
    }

    /**
     * 設定棋子
     * @param pos 
     * @param tile 
     */
    public setTile(pos: TilePos, tile: TileModel): void {
        if (this.checkPos(pos)) {
            this.tiles[pos.x][pos.y] = tile;

            if (tile) {
                tile.pos = pos;
            }
        }
    }

    /**
     * 打印盤面
     */
    public print(): void {
        let str = "";

        FOR_COL_ROW(pos => {
            // 內文
            let tile = this.getTile({ x: pos.x, y: GRID_ROW - pos.y - 1 });
            str += (tile ? tile.toString() : "xxx(xxx)") + ", ";

            // 換行
            if (pos.x == GRID_COL - 1) {
                str += "\n";
            }
        });

        cc.log(str);
    }
}
