import { TileAct } from "../../define/TileDefine"
import { TilePlay } from "../mvc/GridCmd"

/**
 * 棋子死亡
 */
export class TileDie extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Die; }
}