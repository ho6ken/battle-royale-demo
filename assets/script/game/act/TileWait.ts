import { TileAct } from "../../define/TileDefine";
import { TilePlay } from "../mvc/GridCmd";

/**
 * 棋子等待
 */
export class TileWait extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Wait; }

    // 時間
    public time: number = 0;

    /**
     * 
     * @param time 等待時間
     */
    constructor(time: number) {
        super();
        this.time = time;
    }
}
