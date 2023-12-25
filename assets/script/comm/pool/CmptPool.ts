import { ObjPool } from "./ObjPool";

/**
 * 組件池物件
 */
export interface CmptPoolObj {
    /**
     * 取出時
     */
    reuse(): void;

    /**
     * 回收時
     */
    unuse(): void;
}

/**
 * 鍵
 */
type PoolKey = { prototype: cc.Component };

/**
 * 組件池
 */
export class CmptPool extends ObjPool<PoolKey, cc.Node> {
    /**
     * 取得
     * @param key 
     */
    public fetch(key: PoolKey): cc.Node {
        let value = super.fetch(key);
        let cmpt: any = value?.getComponent(key);

        if (cmpt && cmpt.reuse) {
            cmpt.reuse();
        }

        return value;
    }

    /**
     * 回收
     * @param key 
     * @param value 
     */
    public recycle(key: PoolKey, value: cc.Node): boolean {
        let cmpt: any = value.getComponent(key);

        if (cmpt && cmpt.unuse) {
            cmpt.unuse();
        }

        return super.recycle(key, value);
    }
}