import { TileAct } from "../../define/TileDefine";
import { TilePlay } from "../mvc/GridCmd";

/**
 * 棋子選擇
 */
export class TileSelect extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Select; }

    // 已選
    public selected: boolean = false;

    /**
     * 
     * @param selected 已選
     */
    constructor(selected: boolean) {
        super();
        this.selected = selected;
    }
}
