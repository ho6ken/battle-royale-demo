import { Singleton } from "../util/Singleton";
import { EventKey } from "./EventDecor";

/**
 * 事件
 */
type Event = (...params: any[]) => void;

/**
 * 事件管理
 */
export class EventMgr extends Singleton {
    // 各類別裝飾, <建構子, { 事件名, 回調名, 單次觸發 }[]>
    public static container = new Map<Function, { key: EventKey, func: string, once: boolean }[]>();

    // 註冊時
    private static _on: Function = null;

    // 註銷時
    private static _off: Function = null;

    // 事件列表, <事件名, <類別實體, { 事件, 單次觸發 }[]>>
    private _events = new Map<EventKey, Map<Object, { event: Event, once: boolean }[]>>();

    /**
     * 註冊
     * @param target 
     */
    public static register(target: Object): void {
        this.container.get(target.constructor).forEach(src => {
            this._on(target, src.key, target[src.func], src.once);
        }, this);
    }

    /**
     * 註銷
     * @param target 
     */
    public static unregister(target: Object): void {
        this._off(target);
    }

    /**
     * 
     */
    constructor() {
        super();
        
        EventMgr._on = this.on.bind(this);

        EventMgr._off = target => {
            this._events.forEach((map, key) => {
                map.get(target).length = 0;
                map.delete(target);
                map.size <= 0 && this._events.delete(key);
            });
        };
    }

    /**
     * 銷毀實作
     */
    protected onDestroy(): void {
        EventMgr._on = null;
        EventMgr._off = null;

        this._events.forEach(map => {
            map.forEach(list => list = []);
            map.clear();
        });

        this._events.clear();

        EventMgr.container.forEach(list => list = []);
        EventMgr.container.clear();
    }

    /**
     * 監聽
     * @param target 類別實體
     * @param key 事件名稱
     * @param event 
     * @param once 單次觸發
     */
    public on(target: Object, key: EventKey, event: Event, once: boolean = false): void {
        let map = this._events.get(key);
        let list = [];

        if (map) {
            list = map.get(target);

            if (list == null) {
                list = [];
                map.set(target, list);
            }
        }
        else {
            map = new Map<Object, { event: Event, once: boolean }[]>();
            map.set(target, list);
            this._events.set(key, map);
        }

        list.push({ event: event, once: once });
    }

    /**
     * 單次監聽
     * @param target 類別實體
     * @param key 事件名稱
     * @param event 
     */
    public once(target: Object, key: EventKey, event: Event): void {
        this.on(target, key, event, true);
    }

    /**
     * 取消監聽
     * @param target 類別實體
     * @param key 事件名稱
     * @param event 
     */
    public off(target: Object, key: EventKey, event: Event): void {
        let map = this._events.get(key);
        let list = map.get(target);

        let idx = list?.findIndex(data => { return data.event == event; }) ?? -1;
        idx != -1 && list.splice(idx, 1);

        if (list && list.length <= 0) {
            map.delete(target);
            map.size <= 0 && this._events.delete(key);
        }
    }

    /**
     * 事件派發
     * @param key 事件名稱
     * @param params 
     */
    public emit(key: EventKey, ...params: any[]): void {
        this.listeners(key).forEach(data => data.event.apply(data.target, params));
    }

    /**
     * 異步事件派發
     * @param key 事件名稱
     * @param params 
     */
    public async emitAsync(key: EventKey, ...params: any[]): Promise<void> {
        let jobs = [];
        this.listeners(key).forEach(data => jobs.push(data.target, params));

        await Promise.all(jobs);
    }

    /**
     * 取得監聽者
     * @param key 事件名稱
     */
    private listeners(key: EventKey): { target: Object, event: Event }[] {
        let src = this._events.get(key);

        if (src == null) {
            return [];
        }

        let res = [];
        let wait = [];

        src.forEach((list, target) => {
            list.forEach(item => {
                let data = { target: target, event: item.event };
                res.push(Object.assign({}, data));

                if (item.once) {
                    wait.push(Object.assign({}, data));
                }
            });
        });

        wait.forEach(data => this.off(data.target, key, data.event), this);

        return res;
    }
} 

/**
 * 
 * @summary 讓事件管理在cocos啟動前實例化
 */
const order = EventMgr.inst();
