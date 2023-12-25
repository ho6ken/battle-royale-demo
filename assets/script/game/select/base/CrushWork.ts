import { FOR_COL_ROW } from "../../../define/GridDefine";
import { TileType } from "../../../define/TileDefine";
import { TileCrush } from "../../act/TileCrush";
import { TileTrans } from "../../act/TileTrans";
import { GridCmd } from "../../mvc/GridCmd";
import { WorkChain } from "../../../comm/util/WorkChain";
import { SelectParam } from "../SelectHandler";

/**
 * 消除
 * @summary 實作消除與合成
 */
export class CrushWork extends WorkChain {
    // 消除流程
    private _process: WorkChain = null;

    /**
     * 
     */
    constructor() {
        super();

        this._process = new CrushH();
        this._process.push(new CrushV());
        this._process.push(new CrushO());
        this._process.push(new CrushT());
        this._process.push(new CrushL());
    }

    /**
     * 業務處理
     * @param param
     * @returns 繼續向下執行 
     */
    protected async business(param: SelectParam): Promise<boolean> {
        let cmd = new GridCmd();
        param.atkers = [];
        
        await this._process.execute(param);

        FOR_COL_ROW(pos => {
            let tile = param.model.getTile(pos);

            if (tile) {
                // 變化
                if (tile.trans != TileType.None) {
                    cmd.add(tile, new TileTrans(tile.trans));

                    tile.type = tile.trans;
                    tile.trans = TileType.None;
                    tile.crushed = false;

                    // 攻擊發起者
                    param.atkers.push(tile);
                }

                // 消除
                if (tile.crushed) {
                    cmd.add(tile, new TileCrush());
                    param.model.setTile(pos, null);

                    // 攻擊發起者
                    param.atkers.push(tile);
                }
            }
        });

        param.load.push(cmd);
        param.changes = [];  // 清空給drop與stuff使用

        return true;
    }
}

/**
 * 直向
 */
class CrushV extends WorkChain {
    /**
     * 業務處理
     * @param param
     * @returns 繼續向下執行 
     */
    protected async business(param: SelectParam): Promise<boolean> {
        param.changes.forEach(elm => {
            let places = param.model.getCrushesV(elm);
            let len = places.length;

            if (len >= 3) {
                let log = [];
                let type = TileType.None;

                places.forEach((pos, idx) => {
                    let tile = param.model.getTile(pos);
                    
                    if (idx == 0) {
                        if (len >= 5) {
                            tile.trans = TileType.Cyclone;
                        }
                        else if (len >= 4) {
                            tile.trans = TileType.Cross;
                        }
                        else {
                            tile.crushed = true;
                        }
                    }
                    else {
                        tile.crushed = true;
                    }

                    log.push(tile.id);
                    type = tile.type;
                });

                len >= 4 && cc.log("變化V", log[0], places[0]);
                cc.log("消除V", type, log, places);
            }
        });

        return true;
    }
}

/**
 * 橫向
 */
class CrushH extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        param.changes.forEach(elm => {
            let places = param.model.getCrushesH(elm);
            let len = places.length;

            if (len >= 3) {
                let log = [];
                let type = TileType.None;

                places.forEach((pos, idx) => {
                    let tile = param.model.getTile(pos);

                    if (idx == 0) {
                        if (len >= 5) {
                            tile.trans = TileType.Cyclone;
                        }
                        else if (len >= 4) {
                            tile.trans = TileType.Cross;
                        }
                        else {
                            tile.crushed = true;
                        }
                    }
                    else {
                        tile.crushed = true;
                    }

                    log.push(tile.id);
                    type = tile.type;
                });

                len >= 4 && cc.log("變化H", log[0], places[0]);
                cc.log("消除H", type, log, places);
            }
        });

        return true;
    }
}

/**
 * O型
 */
class CrushO extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        param.changes.forEach(elm => {
            let places = param.model.getCrushesO(elm);
            let len = places.length;

            if (len >= 4) {
                let log = [];
                let type = TileType.None;

                places.forEach((pos, idx) => {
                    let tile = param.model.getTile(pos);
                    idx == 0 ? tile.trans = TileType.Thunder : tile.crushed = true;

                    log.push(tile.id);
                    type = tile.type;
                });

                cc.log("變化O", log[0], places[0]);
                cc.log("消除O", type, log, places);
            }
        });

        return true;
    }
}

/**
 * T型
 */
class CrushT extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        param.changes.forEach(elm => {
            let places = param.model.getCrushesT(elm);
            let len = places.length;

            if (len >= 5) {
                let log = [];
                let type = TileType.None;

                places.forEach((pos, idx) => {
                    let tile = param.model.getTile(pos);
                    idx == 0 ? tile.trans = TileType.Cyclone : tile.crushed = true;

                    log.push(tile.id);
                    type = tile.type;
                });

                cc.log("變化T", log[0], places[0]);
                cc.log("消除T", type, log, places);
            }
        });

        return true;
    }
}

/**
 * L型
 */
class CrushL extends WorkChain {
    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        param.changes.forEach(elm => {
            let places = param.model.getCrushesL(elm);
            let len = places.length;

            if (len >= 5) {
                let log = [];

                places.forEach((pos, idx) => {
                    let tile = param.model.getTile(pos);
                    idx == 0 ? tile.trans = TileType.Cyclone : tile.crushed = true;

                    log.push(tile.id);
                });

                cc.log("變化L", log[0], places[0]);
                cc.log("消除L", log, places);
            }
        });

        return true;
    }
}
