import { TilePos } from "../../define/GridDefine";
import { TileAct } from "../../define/TileDefine";
import { TilePlay } from "../mvc/GridCmd";

/**
 * 棋子位移
 */
export class TileMove extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Move; }

    // 目的地
    public target: TilePos = null;

    // 跳過過程
    public skip: boolean = false;

    /**
     * 
     * @param target 目的地
     * @param skip 跳過過程
     */
    constructor(target: TilePos, skip: boolean = false) {
        super();

        this.target = target;
        this.skip = skip;
    }
}