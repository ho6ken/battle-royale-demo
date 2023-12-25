import { EventSrc } from "../../../cfg/EventCfg";
import { ReplayFx } from "../../../comm/cmpt/ReplayFx";
import { onEnable, onEvent } from "../../../comm/event/EventDecor";
import { EventMgr } from "../../../comm/event/EventMgr";
import { MAX_ENERGY } from "../../../define/GameDefine";

const { ccclass, property } = cc._decorator;

/**
 * 大招
 */
@ccclass
@onEnable()
export class UltView extends cc.Component {
    // 能量條
    @property(cc.ProgressBar)
    private bar: cc.ProgressBar = null;

    // 按鈕
    @property(cc.Button)
    private btn: cc.Button = null;

    // 當前能量
    private _energy: number = 0;

    // 按鈕特效
    @property(ReplayFx)
    private btnsfx: ReplayFx = null;

    // 大招特效
    @property(ReplayFx)
    private ultSfx: ReplayFx = null;

    /**
     * 
     */
    protected onLoad(): void {
        this.clear();
    }

    /**
     * 清除
     */
    public clear(): void {
        this._energy = 0;
        this.bar.progress = 0;
        this.btn.target.color = cc.Color.GRAY;
        this.btnsfx?.stop();
    }

    /**
     * 補充能量
     * @param value 
     */
    @onEvent(EventSrc.Charge)
    private charge(value: number): void {
        this._energy = (this._energy + value).limit(0, MAX_ENERGY);

        this.bar.progress = this._energy / MAX_ENERGY;

        // 滿能
        if (this._energy >= MAX_ENERGY) {
            this.btn.target.color = cc.Color.WHITE;
            this.btnsfx?.play();
        }

        //cc.log("充能", value, this._energy);
    }

    /**
     * 使用
     * @param event 
     * @param data 
     */
    private onClick(event: cc.Event, data: any): void {
        if (this._energy >= MAX_ENERGY) {
            this.clear();
            this.ultSfx?.play();

            window.setTimeout(() => {
                EventMgr.inst().emit(EventSrc.Ultimate);
            }, 2000);
        }
    }
}
