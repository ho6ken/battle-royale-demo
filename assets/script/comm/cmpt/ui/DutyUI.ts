import { UIBase } from "./UIBase";

const { ccclass, property, menu } = cc._decorator;

/**
 * 掮客介面
 * @summary 生成介面prefab並顯示
 */
@ccclass
@menu("ui/duty")
export class DutyUI extends UIBase {
    // 介面prefab
    @property(cc.Prefab)
    private prefab: cc.Prefab = null;

    // 介面
    protected _duty: UIBase = null;

    // 父物件
    @property(cc.Node)
    protected parent: cc.Node = null;

    /**
     * 呼叫prefab介面
     * @param params 
     */
    protected async call(...params: any): Promise<void> {
        if (this._duty == null) {
            let obj = cc.instantiate(this.prefab);
            obj.parent = this.parent ?? this.node;

            this._duty = obj.getComponent(UIBase);
        }

        return this._duty.show(...params);
    }

    /**
     * 顯示
     * @param params 
     */
    public async show(...params: any): Promise<void> {
        await this._duty ? this._duty.show(...params) : this.call(...params);
    }

    /**
     * 隱藏
     * @param params 
     */
    public async hide(...params: any): Promise<void> {
        await this._duty ? this._duty.hide(...params) : null;
    }
}
