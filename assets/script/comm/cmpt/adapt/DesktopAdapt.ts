import { EventSrc } from "../../../cfg/EventCfg";
import { onEnable, onEvent } from "../../event/EventDecor";

const { ccclass, property, menu } = cc._decorator;

/**
 * desktop適配
 */
@ccclass
@menu("adapt/desktop")
@onEnable()
export class DesktopAdapt extends cc.Component {
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
        let oldW = this.node.width;
        let oldH = this.node.height;

        let size = cc.view.getCanvasSize();
        let scale = Math.min(size.width / oldW, size.height / oldH);

        let newW = oldW * scale;
        let newH = oldH * scale;

        this.node.scale = Math.max(size.width / newW, size.height / newH);
    }
}
