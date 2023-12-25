import { EventSrc } from "../../../cfg/EventCfg";
import { onEnable, onEvent } from "../../event/EventDecor";

const { ccclass, property, menu } = cc._decorator;

/**
 * widget適配
 */
@ccclass
@menu("adapt/widget")
@onEnable()
export class WidgetAdapt extends cc.Component {
    /**
     * 
     */
    protected onLoad(): void {
        this.adjust();
    }

    /**
     * 校正
     */
    @onEvent(EventSrc.Resize)
    private adjust(): void {
        this.node.setContentSize(cc.Canvas.instance.designResolution);

        let oldW = this.node.width;
        let oldH = this.node.height;

        let size = CC_EDITOR ? cc.Canvas.instance.designResolution : cc.view.getCanvasSize();
        let scale = Math.min(size.width / oldW, size.height / oldH);

        let newW = oldW * scale;
        let newH = oldH * scale;

        this.node.width *= (size.width / newW);
        this.node.height *= (size.height / newH);
    }
}
