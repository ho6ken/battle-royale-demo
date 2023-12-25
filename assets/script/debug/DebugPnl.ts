import { EventSrc } from "../cfg/EventCfg";
import { EventMgr } from "../comm/event/EventMgr";
import { MAX_ENERGY } from "../define/GameDefine";

const { ccclass, property } = cc._decorator;

/**
 * 除錯面板
 */
@ccclass
export class DebugPnl extends cc.Component {
    // x
    @property(cc.EditBox)
    private edit1: cc.EditBox = null;

    // y
    @property(cc.EditBox)
    private edit2: cc.EditBox = null;

    // type
    @property(cc.EditBox)
    private edit3: cc.EditBox = null;

    /**
     * 棋種
     * @param event 
     * @param data 
     */
    private onBtn1Click(event: cc.Event, data: any): void {
        let x = Number(this.edit1.string);
        let y = Number(this.edit2.string);
        let type = Number(this.edit3.string);

        EventMgr.inst().emit(EventSrc.DebugType, { x: x, y: y }, type);
    }

    /**
     * 滿能
     * @param event 
     * @param data 
     */
    private onBtn2Click(event: cc.Event, data: any): void {
        EventMgr.inst().emit(EventSrc.Charge, MAX_ENERGY);
    }

    /**
     * 清玩家冷卻
     * @param event 
     * @param data 
     */
    private onBtn3Click(event: cc.Event, data: any): void {
        EventMgr.inst().emit(EventSrc.DebugCd);
    }

    /**
     * 獲勝
     * @param event 
     * @param data 
     */
    private onBtn4Click(event: cc.Event, data: any): void {
        EventMgr.inst().emit(EventSrc.DebugWin);
    }
}
