import { DataDriven } from "../../../comm/util/DataDriven";
import { MAX_STAGE, STAGE_RULE, StageData } from "../../../define/GameDefine";
import { TileType } from "../../../define/TileDefine";

/**
 * 關卡
 */
export class StageModel {
    // 等級
    public lv = new DataDriven(0);

    // 關卡資料
    public get data(): StageData { return STAGE_RULE[this.lv.value.limit(1, MAX_STAGE)]; }

    // 通關條件
    private rules = new Map<TileType, number>();

    // 是否獲勝
    public get winner(): boolean { return this.rules.size <= 0; }

    /**
     * 
     */
    constructor() {
        this.lv.on(lv => {
            cc.log("升級", lv);
            this.resetRules();
        });
    }

    /**
     * 增加等級
     * @param value 
     * @returns 最新等級
     */
    public incLv(value: number = 1): number {
        return this.setLv(this.lv.value + value);
    }

    /**
     * 設定等級
     * @param value
     * @returns 最新等級 
     */
    public setLv(value: number): number {
        this.lv.value = value;
        return value;
    }

    /**
     * 重設通關條件
     */
    private resetRules(): void {
        let data = this.data.pass;
        let keys = Object.keys(data);
        let values = Object.values(data);

        this.rules.clear();
        keys.forEach((elm, idx) => this.rules.set(+elm, +values[idx]), this);
    }

    /**
     * 直接獲勝
     */
    public directWin(): void {
        this.rules.clear();
    }

    /**
     * 減少通關條件
     * @param type 棋種
     * @param num 數量
     * @returns 是否通關
     */
    public decRule(type: TileType, num: number): boolean {
        if (this.rules.has(type)) {
            let curr = this.rules.get(type);
            curr -= num;

            this.rules.set(type, curr);
            curr <= 0 && this.rules.delete(type);
        }

        return this.winner;
    }
}
