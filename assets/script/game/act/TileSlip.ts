import { TilePos } from "../../define/GridDefine";
import { TileAct } from "../../define/TileDefine";
import { TilePlay } from "../mvc/GridCmd";

/**
 * 棋子側滑
 */
export class TileSlip extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Slip; }

    // 路徑
    public path: TilePos[] = [];

    /**
     * 
     * @param path 路徑
     */
    constructor(path: TilePos | TilePos[]) {
        super();
        this.path = this.path.concat(path);
    }
}
