import { RandUtil } from "../../../comm/util/RandUtil";
import { FOR_COL_ROW, GRID_COL, GRID_ROW, TilePos } from "../../../define/GridDefine";
import { TILE_GROUP_IS, TileGroup, TileType } from "../../../define/TileDefine";
import { StageCtrl } from "../ctrl/StageCtrl";
import { GridModelBase } from "./GridModelBase";
import { TileModel } from "./TileModel";

/**
 * O型範圍偏移
 */
const OFFSET_O = [[{ x: +1, y: +0 }, { x: +1, y: +1 }, { x: +0, y: +1 }],
                  [{ x: +0, y: +1 }, { x: -1, y: +1 }, { x: -1, y: +0 }],
                  [{ x: -1, y: +0 }, { x: -1, y: -1 }, { x: +0, y: -1 }],
                  [{ x: +1, y: +0 }, { x: +1, y: -1 }, { x: +0, y: -1 }]];

/**
 * T型範圍偏移
 */
const OFFSET_T = [[{ x: +1, y: +0 }, { x: -1, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }],
                  [{ x: +0, y: +1 }, { x: +0, y: -1 }, { x: +1, y: +0 }, { x: +2, y: +0 }],
                  [{ x: +0, y: +1 }, { x: +0, y: -1 }, { x: -1, y: +0 }, { x: -2, y: +0 }],
                  [{ x: +1, y: +0 }, { x: -1, y: +0 }, { x: +0, y: +1 }, { x: +0, y: +2 }]];

/**
 * L型範圍偏移
 */
const OFFSET_L = [[{ x: +1, y: +0 }, { x: +2, y: +0 }, { x: +0, y: +1 }, { x: +0, y: +2 }],
                  [{ x: +0, y: +1 }, { x: +0, y: +2 }, { x: -1, y: +0 }, { x: -2, y: +0 }],
                  [{ x: -1, y: +0 }, { x: -2, y: +0 }, { x: +0, y: -1 }, { x: +0, y: -2 }],
                  [{ x: +0, y: -1 }, { x: +0, y: -2 }, { x: +1, y: +0 }, { x: +2, y: +0 }]];

/**
 * 棋盤
 */
export class GridModel extends GridModelBase {
    //
    private _cache: Map<number, TileModel> = null;

    // 玩家
    public get player(): TileModel { return this.getPlayer(); };

    // 敵人
    private _enemies = new Map<number, TileModel>();
    public get enemies(): TileModel[] { return this.getEnemies(); }

    /**
     * 設定棋子
     * @param pos 
     * @param tile 
     */
    public setTile(pos: TilePos, tile: TileModel): void {
        super.setTile(pos, tile);

        // 加入管理
        if (tile) {
            // TODO: 應急寫法(為了demo能顯示正常), 因為取棋子的方式用錯(要改用編號取棋子), 等後有時間要修改取敵人玩家棋子...等等的方式
            this._cache ?? (this._cache = new Map<number, TileModel>());
            this._cache.set(tile.id, tile);
        }
    }

    /**
     * 取得棋子
     * @param pos 
     */
    public getTile(pos: TilePos): TileModel {
        let tile = super.getTile(pos);

        // 取得時也做加入管理是因為盤面啟動時不會呼叫setTile()
        if (tile) {
            // TODO: 應急寫法(為了demo能顯示正常), 因為取棋子的方式用錯(要改用編號取棋子), 等後有時間要修改取敵人玩家棋子...等等的方式
            this._cache ?? (this._cache = new Map<number, TileModel>());
            this._cache.set(tile.id, tile);
        }

        return tile;
    }

    /**
     * 取得棋子
     * @param id 
     * @todo 應急寫法((為了demo能顯示正常), 因為取棋子的方式用錯(要改用編號取棋子), 等後有時間要修改取敵人玩家棋子...等等的方式
     */
    public getTileById(id: number): TileModel {
        return this._cache.get(id);
    }

    /**
     * 取隨機棋種
     */
    public getRandType(): TileType {
        let size = this.enemies.length;
        let data = StageCtrl.inst.data.enemy;

        // 大於最高值或是根本沒定值出一般
        if (size <= 0 || size >= data.max) {
            return this.getRandNorm();
        }
        // 小於最低值必出敵人
        else if (size <= data.min) {
            return this.getRandEnemy();
        }
        // 隨機出
        else {
            return RandUtil.randRate(10) ? this.getRandEnemy() : this.getRandNorm();
        }
    }

    /**
     * 取隨機一般棋種
     */
    public getRandNorm(): TileType {
        return super.getRandType(); 
    }

    /**
     * 取隨機敵人
     */
    public getRandEnemy(): TileType {
        let data = StageCtrl.inst.data.enemy;
        let idx = RandUtil.randWeights(data.weights);

        return <TileType>data.types[idx]; 
    }

    /**
     * 
     */
    private checkCache(): void {
        Array.from(this._cache.values()).forEach(elm => {
            let disapper = true;

            FOR_COL_ROW(pos => {
                if (disapper && elm /*&& super.getTile(pos)?.id == elm?.id*/) {
                    if (super.getTile(pos)?.id == elm.id) {
                        disapper = false;
                        return;
                    }
                }

                return;
            });

            if (disapper) {
                this._cache.delete(elm.id);
            }
        }, this);
    }

    /**
     * 取得玩家 
     */
    private getPlayer(): TileModel {
        // 應急寫法
        this.checkCache();
        return Array.from(this._cache.values()).filter(elm => { return elm.group == TileGroup.Player })[0];
    }

    /**
     * 取得敵人
     */
    private getEnemies(): TileModel[] {
        // 應急寫法
        this.checkCache();
        return Array.from(this._cache.values()).filter(elm => { return elm.group == TileGroup.Enemy });
    }

    /**
     * 有無消除
     * @param center 
     */
    public isCrush(center: TilePos): boolean {
        return this.getCrushesH(center).length >= 3 ||
               this.getCrushesV(center).length >= 3 ||
               this.getCrushesO(center).length >= 4 ||
               this.getCrushesT(center).length >= 5 ||
               this.getCrushesL(center).length >= 5;
    }

    /**
     * 橫向消除範圍
     * @param center 
     */
    public getCrushesH(center: TilePos): TilePos[] {
        let res = [];
        let type = this.getTile(center).type;

        if (TILE_GROUP_IS(type) != TileGroup.Norm) {
            return res;
        }

        // 左
        for (let i = center.x - 1; i >= 0; i--) {
            let pos = { x: i, y: center.y };
            let tile = this.getTile(pos);

            if (tile && tile.type == type && tile.trans == TileType.None) {
                res.push(pos);
            }
            else {
                break;
            }
        }

        // 右
        for (let i = center.x + 1; i < GRID_COL; i++) {
            let pos = { x: i, y: center.y };
            let tile = this.getTile(pos);

            if (tile && tile.type == type && tile.trans == TileType.None) {
                res.push(pos);
            }
            else {
                break;
            }
        }

        // 將中心加至開頭, 方便後續處理
        if (res.length >= 3 - 1) {
            res.unshift(center);
        }
        else {
            res = [];
        }

        return res;
    }

    /**
     * 直向消除範圍
     * @param center 
     */
    public getCrushesV(center: TilePos): TilePos[] {
        let res = [];
        let type = this.getTile(center).type;

        if (TILE_GROUP_IS(type) != TileGroup.Norm) {
            return res;
        }

        // 下
        for (let i = center.y - 1; i >= 0; i--) {
            let pos = { x: center.x, y: i };
            let tile = this.getTile(pos);

            if (tile && tile.type == type && tile.trans == TileType.None) {
                res.push(pos);
            }
            else {
                break;
            }
        }

        // 上
        for (let i = center.y + 1; i < GRID_ROW; i++) {
            let pos = { x: center.x, y: i };
            let tile = this.getTile(pos);

            if (tile && tile.type == type && tile.trans == TileType.None) {
                res.push(pos);
            }
            else {
                break;
            }
        }

        // 將中心加至開頭, 方便後續處理
        if (res.length >= 3 - 1) {
            res.unshift(center);
        }
        else {
            res = [];
        }

        return res;
    }

    /**
     * O型消除範圍
     * @param center 
     */
    public getCrushesO(center: TilePos): TilePos[] {
        let res = [];
        let type = this.getTile(center).type;

        if (TILE_GROUP_IS(type) != TileGroup.Norm) {
            return res;
        }

        OFFSET_O.forEach(elm => {
            let len = elm.length;
            let temp = [];

            for (let i = 0; i < len; i++) {
                let pos = { x: center.x + elm[i].x, y: center.y + elm[i].y };
                let tile = this.getTile(pos);

                if (tile && tile.type == type && tile.trans == TileType.None) {
                    temp.push(pos);
                }
                else {
                    return;
                }
            }

            res = res.concat(temp);
        });

        // 將中心加至開頭, 方便後續處理
        if (res.length >= 4 - 1) {
            res.unshift(center);
        }
        else {
            res = [];
        }

        return res;
    }

    /**
     * T型消除範圍
     * @param center 
     */
    public getCrushesT(center: TilePos): TilePos[] {
        let res = [];
        let type = this.getTile(center).type;

        if (TILE_GROUP_IS(type) != TileGroup.Norm) {
            return res;
        }

        OFFSET_T.forEach(elm => {
            let len = elm.length;
            let temp = [];

            for (let i = 0; i < len; i++) {
                let pos = { x: center.x + elm[i].x, y: center.y + elm[i].y };
                let tile = this.getTile(pos);

                if (tile && tile.type == type && tile.trans == TileType.None) {
                    temp.push(tile.pos);
                }
                else {
                    return;
                }
            }

            res = res.concat(temp);
        });

        // 將中心加至開頭, 方便後續處理
        if (res.length >= 5 - 1) {
            res.unshift(center);
        }
        else {
            res = [];
        }

        return res;
    }

    /**
     * L型消除範圍
     * @param center 
     */
    public getCrushesL(center: TilePos): TilePos[] {
        let res = [];
        let type = this.getTile(center).type;

        if (TILE_GROUP_IS(type) != TileGroup.Norm) {
            return res;
        }

        OFFSET_L.forEach(elm => {
            let len = elm.length;
            let temp = [];

            for (let i = 0; i < len; i++) {
                let pos = { x: center.x + elm[i].x, y: center.y + elm[i].y };
                let tile = this.getTile(pos);

                if (tile && tile.type == type && tile.trans == TileType.None) {
                    temp.push(pos);
                }
                else {
                    return;
                }
            }

            res = res.concat(temp);
        });

        // 將中心加至開頭, 方便後續處理
        if (res.length >= 5 - 1) {
            res.unshift(center);
        }
        else {
            res = [];
        }

        return res;
    }
}