import { EventSrc } from "../../cfg/EventCfg";
import { EventMgr } from "./EventMgr";

/**
 * 複寫類別
 * @param target 類別建構子
 * @param on 開始函式
 * @param off 結束函式
 */
function rewrite(target: any, on: string, off: string): void {
    let func1 = target.prototype[on];

    target.prototype[on] = function(): void {
        EventMgr.register(this);
        func1 && func1.call(this);
    }

    let func2 = target.prototype[off];

    target.prototype[off] = function(): void {
        EventMgr.unregister(this);
        func2 && func2.call(this);
    }
}

/**
 * 類別裝飾
 * @summary 在onLoad()時註冊, 在onDestroy()時註銷
 */
export function onLoad(): Function {
    return function(target: any): void {
        rewrite(target, "onLoad", "onDestroy");
    }
}

/**
 * 類別裝飾
 * @summary 在onEnable()時註冊, 在onDisable()時註銷
 */
export function onEnable(): Function {
    return function(target: any): void {
        rewrite(target, "onEnable", "onDisable");
    }
}

/**
 * 事件名稱
 */
export type EventKey = string | EventSrc;

/**
 * 方法裝飾
 * @param key 事件名
 * @param once 單次觸發
 */
export function onEvent(key: EventKey, once: boolean = false): Function {
    return function(target: any, name: string, desc: PropertyDescriptor): void {
        let list = EventMgr.container.get(target.constructor);
        
        if (list == null) {
            list = [];
            EventMgr.container.set(target.constructor, list);
        }

        list.push({ key: key, func: name, once: once });
    }
}
