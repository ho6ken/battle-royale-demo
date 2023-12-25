import { TileAct } from "../../define/TileDefine"
import { TilePlay } from "../mvc/GridCmd"

/**
 * 棋子消除
 */
export class TileCrush extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Crush; }
}