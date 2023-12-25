import { DutyUI } from "../../comm/cmpt/ui/DutyUI";

const { ccclass, property } = cc._decorator;

/**
 * 
 */
@ccclass
export class RuleBtnUI extends DutyUI {
    /**
     * 
     * @param event 
     * @param data 
     */
    private onClick(event: cc.Event, data: any): void {
        this.call();
    }
}
