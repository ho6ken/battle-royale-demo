/**
 * 欄位裝飾
 */
function decorator(): Function {
    return function(target: any, name: string): void {
        delete target[name];

        const field = `_${name}`;

        Object.defineProperty(target, field, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        const getter = function(this: any): any {
            return this[field];
        }

        const setter = function(this: any, value: any): void {
            this[field] = value;
            
            let func = this.emit;
            func && func.call(this, value, this[field]);
        }

        Object.defineProperty(target, name, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
        });
    }
}

/**
 * 數據驅動
 */
export class DataDriven<T> {
    // 數據
    @decorator()
    public value: T = null;

    // 變化時事件
    private _events: Function[] = [];

    // 變化時跳過觸發
    private _skip: Function = null;

    /**
     * 
     * @param value 初始值
     * @param skip 變化時跳過觸發
     * @summary 建構時賦值不會觸發事件
     */
    constructor(value: T, skip?: Function) {
        this.value = value;
        this._skip = skip;
    }

    /**
     * 觸發事件
     * @param next 新值
     * @param last 舊值
     */
    public emit(next: T, last: T): void {
        if (this._skip == null || this._skip(next, last)) {
            this._events?.forEach(event => event(next, last));
        }
    }

    /**
     * 清空監聽
     */
    public clear(): void {
        this._events = [];
    }

    /**
     * 增加監聽
     * @param event 
     */
    public on(event: Function): void {
        this._events.push(event);
    }

    /**
     * 取消監聽
     * @param event 
     */
    public off(event: Function): void {
        let idx = this._events.findIndex(src => { return src == event });
        idx != -1 && this._events.splice(idx, 1);
    }
}