import { UIBase } from "../../comm/cmpt/ui/UIBase";

const { ccclass, property } = cc._decorator;

/**
 * 
 */
@ccclass
export class RuleUI extends UIBase {
    /**
     * 
     */
    private onClose(event: cc.Event, data: any): void {
        this.hide();
    }
}
