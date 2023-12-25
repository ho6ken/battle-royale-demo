import { TileAct } from "../../define/TileDefine";
import { TilePlay } from "../mvc/GridCmd";

/**
 * 棋子攻擊
 */
export class TileAtk extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Atk; }

    /**
     * 
     */
    constructor() {
        super();
    }
}