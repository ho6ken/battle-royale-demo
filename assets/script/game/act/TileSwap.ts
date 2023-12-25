import { TilePos } from "../../define/GridDefine";
import { TileAct } from "../../define/TileDefine"
import { TilePlay } from "../mvc/GridCmd"

/**
 * 棋子互換
 */
export class TileSwap extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Swap; }

    // 目的地
    public target: TilePos = null;

    /**
     * 
     * @param target 目的地
     */
    constructor(target: TilePos) {
        super();
        this.target = target;
    }
}