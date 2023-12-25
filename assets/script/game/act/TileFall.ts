import { TilePos } from "../../define/GridDefine";
import { TileAct } from "../../define/TileDefine";
import { TilePlay } from "../mvc/GridCmd";

/**
 * 棋子落下
 */
export class TileFall extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Fall; }

    // 終點
    public target: TilePos = null;

    /**
     * 
     * @param target 終點
     */
    constructor(target: TilePos) {
        super();
        this.target = target;
    }
}