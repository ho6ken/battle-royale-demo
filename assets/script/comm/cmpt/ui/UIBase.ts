const { ccclass, property } = cc._decorator;

/**
 * 介面基礎
 */
@ccclass
export class UIBase extends cc.Component {
    /**
     * 顯示
     * @param params 
     */
    public async show(...params: any): Promise<void> {
        this.node.active = true;
    }

    /**
     * 隱藏
     * @param params 
     */
    public async hide(...params: any): Promise<void> {
        this.node.active = false;
    }
}
