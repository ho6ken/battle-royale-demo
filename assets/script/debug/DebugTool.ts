const { ccclass, property } = cc._decorator;

/**
 * 除錯工具
 */
@ccclass
export class DebugTool extends cc.Component {
    // 除錯面板
    @property(cc.Node)
    private pnl: cc.Node = null;

    /**
     * 
     */
    protected onLoad(): void {
        this.node.active = CC_DEBUG; 
        this.pnl.active = false;
    }

    /**
     * 顯示面板
     * @param event 
     * @param data 
     */
    private onClick(event: cc.Event, data: any): void {
        this.pnl.active = !this.pnl.active;
    }
}
