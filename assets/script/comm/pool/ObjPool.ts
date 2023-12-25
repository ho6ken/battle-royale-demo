import { Singleton } from "../util/Singleton";

/**
 * 物件池
 */
export class ObjPool<TKey, TValue> extends Singleton {
    // 池
    private _pool = new Map<TKey, TValue[]>();

    /**
     * 
     */
    protected onDestroy(): void {
        Array.from(this._pool.keys()).forEach(key => this.clear(key), this);
        this._pool.clear();
    }

    /**
     * 清除
     * @param key 
     */
    public clear(key: TKey): void {
        let list = this._pool.get(key);

        if (list) {
            for (let item of list) {
                (item as cc.Node)?.destroy();
                item = null;
            }
        }

        list = [];
        this._pool.delete(key);
    }

    /**
     * 物件數
     * @param key 
     */
    public size(key: TKey): number {
        return this._pool.get(key)?.length ?? 0;
    }

    /**
     * 取得
     * @param key 
     */
    public fetch(key: TKey): TValue {
        return this.size(key) > 0 ? this._pool.get(key).shift() : null;
    }

    /**
     * 回收
     * @param key 
     * @param value 
     * @returns 成功
     */
    public recycle(key: TKey, value: TValue): boolean {
        if (key && value) {
            let list = this._pool.get(key);

            if (list == null) {
                list = [];
                this._pool.set(key, list);
            }
            else if (list.indexOf(value) != -1) {
                (value as cc.Node)?.destroy();
                value = null;

                return false;
            }

            (value as cc.Node)?.removeFromParent(false);
            list.push(value);

            return true;
        }

        return false;
    }
}
