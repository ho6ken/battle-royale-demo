import { EventSrc } from "../../../cfg/EventCfg";
import { EventMgr } from "../../event/EventMgr";

const { ccclass, property, menu } = cc._decorator;

/**
 * canvas適配
 * @summary 使用定寬高, 方便其他適配元件計算變化
 */
@ccclass
@menu("adapt/canvas")
export class CanvasAdapt extends cc.Component {
    /**
     * 
     */
    protected onLoad(): void {
        let canvas = cc.Canvas.instance;
        canvas.fitWidth = true;
        canvas.fitHeight = true;

        // 視窗大小改變
        cc.view.setResizeCallback(() => EventMgr.inst().emit(EventSrc.Resize));
    }
}
