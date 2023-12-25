import { TileAct, TileType } from "../../define/TileDefine";
import { TilePlay } from "../mvc/GridCmd";

/**
 * 棋子技能
 */
export class TileSkill extends TilePlay {
    // 種類
    public get type(): TileAct { return TileAct.Skill; }

    // 效果
    public eff: TileType = TileType.None;

    /**
     * 
     * @param eff 效果
     */
    constructor(eff: TileType) {
        super();
        this.eff = eff;
    }
}
