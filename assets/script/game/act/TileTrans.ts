import { TileAct, TileType } from "../../define/TileDefine"
import { TilePlay } from "../mvc/GridCmd"

/**
 * 棋子變化
 */
export class TileTrans extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Trans; }

    // 合成物
    public target: TileType = null;

    // 跳過過程
    public skip: boolean = false;

    /**
     * 
     * @param target 合成物
     * @param skip 跳過過程
     */
    constructor(target: TileType, skip: boolean = false) {
        super();

        this.target = target;
        this.skip = skip;
    }
}