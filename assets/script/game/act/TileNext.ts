import { TileAct } from "../../define/TileDefine"
import { TilePlay } from "../mvc/GridCmd"

/**
 * 棋子次回
 * @summary 進入下回合
 */
export class TileNext extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Next; }

    // 實作減少回合
    public dec: boolean = true;

    /**
     * 
     * @param dec 
     */
    constructor(dec: boolean = true) {
        super();
        this.dec = dec;
    }
}