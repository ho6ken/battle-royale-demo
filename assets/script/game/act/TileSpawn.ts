import { TileAct } from "../../define/TileDefine"
import { TilePlay } from "../mvc/GridCmd"

/**
 * 棋子生成
 */
export class TileSpawn extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Spawn; }

    // 跳過過程
    public skip: boolean = false;

    /**
     * 
     * @param skip 跳過過程
     */
    constructor(skip: boolean = false) {
        super();
        this.skip = skip;
    }
}
