import { TileAct } from "../../define/TileDefine";
import { TilePlay } from "../mvc/GridCmd";

/**
 * 棋子冷卻
 */
export class TileCd extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Cd; }
}
