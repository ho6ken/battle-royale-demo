import { TileAct } from "../../define/TileDefine";
import { TilePlay } from "../mvc/GridCmd";

/**
 * 棋子受擊
 */
export class TileHit extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Hit; }

    // 傷害
    public damage: number = 0;

    /**
     * 
     * @param damage 傷害
     */
    constructor(damage: number) {
        super();
        this.damage = damage;
    }
}
