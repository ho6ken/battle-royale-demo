import { TileType } from "../../../define/TileDefine";
import { StageModel } from "../model/StageModel";
import { LoseView } from "./LoseView";
import { RuleView } from "./RuleView";
import { WinView } from "./WinView";

const { ccclass, property } = cc._decorator;

/**
 * 關卡
 */
@ccclass
export class StageView extends cc.Component {
    // 關卡等級
    @property(cc.Label)
    private lv: cc.Label = null;

    // 通關條件
    @property([RuleView])
    private rules: RuleView[] = [];

    // 獲勝
    @property(WinView)
    private win: WinView = null;

    // 失敗
    @property(LoseView)
    private lose: LoseView = null;

    /**
     * 初始化
     * @param model 
     */
    public init(model: StageModel): void {
        model.lv.on(lv => {
            // 等級
            this.lv.string = lv;

            let data = model.data.pass;
            let keys = Object.keys(data);
            let values = Object.values(data);

            // 通關條件
            this.rules.forEach(rule => {
                let type = keys.shift() ?? 0;
                let num = values.shift() ?? 0;
                
                rule.init(<TileType>type, num);
            });
        });
    }

    /**
     * 播放獲勝
     */
    public async playWin(): Promise<void> {
        await this.win.play();
    }

    /**
     * 播放失敗
     */
    public async playLose(): Promise<void> {
        await this.lose.play();
    }

    /**
     * 減少通關條件
     * @param type 棋種
     * @param num 數量
     * @returns 是否通關
     */
    public decRule(type: TileType, num: number): void {
        this.rules.forEach(rule => {
            if (rule.tileType == type) {
                let curr = rule.tileNum - num;
                rule.setNum(curr);
            }
        });
    }
}
